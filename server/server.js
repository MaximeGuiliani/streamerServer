import express from 'express';
import router from './services/streamers';

const app = express();
app.use(express.json());
app.use(express.static('./app/app-project/'))
app.get('/', function (req, res) {
    res.sendFile('index.html');
});
app.use('/followed', router);

app.listen(8080);