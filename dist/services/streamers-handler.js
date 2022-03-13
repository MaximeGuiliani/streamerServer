"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _streamersRepository = _interopRequireDefault(require("./streamers-repository"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function getStreamers(req, res) {
  await _streamersRepository.default.store("");

  try {
    const result = await _streamersRepository.default.getAll();
    const finalArray = [];

    for (let obj of result.hits.hits) {
      finalArray.push(obj._source);
    }

    res.send(finalArray);
  } catch (e) {
    res.status(400).end();
  }
}

async function create(req, res) {
  res.set('Content-Type', 'application/json');

  try {
    //le boolean a l'air de marcher
    const streamerBool = await streamerExist(req.body.streamerName);

    if (streamerBool) {
      res.send({});
    } else {
      //req.body marche
      await _streamersRepository.default.store(req.body);
      res.send(streamerName = 'ok');
    }
  } catch (e) {
    res.status(400).end();
  }
} //ne marche pas


async function streamerExist(streamerName) {
  try {
    console.log("nom du streamer donné" + streamerName);
    const result = await _streamersRepository.default.getStreamer(streamerName);
    return result ? true : false;
  } catch (e) {
    console.log('error getting streamer', e);
    return false;
  }
}

async function streamerDelete(req, res) {
  try {
    console.log(req.params.id);
    const streamerBool = await streamerExist(req.params.id);

    if (!streamerBool) {
      res.status(404).end();
    } else {
      const result = await _streamersRepository.default.remove(req.params.id);
      res.send(result);
    }
  } catch (e) {
    res.status(error.status || 400).end();
  }
}

var _default = {
  getStreamers,
  create,
  streamerExist,
  streamerDelete
};
exports.default = _default;