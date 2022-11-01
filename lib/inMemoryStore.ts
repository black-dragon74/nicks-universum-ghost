export default class InMemoryStore {
  private static store: { [key: string]: any } = {}

  public static get(key: string): any {
    return this.store[key]
  }

  public static set(key: string, value: any) {
    this.store[key] = value
  }
}
