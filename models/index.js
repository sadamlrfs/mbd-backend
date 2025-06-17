// SQL Equivalent (Relasi/Foreign Key):
// ALTER TABLE pesanan ADD CONSTRAINT fk_pesanan_kursi FOREIGN KEY (id_kursi) REFERENCES kursi(id_kursi);
// ALTER TABLE pesanan ADD CONSTRAINT fk_pesanan_penumpang FOREIGN KEY (id_penumpang) REFERENCES penumpang(id_penumpang);
// ALTER TABLE pembelian ADD CONSTRAINT fk_pembelian_penumpang FOREIGN KEY (id_penumpang) REFERENCES penumpang(id_penumpang);
// ALTER TABLE pembelian ADD CONSTRAINT fk_pembelian_kereta FOREIGN KEY (id_kereta) REFERENCES kereta(id_kereta);
// ALTER TABLE e_tiket ADD CONSTRAINT fk_etiket_pembelian FOREIGN KEY (id_pembelian) REFERENCES pembelian(id_pembelian);
// ALTER TABLE pembayaran ADD CONSTRAINT fk_pembayaran_pembelian FOREIGN KEY (id_pembelian) REFERENCES pembelian(id_pembelian);
// ALTER TABLE laporan ADD CONSTRAINT fk_laporan_pembayaran FOREIGN KEY (id_pembayaran) REFERENCES pembayaran(id_pembayaran);
// ALTER TABLE laporan ADD CONSTRAINT fk_laporan_petugas FOREIGN KEY (id_petugas) REFERENCES petugas(id_petugas);

const Pesanan = require("./Pesanan");
const Kursi = require("./Kursi");
const Penumpang = require("./penumpang");
const Kereta = require("./kereta");
const Pembelian = require("./pembelian");
const ETiket = require("./ETiket");
const Pembayaran = require("./pembayaran");
const Petugas = require("./petugas");
const Laporan = require("./laporan");

// Relasi benar untuk Pesanan
Pesanan.belongsTo(Kursi, { foreignKey: "id_kursi" });
Kursi.hasMany(Pesanan, { foreignKey: "id_kursi" });
Pesanan.belongsTo(Penumpang, { foreignKey: "id_penumpang" });
Penumpang.hasMany(Pesanan, { foreignKey: "id_penumpang" });

// Relasi Penumpang - Pembelian
Penumpang.hasMany(Pembelian, { foreignKey: "id_penumpang" });
Pembelian.belongsTo(Penumpang, { foreignKey: "id_penumpang" });

// Relasi Kereta - Pembelian
Kereta.hasMany(Pembelian, { foreignKey: "id_kereta" });
Pembelian.belongsTo(Kereta, { foreignKey: "id_kereta" });

// Relasi Pembelian - E-Tiket
Pembelian.hasOne(ETiket, { foreignKey: "id_pembelian" });
ETiket.belongsTo(Pembelian, { foreignKey: "id_pembelian" });

// Relasi Pembelian - Pembayaran
Pembelian.hasOne(Pembayaran, { foreignKey: "id_pembelian" });
Pembayaran.belongsTo(Pembelian, { foreignKey: "id_pembelian" });

// Relasi Pembayaran - Laporan
Pembayaran.hasMany(Laporan, { foreignKey: "id_pembayaran" });
Laporan.belongsTo(Pembayaran, { foreignKey: "id_pembayaran" });

// Relasi Petugas - Laporan
Petugas.hasMany(Laporan, { foreignKey: "id_petugas" });
Laporan.belongsTo(Petugas, { foreignKey: "id_petugas" });

// Relasi Pembayaran - Pesanan (1 pembayaran untuk 1 pesanan, asumsikan id_pesanan di pembayaran)
Pembayaran.belongsTo(Pesanan, {
  foreignKey: "id_pesanan",
  targetKey: "id_pesanan",
});
Pesanan.hasOne(Pembayaran, {
  foreignKey: "id_pesanan",
  sourceKey: "id_pesanan",
});

module.exports = {
  Penumpang,
  Kursi,
  Pesanan,
  Kereta,
  Pembelian,
  ETiket,
  Pembayaran,
  Petugas,
  Laporan,
};
