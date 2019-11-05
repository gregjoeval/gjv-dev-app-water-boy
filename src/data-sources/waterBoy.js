import {ApiClient, FullstrideGameControllerApi, SportingEventControllerApi} from '@gjv-dev/api-client-water-boy';
import moment from 'moment';
import {FullstrideGameFormat} from '../constants/dateTimeFormats';
import type {IFullstrideGame} from '../models/fullstride-game';
import FullstrideGame from '../models/fullstride-game';
import * as R from 'ramda';
import type {ISportingEvent, ISportingEventViewModel} from '../models/sporting-event';
import SportingEvent from '../models/sporting-event';

const createFullstrideGameService = () => {
    const client = new ApiClient();
    return new FullstrideGameControllerApi(client);
};

const createSportingEventService = () => {
    const client = new ApiClient();
    return new SportingEventControllerApi(client);
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
        const apiModel = await service.fullstrideGameControllerCreate(model);
        return FullstrideGame.create(apiModel);
    },
    put: async (model: IFullstrideGame): IFullstrideGame => {
        const service = createFullstrideGameService();
        await service.fullstrideGameControllerReplaceById(model.id, model);
        return FullstrideGame.create(model);
    },
    patch: async (model: IFullstrideGame): IFullstrideGame => {
        const service = createFullstrideGameService();
        await service.fullstrideGameControllerUpdateById(model.id, model);
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
        const data = await service.sportingEventControllerCreate(apiModel);
        return SportingEvent.create(data);
    },
    put: async (model: ISportingEvent|ISportingEventViewModel): ISportingEventViewModel => {
        const service = createSportingEventService();
        const apiModel = SportingEvent.createApiModel(model);
        await service.sportingEventControllerReplaceById(apiModel.id, apiModel);
        return SportingEvent.create(model);
    },
    patch: async (model: ISportingEvent|ISportingEventViewModel): ISportingEventViewModel => {
        const service = createSportingEventService();
        const apiModel = SportingEvent.createApiModel(model);
        await service.sportingEventControllerUpdateById(apiModel.id, apiModel);
        return SportingEvent.create(model);
    },
    delete: async (id: string): null => {
        const service = createSportingEventService();
        await service.sportingEventControllerDeleteById(id);
        return null;
    }
});
