// @flow
import React, {Component, useEffect, useState} from 'react';
import {Typography, Button} from '@material-ui/core';
import {useDispatch, useSelector} from 'react-redux';
import AppHeader from '../../components/app-header';
import ScreenLayout from '../../components/screen-layout';
import ContentLayout from '../../components/content-layout';
import {SportsHockey as SportsHockeyIcon} from '@material-ui/icons';
import {fetchFullstrideGamesAsync} from '../../actions/fullstride-games';
import * as R from 'ramda';
import FullstrideGame from '../../models/fullstride-game';
import createScreen from '../../models/screen';

const FullstrideGames = (): Component => {
    const {loading, data, error} = useSelector(state => state.fullstrideGames);
    const dispatch = useDispatch();
    const [shouldFetch, setShouldFetch] = useState(true);

    useEffect(() => {
        if (shouldFetch) {
            dispatch(fetchFullstrideGamesAsync());
            setShouldFetch(false);
        }
    }, [dispatch, shouldFetch]);


    const x = Object.values(data);
    const list = R.reduce((acc, item) => {
        const game = FullstrideGame.create(item);
        const element = (
            <div
                key={game.id}
            >
                <Typography variant={'body2'}>
                    {game.id}
                </Typography>
                <Typography variant={'body2'}>
                    {game.season}
                </Typography>
                <Typography variant={'body2'}>
                    {game.dateTime}
                </Typography>
                <Typography variant={'body2'}>
                    {game.rink}
                </Typography>
                <Typography variant={'body2'}>
                    {game.teams}
                </Typography>
            </div>
        );

        return R.append(element, acc);
    }, [], x);

    return (
        <ScreenLayout
            header={<AppHeader/>}
        >
            <ContentLayout
                enableBreakpointSpacing={true}
                spacing={24}
            >
                <Typography variant={'h5'}>
                    {'Fullstride Games'}
                </Typography>
                <Typography variant={'body1'}>
                    {'This is the index page.'}
                </Typography>
                <Typography variant={'body1'}>
                    {`loading: ${loading}`}
                </Typography>
                <Typography variant={'body1'}>
                    {`error: ${error}`}
                </Typography>
                <Button
                    href={null}
                    onClick={() => setShouldFetch(true)}
                >
                    {'refresh'}
                </Button>
                {list}
            </ContentLayout>
        </ScreenLayout>
    );
};

export const FullstrideGamesPath = '/fullstride-games';
export const FullstrideGamesName = 'Fullstride Games';
export const FullstrideGamesIcon = SportsHockeyIcon;
export const FullstrideGamesScreen = createScreen({Component: FullstrideGames, Path: FullstrideGamesPath, Name: FullstrideGamesName, Icon: FullstrideGamesIcon});
export default FullstrideGames;
