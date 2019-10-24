// @flow
import React, {Component, useCallback, useEffect, useState} from 'react';
import {Button, CircularProgress, Typography} from '@material-ui/core';
import AppHeader from '../../components/app-header';
import ScreenLayout from '../../components/screen-layout';
import ContentLayout from '../../components/content-layout';
import {Home as Icon} from '@material-ui/icons';
import Screen from '../../models/screen';
import {makeStyles} from '@material-ui/styles';
import {useDispatch, useSelector} from 'react-redux';
import * as R from 'ramda';
import EventCard from '../../components/event-card';
import {getSportingEventsAsync} from '../../actions/sporting-events';
import moment from 'moment';
import SportingEvent from '../../models/sporting-event';
import type {ISportingEvent} from '../../models/sporting-event';
import type {IFullstrideGame} from '../../models/fullstride-game';

const useStyles = makeStyles(() => ({
    listContainer: {
        marginLeft: 'auto',
        marginRight: 'auto'
    }
}));

const Home = (): Component => {
    const classes = useStyles();
    const {loading, data, error} = useSelector(state => state.sportingEvents);
    const dispatch = useDispatch();
    const [shouldFetch, setShouldFetch] = useState(true);

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
            <EventCard
                dateTime={model.dateTime}
                group={model.season}
                id={model.id}
                key={model.id}
                location={model.location}
                subtext={`${model.homeTeamScore} - ${model.awayTeamScore}`}
            />
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
                    {HomeName}
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

export const HomePath = '/home';
export const HomeName = 'Home';
export const HomeIcon = Icon;
export const HomeScreen = Screen.create({Component: Home, Path: HomePath, Name: HomeName, Icon: HomeIcon});
export default Home;
