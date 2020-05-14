/* FormStateMixin - keep the edit state for an item into editor  */

import { FormState, isNewForm, isEditForm } from '@common/utils'

const mix = {
  data: function () {
    return {
      formState: FormState.NEW,
    }
  },

  methods: {
    setNewFormState () {
      this.formState = FormState.NEW
    },

    setEditFormState () {
      this.formState = FormState.EDIT
    },
  },

  computed: {
    isNewForm () {
      return isNewForm(this.formState)
    },

    isEditForm () {
      return isEditForm(this.formState)
    },
  }
}

export default mix
