<template>
  <v-container
    fluid
    tag="section"
  >

  <base-material-card
    icon="mdi-clipboard-text"
    max-width="650"
    title="Categories Tree"
    class="px-5 py-3 mx-auto"
  >


        <v-progress-linear indeterminate v-if="loading"></v-progress-linear>

        <v-alert v-if="error" type="error">{{ error }}</v-alert>

        <v-row justify="center">
          <v-col
          cols="12"
          >
            <v-card
            flat
            >
            <v-card-title>
            <AddNewBtn @click="newItem" class="mt-n12"/>
            </v-card-title>
              <v-list v-if="hasItems">
                <draggable v-model="editedItem" handle=".handle" @change="onReorder">
                <v-list-item
                  v-for="item in editedItem"
                  :key="item.id"
                >

                  <v-list-item-icon>
                    <v-btn
                      v-if="isReordable"
                      title="Drag to reorder"
                      icon
                      class="handle"
                    >
                      <v-icon>mdi-drag-vertical</v-icon>
                    </v-btn>
                  </v-list-item-icon>

                <v-list-item-content>
                  <v-list-item-title v-text="item.name"></v-list-item-title>
                </v-list-item-content>

                  <v-list-item-action>
                    <div>
                    <EditBtn @click="editCategoryItem(item.id)"/>
                  </div>
                  </v-list-item-action>

                </v-list-item>
                </draggable>
              </v-list>

                <div
                v-if="!hasItems && !loading"
                class="text-center pa-6"
                >
                No categories yet.
              </div>
            </v-card>
          </v-col>

            <v-col
            cols="12"
            >
            <FormSubmitButtons
            :disabled="submitDisabled"
            :formState="formState"
            @update-item="updateItem"
            @create-item="createItem"
            />
            </v-col>
          </v-row>

    </base-material-card>
</v-container>
</template>

<script>
import draggable from 'vuedraggable'
import FormItemMixin from '@common/mixins/FormItemMixin'
import FormSubmitButtons from '@common/components/FormSubmitButtons'
import EditBtn from '@common/components/btn/EditBtn'
import AddNewBtn from '@common/components/btn/AddNewBtn'

export default {
  mixins: [ FormItemMixin ],

  components: {
    draggable,
    FormSubmitButtons,
    EditBtn,
    AddNewBtn,
  },

  data () {
    return {
      topBarMenuItems: [{title: "Reload", emit: 'reload-item', icon: "mdi-reload"}]
    }
  },

  computed: {
    submitDisabled () {
      return false
    },

    hasItems () {
      return this.editedItem && this.editedItem.length
    },

    isReordable () {
      return this.editedItem.length > 1
    }
  },

  methods: {
    onAddItem () {

    },

    onReorder () {
      this.editedItem.forEach((e, index) => {
        e.order = index + 1
      })
      this.$emit('reorder-list', this.editedItem)
    },

    editCategoryItem (id) {
      this.$emit('edit-item', id)
    },

    cancelEditedCategory () {
      this.editedCategoryId = ''
    },

  },
}
</script>
