import elasticsearch from '@elastic/elasticsearch';
const esClient = new elasticsearch.Client({
    node: 'http://localhost:9200',
    log: 'info',
    apiVersion: '7.5',
    maxSockets: 20,
});
export default esClient;