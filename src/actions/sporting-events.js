import {
    SPORTING_EVENTS__FETCH__FAIL,
    SPORTING_EVENTS__FETCH__REQUEST,
    SPORTING_EVENTS__FETCH__SUCCESS,
    SPORTING_EVENTS__RESET,
    SPORTING_EVENTS__SET,
    SPORTING_EVENTS__UPDATE
} from '../constants/actionTypes';
import Action from '../models/action';
import * as WaterBoyApi from '../vendor/water-boy-api-client/src/index';
import {createDictionaryFromList} from '../libs/ramdaCookbook';
import SportingEvent from '../models/sporting-event';

/**
 * sets the sportingEvents
 * @param {*} sportingEvents -
 * @return {{payload: *, type: string}} - action
 */
export const setSportingEvents = (sportingEvents) => Action.create(SPORTING_EVENTS__SET, sportingEvents);

/**
 * resets the sportingEvents
 * @return {{payload: *, type: string}} - action
 */
export const resetSportingEvents = () => Action.create(SPORTING_EVENTS__RESET);

/**
 * updates multiple sportingEvents
 * @param {Array<ISportingEvent>} sportingEvents -
 * @return {{payload: *, type: string}} - action
 */
export const updateSportingEvents = (sportingEvents) => {
    const payload = createDictionaryFromList(sportingEvents);
    Action.create(SPORTING_EVENTS__UPDATE, payload);
};

/**
 * fetches the sportingEvents from the data source
 * @return {{payload: *, type: string}} - action
 */
export const fetchSportingEventsAsync = () => async dispatch => {
    dispatch(Action.create(SPORTING_EVENTS__FETCH__REQUEST));

    try {
        const client = new WaterBoyApi.ApiClient();
        const service = new WaterBoyApi.SportingEventControllerApi(client);
        const apiModels = await service.sportingEventControllerFind();
        const sportingEvents = (apiModels || []).map(model => SportingEvent.create(model));
        const payload = createDictionaryFromList(sportingEvents);
        dispatch(Action.create(SPORTING_EVENTS__FETCH__SUCCESS, payload));
    } catch (e) {
        dispatch(Action.create(SPORTING_EVENTS__FETCH__FAIL, {}));
    }
};
