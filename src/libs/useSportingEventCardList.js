import React, {Fragment, useState} from 'react';
import * as R from 'ramda';
import type {IFullstrideGame} from '../models/fullstride-game';
import moment from 'moment';
import SportingEvent from '../models/sporting-event';
import {getTimeFromNow} from './dateTimeHelpers';
import SportingEventDialogEdit from '../components/sporting-event-dialog-edit';
import {deleteSportingEventAsync, putSportingEventAsync, updateSportingEvent} from '../actions/sportingEvents';
import EventCard, {EventCardPlaceholder} from '../components/event-card';
import {Button, IconButton, Tooltip} from '@material-ui/core';
import TimerIcon from '@material-ui/icons/Timer';
import {useDispatch} from 'react-redux';

function useSportingEventCardList(models, withActions = false) {
    const dispatch = useDispatch();
    const [nearestFutureEventId, setNearestFutureEventId] = useState(null);
    const [timeUntilNextEvent, setTimeUntilNextEvent] = useState(null);

    const [openDialogId, setOpenDialogId] = useState(null);
    const dialogIdPrefix = 'sporting-event-dialog-';

    const values = R.values(models);
    const filteredData = R.sortWith([R.descend((item: IFullstrideGame) => {
        const dateTimeA = moment(item.dateTime);
        return dateTimeA.valueOf();
    })], values);

    const placeholderList = R.repeat((
        <EventCardPlaceholder
            key={'EventCardPlaceholder'}
            withActions={withActions}
        />
    ), 12);

    const list = R.reduce((acc, item) => {
        const model = SportingEvent.create(item);

        const timeFromNow = getTimeFromNow(model.dateTime, 'hours');
        if (timeFromNow < 0 && (!timeUntilNextEvent || timeFromNow > timeUntilNextEvent)) {
            setNearestFutureEventId(model.id);
            setTimeUntilNextEvent(timeFromNow);
        }

        const element = (
            <Fragment key={model.id}>
                {
                    withActions && (
                        <SportingEventDialogEdit
                            id={`${dialogIdPrefix}${model.id}`}
                            model={model}
                            onClose={() => setOpenDialogId(null)}
                            onSubmit={(value) => {
                                dispatch(updateSportingEvent(SportingEvent.create({...value, edited: true})));
                                setOpenDialogId(null);
                            }}
                            open={Boolean(openDialogId === `${dialogIdPrefix}${model.id}`)}
                        />
                    )
                }
                <EventCard
                    actions={(
                        withActions && [
                            (
                                model.edited
                                    ? (
                                        <Button
                                            key={`put-${model.id}`}
                                            onClick={() => dispatch(putSportingEventAsync(SportingEvent.create({...model, edited: false})))}
                                        >
                                            {'save'}
                                        </Button>
                                    )
                                    : (
                                        <Button
                                            key={`${dialogIdPrefix}${model.id}`}
                                            onClick={() => setOpenDialogId(`${dialogIdPrefix}${model.id}`)}
                                        >
                                            {'edit'}
                                        </Button>
                                    )
                            ),
                            (
                                <Button
                                    key={`delete-${model.id}`}
                                    onClick={() => dispatch(deleteSportingEventAsync(model.id))}
                                >
                                    {'delete'}
                                </Button>
                            )
                        ]
                    )}
                    dateTime={model.dateTime}
                    group={model.season}
                    headerAction={(
                        model.id === nearestFutureEventId && (
                            <Tooltip
                                disableFocusListener={true}
                                disableTouchListener={true}
                                title={moment(model.dateTime).fromNow()}
                            >
                                <IconButton size={'small'}>
                                    <TimerIcon/>
                                </IconButton>
                            </Tooltip>
                        )
                    )}
                    location={model.location}
                    subgroup={model.division}
                    subtext={timeFromNow > 0 && `${model.homeTeamScore} - ${model.awayTeamScore}`}
                />
            </Fragment>
        );

        return R.append(element, acc);
    }, [], filteredData);

    return [list, placeholderList];
}

export default useSportingEventCardList;
