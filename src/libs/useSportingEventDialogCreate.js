import React, {Fragment, useState} from 'react';
import SportingEventDialogEdit from '../components/sporting-event-dialog-edit';
import SportingEvent from '../models/sporting-event';
import * as uuid from 'uuid';
import {getCurrentSeason} from './dateTimeHelpers';
import moment from 'moment';
import {postSportingEventAsync} from '../actions/sportingEvents';
import {Fab} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import {makeStyles} from '@material-ui/styles';
import {useDispatch} from 'react-redux';

const useStyles = makeStyles(theme => ({
    fab: {
        position: 'fixed',
        bottom: theme.spacing(4),
        right: theme.spacing(4)
    }
}));

function useSportingEventDialogCreate() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [openDialogId, setOpenDialogId] = useState(null);
    const dialogIdPrefix = 'sporting-event-dialog-';

    return (
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

export default useSportingEventDialogCreate;
