"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _streamersRepository = _interopRequireDefault(require("./streamers-repository"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function getStreamers(req, res) {
  try {
    const result = await _streamersRepository.default.getAll();
    const finalArray = [];

    for (let obj of result.body.hits.hits) {
      finalArray.push(obj.source);
    }

    res.send(finalArray);
  } catch (e) {
    console.log('error get streamer', e);
    res.status(400).end();
  }
}

async function create(req, res) {
  res.set('Content-Type', 'application/json');

  try {
    const streamerBool = await streamerExist(req.body.streamerName);

    if (streamerBool) {
      res.send({});
    } else {
      await _streamersRepository.default.store(req.body);
      res.send(streamerName = 'ok');
    }
  } catch (e) {
    console.log('error create streamer', e);
    res.status(400).end();
  }
}

async function streamerExist(streamerName) {
  try {
    const result = await _streamersRepository.default.getStreamer(streamerName);
    console.log(result);
    return result.hits.total.value > 0 ? true : false;
  } catch (e) {
    console.log('error getting streamer if exist', e);
    return false;
  }
}

async function streamerDelete(req, res) {
  try {
    const streamerBool = await streamerExist(req.params.id);
    console.log(streamerBool);

    if (!streamerBool) {
      res.status(404).end();
    } else {
      const result = await _streamersRepository.default.remove(req.params.id);
      res.send(result);
    }
  } catch (e) {
    console.log('error delete streamer', e);
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