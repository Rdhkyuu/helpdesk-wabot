<?php
    include 'koneksi.php';
    $kodeTiket = $_GET['kode_tiket'];
    mysqli_query($koneksi, "BEGIN");
    $sql = mysqli_query($koneksi, "DELETE FROM aduan WHERE kode_tiket='$kodeTiket'");
    if ($sql) {
        mysqli_query($koneksi, "COMMIT");
        header("location:index.php");
    } else {
        mysqli_query($koneksi, "ROLLBACK");
        echo "Rollback dilakukan!";
    }
?>