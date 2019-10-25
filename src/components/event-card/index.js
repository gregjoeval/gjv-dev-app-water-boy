// @flow
import React, {Component} from 'react';
import {Card, CardActions, CardContent, Typography, Button} from '@material-ui/core';
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
    onEdit?: Function,
    onDelete?: Function
};

const EventCard = ({children, group, dateTime, location, subtext, onEdit, onDelete}: EventCardProps): Component => {
    const classes = useStyles();
    return (
        <Card className={classes.card}>
            <CardContent>
                <ContentLayout
                    direction={'row'}
                    justify={'space-between'}
                    wrap={'wrap'}
                >
                    <Typography variant={'body2'}>
                        {moment(dateTime).format(EventCardFormat)}
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
                        {location}
                    </Typography>
                    <Typography variant={'body2'}>
                        {subtext}
                    </Typography>
                </ContentLayout>
                {children}
            </CardContent>
            {
                onEdit || onDelete
                    ? (
                        <CardActions>
                            {
                                onEdit
                                    ? (
                                        <Button onClick={onEdit}>
                                            {'edit'}
                                        </Button>
                                    )
                                    : null
                            }
                            {
                                onDelete
                                    ? (
                                        <Button onClick={onDelete}>
                                            {'delete'}
                                        </Button>
                                    )
                                    : null
                            }
                        </CardActions>
                    )
                    : null
            }
        </Card>
    );
};

export default EventCard;