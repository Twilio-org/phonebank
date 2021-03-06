import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const middlewares = [thunk];
export const mockStore = configureMockStore(middlewares);

const localStorageMock = (() => {
  let localstore = {};
  return {
    getItem(key) {
      return localstore[key];
    },
    setItem(key, value) {
      localstore[key] = value.toString();
    },
    clear() {
      localstore = {};
    },
    removeItem(key) {
      delete localstore[key];
    }
  };
})();

export function exposeLocalStorageMock() {
  global.localStorage = localStorageMock;
}

export function checkObjectProps(expectedProps, obj) {
  return expectedProps.reduce((accum, curr) => {
    const propertyExists = Object.prototype.hasOwnProperty.call(obj, curr);
    return accum && propertyExists;
  }, true);
}

export function isObjectEmpty(targetObj) {
  if (!targetObj) {
    return 'this function must recieve an object or array';
  }
  if (Array.isArray(targetObj)) {
    return !targetObj.length;
  }
  return !Object.keys(targetObj).length;
}

