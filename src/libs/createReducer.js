import type {IAction} from '../models/action';

/**
 * mimic functionality of Redux createReducer, without using Immer
 * Documentation: https://redux-starter-kit.js.org/api/createreducer
 * @param {any} initialState -
 * @param {Object} handlers -
 * @returns {Function} -
 */
const createReducer = <T> (initialState: T, handlers: {[string]: (T, IAction<T>) => void}) =>
    (state = initialState, action) => {
        if (handlers.hasOwnProperty(action.type)) {
            return handlers[action.type](state, action);
        }
        return state;
    };

export default createReducer;