// SQL Equivalent (Booking Kursi):
// -- Cek kursi: SELECT * FROM kursi WHERE nomor_kursi = ?;
// -- Jika tersedia, INSERT INTO pesanan (...);
// -- UPDATE kursi SET dipesan = TRUE WHERE nomor_kursi = ?;
// -- Jika pembayaran: INSERT INTO pembayaran (...);

const express = require("express");
const auth = require("../middleware/auth");
const Pesanan = require("../models/Pesanan");
const Kursi = require("../models/Kursi");
const Penumpang = require("../models/penumpang");
const Pembayaran = require("../models/pembayaran");
const router = express.Router();

// Relasi
Pembayaran.belongsTo(Pesanan, {
  foreignKey: "id_pesanan",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
Pesanan.hasOne(Pembayaran, {
  foreignKey: "id_pesanan",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

// Pesan beberapa kursi
router.post("/", auth, async (req, res) => {
  const { nomorKursi } = req.body;

  if (!nomorKursi || !Array.isArray(nomorKursi) || nomorKursi.length === 0) {
    return res.status(400).json({ msg: "Mohon masukkan array nomor kursi" });
  }

  const hasilPesanan = [];
  const errorKursi = [];

  try {
    for (const nomor of nomorKursi) {
      const kursi = await Kursi.findOne({ where: { nomor_kursi: nomor } });

      if (!kursi) {
        errorKursi.push({ nomor, alasan: "tidak ditemukan" });
        continue;
      }

      if (kursi.dipesan) {
        errorKursi.push({ nomor, alasan: "sudah dipesan" });
        continue;
      }

      kursi.dipesan = true;
      await kursi.save();

      const pesanan = await Pesanan.create({
        id_penumpang: req.user.id_penumpang,
        id_kursi: kursi.id_kursi,
      });

      hasilPesanan.push({ nomor, pesanan });
    }

    if (hasilPesanan.length === 0) {
      return res.status(400).json({
        msg: "Gagal memesan kursi manapun",
        errors: errorKursi,
      });
    }

    res.json({
      msg: `Berhasil memesan ${hasilPesanan.length} kursi`,
      pesanan: hasilPesanan,
      gagal: errorKursi.length > 0 ? errorKursi : undefined,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

// Pesanan penumpang
router.get("/pesananSaya", auth, async (req, res) => {
  try {
    const pesanan = await Pesanan.findAll({
      where: { id_penumpang: req.user.id_penumpang },
      include: [
        {
          model: Kursi,
          attributes: ["nomor_kursi", "posisi", "jendela"],
        },
        {
          model: Penumpang,
          attributes: ["nama", "email"],
        },
        {
          model: Pembayaran,
          attributes: ["id_pembayaran", "status"], // tambahkan id_pembayaran
          required: false,
        },
      ],
    });
    res.json(pesanan);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

// Edit pesanan (ubah kursi pesanan)
router.put("/:id", auth, async (req, res) => {
  try {
    const { nomor_kursi_baru } = req.body;
    const pesanan = await Pesanan.findOne({
      where: { id_pesanan: req.params.id, id_penumpang: req.user.id_penumpang },
    });
    if (!pesanan)
      return res.status(404).json({ msg: "Pesanan tidak ditemukan" });

    const kursiBaru = await Kursi.findOne({
      where: { nomor_kursi: nomor_kursi_baru },
    });
    if (!kursiBaru)
      return res.status(404).json({ msg: "Kursi baru tidak ditemukan" });
    if (kursiBaru.dipesan)
      return res.status(400).json({ msg: "Kursi baru sudah dipesan" });

    // Tandai kursi lama jadi tidak dipesan
    const kursiLama = await Kursi.findByPk(pesanan.id_kursi);
    if (kursiLama) {
      kursiLama.dipesan = false;
      await kursiLama.save();
    }
    // Tandai kursi baru jadi dipesan
    kursiBaru.dipesan = true;
    await kursiBaru.save();

    pesanan.id_kursi = kursiBaru.id_kursi;
    await pesanan.save();
    res.json({ msg: "Pesanan berhasil diubah", pesanan });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

// Hapus pesanan
router.delete("/:id", auth, async (req, res) => {
  try {
    const pesanan = await Pesanan.findOne({
      where: { id_pesanan: req.params.id, id_penumpang: req.user.id_penumpang },
    });
    if (!pesanan)
      return res.status(404).json({ msg: "Pesanan tidak ditemukan" });
    // Tandai kursi jadi tidak dipesan
    const kursi = await Kursi.findByPk(pesanan.id_kursi);
    if (kursi) {
      kursi.dipesan = false;
      await kursi.save();
    }
    await pesanan.destroy();
    res.json({ msg: "Pesanan berhasil dihapus" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

// Filter dan sortir pesanan (SQL)
router.get("/filter", auth, async (req, res) => {
  try {
    const sequelize = require("../config/db");
    const {
      nomor_kursi,
      posisi,
      jendela,
      sort = "waktu_pesan",
      order = "DESC",
    } = req.query;
    let sql = `SELECT p.*, k.nomor_kursi, k.posisi, k.jendela FROM pesanan p JOIN kursi k ON p.id_kursi = k.id_kursi WHERE p.id_penumpang = :id_penumpang`;
    const params = { id_penumpang: req.user.id_penumpang };
    if (nomor_kursi) {
      sql += " AND k.nomor_kursi = :nomor_kursi";
      params.nomor_kursi = nomor_kursi;
    }
    if (posisi) {
      sql += " AND k.posisi = :posisi";
      params.posisi = posisi;
    }
    if (jendela !== undefined) {
      sql += " AND k.jendela = :jendela";
      params.jendela = jendela === "true" ? 1 : 0;
    }
    sql += ` ORDER BY p.${sort} ${order === "ASC" ? "ASC" : "DESC"}`;
    const [data] = await sequelize.query(sql, { replacements: params });
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

// Endpoint untuk total pesanan (menggunakan function SQL)
router.get("/total", auth, async (req, res) => {
  try {
    const sequelize = require("../config/db");
    const [[{ total }]] = await sequelize.query(
      "SELECT total_pesanan() AS total"
    );
    res.json({ total });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

// Endpoint update status pembayaran dari frontend
router.put("/pembayaran/:id", auth, async (req, res) => {
  try {
    const { status } = req.body;
    const pembayaran = await Pembayaran.findOne({
      where: { id_pembayaran: req.params.id },
      include: [
        { model: Pesanan, where: { id_penumpang: req.user.id_penumpang } },
      ],
    });
    if (!pembayaran)
      return res.status(404).json({ msg: "Pembayaran tidak ditemukan" });
    pembayaran.status = status;
    await pembayaran.save(); // Trigger di DB akan otomatis update tanggal_pembayaran jika status 'berhasil'
    res.json({ msg: "Status pembayaran berhasil diupdate", pembayaran });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

// Hapus pesanan dan pembayaran terkait
router.delete("/:id", auth, async (req, res) => {
  const idPesanan = req.params.id;

  try {
    // Hapus data pembayaran terkait
    await Pembayaran.destroy({ where: { id_pesanan: idPesanan } });
    // Hapus data pesanan
    await Pesanan.destroy({ where: { id_pesanan: idPesanan } });

    res.json({ msg: "Pesanan dan pembayaran berhasil dihapus" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

module.exports = router;
