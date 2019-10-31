import {actionTypes} from '../reducers/sportingEvents';
import Action from '../models/action';
import {createDictionaryFromList} from '../libs/ramdaCookbook';
import type {ISportingEvent} from '../models/sporting-event';
import {SportingEvents} from '../data-sources/waterBoy';

/**
 * sets the sportingEvents
 * @param {Array<ISportingEvent>} sportingEvents -
 * @return {{payload: *, type: string}} - action
 */
export const setSportingEvents = (sportingEvents) => {
    const payload = createDictionaryFromList(sportingEvents);
    return Action.create(actionTypes.SET, payload);
};

/**
 * resets the sportingEvents
 * @return {{payload: *, type: string}} - action
 */
export const resetSportingEvents = () => Action.create(actionTypes.RESET);

/**
 * updates multiple sportingEvents
 * @param {Array<ISportingEvent>} sportingEvents -
 * @return {{payload: *, type: string}} - action
 */
export const updateSportingEvents = (sportingEvents) => {
    const payload = createDictionaryFromList(sportingEvents);
    return Action.create(actionTypes.UPDATE, payload);
};

/**
 * updates a single sportingEvent
 * @param {ISportingEvent} sportingEvent -
 * @return {{payload: *, type: string}} - action
 */
export const updateSportingEvent = (sportingEvent) => updateSportingEvents([sportingEvent]);

/**
 * deletes elements from the SportingEvents resource
 * delete multiple SportingEvents
 * @param {Array<string>} ids -
 * @return {{payload: *, type: string}} - action
 */
export const deleteSportingEvents = (ids) => Action.create(actionTypes.DELETE, ids);

/**
 * delete a single SportingEvent
 * @param {Array<string>} id -
 * @return {{payload: *, type: string}} - action
 */
export const deleteSportingEvent = (id) => deleteSportingEvents([id]);

/**
 * fetch SportingEvents from the data source
 * @returns {Function} -
 */
export const getSportingEventsAsync = () => async dispatch => {
    dispatch(Action.create(actionTypes.REQUEST));

    try {
        const models = await SportingEvents.get();
        dispatch(updateSportingEvents(models));
    } catch (e) {
        dispatch(Action.create(actionTypes.FAIL, Error('Failed to fetch.'), true));
    }
};

/**
 * post a SportingEvent to the data source
 * @param {ISportingEvent} model -
 * @returns {Function} -
 */
export const postSportingEventAsync = (model: ISportingEvent) => async dispatch => {
    dispatch(Action.create(actionTypes.REQUEST));

    try {
        const newModel = await SportingEvents.post(model);
        dispatch(updateSportingEvent(newModel));
    } catch (e) {
        dispatch(Action.create(actionTypes.FAIL, Error('Failed to post.'), true));
    }
};

/**
 * put a SportingEvent to the data source
 * @param {ISportingEvent} model -
 * @returns {Function} -
 */
export const putSportingEventAsync = (model: ISportingEvent) => async dispatch => {
    dispatch(Action.create(actionTypes.REQUEST));

    try {
        await SportingEvents.put(model);
        dispatch(updateSportingEvent(model));
    } catch (e) {
        dispatch(Action.create(actionTypes.FAIL, Error('Failed to put.'), true));
    }
};

/**
 * patch a SportingEvent to the data source
 * @param {ISportingEvent} model -
 * @returns {Function} -
 */
export const patchSportingEventAsync = (model: ISportingEvent) => async dispatch => {
    dispatch(Action.create(actionTypes.REQUEST));

    try {
        await SportingEvents.patch(model);
        dispatch(updateSportingEvent(model));
    } catch (e) {
        dispatch(Action.create(actionTypes.FAIL, Error('Failed to patch.'), true));
    }
};

/**
 * delete a SportingEvent in the data source
 * @param {string} id -
 * @returns {Function} -
 */
export const deleteSportingEventAsync = (id) => async dispatch => {
    dispatch(Action.create(actionTypes.REQUEST));

    try {
        await SportingEvents.delete(id);
        dispatch(deleteSportingEvent(id));
    } catch (e) {
        dispatch(Action.create(actionTypes.FAIL, Error('Failed to delete.'), true));
    }
};
