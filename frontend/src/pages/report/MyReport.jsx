import DashboardLayout from '../DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getReportByUserId } from '@/api/report-api';
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
import {
  Plus,
  Search,
  ChevronRight,
  Inbox,
  Trash2,
  Pencil,
  Loader2,
} from 'lucide-react';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

export default function MyReport() {
  const navigate = useNavigate();
  
  const [myReports, setMyReports] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [meta, setMeta] = useState({ totalData: 0, totalPages: 1 });
  
  // STATE BARU UNTUK TAB
  const [activeTab, setActiveTab] = useState('semua');

  // FUNGSI UNTUK MENGGANTI TAB & RESET HALAMAN
  const handleTabChange = (value) => {
    setActiveTab(value);
    setCurrentPage(1); 
  };

  useEffect(() => {
    const fetchMyReports = async () => {
      try {
        setIsLoading(true);
        const token = localStorage.getItem('accessToken');
        let userId = '';

        if (token) {
          const payloadBase64 = token.split('.')[1];
          const decodedJson = atob(payloadBase64);
          const decodedData = JSON.parse(decodedJson);
          userId = decodedData.id || decodedData.userId || decodedData.user_id;
        }

        if (userId && token) {
          // Siapkan filter
          const filterParam = activeTab === 'semua' ? '' : activeTab;
          
          // Kirim userId, token, filter, currentPage, dan limit
          const response = await getReportByUserId(userId, token, filterParam, currentPage, 10);
          
          const payload = response.data;
          let reportData = [];
          let reportMeta = { totalData: 0, totalPages: 1 };

          if (payload && payload.data && Array.isArray(payload.data.data)) {
            reportData = payload.data.data;
            reportMeta = payload.data.meta;
          } else if (payload && Array.isArray(payload.data)) {
            reportData = payload.data;
            reportMeta = payload.meta;
          }

          setMyReports(reportData);
          if (reportMeta) {
            setMeta(reportMeta);
          }
        }
      } catch (error) {
        console.error('Gagal mengambil data laporan saya:', error);
        setMyReports([]);
        setMeta({ totalData: 0, totalPages: 1 });
      } finally {
        setIsLoading(false);
      }
    };

    fetchMyReports();
  }, [currentPage, activeTab]); // Tambahkan activeTab ke dalam dependency array

  const topBreadcrumb = (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem className="text-neutral-500">Laporan</BreadcrumbItem>
        <BreadcrumbSeparator>
          <ChevronRight className="h-4 w-4 text-neutral-400" />
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbPage className="text-[#8B52A1] font-medium">
            Laporan Saya
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );

  return (
    <DashboardLayout breadcrumb={topBreadcrumb}>
      <div className="w-full max-w-[1400px]">
        {/* Header Title & Tabs */}
        <div className="mb-6">
          <h1 className="text-[28px] font-bold !text-neutral-900 mb-6 tracking-tight">
            Laporan Saya
          </h1>
          {/* PASANG value & onValueChange DI SINI */}
          <Tabs value={activeTab} onValueChange={handleTabChange} className="w-fit">
            <TabsList className="bg-transparent border-b border-neutral-200 w-full justify-start rounded-none h-auto p-0 space-x-8">
              <TabsTrigger
                value="semua"
                className="data-[state=active]:border-[#8B52A1] data-[state=active]:text-[#8B52A1] data-[state=active]:shadow-none border-b-2 border-transparent rounded-none px-0 py-3 text-[15px] font-medium text-neutral-500"
              >
                Semua Laporan
              </TabsTrigger>
              <TabsTrigger
                value="hari-ini"
                className="data-[state=active]:border-[#8B52A1] data-[state=active]:text-[#8B52A1] data-[state=active]:shadow-none border-b-2 border-transparent rounded-none px-0 py-3 text-[15px] font-medium text-neutral-500"
              >
                Hari ini
              </TabsTrigger>
              <TabsTrigger
                value="3-hari"
                className="data-[state=active]:border-[#8B52A1] data-[state=active]:text-[#8B52A1] data-[state=active]:shadow-none border-b-2 border-transparent rounded-none px-0 py-3 text-[15px] font-medium text-neutral-500"
              >
                3 Hari yang lalu
              </TabsTrigger>
              <TabsTrigger
                value="1-minggu"
                className="data-[state=active]:border-[#8B52A1] data-[state=active]:text-[#8B52A1] data-[state=active]:shadow-none border-b-2 border-transparent rounded-none px-0 py-3 text-[15px] font-medium text-neutral-500"
              >
                1 Minggu yang lalu
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Main Content Card */}
        <div className="bg-white p-6 md:p-8 rounded-xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)] border border-neutral-100 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <h2 className="text-base font-normal !text-neutral-800">
              Daftar laporan saya
            </h2>

            <Button
              onClick={() => navigate('/laporan/buat')}
              className="bg-[#8B52A1] hover:bg-[#7a488e] text-white rounded-md px-4 shadow-none font-normal h-9"
            >
              Tambah Laporan <Plus className="ml-1.5 h-4 w-4" />
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
              placeholder="Cari laporan kamu...."
              className="pl-10 h-11 rounded-lg border-neutral-200 focus-visible:ring-[#8B52A1] bg-white text-sm"
            />
          </div>

          {/* Kondisional Render: Loading / Table / Empty State */}
          {isLoading ? (
            <div className="py-20 flex flex-col items-center justify-center">
              <Loader2 className="h-8 w-8 text-[#8B52A1] animate-spin mb-4" />
              <p className="text-neutral-500">Memuat data laporan...</p>
            </div>
          ) : myReports.length > 0 ? (
            <>
              {/* Reports Table - My Report */}
              <div className="w-full overflow-x-auto pt-2">
                <Table>
                  <TableHeader>
                    <TableRow className="border-b border-neutral-100 hover:bg-transparent">
                      <TableHead className="text-neutral-400 font-medium whitespace-nowrap h-10">ID</TableHead>
                      <TableHead className="text-neutral-400 font-medium whitespace-nowrap h-10">Nama Barang</TableHead>
                      <TableHead className="text-neutral-400 font-medium whitespace-nowrap h-10">Deskripsi Barang</TableHead>
                      <TableHead className="text-neutral-400 font-medium whitespace-nowrap h-10">Kategori</TableHead>
                      <TableHead className="text-neutral-400 font-medium whitespace-nowrap h-10">Lokasi Kehilangan</TableHead>
                      <TableHead className="text-neutral-400 font-medium whitespace-nowrap h-10">No. HP</TableHead>
                      <TableHead className="text-neutral-400 font-medium whitespace-nowrap h-10">Status</TableHead>
                      <TableHead className="text-neutral-400 font-medium whitespace-nowrap h-10">Dibuat pada</TableHead>
                      <TableHead className="text-neutral-400 font-medium text-center whitespace-nowrap h-10">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {myReports.map((report) => (
                      <TableRow
                        key={report.id}
                        className="border-none hover:bg-neutral-50/50"
                      >
                        <TableCell className="font-medium text-neutral-600 whitespace-nowrap py-4">
                          {report.id.substring(0, 10)}...
                        </TableCell>
                        <TableCell className="text-neutral-800 whitespace-nowrap py-4">
                          {report.item_name}
                        </TableCell>
                        <TableCell className="whitespace-nowrap py-4">
                          <a
                            href={`/laporan/detail/${report.id}`}
                            className="text-[#4DB5AC] hover:text-[#3d968e] underline underline-offset-4 decoration-1 font-medium"
                          >
                            Lihat detail
                          </a>
                        </TableCell>
                        <TableCell className="whitespace-nowrap py-4">
                          <span
                            className={`font-medium ${report.category === 'lost' ? 'text-[#EF4444]' : 'text-[#22C55E]'}`}
                          >
                            {report.category === 'lost' ? 'Hilang' : 'Ditemukan'}
                          </span>
                        </TableCell>
                        <TableCell className="text-neutral-800 whitespace-nowrap py-4">
                          <div
                            className="max-w-[150px] truncate"
                            title={report.location_lost}
                          >
                            {report.location_lost}
                          </div>
                        </TableCell>
                        <TableCell className="text-neutral-800 whitespace-nowrap py-4">
                          {report.contact_phone}
                        </TableCell>
                        <TableCell className="whitespace-nowrap py-4">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              report.status === 'claimed'
                                ? 'bg-green-100 text-green-700'
                                : 'bg-amber-100 text-amber-700'
                            }`}
                          >
                            {report.status === 'claimed' ? 'Claimed' : 'Unclaimed'}
                          </span>
                        </TableCell>
                        <TableCell className="text-neutral-800 whitespace-nowrap py-4">
                          {new Date(report.created_at || report.date_lost).toLocaleDateString('id-ID', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric'
                          })}
                        </TableCell>
                        <TableCell className="text-center whitespace-nowrap py-4">
                          <div className="flex items-center justify-center gap-3">
                            <button className="text-red-500 hover:text-red-600 transition-colors">
                              <Trash2
                                className="h-[18px] w-[18px]"
                                strokeWidth={2}
                              />
                            </button>
                            <button className="text-blue-500 hover:text-blue-600 transition-colors">
                              <Pencil
                                className="h-[18px] w-[18px]"
                                strokeWidth={2}
                              />
                            </button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Pagination Section */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-10 pb-2 border-t-0 border-neutral-100">
                <p className="text-[14px] text-blue-500 font-medium">
                  Menampilkan {myReports.length} laporan di halaman ini (Total: {meta.totalData} Laporan)
                </p>
                <Pagination className="mx-0 w-auto">
                  <PaginationContent className="gap-2">
                    <PaginationItem>
                      <PaginationPrevious
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          if (currentPage > 1) setCurrentPage(currentPage - 1);
                        }}
                        className={`border border-neutral-200 rounded-md shadow-sm h-9 px-3 flex items-center justify-center text-neutral-500 ${
                          currentPage === 1
                            ? 'opacity-50 cursor-not-allowed hover:bg-transparent'
                            : 'hover:bg-neutral-50 bg-white'
                        }`}
                      />
                    </PaginationItem>

                    <PaginationItem>
                      <PaginationLink
                        href="#"
                        isActive
                        className="bg-[#8B52A1] text-white hover:bg-[#7a488e] border-none rounded-md shadow-sm h-9 w-9 p-0 flex items-center justify-center font-normal"
                      >
                        {currentPage}
                      </PaginationLink>
                    </PaginationItem>

                    <PaginationItem>
                      <PaginationNext
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          if (currentPage < meta.totalPages) setCurrentPage(currentPage + 1);
                        }}
                        className={`border border-neutral-200 rounded-md shadow-sm h-9 px-3 flex items-center justify-center text-neutral-500 ${
                          currentPage === meta.totalPages || meta.totalPages === 0
                            ? 'opacity-50 cursor-not-allowed hover:bg-transparent'
                            : 'hover:bg-neutral-50 bg-white'
                        }`}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            </>
          ) : (
            /* Empty State */
            <div className="py-20 px-4 mt-6 text-center border-2 border-dashed border-neutral-200 rounded-xl bg-neutral-50/50 flex flex-col items-center justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-neutral-100 mb-4">
                <Inbox className="h-8 w-8 text-neutral-400" strokeWidth={1.5} />
              </div>
              <h3 className="text-[16px] font-semibold text-neutral-900 mb-1.5">
                Belum ada laporan
              </h3>
              <p className="text-neutral-500 text-[14px] max-w-[320px] mx-auto mb-6 leading-relaxed">
                Kamu belum memiliki riwayat laporan untuk periode ini.
              </p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}