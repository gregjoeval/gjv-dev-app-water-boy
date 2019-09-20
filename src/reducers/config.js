import * as R from 'ramda';
import {CONFIG__SET, CONFIG__RESET} from '../constants/actionTypes';
import AppConfig from '../models/config';
import type {IAppConfig} from '../models/config';
import Action from '../models/action';
import type {IAction} from '../models/action';

const config = (state: IAppConfig = {}, action: IAction = Action.create()) => {
    const stateCopy = R.clone(state);
    switch (action.type) {
        case CONFIG__SET:
            return AppConfig.create({...action.payload});
        case CONFIG__RESET:
            return AppConfig.create();
        default:
            return AppConfig.create(stateCopy);
    }
};

export default config;