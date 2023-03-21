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

<body>
    
    <nav class="navbar">
      <div class="profile">
        <h3> Pegawai </h3>
        <!-- <img src="img/admin.jpg" alt="admin.jpg" class="profile_image"> -->
      </div>
    </nav>

    <div class="sidebar">
      <div class="sidebar-brand">
        <a href="index.php"> Helpdesk wabot </a>
      </div>
      
      <div class="sidebar-menu">
        <ul>
          <li class="menu-header"> main menu </li> 
          <li>
            <a href="index.php"> <i class="fa-solid fa-house"></i> <span> Dashboard </span> </a>
          </li>
          <li>
            <a href="pegawai.php"> <i class="fa-solid fa-user"></i> <span> Pegawai </span> </a>
          </li>
          <li>
            <a href="rating.php"> <i class="fa-solid fa-ticket"></i> <span> Rating Tiket </span> </a>
          </li>
          <li>
            <a href="#"> <i class="fa-solid fa-gear"></i> <span> Setting </span> </a>
          </li>
        </ul>

        <ul class="logout">
          <li>
            <a href="#"> <i class="fa-solid fa-right-from-bracket"></i> <span> Logout </span> </a>
          </li>
        </ul>
      </div>
    </div>

    <main class="main_table">

    <div class="table_header">
      <h2> Data Pegawai</h2>
    </div>

    <div class="table_body">
      <table>
  
        <thead>
          <tr>
              <th>NIP</th>
              <th>Nama</th>
              <th>SKPD</th>
          </tr>
        </thead>
  
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
    </div> 
<br><br>
    <div class="table_header">
      <h2>Pegawai Ditugaskan</h2>
    </div>

    <div class="table_body">
      <table>
        
        <thead>
          <tr>
              <th>NIP</th>
              <th>Nama</th>
              <th>Kode Tiket</th>
              <th>Tanggal Ditugaskan</th>
              <th>Status</th>
          </tr>
        </thead>
  
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
    </div>
    </main>

    <footer class="footer">
      <div class="container">
        <div class="row">

          <div class="footer-col">
            <div class="col1">
              <h4> database </h4>
              <a target="_blank" href="https://www.instagram.com/rdhkyu/"> Rikyu </a>
            </div>
          </div>

          <div class="footer-col">
            <div class="col2">
              <h4> pembimbing </h4>
              <p> Bapak Ridwan</p>
            </div>
          </div>

          <div class="footer-col">
            <div class="col3">
              <h4> design </h4>
              <a target="_blank" href="https://www.instagram.com/rinn.ii_/"> Rina </a>
            </div>
          </div>

        </div>

          <div class="bottom-details">
            <span class="copyright_text"> Copyright&#169;helpdeskDiskominfo2023</span>
          </div>
        
      </div>  
    </footer>
</body>
</html>