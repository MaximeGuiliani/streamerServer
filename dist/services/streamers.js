"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _streamersHandler = _interopRequireDefault(require("./streamers-handler"));

var _expressAsyncHandler = _interopRequireDefault(require("express-async-handler"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express.default.Router();

let streamers = [{
  streamerName: 'Gotaga',
  isPartner: true,
  streamerProfileImage: 'https://static-cdn.jtvnw.net/jtv_user_pictures/69e324f6-fc7d-4131-89ed-227a955637cf-profile_image-300x300.png',
  descriptions: "Je m’appelle Corentin Houssein, j'ai 28 ans et je suis un ancien joueur professionnel sur les opus Call Of Duty sous le pseudonyme Gotaga. De nombreuses fois champion d'Europe et de France, je suis actuellement le joueur français le plus titré sur Consoles."
}];
/*
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

router.get('/', (0, _expressAsyncHandler.default)(_streamersHandler.default.getStreamers));
router.post('/', (0, _expressAsyncHandler.default)(_streamersHandler.default.create));
router.delete('/:id', (0, _expressAsyncHandler.default)(_streamersHandler.default.streamerDelete));
var _default = router;
exports.default = _default;