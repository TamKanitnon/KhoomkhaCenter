<template>
  <v-dialog :value="isDialogOpen" max-width="600px" @input="updateDialogOpen" persistent>
    <v-card>
      <v-card-title justify-center>
        <v-row justify="center" class="mt-1" >
          <span align="center" justify="center">Add จังหวัด(Province)</span>
        </v-row>
      </v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="formValid" class="mt-3">
          <v-row justify="center" v-if="isLoading">
            <v-col cols="12" class="text-center">
              <v-progress-circular indeterminate color="primary"></v-progress-circular>
            </v-col>
          </v-row>
          <div v-else>
            <v-row class="mt-3 mb-1">
              <v-col cols="4" class="py-0 mt-2 text-center">
                ภาค(Region) :
              </v-col>
              <v-col cols="8" class="py-0 mb-3">
                <v-autocomplete
                  v-model="selectedRegion"
                  :items="regions"
                  item-text="RegionName"
                  label="ภาค"
                  :rules="[v => !!v || 'กรุณาเลือก']"
                  hide-details="auto"
                  required
                  return-object
                  outlined
                  dense
                ></v-autocomplete>
              </v-col>
              <v-col cols="4" class="py-0 mt-2 text-center">
                ชื่อ จังหวัด(Province) :
              </v-col>
              <v-col cols="8" class="py-0">
                <v-text-field
                  v-model="form.ProvinceName"
                  placeholder="ชื่อจังหวัดใหม่"
                  :rules="[v => !!v || 'กรอกข้อมูล']"
                  solo
                  dense
                  clearable
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </div>
        </v-form>
        <v-row justify="center" class="mt-0 mb-1">
          <v-btn color="success" @click="submitForm" :disabled="isLoading">Add</v-btn>
          <v-btn color="error ml-2" @click="closeModal" :disabled="isLoading">Cancel</v-btn>
        </v-row>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>


<script>
import { mapActions, mapGetters } from "vuex";
import Region from '@/src/models/master/address/Region'
export default {
  name: 'AddProvince',
  props: {
    isDialogOpen: { type: Boolean, required: true } // Prop to control dialog visibility
  },
  data() {
    return {
      isLoading: false,
      regions: null,
      selectedRegion: null,
      form: {
        ProvinceName: '',
      },
      formValid: true, // Add formValid for validation
    };
  },
  computed: {
    ...mapGetters('master-data', {
      doneFetchRegion: 'regions',
    }),
  },
  created() {
    this.regions = this.doneFetchRegion;
  },
  watch: {
    doneFetchRegion(newValue) {
      this.regions = newValue;
    },
  },
  methods: {
    ...mapActions("master-data", {
      addProvince: "postProvince",
    }),

    validateForm() {
      this.$refs.form.validate();
      return this.formValid;
    },
    async submitForm() {
      if (!this.validateForm()) {
        return;
      }
      // Call POST product
      try {
        this.isLoading = true;
        let modifyProduct = {
          region: this.selectedRegion,
          ProvinceName: this.form.ProvinceName,
        };
        const result = await this.addProvince(modifyProduct);
        console.log(result);
        if (result.isSuccessful) {
          this.$swal({
            icon: "success",
            title: "เพิ่มข้อมูลสำเร็จ",
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
