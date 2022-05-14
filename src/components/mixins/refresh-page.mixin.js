export const refreshPageMixin = {
  data() {
    return {
      currentHash: '{{POST_BUILD_ENTERS_HASH_HERE}}',
      token: localStorage.getItem('user-token'),
      hashChanged: false,
      newHash: ''
    }
  },
  methods: {
    initVersionCheck(url, frequency = 1000) {
      console.log('niro')
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
};