import app from './src/app.js';
import { server } from './src/socket.js'
const PORT = app.get('port');

process.on('unhandledRejection', (reason, _p) => {
    console.log('Unhandled Rejection at: Promise ', reason);
});

server.listen(PORT, () => {
    console.log(`App running at http://localhost:${PORT}`);
});
