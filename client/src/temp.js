const dayjs = require('dayjs');


const current = dayjs()
const another = dayjs()
const formatChange = current.format('YYYY-MM-DDTHH:mm')
const anotherChange = another.format('YYYY-MM-DDTHH:mm')

// const another = current.add(1,'day').format('YYYY-MM-DDTHH:mm')
// console.log(formatChange);
// console.log(anotherChange);
// console.log(typeof(anotherChange));
if(formatChange==anotherChange){
    // console.log("THis is fun");
}
else{
    // console.log("nnot so fun");
}
const dataToSend = {
  date: '2024-06-24',
  time: '15:30',
};

const formattedDateTime = dayjs(dataToSend).format("YYYY-MM-DDTHH:mm:ss");

// Send formattedDateTime using your preferred method (e.g., // console.log, API call)
// console.log(formattedDateTime); // Output: 2024-06-24T15:30:00

eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NzQ4NzE3NDQ0ZTdiNTE1MDkxNDE4YyIsIm15Um9sZSI6InN0dWRlbnQiLCJpYXQiOjE3MTkxNTMxMDgsImV4cCI6MTcxOTIzOTUwOH0.Kpl8mh-jvP3oV42KZ2bW1AI6utiPKgNOQgggsh5CWBY
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NzdmNDYyOTk1NTAxOGJiNDZlOWU5NiIsIm15Um9sZSI6InRlYWNoZXIiLCJpYXQiOjE3MTkxNTMxNTUsImV4cCI6MTcxOTIzOTU1NX0.QRZMezWXpn7WzoI1w25Ew5ukyUI5uDRtMfKB6-D2XHg
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NzdmNDYyOTk1NTAxOGJiNDZlOWU5NiIsIm15Um9sZSI6InRlYWNoZXIiLCJpYXQiOjE3MTkxNTMwNDgsImV4cCI6MTcxOTIzOTQ0OH0.QX32CWLZp9VNzMCduTwvbMxHfeYgIA0dO5IdLFJ01VE