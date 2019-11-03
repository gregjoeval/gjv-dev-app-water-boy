import type {ActionDictionary} from './makeReducer';
import * as R from 'ramda';
import {VERBS} from '../constants/actionTypes';
import type {IDataStore} from '../models/data-store';
import DataStore from '../models/data-store';
import type {MakeDictionaryReducerOptions} from './makeDictionaryReducer';
import {makeDictionaryReducerOptions} from './makeDictionaryReducer';
import type {IAction} from '../models/action';

const {DELETE, FAIL, REDO, RESET, REQUEST, SET, UPDATE, UNDO, CANCEL, REMOVE} = VERBS;
type ActionTypes = DELETE | FAIL | REMOVE | RESET | REQUEST | SET | UPDATE | UNDO | REDO | CANCEL

/**
 * SOURCE: https://redux.js.org/recipes/implementing-undo-history
 */
export type UndoableDataStore <T> = IDataStore<T> & {
    future: Array<T>,
    past: Array<T>,
    canceled: boolean
}

const undoableDictionaryEnhancer = R.curry(<TActionTypes: ActionTypes, TInput: DataStore, T: IDataStore<Object>> (
    undoableCount: number,
    options?: MakeDictionaryReducerOptions<TActionTypes, TInput, T>
): ActionDictionary<TActionTypes, UndoableDataStore<T>> => {
    const {initialState, factoryFunction, actionsDictionary} = makeDictionaryReducerOptions(options);
    const initState = factoryFunction(initialState);

    const undoableActions = {
        [REMOVE]: (state: UndoableDataStore, action: IAction) => {
            const old = factoryFunction({...initialState, data: state.data});
            const oldPast = R.defaultTo([], state.past);
            const data = R.omit(action.payload, old.data);
            const past = R.take(undoableCount, R.concat([old.data], oldPast));
            const canceled = R.length(past) === 0;
            return {
                ...initState,
                data: data,
                past: past,
                future: [],
                canceled: canceled
            };
        },
        [UPDATE]: (state: UndoableDataStore, action: IAction) => {
            const old = factoryFunction({...initialState, data: state.data});
            const oldPast = R.defaultTo([], state.past);
            const updated = factoryFunction({...initialState, data: action.payload});
            const data = R.mergeDeepRight(old.data, updated.data);
            const past = R.take(undoableCount, R.concat([old.data], oldPast));
            const canceled = R.length(past) === 0;
            return {
                ...initState,
                data: data,
                past: past,
                future: [],
                canceled: canceled
            };
        },
        [REDO]: (state: UndoableDataStore) => {
            const old = factoryFunction({...initialState, data: state.data});
            const oldFuture = R.defaultTo([], state.future);
            const oldPast = R.defaultTo([], state.past);
            const [[present], future] = R.splitAt(1, oldFuture);
            const past = R.concat([old], oldPast);
            return {
                ...initState,
                data: present,
                past: past,
                future: future,
                canceled: state.canceled
            };
        },
        [UNDO]: (state: UndoableDataStore) => {
            const old = factoryFunction({...initialState, data: state.data});
            const oldFuture = R.defaultTo([], state.future);
            const oldPast = R.defaultTo([], state.past);
            const [[present], past] = R.splitAt(1, oldPast);
            const future = R.concat([old], oldFuture);
            return {
                ...initState,
                data: present,
                past: past,
                future: future,
                canceled: state.canceled
            };
        },
        [CANCEL]: (state: UndoableDataStore) => ({
            ...state,
            canceled: true
        })
    };

    return R.mergeDeepRight(actionsDictionary, undoableActions);
});

export default undoableDictionaryEnhancer;
