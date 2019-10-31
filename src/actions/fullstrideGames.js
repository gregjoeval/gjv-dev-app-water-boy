import {actionTypes} from '../reducers/fullstrideGames';
import Action from '../models/action';
import {createDictionaryFromList} from '../libs/ramdaCookbook';
import {FullstrideGames} from '../data-sources/waterBoy';
import type {ISportingEvent} from '../models/sporting-event';
import type {IFullstrideGame} from '../models/fullstride-game';

/**
 * sets the elements in the FullstrideGames resource
 * @param {Array<ISportingEvent>} sportingEvents -
 * @return {{payload: *, type: string}} - action
 */
export const setFullstrideGames = (sportingEvents) => {
    const payload = createDictionaryFromList(sportingEvents);
    return Action.create(actionTypes.SET, payload);
};

/**
 * resets the FullstrideGames resource
 * @return {{payload: *, type: string}} - action
 */
export const resetFullstrideGames = () => Action.create(actionTypes.RESET);

/**
 * updates the FullstrideGames resource
 * updates/adds multiple FullstrideGames
 * @param {Array<ISportingEvent>} sportingEvents -
 * @return {{payload: *, type: string}} - action
 */
export const updateFullstrideGames = (sportingEvents) => {
    const payload = createDictionaryFromList(sportingEvents);
    return Action.create(actionTypes.UPDATE, payload);
};

/**
 * updates the FullstrideGames resource
 * updates/adds a single FullstrideGame
 * @param {ISportingEvent} sportingEvent -
 * @return {{payload: *, type: string}} - action
 */
export const updateFullstrideGame = (sportingEvent) => updateFullstrideGames([sportingEvent]);

/**
 * deletes elements from the FullstrideGames resource
 * delete multiple FullstrideGames
 * @param {Array<string>} ids -
 * @return {{payload: *, type: string}} - action
 */
export const deleteFullstrideGames = (ids) => Action.create(actionTypes.DELETE, ids);

/**
 * delete a single FullstrideGame
 * @param {Array<string>} id -
 * @return {{payload: *, type: string}} - action
 */
export const deleteFullstrideGame = (id) => deleteFullstrideGames([id]);

/**
 * gets the FullstrideGames from the data source
 * @return {{payload: *, type: string}} - action
 */
export const getFullstrideGamesAsync = () => async dispatch => {
    dispatch(Action.create(actionTypes.REQUEST));

    try {
        const models = await FullstrideGames.get();
        dispatch(updateFullstrideGames(models));
    } catch (e) {
        dispatch(Action.create(actionTypes.FAIL, e));
    }
};

/**
 * post a FullstrideGame to the data source
 * @param {ISportingEvent} model -
 * @returns {Function} -
 */
export const postFullstrideGameAsync = (model: IFullstrideGame) => async dispatch => {
    dispatch(Action.create(actionTypes.REQUEST));

    try {
        const newModel = await FullstrideGames.post(model);
        dispatch(updateFullstrideGame(newModel));
    } catch (e) {
        dispatch(Action.create(actionTypes.FAIL, Error('Failed to post.'), true));
    }
};

/**
 * put a FullstrideGame to the data source
 * @param {ISportingEvent} model -
 * @returns {Function} -
 */
export const putFullstrideGameAsync = (model: ISportingEvent) => async dispatch => {
    dispatch(Action.create(actionTypes.REQUEST));

    try {
        await FullstrideGames.put(model);
        dispatch(updateFullstrideGame(model));
    } catch (e) {
        dispatch(Action.create(actionTypes.FAIL, Error('Failed to put.'), true));
    }
};

/**
 * patch a FullstrideGame to the data source
 * @param {ISportingEvent} model -
 * @returns {Function} -
 */
export const patchFullstrideGameAsync = (model: ISportingEvent) => async dispatch => {
    dispatch(Action.create(actionTypes.REQUEST));

    try {
        await FullstrideGames.patch(model);
        dispatch(updateFullstrideGame(model));
    } catch (e) {
        dispatch(Action.create(actionTypes.FAIL, Error('Failed to patch.'), true));
    }
};

/**
 * delete a FullstrideGame in the data source
 * @param {string} id -
 * @returns {Function} -
 */
export const deleteFullstrideGameAsync = (id) => async dispatch => {
    dispatch(Action.create(actionTypes.REQUEST));

    try {
        await FullstrideGames.delete(id);
        dispatch(deleteFullstrideGame(id));
    } catch (e) {
        dispatch(Action.create(actionTypes.FAIL, Error('Failed to delete.'), true));
    }
};