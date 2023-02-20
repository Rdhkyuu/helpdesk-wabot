    <?php
        include 'koneksi.php';
        $kode_tiket = $_GET['kode_tiket'];
        $nip = $_GET['nip'];
        $pegawai = $_GET['pegawai'];
        $sql = mysqli_query($koneksi, "SELECT * FROM aduan WHERE kode_tiket = '$kode_tiket'");
        $data = mysqli_fetch_array($sql);

        $hariIndo = array();
        $hariIndo[0] = "Minggu";
        $hariIndo[1] = "Senin";
        $hariIndo[2] = "Selasa";
        $hariIndo[3] = "Rabu";
        $hariIndo[4] = "Kamis";
        $hariIndo[5] = "Jumat";
        $hariIndo[6] = "Sabtu";
        $hari = date("d F Y");
        $namaHari = date("w");
        $hariIndonesia = $hariIndo[$namaHari];
        $hariIni = $hariIndonesia . ", " . $hari;

    ?>

    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Ngirim Pegawai</title>
    </head>
    <body>
        <form action="<?php $_SERVER['PHP_SELF']; ?>" method="POST">
            <input type="hidden" name="kode_tiket" value="<?= $data['kode_tiket']; ?>">
            <input type="hidden" name="nip" value="<?= $nip; ?>">
            <label for="">Tanggal</label>
            <input type="text" name="tanggal" value="<?= $data['tanggal']; ?>" id="" readonly>
            <br>
            <label for="">Nama</label>
            <input type="text" name="nama" value="<?= $data['nama']; ?>" id="" readonly>
            <br>
            <label for="">SKPD</label>
            <input type="text" name="skpd" value="<?= $data['skpd']; ?>" id="" readonly>
            <br>
            <label for="">NoTelepon</label>
            <input type="text" name="noTelpon" value="<?= $data['noTelpon']; ?>" id="" readonly>
            <br>
            <label for="">Aduan</label>
            <input type="text" name="aduan" value="<?= $data['aduan']; ?>" id="" readonly>
            <br>
            <label for="">Pegawai yang diambil</label>
            <input type="text" name="pegawai" value="<?= $pegawai ?>" id="" readonly>
            <br>
            <label for="">Tanggal Hari Ini</label>
            <input type="text" name="tanggalHariIni" value="<?= $hariIni; ?>"  readonly>
            <h4>Konfirmasi?</h4>
            <button type="submit" name="konfirmasi">Ya</button>
            <button type="submit" name="balik">Tidak</button>
        </form>
        
    </body>
    </html>

    <?php
        if (isset($_POST['konfirmasi'])) {  
            $nip = $_POST['nip'];
            $pegawai = $_POST['pegawai'];
            $kode_tiket = $_POST['kode_tiket'];
            $tanggalHariIni = $_POST['tanggalHariIni'];
            $status_tiket = "In Progress";
            $sql = mysqli_query($koneksi, "INSERT INTO pegawaiditugaskan VALUES('$nip','$pegawai','$kode_tiket','$tanggalHariIni','$status_tiket','','')");
            $sql2 = mysqli_query($koneksi, "UPDATE aduan SET statusLaporan='In Progress' WHERE kode_tiket='$kode_tiket'");
            if ($sql && $sql2) {
                header("location:index.php");
            } else {
                header("location:kirimPegawai.php");
            }
        }
        else if(isset($_POST['balik'])) {
            header("location:index.php");
        }
    ?>
    