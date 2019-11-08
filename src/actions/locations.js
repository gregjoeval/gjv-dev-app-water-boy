import {actionTypes} from '../reducers/locations';
import Action from '../models/action';
import {createDictionaryFromList} from '../libs/ramdaCookbook';
import type {ILocation} from '../models/location';
import {Locations} from '../data-sources/waterBoy';

/**
 * sets the Locations
 * @param {Array<ILocation>} models -
 * @return {{payload: *, type: string}} - action
 */
export const setLocations = (models) => {
    const payload = createDictionaryFromList(models);
    return Action.create(actionTypes.SET, payload);
};

/**
 * resets the Locations
 * @return {{payload: *, type: string}} - action
 */
export const resetLocations = () => Action.create(actionTypes.RESET);

/**
 * updates multiple Locations from a data source
 * @param {Array<ILocation>} models -
 * @return {{payload: *, type: string}} - action
 */
export const hydrateLocations = (models) => {
    const payload = createDictionaryFromList(models);
    return Action.create(actionTypes.HYDRATE, payload);
};

/**
 * updates a single location from a data source
 * @param {ILocation} model -
 * @return {{payload: *, type: string}} - action
 */
export const hydrateLocation = (model) => hydrateLocations([model]);

/**
 * updates multiple Locations
 * @param {Array<ILocation>} models -
 * @return {{payload: *, type: string}} - action
 */
export const updateLocations = (models) => {
    const payload = createDictionaryFromList(models);
    return Action.create(actionTypes.UPDATE, payload);
};

/**
 * updates a single location
 * @param {ILocation} model -
 * @return {{payload: *, type: string}} - action
 */
export const updateLocation = (model) => updateLocations([model]);

/**
 * deletes elements from the Locations resource
 * delete multiple Locations
 * @param {Array<string>} ids -
 * @return {{payload: *, type: string}} - action
 */
export const deleteLocations = (ids) => Action.create(actionTypes.DELETE, ids);

/**
 * delete a single Location
 * @param {Array<string>} id -
 * @return {{payload: *, type: string}} - action
 */
export const deleteLocation = (id) => deleteLocations([id]);

/**
 * undo last Location change
 * @return {{payload: *, type: string}} - action
 */
export const undoLocation = () => Action.create(actionTypes.UNDO);

/**
 * redo last Location change
 * @return {{payload: *, type: string}} - action
 */
export const redoLocation = () => Action.create(actionTypes.REDO);

/**
 * cancel option to undo/redo last Location change
 * @return {{payload: *, type: string}} - action
 */
export const cancelUndoableLocation = () => Action.create(actionTypes.CANCEL);

/**
 * fetch Locations from the data source
 * @returns {Function} -
 */
export const getLocationsAsync = () => async dispatch => {
    dispatch(Action.create(actionTypes.REQUEST));

    try {
        const models = await Locations.get();
        dispatch(hydrateLocations(models));
    } catch (e) {
        dispatch(Action.create(actionTypes.FAIL, Error('Failed to fetch.'), true));
    }
};

/**
 * post a Location to the data source
 * @param {ILocation} model -
 * @returns {Function} -
 */
export const postLocationAsync = (model: ILocation) => async dispatch => {
    dispatch(Action.create(actionTypes.REQUEST));

    try {
        await Locations.post(model);
        const models = await Locations.get();
        dispatch(hydrateLocations(models));
    } catch (e) {
        dispatch(Action.create(actionTypes.FAIL, Error('Failed to post.'), true));
    }
};

/**
 * put a Location to the data source
 * @param {ILocation} model -
 * @returns {Function} -
 */
export const putLocationAsync = (model: ILocation) => async dispatch => {
    dispatch(Action.create(actionTypes.REQUEST));

    try {
        await Locations.put(model);
        const models = await Locations.get();
        dispatch(hydrateLocations(models));
    } catch (e) {
        dispatch(Action.create(actionTypes.FAIL, Error('Failed to put.'), true));
    }
};

/**
 * patch a Location to the data source
 * @param {ILocation} model -
 * @returns {Function} -
 */
export const patchLocationAsync = (model: ILocation) => async dispatch => {
    dispatch(Action.create(actionTypes.REQUEST));

    try {
        await Locations.patch(model);
        const models = await Locations.get();
        dispatch(hydrateLocations(models));
    } catch (e) {
        dispatch(Action.create(actionTypes.FAIL, Error('Failed to patch.'), true));
    }
};

/**
 * delete a Location in the data source
 * @param {string} id -
 * @returns {Function} -
 */
export const deleteLocationAsync = (id) => async dispatch => {
    dispatch(Action.create(actionTypes.REQUEST));

    try {
        await Locations.delete(id);
        dispatch(deleteLocation(id));
    } catch (e) {
        dispatch(Action.create(actionTypes.FAIL, Error('Failed to delete.'), true));
    }
};
