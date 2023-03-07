// Package yang di gunakan
const { Client } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");
const mysql = require("mysql2");

// Database Section
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "helpdesk_wabot",
});

connection.connect(function (error) {
  if (error) {
    console.error(error);
  } else {
    console.log("Berhasil terhubung.");
  }
});

// Membuat Client Baru
const client = new Client();

//Proses Masuk whatsappjs menggunakan qrcode yang akan di kirim oleh whatsapp-web.js
client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

//Proses Dimana Whatsapp-web.js Siap digunakan
client.on("ready", () => {
  console.log("Udah Siap!");

  const nomorTuju = [];
  nomorTuju[0] = "6282122783902@c.us";
  // nomorTuju[1] = "6285750917162@c.us";
  // nomorTuju[2] = "6283162365253@c.us";
  // nomorTuju[3] = "62895700510221@c.us";
  // nomorTuju[4] = "6283863458459@c.us";
  // nomorTuju[5] = "6289691686721@c.us";
  // nomorTuju[6] = "6281549140599@c.us";
  const text = "Rikyuu Siap dijalankan!";
  for (let i = 0; i < nomorTuju.length; i++) {
    client.sendMessage(
      nomorTuju[i],
      `Command yang tersedia:
      /input
      /close
      /cek
      /rate`
    );
    client.sendMessage(nomorTuju[i], text);
  }
});

