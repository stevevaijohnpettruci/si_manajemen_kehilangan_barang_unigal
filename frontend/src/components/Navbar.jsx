import AppIcon from "./ui/icons";

export default function Navbar() {
  return (
    <nav className="bg-[#9455B5] text-white px-8 py-4">
      <div className="flex items-center gap-4">
        
        {/* Kontainer Logo */}
        <div className="w-12 h-12 md:w-14 md:h-14 shrink-0">
          <AppIcon/>
        </div>

        {/* Kontainer Teks */}
        <div className="flex flex-col justify-center">
          {/* Tambahkan !m-0 di sini untuk menghilangkan margin dari CSS Global */}
          <h1 className="text-2xl md:text-3xl font-bold !text-white tracking-wide leading-none !m-0">
            SILACAK
          </h1>
          {/* Tambahkan mt-1 (margin-top) sedikit jika dirasa terlalu menempel */}
          <p className="text-sm md:text-lg font-medium leading-none text-white/90 mt-1">
            Universitas Galuh
          </p>
        </div>

      </div>
    </nav>
  );
}