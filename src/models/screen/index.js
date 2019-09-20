/**
 * creates a screen model
 * @param {Object} args -
 * @returns {Readonly<{Path: *, hasAuth: *, RouteProps: *, Icon: *, Component: *, Name: *}>} -
 */
function createScreen(args) {
    const {Component, Path, Name, Icon, hasAuth, RouteProps} = args;
    const o = {
        Component,
        Path,
        Name,
        Icon,
        hasAuth,
        RouteProps
    };
    return Object.freeze(o);
}

export default createScreen;