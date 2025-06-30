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
      className="md:hidden"
    >
      <div className="fixed inset-0 z-50" />
      <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <svg width="32" height="32" viewBox="0 0 100 100" className="mr-2">
              <path
                d="M20 15 L20 35 L15 40 L15 50 L20 55 L20 75 L30 85 L40 75 L40 70 L35 65 L35 45 L40 40 L40 35 L30 25 Z"
                fill="#1e40af"
              />
              <path
                d="M80 15 L80 35 L85 40 L85 50 L80 55 L80 75 L70 85 L60 75 L60 70 L65 65 L65 45 L60 40 L60 35 L70 25 Z"
                fill="#ea580c"
              />
              <rect x="42" y="42" width="16" height="16" fill="#1e40af" />
              <rect x="45" y="45" width="10" height="10" fill="#ea580c" />
            </svg>
            <span className="text-lg font-bold text-slate-900">
              MechanicsMatch
            </span>
          </div>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(false)}
            className="p-2 rounded-md text-slate-700 hover:text-blue-600 hover:bg-slate-100 transition-colors"
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
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
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
                      ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600' 
                      : 'text-slate-700 hover:text-blue-600 hover:bg-slate-50'
                  }`}
                >
                  📊 Dashboard
                </button>

                {/* Customer-specific menu items */}
                {user.user_type === 'customer' && (
                  <>
                    <button
                      onClick={() => handleNavigation('/booking')}
                      className={`block w-full text-left px-3 py-2 text-base font-medium rounded-md transition-colors ${
                        isBookingPage 
                          ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600' 
                          : 'text-slate-700 hover:text-blue-600 hover:bg-slate-50'
                      }`}
                    >
                      📅 Book Service
                    </button>
                    <button
                      onClick={() => handleNavigation('/customer/profile')}
                      className={`block w-full text-left px-3 py-2 text-base font-medium rounded-md transition-colors ${
                        isProfilePage 
                          ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600' 
                          : 'text-slate-700 hover:text-blue-600 hover:bg-slate-50'
                      }`}
                    >
                      👤 My Profile
                    </button>
                    <a
                      href="#mechanics"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block px-3 py-2 text-base font-medium text-slate-700 hover:text-blue-600 hover:bg-slate-50 rounded-md"
                    >
                      🔍 Find Mechanics
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
                          ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600' 
                          : 'text-slate-700 hover:text-blue-600 hover:bg-slate-50'
                      }`}
                    >
                      🏪 Shop Profile
                    </button>
                    <button
                      onClick={() => console.log('Manage bookings')}
                      className="block w-full text-left px-3 py-2 text-base font-medium text-slate-700 hover:text-blue-600 hover:bg-slate-50 rounded-md"
                    >
                      📋 Manage Bookings
                    </button>
                  </>
                )}

                {/* Common authenticated menu items */}
                {!isHomePage && (
                  <button
                    onClick={() => handleNavigation('/')}
                    className="block w-full text-left px-3 py-2 text-base font-medium text-slate-700 hover:text-blue-600 hover:bg-slate-50 rounded-md"
                  >
                    🏠 Home
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
                    className="block w-full text-left px-3 py-2 text-base font-medium text-slate-700 hover:text-blue-600 hover:bg-slate-50 rounded-md"
                  >
                    🏠 Home
                  </button>
                )}
                
                <button
                  onClick={handleListGarage}
                  className="block w-full text-left px-3 py-2 text-base font-medium text-slate-700 hover:text-blue-600 hover:bg-slate-50 rounded-md"
                >
                  List Your Shop
                </button>

                <div className="border-t border-slate-200 pt-4 mt-4 space-y-2">
                  <button
                    onClick={handleSignIn}
                    className="block w-full text-left px-3 py-2 text-base font-medium text-slate-700 hover:text-blue-600 hover:bg-slate-50 rounded-md"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={handleSignUp}
                    className="block w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white px-3 py-2 rounded-md font-medium hover:from-blue-700 hover:to-blue-800 transition-all"
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
    </Dialog>
  );
}