import React, {Component} from 'react';
import {Typography} from '@material-ui/core';
import AppHeader from '../../components/app-header';
import ScreenLayout from '../../components/screen-layout';
import ContentLayout from '../../components/content-layout';
import {LocationOn as Icon} from '@material-ui/icons';
import Screen from '../../models/screen';
import {useDispatch, useSelector} from 'react-redux';
import usePolling from '../../libs/usePolling';
import {cancelUndoableLocation, getLocationsAsync, undoLocation} from '../../actions/locations';
import useLocationCardList from '../../libs/useLocationCardList';
import useLocationDialogCreate from '../../libs/useLocationDialogCreate';
import UndoUpdateSnackBar from '../../components/update-snack-bar';

const Locations = (): Component => {
    const {loading, data, error, past, canceled} = useSelector(state => state.locations);
    const dispatch = useDispatch();

    usePolling(() => {
        dispatch(getLocationsAsync());
    }, 10 * 60 * 1000);

    const [list, placeholderList] = useLocationCardList(data, true);
    const createFab = useLocationDialogCreate();

    return (
        <ScreenLayout
            header={<AppHeader/>}
        >
            {createFab}
            <UndoUpdateSnackBar
                canceled={canceled}
                closeAction={() => dispatch(cancelUndoableLocation())}
                id={'location-snackbar-update-undo'}
                past={past}
                undoAction={() => dispatch(undoLocation())}
            />
            <ContentLayout
                enableBreakpointSpacing={true}
                spacing={1}
            >
                <Typography variant={'h5'}>
                    {LocationsName}
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
                            ? placeholderList
                            : list
                    }
                </ContentLayout>
            </ContentLayout>
        </ScreenLayout>
    );
};

export const LocationsPath = '/locations';
export const LocationsName = 'Locations';
export const LocationsIcon = Icon;
export const LocationsScreen = Screen.create({Component: Locations, Path: LocationsPath, Name: LocationsName, Icon: LocationsIcon});
export default Locations;
