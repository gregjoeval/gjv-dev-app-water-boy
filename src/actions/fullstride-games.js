import {actionTypes} from '../reducers/fullstrideGames';
import Action from '../models/action';
import * as WaterBoyApi from '../vendor/water-boy-api-client/src/index';
import {createDictionaryFromList} from '../libs/ramdaCookbook';
import FullstrideGame from '../models/fullstride-game';
import moment from 'moment';
import {FullstrideGameFormat} from '../constants/dateTimeFormats';

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
        const client = new WaterBoyApi.ApiClient();
        const service = new WaterBoyApi.FullstrideGameControllerApi(client);
        const apiModels = await service.fullstrideGameControllerFind();
        const fullstrideGames = (apiModels || []).map(model => {
            const dateTime = moment(model.dateTime, FullstrideGameFormat).toISOString(true);
            return FullstrideGame.create({...model, dateTime});
        });
        dispatch(updateFullstrideGames(fullstrideGames));
    } catch (e) {
        dispatch(Action.create(actionTypes.FAIL, e));
    }
};

