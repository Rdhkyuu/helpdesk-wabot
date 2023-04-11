// Package yang di gunakan
const { Client, MessageMedia, LocalAuth } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");
const mysql = require("mysql2");
const axios = require("axios");
const fs = require("fs");
const request = require("request");
const puppeteer = require("puppeteer-core");
const rp = require("request-promise");

const SESSION_FILE_PATH = "./session.json";
let sessionData;
if (fs.existsSync(SESSION_FILE_PATH)) {
  sessionData = require(SESSION_FILE_PATH);
}

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
const client = new Client({
  puppeteer: {
    executablePath:
      "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    headless: true,
  },
  session: sessionData,
  authStrategy: new LocalAuth({
    clientId: "client-one",
  }),
  ffmpegPath: "C:\\ffmpeg\\bin\\ffmpeg.exe",
});

//Proses Masuk whatsappjs menggunakan qrcode yang akan di kirim oleh whatsapp-web.js
client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

async function customPrompt(chat, prompt) {
  return new Promise((resolve) => {
    const filter = (m) => {
      if (m.fromMe) return false;
      if (m.chatId !== chat.id._serialized) return false; // Check if message is from the correct chat
      if (m.body.toLowerCase() !== prompt.toLowerCase()) return false;
      return true;
    };

    const listener = client.on("message", (msg) => {
      if (filter(msg)) {
        resolve(msg);
        listener.removeAllListeners(); // Remove all message listeners
      }
    });

    setTimeout(() => {
      listener.removeAllListeners(); // Remove all message listeners
      resolve(false);
    }, 5000);
  });
}

