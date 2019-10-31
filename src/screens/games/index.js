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
import {deleteSportingEventAsync, getSportingEventsAsync, postSportingEventAsync, putSportingEventAsync} from '../../actions/sportingEvents';
import SportingEventDialogEdit from '../../components/sporting-event-dialog-edit';
import {SportsHockey as SportsHockeyIcon} from '@material-ui/icons';
import moment from 'moment';
import {getCurrentSeason} from '../../libs/dateTimeHelpers';
import * as uuid from 'uuid';
import type {IFullstrideGame} from '../../models/fullstride-game';

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

    const [openDialogId, setOpenDialogId] = useState(null);
    const dialogIdPrefix = 'sporting-event-dialog-';

    useEffect(() => {
        if (shouldFetch) {
            dispatch(getSportingEventsAsync());
            setShouldFetch(false);
        }
    }, [dispatch, shouldFetch]);

    const values = R.values(data);
    const filteredData = R.sortWith([R.descend((item: IFullstrideGame) => {
        const dateTimeA = moment(item.dateTime);
        return dateTimeA.valueOf();
    })], values);

    const list = R.reduce((acc, item) => {
        const model = SportingEvent.create(item);
        const element = (
            <Fragment key={model.id}>
                <SportingEventDialogEdit
                    id={`${dialogIdPrefix}${model.id}`}
                    model={model}
                    onClose={() => setOpenDialogId(null)}
                    onSubmit={(value) => {
                        dispatch(putSportingEventAsync(value));
                        setOpenDialogId(null);
                    }}
                    open={Boolean(openDialogId === `${dialogIdPrefix}${model.id}`)}
                />
                <EventCard
                    actions={[
                        (
                            <Button
                                key={`${dialogIdPrefix}${model.id}`}
                                onClick={() => setOpenDialogId(`${dialogIdPrefix}${model.id}`)}
                            >
                                {'edit'}
                            </Button>
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
                    location={model.location}
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
                    <Button
                        href={null}
                        onClick={() => setShouldFetch(true)}
                    >
                        {'refresh'}
                    </Button>
                </ContentLayout>
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
