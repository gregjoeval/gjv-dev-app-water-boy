// @flow
import React, {Component, Fragment, useEffect, useCallback, useState} from 'react';
import {useDispatch} from 'react-redux';
import AppConfig from '../../models/config';
import {ConfigActions} from '../../actions';

type Props = {
    children: Node | Array<Node>,
}

const AppConfigProvider = ({children}: Props): Component => {

    const [hasConfig, setHasConfig] = useState(false);
    const dispatch = useDispatch();
    const setConfigAction = useCallback(
        (payload) => dispatch(ConfigActions.setConfig(payload)),
        [dispatch]
    );

    useEffect(() => {
        if (!hasConfig) {
            // Since this app isn't using a self-discovery pattern for the config, map to config object here
            const websiteTitle = process.env.REACT_APP_WEBSITE_TITLE;
            const websiteAuthor = process.env.REACT_APP_WEBSITE_AUTHOR;
            const debug = process.env.REACT_APP_DEBUG;
            const clientId = process.env.REACT_APP__AUTH0__CLIENT_ID;
            const domain = process.env.REACT_APP__AUTH0__DOMAIN;
            const waterBoyApiUri = process.env.REACT_APP__WATER_BOY_API__URI;
            const appConfig = AppConfig.create({websiteTitle, websiteAuthor, debug, clientId, domain, waterBoyApiUri});
            setConfigAction(appConfig);
            setHasConfig(true);
        }
    }, [hasConfig, setConfigAction]);

    return (
        <Fragment>
            {children}
        </Fragment>
    );
};

export default AppConfigProvider;
