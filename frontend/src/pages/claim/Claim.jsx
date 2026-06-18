import DashboardLayout from '../DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Swal from 'sweetalert2';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from '@/components/ui/breadcrumb';
import { ChevronRight, CloudUpload, X, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// Pastikan kamu sudah membuat fungsi ini di file API kamu
import { getReportById } from '@/api/report-api';
import { createClaim } from '@/api/claim-api';

export default function Claim() {
  const { id } = useParams(); // Mengambil ID report dari URL
  const navigate = useNavigate();

  // State untuk menyimpan tipe laporan ('lost' atau 'found')
  const [reportCategory, setReportCategory] = useState(null);
  const [reportOwnerId, setReportOwnerId] = useState(null); // [BARU]
  const [isFetching, setIsFetching] = useState(true);

  const [claimData, setClaimData] = useState({
    report_id: id,
    reporter_name: '',
    reporter_role: '',
    location: '',
    contact_phone: '',
    description: '',
    message: '',
  });

  const [imageFile, setImageFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // 1. Ambil data report berdasarkan ID saat komponen dirender
  useEffect(() => {
    const fetchReport = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const response = await getReportById(id, token);
        const reportData = response.data?.data.data || response.data;

        // Simpan kategorinya untuk menentukan UI mana yang akan dirender
        setReportCategory(reportData.category);
        setReportOwnerId(reportData.user_id);
      } catch (error) {
        console.error('Gagal mengambil data laporan:', error);
        Swal.fire({
          icon: 'error',
          title: 'Laporan tidak ditemukan',
          text: 'Laporan yang ingin kamu respons tidak tersedia.',
          confirmButtonColor: '#8B52A1',
        }).then(() => {
          navigate('/laporan/semua');
        });
      } finally {
        setIsFetching(false);
      }
    };

    if (id) {
      fetchReport();
    }
  }, [id, navigate]);

  // 2. Fungsi Handle File
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
    }
  };

  // 3. Fungsi Submit
  const handleSubmitClaim = async () => {
    try {
      setIsLoading(true);

      Swal.fire({
        title: 'Mengirim Data...',
        text: 'Mohon tunggu sebentar',
        allowOutsideClick: false,
        showConfirmButton: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      const token = localStorage.getItem('accessToken');
      let userId = '';

      if (token) {
        try {
          const payloadBase64 = token.split('.')[1];
          const decodedJson = atob(payloadBase64);
          const decodedData = JSON.parse(decodedJson);
          userId = decodedData.id || decodedData.userId || decodedData.user_id;
        } catch (e) {
          console.error('Gagal mengekstrak token:', e);
        }
      }

      // Menentukan claim_type berdasarkan kategori laporan
      const claimType = reportCategory === 'found' ? 'claim' : 'report';

      const formData = new FormData();
      formData.append('report_id', id);
      if (userId) formData.append('user_id', userId);
      formData.append('report_owner_id', reportOwnerId);
      formData.append('claim_type', claimType);
      formData.append('reporter_name', claimData.reporter_name);
      formData.append('reporter_role', claimData.reporter_role);
      formData.append('location', claimData.location);
      formData.append('contact_phone', claimData.contact_phone);
      formData.append('description', claimData.description);
      formData.append('message', claimData.message);

      if (imageFile) {
        formData.append('image', imageFile);
      } else {
        throw new Error('Foto atau bukti kepemilikan wajib dilampirkan!');
      }

      // Memanggil fungsi API createClaim
      await createClaim(formData, token);

      Swal.fire({
        icon: 'success',
        title: 'Berhasil!',
        text:
          claimType === 'claim'
            ? 'Klaim berhasil diajukan.'
            : 'Barang berhasil dilaporkan.',
        confirmButtonColor: '#8B52A1',
      }).then(() => {
        navigate('/laporan/semua');
      });
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        err.response?.data?.errors ||
        err.message;

      Swal.fire({
        icon: 'error',
        title: 'Gagal!',
        text:
          typeof errorMessage === 'string'
            ? errorMessage
            : JSON.stringify(errorMessage),
        confirmButtonColor: '#d33',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setClaimData({
      reporter_name: '',
      reporter_role: '',
      location: '',
      contact_phone: '',
      description: '',
      message: '',
    });
    setImageFile(null);
  };

  // 4. KONDISIONAL TEXT UI BERDASARKAN KATEGORI LAPORAN
  const isClaim = reportCategory === 'found'; // Jika laporan "Found", UI-nya "Klaim"

  const uiText = {
    pageTitle: isClaim ? 'Klaim Barang' : 'Laporkan Barang',
    pageSubtitle: isClaim
      ? 'Silahkan isi data dibawah ini untuk klaim'
      : 'Silahkan isi data dibawah ini untuk melaporkan barang',
    locLabel: isClaim
      ? 'Dimana kamu kehilangan barang ini?'
      : 'Dimana kamu menemukan barang ini?',
    locPlaceholder: isClaim
      ? 'Isi tempat kamu kehilangan barang'
      : 'Isi tempat kamu menemukan barang',
    descLabel: isClaim
      ? 'Apa ciri - ciri barang kamu yang hilang?'
      : 'Apa ciri - ciri barang yang kamu temukan?',
    descPlaceholder: isClaim
      ? 'Tuliskan ciri - ciri barang kamu yang hilang'
      : 'Tuliskan ciri - ciri barang yang kamu temukan',
    descSubLabel: isClaim
      ? 'Deskripsikan ciri - ciri barang kamu yang hilang'
      : '',
    uploadLabel: isClaim ? 'Upload barang bukti' : 'Upload foto barang',
    uploadSubLabel: isClaim
      ? 'Barang bukti dapat berupa foto barang, bukti pembelian dan bukti kepemilikan'
      : '',
    msgLabel: isClaim ? 'Pesan untuk penemu' : 'Pesan untuk pelapor',
    msgPlaceholder: isClaim
      ? 'Tinggalkan pesan untuk penemu'
      : 'Tinggalkan pesan untuk pelapor',
    btnSubmit: isClaim ? 'Ajukan Klaim' : 'Laporkan',
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
            {isFetching ? 'Memuat...' : uiText.pageTitle}
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );

  // Tampilkan loading screen selagi mengecek status laporan asli
  if (isFetching) {
    return (
      <DashboardLayout breadcrumb={topBreadcrumb}>
        <div className="flex flex-col items-center justify-center py-20">
          <Loader2 className="w-10 h-10 text-[#8B52A1] animate-spin mb-4" />
          <p className="text-neutral-500">Menyiapkan formulir...</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout breadcrumb={topBreadcrumb}>
      <div className="w-full max-w-[1400px]">
        <div className="mb-8">
          <h1 className="text-[28px] font-bold !text-neutral-900 mb-2 tracking-tight">
            {uiText.pageTitle}
          </h1>
          <p className="text-[15px] text-neutral-500 font-normal">
            {uiText.pageSubtitle}
          </p>
        </div>

        <div className="bg-white p-6 md:p-8 rounded-xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)] border border-neutral-100">
          <div className="space-y-6">
            {/* Baris 1: Nama & Lokasi */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2.5">
                <label className="text-[15px] font-semibold text-neutral-900">
                  Siapa namamu?
                </label>
                <Input
                  placeholder="Isi nama kamu"
                  value={claimData.reporter_name}
                  onChange={(e) =>
                    setClaimData({
                      ...claimData,
                      reporter_name: e.target.value,
                    })
                  }
                  className="w-full h-12 px-4 rounded-lg border-neutral-200 focus-visible:ring-[#8B52A1]"
                />
              </div>
              <div className="space-y-2.5">
                <label className="text-[15px] font-semibold text-neutral-900">
                  {uiText.locLabel}
                </label>
                <Input
                  placeholder={uiText.locPlaceholder}
                  value={claimData.location}
                  onChange={(e) =>
                    setClaimData({ ...claimData, location: e.target.value })
                  }
                  className="w-full h-12 px-4 rounded-lg border-neutral-200 focus-visible:ring-[#8B52A1]"
                />
              </div>
            </div>

            {/* Baris 2: Role & No HP */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2.5">
                <label className="text-[15px] font-semibold text-neutral-900">
                  Siapa kamu?
                </label>
                <Select
                  value={claimData.reporter_role}
                  onValueChange={(value) =>
                    setClaimData({ ...claimData, reporter_role: value })
                  }
                >
                  <SelectTrigger className="h-12 border-neutral-200 focus:ring-[#8B52A1]">
                    <SelectValue placeholder="Pilih status/role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Mahasiswa">Mahasiswa</SelectItem>
                    <SelectItem value="Dosen">Dosen</SelectItem>
                    <SelectItem value="Staff">Staff / Karyawan</SelectItem>
                    <SelectItem value="Umum">Umum</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2.5">
                <label className="text-[15px] font-semibold text-neutral-900">
                  No HP
                </label>
                <Input
                  placeholder="(+62)"
                  value={claimData.contact_phone}
                  onChange={(e) =>
                    setClaimData({
                      ...claimData,
                      contact_phone: e.target.value,
                    })
                  }
                  className="w-full h-12 px-4 rounded-lg border-neutral-200 focus-visible:ring-[#8B52A1]"
                />
              </div>
            </div>

            {/* Baris 3: Ciri-ciri & Upload */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2.5 flex flex-col">
                <div>
                  <label className="text-[15px] font-semibold text-neutral-900 block">
                    {uiText.descLabel}
                  </label>
                  {uiText.descSubLabel && (
                    <span className="text-[13px] text-neutral-500 mt-0.5 block">
                      {uiText.descSubLabel}
                    </span>
                  )}
                </div>
                <Textarea
                  className={`w-full px-4 rounded-lg border-neutral-200 focus-visible:ring-[#8B52A1] resize-none py-4 ${uiText.descSubLabel ? 'h-[calc(100%-24px)]' : 'h-full'}`}
                  placeholder={uiText.descPlaceholder}
                  value={claimData.description}
                  onChange={(e) =>
                    setClaimData({ ...claimData, description: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2.5 flex flex-col">
                <div>
                  <label className="text-[15px] font-semibold text-neutral-900 block">
                    {uiText.uploadLabel}
                  </label>
                  {uiText.uploadSubLabel && (
                    <span className="text-[13px] text-neutral-500 mt-0.5 block truncate">
                      {uiText.uploadSubLabel}
                    </span>
                  )}
                </div>

                <div className="flex-1 flex items-center justify-center border border-neutral-200 rounded-lg p-2 min-h-[220px] w-full bg-white relative">
                  <input
                    type="file"
                    id="file-upload"
                    accept="image/jpeg, image/png, image/jpg"
                    onChange={handleImageChange}
                    className="hidden"
                  />

                  {imageFile ? (
                    <div className="w-full h-full border-2 border-dashed border-[#8B52A1] rounded-lg flex flex-col items-center justify-center p-6 bg-[#8B52A1]/5 relative">
                      <button
                        onClick={() => setImageFile(null)}
                        className="absolute top-4 right-4 p-1 bg-white rounded-full shadow hover:bg-neutral-100"
                        title="Hapus foto"
                      >
                        <X className="w-4 h-4 text-neutral-600" />
                      </button>
                      <CloudUpload
                        className="w-10 h-10 text-[#8B52A1] mb-2"
                        strokeWidth={1.5}
                      />
                      <p className="text-[14.5px] font-medium text-[#8B52A1] text-center break-all">
                        {imageFile.name}
                      </p>
                    </div>
                  ) : (
                    <label
                      htmlFor="file-upload"
                      className="w-full h-full border-2 border-dashed border-neutral-200 rounded-lg flex flex-col items-center justify-center p-6 bg-[#FAFAFA]/50 hover:bg-neutral-50 transition-colors cursor-pointer text-center"
                    >
                      <CloudUpload
                        className="w-10 h-10 text-neutral-700 mb-4"
                        strokeWidth={1.5}
                      />
                      <div className="mb-3 rounded-full font-medium shadow-sm h-9 px-6 text-sm border border-neutral-200 text-neutral-700 flex items-center justify-center bg-white">
                        Browse File
                      </div>
                      <p className="text-[14.5px] font-medium text-neutral-800">
                        Choose a file or drag & drop it here
                      </p>
                      <p className="text-xs text-neutral-400 mt-1">
                        JPEG, PNG, JPG formats, up to 5MB
                      </p>
                    </label>
                  )}
                </div>
              </div>
            </div>

            {/* Baris 4: Pesan Tambahan */}
            <div className="space-y-2.5">
              <label className="text-[15px] font-semibold text-neutral-900">
                {uiText.msgLabel}
              </label>
              <Textarea
                className="w-full px-4 h-32 rounded-lg border-neutral-200 focus-visible:ring-[#8B52A1] resize-none py-4"
                placeholder={uiText.msgPlaceholder}
                value={claimData.message}
                onChange={(e) =>
                  setClaimData({ ...claimData, message: e.target.value })
                }
              />
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-4 pt-6">
              <Button
                variant="secondary"
                onClick={handleReset}
                disabled={isLoading}
                className="bg-neutral-100 hover:bg-neutral-200 text-neutral-800 rounded-md px-8 h-11 font-medium shadow-none"
              >
                Bersihkan
              </Button>
              <Button
                onClick={handleSubmitClaim}
                disabled={isLoading}
                className="bg-[#8B52A1] hover:bg-[#7a488e] text-white rounded-md px-8 h-11 font-medium shadow-none"
              >
                {isLoading ? 'Mengirim...' : uiText.btnSubmit}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
