import moment from 'moment';
import * as R from 'ramda';
import {FullstrideGameFormat} from '../constants/dateTimeFormats';
import {ApiClient, FullstrideGameControllerApi, SportingEventControllerApi, LocationControllerApi} from '@gjv-dev/api-client-water-boy';
import FullstrideGame from '../models/fullstride-game';
import type {IFullstrideGame} from '../models/fullstride-game';
import SportingEvent from '../models/sporting-event';
import type {ISportingEvent, ISportingEventViewModel} from '../models/sporting-event';
import Location from '../models/location';
import type {ILocation, ILocationViewModel} from '../models/location';

const createFullstrideGameService = () => {
    const client = new ApiClient();
    return new FullstrideGameControllerApi(client);
};

const createSportingEventService = () => {
    const client = new ApiClient();
    return new SportingEventControllerApi(client);
};

const createLocationService = () => {
    const client = new ApiClient();
    return new LocationControllerApi(client);
};

export const FullstrideGames = Object.freeze({
    get: async (): Array<IFullstrideGame> => {
        const service = createFullstrideGameService();
        const apiModels = await service.fullstrideGameControllerFind();
        return R.map(model => {
            const dateTime = moment(model.dateTime, FullstrideGameFormat).toISOString(true);
            return FullstrideGame.create({...model, dateTime});
        }, apiModels || []);
    },
    post: async (model: IFullstrideGame): IFullstrideGame => {
        const service = createFullstrideGameService();
        const apiModel = await service.fullstrideGameControllerCreate({fullstrideGame: model});
        return FullstrideGame.create(apiModel);
    },
    put: async (model: IFullstrideGame): IFullstrideGame => {
        const service = createFullstrideGameService();
        await service.fullstrideGameControllerReplaceById(model.id, {fullstrideGame: model});
        return FullstrideGame.create(model);
    },
    patch: async (model: IFullstrideGame): IFullstrideGame => {
        const service = createFullstrideGameService();
        await service.fullstrideGameControllerUpdateById(model.id, {fullstrideGame: model});
        return FullstrideGame.create(model);
    },
    delete: async (id: string): null => {
        const service = createFullstrideGameService();
        await service.fullstrideGameControllerDeleteById(id);
        return null;
    }
});

export const SportingEvents = Object.freeze({
    get: async (): Array<ISportingEvent|ISportingEventViewModel> => {
        const service = createSportingEventService();
        const data = await service.sportingEventControllerFind();
        return R.map(model => SportingEvent.create(model), data || []);
    },
    post: async (model: ISportingEvent|ISportingEventViewModel): ISportingEventViewModel => {
        const service = createSportingEventService();
        const apiModel = SportingEvent.createApiModel(model);
        const data = await service.sportingEventControllerCreate({sportingEvent: apiModel});
        return SportingEvent.create(data);
    },
    put: async (model: ISportingEvent|ISportingEventViewModel): ISportingEventViewModel => {
        const service = createSportingEventService();
        const apiModel = SportingEvent.createApiModel(model);
        await service.sportingEventControllerReplaceById(apiModel.id, {sportingEvent: apiModel});
        return SportingEvent.create(model);
    },
    patch: async (model: ISportingEvent|ISportingEventViewModel): ISportingEventViewModel => {
        const service = createSportingEventService();
        const apiModel = SportingEvent.createApiModel(model);
        await service.sportingEventControllerUpdateById(apiModel.id, {sportingEvent: apiModel});
        return SportingEvent.create(model);
    },
    delete: async (id: string): null => {
        const service = createSportingEventService();
        await service.sportingEventControllerDeleteById(id);
        return null;
    }
});

export const Locations = Object.freeze({
    get: async (): Array<ILocation|ILocationViewModel> => {
        const service = createLocationService();
        const data = await service.locationControllerFind();
        return R.map(model => Location.create(model), data || []);
    },
    post: async (model: ILocation|ILocationViewModel): ILocationViewModel => {
        const service = createLocationService();
        const apiModel = Location.createApiModel(model);
        const data = await service.locationControllerCreate({location: apiModel});
        return Location.create(data);
    },
    put: async (model: ILocation|ILocationViewModel): ILocationViewModel => {
        const service = createLocationService();
        const apiModel = Location.createApiModel(model);
        await service.locationControllerReplaceById(apiModel.id, {location: apiModel});
        return Location.create(model);
    },
    patch: async (model: ILocation|ILocationViewModel): ILocationViewModel => {
        const service = createLocationService();
        const apiModel = Location.createApiModel(model);
        await service.locationControllerUpdateById(apiModel.id, {location: apiModel});
        return Location.create(model);
    },
    delete: async (id: string): null => {
        const service = createLocationService();
        await service.locationControllerDeleteById(id);
        return null;
    }
});
