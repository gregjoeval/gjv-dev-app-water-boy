import {HomeScreen} from './home';
import {AccountScreen} from './account';
import {GamesScreen} from './games';
import {FullstrideGamesScreen} from './fullstride-games';
import {AuthCallbackScreen} from './auth-callback';
import {NotFoundScreen} from './not-found';
import {LocationsScreen} from './locations';

export const allScreens = {HomeScreen, AccountScreen, GamesScreen, FullstrideGamesScreen, LocationsScreen, AuthCallbackScreen, NotFoundScreen};
export const navigableScreens = {HomeScreen, GamesScreen, FullstrideGamesScreen, LocationsScreen};
