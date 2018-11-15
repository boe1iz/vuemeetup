export default {
  loadedMeetups(state) {
    return state.loadedMeetups.sort((meetupA, meetupB) => {
      return meetupA.date > meetupB.date
    })
  },
  featuredMeetups(state, getters) {
    return getters.loadedMeetups.slice(0, 5)
  },
  loadedMeetup(state) {
    return meetupId => {
      return state.loadedMeetups.find(meetup => {
        return meetup.id === meetupId
      })
    }
  },
  user(state) {
    return state.user
  },
  loading(state) {
    return state.loading
  },
  error(state) {
    return state.error
  },
}
