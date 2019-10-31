// @flow
import React, {Component, useEffect, useState, Fragment} from 'react';
import {Typography, Button, CircularProgress, IconButton} from '@material-ui/core';
import {useDispatch, useSelector} from 'react-redux';
import AppHeader from '../../components/app-header';
import ScreenLayout from '../../components/screen-layout';
import ContentLayout from '../../components/content-layout';
import EventIcon from '@material-ui/icons/Event';
import {getFullstrideGamesAsync} from '../../actions/fullstrideGames';
import * as R from 'ramda';
import FullstrideGame from '../../models/fullstride-game';
import Screen from '../../models/screen';
import EventCard from '../../components/event-card';
import {makeStyles} from '@material-ui/styles';
import type {IFullstrideGame} from '../../models/fullstride-game';
import moment from 'moment';
import FullstrideGameDialogMerge from '../../components/fullstride-game-dialog-merge';
import {postSportingEventAsync} from '../../actions/sportingEvents';
import CallMergeIcon from '@material-ui/icons/CallMerge';

const useStyles = makeStyles(() => ({
    listContainer: {
        marginLeft: 'auto',
        marginRight: 'auto'
    }
}));

const FullstrideGames = (): Component => {
    const classes = useStyles();
    const {loading, data, error} = useSelector(state => state.fullstrideGames);
    const dispatch = useDispatch();
    const [shouldFetch, setShouldFetch] = useState(true);

    const [openDialogId, setOpenDialogId] = useState(null);
    const dialogIdPrefix = 'fullstride-game-dialog-';

    useEffect(() => {
        if (shouldFetch) {
            dispatch(getFullstrideGamesAsync());
            setShouldFetch(false);
        }
    }, [dispatch, shouldFetch]);

    const values = R.values(data);
    const filteredData = R.sortWith([R.descend((item: IFullstrideGame) => {
        const dateTimeA = moment(item.dateTime);
        return dateTimeA.valueOf();
    })], values);

    const list = R.reduce((acc, item) => {
        const model = FullstrideGame.create(item);
        const element = (
            <Fragment>
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

export const FullstrideGamesPath = '/fullstride-games';
export const FullstrideGamesName = 'Fullstride Games';
export const FullstrideGamesIcon = EventIcon;
export const FullstrideGamesScreen = Screen.create({Component: FullstrideGames, Path: FullstrideGamesPath, Name: FullstrideGamesName, Icon: FullstrideGamesIcon, hasAuth: true});
export default FullstrideGames;
