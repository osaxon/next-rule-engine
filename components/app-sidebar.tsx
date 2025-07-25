import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  Box,
  Home,
  Settings,
  Sigma,
  User,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";

// Menu items.
const items: Array<{ title: string; url: string; icon: LucideIcon }> = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Companies",
    url: "/companies",
    icon: User,
  },
  {
    title: "Products",
    url: "/products",
    icon: Box,
  },
  {
    title: "Rules",
    url: "/rules",
    icon: Sigma,
  },
  {
    title: "Settings",
    url: "/",
    icon: Settings,
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild>
                <Link href={item.url}>
                  <item.icon />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
