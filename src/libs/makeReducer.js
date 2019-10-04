import * as R from 'ramda';
import {createReducer} from 'redux-starter-kit';
import Action from '../models/action';

/**
 * create a dictionary of action types such that [verb]: noun__verb
 * @param {string} noun -
 * @param {Array<string>} verbs - verbs list
 * @param {string} separator -
 * @returns {Object} - action types dictionary
 */
const createActionTypes = (noun, verbs, separator = '__') => {
    const list = R.filter((x) => Boolean(x), verbs); // remove falsy items
    return R.reduce((acc, verb) => {
        const actionType = R.join(separator, [noun, verb]);
        return R.assoc(verb, actionType, acc);
    }, {}, R.values(list));
};

export type Reducer<T> = (state: (T | null), action: Action) => T;
export type ActionDictionary<TActionTypes, T> = {[TActionTypes]: (any) => T}

/**
 * make a reducer
 * @param {string} resourceName -
 * @param {any} initialState -
 * @param {ActionDictionary} actionsDictionary -
 * @returns {[Reducer, Object]} -
 */
const makeReducer = <TActionTypes: any, TInput: any, T: any> (
    resourceName: string,
    initialState: TInput,
    actionsDictionary: ActionDictionary<TActionTypes, T>
): [Reducer<T>, TActionTypes] => {
    const verbs = R.keys(actionsDictionary);
    const actionTypes = createActionTypes(resourceName, verbs);
    const actionTypesKeys = R.keys(actionTypes);

    if (process.env.NODE_ENV === 'development') {
        /* eslint-disable no-console */
        console.groupCollapsed(resourceName);
        console.group('actionTypes');
        console.table(actionTypes);
        console.groupEnd();
        console.groupEnd();
        /* eslint-enable no-console */
    }

    const actionsDict = R.reduce((acc, verb) => {
        const actionType = actionTypes[verb];
        const action = actionsDictionary[verb];
        return R.assoc(actionType, action, acc);
    }, {}, actionTypesKeys);

    const reducer = createReducer(initialState, actionsDict);

    return [reducer, actionTypes];
};

export default makeReducer;
