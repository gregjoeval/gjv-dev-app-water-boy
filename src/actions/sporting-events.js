import {actionTypes} from '../reducers/sportingEvents';
import Action from '../models/action';
import * as WaterBoyApi from '../vendor/water-boy-api-client/src/index';
import {createDictionaryFromList} from '../libs/ramdaCookbook';
import SportingEvent from '../models/sporting-event';

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

const createService = () => {
    const client = new WaterBoyApi.ApiClient();
    return new WaterBoyApi.SportingEventControllerApi(client);
};

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
 * fetch the sportingEvents from the data source
 * @returns {Function} -
 */
export const getSportingEventsAsync = () => async dispatch => {
    dispatch(Action.create(actionTypes.REQUEST));

    try {
        const service = createService();
        const apiModels = await service.sportingEventControllerFind();
        const sportingEvents = (apiModels || []).map(model => SportingEvent.create(model));
        dispatch(updateSportingEvents(sportingEvents));
    } catch (e) {
        dispatch(Action.create(actionTypes.FAIL, Error('Failed to fetch.'), true));
    }
};

/**
 * post a sportingEvent to the data source
 * @param {ISportingEvent} sportingEvent -
 * @returns {Function} -
 */
export const postSportingEventAsync = (sportingEvent) => async dispatch => {
    const apiModel = WaterBoyApi.SportingEvent.constructFromObject(sportingEvent);

    dispatch(Action.create(actionTypes.REQUEST));

    try {
        const service = createService();
        const model = await service.sportingEventControllerCreate({sportingEvent: apiModel});
        const newSportingEvent = SportingEvent.create(model);
        dispatch(updateSportingEvent(newSportingEvent));
    } catch (e) {
        dispatch(Action.create(actionTypes.FAIL, Error('Failed to post.'), true));
    }
};

/**
 * put a sportingEvent to the data source
 * @param {ISportingEvent} sportingEvent -
 * @returns {Function} -
 */
export const putSportingEventAsync = (sportingEvent) => async dispatch => {
    const apiModel = WaterBoyApi.SportingEvent.constructFromObject(sportingEvent);

    dispatch(Action.create(actionTypes.REQUEST));

    try {
        const service = createService();
        await service.sportingEventControllerReplaceById(sportingEvent.id, {sportingEvent: apiModel});
        dispatch(updateSportingEvent(sportingEvent));
    } catch (e) {
        dispatch(Action.create(actionTypes.FAIL, Error('Failed to put.'), true));
    }
};

/**
 * patch a sportingEvent to the data source
 * @param {ISportingEvent} sportingEvent -
 * @returns {Function} -
 */
export const patchSportingEventAsync = (sportingEvent) => async dispatch => {
    const apiModel = WaterBoyApi.SportingEvent.constructFromObject(sportingEvent);

    dispatch(Action.create(actionTypes.REQUEST));

    try {
        const service = createService();
        await service.sportingEventControllerUpdateById(sportingEvent.id, {sportingEvent: apiModel});
        dispatch(updateSportingEvent(sportingEvent));
    } catch (e) {
        dispatch(Action.create(actionTypes.FAIL, Error('Failed to patch.'), true));
    }
};

/**
 * delete a sportingEvent in the data source
 * @param {string} id -
 * @returns {Function} -
 */
export const deleteSportingEventAsync = (id) => async dispatch => {
    dispatch(Action.create(actionTypes.REQUEST));

    try {
        const service = createService();
        await service.sportingEventControllerDeleteById(id);
        dispatch(deleteSportingEvent(id));
    } catch (e) {
        dispatch(Action.create(actionTypes.FAIL, Error('Failed to delete.'), true));
    }
};
