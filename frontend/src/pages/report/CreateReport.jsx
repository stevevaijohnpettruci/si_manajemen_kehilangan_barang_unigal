import DashboardLayout from '../DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
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
import { ChevronRight, CloudUpload } from 'lucide-react';
import { createReport } from '@/api/report-api';
import { useState } from 'react';

const dateLost = new Date().toISOString();

export default function CreateReport() {
  const [report, setReport] = useState({
    user_id: '',
    user_fullname: '',
    item_name: '',
    description: '',
    category: '',
    image_url: '',
    location_lost: '',
    date_lost: dateLost,
    status: 'unclaimed',
    contact_phone: '',
  });
  const handleSubmitReport = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const fullname = localStorage.getItem('user');

      const response = await createReport(
        {
          ...report,
          user_fullname: fullname,
          date_lost: dateLost,
        },
        token,
      );
      
      console.log('response : ', response.data);
    } catch (err) {
      console.error('error:', err);
    }
  };
  const topBreadcrumb = (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem className="text-neutral-500">Laporan</BreadcrumbItem>
        <BreadcrumbSeparator>
          <ChevronRight className="h-4 w-4 text-neutral-400" />
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbPage className="text-[#8B52A1] font-medium">
            Buat Laporan
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );

  return (
    <DashboardLayout breadcrumb={topBreadcrumb}>
      <div className="w-full max-w-[1400px]">
        {/* Header Title & Subtitle */}
        <div className="mb-8">
          <h1 className="text-[28px] font-bold !text-neutral-900 mb-2 tracking-tight">
            Buat Laporan
          </h1>
          <p className="text-[15px] text-neutral-500 font-normal">
            Silahkan isi data dibawah ini untuk membuat laporan
          </p>
        </div>

        {/* Main Content Card (Form Container) */}
        <div className="bg-white p-6 md:p-8 rounded-xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)] border border-neutral-100">
          <div className="space-y-6">
            {/* Baris 1: Nama Barang & Lokasi */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2.5">
                <label className="text-[15px] font-semibold text-neutral-900">
                  Nama Barang
                </label>
                <Input
                  placeholder="Isi nama kamu"
                  onChange={(e) =>
                    setReport({
                      ...report,
                      item_name: e.target.value,
                    })
                  }
                  className="w-full h-12 px-4 rounded-lg border-neutral-200 focus-visible:ring-[#8B52A1] text-sm bg-white"
                />
              </div>
              <div className="space-y-2.5">
                <label className="text-[15px] font-semibold text-neutral-900">
                  Lokasi Kehilangan
                </label>
                <Input
                  placeholder="Isi tempat kamu kehilangan barang"
                  className="w-full h-12 px-4 rounded-lg border-neutral-200 focus-visible:ring-[#8B52A1] text-sm bg-white"
                />
              </div>
            </div>

            {/* Baris 2: Kategori & No HP */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2.5">
                <label className="text-[15px] font-semibold text-neutral-900">
                  Kategori
                </label>
                <Select
                  onValueChange={(value) =>
                    setReport({
                      ...report,
                      category: value,
                    })
                  }
                >
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
                <label className="text-[15px] font-semibold text-neutral-900">
                  No HP
                </label>
                <Input
                  placeholder="(+62)"
                  className="w-full h-12 px-4 rounded-lg border-neutral-200 focus-visible:ring-[#8B52A1] text-sm bg-white"
                />
              </div>
            </div>

            {/* Baris 3: Ciri-ciri & Upload Foto */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2.5 flex flex-col">
                <label className="text-[15px] font-semibold text-neutral-900">
                  Bagaimana ciri - ciri barang kamu?
                </label>
                <Textarea
                  value={report.description}
                  onChange={(e) =>
                    setReport({
                      ...report,
                      description: e.target.value,
                    })
                  }
                />
              </div>

              <div className="space-y-2.5 flex flex-col">
                <label className="text-[15px] font-semibold text-neutral-900">
                  Upload foto barang
                </label>
                {/* Upload Area */}
                <div className="flex-1 flex items-center justify-center border border-neutral-200 rounded-lg p-2 min-h-[220px] w-full bg-white">
                  <div className="w-full h-full border-2 border-dashed border-neutral-200 rounded-lg flex flex-col items-center justify-center p-6 bg-[#FAFAFA]/50 hover:bg-neutral-50 transition-colors cursor-pointer text-center">
                    <CloudUpload
                      className="w-10 h-10 text-neutral-700 mb-4"
                      strokeWidth={1.5}
                    />
                    <Button
                      variant="outline"
                      className="mb-3 rounded-full font-medium shadow-sm h-9 px-6 text-sm border-neutral-200 text-neutral-700 pointer-events-none"
                    >
                      Browse File
                    </Button>
                    <p className="text-[14.5px] font-medium text-neutral-800">
                      Choose a file or drag & drop it here
                    </p>
                    <p className="text-xs text-neutral-400 mt-1">
                      JPEG, PNG, PDG, and MP4 formats, up to 50MB
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Baris 4: Pesan */}
            <div className="space-y-2.5">
              <label className="text-[15px] font-semibold text-neutral-900">
                Pesan
              </label>
              <Textarea
                placeholder="Tinggalkan pesan untuk pelapor"
                className="w-full px-4 min-h-[160px] rounded-lg border-neutral-200 focus-visible:ring-[#8B52A1] text-sm resize-none py-4 bg-white"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-4 pt-6">
              <Button
                variant="secondary"
                className="bg-neutral-100 hover:bg-neutral-200 text-neutral-800 rounded-md px-8 h-11 font-medium shadow-none"
              >
                Bersihkan
              </Button>
              <Button className="bg-[#8B52A1] hover:bg-[#7a488e] text-white rounded-md px-8 h-11 font-medium shadow-none">
                Buat Laporan
              </Button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
