import React, {useState} from 'react';
import {Button, DialogActions, TextField, DialogContent, DialogTitle, Dialog} from '@material-ui/core';
import SportingEvent from '../../models/sporting-event';
import * as R from 'ramda';
import {DateTimePicker} from '@material-ui/pickers';
import moment from 'moment';
import ContentLayout from '../content-layout';

type ThemeMenuProps = {
    open: boolean,
    id: string,
    model?: SportingEvent,
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
                <ContentLayout
                    direction={'row'}
                    spacing={1}
                >
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
                </ContentLayout>
                <ContentLayout
                    direction={'row'}
                    spacing={1}
                >
                    <TextField
                        label={'Season'}
                        onChange={event => handleChange('season', event.target.value)}
                        value={sportingEvent.season || ''}
                    />
                </ContentLayout>
                <ContentLayout
                    direction={'row'}
                    spacing={1}
                >
                    <TextField
                        label={'Location'}
                        onChange={event => handleChange('location', event.target.value)}
                        value={sportingEvent.location || ''}
                    />
                    <DateTimePicker
                        format={'MMM D, Y h:mm A'}
                        label={'Date & Time'}
                        onChange={date => {
                            const dateTime = moment(date).toISOString(true);
                            handleChange('dateTime', dateTime);
                        }}
                        value={Boolean(sportingEvent.dateTime) && moment(sportingEvent.dateTime).isValid() ? moment(sportingEvent.dateTime) : null}
                    />
                </ContentLayout>
                <ContentLayout
                    direction={'row'}
                    spacing={1}
                >
                    <TextField
                        label={'Home Team Id'}
                        onChange={event => handleChange('homeTeamId', event.target.value)}
                        value={sportingEvent.homeTeamId || ''}
                    />
                    <TextField
                        label={'Home Team Score'}
                        onChange={event => handleChange('homeTeamScore', event.target.value)}
                        value={sportingEvent.homeTeamScore || ''}
                    />
                </ContentLayout>
                <ContentLayout
                    direction={'row'}
                    spacing={1}
                >
                    <TextField
                        label={'Away Team Id'}
                        onChange={event => handleChange('awayTeamId', event.target.value)}
                        value={sportingEvent.awayTeamId || ''}
                    />
                    <TextField
                        label={'Away Team Score'}
                        onChange={event => handleChange('awayTeamScore', event.target.value)}
                        value={sportingEvent.awayTeamScore || ''}
                    />
                </ContentLayout>
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
                    disabled={!SportingEvent.isValid(sportingEvent)}
                    onClick={() => onSubmit(sportingEvent)}
                >
                    {'Submit'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default SportingEventDialogEdit;