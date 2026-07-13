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
import { getReportById, updateReport } from '@/api/report-api';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function EditReport() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [report, setReport] = useState({
    user_id: '',
    user_fullname: '',
    item_name: '',
    description: '',
    category: '',
    location_lost: '',
    date_lost: '',
    status: 'unclaimed',
    contact_phone: '',
    image_url: '',
  });
  const [imageFile, setImageFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const res = await getReportById(id, token);
        const data = res.data?.data || res.data;
        setReport({
          user_id: data.user_id || '',
          user_fullname: data.user_fullname || '',
          item_name: data.item_name || '',
          description: data.description || '',
          category: data.category || '',
          location_lost: data.location_lost || '',
          date_lost: data.date_lost || '',
          status: data.status || 'unclaimed',
          contact_phone: data.contact_phone || '',
          image_url: data.image_url || '',
        });
      } catch (err) {
        Swal.fire({ icon: 'error', title: 'Gagal!', text: 'Laporan tidak ditemukan.' });
        navigate('/laporan/saya');
      } finally {
        setIsFetching(false);
      }
    };
    fetchReport();
  }, [id]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setImageFile(file);
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      Swal.fire({
        title: 'Menyimpan perubahan...',
        allowOutsideClick: false,
        showConfirmButton: false,
        didOpen: () => Swal.showLoading(),
      });

      const token = localStorage.getItem('accessToken');
      const formData = new FormData();

      formData.append('user_id', report.user_id);
      formData.append('user_fullname', report.user_fullname);
      formData.append('item_name', report.item_name);
      formData.append('description', report.description);
      formData.append('category', report.category);
      formData.append('location_lost', report.location_lost);
      formData.append('date_lost', report.date_lost);
      formData.append('status', report.status);
      formData.append('contact_phone', report.contact_phone);
      if (imageFile) {
        formData.append('image', imageFile);
      } else {
        formData.append('image_url', report.image_url);
      }

      await updateReport(id, formData, token);

      Swal.fire({
        icon: 'success',
        title: 'Berhasil!',
        text: 'Laporan berhasil diperbarui.',
        confirmButtonColor: '#8B52A1',
      }).then(() => navigate('/laporan/saya'));
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message;
      Swal.fire({ icon: 'error', title: 'Gagal!', text: errorMessage, confirmButtonColor: '#d33' });
    } finally {
      setIsLoading(false);
    }
  };

  const topBreadcrumb = (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem className="text-neutral-500">Laporan</BreadcrumbItem>
        <BreadcrumbSeparator>
          <ChevronRight className="h-4 w-4 text-neutral-400" />
        </BreadcrumbSeparator>
        <BreadcrumbItem className="text-neutral-500 cursor-pointer" onClick={() => navigate('/laporan/saya')}>
          Laporan Saya
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <ChevronRight className="h-4 w-4 text-neutral-400" />
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbPage className="text-[#8B52A1] font-medium">Edit Laporan</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );

  if (isFetching) {
    return (
      <DashboardLayout breadcrumb={topBreadcrumb}>
        <div className="py-20 flex flex-col items-center justify-center">
          <Loader2 className="h-8 w-8 text-[#8B52A1] animate-spin mb-4" />
          <p className="text-neutral-500">Memuat data laporan...</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout breadcrumb={topBreadcrumb}>
      <div className="w-full max-w-[1400px]">
        <div className="mb-8">
          <h1 className="text-[28px] font-bold !text-neutral-900 mb-2 tracking-tight">
            Edit Laporan
          </h1>
          <p className="text-[15px] text-neutral-500 font-normal">
            Perbarui informasi laporan kamu di bawah ini
          </p>
        </div>

        <div className="bg-white p-6 md:p-8 rounded-xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)] border border-neutral-100">
          <div className="space-y-6">
            {/* Baris 1 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2.5">
                <label className="text-[15px] font-semibold text-neutral-900">Nama Barang</label>
                <Input
                  placeholder="Isi nama barang"
                  value={report.item_name}
                  onChange={(e) => setReport({ ...report, item_name: e.target.value })}
                  className="w-full h-12 px-4 rounded-lg border-neutral-200 focus-visible:ring-[#8B52A1]"
                />
              </div>
              <div className="space-y-2.5">
                <label className="text-[15px] font-semibold text-neutral-900">Lokasi Kehilangan</label>
                <Input
                  placeholder="Isi tempat kamu kehilangan barang"
                  value={report.location_lost}
                  onChange={(e) => setReport({ ...report, location_lost: e.target.value })}
                  className="w-full h-12 px-4 rounded-lg border-neutral-200 focus-visible:ring-[#8B52A1]"
                />
              </div>
            </div>

            {/* Baris 2 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2.5">
                <label className="text-[15px] font-semibold text-neutral-900">Kategori</label>
                <Select value={report.category} onValueChange={(value) => setReport({ ...report, category: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih kategori" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="lost">Saya kehilangan</SelectItem>
                    <SelectItem value="found">Saya menemukan</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2.5">
                <label className="text-[15px] font-semibold text-neutral-900">No HP</label>
                <Input
                  placeholder="(+62)"
                  value={report.contact_phone}
                  onChange={(e) => setReport({ ...report, contact_phone: e.target.value })}
                  className="w-full h-12 px-4 rounded-lg border-neutral-200 focus-visible:ring-[#8B52A1]"
                />
              </div>
            </div>

            {/* Baris 3 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2.5 flex flex-col">
                <label className="text-[15px] font-semibold text-neutral-900">Ciri-ciri barang</label>
                <Textarea
                  className="w-full px-4 h-full rounded-lg border-neutral-200 focus-visible:ring-[#8B52A1] resize-none py-4"
                  placeholder="Tuliskan ciri-ciri barang kamu..."
                  value={report.description}
                  onChange={(e) => setReport({ ...report, description: e.target.value })}
                />
              </div>

              <div className="space-y-2.5 flex flex-col">
                <label className="text-[15px] font-semibold text-neutral-900">Upload foto barang</label>
                <div className="flex-1 flex items-center justify-center border border-neutral-200 rounded-lg p-2 min-h-[220px] w-full bg-white relative">
                  <input
                    type="file"
                    id="file-upload-edit"
                    accept="image/jpeg, image/png, image/jpg"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                  {imageFile ? (
                    <div className="w-full h-full border-2 border-dashed border-[#8B52A1] rounded-lg flex flex-col items-center justify-center p-6 bg-[#8B52A1]/5 relative">
                      <button onClick={() => setImageFile(null)} className="absolute top-4 right-4 p-1 bg-white rounded-full shadow hover:bg-neutral-100">
                        <X className="w-4 h-4 text-neutral-600" />
                      </button>
                      <CloudUpload className="w-10 h-10 text-[#8B52A1] mb-2" strokeWidth={1.5} />
                      <p className="text-[14.5px] font-medium text-[#8B52A1] text-center break-all">{imageFile.name}</p>
                      <p className="text-xs text-neutral-500 mt-1">Siap untuk diupload</p>
                    </div>
                  ) : report.image_url ? (
                    <div className="w-full h-full rounded-lg flex flex-col items-center justify-center p-4 relative">
                      <img src={report.image_url} alt="foto barang" className="max-h-[180px] object-contain rounded-lg mb-2" />
                      <label htmlFor="file-upload-edit" className="text-sm text-[#8B52A1] underline cursor-pointer">Ganti foto</label>
                    </div>
                  ) : (
                    <label htmlFor="file-upload-edit" className="w-full h-full border-2 border-dashed border-neutral-200 rounded-lg flex flex-col items-center justify-center p-6 bg-[#FAFAFA]/50 hover:bg-neutral-50 transition-colors cursor-pointer text-center">
                      <CloudUpload className="w-10 h-10 text-neutral-700 mb-4" strokeWidth={1.5} />
                      <div className="mb-3 rounded-full font-medium shadow-sm h-9 px-6 text-sm border border-neutral-200 text-neutral-700 flex items-center justify-center bg-white">
                        Browse File
                      </div>
                      <p className="text-[14.5px] font-medium text-neutral-800">Choose a file or click here</p>
                      <p className="text-xs text-neutral-400 mt-1">JPEG, PNG, JPG formats, up to 5MB</p>
                    </label>
                  )}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-4 pt-6">
              <Button
                variant="secondary"
                onClick={() => navigate('/laporan/saya')}
                disabled={isLoading}
                className="bg-neutral-100 hover:bg-neutral-200 text-neutral-800 rounded-md px-8 h-11 font-medium shadow-none"
              >
                Batal
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={isLoading}
                className="bg-[#8B52A1] hover:bg-[#7a488e] text-white rounded-md px-8 h-11 font-medium shadow-none"
              >
                {isLoading ? 'Menyimpan...' : 'Simpan Perubahan'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
