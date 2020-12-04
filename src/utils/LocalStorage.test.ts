import LocalStorage from './LocalStorage';

interface IStore {
  token?: any;
  key?: string;
}

/* eslint-disable */
describe('LocalStorage', () => {
	let store: IStore = {};
	beforeEach(() => {
		store = {};
	});
	const localStorageMock = (function() {
		return {
			getItem(key: string) {
				// @ts-ignore
				return store[key] || null;
			},
			setItem(key: string , value: any) {
				console.log('LocalStorage.test.setItem  ', key, value);
				// @ts-ignore
				store[key] = value.toString();
			},
			clear() {
				store = {};
			}
		};
	})();

	Object.defineProperty(window, 'localStorage', {
		value: localStorageMock
	});

	it('should create object', () => {
		const testConstructor = new LocalStorage();
		expect(testConstructor).toBeDefined();
	});




});
/* eslint-enabled */
