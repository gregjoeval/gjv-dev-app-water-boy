import * as R from 'ramda';
import {createReducer} from 'redux-starter-kit';
import Action from '../models/action';

const createActionTypes = (noun, verbs, separator = '__') => {
    const list = R.filter((x) => Boolean(x), verbs); // remove falsy items
    return R.reduce((acc, verb) => {
        const actionType = R.join(separator, [noun, verb]);
        return R.assoc(verb, actionType, acc);
    }, {}, R.values(list));
};

type Reducer<T> = (state: (T | null), action: Action) => T;
type Factory<TInput, T> = (args: TInput) => T
type ActionDictionary<TActionTypes, T> = {[TActionTypes]: (any) => T}

/**
 * creates a data source store and actions types
 * @param {string} resourceName -
 * @param {function} factoryFunction -
 * @param {Object} actionsDictionary -
 * @returns {[Reducer, Object]} -
 */
export const makeReducer = <TActionTypes: any, TInput: any, T: any> (
    resourceName: string,
    factoryFunction: Factory<TInput, T>,
    actionsDictionary: ActionDictionary<TActionTypes, T>
): [Reducer<T>, TActionTypes] => {
    const initialState = factoryFunction();
    const verbs = R.keys(actionsDictionary);
    const actionTypes = createActionTypes(resourceName, verbs);
    const actionTypeVerbs = R.keys(actionTypes);

    const actionsMap = R.reduce((acc, verb) => {
        const actionType = actionTypes[verb];
        const action = actionsDictionary[verb];
        return R.assoc(actionType, action, acc);
    }, {}, actionTypeVerbs);

    const reducer = createReducer(initialState, actionsMap);

    if (process.env.NODE_ENV === 'development') {
        /* eslint-disable no-console */
        console.groupCollapsed(resourceName);
        console.groupCollapsed('actionTypes');
        console.table(actionTypes);
        console.groupEnd();
        console.groupEnd();
        /* eslint-enable no-console */
    }

    return [reducer, actionTypes];
};