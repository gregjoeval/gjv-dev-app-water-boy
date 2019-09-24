import {combineReducers} from 'redux';
import theme from './theme';
import config from './config';
import sportingEvents from './sportingEvents';
import {reducer as fullstrideGames} from './fullstrideGames';

const rootReducer = combineReducers({
    theme,
    config,
    sportingEvents,
    fullstrideGames
});

export default rootReducer;