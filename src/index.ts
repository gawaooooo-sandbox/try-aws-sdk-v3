import { S3Client, ListBucketsCommand } from '@aws-sdk/client-s3';

const client = new S3Client({ region: 'ap-northeast-1' });
console.log(client);

async function configuration() {
    try {
        console.group('configuration');
        console.log(await client.config.credentials());
        console.log(client.config.endpoint);
        console.groupEnd();
    } catch (error) {
        console.error(error);
    }
}

async function listBuckets() {
    const command = new ListBucketsCommand({});
    try {
        const response = await client.send(command);
        // for(const bucket of response.Buckets || []) {
        //     console.log(bucket);
        // }

        console.group('list buckets');
        console.table(response.Buckets || []);
        console.log(response.Owner);
        console.groupEnd();
    } catch (error) {
        console.error(error);
    }
}

(async () => {
    await configuration();
    await listBuckets();
})();
