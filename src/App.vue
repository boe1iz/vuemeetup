<template>
  <v-app>
    <v-toolbar dark class="purple darken-1">
      <v-toolbar-side-icon @click="sideNav = !sideNav" class="hidden-sm-and-up"></v-toolbar-side-icon>
      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor: pointer">{{applicationName}}</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn flat v-for="(menuItem, index) in menuItems" :key="index" :to="menuItem.link">
          <v-icon left>{{menuItem.icon}}</v-icon>
          {{menuItem.title}}
        </v-btn>
        <v-btn flat @click="onLogout" v-if="userIsAuthenticated">
          <v-icon left>exit_to_app</v-icon>Logout
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-navigation-drawer v-model="sideNav" absolute temporary>
      <v-list>
        <v-list-tile :to="'/'">
          <v-list-tile-action>
            <v-icon left>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>Home</v-list-tile-content>
        </v-list-tile>
        <v-list-tile v-for="(menuItem, index) in menuItems" :key="index" :to="menuItem.link">
          <v-list-tile-action>
            <v-icon left>{{menuItem.icon}}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>{{menuItem.title}}</v-list-tile-content>
        </v-list-tile>
        <v-list-tile v-if="userIsAuthenticated" @click="onLogout">
          <v-list-tile-action>
            <v-icon left>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>Logout</v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <main>
      <router-view></router-view>
    </main>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  components: {
    //
  },
  data() {
    return {
      applicationName: 'Vue Meetup!',
      sideNav: false,
    }
  },
  computed: {
    menuItems() {
      let menuItems = [
        { icon: 'face', title: 'Sign up', link: '/signup' },
        { icon: 'lock_open', title: 'Sign in', link: '/signin' },
      ]
      if (this.userIsAuthenticated) {
        menuItems = [
          {
            icon: 'supervisor_account',
            title: 'View Meetups',
            link: '/meetups',
          },
          { icon: 'room', title: 'Organize Meetup', link: '/createmeetup' },
          { icon: 'person', title: 'Profile', link: '/profile' },
        ]
      }
      return menuItems
    },
    userIsAuthenticated() {
      return (
        this.$store.getters.user !== null &&
        this.$store.getters.user !== undefined
      )
    },
  },
  methods: {
    onLogout() {
      this.$store.dispatch('logout')
      this.$router.push('/')
    },
  },
}
</script>
