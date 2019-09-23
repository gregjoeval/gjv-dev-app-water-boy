// @flow
import React, {Component} from 'react';
import {Card, CardContent, Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';
import ContentLayout from '../content-layout';

const useStyles = makeStyles((theme) => ({
    card: {
        minWidth: theme.spacing(30)
    }
}));

type EventCardProps = {
    children?: Array<Node> | Node,
    id: string,
    group: string,
    dateTime: string,
    location: string,
    subtext: string
};

const EventCard = ({children, id, group, dateTime, location, subtext}: EventCardProps): Component => {
    const classes = useStyles();
    return (
        <Card className={classes.card}>
            <CardContent>
                <ContentLayout
                    direction={'row'}
                    justify={'space-between'}
                >
                    <Typography variant={'body2'}>
                        {group}
                    </Typography>
                    <Typography variant={'body2'}>
                        {id}
                    </Typography>
                </ContentLayout>
                <ContentLayout
                    direction={'row'}
                    justify={'space-between'}
                >
                    <Typography variant={'body2'}>
                        {dateTime}
                    </Typography>
                    <Typography variant={'body2'}>
                        {location}
                    </Typography>
                </ContentLayout>
                <ContentLayout
                    direction={'row'}
                    justify={'space-between'}
                >
                    <Typography variant={'body2'}>
                        {subtext}
                    </Typography>
                </ContentLayout>
                {children}
            </CardContent>
        </Card>
    );
};

export default EventCard;