DELIMITER //

CREATE TRIGGER pembayaran_selesai
BEFORE UPDATE ON pembayaran
FOR EACH ROW
BEGIN
  IF NEW.status = 'berhasil' AND OLD.status != 'berhasil' THEN
    SET NEW.tanggal_pembayaran = NOW();
  END IF;
END //

DELIMITER ;
