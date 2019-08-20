// src/react-auth0-wrapper.js
import React, {useState, useEffect, useContext} from 'react';
import createAuth0Client from '@auth0/auth0-spa-js';

export const Auth0Context = React.createContext();
export const useAuth0 = () => useContext(Auth0Context);
export const Auth0Provider = ({
    domain,
    children,
    clientId,
    navigate,
    redirectUri,
    ...clientParams
}) => {
    const [isAuthenticated, setIsAuthenticated] = useState();
    const [user, setUser] = useState();
    const [auth0Client, setAuth0Client] = useState();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const initAuth0 = async () => {
            const clientOptions = {
                domain: domain,
                // can remove next line if lint rules change
                // eslint-disable-next-line camelcase
                client_id: clientId,
                // can remove next line if lint rules change
                // eslint-disable-next-line camelcase
                redirect_uri: redirectUri,
                ...clientParams
            };
            const auth0FromHook = await createAuth0Client(clientOptions);
            setAuth0Client(auth0FromHook);

            if (window.location.search.includes('code=')) {
                const {appState} = await auth0FromHook.handleRedirectCallback();
                debugger;
                navigate(redirectUri, appState);
            }

            const isAuthed = await auth0FromHook.isAuthenticated();

            setIsAuthenticated(isAuthed);

            if (isAuthed) {
                const userInfo = await auth0FromHook.getUser();
                setUser(userInfo);
            }

            setIsLoading(false);
        };
        initAuth0();

        // TODO: update function to run as intended with deps
        // eslint-disable-next-line
    }, []);

    const handleRedirectCallback = async () => {
        setIsLoading(true);
        await auth0Client.handleRedirectCallback();
        const userInfo = await auth0Client.getUser();
        setIsLoading(false);
        setIsAuthenticated(true);
        setUser(userInfo);
    };

    return (
        <Auth0Context.Provider
            value={{
                isAuthenticated,
                user,
                isLoading,
                redirectUri,
                handleRedirectCallback,
                getIdTokenClaims: (...p) => auth0Client.getIdTokenClaims(...p),
                loginWithRedirect: ({...p}) => {
                    debugger;
                    return auth0Client.loginWithRedirect(p);
                },
                getTokenSilently: (...p) => auth0Client.getTokenSilently(...p),
                getTokenWithPopup: (...p) => auth0Client.getTokenWithPopup(...p),
                logout: (...p) => auth0Client.logout(...p)
            }}
        >
            {children}
        </Auth0Context.Provider>
    );
};