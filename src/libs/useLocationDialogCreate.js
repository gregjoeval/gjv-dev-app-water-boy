import React, {Fragment, useState} from 'react';
import {Fab} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import {makeStyles} from '@material-ui/styles';
import {useDispatch} from 'react-redux';
import LocationDialogEdit from '../components/location-dialog-edit';
import Location from '../models/location';
import {postLocationAsync} from '../actions/locations';

const useStyles = makeStyles(theme => ({
    fab: {
        position: 'fixed',
        bottom: theme.spacing(4),
        right: theme.spacing(4)
    }
}));

function useLocationDialogCreate() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [openDialogId, setOpenDialogId] = useState(null);
    const dialogIdPrefix = 'location-dialog-';

    return (
        <Fragment>
            <LocationDialogEdit
                id={`${dialogIdPrefix}create`}
                model={Location.create()}
                onClose={() => setOpenDialogId(null)}
                onSubmit={(value) => {
                    dispatch(postLocationAsync(value));
                    setOpenDialogId(null);
                }}
                open={Boolean(openDialogId === `${dialogIdPrefix}create`)}
            />
            <Fab
                className={classes.fab}
                color={'primary'}
                onClick={() => setOpenDialogId(`${dialogIdPrefix}create`)}
            >
                <EditIcon/>
            </Fab>
        </Fragment>
    );
}

export default useLocationDialogCreate;
