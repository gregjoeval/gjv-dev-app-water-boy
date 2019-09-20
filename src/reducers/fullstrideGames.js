import * as R from 'ramda';
import {
    FULLSTRIDE_GAMES__SET,
    FULLSTRIDE_GAMES__RESET,
    FULLSTRIDE_GAMES__UPDATE,
    FULLSTRIDE_GAMES__FETCH__REQUEST,
    FULLSTRIDE_GAMES__FETCH__SUCCESS,
    FULLSTRIDE_GAMES__FETCH__FAIL
} from '../constants/actionTypes';
import Action from '../models/action';
import type {IAction} from '../models/action';
import DataSourceStore from '../models/data-source-store';
import type {IDataSourceStore} from '../models/data-source-store';

const initialState = DataSourceStore.create({
    loading: false,
    data: {},
    error: null
});

const fullstrideGames = (state: IDataSourceStore = initialState, action: IAction = Action.create()) => {
    const stateCopy = R.clone(state);
    switch (action.type) {
        case FULLSTRIDE_GAMES__SET:
            return DataSourceStore.create({loading: false, error: null, data: action.payload});
        case FULLSTRIDE_GAMES__RESET:
            return DataSourceStore.create(initialState);
        case FULLSTRIDE_GAMES__UPDATE:
            const data = R.mergeDeepRight(stateCopy, action.payload);
            return DataSourceStore.create({loading: false, error: null, data});
        case FULLSTRIDE_GAMES__FETCH__REQUEST:
            return DataSourceStore.create({loading: true, error: null, data: stateCopy.data});
        case FULLSTRIDE_GAMES__FETCH__SUCCESS:
            return DataSourceStore.create({loading: false, error: null, data: action.payload});
        case FULLSTRIDE_GAMES__FETCH__FAIL:
            return DataSourceStore.create({loading: false, error: action.payload, data: stateCopy.data});
        default:
            return stateCopy;
    }
};

export default fullstrideGames;