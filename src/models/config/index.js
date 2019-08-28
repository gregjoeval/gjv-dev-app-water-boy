// @flow

export interface IAppConfig {
    domain: string,
    clientId: string,
    websiteTitle: string,
    websiteAuthor: string,
    waterBoyApiUri: string
}

export default class AppConfig implements IAppConfig {
    static create = (args) => new AppConfig(args || {});

    constructor(args) {
        this.domain = args.domain || null;
        this.clientId = args.clientId || null;
        this.websiteTitle = args.websiteTitle || null;
        this.websiteAuthor = args.websiteAuthor || null;
        this.waterBoyApiUri = args.waterBoyApiUri || null;
    }
}
