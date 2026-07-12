import { useState } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import { Bell } from 'lucide-react';
import NotificationBox from '@/components/notification/NotificationBox'; // Sesuaikan path

export default function DashboardLayout({ children, breadcrumb }) {
  // State untuk mengontrol buka/tutup popover notifikasi
  const [isNotifOpen, setIsNotifOpen] = useState(false);

  // ASUMSI: Kamu mendapatkan data user dan token dari Context, Redux, atau LocalStorage.
  // Ganti variabel statis ini dengan state global autentikasi kamu nantinya.
  const currentUser = { id: 'user-w1noxry7I1fv2zoV' }; 
  const currentToken = 'jwt_token_kamu_di_sini';

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full bg-[#F9FAFB] overflow-hidden">
        
        <AppSidebar />
        
        <div className="flex-1 flex flex-col min-w-0 overflow-y-auto no-scrollbar">
          
          <header className="h-16 bg-[#F9FAFB] border-b-0 flex items-center justify-between px-8 shrink-0 relative">
            <div>
              {breadcrumb}
            </div>

            {/* Wrapper relative agar NotificationBox bisa diposisikan absolute terhadap icon Bell */}
            <div className="relative">
              <button 
                onClick={() => setIsNotifOpen(!isNotifOpen)} 
                className="p-2 rounded-full hover:bg-neutral-200 transition-colors relative"
              >
                <Bell className="w-5 h-5 text-neutral-800" />
                {/* Opsional: Titik merah indikator unread */}
                <span className="absolute top-1.5 right-2 w-2 h-2 bg-red-500 rounded-full border border-[#F9FAFB]"></span>
              </button>

              {/* Render NotificationBox jika state isNotifOpen bernilai true */}
              {isNotifOpen && (
                <NotificationBox 
                  userId={currentUser?.id}
                  token={currentToken}
                  onClose={() => setIsNotifOpen(false)}
                />
              )}
            </div>
          </header>

          <main className="flex-1 px-8 pb-8 pt-4">
            {children}
          </main>
          
        </div>
      </div>
    </SidebarProvider>
  );
}