/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
export const shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const up = (pgm) => {
  pgm.createTable('claims', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    report_id: {
      type: 'VARCHAR(50)',
      notNull: true, // ID dari laporan asli yang sedang direspons
    },
    user_id: {
      type: 'VARCHAR(50)',
      notNull: true, // ID user yang mengajukan klaim/laporan
    },
    claim_type: {
      type: 'VARCHAR(20)',
      notNull: true, // Penanda: 'claim' (Klaim Barang) atau 'report' (Laporkan Barang)
    },
    reporter_name: {
      type: 'VARCHAR(100)',
      notNull: true, // "Siapa namamu?"
    },
    reporter_role: {
      type: 'VARCHAR(50)',
      notNull: true, // "Siapa kamu?" (Mahasiswa/Dosen/dll)
    },
    location: {
      type: 'TEXT',
      notNull: true, // "Dimana kamu menemukan/kehilangan barang ini?"
    },
    contact_phone: {
      type: 'VARCHAR(20)',
      notNull: true, // "No HP"
    },
    description: {
      type: 'TEXT',
      notNull: true, // "Apa ciri-ciri barang kamu..."
    },
    image_url: {
      type: 'TEXT',
      notNull: true, // URL hasil "Upload foto barang / bukti"
    },
    message: {
      type: 'TEXT', // "Pesan untuk pelapor / penemu" (opsional, jadi tidak notNull)
    },
    status: {
      type: 'VARCHAR(20)',
      notNull: true,
      default: 'pending', // Status: pending, accepted, rejected
    },
    created_at: {
      type: 'TIMESTAMP',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
    updated_at: {
      type: 'TIMESTAMP',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
  });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
  pgm.dropTable('claims');
};