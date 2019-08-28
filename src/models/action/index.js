// @flow

export interface IAction {
    type: string,
    payload: Object
}

export default class Action implements IAction {
    static create = (type: string = null, payload: any = null) => ({type, payload});
}
