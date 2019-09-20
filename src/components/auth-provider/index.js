// copied from https://auth0.com/docs/quickstart/spa/react/01-login
import React, {useState, useEffect, useContext, ReactNodeArray} from 'react';
import createAuth0Client from '@auth0/auth0-spa-js';

const DEFAULT_REDIRECT_CALLBACK = () =>
    window.history.replaceState({}, document.title, window.location.pathname);

const DEFAULT_AUTH0_CLIENT = {
    loginWithPopup: () => {},
    getUser: () => {},
    handleRedirectCallback: () => {},
    getIdTokenClaims: () => {},
    loginWithRedirect: () => {},
    getTokenSilently: () => {},
    getTokenWithPopup: () => {},
    logout: () => {}
};

export const Auth0Context = React.createContext();
export const useAuth0 = () => useContext(Auth0Context);

type Auth0ProviderProps = {
    children: ReactNodeArray,
    onRedirectCallback: Function
};

export const Auth0Provider = ({
    children,
    onRedirectCallback = DEFAULT_REDIRECT_CALLBACK,
    ...initOptions
}: Auth0ProviderProps) => {
    const [isAuthenticated, setIsAuthenticated] = useState();
    const [user, setUser] = useState();
    const [auth0Client, setAuth0Client] = useState(DEFAULT_AUTH0_CLIENT);
    const [loading, setLoading] = useState(true);
    const [popupOpen, setPopupOpen] = useState(false);
    const [hasInitOptions, setHasInitOptions] = useState(false);

    useEffect(() => {
        if (initOptions && initOptions.domain && initOptions.client_id) {
            setHasInitOptions(true);
        }
    }, [initOptions]);

    useEffect(() => {
        const initAuth0 = async () => {
            const auth0FromHook = await createAuth0Client(initOptions);
            setAuth0Client(auth0FromHook);

            if (window.location.search.includes('code=')) {
                const {appState} = await auth0FromHook.handleRedirectCallback();
                onRedirectCallback(appState);
            }

            const isAuthed = await auth0FromHook.isAuthenticated();

            setIsAuthenticated(isAuthed);

            if (isAuthed) {
                const userInfo = await auth0FromHook.getUser();
                setUser(userInfo);
            }

            setLoading(false);
        };

        if (hasInitOptions) {
            initAuth0();
        }
        // eslint-disable-next-line
    }, [hasInitOptions]);

    const loginWithPopup = async (params = {}) => {
        setPopupOpen(true);
        try {
            await auth0Client.loginWithPopup(params);
        } catch (error) {
            // eslint-disable-next-line no-console
            console.error(error);
        } finally {
            setPopupOpen(false);
        }
        const userInfo = await auth0Client.getUser();
        setUser(userInfo);
        setIsAuthenticated(true);
    };

    const handleRedirectCallback = async () => {
        setLoading(true);
        await auth0Client.handleRedirectCallback();
        const userInfo = await auth0Client.getUser();
        setLoading(false);
        setIsAuthenticated(true);
        setUser(userInfo);
    };
    return (
        <Auth0Context.Provider
            value={{
                isAuthenticated,
                user,
                loading,
                popupOpen,
                loginWithPopup,
                handleRedirectCallback,
                getIdTokenClaims: ({...p}) => auth0Client.getIdTokenClaims({...p}),
                loginWithRedirect: ({...p}) => auth0Client.loginWithRedirect({...p}),
                getTokenSilently: ({...p}) => auth0Client.getTokenSilently({...p}),
                getTokenWithPopup: ({...p}) => auth0Client.getTokenWithPopup({...p}),
                logout: ({...p}) => auth0Client.logout({...p})
            }}
        >
            {children}
        </Auth0Context.Provider>
    );
};