<template>
  <v-simple-table dense>
    <template v-slot:default>
      <tbody>
        <tr v-for="(line, index) in tableData" :key="index">
          <td>{{ line.name }}</td>
          <td>{{ line.value }} </td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>

export default {
  props: {
    dimensions: {
      type: Object,
      default: () => {}
    }
  },

  data () {
    return {
      translations: {
        sizeLength: "Länge (cm)",
        sizeHeight: "Höhe (cm)",
        sizeWidth: "Breite (cm)",
        weightNet: "Nettogewicht",
        weightGross: "Bruttogewicht"
      }
    }
  },

  computed: {
    tableData () {
      if(!Object.keys(this.dimensions).length) return []
      let data = []
      let sizeOrder = ['sizeLength', 'sizeHeight', 'sizeWidth', 'weightNet', 'weightGross']
      sizeOrder.forEach(e => {
        if(this.dimensions[e]) {
          data.push({name: this.translations[e], value: this.dimensions[e]})
        }
      })

      return data
    }
  }
}
</script>
