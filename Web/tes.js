// function generateId(prefix) {
//     let id = prefix.concat(Math.random().toString(36).substring(2, 10).toUpperCase());
//     return id;
//   }

// let prefix = "TIX-";
// let newId = generateId(prefix);
// console.log(newId);  


const options = {
  year: 'numeric',
  month: 'long',
  day: '2-digit'
 };
const indo = new Date();
const hariIndo = [];
hariIndo[0] = "Minggu";
hariIndo[1] = "Senin"
hariIndo[2] = "Selasa"
hariIndo[3] = "Rabu"
hariIndo[4] = "Kamis"
hariIndo[5] = "Jumat"
hariIndo[6] = "Sabtu"

 console.log(Date());
const today  = new Date();
const todayDate = hariIndo[indo.getDay()] + " " + today.toLocaleDateString('en-GB', options);
console.log(todayDate);

// const input = parseInt(prompt("Tes"));
// if (!input== 0) {
//   alert("bukan nol")
// } else
// {
//   alert("nol")
// }


const input = prompt("Kode_tiket#1-5#tanggapan")
const template = /^[\w\s\-!?]+#[1-5]+#\+[\w\s!?\+\-]+$/;
alert(input);
alert(template.test(input))

// const input = prompt("Ngetes kode_tiket#close");
// const template = /^[\w!?\+\-]+#close$/
// alert(template.test(input))

// const input = prompt("Please input Name#Age#Gender#Job");
// const template = /^[\w!?]+#[0-9]+#[\w!?]+#[\w!?]+$/;

// console.log(typeof(template));

// if (template.test(input)) {
//     const [name, age, gender, job] = input.split("#");
//     console.log("Name:", name);
//     console.log("Age:", age);
//     console.log("Gender:", gender);
//     console.log("Job:", job);
// } else {
//     console.log("Please fill like the template one");
// }