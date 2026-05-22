import PQueue from 'p-queue';

export const pQueue = new PQueue({
  interval: 1000,
  intervalCap: 5,
  concurrency: 2
});