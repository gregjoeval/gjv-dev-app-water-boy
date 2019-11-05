// @flow
import React, {Component, Fragment, useState} from 'react';
import {Button, IconButton, Snackbar, Typography, Tooltip} from '@material-ui/core';
import AppHeader from '../../components/app-header';
import ScreenLayout from '../../components/screen-layout';
import ContentLayout from '../../components/content-layout';
import Screen from '../../models/screen';
import {useDispatch, useSelector} from 'react-redux';
import * as R from 'ramda';
import EventCard, {EventCardPlaceholder} from '../../components/event-card';
import SportingEvent from '../../models/sporting-event';
import {cancelUndoableSportingEvent, deleteSportingEventAsync, getSportingEventsAsync, postSportingEventAsync, putSportingEventAsync, undoSportingEvent, updateSportingEvent} from '../../actions/sportingEvents';
import SportingEventDialogEdit from '../../components/sporting-event-dialog-edit';
import {Close as CloseIcon, SportsHockey as SportsHockeyIcon} from '@material-ui/icons';
import moment from 'moment';
import {getCurrentSeason, getTimeFromNow} from '../../libs/dateTimeHelpers';
import * as uuid from 'uuid';
import type {IFullstrideGame} from '../../models/fullstride-game';
import usePolling from '../../libs/usePolling';
import NewReleasesIcon from '@material-ui/icons/NewReleases';

const Games = (): Component => {
    const {loading, data, error, lastUpdated, past, canceled} = useSelector(state => state.sportingEvents);
    const dispatch = useDispatch();

    const [nearestFutureEventId, setNearestFutureEventId] = useState(null);
    const [timeUntilNextEvent, setTimeUntilNextEvent] = useState(null);

    const [openDialogId, setOpenDialogId] = useState(null);
    const dialogIdPrefix = 'sporting-event-dialog-';

    const values = R.values(data);
    const filteredData = R.sortWith([R.descend((item: IFullstrideGame) => {
        const dateTimeA = moment(item.dateTime);
        return dateTimeA.valueOf();
    })], values);

    usePolling(() => {
        dispatch(getSportingEventsAsync());
    }, 10 * 60 * 1000);

    const updatedSnackBar = (
        <Snackbar
            action={[
                <Button
                    color='secondary'
                    key='undo'
                    onClick={() => dispatch(undoSportingEvent())}
                    size='small'
                >
                    {'undo'}
                </Button>,
                <IconButton
                    aria-label='close'
                    color='inherit'
                    key='close'
                    onClick={() => {
                        dispatch(cancelUndoableSportingEvent());
                    }}
                >
                    <CloseIcon/>
                </IconButton>
            ]}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left'
            }}
            autoHideDuration={6000}
            ContentProps={{
                'aria-describedby': 'sporting-event-snackbar-undo'
            }}
            message={(
                <Typography
                    id={'sporting-event-snackbar-undo'}
                    variant={'body1'}
                >
                    {'Updated.'}
                </Typography>
            )}
            onClose={() => {
                dispatch(cancelUndoableSportingEvent());
            }}
            open={!canceled && R.length(past) > 0}
        />
    );

    const list = R.reduce((acc, item) => {
        const model = SportingEvent.create(item);
        const timeFromNow = getTimeFromNow(model.dateTime, 'hours');
        if (timeFromNow < 0) {
            if (!timeUntilNextEvent || timeFromNow < timeUntilNextEvent) {
                setNearestFutureEventId(model.id);
                setTimeUntilNextEvent(timeFromNow);
            }
        }

        const element = (
            <Fragment key={model.id}>
                <SportingEventDialogEdit
                    id={`${dialogIdPrefix}${model.id}`}
                    model={model}
                    onClose={() => setOpenDialogId(null)}
                    onSubmit={(value) => {
                        dispatch(updateSportingEvent(SportingEvent.create({...value, edited: true})));
                        setOpenDialogId(null);
                    }}
                    open={Boolean(openDialogId === `${dialogIdPrefix}${model.id}`)}
                />
                <EventCard
                    actions={[
                        (
                            model.edited
                                ? (
                                    <Button
                                        key={`put-${model.id}`}
                                        onClick={() => dispatch(putSportingEventAsync(SportingEvent.create({...model, edited: false})))}
                                    >
                                        {'save'}
                                    </Button>
                                )
                                : (
                                    <Button
                                        key={`${dialogIdPrefix}${model.id}`}
                                        onClick={() => setOpenDialogId(`${dialogIdPrefix}${model.id}`)}
                                    >
                                        {'edit'}
                                    </Button>
                                )
                        ),
                        (
                            <Button
                                key={`delete-${model.id}`}
                                onClick={() => dispatch(deleteSportingEventAsync(model.id))}
                            >
                                {'delete'}
                            </Button>
                        )
                    ]}
                    dateTime={model.dateTime}
                    group={model.season}
                    headerAction={(
                        model.id === nearestFutureEventId && (
                            <Tooltip title={moment(model.dateTime).fromNow()}>
                                <IconButton size={'small'}>
                                    <NewReleasesIcon/>
                                </IconButton>
                            </Tooltip>
                        )
                    )}
                    location={model.location}
                    subgroup={model.division}
                    subtext={`${model.homeTeamScore} - ${model.awayTeamScore}`}
                />
            </Fragment>
        );

        return R.append(element, acc);
    }, [], filteredData);

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
                            {`error: ${error.message}`}
                        </Typography>
                    )
                }
                <ContentLayout
                    direction={'row'}
                    justify={'center'}
                >
                    <Fragment>
                        <SportingEventDialogEdit
                            id={`${dialogIdPrefix}create`}
                            model={SportingEvent.create({
                                id: uuid(),
                                league: 'Fullstride',
                                division: 'Upper Bronze',
                                season: `${getCurrentSeason()} ${moment().year()}`
                            })}
                            onClose={() => setOpenDialogId(null)}
                            onSubmit={(value) => {
                                dispatch(postSportingEventAsync(value));
                                setOpenDialogId(null);
                            }}
                            open={Boolean(openDialogId === `${dialogIdPrefix}create`)}
                        />
                        <Button
                            onClick={() => setOpenDialogId(`${dialogIdPrefix}create`)}
                        >
                            {'create'}
                        </Button>
                    </Fragment>
                </ContentLayout>
                <ContentLayout
                    direction={'row'}
                    justify={'flex-start'}
                    md={4}
                    sm={6}
                    spacing={1}
                    wrap={'wrap'}
                    xl={3}
                    xs={12}
                >
                    {
                        loading
                            ? R.repeat(
                                <EventCardPlaceholder
                                    key={'EventCardPlaceholder'}
                                    withActions={true}
                                />
                                , 12)
                            : (
                                list
                            )
                    }
                </ContentLayout>
            </ContentLayout>
            {updatedSnackBar}
        </ScreenLayout>
    );
};

export const GamesPath = '/games';
export const GamesName = 'Games';
export const GamesIcon = SportsHockeyIcon;
export const GamesScreen = Screen.create({Component: Games, Path: GamesPath, Name: GamesName, Icon: GamesIcon, hasAuth: true});
export default Games;
