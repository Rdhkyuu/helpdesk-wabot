<?php 
    include 'koneksi.php';
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Rating Tiket</title>
</head>
<body>
    <h2>Pegawai</h2>
    <table>
        <tr>
            <th>NIP</th>
            <th>Nama</th>
            <th>SKPD</th>
        </tr>
        <?php
            $sql = mysqli_query($koneksi,"SELECT * FROM pegawai");
            while ($data = mysqli_fetch_array($sql)) : 
        ?>   
        <tr>
            <td><?= $data['nip']; ?></td>
            <td><?= $data['nama']; ?></td>
            <td><?= $data['skpd']; ?></td>
            </tr>
        <?php endwhile; ?>
    </table>    
<br><br>
    <h2>Pegawai Ditugaskan</h2>
    <table>
        <tr>
            <th>NIP</th>
            <th>Nama</th>
            <th>Kode Tiket</th>
            <th>Tanggal Ditugaskan</th>
            <th>Status</th>
        </tr>
        <?php
            $sql = mysqli_query($koneksi, "SELECT * FROM pegawaiditugaskan");
            while ($data = mysqli_fetch_array($sql)) :
        ?>
        <tr>
            <td><?= $data['nip'] ?></td>
            <td><?= $data['nama'] ?></td>
            <td><?= $data['kode_tiket'] ?></td>
            <td><?= $data['tanggal_ditugaskan'] ?></td>
            <td><?= $data['status_ticketLapor'] ?></td>
        </tr>
        <?php endwhile ?>
    </table>
</body>
</html>