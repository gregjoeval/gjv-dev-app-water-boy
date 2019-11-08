import {combineReducers} from 'redux';
import theme from './theme';
import config from './config';
import {reducer as sportingEvents} from './sportingEvents';
import {reducer as fullstrideGames} from './fullstrideGames';
import {reducer as locations} from './locations';

const rootReducer = combineReducers({
    theme,
    config,
    sportingEvents,
    fullstrideGames,
    locations
});

export default rootReducer;
