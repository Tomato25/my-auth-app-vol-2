import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "../ui/navigation-menu";
import { LanguageSwitcher } from "./LanguageSwitcher";
import AuthButton from "./authButton";
import Links from "./Links";
import ProfileButton from "./profileButton";

export default function Navigation() {

  return (
    <NavigationMenu className="p-4 bg-amber-400">
      <div className="flex justify-between items-center w-screen">
        <NavigationMenuList>
          <Links />
        </NavigationMenuList>
        <NavigationMenuList>
          <NavigationMenuItem>
            <AuthButton />
          </NavigationMenuItem>
          <NavigationMenuItem>
            <ProfileButton />
          </NavigationMenuItem>
          <NavigationMenuItem>
            <LanguageSwitcher />
          </NavigationMenuItem>
        </NavigationMenuList>
      </div>
    </NavigationMenu>
  );
}