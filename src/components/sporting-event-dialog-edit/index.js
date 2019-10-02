import React, {useState} from 'react';
import {Button, DialogActions, TextField, DialogContentText, DialogContent, DialogTitle, Dialog} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';
import SportingEvent from '../../models/sporting-event';
import * as R from 'ramda';
import {DateTimePicker} from '@material-ui/pickers';
import moment from 'moment';

const useStyles = makeStyles({});

type ThemeMenuProps = {
    open: boolean,
    id: string,
    model: SportingEvent,
    onClose: Function,
    onSubmit: (SportingEvent) => void
};

const SportingEventDialogEdit = ({open, id, model, onClose, onSubmit}: ThemeMenuProps) => {
    const [sportingEvent, setSportingEvent] = useState(SportingEvent.create(model));
    const handleChange = R.curry((propPath, value) => {
        const path = [].concat(propPath);
        const newModel = R.assocPath(path, value, sportingEvent);
        setSportingEvent(newModel);
    });
    const classes = useStyles();
    return (
        <Dialog
            aria-labelledby={'form-dialog-title'}
            id={id}
            onClose={onClose}
            open={open}
        >
            <DialogTitle id='form-dialog-title'>
                {'Edit'}
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {'Edit the Sporting Event'}
                </DialogContentText>
                <TextField
                    label={'Location'}
                    onChange={event => handleChange('location', event.target.value)}
                    value={sportingEvent.location || ''}
                />
                <DateTimePicker
                    label={'Date & Time'}
                    onChange={date => {
                        const dateTime = moment(date).toISOString(true);
                        handleChange('dateTime', dateTime);
                    }}
                    value={sportingEvent.dateTime || ''}
                />
                <TextField
                    label={'Home Team Id'}
                    onChange={event => handleChange('homeTeamId', event.target.value)}
                    value={sportingEvent.homeTeamId || ''}
                />
                <TextField
                    label={'Away Team Id'}
                    onChange={event => handleChange('awayTeamId', event.target.value)}
                    value={sportingEvent.awayTeamId || ''}
                />
                <TextField
                    label={'Home Team Id'}
                    onChange={event => handleChange('homeTeamScore', event.target.value)}
                    value={sportingEvent.homeTeamScore || ''}
                />
                <TextField
                    label={'Away Team Id'}
                    onChange={event => handleChange('awayTeamScore', event.target.value)}
                    value={sportingEvent.awayTeamScore || ''}
                />
                <TextField
                    label={'League'}
                    onChange={event => handleChange('league', event.target.value)}
                    value={sportingEvent.league || ''}
                />
                <TextField
                    label={'Division'}
                    onChange={event => handleChange('division', event.target.value)}
                    value={sportingEvent.division || ''}
                />
                <TextField
                    label={'Season'}
                    onChange={event => handleChange('season', event.target.value)}
                    value={sportingEvent.season || ''}
                />
            </DialogContent>
            <DialogActions>
                <Button
                    color='primary'
                    onClick={onClose}
                >
                    {'Cancel'}
                </Button>
                <Button
                    color={'primary'}
                    onClick={() => onSubmit(sportingEvent)}
                >
                    {'Submit'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default SportingEventDialogEdit;