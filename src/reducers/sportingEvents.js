import makeDictionaryReducer from '../libs/makeDictionaryReducer';

const [_reducer, _actionTypes] = makeDictionaryReducer('SPORTING_EVENTS');

export {_reducer as reducer, _actionTypes as actionTypes};
