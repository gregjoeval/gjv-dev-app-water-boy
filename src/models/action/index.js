// @flow

export interface IAction<T> {
    type: string,
    payload: T,
    error: boolean,
    meta: Object
}

const create = <T>(type: string = null, payload: T = null, error: boolean = false, meta?: Object = {}): IAction => ({type, payload, error, meta});

const Action = {
    create
};

export default Action;
