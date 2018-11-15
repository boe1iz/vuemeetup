import * as firebase from 'firebase'

export default {
  loadMeetups({ commit }) {
    commit('setLoading', true)
    firebase
      .database()
      .ref('meetups')
      .once('value')
      .then(data => {
        const meetups = []
        const obj = data.val()
        for (let key in obj) {
          meetups.push({
            id: key,
            title: obj[key].title,
            location: obj[key].location,
            description: obj[key].description,
            imageUrl: obj[key].imageUrl,
            date: obj[key].date,
            creatorId: obj[key].creatorId,
          })
        }
        commit('setLoadedMeetups', meetups)
        commit('setLoading', false)
      })
      .catch(error => {
        console.log(error)
        commit('setLoading', false)
      })
  },
  createMeetup({ commit, getters }, payload) {
    const meetup = {
      title: payload.title,
      location: payload.location,
      description: payload.description,
      date: payload.date.toISOString(),
      creatorId: getters.user.id,
      // id: Math.random()
      //   .toString(36)
      //   .replace(/[^a-z]+/g, "")
      //   .substr(0, 5)
    }
    let imageUrl
    let key = ''
    firebase
      .database()
      .ref('meetups')
      .push(meetup)
      .then(data => {
        key = data.key
        return key
      })
      .then(key => {
        const filename = payload.image.name
        const ext = filename.slice(filename.lastIndexOf('.'))
        return firebase
          .storage()
          .ref('meetups/' + key + '.' + ext)
          .put(payload.image)
      })
      .then(fileData => {
        fileData.ref.getDownloadURL().then(url => {
          firebase
            .database()
            .ref('meetups')
            .child(key)
            .update({
              imageUrl: url,
            })
            .then(() => {
              commit('createMeetup', {
                ...meetup,
                imageUrl: url,
                id: key,
              })
            })
        })
      })
      .catch(error => {
        console.log(error)
      })
  },
  signUserUp({ commit }, payload) {
    commit('setLoading', true)
    commit('clearError')
    firebase
      .auth()
      .createUserWithEmailAndPassword(payload.email, payload.password)
      .then(user => {
        commit('setLoading', false)
        const newUser = {
          id: user.user.uid,
          registeredMeetups: [],
        }
        commit('setUser', newUser)
      })
      .catch(error => {
        commit('setLoading', false)
        commit('setError', error)
        console.log(error)
      })
  },
  signUserIn({ commit }, payload) {
    commit('setLoading', true)
    commit('clearError')
    firebase
      .auth()
      .signInWithEmailAndPassword(payload.email, payload.password)
      .then(user => {
        commit('setLoading', false)
        const newUser = {
          id: user.user.uid,
          registeredMeetups: [],
        }
        commit('setUser', newUser)
      })
      .catch(error => {
        commit('setLoading', false)
        commit('setError', error)
        console.log(error)
      })
  },
  autoSignin({ commit }, payload) {
    commit('setUser', { id: payload.uid, registeredMeetups: [] })
  },
  clearError({ commit }) {
    commit('clearError')
  },
  logout({ commit }) {
    firebase.auth().signOut()
    commit('setUser', null)
  },
}
