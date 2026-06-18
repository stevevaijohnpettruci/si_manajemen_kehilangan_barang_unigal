import DashboardLayout from '../DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useNavigate, Link } from 'react-router-dom';
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
import { Search, ChevronRight, Loader2, ArrowRight } from 'lucide-react';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { useState, useEffect } from 'react';

// Sesuaikan import ini dengan path file API kamu
import { getClaimByUserId } from '@/api/claim-api';

export default function ClaimHistory() {
  const [claims, setClaims] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('semua');

  const [currentPage, setCurrentPage] = useState(1);
  const [meta, setMeta] = useState({ totalData: 0, totalPages: 1 });
  const [currentUserId, setCurrentUserId] = useState(null);

  const navigate = useNavigate();

  const handleTabChange = (value) => {
    setActiveTab(value);
    setCurrentPage(1);
  };

  useEffect(() => {
    const fetchClaims = async () => {
      try {
        setIsLoading(true);
        const token = localStorage.getItem('accessToken');
        if (!token) return;

        let userId = '';
        try {
          const payloadBase64 = token.split('.')[1];
          const decodedJson = atob(payloadBase64);
          const decodedData = JSON.parse(decodedJson);
          userId = decodedData.id || decodedData.userId || decodedData.user_id;
          setCurrentUserId(userId);
        } catch (e) {
          console.error('Gagal mengekstrak token:', e);
        }

        if (!userId) return;

        // Fetch data berdasarkan user_id, token, page, dan limit (10)
        const response = await getClaimByUserId(userId, token, currentPage, 10);

        const payload = response.data?.data || response.data;
        let claimData = [];
        let claimMeta = { totalData: 0, totalPages: 1 };

        if (payload && payload.data && Array.isArray(payload.data.data)) {
          claimData = payload.data.data;
          claimMeta = payload.data.meta;
        } else if (payload && Array.isArray(payload.data)) {
          claimData = payload.data;
          claimMeta = payload.meta;
        } else if (Array.isArray(payload)) {
          claimData = payload;
        }

        // Filter Manual di sisi Frontend berdasarkan Tab Status
        if (activeTab !== 'semua') {
          claimData = claimData.filter((claim) => claim.status === activeTab);
        }

        setClaims(claimData);
        if (claimMeta) {
          setMeta(claimMeta);
        }
      } catch (err) {
        console.error('Gagal mengambil data riwayat klaim:', err);
        setClaims([]);
        setMeta({ totalData: 0, totalPages: 1 });
      } finally {
        setIsLoading(false);
      }
    };

    fetchClaims();
  }, [activeTab, currentPage]);

  const topBreadcrumb = (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem className="text-neutral-500">Klaim</BreadcrumbItem>
        <BreadcrumbSeparator>
          <ChevronRight className="h-4 w-4 text-neutral-400" />
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbPage className="text-[#8B52A1] font-medium">
            Riwayat Klaim
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
          <h1 className="text-[28px] font-bold text-neutral-900! mb-6 tracking-tight">
            Riwayat Klaim
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
                Semua Riwayat
              </TabsTrigger>
              <TabsTrigger
                value="pending"
                className="data-[state=active]:border-[#8B52A1] data-[state=active]:text-[#8B52A1] data-[state=active]:shadow-none border-b-2 border-transparent rounded-none px-0 py-3 text-[15px] font-medium text-neutral-500"
              >
                Menunggu (Pending)
              </TabsTrigger>
              <TabsTrigger
                value="accepted"
                className="data-[state=active]:border-[#8B52A1] data-[state=active]:text-[#8B52A1] data-[state=active]:shadow-none border-b-2 border-transparent rounded-none px-0 py-3 text-[15px] font-medium text-neutral-500"
              >
                Disetujui
              </TabsTrigger>
              <TabsTrigger
                value="rejected"
                className="data-[state=active]:border-[#8B52A1] data-[state=active]:text-[#8B52A1] data-[state=active]:shadow-none border-b-2 border-transparent rounded-none px-0 py-3 text-[15px] font-medium text-neutral-500"
              >
                Ditolak
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Main Content Card */}
        <div className="bg-white p-6 md:p-8 rounded-xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)] border border-neutral-100 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <h2 className="text-base font-normal !text-neutral-800">
              Daftar pengajuan klaim dan laporan temuan Anda
            </h2>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search
              className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-900 font-bold"
              strokeWidth={2.5}
            />
            <Input
              type="search"
              placeholder="Cari riwayat klaim kamu...."
              className="pl-10 h-11 rounded-lg border-neutral-200 focus-visible:ring-[#8B52A1] bg-white text-sm"
            />
          </div>

          {/* Claims Table */}
          <div className="w-full overflow-x-auto pt-2">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-neutral-100 hover:bg-transparent">
                  <TableHead className="text-neutral-400 font-medium whitespace-nowrap h-10">ID Klaim</TableHead>
                  <TableHead className="text-neutral-400 font-medium whitespace-nowrap h-10">ID Laporan</TableHead>
                  <TableHead className="text-neutral-400 font-medium whitespace-nowrap h-10">Tipe Pengajuan</TableHead>
                  <TableHead className="text-neutral-400 font-medium whitespace-nowrap h-10">Nama Pemohon</TableHead>
                  {/* Kolom No HP yang ditambahkan */}
                  <TableHead className="text-neutral-400 font-medium whitespace-nowrap h-10">No. HP</TableHead>
                  <TableHead className="text-neutral-400 font-medium whitespace-nowrap h-10">Lokasi</TableHead>
                  <TableHead className="text-neutral-400 font-medium whitespace-nowrap h-10">Status</TableHead>
                  <TableHead className="text-neutral-400 font-medium whitespace-nowrap h-10">Diajukan pada</TableHead>
                  <TableHead className="text-neutral-400 font-medium text-center whitespace-nowrap h-10">Laporan Asli</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    {/* colSpan 9 disesuaikan dengan jumlah TableHead */}
                    <TableCell colSpan={9} className="h-32 text-center">
                      <div className="flex flex-col items-center justify-center text-neutral-500">
                        <Loader2 className="h-6 w-6 animate-spin mb-2 text-[#8B52A1]" />
                        <p>Memuat riwayat klaim...</p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : !Array.isArray(claims) || claims.length === 0 ? (
                  <TableRow>
                    {/* colSpan 9 disesuaikan dengan jumlah TableHead */}
                    <TableCell colSpan={9} className="h-32 text-center text-neutral-500">
                      Belum ada riwayat klaim yang tersedia.
                    </TableCell>
                  </TableRow>
                ) : (
                  claims.map((claim) => (
                    <TableRow key={claim.id} className="border-none hover:bg-neutral-50/50">
                      <TableCell className="font-medium text-neutral-600 whitespace-nowrap py-4">
                        {claim.id.replace('claim-', '')}
                      </TableCell>

                      <TableCell className="text-neutral-800 whitespace-nowrap py-4">
                        <Link
                          to={`/laporan/detail/${claim.report_id}`}
                          className="text-[#4DB5AC] hover:text-[#3d968e] underline underline-offset-4 decoration-1 font-medium"
                        >
                          {claim.report_id.replace('report-', '')}
                        </Link>
                      </TableCell>

                      <TableCell className="whitespace-nowrap py-4">
                        <span
                          className={`font-medium ${
                            claim.claim_type === 'claim'
                              ? 'text-[#3B82F6]'
                              : 'text-[#8B52A1]'
                          }`}
                        >
                          {claim.claim_type === 'claim' ? 'Klaim Barang' : 'Lapor Temuan'}
                        </span>
                      </TableCell>

                      <TableCell className="text-neutral-800 whitespace-nowrap py-4">
                        {claim.reporter_name}
                      </TableCell>

                      {/* Sel No HP yang ditambahkan */}
                      <TableCell className="text-neutral-800 whitespace-nowrap py-4">
                        {claim.contact_phone}
                      </TableCell>

                      <TableCell className="text-neutral-800 whitespace-nowrap py-4">
                        <div className="max-w-[150px] truncate" title={claim.location}>
                          {claim.location}
                        </div>
                      </TableCell>

                      <TableCell className="whitespace-nowrap py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            claim.status === 'accepted'
                              ? 'bg-green-100 text-green-700'
                              : claim.status === 'rejected'
                                ? 'bg-red-100 text-red-700'
                                : 'bg-amber-100 text-amber-700'
                          }`}
                        >
                          {claim.status === 'accepted'
                            ? 'Disetujui'
                            : claim.status === 'rejected'
                              ? 'Ditolak'
                              : 'Pending'}
                        </span>
                      </TableCell>

                      <TableCell className="text-neutral-800 whitespace-nowrap py-4">
                        {new Date(claim.created_at).toLocaleDateString('id-ID', {
                          weekday: 'short',
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </TableCell>

                      <TableCell className="text-center whitespace-nowrap py-4">
                        <Button
                          onClick={() => navigate(`/laporan/detail/${claim.report_id}`)}
                          variant="outline"
                          className="border-[#8B52A1] text-[#8B52A1] hover:bg-[#8B52A1] hover:text-white rounded-md h-8 px-4 font-medium transition-colors"
                        >
                          Lihat Detail <ArrowRight className="ml-1.5 w-3.5 h-3.5" />
                        </Button>
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
              Menampilkan {claims.length} data di halaman ini
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