import {Configuration, FullstrideGameControllerApi, SportingEventControllerApi} from '@gregjoeval/api-client-water-boy';
import moment from 'moment';
import {FullstrideGameFormat} from '../constants/dateTimeFormats';
import FullstrideGame from '../models/fullstride-game';
import * as R from 'ramda';
import type {IFullstrideGame} from '../models/fullstride-game';
import type {ConfigurationParameters, FullstrideGameControllerApiType, SportingEventControllerApiType} from '@gregjoeval/api-client-water-boy';
import SportingEvent from '../models/sporting-event';
import type {ISportingEvent} from '../models/sporting-event';

/**
 * factory function for service configuration
 * @param {ConfigurationParameters} options -
 * @returns {Configuration} -
 */
const createConfiguration = (options: $Shape<ConfigurationParameters> = {}): Configuration => new Configuration({basePath: process.env.REACT_APP__WATER_BOY_API__URI, ...options});

const createFullstrideGameService = (): FullstrideGameControllerApiType => {
    const config = createConfiguration();
    // eslint-disable-next-line new-cap
    return FullstrideGameControllerApi(config);
};

const createSportingEventService = (): SportingEventControllerApiType => {
    const config = createConfiguration();
    // eslint-disable-next-line new-cap
    return SportingEventControllerApi(config);
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
    get: async (): Array<ISportingEvent> => {
        const service = createSportingEventService();
        const apiModels = await service.sportingEventControllerFind();
        return R.map(model => SportingEvent.create(model), apiModels || []);
    },
    post: async (model: ISportingEvent): ISportingEvent => {
        const service = createSportingEventService();
        const apiModel = await service.sportingEventControllerCreate(model);
        return SportingEvent.create(apiModel);
    },
    put: async (model: ISportingEvent): ISportingEvent => {
        const service = createSportingEventService();
        await service.sportingEventControllerReplaceById(model.id, model);
        return SportingEvent.create(model);
    },
    patch: async (model: ISportingEvent): ISportingEvent => {
        const service = createSportingEventService();
        await service.sportingEventControllerUpdateById(model.id, model);
        return SportingEvent.create(model);
    },
    delete: async (id: string): null => {
        const service = createSportingEventService();
        await service.sportingEventControllerDeleteById(id);
        return null;
    }
});
