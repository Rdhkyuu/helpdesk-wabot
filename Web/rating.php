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
    <h2>Rating Tiket</h2>
    
    <table>
        <tr>
            <th>Nama Pelapor</th>
            <th>Kode Tiket</th>
            <th>Nilai Laporan</th>
            <th>Tanggapan</th>
            <th>Petugas yang ditugaskan</th>
        </tr>
        <?php
            $sql = mysqli_query($koneksi,"SELECT p.*, a.nama AS aduan_nama, a.*, p.nama AS pegawaiditugaskan_nama
            FROM pegawaiditugaskan p
            JOIN aduan a ON p.kode_tiket = a.kode_tiket");
            while ($data = mysqli_fetch_array($sql)) : 
            if ($data['status_ticketLapor'] === 'Done') :
        ?>   
        
        <tr>
            <td><?= $data['aduan_nama'] ?></td>
            <td><?= $data['kode_tiket']; ?></td>
            <td><?= $data['nilai_laporan']; ?></td>
            <td><?= $data['tanggapan']; ?></td>
            <td><?= $data['pegawaiditugaskan_nama']; ?></td>
            </tr>
        <?php endif; ?>
        <?php endwhile; ?>
    </table>    
</body>
</html>