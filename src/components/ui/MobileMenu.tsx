import { Dialog, DialogPanel } from "@headlessui/react";
import XMarkIcon from "@heroicons/react/24/solid/esm/XMarkIcon";
import { useRouter } from "next/navigation";
import { Session } from "@supabase/supabase-js";

interface CustomUser {
  user_type?: 'customer' | 'mechanic';
  first_name?: string;
  last_name?: string;
  email?: string;
}

interface MobileMenuProps {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  user?: CustomUser | null;
  session?: Session | null;
  signOut?: () => Promise<void>;
  pathname?: string;
}

export default function MobileMenu({
  mobileMenuOpen,
  setMobileMenuOpen,
  user,
  session,
  signOut,
  pathname = ""
}: MobileMenuProps) {
  const router = useRouter();

  const handleSignIn = () => {
    router.push("/login");
    setMobileMenuOpen(false);
  };

  const handleSignUp = () => {
    router.push("/register");
    setMobileMenuOpen(false);
  };

  const handleListGarage = () => {
    console.log("List your garage clicked");
    setMobileMenuOpen(false);
  };

  const handleNavigation = (path: string) => {
    router.push(path);
    setMobileMenuOpen(false);
  };

  const handleSignOut = async () => {
    if (signOut) {
      await signOut();
    }
    setMobileMenuOpen(false);
  };

  // Check current route
  const isHomePage = pathname === "/";
  const isDashboardPage = pathname.includes("/dashboard");
  const isBookingPage = pathname.includes("/booking");
  const isProfilePage = pathname.includes("/profile");

  return (
    <Dialog
      open={mobileMenuOpen}
      onClose={setMobileMenuOpen}
      className="relative z-50 md:hidden"
    >
      <div className="fixed inset-0 bg-black/25" aria-hidden="true" />
      <div className="fixed inset-0 flex justify-end">
        <DialogPanel className="w-full max-w-sm overflow-y-auto bg-white p-6 shadow-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div
              className="flex items-center cursor-pointer"
              onClick={() => router.push("/")}
            >
              <img
                src="/logo.png"
                alt="MechanicsMatch Logo"
                width={100}
                height={100}
                className="mr-3"
              />
            </div>
          </div>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(false)}
            className="p-2 rounded-md text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors"
          >
            <span className="sr-only">Close menu</span>
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        <div className="mt-6 flow-root">
          <div className="space-y-2 py-6">
            {/* If user is authenticated */}
            {session && user ? (
              <>
                {/* User Info */}
                <div className="px-3 py-4 bg-slate-50 rounded-lg mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-slate-600 rounded-lg flex items-center justify-center text-white font-bold">
                      {user.first_name?.charAt(0) || user.email?.charAt(0).toUpperCase() || 'U'}
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900">
                        {user.first_name ? `${user.first_name} ${user.last_name}` : user.email}
                      </div>
                      <div className="text-sm text-slate-600 capitalize">
                        {user.user_type || 'User'}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Dashboard Link */}
                <button
                  onClick={() => {
                    if (user.user_type === 'mechanic') {
                      handleNavigation('/shop/dashboard');
                    } else {
                      handleNavigation('/customer/dashboard');
                    }
                  }}
                  className={`block w-full text-left px-3 py-2 text-base font-medium rounded-md transition-colors ${
                    isDashboardPage 
                      ? 'bg-slate-100 text-slate-900 border-l-4 border-slate-900' 
                      : 'text-slate-700 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  Dashboard
                </button>

                {/* Customer-specific menu items */}
                {user.user_type === 'customer' && (
                  <>
                    <button
                      onClick={() => handleNavigation('/booking')}
                      className={`block w-full text-left px-3 py-2 text-base font-medium rounded-md transition-colors ${
                        isBookingPage 
                          ? 'bg-slate-100 text-slate-900 border-l-4 border-slate-900' 
                          : 'text-slate-700 hover:text-slate-900 hover:bg-slate-50'
                      }`}
                    >
                      Book Service
                    </button>
                    <button
                      onClick={() => handleNavigation('/customer/profile')}
                      className={`block w-full text-left px-3 py-2 text-base font-medium rounded-md transition-colors ${
                        isProfilePage 
                          ? 'bg-slate-100 text-slate-900 border-l-4 border-slate-900' 
                          : 'text-slate-700 hover:text-slate-900 hover:bg-slate-50'
                      }`}
                    >
                      My Profile
                    </button>
                    <a
                      href="#mechanics"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block px-3 py-2 text-base font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-md"
                    >
                      Find Mechanics
                    </a>
                  </>
                )}

                {/* Mechanic-specific menu items */}
                {user.user_type === 'mechanic' && (
                  <>
                    <button
                      onClick={() => handleNavigation('/shop/profile')}
                      className={`block w-full text-left px-3 py-2 text-base font-medium rounded-md transition-colors ${
                        isProfilePage 
                          ? 'bg-slate-100 text-slate-900 border-l-4 border-slate-900' 
                          : 'text-slate-700 hover:text-slate-900 hover:bg-slate-50'
                      }`}
                    >
                      Shop Profile
                    </button>
                    <button
                      onClick={() => console.log('Manage bookings')}
                      className="block w-full text-left px-3 py-2 text-base font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-md"
                    >
                      Manage Bookings
                    </button>
                  </>
                )}

                {/* Common authenticated menu items */}
                {!isHomePage && (
                  <button
                    onClick={() => handleNavigation('/')}
                    className="block w-full text-left px-3 py-2 text-base font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-md"
                  >
                    Home
                  </button>
                )}

                <div className="border-t border-slate-200 pt-4 mt-4">
                  <button
                    onClick={handleSignOut}
                    className="block w-full bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-md font-medium transition-colors"
                  >
                    Sign Out
                  </button>
                </div>
              </>
            ) : (
              <>
                {/* Public menu items */}
                {isHomePage ? (
                  <>
                    <a
                      href="#how-it-works"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block px-3 py-2 text-base font-medium text-slate-700 hover:text-blue-600 hover:bg-slate-50 rounded-md"
                    >
                      How It Works
                    </a>
                    <a
                      href="#about"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block px-3 py-2 text-base font-medium text-slate-700 hover:text-blue-600 hover:bg-slate-50 rounded-md"
                    >
                      About
                    </a>
                    <a
                      href="#mechanics"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block px-3 py-2 text-base font-medium text-slate-700 hover:text-blue-600 hover:bg-slate-50 rounded-md"
                    >
                      Find Mechanics
                    </a>
                  </>
                ) : (
                  <button
                    onClick={() => handleNavigation('/')}
                    className="block w-full text-left px-3 py-2 text-base font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-md"
                  >
                    Home
                  </button>
                )}
                
                <button
                  onClick={handleListGarage}
                  className="block w-full text-left px-3 py-2 text-base font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-md"
                >
                  List Your Shop
                </button>

                <div className="border-t border-slate-200 pt-4 mt-4 space-y-2">
                  <button
                    onClick={handleSignIn}
                    className="block w-full text-left px-3 py-2 text-base font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-md"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={handleSignUp}
                    className="block w-full bg-slate-900 hover:bg-slate-800 text-white px-3 py-2 rounded-md font-medium transition-colors"
                  >
                    Get Started
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Development route indicator */}
          {process.env.NODE_ENV === 'development' && (
            <div className="mt-4 p-2 bg-yellow-100 text-yellow-800 text-xs rounded">
              Route: {pathname}
            </div>
          )}
        </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}