import * as R from 'ramda';

/**
 * Takes a list of elements and returns a new list of only truthy results.
 * Any element that is a function will be executed and if the result is a truthy value, it will be included.
 * Any falsy elements will be excluded.
 * @param {Array<*>} array - list of elements
 * @returns {Array<*>} - list of only truthy values
 */
const selectTruthyResults = (array: Array<any>): Array<any> => {
    const list = [].concat(array);
    return R.reduce((acc, element) => {
        const item = typeof element === 'function'
            ? element()
            : element;

        return item
            ? R.append(item, acc)
            : acc;
    }, [], list);
};

export default selectTruthyResults;
