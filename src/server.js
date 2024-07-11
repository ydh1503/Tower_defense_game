// import net from 'net';
// import initServer from './init/index.js';
// import { config } from './config/config.js';
// import { onConnection } from './events/onConnection.js';

// // const PORT = 5555;

// const server = net.createServer(onConnection);

// initServer()
//   .then(() => {
//     server.listen(config.server.port, config.server.host, () => {
//       console.log(`Echo server listening on port ${config.server.port}`);
//       console.log(server.address());
//     });
//   })
//   .catch((e) => {
//     console.error(e);
//     process.exit(1);
//   });

import express from 'express';
import cookieParser from 'cookie-parser';
import { createServer } from 'http';
import initSocket from './init/socket.js';
import initServer from './init/index.js';
import { config } from './config/config.js';

const app = express();
const server = createServer(app);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
initSocket(server); // 소켓 추가
app.use(express.static('tower_defense_client'));

initServer()
  .then(() => {
    server.listen(config.server.port, async () => {
      console.log(`Server is running on port ${config.server.port}`);
    });
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
