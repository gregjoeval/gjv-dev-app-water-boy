import {makeDataStoreReducer} from '../libs/makeDataStoreReducer';

const [_reducer, _actionTypes] = makeDataStoreReducer('FULLSTRIDE_GAMES');

export {_reducer as reducer, _actionTypes as actionTypes};
