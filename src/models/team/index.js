// @flow
import * as R from 'ramda';
import * as uuid from 'uuid';
import {Team as TeamApiModel} from '@gjv-dev/api-client-water-boy';

export interface ITeam {
    id: string;
    name: string;
    type?: string;
    memberIds?: Array<string>;
    abbreviation?: string;
}

export interface ITeamViewModel extends ITeam {
    edited?: boolean;
}

const create = (args?: $Shape<ITeamViewModel>): ITeamViewModel => {
    const {
        id,
        name,
        address,
        link,
        edited
    } = args || {};

    const o = {
        id: id || uuid(),
        name,
        address,
        link,
        edited
    };

    return Object.freeze(o);
};

const createApiModel = (args?: $Shape<ITeamViewModel>): TeamApiModel => {
    const model = create(args);
    const o = TeamApiModel.constructFromObject(model);
    return Object.freeze(o);
};

const isValid = (model?: $Shape<ITeam>): boolean => {
    const values = R.props(['id', 'name'], model);
    const isModelValid = R.reduce((acc, value) => {
        const result = Boolean(value);
        return result
            ? acc && result
            : R.reduced(result); // fail at first invalid value
    }, true, values);
    return Boolean(isModelValid);
};

const Team = {
    create,
    createApiModel,
    isValid
};

export default Team;
