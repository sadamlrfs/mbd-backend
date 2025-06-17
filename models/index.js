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
