import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col">
          <header className="h-14 flex items-center border-b bg-background px-6 shadow-sm">
            <SidebarTrigger className="text-muted-foreground hover:text-foreground transition-smooth" />
            <div className="ml-4">
              <h1 className="text-lg font-semibold bg-gradient-primary bg-clip-text text-transparent">
                AI Note Summarizer
              </h1>
            </div>
          </header>
          
          <main className="flex-1 p-6 bg-gradient-subtle">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}