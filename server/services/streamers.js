import express from 'express';

import streamersHandler from './streamers-handler';
import asyncHandler from 'express-async-handler';

const router = express.Router();

router.get('/', asyncHandler(streamersHandler.getStreamers));

router.post('/', asyncHandler(streamersHandler.create));

router.delete('/:id', asyncHandler(streamersHandler.streamerDelete));

export default router;



/*
let streamers = [{
    streamerName: 'Gotaga',
    isPartner: true,
    streamerProfileImage: 'https://static-cdn.jtvnw.net/jtv_user_pictures/69e324f6-fc7d-4131-89ed-227a955637cf-profile_image-300x300.png',
    descriptions: "Je m’appelle Corentin Houssein, j'ai 28 ans et je suis un ancien joueur professionnel sur les opus Call Of Duty sous le pseudonyme Gotaga. De nombreuses fois champion d'Europe et de France, je suis actuellement le joueur français le plus titré sur Consoles."
}];

router.get('/', function (req, res) {
    res.send(streamers);
})

router.post('/', function (req, res) {
    const userExist = streamers.find((streamer) => streamer.streamerName === req.body.streamerName);
    if (userExist) {
        res.send({});

    } else {
        // Le push marche
        streamers.push(req.body);

        res.send({
            streamerName: 'ok'
        });
    }
});
*/