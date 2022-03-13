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
  streamerName: 'Maxime',
  isPartner: false,
  streamerProfileImage: 'https://www.motorsinside.com/images/photo/article/f12022/ferrari-f1-75_jpg_sponsor_00001-sanslogo.jpg',
  streamerDescription: '0'
}];
router.get('/', function (req, res) {
  res.send(streamers);
});
router.post('/', function (req, res) {
  const userExist = streamers.find(streamer => streamer.streamerName === req.body.streamerName);

  if (userExist) {
    res.send({});
  } else {
    streamers.push(req.body);
    res.send({
      streamerName: 'ok'
    });
  }
});
router.get('/', _streamersHandler.default.getStreamers);
router.post('/', _streamersHandler.default.create);
router.delete('/:id', (0, _expressAsyncHandler.default)(_streamersHandler.default.streamerDelete));
var _default = router;
exports.default = _default;