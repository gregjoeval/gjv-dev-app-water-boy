import {HomeScreen} from './home';
import {AccountScreen} from './account';
import {GamesScreen} from './games';
import {FullstrideGamesScreen} from './fullstride-games';
import {AuthCallbackScreen} from './auth-callback';
import {NotFoundScreen} from './not-found';

export const allScreens = {HomeScreen, AccountScreen, GamesScreen, FullstrideGamesScreen, AuthCallbackScreen, NotFoundScreen};
export const navigableScreens = {HomeScreen, GamesScreen, FullstrideGamesScreen};
