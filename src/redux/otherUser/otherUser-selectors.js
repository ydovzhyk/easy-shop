export const selectOtherUser = ({ otherUser }) => otherUser.otherUserInfo;
export const getOtherUserError = ({ otherUser }) => otherUser.error;
export const getLoadingOtherUser = ({ otherUser }) => otherUser.loading;
export const selectUserSubscriptions = ({ otherUser }) =>
  otherUser.userSubscriptions;
export const selectTotalPagesUserSubscription = ({ otherUser }) =>
  otherUser.totalPagesSubscription;
export const selectUserFollowers = ({ otherUser }) => otherUser.userFollovers;
export const selectTotalPagesUserFollovers = ({ otherUser }) =>
  otherUser.totalPagesFollowers;
