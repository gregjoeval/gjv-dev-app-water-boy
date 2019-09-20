import {
    FULLSTRIDE_GAMES__FETCH__FAIL,
    FULLSTRIDE_GAMES__FETCH__REQUEST,
    FULLSTRIDE_GAMES__FETCH__SUCCESS,
    FULLSTRIDE_GAMES__RESET,
    FULLSTRIDE_GAMES__SET,
    FULLSTRIDE_GAMES__UPDATE
} from '../constants/actionTypes';
import Action from '../models/action';
import * as WaterBoyApi from '../vendor/water-boy-api-client/src/index';
import {createDictionaryFromList} from '../libs/ramdaCookbook';
import FullstrideGame from '../models/fullstride-game';

/**
 * sets the FullstrideGames
 * @param {*} sportingEvents -
 * @return {{payload: *, type: string}} - action
 */
export const setFullstrideGames = (sportingEvents) => Action.create(FULLSTRIDE_GAMES__SET, sportingEvents);

/**
 * resets the FullstrideGames
 * @return {{payload: *, type: string}} - action
 */
export const resetFullstrideGames = () => Action.create(FULLSTRIDE_GAMES__RESET);

/**
 * updates multiple FullstrideGames
 * @param {Array<ISportingEvent>} sportingEvents -
 * @return {{payload: *, type: string}} - action
 */
export const updateFullstrideGames = (sportingEvents) => {
    const payload = createDictionaryFromList(sportingEvents);
    Action.create(FULLSTRIDE_GAMES__UPDATE, payload);
};

/**
 * fetches the FullstrideGames from the data source
 * @return {{payload: *, type: string}} - action
 */
export const fetchFullstrideGamesAsync = () => async dispatch => {
    dispatch(Action.create(FULLSTRIDE_GAMES__FETCH__REQUEST));

    try {
        const client = new WaterBoyApi.ApiClient();
        const service = new WaterBoyApi.FullstrideGameControllerApi(client);
        const apiModels = await service.fullstrideGameControllerFind();
        const fullstrideGames = (apiModels || []).map(model => FullstrideGame.create(model));
        const payload = createDictionaryFromList(fullstrideGames);
        dispatch(Action.create(FULLSTRIDE_GAMES__FETCH__SUCCESS, payload));
    } catch (e) {
        dispatch(Action.create(FULLSTRIDE_GAMES__FETCH__FAIL, {}));
    }
};
