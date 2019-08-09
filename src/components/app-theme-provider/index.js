// @flow
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {CssBaseline} from '@material-ui/core';
import {ThemeProvider} from '@material-ui/styles';
import AppTheme from '../../models/theme';

const mapStateToProps = state => ({
    theme: state.theme
});

type Props = {
    children: Node | Array<Node>,
    theme: AppTheme
}

const AppThemeProvider = ({children, theme}: Props): Component => {
    const muiTheme = AppTheme.toMuiTheme(theme);

    return (
        <ThemeProvider theme={muiTheme}>
            <CssBaseline>
                {children}
            </CssBaseline>
        </ThemeProvider>
    );
};

export default connect(mapStateToProps)(AppThemeProvider);
