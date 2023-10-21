import { app } from './app'

import { createServer } from 'http'

const server = createServer(app)

server.listen(4000)
server.on('listening', onListening)

function onListening() {
  const addr = server.address()
  if (typeof addr !== 'string' && typeof addr !== null)
    console.log(
      'Listening on ' + 'http://localhost:' + addr?.port,
    )
}
