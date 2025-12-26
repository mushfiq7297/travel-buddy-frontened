import { getCookie } from "@/services/auth/tokenHandlers";
import { getUserInfo } from "@/services/auth/getUserInfo";
import { Menu } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "../ui/sheet";
import UserMenu from "./UserMenu";


const PublicNavbar = async () => {
  const navItems = [
    { href: "/", label: "Explore Travelers" },
    { href: "/find-buddy", label: "Find Travel Buddy" },
  ];

  const accessToken = await getCookie("accessToken");
  let user = null;

  if (accessToken) {
    user = await getUserInfo(); // {name, role, photo}
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold text-primary">TravelBuddy</span>
        </Link>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          {navItems.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-foreground hover:text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right Side */}
        <div className="hidden md:flex items-center space-x-2">
          {user ? <UserMenu user={user} /> : (
            <Link href="/login">
              <Button>Login</Button>
            </Link>
          )}
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline">
                <Menu />
              </Button>
            </SheetTrigger>

            <SheetContent side="right" className="w-[300px] sm:w-[400px] p-4">
              <SheetTitle className="sr-only">Menu</SheetTitle>

              <nav className="flex flex-col space-y-4 mt-8">
                {navItems.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="text-lg font-medium"
                  >
                    {link.label}
                  </Link>
                ))}

                <div className="border-t pt-4 flex flex-col space-y-4">
                  {user ? (
                    <UserMenu user={user} />
                  ) : (
                    <Link href="/login">
                      <Button className="w-full">Login</Button>
                    </Link>
                  )}
                </div>
              </nav>

            </SheetContent>
          </Sheet>
        </div>

      </div>
    </header>
  );
};

export default PublicNavbar;
