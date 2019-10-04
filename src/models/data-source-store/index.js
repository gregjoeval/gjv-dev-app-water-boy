// @flow

export interface IDataStore {
    loading?: boolean;
    data?: any;
    error?: Object|null;
}

export default class DataStore implements IDataStore {
    static create = (args) => new DataStore(args || {});

    constructor(args) {
        this.loading = args.loading || false;
        this.data = args.data || null;
        this.error = args.error || null;
    }
}
