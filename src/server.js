import express from 'express';
import cookieParser from 'cookie-parser';
import { createServer } from 'http';
import initSocket from './init/socket.js';
import { config } from './config/config.js';
import accountsRouter from './routers/accounts.router.js';

const app = express();
const server = createServer(app);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('tower_defense_client_online'));
app.use('/', accountsRouter);

// 소켓 추가
initSocket(server)
  .then(() => {
    server.listen(config.server.port, async () => {
      console.log(`Server is running on port ${config.server.port}`);
    });
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });

