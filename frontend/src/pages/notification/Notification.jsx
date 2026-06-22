import DashboardLayout from '../DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from '@/components/ui/breadcrumb';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, ChevronRight, Loader2, Check, CheckCheck, Trash2 } from 'lucide-react';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { useState, useEffect } from 'react';
import { 
  getNotifications, 
  markNotificationAsRead, 
  markAllAsRead, 
  deleteNotification 
} from '@/api/notification-api';

export default function Notification() {
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('semua');

  const [currentPage, setCurrentPage] = useState(1);
  const [meta, setMeta] = useState({ totalData: 0, totalPages: 1 });
  const [currentUserId, setCurrentUserId] = useState(null);

  const handleTabChange = (value) => {
    setActiveTab(value);
    setCurrentPage(1);
  };

  const fetchNotifications = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem('accessToken');
      if (!token) return;

      let extractedUserId = currentUserId;

      if (!extractedUserId) {
        try {
          const payloadBase64 = token.split('.')[1];
          const decodedJson = atob(payloadBase64);
          const decodedData = JSON.parse(decodedJson);
          extractedUserId = decodedData.id || decodedData.userId || decodedData.user_id;
          setCurrentUserId(extractedUserId);
        } catch (e) {
          console.error('Gagal mengekstrak token:', e);
        }
      }

      if (!extractedUserId) return;

      // Filter parameter (opsional: jika backend belum dukung filter by read/unread, 
      // ini bisa difilter di frontend nantinya, untuk sekarang kita pass default)
      const response = await getNotifications(extractedUserId, token, currentPage, 10);

      const payload = response.data.data || response.data;
      let notifData = [];
      let notifMeta = { totalData: 0, totalPages: 1 };

      if (payload && payload.data && Array.isArray(payload.data)) {
        notifData = payload.data;
        notifMeta = payload.meta || notifMeta;
      } else if (Array.isArray(payload)) {
        notifData = payload;
        notifMeta = response.data.meta || notifMeta;
      }

      // Filter di frontend jika tab aktif bukan "semua" (Opsional, sesuaikan kebutuhan)
      if (activeTab === 'belum-dibaca') {
        notifData = notifData.filter(n => !n.is_read);
      } else if (activeTab === 'sudah-dibaca') {
        notifData = notifData.filter(n => n.is_read);
      }

      setNotifications(notifData);
      if (notifMeta) {
        setMeta(notifMeta);
      }
    } catch (err) {
      console.error('Gagal mengambil data notifikasi:', err);
      setNotifications([]);
      setMeta({ totalData: 0, totalPages: 1 });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, [activeTab, currentPage]);

  const topBreadcrumb = (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem className="text-neutral-500">Notifikasi</BreadcrumbItem>
        <BreadcrumbSeparator>
          <ChevronRight className="h-4 w-4 text-neutral-400" />
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbPage className="text-[#8B52A1] font-medium">
            Riwayat Notifikasi
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );

  // --- Handlers ---
  const handleMarkAsRead = async (id) => {
    try {
      const token = localStorage.getItem('accessToken');
      setNotifications(prev => prev.map(n => n.id === id ? { ...n, is_read: true } : n));
      await markNotificationAsRead(id, currentUserId, token);
    } catch (error) {
      console.error('Gagal menandai dibaca:', error);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      setNotifications(prev => prev.map(n => ({ ...n, is_read: true })));
      await markAllAsRead(currentUserId, token);
    } catch (error) {
      console.error('Gagal menandai semua dibaca:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('accessToken');
      setNotifications(prev => prev.filter(n => n.id !== id));
      await deleteNotification(id, currentUserId, token);
    } catch (error) {
      console.error('Gagal menghapus notifikasi:', error);
    }
  };

  return (
    <DashboardLayout breadcrumb={topBreadcrumb}>
      <div className="w-full max-w-[1400px]">
        {/* Header Title & Tabs */}
        <div className="mb-6">
          <h1 className="text-[28px] font-bold !text-neutral-900 mb-6 tracking-tight">
            Riwayat Notifikasi
          </h1>
          <Tabs
            defaultValue="semua"
            value={activeTab}
            onValueChange={handleTabChange}
            className="w-fit"
          >
            <TabsList className="bg-transparent border-b border-neutral-200 w-full justify-start rounded-none h-auto p-0 space-x-8">
              <TabsTrigger
                value="semua"
                className="data-[state=active]:border-[#8B52A1] data-[state=active]:text-[#8B52A1] data-[state=active]:shadow-none border-b-2 border-transparent rounded-none px-0 py-3 text-[15px] font-medium text-neutral-500"
              >
                Semua Notifikasi
              </TabsTrigger>
              <TabsTrigger
                value="belum-dibaca"
                className="data-[state=active]:border-[#8B52A1] data-[state=active]:text-[#8B52A1] data-[state=active]:shadow-none border-b-2 border-transparent rounded-none px-0 py-3 text-[15px] font-medium text-neutral-500"
              >
                Belum Dibaca
              </TabsTrigger>
              <TabsTrigger
                value="sudah-dibaca"
                className="data-[state=active]:border-[#8B52A1] data-[state=active]:text-[#8B52A1] data-[state=active]:shadow-none border-b-2 border-transparent rounded-none px-0 py-3 text-[15px] font-medium text-neutral-500"
              >
                Sudah Dibaca
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Main Content Card */}
        <div className="bg-white p-6 md:p-8 rounded-xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)] border border-neutral-100 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <h2 className="text-base font-normal !text-neutral-800">
              Daftar riwayat notifikasi kamu
            </h2>
            <Button
              onClick={handleMarkAllAsRead}
              variant="outline"
              className="text-[#8B52A1] border-[#8B52A1] hover:bg-[#8B52A1] hover:text-white rounded-md px-4 shadow-none font-normal h-9 transition-colors"
            >
              Tandai Semua Dibaca <CheckCheck className="ml-1.5 h-4 w-4" />
            </Button>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search
              className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-900 font-bold"
              strokeWidth={2.5}
            />
            <Input
              type="search"
              placeholder="Cari notifikasi...."
              className="pl-10 h-11 rounded-lg border-neutral-200 focus-visible:ring-[#8B52A1] bg-white text-sm"
            />
          </div>

          {/* Notifications Table */}
          <div className="w-full overflow-x-auto pt-2">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-neutral-100 hover:bg-transparent">
                  <TableHead className="text-neutral-400 font-medium whitespace-nowrap h-10 w-[200px]">
                    Judul
                  </TableHead>
                  <TableHead className="text-neutral-400 font-medium whitespace-nowrap h-10">
                    Pesan
                  </TableHead>
                  <TableHead className="text-neutral-400 font-medium whitespace-nowrap h-10 w-[150px]">
                    Status
                  </TableHead>
                  <TableHead className="text-neutral-400 font-medium whitespace-nowrap h-10 w-[200px]">
                    Diterima pada
                  </TableHead>
                  <TableHead className="text-neutral-400 font-medium text-center whitespace-nowrap h-10 w-[150px]">
                    Aksi
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={5} className="h-32 text-center">
                      <div className="flex flex-col items-center justify-center text-neutral-500">
                        <Loader2 className="h-6 w-6 animate-spin mb-2 text-[#8B52A1]" />
                        <p>Memuat riwayat notifikasi...</p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : !Array.isArray(notifications) || notifications.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="h-32 text-center text-neutral-500"
                    >
                      Belum ada notifikasi yang tersedia.
                    </TableCell>
                  </TableRow>
                ) : (
                  notifications.map((notif) => (
                    <TableRow
                      key={notif.id}
                      className={`border-none hover:bg-neutral-50/50 transition-colors ${!notif.is_read ? 'bg-blue-50/30' : ''}`}
                    >
                      <TableCell className="font-semibold text-neutral-800 py-4">
                        {notif.title}
                      </TableCell>
                      <TableCell className="text-neutral-600 py-4">
                        <div className="max-w-[400px] line-clamp-2" title={notif.message}>
                          {notif.message}
                        </div>
                      </TableCell>
                      <TableCell className="py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            notif.is_read
                              ? 'bg-neutral-100 text-neutral-600'
                              : 'bg-blue-100 text-blue-700'
                          }`}
                        >
                          {notif.is_read ? 'Sudah Dibaca' : 'Baru'}
                        </span>
                      </TableCell>
                      <TableCell className="text-neutral-800 whitespace-nowrap py-4 text-sm">
                        {new Date(notif.created_at).toLocaleDateString('id-ID', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </TableCell>
                      <TableCell className="text-center py-4">
                        <div className="flex items-center justify-center gap-2">
                          {!notif.is_read && (
                            <Button
                              onClick={() => handleMarkAsRead(notif.id)}
                              variant="ghost"
                              size="icon"
                              title="Tandai dibaca"
                              className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                            >
                              <Check className="h-4 w-4" />
                            </Button>
                          )}
                          <Button
                            onClick={() => handleDelete(notif.id)}
                            variant="ghost"
                            size="icon"
                            title="Hapus"
                            className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination Section */}
          <div className="flex items-center justify-between pt-16">
            <p className="text-[14px] text-blue-500 font-medium">
              Menampilkan {notifications.length} notifikasi di halaman ini
            </p>
            <Pagination className="w-auto m-0">
              <PaginationContent className="gap-1">
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (currentPage > 1) setCurrentPage(currentPage - 1);
                    }}
                    className={`border border-neutral-200 rounded shadow-sm h-8 px-3 flex items-center justify-center text-neutral-500 ${
                      currentPage === 1
                        ? 'opacity-50 cursor-not-allowed hover:bg-transparent'
                        : 'hover:bg-neutral-50'
                    }`}
                  />
                </PaginationItem>

                <PaginationItem>
                  <PaginationLink
                    href="#"
                    isActive
                    className="bg-[#8B52A1] text-white hover:bg-[#7a488e] border-none rounded shadow-sm h-8 w-8 p-0 flex items-center justify-center font-normal"
                  >
                    {currentPage}
                  </PaginationLink>
                </PaginationItem>

                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (currentPage < meta.totalPages)
                        setCurrentPage(currentPage + 1);
                    }}
                    className={`border border-neutral-200 rounded shadow-sm h-8 px-3 flex items-center justify-center text-neutral-500 ${
                      currentPage === meta.totalPages
                        ? 'opacity-50 cursor-not-allowed hover:bg-transparent'
                        : 'hover:bg-neutral-50'
                    }`}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}