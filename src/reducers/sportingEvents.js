import * as R from 'ramda';
import {
    SPORTING_EVENTS__SET,
    SPORTING_EVENTS__RESET,
    SPORTING_EVENTS__UPDATE,
    SPORTING_EVENTS__FETCH__REQUEST,
    SPORTING_EVENTS__FETCH__SUCCESS,
    SPORTING_EVENTS__FETCH__FAIL
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

const sportingEvents = (state: IDataSourceStore = initialState, action: IAction = Action.create()) => {
    const stateCopy = R.clone(state);
    switch (action.type) {
        case SPORTING_EVENTS__SET:
            return DataSourceStore.create({loading: false, error: null, data: action.payload});
        case SPORTING_EVENTS__RESET:
            return DataSourceStore.create(initialState);
        case SPORTING_EVENTS__UPDATE:
            const data = R.mergeDeepRight(stateCopy.data, action.payload);
            return DataSourceStore.create({loading: false, error: null, data});
        case SPORTING_EVENTS__FETCH__REQUEST:
            return DataSourceStore.create({loading: true, error: null, data: stateCopy.data});
        case SPORTING_EVENTS__FETCH__SUCCESS:
            return DataSourceStore.create({loading: false, error: null, data: action.payload});
        case SPORTING_EVENTS__FETCH__FAIL:
            return DataSourceStore.create({loading: false, error: action.payload, data: stateCopy.data});
        default:
            return stateCopy;
    }
};

export default sportingEvents;