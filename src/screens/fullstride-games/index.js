// @flow
import React, {Component, useState, Fragment} from 'react';
import {Typography, IconButton} from '@material-ui/core';
import {useDispatch, useSelector} from 'react-redux';
import AppHeader from '../../components/app-header';
import ScreenLayout from '../../components/screen-layout';
import ContentLayout from '../../components/content-layout';
import EventIcon from '@material-ui/icons/Event';
import {getFullstrideGamesAsync} from '../../actions/fullstrideGames';
import * as R from 'ramda';
import FullstrideGame from '../../models/fullstride-game';
import Screen from '../../models/screen';
import EventCard, {EventCardPlaceholder} from '../../components/event-card';
import type {IFullstrideGame} from '../../models/fullstride-game';
import moment from 'moment';
import FullstrideGameDialogMerge from '../../components/fullstride-game-dialog-merge';
import {postSportingEventAsync} from '../../actions/sportingEvents';
import CallMergeIcon from '@material-ui/icons/CallMerge';
import usePolling from '../../libs/usePolling';

const FullstrideGames = (): Component => {
    const {loading, data, error} = useSelector(state => state.fullstrideGames);
    const dispatch = useDispatch();

    const [openDialogId, setOpenDialogId] = useState(null);
    const dialogIdPrefix = 'fullstride-game-dialog-';

    usePolling(() => {
        dispatch(getFullstrideGamesAsync());
    }, 10 * 60 * 1000);

    const values = R.values(data);
    const filteredData = R.sortWith([R.descend((item: IFullstrideGame) => {
        const dateTimeA = moment(item.dateTime);
        return dateTimeA.valueOf();
    })], values);

    const list = R.reduce((acc, item) => {
        const model = FullstrideGame.create(item);
        const element = (
            <Fragment key={model.id}>
                <FullstrideGameDialogMerge
                    id={`${dialogIdPrefix}${model.id}`}
                    model={model}
                    onClose={() => setOpenDialogId(null)}
                    onSubmit={(value) => {
                        dispatch(postSportingEventAsync(value));
                        setOpenDialogId(null);
                    }}
                    open={Boolean(openDialogId === `${dialogIdPrefix}${model.id}`)}
                />
                <EventCard
                    dateTime={model.dateTime}
                    group={model.season}
                    headerAction={(
                        <IconButton
                            onClick={() => setOpenDialogId(`${dialogIdPrefix}${model.id}`)}
                            size={'small'}
                        >
                            <CallMergeIcon/>
                        </IconButton>
                    )}
                    id={model.number}
                    location={model.rink}
                    subtext={model.teams}
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
                    {FullstrideGamesName}
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
                                />
                                , 12)
                            : list
                    }
                </ContentLayout>
            </ContentLayout>
        </ScreenLayout>
    );
};

export const FullstrideGamesPath = '/fullstride-games';
export const FullstrideGamesName = 'Fullstride Games';
export const FullstrideGamesIcon = EventIcon;
export const FullstrideGamesScreen = Screen.create({Component: FullstrideGames, Path: FullstrideGamesPath, Name: FullstrideGamesName, Icon: FullstrideGamesIcon, hasAuth: true});
export default FullstrideGames;
