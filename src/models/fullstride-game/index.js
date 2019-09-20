// @flow

export interface IFullstrideGame {
    id: string;
    number: string;
    lastUpdated: string;
    season: string;
    dateTime: string;
    rink: string;
    teams: string;
    notes: string;
}

export default class FullstrideGame implements IFullstrideGame {
    static create = (args) => new FullstrideGame(args || {});

    constructor(args) {
        this.id = args.id || null;
        this.number = args.number || null;
        this.lastUpdated = args.lastUpdated || null;
        this.season = args.season || null;
        this.dateTime = args.dateTime || null;
        this.rink = args.rink || null;
        this.teams = args.teams || null;
        this.notes = args.notes || null;
    }
}
