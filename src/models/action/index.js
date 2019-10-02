// @flow

export interface IAction {
    type: string,
    payload: Object,
    error: boolean
}

const create = (type: string = null, payload: any = null, error: boolean = false): IAction => ({type, payload, error});

const Action = {
    create
};

export default Action;
