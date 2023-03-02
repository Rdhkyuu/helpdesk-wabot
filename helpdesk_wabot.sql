-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 02 Mar 2023 pada 07.00
-- Versi server: 10.4.24-MariaDB
-- Versi PHP: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `helpdesk_wabot`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `aduan`
--

CREATE TABLE `aduan` (
  `kode_tiket` varchar(100) NOT NULL,
  `tanggal` varchar(100) NOT NULL,
  `nama` varchar(100) NOT NULL,
  `skpd` varchar(100) NOT NULL,
  `noTelpon` varchar(100) NOT NULL,
  `aduan` varchar(100) NOT NULL,
  `statusLaporan` enum('Pending','In Progress','Done') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `aduan`
--

INSERT INTO `aduan` (`kode_tiket`, `tanggal`, `nama`, `skpd`, `noTelpon`, `aduan`, `statusLaporan`) VALUES
('TIX-2ORGDORU', 'Selasa, 07 February 2023', 'Stariaaab', '097689', '6283863458459@c.us', 'bsusbsjdjd', 'Pending'),
('TIX-42IBO4J1', 'Selasa, 07 February 2023', 'Arofan', '69', '6283162365253@c.us', 'nganggur', 'Pending'),
('TIX-5F9QSKP7', 'Senin, 06 February 2023', 'Kiku', '88888889', '6277889911', 'tess satu 21', 'Done'),
('TIX-80GDWLF6', 'Selasa, 07 February 2023', 'Ridho', '188181', '6282122783902@c.us', 'Ini tanpa no telepon', 'Done'),
('TIX-FOXFDSR1', 'Senin, 06 February 2023', 'Sukri', '88811379', '+6201889911', 'coba coba', 'Pending'),
('TIX-MCEK4AAJ', 'Selasa, 07 February 2023', 'Ridho', '7777777', '+6282122783902@c.us', 'Ngetes pakai', 'Pending'),
('TIX-QN4LNKCJ', 'Selasa, 07 February 2023', 'Masbroo', '69', '6283863458459@c.us', 'nyasar', 'Pending'),
('TIX-S5OREWYO', 'Senin, 06 February 2023', 'Rina', '66772133', '+62882019288141', 'Woi rini', 'Done'),
('TIX-YXJW1TYP', 'Selasa, 07 February 2023', 'Riku', '6969', '6285750917162@c.us', 'PELERRR', 'Pending');

-- --------------------------------------------------------

--
-- Struktur dari tabel `pegawai`
--

CREATE TABLE `pegawai` (
  `nip` varchar(100) NOT NULL,
  `nama` varchar(100) NOT NULL,
  `skpd` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `pegawai`
--

INSERT INTO `pegawai` (`nip`, `nama`, `skpd`) VALUES
('1122334455', 'wendiy', '9988117722'),
('123456789', 'riku', '987654321'),
('7788223311', 'rikyuu', '119988223311');

-- --------------------------------------------------------

--
-- Struktur dari tabel `pegawaiditugaskan`
--

CREATE TABLE `pegawaiditugaskan` (
  `nip` varchar(100) NOT NULL,
  `nama` varchar(100) NOT NULL,
  `kode_tiket` varchar(100) NOT NULL,
  `tanggal_ditugaskan` varchar(100) NOT NULL,
  `status_ticketLapor` enum('Pending','In Progress','Done','') NOT NULL,
  `nilai_laporan` tinyint(3) UNSIGNED NOT NULL CHECK (`nilai_laporan` <= 5),
  `tanggapan` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `pegawaiditugaskan`
--

INSERT INTO `pegawaiditugaskan` (`nip`, `nama`, `kode_tiket`, `tanggal_ditugaskan`, `status_ticketLapor`, `nilai_laporan`, `tanggapan`) VALUES
('1122334455', 'wendiy', 'TIX-80GDWLF6', 'Selasa, 07 February 2023', 'Done', 4, 'Hasilnya gimana'),
('1122334455', 'wendiy', 'TIX-AT2U6T7U', 'Senin, 06 February 2023', 'In Progress', 0, ''),
('7788223311', 'rikyuu', 'TIX-NH17RNNB', 'Friday, 03 February 2023', 'Done', 0, ''),
('7788223311', 'rikyuu', 'TIX-S5OREWYO', 'Senin, 06 February 2023', 'Done', 3, 'tesss');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `aduan`
--
ALTER TABLE `aduan`
  ADD PRIMARY KEY (`kode_tiket`);

--
-- Indeks untuk tabel `pegawai`
--
ALTER TABLE `pegawai`
  ADD PRIMARY KEY (`nip`);

--
-- Indeks untuk tabel `pegawaiditugaskan`
--
ALTER TABLE `pegawaiditugaskan`
  ADD PRIMARY KEY (`kode_tiket`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
