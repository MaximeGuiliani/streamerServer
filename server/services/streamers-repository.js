import {
    response
} from 'express';
import esClient from './es-client';

const index = 'local_streamers';

const handleElasticsearchError = (error) => {
    if (error.status === 404) {
        throw new Error('Streamer Not Found', 404);
    }
    throw new Error(error.msg, error.status || 500);
};


const getAll = () => esClient.search({
    index,
}).then(response => response).catch((error) => {
    handleElasticsearchError(error);
});


const store = streamer => esClient.index({
    index,
    refresh: 'true',
    body: streamer,
    //  TODO : error response.status
}).then(response => response.status).catch((error) => {
    handleElasticsearchError(error);
});


const getStreamer = streamerName => esClient.search({
        index,
        body: {
            "query": {
                "match": {
                    "firstName": {
                        "query": firstName
                    }
                }
            }
        },
    }).then(response => {
        response;
    })
    .catch((error) => {
        handleElasticsearchError(error);
    });

const remove = firstName => esClient.deleteByQuery({
    index,
    refresh: 'true',
    body: {
        "query": {
            "match": {
                "firstName": {
                    "query": firstName
                }
            }
        }
    },
}).then(response => response).catch((error) => {
    handleElasticsearchError(error);
});


export default {
    getStreamer,
    store,
    getAll,
    remove,
};