import './App.css';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import Report from './pages/report/Report';
import MyReport from './pages/report/MyReport';
import EditReport from './pages/report/EditReport';
import CreateReport from './pages/report/CreateReport';
import Navbar from './components/Navbar';
import GuestRoute from './routes/GuestRoute';
import ProtectedRoute from './routes/ProtectedRoute';
import Claim from './pages/claim/Claim';
import ReportDetail from './pages/report/ReportDetail';
import ClaimHistory from './pages/claim/ClaimHistory';
import ClaimInbox from './pages/claim/ClaimInbox';
import Notification from './pages/notification/Notification';

function App() {
  return (
    <Routes>
      {/* Route hanya untuk guest */}
      <Route element={<GuestRoute />}>
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <LoginPage />
            </>
          }
        />
      </Route>

      {/* Route yang membutuhkan login */}
      <Route element={<ProtectedRoute />}>
        {/* Fitur Laporan */}
        <Route path="/laporan/semua" element={<Report />} />
        <Route path="/laporan/saya" element={<MyReport />} />
        <Route path="/laporan/buat" element={<CreateReport />} />
        <Route path="/laporan/edit/:id" element={<EditReport />} />
        <Route path="/laporan/tindak-lanjut/:id" element={<Claim />} />
        <Route path="/laporan/detail/:id" element={<ReportDetail />} />

        {/* Fitur Klaim */}
        <Route path="/klaim/riwayat-klaim" element={<ClaimHistory />} />
        <Route path="/klaim/pengajuan-masuk" element={<ClaimInbox />} />

        <Route path="/notifikasi/riwayat" element={<Notification />} />
      </Route>
    </Routes>
  );
}

export default App;
