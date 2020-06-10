<template>
  <v-simple-table dense>
    <template v-slot:default>
      <tbody>
        <tr v-for="(line, index) in tableData" :key="index">
          <td>{{ line }}</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>

export default {
  props: {
    textContent: {
      type: String,
    }
  },

  computed: {
    tableData () {
      if(!this.textContent) return []
      return this.textContent.split(/\r?\n/)
    }
  }
}
</script>
