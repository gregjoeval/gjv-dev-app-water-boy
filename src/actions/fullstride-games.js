import {actionTypes} from '../reducers/fullstrideGames';
import Action from '../models/action';
import * as WaterBoyApi from '../vendor/water-boy-api-client/src/index';
import {createDictionaryFromList} from '../libs/ramdaCookbook';
import FullstrideGame from '../models/fullstride-game';

/**
 * sets the FullstrideGames
 * @param {*} sportingEvents -
 * @return {{payload: *, type: string}} - action
 */
export const setFullstrideGames = (sportingEvents) => Action.create(actionTypes.SET, sportingEvents);

/**
 * resets the FullstrideGames
 * @return {{payload: *, type: string}} - action
 */
export const resetFullstrideGames = () => Action.create(actionTypes.RESET);

/**
 * updates multiple FullstrideGames
 * @param {Array<ISportingEvent>} sportingEvents -
 * @return {{payload: *, type: string}} - action
 */
export const updateFullstrideGames = (sportingEvents) => {
    const payload = createDictionaryFromList(sportingEvents);
    Action.create(actionTypes.UPDATE, payload);
};

/**
 * fetches the FullstrideGames from the data source
 * @return {{payload: *, type: string}} - action
 */
export const fetchFullstrideGamesAsync = () => async dispatch => {
    dispatch(Action.create(actionTypes.REQUEST));

    try {
        const client = new WaterBoyApi.ApiClient();
        const service = new WaterBoyApi.FullstrideGameControllerApi(client);
        const apiModels = await service.fullstrideGameControllerFind();
        const fullstrideGames = (apiModels || []).map(model => FullstrideGame.create(model));
        const payload = createDictionaryFromList(fullstrideGames);
        dispatch(Action.create(actionTypes.SET, payload));
    } catch (e) {
        dispatch(Action.create(actionTypes.FAIL, 'Failed to fetch'));
    }
};
