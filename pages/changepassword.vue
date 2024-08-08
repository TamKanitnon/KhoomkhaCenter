<template>
  <div>
    <div class="container mb-3">
      <div class="row bg_login justify-center mx-2">
        <div class="col-12 col-sm-7 col-md-5 card">
          <div class="bgdark_login pa-3 m-3">
            <v-form ref="loginform">
              <div class="pa-3">
                <h2 class="text-center">change password</h2>
            
                <div class="pa-2">
                  <v-text-field
                    label="รหัสเดิม"
                    type="password"
                    outlined
                    v-model="formLogin.old_password"
                    dense
                    hide-details="auto"
                    rounded
                  ></v-text-field>
                </div>
                <div class="pa-2">
                  <v-text-field
                    label="รหัสใหม่"
                    type="password"
                    outlined
                    v-model="formLogin.new_password"
                    dense
                    hide-details="auto"
                    rounded
                  ></v-text-field>
                </div>
                <div class="pa-2">
                  <v-text-field
                    label="ยืนยันรหัสใหม่"
                    type="password"
                    outlined
                    v-model="formLogin.retype_new_password"
                    dense
                    hide-details="auto"
                    rounded
                  ></v-text-field>
                </div>
                <div class="text-center">
                  <v-btn color="success" @click="changepassword()" rounded
                    >เปลี่ยนรหัสผ่าน</v-btn
                  >
                </div>
              </div>
            </v-form>
          
          </div>
        </div>
      </div>
    </div>
  </div>


</template>

<script>
import { mapActions ,mapMutations } from "vuex";
export default {
  layout: "default",
  data() {
    return {
      formLogin: {
    
        old_password: "",
        new_password:"",
        retype_new_password:"",
      }
    };
  },
  methods: {
    ...mapActions("auth", {
      actionChangepassword: "changePasswordMember"
    }),
 async   changepassword() {
   const res =    await this.actionChangepassword(this.formLogin);
console.log(res)
this.$swal({
          title: `Success`,
          icon: "success",
          allowOutsideClick: true,
          confirmButtonColor: "green",
          confirmButtonText: "ok"
        });
    }
  }
};
</script>

<style></style>
