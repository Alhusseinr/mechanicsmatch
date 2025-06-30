// src/app/auth/callback/route.ts
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const token_hash = requestUrl.searchParams.get("token_hash");
  const type = requestUrl.searchParams.get("type");
  const origin = requestUrl.origin;

  console.log("Auth callback received:", { token_hash, type, origin });

  if (token_hash && type) {
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

    try {
      // Verify the OTP token
      const { data, error } = await supabase.auth.verifyOtp({
        token_hash,
        type: type as any,
      });

      console.log("Token verification result:", { data, error });

      if (error) {
        console.error("Error verifying token:", error);
        return NextResponse.redirect(
          `${origin}/login?error=auth_callback_error&message=${encodeURIComponent(
            error.message
          )}`
        );
      }

      if (data.session) {
        console.log(
          "Session created successfully for user:",
          data.session.user.id
        );

        // Fetch user profile to determine redirect
        const { data: profile, error: profileError } = await supabase
          .from("users")
          .select("user_type")
          .eq("id", data.session.user.id)
          .single();

        console.log("User profile:", { profile, profileError });

        if (profileError) {
          console.error("Error fetching user profile:", profileError);
          // If profile doesn't exist, redirect to complete profile
          return NextResponse.redirect(`${origin}/customer/profile`);
        }

        // Redirect based on user type
        if (profile?.user_type === "mechanic") {
          return NextResponse.redirect(`${origin}/shop/dashboard`);
        } else {
          return NextResponse.redirect(`${origin}/customer/dashboard`);
        }
      } else {
        console.error("No session created after token verification");
        return NextResponse.redirect(`${origin}/login?error=no_session`);
      }
    } catch (error) {
      console.error("Auth callback error:", error);
      return NextResponse.redirect(
        `${origin}/login?error=auth_callback_error&message=${encodeURIComponent(
          String(error)
        )}`
      );
    }
  }

  // Handle legacy code parameter (if still needed)
  const code = requestUrl.searchParams.get("code");
  if (code) {
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

    try {
      const { data, error } = await supabase.auth.exchangeCodeForSession(code);

      if (error) {
        console.error("Error exchanging code for session:", error);
        return NextResponse.redirect(
          `${origin}/login?error=auth_callback_error`
        );
      }

      if (data.session) {
        // Same profile logic as above...
        const { data: profile, error: profileError } = await supabase
          .from("users")
          .select("user_type")
          .eq("id", data.session.user.id)
          .single();

        if (profileError || !profile) {
          return NextResponse.redirect(`${origin}/customer/profile`);
        }

        if (profile.user_type === "mechanic") {
          return NextResponse.redirect(`${origin}/shop/dashboard`);
        } else {
          return NextResponse.redirect(`${origin}/customer/dashboard`);
        }
      }
    } catch (error) {
      console.error("Legacy auth callback error:", error);
      return NextResponse.redirect(`${origin}/login?error=auth_callback_error`);
    }
  }

  // Default redirect if no token_hash, type, or code
  console.log("No valid parameters found, redirecting to login");
  return NextResponse.redirect(`${origin}/login?error=missing_parameters`);
}
