// @flow
import React, {Component, Fragment, useEffect, useState} from 'react';
import {Button, CircularProgress, Typography} from '@material-ui/core';
import AppHeader from '../../components/app-header';
import ScreenLayout from '../../components/screen-layout';
import ContentLayout from '../../components/content-layout';
import Screen from '../../models/screen';
import {makeStyles} from '@material-ui/styles';
import {useDispatch, useSelector} from 'react-redux';
import * as R from 'ramda';
import EventCard from '../../components/event-card';
import SportingEvent from '../../models/sporting-event';
import {getSportingEventsAsync, updateSportingEvent} from '../../actions/sporting-events';
import SportingEventDialogEdit from '../../components/sporting-event-dialog-edit';
import {SportsHockey as SportsHockeyIcon} from '@material-ui/icons';

const useStyles = makeStyles(() => ({
    listContainer: {
        marginLeft: 'auto',
        marginRight: 'auto'
    }
}));

const Games = (): Component => {
    const classes = useStyles();
    const {loading, data, error} = useSelector(state => state.sportingEvents);
    const dispatch = useDispatch();
    const [shouldFetch, setShouldFetch] = useState(true);

    const [dialogOpen, setDialogOpen] = useState(null);
    const dialogIdPrefix = 'sporting-event-dialog-';

    useEffect(() => {
        if (shouldFetch) {
            dispatch(getSportingEventsAsync());
            setShouldFetch(false);
        }
    }, [dispatch, shouldFetch]);

    const list = R.reduce((acc, item) => {
        const model = SportingEvent.create(item);
        const element = (
            <Fragment key={model.id}>
                <SportingEventDialogEdit
                    id={`${dialogIdPrefix}${model.id}`}
                    model={model}
                    onClose={() => setDialogOpen(null)}
                    onSubmit={(value) => {
                        dispatch(updateSportingEvent(value));
                        setDialogOpen(null);
                    }}
                    open={Boolean(dialogOpen)}
                />
                <EventCard
                    dateTime={model.dateTime}
                    group={model.season}
                    id={model.id}
                    location={model.location}
                    onEdit={() => setDialogOpen(true)}
                    subtext={`${model.homeTeamScore} - ${model.awayTeamScore}`}
                />
            </Fragment>
        );

        return R.append(element, acc);
    }, [], R.values(data));

    return (
        <ScreenLayout
            header={<AppHeader/>}
        >
            <ContentLayout
                enableBreakpointSpacing={true}
                spacing={1}
            >

                <Typography variant={'h5'}>
                    {GamesName}
                </Typography>
                {
                    error && (
                        <Typography variant={'body1'}>
                            {`error: ${error}`}
                        </Typography>
                    )
                }
                <Button
                    href={null}
                    onClick={() => setShouldFetch(true)}
                >
                    {'refresh'}
                </Button>
                {
                    loading
                        ? <CircularProgress/>
                        : (
                            <ContentLayout
                                containerClassName={classes.listContainer}
                                direction={'row'}
                                justify={'center'}
                                md={'auto'}
                                sm={6}
                                spacing={1}
                                wrap={'wrap'}
                                xs={12}
                            >
                                {list}
                            </ContentLayout>
                        )
                }
            </ContentLayout>
        </ScreenLayout>
    );
};

export const GamesPath = '/games';
export const GamesName = 'Games';
export const GamesIcon = SportsHockeyIcon;
export const GamesScreen = Screen.create({Component: Games, Path: GamesPath, Name: GamesName, Icon: GamesIcon, hasAuth: true});
export default Games;
