import {HomeScreen} from './home';
import {AccountScreen} from './account';
import {FullstrideGamesScreen} from './fullstride-games';
import {AuthCallbackScreen} from './auth-callback';
import {NotFoundScreen} from './not-found';

export const allScreens = {HomeScreen, SecretScreen: AccountScreen, FullstrideGamesScreen, AuthCallbackScreen, NotFoundScreen};
export const navigableScreens = {HomeScreen, SecretScreen: AccountScreen, FullstrideGamesScreen};
