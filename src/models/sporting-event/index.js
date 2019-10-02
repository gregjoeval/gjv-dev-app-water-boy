// @flow

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

export default class SportingEvent implements ISportingEvent {
    static create = (args) => new SportingEvent(args || {});

    constructor(args) {
        this.id = args.id || null;
        this.dateTime = args.dateTime || null;
        this.location = args.location || null;
        this.homeTeamId = args.homeTeamId || null;
        this.awayTeamId = args.awayTeamId || null;
        this.homeTeamScore = args.homeTeamScore || null;
        this.awayTeamScore = args.awayTeamScore || null;
        this.league = args.league || null;
        this.division = args.division || null;
        this.season = args.season || null;
    }
}
