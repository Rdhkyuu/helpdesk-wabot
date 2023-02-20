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
</head> 
<body>
    <h2>Laporan</h2>
    <label for="filterStatus">Filter:</label>
    <select name="filterStatus" id="filterStatus">
        <option value="">Tampilkan Semua</option>
        <option value="Pending">Pending</option>
        <option value="In Progress">In Progress</option>
        <option value="Done">Done</option>
    </select>
    <table border="1">
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
            </td>
            <td>
                <a href="hapusLaporan.php?kode_tiket=<?= $data['kode_tiket'];?>">
                    <button>Hapus Laporan</button>
                </a>
                    <button class="kirim" data-kode-tiket="<?= $data['kode_tiket']; ?>">Tambah Pegawai</button>
            </td>
        </tr>
            <?php
            //  endif; 
            ?>
            <?php endwhile; ?>
        </table>
    <script>
        const selectFilter = document.querySelector('#filterStatus')
        const tombolTambah = document.querySelectorAll('.kirim')
        const pilihPegawai = document.querySelectorAll('.pilihanPegawai')

        tombolTambah.forEach((tombolTambah, index) => {
            tombolTambah.addEventListener('click', function(e) {
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
</body>
</html>