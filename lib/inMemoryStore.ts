// Utility class to store data in memory using key-value pairs
// Uses a Map to store the data
// Based on the singleton pattern
export default class InMemoryStore {
  private constructor() {}
  private store: { [key: string]: any } = {}

  public static shared = new InMemoryStore()

  public get(key: string): any {
    return this.store.hasOwnProperty(key) ? this.store[key] : null
  }

  public set(key: string, value: any) {
    this.store[key] = value
  }
}
