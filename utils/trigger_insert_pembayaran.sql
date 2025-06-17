DELIMITER //
CREATE TRIGGER insert_pembayaran_setelah_pesanan
AFTER INSERT ON pesanan
FOR EACH ROW
BEGIN
  INSERT INTO pembayaran (id_pesanan, id_pembelian, metode, tanggal_pembayaran, status)
  VALUES (NEW.id_pesanan, NULL, 'manual', NULL, 'pending');
END //
DELIMITER ;
