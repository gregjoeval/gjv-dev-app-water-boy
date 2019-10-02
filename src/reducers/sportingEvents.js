import {useDataSource} from '../libs/useDataSource';

const [_reducer, _actionTypes] = useDataSource('SPORTING_EVENTS');

export {_reducer as reducer, _actionTypes as actionTypes};
