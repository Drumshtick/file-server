const net = require('net');
const fs = require('fs')

const server = net.createServer();

server.listen(3000, () => {
  console.log('Server listening on port 3000!');
});

server.on('connection', (client) => {
  client.setEncoding('utf8'); // interpret data as text
  console.log('New client connected!');
  
  client.on('data', (data) => {
    console.log(data);
    let PATH = "./files/" + data;
    fs.readFile(PATH, 'utf8' , (err, buffer) => {
      if (err) {
        console.log("HERE");
        console.error(err)
        return
      }
      console.log(`Sending ${PATH}`);
      client.write(buffer);
    })
  });
});