// @flow
import * as R from 'ramda';
import * as uuid from 'uuid';

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

const create = (args: ISportingEvent|Object): ISportingEvent => {
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
        season
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
        season
    };

    return Object.freeze(o);
};

const isValid = (model: ISportingEvent): boolean => {
    const keys = R.keys(model);
    const isModelValid = R.reduce((acc, key) => {
        const result = Boolean(model[key]);
        return result
            ? acc && result
            : R.reduced(result); // fail at first invalid value
    }, true, keys);
    return Boolean(isModelValid);
};

const SportingEvent = {
    create,
    isValid
};

export default SportingEvent;