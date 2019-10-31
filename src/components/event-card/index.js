// @flow
import React, {Component} from 'react';
import {Card, CardActions, CardContent, Typography, CardHeader} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';
import ContentLayout from '../content-layout';
import moment from 'moment';
import {EventCardFormat} from '../../constants/dateTimeFormats';

const useStyles = makeStyles((theme) => ({
    card: {
        minWidth: theme.spacing(30)
    }
}));

type EventCardProps = {
    children?: Array<Node> | Node,
    group: string,
    dateTime: string,
    location: string,
    subtext: string,
    actions?: Node,
    headerAction?: Node,
};

const EventCard = ({children, group, dateTime, location, subtext, actions, headerAction}: EventCardProps): Component => {
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