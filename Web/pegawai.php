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
    <link rel="stylesheet" href="fontawesome-free-6.3.0-web/css/all.min.css">
    <link rel="stylesheet" href="style3.css">
</head>

<body style="background: #e1e2e2;">
    <div class="sidebar">

        <div class="sidebar-brand">
        <h2> Helpdesk wabot </h2>
        </div>

      <div class="sidebar-menu">
        <ul>
          <li>
            <a href="index.php"> <i class="fa-solid fa-house"></i> Dashboard</a>
          </li>
          <li>
            <a href="pegawai.php"> <i class="fa-solid fa-user"></i> Pegawai </a>
          </li>
          <li>
            <a href="rating.php"> <i class="fa-solid fa-ticket"></i> Rating Tiket </a>
          </li>
          <li>
            <a href="#"> <i class="fa-solid fa-gear"></i> Setting </a>
          </li>
          <li>
            <a href="#" class="logout"> <i class="fa-solid fa-right-from-bracket"></i> Logout </a>
          </li>
        </ul>
      </div>
    </div>

    <main class="main_table">

    <h2> Data Pegawai</h2>
    <table class="table1">
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
    <table class="table2">
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
    </main>
</body>
</html>