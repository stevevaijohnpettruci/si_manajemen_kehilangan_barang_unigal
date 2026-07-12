import DashboardLayout from '../DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
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
import { Plus, Search, ChevronRight, Loader2 } from 'lucide-react';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { useState, useEffect } from 'react';
import { getReports } from '@/api/report-api';

export default function Report() {
  const [reports, setReports] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('semua');

  const [currentPage, setCurrentPage] = useState(1);
  const [meta, setMeta] = useState({ totalData: 0, totalPages: 1 });
  const [currentUserId, setCurrentUserId] = useState(null);

  const handleTabChange = (value) => {
    setActiveTab(value);
    setCurrentPage(1);
  };

  useEffect(() => {
    const fetchReports = async () => {
      try {
        setIsLoading(true);
        const token = localStorage.getItem('accessToken');
        if (!token) return;

        try {
          const payloadBase64 = token.split('.')[1];
          const decodedJson = atob(payloadBase64);
          const decodedData = JSON.parse(decodedJson);
          setCurrentUserId(
            decodedData.id || decodedData.userId || decodedData.user_id,
          );
        } catch (e) {
          console.error('Gagal mengekstrak token:', e);
        }

        const filterParam = activeTab === 'semua' ? '' : activeTab;
        const response = await getReports(token, filterParam, currentPage, 10);

        const payload = response.data.data;

        console.log(payload);
        let reportData = [];
        let reportMeta = { totalData: 0, totalPages: 1 };

        if (payload && payload.data && Array.isArray(payload.data.data)) {
          reportData = payload.data.data;
          reportMeta = payload.data.meta;
        } else if (payload && Array.isArray(payload.data)) {
          reportData = payload.data;
          reportMeta = payload.meta;
        }

        setReports(reportData);
        if (reportMeta) {
          setMeta(reportMeta);
        }
      } catch (err) {
        console.error('Gagal mengambil data laporan:', err);
        setReports([]);
        setMeta({ totalData: 0, totalPages: 1 });
      } finally {
        setIsLoading(false);
      }
    };

    fetchReports();
  }, [activeTab, currentPage]);

  const navigate = useNavigate();

  const topBreadcrumb = (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem className="text-neutral-500">Laporan</BreadcrumbItem>
        <BreadcrumbSeparator>
          <ChevronRight className="h-4 w-4 text-neutral-400" />
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbPage className="text-[#8B52A1] font-medium">
            Semua Laporan
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );

  const handleActionNavigate = (id) => {
    navigate(`/laporan/tindak-lanjut/${id}`);
  };

  return (
    <DashboardLayout breadcrumb={topBreadcrumb}>
      <div className="w-full max-w-[1400px]">
        {/* Header Title & Tabs */}
        <div className="mb-6">
          <h1 className="text-[28px] font-bold text-neutral-900! mb-6 tracking-tight">
            Semua Laporan
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
              Daftar semua laporan
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

          {/* Reports Table */}
          <div className="w-full overflow-x-auto pt-2">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-neutral-100 hover:bg-transparent">
                  <TableHead className="text-neutral-400 font-medium whitespace-nowrap h-10">
                    ID
                  </TableHead>
                  <TableHead className="text-neutral-400 font-medium whitespace-nowrap h-10">
                    Nama Pelapor
                  </TableHead>
                  <TableHead className="text-neutral-400 font-medium whitespace-nowrap h-10">
                    Nama Barang
                  </TableHead>
                  <TableHead className="text-neutral-400 font-medium whitespace-nowrap h-10">
                    Detail Barang
                  </TableHead>
                  <TableHead className="text-neutral-400 font-medium whitespace-nowrap h-10">
                    Kategori
                  </TableHead>

                  {/* Tambahkan TableHead Status di sini */}
                  <TableHead className="text-neutral-400 font-medium whitespace-nowrap h-10">
                    Status
                  </TableHead>

                  <TableHead className="text-neutral-400 font-medium whitespace-nowrap h-10">
                    Lokasi Kehilangan
                  </TableHead>
                  <TableHead className="text-neutral-400 font-medium whitespace-nowrap h-10">
                    No. HP
                  </TableHead>
                  <TableHead className="text-neutral-400 font-medium whitespace-nowrap h-10">
                    Dibuat pada
                  </TableHead>
                  <TableHead className="text-neutral-400 font-medium text-center whitespace-nowrap h-10">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    {/* Ubah colSpan menjadi 10 */}
                    <TableCell colSpan={10} className="h-32 text-center">
                      <div className="flex flex-col items-center justify-center text-neutral-500">
                        <Loader2 className="h-6 w-6 animate-spin mb-2 text-[#8B52A1]" />
                        <p>Memuat data laporan...</p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : !Array.isArray(reports) || reports.length === 0 ? (
                  <TableRow>
                    {/* Ubah colSpan menjadi 10 */}
                    <TableCell
                      colSpan={10}
                      className="h-32 text-center text-neutral-500"
                    >
                      Belum ada data laporan yang tersedia.
                    </TableCell>
                  </TableRow>
                ) : (
                  reports.map((report) => (
                    <TableRow
                      key={report.id}
                      className="border-none hover:bg-neutral-50/50"
                    >
                      <TableCell className="font-medium text-neutral-600 whitespace-nowrap py-4">
                        {report.id.replace('report-', '')}
                      </TableCell>
                      <TableCell className="text-neutral-800 whitespace-nowrap py-4">
                        {report.user_fullname.replace('user-', 'User ')}
                      </TableCell>
                      <TableCell className="text-neutral-800 whitespace-nowrap py-4">
                        {report.item_name} {/* Diubah dari report.item */}
                      </TableCell>
                      <TableCell className="whitespace-nowrap py-4">
                        <Link
                          to={`/laporan/detail/${report.id}`}
                          className="text-[#4DB5AC] hover:text-[#3d968e] underline underline-offset-4 decoration-1 font-medium"
                        >
                          Lihat detail
                        </Link>
                      </TableCell>
                      <TableCell className="whitespace-nowrap py-4">
                        <span
                          className={`font-medium ${
                            report.category === 'lost'
                              ? 'text-[#EF4444]'
                              : 'text-[#22C55E]'
                          }`}
                        >
                          {report.category === 'lost' ? 'Hilang' : 'Ditemukan'}
                        </span>
                      </TableCell>

                      {/* Tambahkan Kolom Status Baru di sini */}
                      <TableCell className="whitespace-nowrap py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            report.status === 'claimed'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-amber-100 text-amber-700'
                          }`}
                        >
                          {report.status === 'claimed'
                            ? 'Claimed'
                            : 'Unclaimed'}
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
                        {report.contact_phone} {/* Diubah dari report.phone */}
                      </TableCell>
                      <TableCell className="text-neutral-800 whitespace-nowrap py-4">
                        {/* Memformat tanggal ISO dari API menjadi format lokal Indonesia */}
                        {new Date(report.created_at).toLocaleDateString(
                          'id-ID',
                          {
                            weekday: 'long',
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                          },
                        )}
                      </TableCell>
                      <TableCell className="text-center whitespace-nowrap py-4">
                        {report.user_id === currentUserId ? (
                          // Tampilan jika ini adalah laporan milik user sendiri
                          <span className="text-[13px] font-medium bg-neutral-100 text-neutral-500 px-3 py-1.5 rounded-md border border-neutral-200">
                            Laporan Anda
                          </span>
                        ) : (
                          <Button
                            onClick={() => handleActionNavigate(report.id)}
                            className="bg-[#8B52A1] hover:bg-[#7a488e] text-white rounded-md w-25 px-6 shadow-none h-8 font-normal text-sm"
                          >
                            {report.category === 'lost' ? 'Laporkan' : 'Klaim'}
                          </Button>
                        )}
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
              Menampilkan {reports.length} laporan di halaman ini (Total:{' '}
              {reports.length} Laporan)
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
                    {currentPage} {/* Angka halaman dinamis */}
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
