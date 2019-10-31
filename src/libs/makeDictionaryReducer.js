import DataStore from '../models/data-store';
import * as R from 'ramda';
import makeReducer from './makeReducer';
import type {ActionDictionary} from './makeReducer';
import {VERBS} from '../constants/actionTypes';

const {DELETE, FAIL, RESET, REQUEST, SET, UPDATE} = VERBS;

export type ActionTypes = DELETE | FAIL | RESET | REQUEST | SET | UPDATE
export type Factory<TInput, T> = (args: TInput) => T

/**
 * make a Dictionary reducer
 * @param {string} name -
 * @param {any} initialState -
 * @param {Factory} factoryFunction -
 * @param {Object} actionsDictionary -
 * @returns {[Reducer<T>, Object]} -
 */
const makeDictionaryReducer = <TActionTypes: ActionTypes, TInput: DataStore, T: DataStore<Object>> (
    name: string,
    initialState: TInput,
    factoryFunction: Factory<TInput, T> = DataStore.create,
    actionsDictionary: ActionDictionary<TActionTypes, T> = {}
) => {
    const initState = factoryFunction(initialState);

    const deleteAction = (state, action) => {
        const data = R.omit(action.payload, state.data);
        return factoryFunction({...initState, data: data});
    };
    const failAction = (state, action) => factoryFunction({...initState, error: action.payload, data: state.data});
    const resetAction = () => initState;
    const requestAction = (state) => factoryFunction({...initState, loading: true, data: state.data});
    const setAction = (state, action) => factoryFunction({...initState, data: action.payload});
    const updateAction = (state, action) => {
        const data = R.mergeDeepRight(state.data, action.payload);
        return factoryFunction({...initState, data: data});
    };

    const defaultActionsDictionary = {
        [DELETE]: deleteAction,
        [FAIL]: failAction,
        [RESET]: resetAction,
        [REQUEST]: requestAction,
        [SET]: setAction,
        [UPDATE]: updateAction
    };

    const actionsDict = R.mergeDeepRight(defaultActionsDictionary, actionsDictionary);

    return makeReducer(name, initState, actionsDict);
};

export default makeDictionaryReducer;