import Logo from "@/assets/icons/Logo";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Link } from "react-router";
import {
  authApi,
  useLogoutMutation,
  useUserInfoQuery,
} from "@/redux/features/auth/auth.api";
import { useAppDispatch } from "@/redux/hook";
import { role } from "@/constants/role";
import { ModeToggle } from "./mode.toggle";

const navigationLinks = [
  { href: "/", label: "Home", role: "PUBLIC" },
  { href: "#about", label: "About", role: "PUBLIC" },
  { href: "#faq", label: "FAQ", role: "PUBLIC" },
  { href: "#contact", label: "Contact", role: "PUBLIC" },
  { href: "/admin", label: "Dashboard", role: role.admin },
  { href: "/sender", label: "Dashboard", role: role.sender },
  { href: "/receiver", label: "Dashboard", role: role.receiver },
  { href: "/delivery-man", label: "Dashboard", role: role.delivery_personnel },
  { href: "/pending-delivery-man", label: "Dashboard", role: role.pending_delivery },
];

export default function Navbar() {
  const { data } = useUserInfoQuery(undefined);
  const [logout] = useLogoutMutation();
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    await logout(undefined);
    dispatch(authApi.util.resetApiState());
  };

  const userRole = data?.data?.data?.role;

  return (
    <header className="sticky top-0 z-50 border-b">
      <div className="container mx-auto px-4 flex h-16 items-center justify-between gap-4">
        {/* Left side */}
        <div className="flex items-center gap-2">
          {/* Mobile menu */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                className="group size-8 md:hidden"
                variant="ghost"
                size="icon"
              >
                {/* Hamburger / close animation */}
                <svg
                  className="pointer-events-none"
                  width={16}
                  height={16}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path
                    d="M4 12L20 12"
                    className="origin-center -translate-y-[7px] transition-all duration-300 group-aria-expanded:rotate-[315deg] group-aria-expanded:translate-y-0"
                  />
                  <path
                    d="M4 12H20"
                    className="origin-center transition-all duration-300 group-aria-expanded:rotate-45"
                  />
                  <path
                    d="M4 12H20"
                    className="origin-center translate-y-[7px] transition-all duration-300 group-aria-expanded:rotate-[135deg] group-aria-expanded:translate-y-0"
                  />
                </svg>
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-36 p-1 md:hidden">
              <NavigationMenu className="max-w-none *:w-full">
                <NavigationMenuList className="flex-col items-start gap-0">
                  {navigationLinks
                    .filter(
                      (link) =>
                        link.role === "PUBLIC" || link.role === userRole
                    )
                    .map((link, index) => (
                      <NavigationMenuItem key={index} className="w-full">
                        <NavigationMenuLink asChild className="py-1.5">
                          {link.href.startsWith("#") ? (
                            <a href={link.href}>{link.label}</a>
                          ) : (
                            <Link to={link.href}>{link.label}</Link>
                          )}
                        </NavigationMenuLink>
                      </NavigationMenuItem>
                    ))}
                </NavigationMenuList>
              </NavigationMenu>
            </PopoverContent>
          </Popover>

          {/* Desktop menu */}
          <div className="flex items-center gap-6">
            <Link to="/" className="text-primary hover:text-primary/90">
              <Logo />
            </Link>
            <NavigationMenu className="max-md:hidden">
              <NavigationMenuList className="gap-2">
                {navigationLinks
                  .filter(
                    (link) =>
                      link.role === "PUBLIC" || link.role === userRole
                  )
                  .map((link, index) => (
                    <NavigationMenuItem key={index}>
                      <NavigationMenuLink
                        asChild
                        className="text-muted-foreground hover:text-primary py-1.5 font-medium"
                      >
                        {link.href.startsWith("#") ? (
                          <a href={link.href}>{link.label}</a>
                        ) : (
                          <Link to={link.href}>{link.label}</Link>
                        )}
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2">
          <ModeToggle />
          {data?.data?.data?.email ? (
            <Button
              onClick={handleLogout}
              variant="outline"
              className="text-sm"
            >
              Logout
            </Button>
          ) : (
            <Button asChild className="text-sm">
              <Link to="/login">Login</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
