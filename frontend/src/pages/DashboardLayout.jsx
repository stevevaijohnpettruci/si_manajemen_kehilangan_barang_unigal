import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import { Bell } from 'lucide-react';

export default function DashboardLayout({ children, breadcrumb }) {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full bg-[#F9FAFB] overflow-hidden">
        
        {/* Sidebar Kiri */}
        <AppSidebar />
        
        {/* Area Kanan (Sekarang area ini secara keseluruhan yang bisa di-scroll) */}
        <div className="flex-1 flex flex-col min-w-0 overflow-y-auto no-scrollbar">
          
          {/* Top Bar / Header - Sekarang akan ikut terscroll ke atas */}
          <header className="h-16 bg-[#F9FAFB] border-b-0 flex items-center justify-between px-8 shrink-0">
            <div>
              {breadcrumb}
            </div>
            <button className="p-2 rounded-full hover:bg-neutral-200 transition-colors">
              <Bell className="w-5 h-5 text-neutral-800" />
            </button>
          </header>

          {/* Main Content Area - Hapus overflow-y-auto dari sini */}
          <main className="flex-1 px-8 pb-8 pt-4">
            {children}
          </main>
          
        </div>
      </div>
    </SidebarProvider>
  );
}