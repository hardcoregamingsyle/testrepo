import { Mutex } from 'async-mutex';

export class AtomicCounter {
  private count = 0;
  private mutex = new Mutex();

  async increment(): Promise<number> {
    return await this.mutex.runExclusive(() => {
      this.count++;
      return this.count;
    });
  }

  get(): number {
    return this.count;
  }
}