// @flow
import React, {Component} from 'react';
import {Card, CardActions, CardContent, Typography, CardHeader, Avatar} from '@material-ui/core';
import {makeStyles, useTheme} from '@material-ui/styles';
import ContentLayout from '../content-layout';
import moment from 'moment';
import {EventCardFormat} from '../../constants/dateTimeFormats';
import {Skeleton} from '@material-ui/lab';
import * as R from 'ramda';
import toMaterialStyle from 'material-color-hash';

const useStyles = makeStyles((theme) => ({
    card: {
        minWidth: theme.spacing(30)
    },
    avatar: (props) => ({
        backgroundColor: props.backgroundColor,
        color: props.color
    })
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
    awayTeam?: string,
    dateTime: string,
    location: string,
    homeTeam?: string,
    actions?: Node,
    headerAction?: Node,
};

const EventCard = ({children, group, awayTeam, dateTime, location, homeTeam, actions, headerAction}: EventCardProps): Component => {
    const initials = R.toUpper(R.join('')(R.compose(R.map(R.head), R.take(2), R.filter(x => Boolean(x)), R.split(/[^\w\d]/))(location)));
    const {backgroundColor, color} = toMaterialStyle(location);
    const classes = useStyles({backgroundColor, color});

    return (
        <Card className={classes.card}>
            <CardHeader
                action={headerAction}
                avatar={(
                    <Avatar className={classes.avatar}>
                        {initials}
                    </Avatar>
                )}
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
                        {homeTeam}
                    </Typography>
                </ContentLayout>
                <ContentLayout
                    direction={'row'}
                    justify={'space-between'}
                    wrap={'wrap'}
                >
                    <Typography variant={'body2'}>
                        {group}
                    </Typography>
                    <Typography variant={'body2'}>
                        {awayTeam}
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
