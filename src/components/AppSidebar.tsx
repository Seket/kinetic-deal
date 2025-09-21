import { BarChart3, Users, Target, Settings, Home, TrendingUp, UserCheck, Calendar } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const navigation = [
  { title: "Dashboard", url: "/", icon: Home },
  { title: "Pipeline", url: "/pipeline", icon: Target },
  { title: "Leads", url: "/leads", icon: Users },
  { title: "Analytics", url: "/analytics", icon: BarChart3 },
  { title: "Activities", url: "/activities", icon: Calendar },
  { title: "Team", url: "/team", icon: UserCheck },
  { title: "Settings", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const isCollapsed = state === "collapsed";

  const isActive = (path: string) => currentPath === path;
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive 
      ? "bg-sidebar-accent text-sidebar-primary-foreground font-medium border-r-2 border-sidebar-primary" 
      : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-smooth";

  return (
    <Sidebar className={isCollapsed ? "w-14" : "w-64"} collapsible="icon">
      <SidebarContent className="bg-sidebar">
        {/* Logo/Brand Section */}
        <div className="p-6 border-b border-sidebar-border">
          {!isCollapsed ? (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
                <TrendingUp className="h-4 w-4 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-sidebar-foreground">SalesPro</h1>
                <p className="text-xs text-sidebar-foreground/70">Sales Pipeline CRM</p>
              </div>
            </div>
          ) : (
            <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center mx-auto">
              <TrendingUp className="h-4 w-4 text-white" />
            </div>
          )}
        </div>

        <SidebarGroup className="px-3 py-4">
          <SidebarGroupLabel className="text-sidebar-foreground/50 text-xs uppercase tracking-wider mb-2">
            {!isCollapsed && "Navigation"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {navigation.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end
                      className={getNavCls}
                    >
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      {!isCollapsed && (
                        <span className="ml-3 font-medium">{item.title}</span>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Quick Stats */}
        {!isCollapsed && (
          <div className="mt-auto p-4 border-t border-sidebar-border">
            <div className="gradient-primary rounded-lg p-4 text-white">
              <h3 className="font-semibold text-sm mb-2">This Month</h3>
              <div className="space-y-1 text-xs">
                <div className="flex justify-between">
                  <span>Deals Won</span>
                  <span>12</span>
                </div>
                <div className="flex justify-between">
                  <span>Revenue</span>
                  <span>$45,2K</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </SidebarContent>
    </Sidebar>
  );
}