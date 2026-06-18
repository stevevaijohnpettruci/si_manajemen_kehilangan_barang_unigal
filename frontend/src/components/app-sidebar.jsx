import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from './ui/sidebar';
import { LogOut } from 'lucide-react';
// 1. Ganti useParams dengan useLocation dan import Link
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';
import Swal from 'sweetalert2';
import { getInitials } from '@/lib/utils';

// 2. Hapus properti 'active: true' yang di-hardcode
const navigation = [
  {
    label: 'Laporan',
    items: [
      { title: 'Semua Laporan', href: '/laporan/semua' },
      { title: 'Laporan Saya', href: '/laporan/saya' },
      { title: 'Buat Laporan', href: '/laporan/buat' },
    ],
  },
  {
    label: 'Klaim',
    items: [
      { title: 'Pengajuan Masuk', href: '/klaim/pengajuan-masuk' },
      { title: 'Riwayat Klaim', href: '/klaim/riwayat-klaim' },
    ],
  },
  {
    label: 'Settings',
    items: [{ title: 'Notification Settings', href: '/settings/notifikasi' }],
  },
];

export function AppSidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const { user, logout } = useContext(AuthContext);
  console.log(user);
  const handleLogout = async () => {
    const result = await Swal.fire({
      title: 'Keluar dari akun?',
      text: 'Anda akan keluar dari sistem SILACAK',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ya, keluar',
      cancelButtonText: 'Batal',
      confirmButtonColor: '#9455B5',
      cancelButtonColor: '#6b7280',
    });

    if (result.isConfirmed) {
      try {
        await logout();

        await Swal.fire({
          title: 'Berhasil!',
          text: 'Anda berhasil keluar',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false,
        });

        navigate('/');
      } catch (error) {
        console.error('Gagal logout:', error);
        Swal.fire({
          title: 'Logout gagal',
          text: 'Terjadi kesalahan saat keluar dari akun',
          icon: 'error',
        });
      }
    }
  };

  return (
    <Sidebar className="bg-[#9455B5] border-none text-white">
      {/* Header - Logo */}
      <SidebarHeader className="px-4 py-4 border-b border-white/20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden bg-white/20 flex-shrink-0">
            <img
              src="/favicon.svg"
              alt="Logo Universitas Galuh"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="leading-tight">
            <p className="text-white font-bold text-lg leading-none">SILACAK</p>
            <p className="text-white/80 text-sm">Universitas Galuh</p>
          </div>
        </div>
      </SidebarHeader>

      {/* Content - Navigation */}
      <SidebarContent className="px-2 ">
        {navigation.map((group) => (
          <SidebarGroup key={group.label}>
            <SidebarGroupLabel className="text-white font-bold text-sm px-2 mb-1 uppercase tracking-wide">
              {group.label}
            </SidebarGroupLabel>
            <SidebarMenu>
              {group.items.map((item) => {
                // 4. Cek apakah pathname saat ini sama dengan href item
                const isActive = location.pathname === item.href;

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      className={`
                        text-white/90 hover:bg-white/10 hover:text-white rounded-md
                        data-[active=true]:bg-transparent data-[active=true]:font-bold
                        data-[active=true]:text-white data-[active=true]:border-l-2
                        data-[active=true]:border-white data-[active=true]:rounded-none
                        data-[active=true]:pl-3
                      `}
                    >
                      {/* 5. Gunakan komponen Link dari react-router-dom */}
                      <Link to={item.href}>{item.title}</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroup>
        ))}
      </SidebarContent>

      {/* Footer - User & Logout */}
      <SidebarFooter className="border-t border-white/20 px-4 py-3">
        {/* User info */}
        <div className="flex items-center gap-3 mb-3">
          <div className="w-9 h-9 rounded-full overflow-hidden flex-shrink-0 bg-white/20 flex items-center justify-center">
            {user?.avatar_url ? (
              <img
                src={user.avatar_url}
                alt="Avatar"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-white font-semibold text-sm leading-none">
                {getInitials(user?.full_name || 'Pengguna')}
              </span>
            )}
          </div>
          <div className="leading-tight">
            <p className="text-white font-semibold text-sm leading-none">
              {user?.full_name || 'Pengguna'}
            </p>

            <p className="text-white/70 text-xs mt-0.5">
              {user?.role || 'User'}
            </p>
          </div>
        </div>

        {/* Logout */}
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={() => handleLogout()}
              className="text-white/90 hover:bg-white/10 hover:text-white w-full"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
