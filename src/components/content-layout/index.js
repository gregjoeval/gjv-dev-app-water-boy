// @flow
import React, {Component} from 'react';
import * as R from 'ramda';
import Grid, {
    GridContentAlignment,
    GridDirection,
    GridItemsAlignment,
    GridJustification,
    GridWrap
} from '@material-ui/core/Grid';
import {withStyles} from '@material-ui/styles';

/**
 * https://www.w3schools.com/cssref/pr_text_text-align.asp
 */
export type TextAlign = 'left' | 'right' | 'center' | 'justify' | 'initial' | 'inherit';

const handleSpacing = input => {
    switch (input) {
        case 0:
        default:
            return 0;
        case 1:
        case 8:
            return 1;
        case 2:
        case 16:
            return 2;
        case 3:
        case 24:
            return 3;
        case 4:
        case 32:
            return 4;
        case 5:
        case 40:
            return 5;
    }
};

const waterfallValues = (defaultValue, valueArray = []) => {
    const len = valueArray.length;
    if (valueArray.length > 0) {
        const value = valueArray[0] || defaultValue;
        if (len > 1) {
            return [value, ...(waterfallValues(value, R.takeLast(len - 1, valueArray)))];
        }
        return [value];
    }
    return [];
};

type Props = {
    alignContent?: GridContentAlignment,
    alignItems?: GridItemsAlignment,
    children: Array<Node> | Node,
    classes?: Object,
    className?: string,
    direction?: GridDirection,
    enableBreakpointSpacing?: boolean,
    justify?: GridJustification,
    spacing?: number,
    textAlign?: TextAlign,
    wrap?: GridWrap,
    xs?: number,
    sm?: number,
    md?: number,
    lg?: number,
    xl?: number
};

/**
 * @description wraps elements in the flex layout as implemented by MaterialUI
 *   DEFINITIONS:
 *     container - wraps flexbox items in a flexbox container
 *     item(s) - wraps element(s) in a flexbox item
 *     element(s) - lowest level of the flexbox layout; the children of this component
 *   RESOURCES:
 *      https://material-ui.com/api/grid/
 *      https://the-echoplex.net/flexyboxes/
 *      https://css-tricks.com/snippets/css/a-guide-to-flexbox/
 * @param {GridContentAlignment} alignContent - defines alignment for item lines within the container
 * @param {GridItemsAlignment} alignItems - defines alignment perpendicular to the main axis
 * @param {Array<Node> | Node} children - element(s), component(s)
 * @param {Object} classes - jss classes
 * @param {string} className - jss class on each item
 * @param {GridDirection} direction - the main axis; direction in which items will flow in a container
 * @param {boolean} enableBreakpointSpacing - if true, margins between items will scale with screen size
 * @param {GridJustification} justify - defines alignment along the main axis
 * @param {number} spacing - margin between items - ((0 thru 10) * theme spacing unit)px
 * @param {TextAlign} textAlign - element alignment within each item
 * @param {GridWrap} wrap - how to place items overflowing the container
 * @param {number} xs - (auto, 0-12) number of gutters per item at the given breakpoint
 * @param {number} sm - (auto, 0-12) number of gutters per item at the given breakpoint
 * @param {number} md - (auto, 0-12) number of gutters per item at the given breakpoint
 * @param {number} lg - (auto, 0-12) number of gutters per item at the given breakpoint
 * @param {number} xl - (auto, 0-12) number of gutters per item at the given breakpoint
 * @return {*} - jsx
 * @constructor
 */
const ContentLayout = (
    {
        alignContent = 'flex-start',
        alignItems = 'stretch',
        children,
        classes,
        className,
        direction = 'column',
        enableBreakpointSpacing = false,
        justify = 'flex-start',
        spacing = 0,
        textAlign = 'center',
        wrap = 'nowrap',
        xs,
        sm,
        md,
        lg,
        xl
    }: Props
): Component => {
    const spacingProp = handleSpacing(spacing);
    const x = waterfallValues('auto', [xs, sm, md, lg, xl]);
    const [xsVal, smVal, mdVal, lgVal, xlVal] = x;
    return (
        <Grid
            alignContent={alignContent}
            alignItems={alignItems}
            container={true}
            direction={direction}
            justify={justify}
            spacing={spacingProp}
            wrap={wrap}
        >
            {[].concat(children).map((child, index) => (
                <Grid
                    className={`${enableBreakpointSpacing ? classes.breakpointSpacing : ''} ${Boolean(className) ? className : ''}`}
                    item={true}
                    key={index}
                    lg={lgVal}
                    md={mdVal}
                    sm={smVal}
                    style={{
                        textAlign: textAlign
                    }}
                    xl={xlVal}
                    xs={xsVal}
                >
                    {child}
                </Grid>
            ))}
        </Grid>
    );
};

const styles = (theme) => ({
    breakpointSpacing: {
        marginBottom: 0,
        [theme.breakpoints.up('sm')]: {
            marginBottom: theme.spacing(1)
        },
        [theme.breakpoints.up('md')]: {
            marginBottom: theme.spacing(2)
        },
        [theme.breakpoints.up('lg')]: {
            marginBottom: theme.spacing(2.5)
        },
        [theme.breakpoints.up('xl')]: {
            marginBottom: theme.spacing(3)
        }
    }
});

export default withStyles(styles)(ContentLayout);
