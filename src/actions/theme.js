import {THEME_ID__SET, THEME_TYPE__UPDATE} from '../constants/actionTypes';
import {THEME} from '../constants';

/**
 * sets the theme id
 * @param {string} id - theme id
 * @return {{payload: *, type: string}} - thunk
 */
export const setThemeId = (id) => ({
    type: THEME_ID__SET,
    payload: id
});

export const setLightTheme = () => ({
    type: THEME_TYPE__UPDATE,
    payload: THEME.LIGHT
});

export const setDarkTheme = () => ({
    type: THEME_TYPE__UPDATE,
    payload: THEME.DARK
});