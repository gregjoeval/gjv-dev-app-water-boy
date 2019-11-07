// @flow
import React, {Component} from 'react';
import {Button, IconButton, Snackbar, Typography} from '@material-ui/core';
import AppHeader from '../../components/app-header';
import ScreenLayout from '../../components/screen-layout';
import ContentLayout from '../../components/content-layout';
import Screen from '../../models/screen';
import {useDispatch, useSelector} from 'react-redux';
import * as R from 'ramda';
import {cancelUndoableSportingEvent, getSportingEventsAsync, undoSportingEvent} from '../../actions/sportingEvents';
import {Close as CloseIcon, SportsHockey as SportsHockeyIcon} from '@material-ui/icons';
import usePolling from '../../libs/usePolling';
import useSportingEventCardList from '../../libs/useSportingEventCardList';
import useSportingEventDialogCreate from '../../libs/useSportingEventDialogCreate';

const Games = (): Component => {
    const {loading, data, error, past, canceled} = useSelector(state => state.sportingEvents);
    const dispatch = useDispatch();

    const [list, placeholderList] = useSportingEventCardList(data, true);
    const createFab = useSportingEventDialogCreate();

    usePolling(() => {
        dispatch(getSportingEventsAsync());
    }, 10 * 60 * 1000);

    const updateSnackBar = (
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

    return (
        <ScreenLayout
            header={<AppHeader/>}
        >
            {createFab}
            {updateSnackBar}
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
                    justify={'flex-start'}
                    md={4}
                    sm={6}
                    spacing={1}
                    wrap={'wrap'}
                    xl={3}
                    xs={12}
                >
                    {
                        // remove the length check to always show loading
                        loading && R.length(list) === 0
                            ? placeholderList
                            : list
                    }
                </ContentLayout>
            </ContentLayout>
        </ScreenLayout>
    );
};

export const GamesPath = '/games';
export const GamesName = 'Games';
export const GamesIcon = SportsHockeyIcon;
export const GamesScreen = Screen.create({Component: Games, Path: GamesPath, Name: GamesName, Icon: GamesIcon, hasAuth: true});
export default Games;
