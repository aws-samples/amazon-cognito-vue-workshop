export default {
  cognitoUserName(state) {
    return state.cognitoUserName;
  },
  cognitoSub(state) {
    return state.cognitoSub;
  },
  idToken(state) {
    return state.idToken;
  },
  session(state) {
    return state.session;
  },
  refreshToken(state) {
    return state.refreshToken;
  },
  accessToken(state) {
    return state.accessToken;
  },
  isAuthenticated(state) {
    return state.isAuthenticated;
  },
  email(state) {
    return state.email;
  },
  didAutoLogout(state) {
    return state.didAutoLogout;
  }
};
