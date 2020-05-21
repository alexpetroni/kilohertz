<template>
  <v-content>
    <div style="min-height:900px">
    <router-view />
  </div>
    <dashboard-core-footer />
  </v-content>
</template>

<script>
  export default {
    name: 'DashboardCoreView',

    components: {
      DashboardCoreFooter: () => import('./Footer'),
    },
  }
</script>
