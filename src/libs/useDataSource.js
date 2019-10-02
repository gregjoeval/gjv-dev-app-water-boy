import DataSourceStore from '../models/data-source-store';
import * as R from 'ramda';
import {makeReducer} from './makeReducer';

const defaultVerbs = {
    DELETE: 'DELETE',
    FAIL: 'FAIL',
    RESET: 'RESET',
    REQUEST: 'REQUEST',
    SET: 'SET',
    UPDATE: 'UPDATE'
};

type ActionTypes = 'DELETE' | 'FAIL' | 'REQUEST' | 'SET' | 'UPDATE';
type Factory<TInput, T> = (args: TInput) => T
type ActionDictionary<TActionTypes, T> = {[TActionTypes]: (any) => T}

/**
 * create a DataSource store
 * @param {string} name -
 * @param {any} initialState -
 * @param {Factory} factoryFunction -
 * @param {Object} actionsDictionary -
 * @returns {[Reducer<T>, Object]} -
 */
export const useDataSource = <TActionTypes: ActionTypes, TInput: DataSourceStore, T: DataSourceStore> (
    name: string,
    initialState: TInput,
    factoryFunction: Factory<TInput, T> = DataSourceStore.create,
    actionsDictionary: ActionDictionary<TActionTypes, T> = {}
) => {
    const defaultFactoryFunction = factoryFunction || DataSourceStore.create;
    const defaultInitialDataState = defaultFactoryFunction(initialState);

    const deleteAction = (state, action) => {
        const data = R.omit(action.payload, state.data);
        return defaultFactoryFunction({...defaultInitialDataState, data: data});
    };
    const failAction = (state, action) => defaultFactoryFunction({...defaultInitialDataState, error: action.payload, data: state.data});
    const resetAction = () => defaultInitialDataState;
    const requestAction = (state) => defaultFactoryFunction({...defaultInitialDataState, loading: true, data: state.data});
    const setAction = (state, action) => defaultFactoryFunction({...defaultInitialDataState, data: action.payload});
    const updateAction = (state, action) => {
        const data = R.mergeDeepRight(state.data, action.payload);
        return defaultFactoryFunction({...defaultInitialDataState, data: data});
    };

    const defaultActionsDictionary = {
        [defaultVerbs.DELETE]: deleteAction,
        [defaultVerbs.FAIL]: failAction,
        [defaultVerbs.RESET]: resetAction,
        [defaultVerbs.REQUEST]: requestAction,
        [defaultVerbs.SET]: setAction,
        [defaultVerbs.UPDATE]: updateAction
    };

    const actionsDict = R.mergeDeepRight(defaultActionsDictionary, actionsDictionary);

    return makeReducer(name, factoryFunction, actionsDict);
};