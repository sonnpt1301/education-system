import app from './src/app.js';
const PORT = app.get('port');

process.on('unhandledRejection', (reason, _p) => {
    console.log('Unhandled Rejection at: Promise ', reason);
});

app.listen(PORT, () => {
    console.log(`App running at http://localhost:${PORT}`);
});
