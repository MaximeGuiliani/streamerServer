import express from 'express';

import streamersHandler from './streamers-handler';
import asyncHandler from 'express-async-handler';

const router = express.Router();

let streamers = [];
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

router.post('/:id', function (req, res) {
    const userExist = streamers.find(
        (streamer) => streamer.streamerName === req.body.streamerName
    );
    if (!userExist) {
        res.send({});
    } else {
        streamers.delete(req.body);

    }
});



router.get('/', streamersHandler.getStreamers);

router.post('/', streamersHandler.create);

router.delete('/:id', asyncHandler(streamersHandler.streamerDelete));

export default router;