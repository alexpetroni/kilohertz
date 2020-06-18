// ErrorsMixin

export default {
  data: function () {
    return {
      error: '',
    }
  },

  methods: {
    clearError () {
      if(this.error){
        this.error = ''
      }
    },

    setError (error) {
      this.error = error
    },
  },
}
