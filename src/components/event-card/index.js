// @flow
import React, {Component} from 'react';
import {Card, CardActions, CardContent, Typography, CardHeader} from '@material-ui/core';
import {makeStyles, useTheme} from '@material-ui/styles';
import ContentLayout from '../content-layout';
import moment from 'moment';
import {EventCardFormat} from '../../constants/dateTimeFormats';
import {Skeleton} from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({
    card: {
        minWidth: theme.spacing(30)
    }
}));

type EventCardPlaceholderProps = {
    withActions?: boolean
}

export const EventCardPlaceholder = ({withActions = false}: EventCardPlaceholderProps) => {
    const theme = useTheme();
    const heightCoefficient = withActions ? 22.5 : 17;
    return (
        <Skeleton
            height={theme.spacing(heightCoefficient)}
            variant={'rect'}
        />
    );
};

type EventCardProps = {
    children?: Array<Node> | Node,
    group: string,
    subgroup?: string,
    dateTime: string,
    location: string,
    subtext?: string,
    actions?: Node,
    headerAction?: Node,
};

const EventCard = ({children, group, subgroup, dateTime, location, subtext, actions, headerAction}: EventCardProps): Component => {
    const classes = useStyles();
    return (
        <Card className={classes.card}>
            <CardHeader
                action={headerAction}
                title={(
                    <Typography>
                        {moment(dateTime).format(EventCardFormat)}
                    </Typography>
                )}
            />
            <CardContent>
                <ContentLayout
                    direction={'row'}
                    justify={'space-between'}
                    wrap={'wrap'}
                >
                    <Typography variant={'body2'}>
                        {location}
                    </Typography>
                    <Typography variant={'body2'}>
                        {group}
                    </Typography>
                </ContentLayout>
                <ContentLayout
                    direction={'row'}
                    justify={'space-between'}
                    wrap={'wrap'}
                >
                    <Typography variant={'body2'}>
                        {subtext}
                    </Typography>
                    <Typography variant={'body2'}>
                        {subgroup}
                    </Typography>
                </ContentLayout>
                {children}
            </CardContent>
            {
                actions && actions.length
                    ? (
                        <CardActions>
                            {actions}
                        </CardActions>
                    )
                    : null
            }
        </Card>
    );
};

export default EventCard;
