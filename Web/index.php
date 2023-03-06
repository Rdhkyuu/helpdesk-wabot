<?php
    include 'koneksi.php';
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Laporan Helpdesk ...</title>
    <link rel="stylesheet" href="fontawesome-free-6.3.0-web/css/all.min.css">
    <link rel="stylesheet" href="style.css">
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

      <div class="table_header">
      <h2>Laporan</h2>
    <div class="main-content">
        <h2>Dashboard Laporan</h2>
        <label for="filterStatus">Filter:</label>
          <select name="filterStatus" id="filterStatus">
            <option value="">Tampilkan Semua</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
      </div>

      <div class="table_body">
      <table>

        <thead>
        <tr>
            <th>Kode_Tiket</th>
            <th>Tanggal</th>
            <th>Nama</th>
            <th>SKPD</th>
            <th>NoTelepon</th>
            <th>Aduan</th>
            <th>StatusLaporan</th>
            <th>Petugas yang ingin ditugaskan</th>
            <th>Aksi</th>
        </tr>
        </thead>

        <tbody>
        <?php
                $sql = mysqli_query($koneksi,"SELECT * FROM aduan ORDER BY tanggal DESC ");
                while ($data = mysqli_fetch_array($sql)) :    
                //  if ($data['statusLaporan'] === 'Pending') :
            ?>
        <tr>
            <td><?= $data['kode_tiket'] ?></td>
            <td><?= $data['tanggal'] ?></td>
            <td><?= $data['nama'] ?></td>
            <td><?= $data['skpd'] ?></td>
            <td><?= $data['noTelpon'] ?></td>
            <td><?= $data['aduan'] ?></td>
            <td><?= $data['statusLaporan'] ?></td>
            <td>
              <?php if($data['statusLaporan'] === 'Pending') : ?>
                <select name="" class="pilihanPegawai">
                    <option value="">Silahkan pilih pegawai</option>
                    <?php
                        $sql1 = mysqli_query($koneksi, "SELECT * FROM pegawai");
                        while ($data1 = mysqli_fetch_array($sql1)) :
                    ?>
                    <option value="<?= $data1['nip']; ?>">
                            <?= $data1['nama']; ?>
                    </option>
                    <?php endwhile; ?>
                </select>
                <?php endif ?>
            </td>
            <td>
              <?php if($data['statusLaporan'] === 'Pending') : ?>
              <button class="kirim" data-kode-tiket="<?= $data['kode_tiket']; ?>">Tambah Pegawai</button>
              <?php endif ?>
                <a href="hapusLaporan.php?kode_tiket=<?= $data['kode_tiket'];?>">
                    <button class="hapus"> <i class="fa-solid fa-trash"></i> </button>
                </a>
                <button class="kirim" data-kode-tiket="<?= $data['kode_tiket']; ?>"> <i class="fa-solid fa-plus"></i> </button>
            </td>
        </tr>
              </td>
            </tr>
            <?php
            //  endif; 
            ?>
            <?php endwhile; ?>
         </tbody>
        </table>
        </div>
      <script>
        const selectFilter = document.querySelector('#filterStatus')
        const tombolTambah = document.querySelectorAll('.kirim')
        const pilihPegawai = document.querySelectorAll('.pilihanPegawai')

        tombolTambah.forEach((tombolTambah, index) => {
            tombolTambah.addEventListener('click', function(e) {
              console.log(index);
                    if (!pilihPegawai[index].value) {
                        e.preventDefault();
                        alert("Silahkan pilih pegawai terlebih dahulu");
                    }
                    else {
                        const opsiDipilih = pilihPegawai[index].options[pilihPegawai[index].selectedIndex];
                        const isiOpsi = opsiDipilih.text
                        const kode_tiket = tombolTambah.dataset.kodeTiket;
                        const pegawaiDiambil = pilihPegawai[index].value;
                        window.location.href = 'kirimPegawai.php?kode_tiket=' + kode_tiket + '&nip=' +pegawaiDiambil + '&pegawai=' + isiOpsi;
                    }
            });
        });
        
        // selectFilter.addEventListener('change', function() {
        //     let filterName = this.value;
        // })
      </script>
    </main>
</body>
</html>