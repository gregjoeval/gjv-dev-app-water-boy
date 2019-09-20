type UserModel = {
    nickname: string,
    name: string,
    picture: string,
    email: string,
    sub: string
}

/**
 * creates a user model
 * @param {Object} args -
 * @returns {Readonly<{sub: *, nickname: *, name: *, picture: *, email: *}>} -
 */
function create(args): UserModel {
    const {nickname, name, picture, email, sub} = args || {};
    const o = {nickname, name, picture, email, sub};
    return Object.freeze(o);
}

const User = {create};
export default User;