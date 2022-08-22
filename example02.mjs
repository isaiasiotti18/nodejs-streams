// 1
//import http from 'http'
//import { readFileSync } from 'fs'
// node -e "process.stdout.write(crypto.randomBytes(1e9))" > big.file
// http.createServer((req, res) => {
//   const file = readFileSync('./big.file') //.toString()
//   res.write(file)
//   res.end()
// }).listen(3000, () => console.log('running at 3000'))

// 2
//import net from 'net'
// node -e "process.stdin.pipe(require('net').connect(1338))"
net.createServer(socket => socket.pipe(process.stdout)).listen(1338)
 