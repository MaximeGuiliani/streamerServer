import express from 'express';

import streamersHandler from './streamers-handler';
import asyncHandler from 'express-async-handler';

const router = express.Router();

let streamers = [{
    streamerName: 'Maxime',
    isPartner: false,
    streamerProfileImage: 'https://www.motorsinside.com/images/photo/article/f12022/ferrari-f1-75_jpg_sponsor_00001-sanslogo.jpg',
    streamerDescription: '0',
}, ];
router.get('/', function (req, res) {
    res.send(streamers);
});

router.post('/', function (req, res) {
    const userExist = streamers.find(
        (streamer) => streamer.streamerName === req.body.streamerName
    );
    if (userExist) {
        res.send({});
    } else {
        streamers.push(req.body);
        res.send({
            streamerName: 'ok',
        });
    }
});
router.get('/', streamersHandler.getStreamers);

router.post('/', streamersHandler.create);

router.delete('/:id', asyncHandler(streamersHandler.streamerDelete));

export default router;