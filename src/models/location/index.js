// @flow
import * as R from 'ramda';
import * as uuid from 'uuid';
import {Location as LocationApiModel} from '@gjv-dev/api-client-water-boy';

export interface ILocation {
    id: string;
    name: string;
    address?: string;
    link?: string;
}

export interface ILocationViewModel extends ILocation {
    edited?: boolean;
}

const create = (args?: $Shape<ILocationViewModel>): ILocationViewModel => {
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

const createApiModel = (args?: $Shape<ILocationViewModel>): LocationApiModel => {
    const model = create(args);
    const o = LocationApiModel.constructFromObject(model);
    return Object.freeze(o);
};

const isValid = (model?: $Shape<ILocation>): boolean => {
    const values = R.props(['id', 'name'], model);
    const isModelValid = R.reduce((acc, value) => {
        const result = Boolean(value);
        return result
            ? acc && result
            : R.reduced(result); // fail at first invalid value
    }, true, values);
    return Boolean(isModelValid);
};

const Location = {
    create,
    createApiModel,
    isValid
};

export default Location;
