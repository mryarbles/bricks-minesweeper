export default class LocalStorage {
  public static saveData(name: string, value: string) {
    localStorage.setItem(name, value);
  }

  public static getData(name: string) {
    const value: string = localStorage.getItem(name);
    return value;
  }
}
