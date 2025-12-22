import { Worker } from 'bullmq';

const redisPassword = 'data_store_password';
const worker = new Worker(
  'bullmq-jobs',
  async job => {
    console.log(job.data);
  },
  {
    connection: {
        password: redisPassword,
    },
  }
);

worker.on('completed', job => {
  console.log(`${job.id} has completed!`);
});

worker.on('failed', (job, err) => {
  console.log(`${job.id} has failed with ${err.message}`);
});