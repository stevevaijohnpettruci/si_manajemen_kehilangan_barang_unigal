import DashboardLayout from '../DashboardLayout';
import { Button } from '@/components/ui/button';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from '@/components/ui/breadcrumb';
import {
  ChevronRight,
  MapPin,
  Calendar,
  User,
  Phone,
  Info,
  Image as ImageIcon,
  Loader2,
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

// Asumsi kamu sudah punya fungsi ini di report-api.js
import { getReportById } from '@/api/report-api';
import { updateReportStatus } from '@/api/report-api';

export default function ReportDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [report, setReport] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentUserId, setCurrentUserId] = useState(null);

  useEffect(() => {
    // Ambil ID User yang sedang login untuk kondisional tombol
    const token = localStorage.getItem('accessToken');
    if (token) {
      try {
        const decoded = JSON.parse(atob(token.split('.')[1]));
        setCurrentUserId(decoded.id || decoded.userId || decoded.user_id);
      } catch (e) {
        console.error('Gagal decode token', e);
      }
    }

    const fetchDetail = async () => {
      try {
        const response = await getReportById(id, token);
        // Sesuaikan dengan struktur response backend-mu
        setReport(response.data?.data.data || response.data);
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Tidak Ditemukan',
          text: 'Data laporan tidak ditemukan atau sudah dihapus.',
          confirmButtonColor: '#8B52A1',
        }).then(() => navigate('/laporan/semua'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchDetail();
  }, [id, navigate]);

  // Fungsi helper untuk format tanggal
  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    };
    return new Date(dateString).toLocaleDateString('id-ID', options) + ' WIB';
  };

  const handleConfirmResolved = () => {
    Swal.fire({
      title: 'Konfirmasi Selesai',
      text: isLost
        ? 'Apakah Anda yakin barang ini sudah ditemukan?'
        : 'Apakah Anda yakin barang ini sudah dikembalikan ke pemiliknya?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#8B52A1',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya, Selesai!',
      cancelButtonText: 'Batal',
    }).then(async (result) => {
      if (result.isConfirmed) {
        const token = localStorage.getItem('accessToken');
        await updateReportStatus(report.id, { status: 'claimed' }, token);

        Swal.fire(
          'Berhasil!',
          'Status laporan berhasil diperbarui.',
          'success',
        ).then(() => {
          // Refresh halaman atau fetch ulang data
          window.location.reload();
        });
      }
    });
  };

  const topBreadcrumb = (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem className="text-neutral-500">Laporan</BreadcrumbItem>
        <BreadcrumbSeparator>
          <ChevronRight className="h-4 w-4 text-neutral-400" />
        </BreadcrumbSeparator>
        <BreadcrumbItem className="text-neutral-500">
          Semua Laporan
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <ChevronRight className="h-4 w-4 text-neutral-400" />
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbPage className="text-[#8B52A1] font-medium">
            Detail Laporan
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );

  if (isLoading) {
    return (
      <DashboardLayout breadcrumb={topBreadcrumb}>
        <div className="flex flex-col items-center justify-center py-20">
          <Loader2 className="w-10 h-10 text-[#8B52A1] animate-spin mb-4" />
          <p className="text-neutral-500">Memuat detail laporan...</p>
        </div>
      </DashboardLayout>
    );
  }

  if (!report) return null;

  const isLost = report.category === 'lost';
  const isOwner = currentUserId === report.user_id;

  return (
    <DashboardLayout breadcrumb={topBreadcrumb}>
      <div className="w-full max-w-[1400px]">
        {/* Header Section */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-[28px] font-bold !text-neutral-900 mb-2 tracking-tight">
              Detail Laporan
            </h1>
            <p className="text-[15px] text-neutral-500 font-normal">
              Informasi lengkap mengenai barang yang dilaporkan
            </p>
          </div>

          {/* Badge Status & Kategori */}
          <div className="flex items-center gap-3">
            <span
              className={`px-4 py-1.5 rounded-full text-sm font-medium border ${
                isLost
                  ? 'bg-red-50 text-red-600 border-red-100'
                  : 'bg-green-50 text-green-600 border-green-100'
              }`}
            >
              {isLost ? 'Kehilangan Barang' : 'Menemukan Barang'}
            </span>
            <span
              className={`px-4 py-1.5 rounded-full text-sm font-medium border ${
                report.status === 'claimed'
                  ? 'bg-blue-50 text-blue-600 border-blue-100'
                  : 'bg-orange-50 text-orange-600 border-orange-100'
              }`}
            >
              {report.status === 'claimed' ? 'Claimed' : 'Unclaimed'}
            </span>
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-white p-6 md:p-8 rounded-xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)] border border-neutral-100">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Kolom Kiri: Foto Barang (Lebar 4 kolom) */}
            <div className="lg:col-span-4 flex flex-col gap-3">
              <label className="text-[15px] font-semibold text-neutral-900">
                Foto Barang
              </label>
              <div className="w-full aspect-[4/3] rounded-lg border border-neutral-200 overflow-hidden bg-neutral-50 flex items-center justify-center">
                {report.image_url ? (
                  <img
                    src={
                      report.image_url.startsWith('http')
                        ? report.image_url
                        : `http://localhost:3000${report.image_url}`
                    }
                    alt={report.item_name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center text-neutral-400 p-6 text-center">
                    <ImageIcon
                      className="w-12 h-12 mb-3 text-neutral-300"
                      strokeWidth={1.5}
                    />
                    <p className="text-sm">Tidak ada foto yang dilampirkan</p>
                  </div>
                )}
              </div>
            </div>

            {/* Kolom Kanan: Detail Informasi (Lebar 8 kolom) */}
            <div className="lg:col-span-8 flex flex-col">
              <div className="border-b border-neutral-100 pb-6 mb-6">
                <h2 className="text-2xl font-bold text-neutral-900 mb-2">
                  {report.item_name}
                </h2>
                <div className="flex items-center gap-2 text-neutral-500">
                  <User className="w-4 h-4" />
                  <span className="text-sm">
                    Dilaporkan oleh{' '}
                    <strong className="text-neutral-700">
                      {report.user_fullname}
                    </strong>
                  </span>
                </div>
              </div>

              {/* Grid Informasi */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-neutral-500">
                    <MapPin className="w-4 h-4" />
                    <label className="text-sm font-medium">
                      Lokasi {isLost ? 'Kehilangan' : 'Penemuan'}
                    </label>
                  </div>
                  <p className="text-[15px] text-neutral-900 font-medium pl-6">
                    {report.location_lost}
                  </p>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-neutral-500">
                    <Calendar className="w-4 h-4" />
                    <label className="text-sm font-medium">
                      Waktu Kejadian
                    </label>
                  </div>
                  <p className="text-[15px] text-neutral-900 font-medium pl-6">
                    {formatDate(report.date_lost)}
                  </p>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-neutral-500">
                    <Phone className="w-4 h-4" />
                    <label className="text-sm font-medium">
                      Kontak Pelapor
                    </label>
                  </div>
                  <p className="text-[15px] text-neutral-900 font-medium pl-6">
                    {report.contact_phone}
                  </p>
                </div>

                <div className="space-y-1.5 sm:col-span-2">
                  <div className="flex items-center gap-2 text-neutral-500">
                    <Info className="w-4 h-4" />
                    <label className="text-sm font-medium">
                      Ciri - ciri Barang
                    </label>
                  </div>
                  <div className="pl-6 pt-1">
                    <div className="bg-neutral-50 p-4 rounded-lg border border-neutral-100 text-[15px] text-neutral-700 leading-relaxed min-h-[100px]">
                      {report.description}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-4 mt-10 pt-6 border-t border-neutral-100">
                <Button
                  variant="secondary"
                  onClick={() => navigate(-1)}
                  className="bg-neutral-100 hover:bg-neutral-200 text-neutral-800 rounded-md px-8 h-11 font-medium shadow-none"
                >
                  Kembali
                </Button>

                {/* Logika Tombol Aksi HANYA JIKA status belum claimed */}
                {report.status !== 'claimed' && (
                  <>
                    {isOwner ? (
                      <Button
                        onClick={handleConfirmResolved}
                        className="bg-[#22C55E] hover:bg-[#16a34a] text-white rounded-md px-8 h-11 font-medium shadow-none"
                      >
                        {isLost
                          ? 'Konfirmasi Barang Ditemukan'
                          : 'Konfirmasi Barang Dikembalikan'}
                      </Button>
                    ) : (
                      <Button
                        onClick={() =>
                          navigate(`/laporan/tindak-lanjut/${report.id}`)
                        }
                        className="bg-[#8B52A1] hover:bg-[#7a488e] text-white rounded-md px-8 h-11 font-medium shadow-none"
                      >
                        {isLost
                          ? 'Saya Menemukan Barang Ini'
                          : 'Klaim Barang Ini'}
                      </Button>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
