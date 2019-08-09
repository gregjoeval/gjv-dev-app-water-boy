// @flow
import React, {Component, Fragment} from 'react';
import withStyles from '@material-ui/styles/withStyles';
import type ToolBar from '@material-ui/core/Toolbar';
import SectionLayout from '../section-layout';

// definition for when the layout displays a header
const hasHeader = (header) => Boolean(header);

// definition for when the layout displays a footer
const hasFooter = (footer) => Boolean(footer);

type Props = {
    children: Array<Node> | Node,
    classes: Object,
    footer: ToolBar,
    header: ToolBar
};

const ScreenLayout = ({children, classes, footer, header}: Props): Component => {
    // renders the header
    const renderHeader = (headerChildren: ToolBar) => (hasHeader(headerChildren)
        ? (headerChildren)
        : null
    );

    // renders the footer
    const renderFooter = (footerChildren: ToolBar) => (hasFooter(footerChildren)
        ? (footerChildren)
        : null
    );

    return (
        <Fragment>
            {renderHeader(header)}
            <main className={`${classes.main} ${hasHeader(header) || hasFooter(footer) ? classes.hasHeaderOrFooter : ''}`}>
                <div className={classes.screenPadding}>
                    <SectionLayout
                        lg={7}
                        md={9}
                        sm={11}
                        xl={5}
                        xs={12}
                    >
                        {children}
                    </SectionLayout>
                </div>
            </main>
            {renderFooter(footer)}
        </Fragment>
    );
};

const styles = theme => ({
    main: {
        backgroundColor: 'transparent',
        position: 'relative',
        zIndex: 2
    },
    hasHeaderOrFooter: {
        paddingTop: theme.spacing(9),
        paddingBottom: theme.spacing(9)
    },
    screenPadding: {
        [theme.breakpoints.up('xs')]: {
            paddingTop: theme.spacing(3),
            paddingBottom: theme.spacing(3)
        },
        [theme.breakpoints.up('sm')]: {
            paddingTop: theme.spacing(5),
            paddingBottom: theme.spacing(5)
        },
        [theme.breakpoints.up('md')]: {
            paddingTop: theme.spacing(7),
            paddingBottom: theme.spacing(7)
        },
        [theme.breakpoints.up('lg')]: {
            paddingTop: theme.spacing(9),
            paddingBottom: theme.spacing(9)
        },
        [theme.breakpoints.up('xl')]: {
            paddingTop: theme.spacing(11),
            paddingBottom: theme.spacing(11)
        }
    }
});

export default withStyles(styles)(ScreenLayout);
