<template>
  <div id="app">
    {{hashChanged}}{{$root.env}}
    <router-view></router-view>
    <div class="refresh-container" v-if="hashChanged && $root.env !== 'development'">
      <div class="notification-header">
        <button type="button" class="close-refresh-modal" @click="closeModal" aria-label="Close">
          <span aria-hidden="true"><i class="fal fa-times fa-sm"></i></span>
        </button>
      </div>
      <div class="notification-body">
        <div class="notification-button">
          <p class="text-center font12">An update is available. Please save all current work and click update below. You can also accept these updates by refreshing your browswer at any time.</p>
          <p class="text-center"><span class="font10">Not updating may result in errors.</span></p>
        </div>
        <div class="refresh-button text-center">
          <button class="btn btn-default" @click="reloadApp">Update</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// mixins
import axios from 'axios';
export default {
  data() {
    return {
       currentHash: '{{POST_BUILD_ENTERS_HASH_HERE}}',
      token: localStorage.getItem('user-token'),
      hashChanged: false,
      newHash: '',
      items: [
        { title: "Dashboard", icon: "mdi-format-list-checks", to: "/" },
        { title: "About", icon: "mdi-help-box", to: "/about" },
      ],
      drawer: null,
    };
  },
 components: {
    snackbar: require("@/components/Shared/Snackbar.vue").default,
  },
  methods: {
    initVersionCheck(url, frequency = 1000 * 60 * 2) {
      setInterval(() => {
        this.checkVersion(url);
      }, frequency);
    },
    async checkVersion(url) {
      try {
        const fileResponse = await axios.create({
          baseURL: `${this.$root.url}`,
          headers: {
            'Authorization': 'JWT ' + this.token,
            'Content-type': 'application/json'
          }
        }).get(url + '?t=' + new Date().getTime());
       this.newHash = fileResponse.data.hash;

        this.hashChanged = this.hasHashChanged(this.currentHash, this.newHash);
      } catch (error) {
        this.loading = false;
        if (!error.response) {
          this.errorStatus = 'Error: Network Error'
        } else {
          this.errorStatus = error.response.data.message;
        }
      }
    },
    hasHashChanged(currentHash, newHash) {
      if (!currentHash || currentHash === '{{POST_BUILD_ENTERS_HASH_HERE}}') {
        return true;
      }
      return currentHash !== newHash;
    },
    reloadApp() {
      this.currentHash = this.newHash;
      window.location.reload();
    }
  } 
}
</script>
<style lang="scss" scoped>
.refresh-container {
  width: 15%;
  position: fixed;
  bottom: 10px;
  right: 15px;
  background-color: white;
  padding: 25px;
  -webkit-box-shadow:0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.05);
  -moz-box-shadow:0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.05);
  box-shadow:0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.05);
}
.close-refresh-modal {
  position: absolute;
  right: 5px;
  top: 5px;
  border: none;
}
</style>