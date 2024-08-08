<template>
  <v-dialog :value="isDialogOpen" max-width="600px" @input="updateDialogOpen" persistent>
    <v-card>
      <v-card-title justify-center class="mt-2">
        <v-row justify="center">
          <span align="center" justify="center" >Add ภาค(Region)</span>
        </v-row>
      </v-card-title>
      <v-card-text>
        <v-form ref="form" class="mt-3">
          <v-row justify="center" v-if="isLoading">
            <v-col cols="12" class="text-center">
              <v-progress-circular indeterminate color="primary"></v-progress-circular>
            </v-col>
          </v-row>
          <v-container v-else>
            <!-- ชื่อสินค้า -->
            <v-row>
              <v-col cols="4">
                <v-col>ชื่อ ภาค(Region) :</v-col>
              </v-col>
              <v-col cols="8">
                <v-text-field v-model="form.ProductName" placeholder="ชื่อสินค้า" :rules="[v => !!v || 'กรอกข้อมูล']" solo dense clearable required></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
        <v-row justify="center" class="mt-3 mb-1">
          <v-btn color="success " @click="submitForm" :disabled="isLoading">Add</v-btn>
          <v-btn color="error ml-2" @click="closeModal" :disabled="isLoading">Cancel</v-btn>
        </v-row>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: 'AddRegion',
  props: {
    isDialogOpen: { type: Boolean, required: true } // Prop to control dialog visibility
  },
  data() {
    return {
      isLoading: false,
      form: {
        RegionName: "",
      },
    };
  },
  computed: {
  },
  created() {
  },
  watch: {
  },
  methods: {
    ...mapActions("master-data", {
      addRegion: "postRegion",
    }),

    validateForm() {
      const { RegionName } = this.form;

      if (!RegionName) {
        console.log('Region Name is required');
        return false;
      }
      return true;
    },
    async submitForm() {
      if (!this.validateForm()) {
        return;
      }
      // Call POST product
      try {
        this.isLoading = true;
        let modifyProduct = {
          RegionName: this.form.RegionName,
        };
        const result = await this.addRegion(modifyProduct);
        console.log(result);
        if (result.isSuccessful) {
          this.$swal({
            icon: "success",
            title: "แก้ไขข้อมูลสำเร็จ",
            allowOutsideClick: false,
            showConfirmButton: false,
            timer: 1500,
          });
          this.closeModal(); // Close the modal after successful update
        } else {
          this.$swal({
            icon: "error",
            title: result.textStatus,
            allowOutsideClick: false,
            showConfirmButton: false,
            timer: 5000,
          });
        }
        this.isLoading = false
      } catch (error) {
        this.$swal({
            icon: "error",
            title: error,
            allowOutsideClick: false,
            showConfirmButton: false,
            timer: 5000,
          });
      } finally {
        this.isLoading = false;
      }
    },
    closeModal() {
      this.$emit('update:isDialogOpen', false); // Emit event to close dialog
      this.$emit('close'); // Emit close event to parent
    },
    updateDialogOpen(value) {
      this.$emit('update:isDialogOpen', value);
    }
  },
};
</script>