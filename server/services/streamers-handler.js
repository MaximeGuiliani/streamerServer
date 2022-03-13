import streamersRepository from './streamers-repository';

async function getStreamers(req, res) {
    try {
        const result = await streamersRepository.getAll();
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
            await streamersRepository.store(req.body);

            res.send(
                streamerName = 'ok'
            );
        }
    } catch (e) {
        res.status(400).end();
    }
}
//ne marche pas
async function streamerExist(streamerName) {
    try {
        console.log("nom du streamer donné" + streamerName);
        const result = await streamersRepository.getStreamer(streamerName);
        return result ? true : false;
    } catch (e) {
        console.log('error getting streamer', e);
        return false;
    }
}

async function streamerDelete(req, res) {
    try {
        console.log(req.params.id)
        const streamerBool = await streamerExist(req.params.id);
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