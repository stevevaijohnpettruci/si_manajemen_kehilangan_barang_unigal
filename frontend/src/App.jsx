import './App.css';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import Report from './pages/report/Report';
import MyReport from './pages/report/MyReport';
import CreateReport from './pages/report/CreateReport';
import Navbar from './components/Navbar';
import GuestRoute from './routes/GuestRoute';
import ProtectedRoute from './routes/ProtectedRoute';

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
        <Route path="/laporan/semua" element={<Report />} />
        <Route path="/laporan/saya" element={<MyReport />} />
        <Route path="/laporan/buat" element={<CreateReport />} />
      </Route>
    </Routes>
  );
}

export default App;