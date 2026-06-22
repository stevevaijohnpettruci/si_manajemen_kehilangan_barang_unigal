import React, { useEffect, useState } from 'react';
import {
  getNotifications,
  markNotificationAsRead,
  deleteNotification,
} from '@/api/notification-api';
// Import icon (pastikan lucide-react sudah terinstall)
import { Check, Trash2 } from 'lucide-react';

export default function NotificationBox({ onClose }) {
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentUserId, setCurrentUserId] = useState(null);

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const limit = 10;

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        if (page === 1) setIsLoading(true);

        const token = localStorage.getItem('accessToken');
        if (!token) {
          setIsLoading(false);
          return;
        }

        let extractedUserId = currentUserId;

        if (!extractedUserId) {
          try {
            const payloadBase64 = token.split('.')[1];
            const decodedJson = atob(payloadBase64);
            const decodedData = JSON.parse(decodedJson);
            extractedUserId =
              decodedData.id || decodedData.userId || decodedData.user_id;
            setCurrentUserId(extractedUserId);
          } catch (e) {
            console.error('Gagal mengekstrak token:', e);
          }
        }

        if (!extractedUserId) return;

        const response = await getNotifications(
          extractedUserId,
          token,
          page,
          limit,
        );

        const payload = response.data.data;
        const notifData = payload.data || payload || [];
        const meta = payload.meta;

        if (page === 1) {
          setNotifications(notifData);
        } else {
          setNotifications((prev) => [...prev, ...notifData]);
        }

        if (meta && meta.totalPages) {
          setHasMore(page < meta.totalPages);
        } else {
          setHasMore(notifData.length === limit);
        }
      } catch (err) {
        console.error('Gagal mengambil data notifikasi:', err);
        if (page === 1) setNotifications([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotifications();
  }, [page]);

  // --- HANDLER BARU: Tandai Dibaca ---
  const handleMarkAsRead = async (notifId) => {
    try {
      const token = localStorage.getItem('accessToken');

      // Update UI langsung agar terasa cepat
      setNotifications((prev) =>
        prev.map((notif) =>
          notif.id === notifId ? { ...notif, is_read: true } : notif,
        ),
      );

      // Hit API di background
      await markNotificationAsRead(notifId, currentUserId, token);
    } catch (error) {
      console.error('Gagal menandai notifikasi:', error);
      // Opsional: Jika gagal, kembalikan state is_read seperti semula
    }
  };

  // --- HANDLER BARU: Hapus Notifikasi ---
  const handleDelete = async (notifId) => {
    try {
      const token = localStorage.getItem('accessToken');

      // Hapus dari UI langsung
      setNotifications((prev) => prev.filter((notif) => notif.id !== notifId));

      // Hit API di background
      await deleteNotification(notifId, currentUserId, token);
    } catch (error) {
      console.error('Gagal menghapus notifikasi:', error);
      // Opsional: Jika gagal, fetch ulang notifikasi
    }
  };

  return (
    <div className="absolute right-0 top-12 mt-2 w-96 bg-white border border-neutral-200 rounded-xl shadow-lg z-50 overflow-hidden flex flex-col">
      <div className="p-4 border-b border-neutral-100 flex justify-between items-center bg-neutral-50 shrink-0">
        <h3 className="font-semibold text-neutral-800 text-sm">Notifikasi</h3>
        <button
          onClick={onClose}
          className="text-xs font-medium text-neutral-500 hover:text-neutral-800 transition-colors"
        >
          Tutup
        </button>
      </div>

      <div className="max-h-96 overflow-y-auto no-scrollbar relative flex flex-col">
        {isLoading && page === 1 ? (
          <div className="p-6 text-center text-sm text-neutral-500">
            Memuat...
          </div>
        ) : notifications.length === 0 ? (
          <div className="p-6 text-center text-sm text-neutral-500">
            Belum ada notifikasi masuk.
          </div>
        ) : (
          <>
            {notifications.map((notif) => (
              <div
                key={notif.id}
                className={`p-4 border-b border-neutral-50 hover:bg-neutral-50 transition-colors shrink-0 group ${
                  !notif.is_read ? 'bg-blue-50/50' : 'bg-white'
                }`}
              >
                <div className="flex justify-between items-start gap-4">
                  {/* Area Teks Notifikasi */}
                  <div className="flex-1 cursor-pointer">
                    <h4 className="text-sm font-semibold text-neutral-800 leading-tight">
                      {notif.title}
                    </h4>
                    <p className="text-xs text-neutral-600 mt-1 line-clamp-2">
                      {notif.message}
                    </p>
                  </div>

                  {/* Area Tombol Aksi */}
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    {/* Tombol Centang (Hanya muncul jika belum dibaca) */}
                    {!notif.is_read && (
                      <button
                        onClick={() => handleMarkAsRead(notif.id)}
                        title="Tandai sudah dibaca"
                        className="p-1.5 text-blue-600 hover:bg-blue-100 rounded-md transition-colors"
                      >
                        <Check className="w-4 h-4" />
                      </button>
                    )}

                    {/* Tombol Hapus */}
                    <button
                      onClick={() => handleDelete(notif.id)}
                      title="Hapus notifikasi"
                      className="p-1.5 text-red-500 hover:bg-red-50 rounded-md transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {hasMore && (
              <div className="p-3 bg-white sticky bottom-0 border-t border-neutral-100 shrink-0 text-center shadow-[0_-10px_15px_-3px_rgba(0,0,0,0.05)]">
                <button
                  onClick={() => setPage((prev) => prev + 1)}
                  disabled={isLoading}
                  className="text-xs font-medium text-blue-600 hover:text-blue-800 transition-colors disabled:opacity-50"
                >
                  {isLoading ? 'Memuat...' : 'Muat Lebih Banyak'}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
