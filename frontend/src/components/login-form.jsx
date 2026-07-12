import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { User, Lock } from 'lucide-react';
import { useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export function LoginForm({ className, ...props }) {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  // 1. Ubah state menjadi object
  const [formData, setFormData] = useState({
    identity_number: '',
    password: '',
  });

  // Fungsi untuk menangani perubahan input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await login(formData.identity_number, formData.password);

      Swal.fire({
        title: 'Berhasil!',
        text: 'Anda berhasil masuk',
        icon: 'success',
        timer: 2000,
        showConfirmButton: false,
      });

      navigate('/laporan/semua');
    } catch (err) {
      console.error('Login gagal:', err.response?.data?.message || err.message);
    }
  };

  return (
    <div className={cn('flex flex-col', className)} {...props}>
      <Card className="border-0 shadow-lg rounded-2xl md:rounded-[2rem] px-2 py-6 sm:p-8 md:p-10">
        <CardHeader className="space-y-2 pb-6 sm:pb-8">
          <CardTitle className="font-bold text-xl sm:text-2xl md:text-xl text-neutral-800">
            Laporkan barang hilangmu!
          </CardTitle>
          <CardDescription className="text-sm sm:text-base text-neutral-600">
            Masuk untuk melihat laporanmu
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Tambahkan onSubmit ke form */}
          <form onSubmit={handleLogin} className="flex flex-col gap-4 sm:gap-5">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 sm:pl-5 flex items-center pointer-events-none">
                <User className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
              </div>
              <Input
                name="identity_number" // Harus sesuai dengan key di state
                value={formData.identity_number}
                onChange={handleChange}
                type="text"
                placeholder="NIM/NIDN/NIK"
                required
                className="pl-11 sm:pl-14 py-5 sm:py-6 rounded-full border-gray-200 bg-white focus-visible:ring-1 focus-visible:ring-[#9455B5] text-sm sm:text-base"
              />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 sm:pl-5 flex items-center pointer-events-none">
                <Lock className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
              </div>
              <Input
                name="password" // Harus sesuai dengan key di state
                value={formData.password}
                onChange={handleChange}
                type="password"
                placeholder="Password"
                required
                className="pl-11 sm:pl-14 py-5 sm:py-6 rounded-full border-gray-200 bg-white focus-visible:ring-1 focus-visible:ring-[#9455B5] text-sm sm:text-base"
              />
            </div>

            <Button
              type="submit"
              className="w-full rounded-full bg-[#9455B5] hover:bg-[#8345a3] text-white py-5 sm:py-6 text-base sm:text-lg font-semibold mt-2 sm:mt-4 transition-colors"
            >
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
