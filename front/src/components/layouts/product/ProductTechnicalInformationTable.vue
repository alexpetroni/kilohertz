<template>
  <v-simple-table dense>
    <template v-slot:default>
      <thead v-if="hasHeaders">
        <tr>
          <th v-for="(h, index) in tableData.headers" :key="index" class="text-left">{{ h }}</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(row, index) in tableData.content"
          :key="index"
        >
          <td
            v-for="(c, i) in row"
            :key="i"
            >
            {{ c }}
          </td>
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

  data () {
    return {
      headers: [],
    }
  },

  computed: {
    tableData () {
      if(!this.textContent) return { headers: [], content: [] }
      return {
        headers: [],
        content: this.textContent.split(/\r?\n/).map(e => e.split('|'))
      }
    },

    hasHeaders () {
      return this.tableData.headers.length
    },
  }
}
</script>