//Proses Dimana Whatsapp-web.js Siap digunakan
client.on("ready", async () => {
  console.log("Udah Siap!");
  const nomorTuju = [
    "6282122783902@c.us",
    // "120363039787330454@g.us",
    // "6285750917162@c.us",
    // "6283162365253@c.us",
    // "62895700510221@c.us",
    // "6283863458459@c.us",
    // "6289691686721@c.us",
    // "6281549140599@c.us",
    // "62882019288141@c.us",
  ];
  const lokasiVideo = "D:\\xampp\\htdocs\\HelpDesk_waBot\\Media\\awokawok.mp4";
  const dataVideo = fs.readFileSync(lokasiVideo);
  const base64ImageData = dataVideo.toString("base64");
  const kirimMedia = new MessageMedia("video/mp4", base64ImageData);
  for (let i = 0; i < nomorTuju.length; i++) {
    try {
      await client.sendMessage(
        nomorTuju[i],
        `IZIN ONN BANG!!
Silahkan ketikkan /help untuk mengetahui command apa saja yang ada!
        `
      );
    } catch (err) {
      console.error("ERROR MESSAGE: ", err);
    }

    try {
      await client.sendMessage(nomorTuju[i], kirimMedia, {
        sendMediaAsSticker: true,
        stickerAuthor: "XkyuuX",
        stickerName: `ISRAEL BABI`,
      });
      console.log("GAMBAR KEKIRIM!");
    } catch (err) {
      console.error("ERROR GAMBAR: ", err);
    }
  }
});
const conversationState = {};
client.on("message", async (message) => {
  const chat = await message.getChat();
  // Function untuk generate id random
  function tiketRandom(prefix) {
    let id = prefix.concat(
      Math.random().toString(36).substring(2, 10).toUpperCase()
    );
    return id;
  }
  let prefixAwal = "TIX-";
  const templateinput = /^INPUT+#[\w!?+\-.,\s]+#[\w!?+\-.,\s]+#[\w!?+\-.,\s]+$/;
  let userData = {};
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

  // Nomor Tester
  const nomorTuju = [
    "6282122783902@c.us",
    // "120363039787330454@g.us",
    // "6285750917162@c.us",
    // "6283162365253@c.us",
    // "62895700510221@c.us",
    // "6283863458459@c.us",
    // "6289691686721@c.us",
    // "6281549140599@c.us",
    // "62882019288141@c.us",
  ];
  // Mengambil Folder media
  const lokasiMedia = "D:\\xampp\\htdocs\\HelpDesk_waBot\\Media\\";
  const gambarKita = fs
    .readFileSync(lokasiMedia + "4cb.jpg")
    .toString("base64");
  const kirimKita = new MessageMedia("image/jpg", gambarKita);

  // Mengambil Enum statusLaporan
  const statusLaporan = ["Pending", "In progress", "Done"][0];
  const nomorGuwe = "+6282122783902".substring(1) + "@c.us";

  // Mentions
  const phoneNumber = client.info.wid.user;
  if (message.mentionedIds.includes(`${phoneNumber}@c.us`)) {
    console.log(`You were mentioned in a message by ${message.from}`);

    const chat = await message.getChat();
    await chat.sendMessage("KENAPA BANG??");
    await chat.sendMessage(kirimKita, {
      sendMediaAsSticker: true,
      stickerAuthor: "XkyuuX",
      stickerName: "jangan tag anjing",
    });
  }

  // Command
  // Mengecek apakah pesannya dari client sendiri dan bukan dari grup
  // Untuk Tugas Magang
  if (!message.fromMe && !chat.isGroup) {
    if (message.body.toLowerCase() === "/help") {
      await message.reply(`Command yang tersedia saat ini: 
*_Command Tugas(Tidak bisa dilakukan di group chat!)_*
*/input*
*/close*
*/cek*
*/rate*

*_Command Random (Cuma bisa dilakukan di group khusus saat ini!)_*
*@everyone*
*/profile*`);
    } else if (templateinput.test(message.body)) {
      console.log("INPUT MASUK!");
      const isiText = message.body.split("#");
      const isiTiket = tiketRandom(prefixAwal);
      const nama = isiText[1];
      const SKPD = isiText[2];
      const aduan = isiText[3];
      const tanggalHariIni =
        hariIndo[indo.getDay()] +
        ", " +
        hariIni.toLocaleDateString("en-GB", options);
      const telepon = message.from;

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
        console.log(
          results.affectedRows + " data ditambahkan pada table aduan!"
        );
      });
      await message.reply(
        "Berhasil dimasukkan! Silahkan tunggu beberapa hari sampai pegawai kami mengkonfirmasi anda kembali!"
      );
      await message.reply(
        `Kode tiketmu adalah ' *${isiTiket}* ', kamu bisa mengecek status tiketmu dengan /cek`
      );
    }
    //       await client.sendMessage(message.from, "Nama#SKPD#Aduan");
    //       await message.reply(`Silahkan masukkan data seperti apa yang ada diatas.
    // contoh: Riku#1234567#Ini cuma contoh!`);
    //       const template = /^[\w!?\s]+#[0-9]+#[\w!?+\-.,\s]+$/;
    // const konfirmasi = await new Promise((resolve) => {
    //   client.once("message", async (reply) => {
    //     if (reply.from === message.from && !reply.fromMe) {
    //       resolve(reply.body);
    //     }
    //   });
    // });
    //       console.log(konfirmasi);
    //       console.log(template.test(konfirmasi));

    //       if (template.test(konfirmasi)) {
    //         console.log(`${message.from} mengakses /input!`);
    //         let isiText = konfirmasi.split("#");
    //         let isiTiket = tiketRandom(prefixAwal);
    //         let nama = isiText[0];
    //         let SKPD = isiText[1];
    //         let aduan = isiText[2];
    //         let telepon = message.from;
    // const tanggalHariIni =
    //   hariIndo[indo.getDay()] +
    //   ", " +
    //   hariIni.toLocaleDateString("en-GB", options);
    //   const querySQL =
    //     "INSERT INTO aduan (kode_tiket, tanggal, nama, skpd, noTelpon, aduan, statusLaporan) VALUES (?, ?, ?, ?, ?, ?, ?)";
    //   const data = [
    //     isiTiket,
    //     tanggalHariIni,
    //     nama,
    //     SKPD,
    //     telepon,
    //     aduan,
    //     statusLaporan,
    //   ];

    //   connection.query(querySQL, data, (error, results) => {
    //     if (error) throw error;
    //     console.log(
    //       results.affectedRows + " data ditambahkan pada table aduan!"
    //     );
    //   });
    //   // connection.query("SELECT * FROM aduan ORDER BY tanggal DESC LIMIT 1;", (error,results) => {
    //   //   if (error) throw error;
    //   //   console.log(results);
    //   // })
    //   await message.reply(
    //     "Berhasil dimasukkan! Silahkan tunggu beberapa hari sampai pegawai kami mengkonfirmasi anda kembali!"
    //   );
    //   await message.reply(
    //     `Kode tiketmu adalah ' *${isiTiket}* ', kamu bisa mengecek status tiketmu dengan /cek`
    //   );
    // } else {
    //   await message.reply(
    //     "Maaf ada yang salah! Pastikan diisi sesuai dengan template. Silahkan ulang lagi dengan mengetik commandnya kembali"
    //   );
    // }
    else if (message.body.toLowerCase() === "/close") {
      await client.sendMessage(message.from, "kode_tiket#close");
      await client.sendMessage(
        message.from,
        `Silahkan masukan seperti diatas
contoh: TIX-???????#close`
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
        console.log(`${message.from} mengakses /close`);
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
    } else if (message.body.toLowerCase() === "/cek") {
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
            console.log(`${message.from} mengakses /cek!`);
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
    } else if (message.body.toLowerCase() === "/rate") {
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
              await message.reply(
                "Kamu Mengakses Tiket yang bukan punya kamu!"
              );
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
    } else if (
      message.body.toLowerCase() === "/off" &&
      message.from === nomorGuwe
    ) {
      const lokasiVideo = "D:\\xampp\\htdocs\\HelpDesk_waBot\\Media\\hayuk.mp4";
      const dataVideo = fs.readFileSync(lokasiVideo);
      const base64ImageData = dataVideo.toString("base64");
      const kirimMedia = new MessageMedia("video/mp4", base64ImageData);

      let senderName = "Tidak diketahui!";
      const contact = await message.getContact();
      if (contact) {
        senderName = contact.name || contact.pushname || senderName;
      }

      for (let i = 0; i < nomorTuju.length; i++) {
        await client.sendMessage(
          nomorTuju[i],
          `IZIN OFF BANG!!
        (Dishutdown oleh _${senderName}_)`
        );
        await client
          .sendMessage(nomorTuju[i], kirimMedia, {
            sendMediaAsSticker: true,
            stickerAuthor: "XkyuuX",
            stickerName: "TONENENET",
            // caption: "Izin off cuy!!",
          })
          .then(() => {
            console.log("GAMBAR SEBELUM OFF KEKIRIM!");
          })
          .catch((err) => {
            console.error("ERROR GAMBAR: ", err);
          });
      }

      setTimeout(() => {
        client.destroy();
      }, 10000);
    } else if (
      message.body.toLowerCase() === "/off" &&
      !message.from != nomorGuwe
    ) {
      await message.reply(`Command ini hanya bisa digunakan oleh developer!
      Kejadian ini akan kami laporkan dan mengeceknya lebih lanjut!`);
      console.log(`Ada yang mencoba command /off!
      Nomornya adalah: ${message.from}`);
    } else if (
      !message.fromMe &&
      chat.isGroup &&
      message.from === "120363039787330454@g.us"
    ) {
      if (message.body.toLowerCase() === "/help") {
        await message.reply(`Command yang tersedia saat ini: 
*_Command Tugas(Tidak bisa dilakukan di group chat!)_*
*/input*
*/close*
*/cek*
*/rate*

*_Command Random(Cuman bisa dilakukan di group khusus saat ini!)_*
*@everyone*
*/profile*`);
      } else if (message.body.toLowerCase() === "@everyone") {
        let text = "";
        let mentions = [];

        for (let participant of chat.participants) {
          const contact = await client.getContactById(
            participant.id._serialized
          );

          mentions.push(contact);
          text += `@${participant.id.user} `;
        }

        await chat.sendMessage(text, { mentions });
      } else if (message.body.toLowerCase().startsWith("/profile ")) {
        try {
          const mentions = await message.getMentions();
          if (mentions.length > 0) {
            const user = mentions[0].id._serialized;
            const contact = await client.getContactById(user);
            if (contact) {
              try {
                const profilePicUrl = await contact.getProfilePicUrl();
                if (profilePicUrl) {
                  await client.sendMessage(message.from, profilePicUrl, {
                    caption: "Ini masbro!",
                    quotedMessageId: message.id._serialized,
                  });
                } else {
                  const replyMessage = `${
                    contact.name || contact.pushname || "Gaada nama"
                  } gaada profile picture`;
                  await message.reply(replyMessage);
                }
              } catch (error) {
                console.log(error);
                const replyMessage = `Ada error saat ingin mengakses kontak si ${
                  contact.name || contact.pushname || "Gaada nama"
                } `;
                await message.reply(replyMessage);
              }
            } else {
              const replyMessage = `Gaada user itu!`;
              await message.reply(replyMessage);
            }
          } else {
            const replyMessage = `Silahkan tag user yang ingin diliat!`;
            await message.reply(replyMessage);
          }
        } catch (error) {
          console.log(error);
          const replyMessage = `Ada error!`;
          await message.reply(replyMessage);
        }
      }
    }
  }
});

//Proses Dimana klient disconnect dari Whatsapp-web
client.on("disconnected", (reason) => {
  console.log("disconnect Whatsapp-bot", reason);
});

client.initialize();
