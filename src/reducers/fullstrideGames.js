import {makeReducer} from '../libs/makeReducer';
import DataSourceStore from '../models/data-source-store';

const [reducer, actionTypes] = makeReducer('FULLSTRIDE_GAMES', DataSourceStore.create);

export {reducer, actionTypes};