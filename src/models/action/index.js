// @flow

export interface IAction {
    type: string,
    payload: Object
}

export default class Action implements IAction {
    static create = (type: string = null, payload: any = null) => new Action({type, payload});

    constructor(args) {
        this.type = args.type || null;
        this.payload = args.payload || null;
    }
}
