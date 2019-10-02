import {useDataSource} from '../libs/useDataSource';

const [_reducer, _actionTypes] = useDataSource('FULLSTRIDE_GAMES');

export {_reducer as reducer, _actionTypes as actionTypes};
