import makeDictionaryReducer from '../libs/makeDictionaryReducer';

const [_reducer, _actionTypes] = makeDictionaryReducer('FULLSTRIDE_GAMES');

export {_reducer as reducer, _actionTypes as actionTypes};
