import * as R from 'ramda';
import {THEME_ID__SET, THEME_TYPE__UPDATE, REHYDRATE} from '../constants/actionTypes';
import AppTheme from '../models/theme';
import type {IAppTheme} from '../models/theme';
import Action from '../models/action';
import type {IAction} from '../models/action';

const theme = (state: IAppTheme = AppTheme.create(), action: IAction = Action.create()) => {
    const stateCopy = R.clone(state);
    switch (action.type) {
        case THEME_ID__SET:
            return AppTheme.create({type: stateCopy.type, id: action.payload});
        case THEME_TYPE__UPDATE:
            return AppTheme.create({...stateCopy, type: action.payload});
        case REHYDRATE:
            return AppTheme.create({...stateCopy, ...((action.payload || {}).theme || {})});
        default:
            return AppTheme.create(stateCopy);
    }
};

export default theme;