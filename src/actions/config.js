import {CONFIG__RESET, CONFIG__SET} from '../constants/actionTypes';
import Action from '../models/action';

/**
 * sets the config
 * @param {IAppConfig} config - application config object
 * @return {{payload: *, type: string}} - action
 */
export const setConfig = (config) => Action.create(CONFIG__SET, config);

/**
 * resets the config
 * @return {{payload: *, type: string}} - action
 */
export const resetConfig = () => Action.create(CONFIG__RESET);
