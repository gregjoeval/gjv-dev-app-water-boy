import makeDictionaryReducer from '../libs/makeDictionaryReducer';
import undoableDictionaryEnhancer from '../libs/undoableDictionaryEnhancer';

const [_reducer, _actionTypes] = makeDictionaryReducer('SPORTING_EVENTS', {
    enhancers: [undoableDictionaryEnhancer(3)]
});

export {_reducer as reducer, _actionTypes as actionTypes};
