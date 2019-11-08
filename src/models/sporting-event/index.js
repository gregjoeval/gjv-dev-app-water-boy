// @flow
import * as R from 'ramda';
import * as uuid from 'uuid';
import {SportingEvent as SportingEventApiModel} from '@gjv-dev/api-client-water-boy';

export interface ISportingEvent {
    id: string;
    dateTime: string;
    location: string;
    homeTeamId?: string;
    awayTeamId?: string;
    homeTeamScore?: string;
    awayTeamScore?: string;
    league?: string;
    division?: string;
    season?: string;
}

export interface ISportingEventViewModel extends ISportingEvent {
    edited?: boolean;
}

const create = (args?: $Shape<ISportingEventViewModel>): ISportingEventViewModel => {
    const {
        id,
        dateTime,
        location,
        homeTeamId,
        awayTeamId,
        homeTeamScore,
        awayTeamScore,
        league,
        division,
        season,
        edited
    } = args || {};

    const o = {
        id: id || uuid(),
        dateTime,
        location,
        homeTeamId,
        awayTeamId,
        homeTeamScore,
        awayTeamScore,
        league,
        division,
        season,
        edited
    };

    return Object.freeze(o);
};

const createApiModel = (args?: $Shape<ISportingEventViewModel>): SportingEventApiModel => {
    const model = create(args);
    const o = SportingEventApiModel.constructFromObject(model);
    return Object.freeze(o);
};

const isValid = (model?: $Shape<ISportingEvent>): boolean => {
    const values = R.props(['id', 'dateTime', 'location'], model);
    const isModelValid = R.reduce((acc, value) => {
        const result = Boolean(value);
        return result
            ? acc && result
            : R.reduced(result); // fail at first invalid value
    }, true, values);
    return Boolean(isModelValid);
};

const SportingEvent = {
    create,
    createApiModel,
    isValid
};

export default SportingEvent;
