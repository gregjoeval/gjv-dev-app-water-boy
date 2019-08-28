import {combineReducers} from 'redux';
import theme from './theme';
import config from './config';

const rootReducer = combineReducers({
    theme,
    config
});

export default rootReducer;