// @flow

export interface IAction<T> {
    type: string,
    payload: T,
    error: boolean
}

const create = <T>(type: string = null, payload: T = null, error: boolean = false): IAction => ({type, payload, error});

const Action = {
    create
};

export default Action;
