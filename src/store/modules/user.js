export default {
  namespaced: true,
  state: {
    displayName: null,
    email: null,
    phoneNumber: null,
    photoURL: null,
    providerId: null,
    uid: null,
    location: null
  },
  mutations: {
    setUserInfo (state, payload) {
      const providerData = {
        displayName: null,
        email: null,
        phoneNumber: null,
        photoURL: null,
        providerId: null,
        uid: null,
        location: null
      }
      const userData = Object.assign(providerData, payload)
      for (const key in providerData) {
        state[key] = userData[key]
      }
    },
    setLocation (state, payload) {
      state.location = payload.location
    }
  },
  actions: {},
  getters: {
    returnUserState: function (state) {
      if (state.displayName == null) {
        return null
      } else {
        return state
      }
    },
    ifLocated: function (state) {
      if (state.location) {
        return true
      } else {
        return false
      }
    },
    print: function (state) {
      return state
    }
  }
}
