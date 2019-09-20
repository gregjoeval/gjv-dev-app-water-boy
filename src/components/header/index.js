// @flow
import React, {Component} from 'react';
import ContentLayout from '../content-layout';
import SectionLayout from '../section-layout';
import {AppBar, Toolbar} from '@material-ui/core';
import {withStyles} from '@material-ui/styles';

type Props = {
    alignContent?: string,
    alignItems?: string,
    children: Array<Node> | Node,
    classes: Object,
    direction?: string,
    justify?: string,
    spacing?: number,
    wrap?: string,
    xs?: string,
    sm?: string,
    md?: string,
    lg?: string,
    xl?: string
};

const Header = (
    {
        alignContent,
        alignItems,
        children,
        classes,
        direction = 'row',
        justify,
        spacing = 8,
        wrap = 'wrap',
        xs = 12,
        sm = 12,
        md = 12,
        lg = 10,
        xl = 8
    }: Props
): Component => (
    <AppBar
        className={classes.header}
        color={'primary'}
        position={'fixed'}
    >
        <Toolbar>
            <SectionLayout
                disableGutter={true}
                lg={lg}
                md={md}
                sm={sm}
                xl={xl}
                xs={xs}
            >
                <ContentLayout
                    alignContent={alignContent}
                    alignItems={alignItems}
                    direction={direction}
                    justify={justify}
                    spacing={spacing}
                    wrap={wrap}
                >
                    {children}
                </ContentLayout>
            </SectionLayout>
        </Toolbar>
    </AppBar>
);

const styles = () => ({
    header: {
        top: 0,
        bottom: 'auto'
    }
});

export default withStyles(styles)(Header);