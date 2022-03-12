import express from 'express';
const router = express.Router();

let streamers = [{
        streamerName: 'Maxime0',
        streamerProfileImage: 'https://www.motorsinside.com/images/photo/article/f12022/ferrari-f1-75_jpg_sponsor_00001-sanslogo.jpg',
        isPartner: false,
        id: 0,
    },
    {
        streamerName: 'Maxime1',
        streamerProfileImage: 'https://www.monaco-tribune.com/wp-content/uploads/2022/02/scuderia-ferrari.jpeg',
        isPartner: false,
        id: 1,
    },
    {
        streamerName: 'Maxime2',
        streamerProfileImage: 'https://static.lexpress.fr/medias_11761/w_1000,h_563,c_fill,g_north/v1519313107/la-sf71-h-presentee-par-l-ecurie-ferrari-le-22-fevrier-2018_6021998.jpg',
        isPartner: false,
        id: 2,
    },
];
router.get('/', function (req, res) {
    res.send(streamers);
})
export default router;