export const getLogin = ({ auth }) => auth.isLogin;
export const getIsRefreshing = ({ auth }) => auth.isRefreshing;
export const getLoadingUser = ({ auth }) => auth.isLoading;
export const getUserName = ({ auth }) => auth.user.username;
export const getUserSecondName = ({ auth }) => auth.user.secondName;
export const getUserFirstName = ({ auth }) => auth.user.firstName;
export const getUserSurName = ({ auth }) => auth.user.surName;
export const getUserEmail = ({ auth }) => auth.user.email;
export const getUserTel = ({ auth }) => auth.user.tel;
export const getUserCityName = ({ auth }) => auth.user.cityName.value;
export const getUserStreetName = ({ auth }) => auth.user.streetName;
export const getUserHouseNamber = ({ auth }) => auth.user.houseNamber;
export const getUserSex = ({ auth }) => auth.user.sex.value;
export const getUserAbout = ({ auth }) => auth.user.about;
export const getUserAvatar = ({ auth }) => auth.user.userAvatar;
export const getUserDateCreate = ({ auth }) => auth.user.dateCreate;
export const getUserMessage = ({ auth }) => auth.message;
export const selectBasketProducts = ({ auth }) => auth.user.userBasket;
export const getLikedProducts = ({ auth }) => auth.user.likedProducts;
export const getTotalLikedProductsPages = ({ auth }) =>
  auth.user.totalLikedPages;

export const getSid = ({ auth }) => auth.sid;
export const getAccessToken = ({ auth }) => auth.accessToken;
export const getRefreshToken = ({ auth }) => auth.refreshToken;
export const getError = ({ auth }) => auth.error;
export const getID = ({ auth }) => auth.user._id;
export const getUser = ({ auth }) => auth.user;
export const getNewMessage = ({ auth }) => auth.user.newMessage;

export const getNewUserId = ({ auth }) => auth.newUser?.id;
export const getUserIsRefreshing = ({ auth }) => auth.isRefreshing;
export const getIsTotalLogin = ({ auth }) => auth.isTotalLogin;
export const selectUserBasket = ({ auth }) => auth.user.userBasket;
export const getUserLikes = ({ auth }) => auth.user.userLikes;
export const selectUserBasketProducts = ({ auth }) => auth.user.basketProducts;
export const selectUserOrders = ({ auth }) => auth.user.userOrders;
export const selectUserSales = ({ auth }) => auth.user.userSales;
export const selectUserSubscriptions = ({ auth }) =>
  auth.user.userSubscriptions;
export const selectTotalUserSearchSubscriptionsPages = ({ auth }) =>
  auth.user.totalUserSearchSubscriptionsPages;
export const selectUserSearchSubscriptions = ({ auth }) =>
  auth.user.userSearchSubscription;
export const selectReviews = ({ auth }) => auth.user.userReviews;
export const selectFeedback = ({ auth }) => auth.user.userFeedback;
