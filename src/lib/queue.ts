import PQueue from 'p-queue';

// Unified singleton queue for all API orchestration
export const apiQueue = new PQueue({
  concurrency: 2,
  interval: 1000,
  intervalCap: 5
});