import React, {useState} from 'react';
import {Button, DialogActions, TextField, DialogContent, DialogTitle, Dialog, IconButton} from '@material-ui/core';
import SportingEvent from '../../models/sporting-event';
import * as R from 'ramda';
import {DateTimePicker} from '@material-ui/pickers';
import moment from 'moment';
import ContentLayout from '../content-layout';
import FullstrideGame from '../../models/fullstride-game';
import type {IFullstrideGame} from '../../models/fullstride-game';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import {EventCardFormat, FullstrideGameFormat} from '../../constants/dateTimeFormats';

type handleChangeProps = {
    setFunction: (any) => void,
    propPath: string | Array<string>,
    value: any
};

const handleChange = R.curry((model, setFunction, propPath, value): handleChangeProps => {
    const path = [].concat(propPath);
    const newModel = R.assocPath(path, value, model);
    setFunction(newModel);
});

type ReplaceValueButtonProps = {
    replaceValueFunc: () => void
}

const ReplaceValueButton = ({replaceValueFunc}: ReplaceValueButtonProps) => (
    <IconButton onClick={() => replaceValueFunc()}>
        <ArrowRightAltIcon/>
    </IconButton>
);

type ReplaceValueRowProps<A, B> = {
    label: string,
    modelLeft: A,
    setModelLeft: (A) => void,
    modelLeftPropPath: string | Array<string>,
    modelRight: B,
    setModelRight: (B) => void,
    modelRightPropPath: string | Array<string>,
    defaultValue?: any,
    defaultInputValue?: any
};

const ReplaceValueRow = ({label, modelLeft, setModelLeft, modelLeftPropPath, modelRight, setModelRight, modelRightPropPath, defaultValue = '', defaultInputValue = ''}: ReplaceValueRowProps) => {
    const modelLeftProp = R.path([].concat(modelLeftPropPath), modelLeft);
    const modelRightProp = R.path([].concat(modelRightPropPath), modelRight);
    return (
        <ContentLayout
            direction={'row'}
            spacing={1}
        >
            <TextField
                label={label}
                onChange={event => handleChange(modelLeft, setModelLeft, modelLeftPropPath, event.target.value)}
                value={modelLeftProp || defaultValue || defaultInputValue}
            />
            <ReplaceValueButton replaceValueFunc={() => handleChange(modelRight, setModelRight, modelRightPropPath, modelLeftProp || defaultValue)}/>
            <TextField
                label={label}
                onChange={event => handleChange(setModelRight, modelRightPropPath, event.target.value)}
                value={modelRightProp || defaultInputValue}
            />
        </ContentLayout>
    );
};

type FullstrideGameDialogMergeProps = {
    open: boolean,
    id: string,
    model?: IFullstrideGame,
    onClose: Function,
    onSubmit: (SportingEvent) => void
};

const FullstrideGameDialogMerge = ({open, id, model, onClose, onSubmit}: FullstrideGameDialogMergeProps) => {
    const [fullstrideGame, setFullstrideGame] = useState(FullstrideGame.create(model));
    const [sportingEvent, setSportingEvent] = useState(SportingEvent.create(model));
    return (
        <Dialog
            aria-labelledby={'form-dialog-title'}
            id={id}
            onClose={onClose}
            open={open}
        >
            <DialogTitle id='form-dialog-title'>
                {'Convert Fullstride Game to Sporting Event'}
            </DialogTitle>
            <DialogContent>
                <ReplaceValueRow
                    defaultValue={'Fullstride'}
                    label={'League'}
                    modelLeft={fullstrideGame}
                    modelLeftPropPath={'league'}
                    modelRight={sportingEvent}
                    modelRightPropPath={'league'}
                    setModelLeft={setFullstrideGame}
                    setModelRight={setSportingEvent}
                />
                <ReplaceValueRow
                    defaultValue={'Upper Bronze'}
                    label={'Division'}
                    modelLeft={fullstrideGame}
                    modelLeftPropPath={'division'}
                    modelRight={sportingEvent}
                    modelRightPropPath={'division'}
                    setModelLeft={setFullstrideGame}
                    setModelRight={setSportingEvent}
                />
                <ReplaceValueRow
                    label={'Season'}
                    modelLeft={fullstrideGame}
                    modelLeftPropPath={'season'}
                    modelRight={sportingEvent}
                    modelRightPropPath={'season'}
                    setModelLeft={setFullstrideGame}
                    setModelRight={setSportingEvent}
                />
                <ReplaceValueRow
                    label={'Location'}
                    modelLeft={fullstrideGame}
                    modelLeftPropPath={'rink'}
                    modelRight={sportingEvent}
                    modelRightPropPath={'location'}
                    setModelLeft={setFullstrideGame}
                    setModelRight={setSportingEvent}
                />
                <ContentLayout
                    direction={'row'}
                    spacing={1}
                >
                    <DateTimePicker
                        format={FullstrideGameFormat}
                        label={'Date & Time'}
                        onChange={date => {
                            const dateTime = moment(date).toISOString(true);
                            handleChange(fullstrideGame, setFullstrideGame, 'dateTime', dateTime);
                        }}
                        value={Boolean(fullstrideGame.dateTime) && moment(fullstrideGame.dateTime).isValid() ? moment(fullstrideGame.dateTime) : null}
                    />
                    <ReplaceValueButton replaceValueFunc={() => handleChange(sportingEvent, setSportingEvent, 'dateTime', fullstrideGame.dateTime)}/>
                    <DateTimePicker
                        format={EventCardFormat}
                        label={'Date & Time'}
                        onChange={date => {
                            const dateTime = moment(date).toISOString(true);
                            handleChange(sportingEvent, setSportingEvent, 'dateTime', dateTime);
                        }}
                        value={Boolean(sportingEvent.dateTime) && moment(sportingEvent.dateTime).isValid() ? moment(sportingEvent.dateTime) : null}
                    />
                </ContentLayout>
                <ReplaceValueRow
                    label={'Home Team Id'}
                    modelLeft={fullstrideGame}
                    modelLeftPropPath={'homeTeamId'}
                    modelRight={sportingEvent}
                    modelRightPropPath={'homeTeamId'}
                    setModelLeft={setFullstrideGame}
                    setModelRight={setSportingEvent}
                />
                <ReplaceValueRow
                    label={'Home Team Score'}
                    modelLeft={fullstrideGame}
                    modelLeftPropPath={'homeTeamScore'}
                    modelRight={sportingEvent}
                    modelRightPropPath={'homeTeamScore'}
                    setModelLeft={setFullstrideGame}
                    setModelRight={setSportingEvent}
                />
                <ReplaceValueRow
                    label={'Away Team Id'}
                    modelLeft={fullstrideGame}
                    modelLeftPropPath={'awayTeamId'}
                    modelRight={sportingEvent}
                    modelRightPropPath={'awayTeamId'}
                    setModelLeft={setFullstrideGame}
                    setModelRight={setSportingEvent}
                />
                <ReplaceValueRow
                    label={'Away Team Score'}
                    modelLeft={fullstrideGame}
                    modelLeftPropPath={'awayTeamScore'}
                    modelRight={sportingEvent}
                    modelRightPropPath={'awayTeamScore'}
                    setModelLeft={setFullstrideGame}
                    setModelRight={setSportingEvent}
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
                    disabled={!SportingEvent.isValid(sportingEvent)}
                    onClick={() => onSubmit(sportingEvent)}
                >
                    {'Submit'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default FullstrideGameDialogMerge;