const net = require('net');
const fs = require('fs');
let args = process.argv;
if(args.length > 3) {
  console.log("Usage: Only request one file at a time");
  process.exit();
}
const file = args[2];
const PATH = './recv/' + file;
const connectAndSend = (file) => {
  const conn = net.createConnection({ 
    host: 'localhost', // change to IP address of computer or ngrok host if tunneling
    port: 3000 // or change to the ngrok port if tunneling
  });
  
  conn.setEncoding('utf8'); // interpret data as text
  
  conn.on('data', (data) => {
    if(data === "No such file or directory.") {
      console.log(data);
      process.exit();
    }
    fs.writeFile(PATH, data, err => {
      if (err) {
        console.error(err)
        return
      }
      console.log(`Successfully wrote ${file} to ${PATH} in ${data.length} bytes`);
      conn.end()
    })
  });
  
  conn.on('connect', () => {
    conn.write(file);
  });
};

connectAndSend(file);
