import DashboardLayout from '../DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Search,
  ChevronRight,
  Loader2,
  Eye,
  Check,
  X,
  ImageIcon,
} from 'lucide-react';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

// Import fungsi API asli yang sudah kita buat
import { updateClaimStatus, getIncomingClaims } from '@/api/claim-api';

export default function ClaimInbox() {
  const [claims, setClaims] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('pending');

  const [currentPage, setCurrentPage] = useState(1);
  const [meta, setMeta] = useState({ totalData: 0, totalPages: 1 });

  // State untuk Modal Review
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedClaim, setSelectedClaim] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleTabChange = (value) => {
    setActiveTab(value);
    setCurrentPage(1);
  };

  const fetchIncomingClaims = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem('accessToken');
      if (!token) return;

      let userId = '';
      try {
        const decoded = JSON.parse(atob(token.split('.')[1]));
        userId = decoded.id || decoded.userId || decoded.user_id;
      } catch (e) {
        console.error('Gagal ekstrak token', e);
        return;
      }

      if (!userId) return;

      // Panggil API Asli
      const response = await getIncomingClaims(userId, token, currentPage, 10);

      const payload = response.data?.data || response.data || response;
      console.log(payload);
      let fetchedClaims = [];
      let fetchedMeta = { totalData: 0, totalPages: 1 };

      if (payload && payload.data && Array.isArray(payload.data.data)) {
        fetchedClaims = payload.data.data;
        fetchedMeta = payload.data.meta;
      } else if (payload && Array.isArray(payload.data)) {
        fetchedClaims = payload.data;
        fetchedMeta = payload.meta;
      } else if (Array.isArray(payload)) {
        fetchedClaims = payload;
      }

      // Filter manual berdasarkan Tab Aktif
      if (activeTab !== 'semua') {
        fetchedClaims = fetchedClaims.filter((c) => c.status === activeTab);
      }

      setClaims(fetchedClaims);
      if (fetchedMeta) {
        setMeta(fetchedMeta);
      }
    } catch (err) {
      console.error('Gagal mengambil data pengajuan masuk:', err);
      setClaims([]);
      setMeta({ totalData: 0, totalPages: 1 });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchIncomingClaims();
  }, [activeTab, currentPage]);

  const openReviewModal = (claim) => {
    setSelectedClaim(claim);
    setIsModalOpen(true);
  };

  const handleReviewAction = async (status) => {
    try {
      setIsUpdating(true);
      const token = localStorage.getItem('accessToken');

      // Panggil API Update Status
      await updateClaimStatus(selectedClaim.id, { status }, token);

      Swal.fire({
        icon: 'success',
        title: 'Berhasil!',
        text: `Klaim berhasil ${status === 'accepted' ? 'disetujui' : 'ditolak'}.`,
        confirmButtonColor: '#8B52A1',
      });

      setIsModalOpen(false);
      fetchIncomingClaims(); // Refresh tabel setelah di-update
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: 'Gagal',
        text: 'Terjadi kesalahan saat memproses klaim.',
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const topBreadcrumb = (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem className="text-neutral-500">
          Laporan Anda
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <ChevronRight className="h-4 w-4 text-neutral-400" />
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbPage className="text-[#8B52A1] font-medium">
            Pengajuan Masuk
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );

  return (
    <DashboardLayout breadcrumb={topBreadcrumb}>
      <div className="w-full max-w-[1400px]">
        <div className="mb-6">
          <h1 className="text-[28px] font-bold text-neutral-900! mb-2 tracking-tight">
            Pengajuan Masuk
          </h1>
          <p className="text-[15px] text-neutral-500 font-normal mb-6">
            Daftar orang yang merespons laporan barang hilang/temuan Anda.
          </p>

          <Tabs
            defaultValue="pending"
            value={activeTab}
            onValueChange={handleTabChange}
            className="w-fit"
          >
            <TabsList className="bg-transparent border-b border-neutral-200 w-full justify-start rounded-none h-auto p-0 space-x-8">
              <TabsTrigger
                value="pending"
                className="data-[state=active]:border-[#8B52A1] data-[state=active]:text-[#8B52A1] data-[state=active]:shadow-none border-b-2 border-transparent rounded-none px-0 py-3 text-[15px] font-medium text-neutral-500"
              >
                Menunggu Review
              </TabsTrigger>
              <TabsTrigger
                value="semua"
                className="data-[state=active]:border-[#8B52A1] data-[state=active]:text-[#8B52A1] data-[state=active]:shadow-none border-b-2 border-transparent rounded-none px-0 py-3 text-[15px] font-medium text-neutral-500"
              >
                Semua Pengajuan
              </TabsTrigger>
              <TabsTrigger
                value="accepted"
                className="data-[state=active]:border-[#8B52A1] data-[state=active]:text-[#8B52A1] data-[state=active]:shadow-none border-b-2 border-transparent rounded-none px-0 py-3 text-[15px] font-medium text-neutral-500"
              >
                Telah Disetujui
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

        <div className="bg-white p-6 md:p-8 rounded-xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)] border border-neutral-100 space-y-6">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-900 font-bold" />
            <Input
              type="search"
              placeholder="Cari nama pemohon atau ID..."
              className="pl-10 h-11 rounded-lg border-neutral-200 focus-visible:ring-[#8B52A1] bg-white text-sm"
            />
          </div>

          <div className="w-full overflow-x-auto pt-2">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-neutral-100 hover:bg-transparent">
                  <TableHead className="text-neutral-400 font-medium whitespace-nowrap h-10">
                    ID Pengajuan
                  </TableHead>
                  <TableHead className="text-neutral-400 font-medium whitespace-nowrap h-10">
                    Tipe
                  </TableHead>
                  <TableHead className="text-neutral-400 font-medium whitespace-nowrap h-10">
                    Pemohon
                  </TableHead>
                  <TableHead className="text-neutral-400 font-medium whitespace-nowrap h-10">
                    No. HP
                  </TableHead>
                  <TableHead className="text-neutral-400 font-medium whitespace-nowrap h-10">
                    Status
                  </TableHead>
                  <TableHead className="text-neutral-400 font-medium whitespace-nowrap h-10">
                    Waktu Masuk
                  </TableHead>
                  <TableHead className="text-neutral-400 font-medium text-center whitespace-nowrap h-10">
                    Aksi
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={7} className="h-32 text-center">
                      <Loader2 className="h-6 w-6 animate-spin mx-auto text-[#8B52A1]" />
                    </TableCell>
                  </TableRow>
                ) : claims.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={7}
                      className="h-32 text-center text-neutral-500"
                    >
                      Belum ada pengajuan yang masuk.
                    </TableCell>
                  </TableRow>
                ) : (
                  claims.map((claim) => (
                    <TableRow
                      key={claim.id}
                      className="border-none hover:bg-neutral-50/50"
                    >
                      <TableCell className="font-medium text-neutral-600 whitespace-nowrap py-4">
                        {claim.id.replace('claim-', '')}
                      </TableCell>
                      <TableCell className="whitespace-nowrap py-4">
                        <span
                          className={`font-medium ${claim.claim_type === 'claim' ? 'text-[#3B82F6]' : 'text-[#8B52A1]'}`}
                        >
                          {claim.claim_type === 'claim'
                            ? 'Klaim Barang'
                            : 'Lapor Temuan'}
                        </span>
                      </TableCell>
                      <TableCell className="text-neutral-800 whitespace-nowrap py-4">
                        {claim.reporter_name}
                      </TableCell>
                      <TableCell className="text-neutral-800 whitespace-nowrap py-4">
                        {claim.contact_phone}
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
                          {claim.status.toUpperCase()}
                        </span>
                      </TableCell>
                      <TableCell className="text-neutral-800 whitespace-nowrap py-4">
                        {new Date(claim.created_at).toLocaleDateString(
                          'id-ID',
                          { day: 'numeric', month: 'short', year: 'numeric' },
                        )}
                      </TableCell>
                      <TableCell className="text-center whitespace-nowrap py-4">
                        <Button
                          onClick={() => openReviewModal(claim)}
                          className="bg-[#8B52A1] hover:bg-[#7a488e] text-white rounded-md h-8 px-5 font-medium shadow-none transition-colors"
                        >
                          <Eye className="mr-1.5 w-4 h-4" /> Review
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
                      currentPage === meta.totalPages || meta.totalPages === 0
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

      {/* SHADCN DIALOG / MODAL REVIEW */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[600px] w-[95vw] max-h-[90vh] p-0 flex flex-col overflow-hidden bg-white rounded-2xl">
          <DialogHeader className="px-6 pt-6 pb-4 border-b border-neutral-100 shrink-0">
            <DialogTitle className="text-xl font-bold text-neutral-900">
              Review Pengajuan
            </DialogTitle>
            <DialogDescription className="text-neutral-500">
              Periksa bukti dan pesan dari pemohon sebelum mengambil keputusan.
            </DialogDescription>
          </DialogHeader>
          {/* REVISI 3: Tambahkan overflow-y-auto dan flex-1 agar area ini saja yang bisa di-scroll */}
          {selectedClaim && (
            <div className="p-6 space-y-6 bg-neutral-50/50 overflow-y-auto flex-1 custom-scrollbar">
              {/* Foto Bukti */}
              <div>
                <label className="text-sm font-semibold text-neutral-900 mb-2 block">
                  Foto / Bukti Kepemilikan
                </label>
                <div className="w-full aspect-video rounded-xl border border-neutral-200 overflow-hidden bg-white flex items-center justify-center">
                  {selectedClaim.image_url ? (
                    <img
                      src={
                        selectedClaim.image_url.startsWith('http')
                          ? selectedClaim.image_url
                          : `http://localhost:3000${selectedClaim.image_url}`
                      }
                      alt="Bukti Klaim"
                      className="w-full h-full object-contain bg-neutral-900/5" // Ubah object-cover jadi object-contain agar gambar tidak terpotong
                    />
                  ) : (
                    <div className="flex flex-col items-center text-neutral-400">
                      <ImageIcon className="w-10 h-10 mb-2 opacity-50" />
                      <span className="text-sm">Tidak ada foto bukti</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Detail Info Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white p-4 rounded-xl border border-neutral-200">
                <div>
                  <p className="text-xs text-neutral-500 mb-1">Nama Pemohon</p>
                  <p className="text-sm font-semibold text-neutral-900">
                    {selectedClaim.reporter_name} ({selectedClaim.reporter_role}
                    )
                  </p>
                </div>
                <div>
                  <p className="text-xs text-neutral-500 mb-1">No. WhatsApp</p>
                  <p className="text-sm font-semibold text-neutral-900">
                    {selectedClaim.contact_phone}
                  </p>
                </div>
                <div className="col-span-1 sm:col-span-2">
                  <p className="text-xs text-neutral-500 mb-1">
                    Pesan untuk Anda
                  </p>
                  <p className="text-sm text-neutral-700 bg-neutral-50 p-3 rounded-lg border border-neutral-100 min-h-[60px]">
                    "{selectedClaim.message || 'Tidak ada pesan'}"
                  </p>
                </div>
              </div>
            </div>
          )}{' '}
          <DialogFooter className="px-6 py-4 bg-white border-t border-neutral-100 flex items-center justify-end gap-2 sm:gap-0 shrink-0">
            {selectedClaim?.status === 'pending' ? (
              <div className="flex gap-3 w-full sm:w-auto">
                <Button
                  disabled={isUpdating}
                  variant="outline"
                  onClick={() => handleReviewAction('rejected')}
                  className="w-full sm:w-auto border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 h-11 px-6 shadow-none"
                >
                  <X className="w-4 h-4 mr-2" /> Tolak
                </Button>
                <Button
                  disabled={isUpdating}
                  onClick={() => handleReviewAction('accepted')}
                  className="w-full sm:w-auto bg-green-500 hover:bg-green-600 text-white h-11 px-6 shadow-none"
                >
                  {isUpdating ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Check className="w-4 h-4 mr-2" />
                  )}
                  Setujui
                </Button>
              </div>
            ) : (
              <div className="w-full text-center py-2 text-sm font-medium text-neutral-500 bg-neutral-50 rounded-lg">
                Pengajuan ini telah{' '}
                {selectedClaim?.status === 'accepted' ? 'disetujui' : 'ditolak'}
                .
              </div>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