client.on("message", async (message) => {
  // Function untuk generate id random
  function tiketRandom(prefix) {
    let id = prefix.concat(
      Math.random().toString(36).substring(2, 10).toUpperCase()
    );
    return id;
  }
  let prefixAwal = "TIX-";

  // Generate Tanggal Secara Realtime

  const options = {
    year: "numeric",
    month: "long",
    day: "2-digit",
  };
  const hariIni = new Date();
  const indo = new Date();
  const hariIndo = [];
  hariIndo[0] = "Minggu";
  hariIndo[1] = "Senin";
  hariIndo[2] = "Selasa";
  hariIndo[3] = "Rabu";
  hariIndo[4] = "Kamis";
  hariIndo[5] = "Jumat";
  hariIndo[6] = "Sabtu";

  // Menghilangkan Tanda + untuk NoTelepon User
  function cekTanda(nomor) {
    if (nomor.startsWith("+")) {
      return nomor.substring(1);
    } else {
      return nomor;
    }
  }

  // console.log(Date());
  // const tanggalHariIni = tanggalHariIni.toLocaleDateString('en-GB', options);
  // console.log(todayDate);

  // Mengambil Enum statusLaporan
  const statusLaporan = ["Pending", "In progress", "Done"][0];
  const nomorGuwe = "+6282122783902".substring(1) + "@c.us";

  // Command
  // Input
  // Tes
  if (message.body.toLowerCase() === "/tes" && !message.fromMe) {
    await message.reply(message.from);
  }

  // Dinamis Input(Selesai, tidak tau apakah ada bug)
  if (message.body.toLowerCase() === "/input" && !message.fromMe) {
    await client.sendMessage(message.from, "Nama#SKPD#Aduan");
    await client.sendMessage(message.from, "Silahkan nanti isi sesuai urutan!");
    await message.reply("Silahkan masukkan data seperti apa yang ada diatas");
    const template = /^[\w!?\s]+#[0-9]+#[\w!?\s\+\-]+$/;
    const konfirmasi = await new Promise((resolve) => {
      client.once("message", async (reply) => {
        if (reply.from === message.from && !reply.fromMe) {
          resolve(reply.body);
        }
      });
    });
    console.log(konfirmasi);
    console.log(template.test(konfirmasi));

    if (template.test(konfirmasi)) {
      let isiText = konfirmasi.split("#");
      let isiTiket = tiketRandom(prefixAwal);
      let nama = isiText[0];
      let SKPD = isiText[1];
      let aduan = isiText[2];
      let telepon = message.from;
      const tanggalHariIni =
        hariIndo[indo.getDay()] +
        ", " +
        hariIni.toLocaleDateString("en-GB", options);
      const querySQL =
        "INSERT INTO aduan (kode_tiket, tanggal, nama, skpd, noTelpon, aduan, statusLaporan) VALUES (?, ?, ?, ?, ?, ?, ?)";
      const data = [
        isiTiket,
        tanggalHariIni,
        nama,
        SKPD,
        telepon,
        aduan,
        statusLaporan,
      ];

      connection.query(querySQL, data, (error, results) => {
        if (error) throw error;
        console.log(results.affectedRows + " record(s) updated");
      });
      // connection.query("SELECT * FROM aduan ORDER BY tanggal DESC LIMIT 1;", (error,results) => {
      //   if (error) throw error;
      //   console.log(results);
      // })
      await message.reply(
        "Berhasil dimasukkan! Silahkan tunggu beberapa hari sampai pegawai kami mengkonfirmasi anda kembali!"
      );
      await message.reply(
        `Kode tiketmu adalah ' *${isiTiket}* ', kamu bisa mengecek status tiketmu dengan /cek`
      );
    } else {
      await message.reply(
        "Maaf ada yang salah! Pastikan diisi sesuai dengan template. Silahkan ulang lagi dengan mengetik commandnya kembali"
      );
    }
  }

  // Close
  if (message.body.toLowerCase() === "/close" && !message.fromMe) {
    await client.sendMessage(message.from, "kode_tiket#close");
    await client.sendMessage(
      message.from,
      "Silahkan masukkan seperti apa yang diatas"
    );
    const template = /^[\w!?\+\-]+#close$/i;
    const konfirmasi = await new Promise((resolve) => {
      client.once("message", async (reply) => {
        if (reply.from === message.from && !reply.fromMe) {
          resolve(reply.body);
        }
      });
    });

    if (template.test(konfirmasi)) {
      let isiText = konfirmasi.split("#");
      let kode_tiket = isiText[0];

      connection.query(
        "SELECT kode_tiket FROM aduan WHERE kode_tiket = ?;",
        [kode_tiket],
        async (error, results) => {
          if (error) throw error;
          else if (results.length === 0) {
            await client.sendMessage(
              message.from,
              `Kode tiket ' *${kode_tiket}* ' tidak ada!`
            );
          } else if (results[0].kode_tiket === kode_tiket) {
            connection.query(
              "SELECT statusLaporan FROM aduan WHERE kode_tiket = ?",
              [kode_tiket],
              async (error, results) => {
                if (error) throw error;
                else if (results[0].statusLaporan === "Pending") {
                  await client.sendMessage(
                    message.from,
                    "Status Laporan ini masih Pending, yakin untuk ditutup? (Ya/Tidak)"
                  );
                  const konfirmasi_tutup = await new Promise((resolve) => {
                    client.once("message", async (reply) => {
                      if (reply.from === message.from && !reply.fromMe) {
                        resolve(reply.body);
                      }
                    });
                  });

                  if (konfirmasi_tutup.toLowerCase() === "ya") {
                    let teleponUser;
                    await new Promise((resolve, reject) => {
                      connection.query(
                        "SELECT noTelpon FROM aduan WHERE kode_tiket = ?",
                        [kode_tiket],
                        (error, results) => {
                          if (error) reject(error);
                          teleponUser = results[0].noTelpon;
                          resolve();
                        }
                      );
                    });
                    connection.query(
                      "UPDATE aduan SET statusLaporan = ? WHERE kode_tiket = ?",
                      ["Done", kode_tiket],
                      async (error, results) => {
                        if (error) throw error;
                        console.log(
                          results.affectedRows + " record(s) updated"
                        );
                      }
                    );
                    await client.sendMessage(
                      message.from,
                      `' *${kode_tiket}* ' Telah ditutup! Terimakasih!`
                    );
                    await client.sendMessage(
                      teleponUser,
                      `Tiket anda ' *${kode_tiket}* ' telah ditutup! Mohon berikan tanggapan dengan mengetik /rate !`
                    );
                  } else {
                    await client.sendMessage(message.from, "Dibatalkan!");
                  }
                } else if (results[0].statusLaporan === "Done") {
                  await client.sendMessage(
                    message.from,
                    `' *${kode_tiket}* ' Ini sudah ditutup!`
                  );
                } else if (results[0].statusLaporan === "In Progress") {
                  let nip;
                  let nama;
                  let teleponUser;
                  await new Promise((resolve, reject) => {
                    connection.query(
                      "SELECT noTelpon FROM aduan WHERE kode_tiket = ?",
                      [kode_tiket],
                      (error, results) => {
                        if (error) reject(error);
                        teleponUser = results[0].noTelpon;
                        resolve();
                      }
                    );
                  });
                  await new Promise((resolve, reject) => {
                    connection.query(
                      "SELECT nip,nama FROM pegawaiditugaskan WHERE kode_tiket = ?",
                      [kode_tiket],
                      (error, results) => {
                        if (error) reject(error);
                        nip = results[0].nip;
                        nama = results[0].nama;
                        resolve();
                      }
                    );
                  });
                  await client.sendMessage(
                    message.from,
                    `' *${kode_tiket}* ' dikerjakan oleh ' *${nama}* ' dengan nip ' *${nip}* '. Konfirmasi telah selesai? (Ya/Tidak)`
                  );
                  const konfirmasi_tutup = await new Promise((resolve) => {
                    client.once("message", async (reply) => {
                      if (reply.from === message.from && !reply.fromMe) {
                        resolve(reply.body);
                      }
                    });
                  });
                  if (konfirmasi_tutup.toLowerCase() === "ya") {
                    connection.query(
                      "UPDATE aduan SET statusLaporan = ? WHERE kode_tiket = ?",
                      ["Done", kode_tiket],
                      (error, results) => {
                        if (error) throw error;
                        console.log(
                          results.affectedRows + " table aduan dirubah!"
                        );
                      }
                    );
                    connection.query(
                      "UPDATE pegawaiditugaskan SET status_ticketLapor = ? WHERE kode_tiket = ?",
                      ["Done", kode_tiket],
                      (error, results) => {
                        if (error) throw error;
                        console.log(
                          results.affectedRows +
                            " table pegawaiditugaskan dirubah!"
                        );
                      }
                    );
                    await client.sendMessage(
                      message.from,
                      `' *${kode_tiket}* ' yang dikerjakan oleh ' *${nama}* ' dengan nip ' *${nip}* ' telah ditutup! Terimakasih!'`
                    );
                    await client.sendMessage(
                      teleponUser,
                      `Tiket anda ' *${kode_tiket}* ' telah ditutup! Mohon berikan tanggapan dengan mengetik /rate !`
                    );
                  } else {
                    await client.sendMessage(message.from, "Dibatalkan!");
                  }
                }
              }
            );
          }
        }
      );
    } else {
      await message.reply(
        "Ada yang salah! Silahkan perhatikan inputan anda! Ketik command dari awal lagi untuk memulai"
      );
    }
  }

  if (message.body.toLowerCase() === "/cek" && !message.fromMe) {
    const nomorUser = message.from;
    connection.query(
      "SELECT * FROM aduan WHERE noTelpon = ?",
      [nomorUser],
      async (error, results) => {
        if (error) throw error;
        else if (results.length === 0) {
          await client.sendMessage(message.from, "Tidak ada tiket!");
        } else {
          let hasil = "";
          await client.sendMessage(
            message.from,
            `Tiket yang anda punya: *${results.length}*`
          );
          for (let i = 0; i < results.length; i++) {
            console.log(
              `${results[i].kode_tiket}, dengan aduan : ${results[i].aduan} (${results[i].statusLaporan}) \n`
            );
            hasil += `' *${results[i].kode_tiket}* ', dengan aduan : ' *${results[i].aduan}* ' (' _${results[i].statusLaporan}_ ') \n`;
          }
          await client.sendMessage(message.from, hasil);
        }
      }
    );
  }

  if (message.body.toLowerCase() === "/rate" && !message.fromMe) {
    await client.sendMessage(
      message.from,
      "kode_tiket#nilai_laporan(1-5)#tanggapan"
    );
    await client.sendMessage(message.from, "Silahkan isi sesuai diatas!");
    const template = /^[\w\s!?\+\-]+#[1-5]+#[\w\s!?\+\-]+$/;

    const konfirmasi = await new Promise((resolve) => {
      client.once("message", async (reply) => {
        if (reply.from === message.from && !reply.fromMe) {
          resolve(reply.body);
        }
      });
    });

    console.log(konfirmasi);
    if (template.test(konfirmasi)) {
      let teleponUser = message.from;
      connection.query(
        "SELECT * FROM aduan WHERE noTelpon = ?",
        [teleponUser],
        async (error, results) => {
          if (error) throw error;
          else if (results.length === 0) {
            await message.reply("Kamu tidak memiliki tiket untuk di rate!");
          }
        }
      );

      let isiText = konfirmasi.split("#");
      let isiTiket = isiText[0];
      let angkaRating = isiText[1];
      let tanggapanRating = isiText[2];

      connection.query(
        "SELECT * FROM aduan WHERE kode_tiket = ?",
        [isiTiket],
        async (error, results) => {
          if (error) throw error;
          else if (results.length === 0) {
            await client.sendMessage(
              message.from,
              `Kode tiket ' *${isiTiket}* ' tidak ada!`
            );
          } else if (results[0].noTelpon !== teleponUser) {
            await message.reply("Kamu Mengakses Tiket yang bukan punya kamu!");
          } else if (results[0].statusLaporan === "Pending") {
            await message.reply(
              `Tiket yang ingin kamu rating (*${isiTiket}*) masih dalam tahap *Pending* `
            );
          } else {
            connection.query(
              "SELECT * FROM pegawaiditugaskan WHERE kode_tiket = ?",
              [isiTiket],
              async (error, results) => {
                if (error) throw error;
                else if (
                  !results[0].nilai_laporan == 0 ||
                  !results[0].tanggapan == ""
                ) {
                  await client.sendMessage(
                    message.from,
                    `' *${isiTiket}* ' sudah dirating! dengan nilai ' *${results[0].nilai_laporan}* ' dan tanggapan ' *${results[0].tanggapan}* '`
                  );
                } else if (results[0].status_ticketLapor == "In Progress") {
                  await client.sendMessage(
                    message.from,
                    `' *${isiTiket}* ' masih dalam tahap ' *${results[0].status_ticketLapor}* '! Tidak bisa dikasih rating!`
                  );
                } else {
                  connection.query(
                    "UPDATE pegawaiditugaskan SET nilai_laporan = ?, tanggapan = ? WHERE kode_tiket = ?",
                    [angkaRating, tanggapanRating, isiTiket]
                  );
                  if (angkaRating <= 2) {
                    await client.sendMessage(
                      message.from,
                      `' *${isiTiket}* ' baru saja kamu rating! dengan nilai ' *${angkaRating}* ' dan tanggapan ' *${tanggapanRating}* '! Kami meminta maaf apabila layanan kami tidak sesuai ekspetasi karena anda memberi kami rating rendah! Terimakasih telah memakai layanan kami!`
                    );
                  } else {
                    await client.sendMessage(
                      message.from,
                      `' *${isiTiket}* ' baru saja kamu rating! dengan nilai ' *${angkaRating}* ' dan tanggapan ' *${tanggapanRating}* '! Kami sangat berterimakasih karena anda memberi rating yang baik! Terimakasih telah memakai layanan kami!`
                    );
                  }
                }
              }
            );
          }
        }
      );
    } else {
      await message.reply(
        "Inputan salah! Mohon perhatikan inputan anda! Silahkan ketikan command dari awal untuk memulai"
      );
    }
  }
});

//Proses Dimana klient disconnect dari Whatsapp-web
client.on("disconnected", (reason) => {
  console.log("disconnect Whatsapp-bot", reason);
});

client.initialize();
