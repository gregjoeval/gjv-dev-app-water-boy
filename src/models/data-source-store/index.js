// @flow

export interface IDataSourceStore {
    loading?: boolean;
    data?: any;
    error?: Object|null;
}

export default class DataSourceStore implements IDataSourceStore {
    static create = (args) => new DataSourceStore(args || {});

    constructor(args) {
        this.loading = args.loading || false;
        this.data = args.data || null;
        this.error = args.error || null;
    }
}
