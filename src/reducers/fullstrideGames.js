import {withDataSource} from '../libs/dataSourceHigherOrderReducer';

const [_reducer, _actionTypes] = withDataSource('FULLSTRIDE_GAMES', {});

export {_reducer as reducer, _actionTypes as actionTypes};