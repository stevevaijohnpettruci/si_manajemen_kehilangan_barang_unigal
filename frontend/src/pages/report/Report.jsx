import DashboardLayout from '../DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';
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
import { Plus, Search, ChevronRight } from 'lucide-react';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

const reports = [
  {
    id: 'SLCK-001-JGSJNEX',
    reporter: 'Yusuf Jajang',
    item: 'Tumbler Tupperware',
    category: 'Hilang',
    location: 'Dekat Fakultas Kesehatan',
    phone: '087832282111',
    date: 'Senin, 11 Mei 2026',
    action: 'Laporkan',
  },
  {
    id: 'SLCK-002-SHSGDRX',
    reporter: 'Lutfi Halimawan',
    item: 'Kunci Motor Honda',
    category: 'Menemukan',
    location: 'Parkiran Masjid Unigal',
    phone: '089766601156',
    date: 'Senin, 11 Mei 2026',
    action: 'Klaim',
  },
];

export default function Report() {
  // Breadcrumb disesuaikan dengan warna ungu utama
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

  return (
    <DashboardLayout breadcrumb={topBreadcrumb}>
      <div className="w-full max-w-[1400px]">
        {/* Header Title & Tabs */}
        <div className="mb-6">
          <h1 className="text-[28px] font-bold text-neutral-900! mb-6 tracking-tight">
            Semua Laporan
          </h1>
          <Tabs defaultValue="semua" className="w-fit">
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
                {reports.map((report) => (
                  <TableRow
                    key={report.id}
                    className="border-none hover:bg-neutral-50/50"
                  >
                    <TableCell className="font-medium text-neutral-600 whitespace-nowrap py-4">
                      {report.id}
                    </TableCell>
                    <TableCell className="text-neutral-800 whitespace-nowrap py-4">
                      {report.reporter}
                    </TableCell>
                    <TableCell className="text-neutral-800 whitespace-nowrap py-4">
                      {report.item}
                    </TableCell>
                    <TableCell className="whitespace-nowrap py-4">
                      <a
                        href="#"
                        className="text-[#4DB5AC] hover:text-[#3d968e] underline underline-offset-4 decoration-1 font-medium"
                      >
                        Lihat detail
                      </a>
                    </TableCell>
                    <TableCell className="whitespace-nowrap py-4">
                      <span
                        className={`font-medium ${
                          report.category === 'Hilang'
                            ? 'text-[#EF4444]'
                            : 'text-[#22C55E]'
                        }`}
                      >
                        {report.category}
                      </span>
                    </TableCell>
                    <TableCell className="text-neutral-800 whitespace-nowrap py-4">
                      <div
                        className="max-w-[150px] truncate"
                        title={report.location}
                      >
                        {report.location}
                      </div>
                    </TableCell>
                    <TableCell className="text-neutral-800 whitespace-nowrap py-4">
                      {report.phone}
                    </TableCell>
                    <TableCell className="text-neutral-800 whitespace-nowrap py-4">
                      {report.date}
                    </TableCell>
                    <TableCell className="text-center whitespace-nowrap py-4">
                      <Button className="bg-[#8B52A1] hover:bg-[#7a488e] text-white rounded-md w-25 px-6 shadow-none h-8 font-normal text-sm">
                        {report.action}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination Section */}
          <div className="flex items-center justify-between pt-16">
            <p className="text-[14px] text-blue-500 font-medium">
              2 dari 2 Laporan
            </p>
            <Pagination className="w-auto m-0">
              <PaginationContent className="gap-1">
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    className="border border-neutral-200 hover:bg-neutral-50 rounded shadow-sm h-8 w-8 p-0 flex items-center justify-center text-neutral-500"
                  />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink
                    href="#"
                    isActive
                    className="bg-[#8B52A1] text-white hover:bg-[#7a488e] border-none rounded shadow-sm h-8 w-8 p-0 flex items-center justify-center font-normal"
                  >
                    1
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext
                    href="#"
                    className="border border-neutral-200 hover:bg-neutral-50 rounded shadow-sm h-8 w-8 p-0 flex items-center justify-center text-neutral-500"
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
