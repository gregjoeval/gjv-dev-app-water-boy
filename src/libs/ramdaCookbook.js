import * as R from 'ramda';

export const objFromListWith = R.curry((fn, list) => R.chain(R.zipObj, R.map(fn))(list));
export const createDictionaryFromList = (list, idProp = 'id') => objFromListWith(
    R.prop(idProp),
    list
);
