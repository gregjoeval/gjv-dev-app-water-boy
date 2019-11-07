import DataStore from '../models/data-store';
import * as R from 'ramda';
import makeReducer from './makeReducer';
import type {ActionDictionary} from './makeReducer';
import {VERBS} from '../constants/actionTypes';
import type {IAction} from '../models/action';
import moment from 'moment';

const {DELETE, FAIL, HYDRATE, RESET, REQUEST, SET, UPDATE} = VERBS;

export type ActionTypes = DELETE | FAIL | HYDRATE | RESET | REQUEST | SET | UPDATE
export type Factory<TInput, T> = (args: TInput) => T
export type EnhancerOptions<TActionTypes: ActionTypes, TInput: DataStore, T: DataStore<Object>> = {
    initialState?: TInput,
    factoryFunction?: Factory<TInput, T>,
    actionsDictionary?: ActionDictionary<TActionTypes, T>
}
export type Enhancer = (ActionDictionary, EnhancerOptions) => ActionDictionary
export type MakeDictionaryReducerOptions<TActionTypes: ActionTypes, TInput: DataStore, T: DataStore<Object>> = EnhancerOptions<TActionTypes, TInput, T> & {
    enhancers?: Array<Enhancer>
}

export const makeDictionaryReducerOptions = (args: $Shape<MakeDictionaryReducerOptions>): MakeDictionaryReducerOptions => {
    const o = {
        initialState: R.defaultTo({}, R.prop('initialState', args)),
        factoryFunction: R.defaultTo(DataStore.create, R.prop('factoryFunction', args)),
        actionsDictionary: R.defaultTo({}, R.prop('actionsDictionary', args)),
        enhancers: R.defaultTo([], R.prop('enhancers', args))
    };

    return Object.freeze(o);
};

/**
 * make a Dictionary reducer
 * @param {string} name -
 * @param {MakeDictionaryReducerOptions} options -
 * @returns {[Reducer<T>, Object]} -
 */
const makeDictionaryReducer = <TActionTypes: ActionTypes, TInput: DataStore, T: DataStore<Object>> (
    name: string,
    options?: MakeDictionaryReducerOptions<TActionTypes, TInput, T>
) => {
    const {initialState, factoryFunction, enhancers} = makeDictionaryReducerOptions(options);
    const initState = factoryFunction(initialState);

    const deleteAction = (state: T, action: IAction<T>) => {
        const data = R.omit(action.payload, state.data);
        return factoryFunction({...initState, lastUpdated: state.lastUpdated, data: data});
    };
    const failAction = (state: T, action: IAction<T>) => factoryFunction({...initState, lastUpdated: state.lastUpdated, error: action.payload, data: state.data});
    const resetAction = () => initState;
    const requestAction = (state: T) => factoryFunction({...initState, lastUpdated: state.lastUpdated, loading: true, data: state.data});
    const setAction = (state: T, action: IAction<T>) => factoryFunction({...initState, lastUpdated: state.lastUpdated, data: action.payload});
    const updateAction = (state: T, action: IAction<T>) => {
        const data = R.mergeDeepRight(state.data, action.payload);
        return factoryFunction({...initState, lastUpdated: state.lastUpdated, data: data});
    };
    const hydrateAction = (state: T, action: IAction<T>) => {
        const newState = setAction(state, action);
        const now = moment().toISOString(true);
        return factoryFunction({...initState, ...newState, lastUpdated: now});
    };

    const defaultActionsDictionary = {
        [DELETE]: deleteAction,
        [FAIL]: failAction,
        [HYDRATE]: hydrateAction,
        [RESET]: resetAction,
        [REQUEST]: requestAction,
        [SET]: setAction,
        [UPDATE]: updateAction
    };

    const enhancedActionsDictionary = R.reduce((acc, enhancer) => enhancer(options), {}, enhancers);
    const actionsDict = R.mergeDeepRight(defaultActionsDictionary, enhancedActionsDictionary);

    return makeReducer(name, initState, actionsDict);
};

export default makeDictionaryReducer;
