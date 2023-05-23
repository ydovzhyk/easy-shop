export const getLogin = ({ auth }) => auth.isLogin;
export const getIsRefreshing = ({ auth }) => auth.isRefreshing;
export const getLoading = ({ auth }) => auth.isLoading;
export const getUserName = ({ auth }) => auth.user.username;
export const getSid = ({ auth }) => auth.sid;
export const getAccessToken = ({ auth }) => auth.accessToken;
export const getRefreshToken = ({ auth }) => auth.refreshToken;
export const getError = ({ auth }) => auth.error;
export const getID = ({ auth }) => auth.user.id;
export const getUser = ({ auth }) => auth.user;

export const getNewUserId = ({ auth }) => auth.newUser?.id;
export const getUserIsRefreshing = ({ auth }) => auth.isRefreshing;
export const getIsTotalLogin = ({ auth }) => auth.isTotalLogin;
