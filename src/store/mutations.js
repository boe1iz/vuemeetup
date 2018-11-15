export default {
  setLoadedMeetups(state, payload) {
    state.loadedMeetups = payload
  },
  createMeetup(state, payload) {
    state.loadedMeetups.push(payload)
  },
  setUser(state, payload) {
    state.user = payload
  },
  setLoading(state, payload) {
    state.loading = payload
  },
  setError(state, payload) {
    state.error = payload
  },
  clearError(state) {
    state.error = null
  },
}
