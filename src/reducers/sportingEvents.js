import {makeDataStoreReducer} from '../libs/makeDataStoreReducer';

const [_reducer, _actionTypes] = makeDataStoreReducer('SPORTING_EVENTS');

export {_reducer as reducer, _actionTypes as actionTypes};
