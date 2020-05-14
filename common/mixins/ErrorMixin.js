// ErrorsMixin

const mix = {
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

export default mix
