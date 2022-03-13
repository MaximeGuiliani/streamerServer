import streamersRepository from './streamers-repository';

async function getStreamers(req, res) {
  try {
    const result = await streamersRepository.getAll();
    const finalArray = [];
    for (let obj of result.body.hits.hits) {
      finalArray.push(obj.source);
    }
    res.send(finalArray);
  } catch (e) {
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
      await streamersRepository.store(req.body);
      res.send((streamerName = 'ok'));
    }
  } catch (e) {
    res.status(400).end();
  }
}

async function streamerExist(streamerName) {
  try {
    const result = await streamersRepository.getStreamer(streamerName);
    console.log(result);
    return result.hits.total.value > 0 ? true : false;
  } catch (e) {
    console.log('error getting streamer', e);
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
      const result = await streamersRepository.remove(req.params.id);
      res.send(result);
    }
  } catch (e) {
    res.status(error.status || 400).end();
  }
}

export default {
  getStreamers,
  create,
  streamerExist,
  streamerDelete,
};
