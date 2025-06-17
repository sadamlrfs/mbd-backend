-- Tabel summary kursi lengkap
CREATE TABLE IF NOT EXISTS summary_kursi (
  id INT PRIMARY KEY DEFAULT 1,
  total INT DEFAULT 0,
  dipesan INT DEFAULT 0,
  tersedia INT DEFAULT 0,
  total_jendela INT DEFAULT 0,
  jendela_tersedia INT DEFAULT 0,
  atas_tersedia INT DEFAULT 0,
  tengah_tersedia INT DEFAULT 0,
  bawah_tersedia INT DEFAULT 0
);
INSERT IGNORE INTO summary_kursi (id) VALUES (1);

DELIMITER //
CREATE TRIGGER after_insert_kursi_summary
AFTER INSERT ON kursi
FOR EACH ROW
BEGIN
  UPDATE summary_kursi SET
    total = (SELECT COUNT(*) FROM kursi),
    dipesan = (SELECT COUNT(*) FROM kursi WHERE dipesan = TRUE),
    tersedia = (SELECT COUNT(*) FROM kursi WHERE dipesan = FALSE),
    total_jendela = (SELECT COUNT(*) FROM kursi WHERE jendela = TRUE),
    jendela_tersedia = (SELECT COUNT(*) FROM kursi WHERE jendela = TRUE AND dipesan = FALSE),
    atas_tersedia = (SELECT COUNT(*) FROM kursi WHERE posisi = 'atas' AND dipesan = FALSE),
    tengah_tersedia = (SELECT COUNT(*) FROM kursi WHERE posisi = 'tengah' AND dipesan = FALSE),
    bawah_tersedia = (SELECT COUNT(*) FROM kursi WHERE posisi = 'bawah' AND dipesan = FALSE)
  WHERE id = 1;
END //
DELIMITER ;

DELIMITER //
CREATE TRIGGER after_update_kursi_summary
AFTER UPDATE ON kursi
FOR EACH ROW
BEGIN
  UPDATE summary_kursi SET
    total = (SELECT COUNT(*) FROM kursi),
    dipesan = (SELECT COUNT(*) FROM kursi WHERE dipesan = TRUE),
    tersedia = (SELECT COUNT(*) FROM kursi WHERE dipesan = FALSE),
    total_jendela = (SELECT COUNT(*) FROM kursi WHERE jendela = TRUE),
    jendela_tersedia = (SELECT COUNT(*) FROM kursi WHERE jendela = TRUE AND dipesan = FALSE),
    atas_tersedia = (SELECT COUNT(*) FROM kursi WHERE posisi = 'atas' AND dipesan = FALSE),
    tengah_tersedia = (SELECT COUNT(*) FROM kursi WHERE posisi = 'tengah' AND dipesan = FALSE),
    bawah_tersedia = (SELECT COUNT(*) FROM kursi WHERE posisi = 'bawah' AND dipesan = FALSE)
  WHERE id = 1;
END //
DELIMITER ;
