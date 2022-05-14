<template>
  <div id="app">
    {{hashChanged}}
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
import { refreshPageMixin } from '@/components/mixins/refresh-page.mixin';
export default {
  data() {
    return {}
  },
  components: {},
  mixins: [refreshPageMixin],
  created() {},
  methods: {}
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