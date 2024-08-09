<template>
    <div class="container">
        <loading-page v-if="loading"></loading-page>
        <h2 class="text-center mt-2 mb-4">Help : Edit Khoomkha Grocery</h2>
        <div class="row my-5">
            <v-row class="pa-2">
                <v-col clos="12">
                    <div class="justify-space-between align-center mb-3">
                        <v-text-field label="Maintopic" v-model="maintopic"></v-text-field>
                        <v-text-field label="Subtopic" v-model="subtopic"></v-text-field>
                    </div>
                    <vue-editor v-model="content" />
                </v-col>
            </v-row>
        </div>
        <div class="text-center">
            <v-btn color="primary">บันทึก</v-btn>
            <v-btn color="error" @click="cancel()">ยกเลิก</v-btn>
        </div>
    </div>
</template>
  
<script>
import { VueEditor } from "vue2-editor";

export default {
  components: { 
    VueEditor 
  },
  data() {
    return {
        content: '<p>พิมพ์ข้อความหรืออัพโหลดรูปภาพลงไปในนี้</p>',
        maintopic: 'การสมัครใช้งานแพลตฟอร์ม',
        subtopic: 'ลงทะเบียนยังไง',
        id: ''
    }
  },
  methods: {
    cancel() {
        this.$router.push({
          path: '/help/kk',
        });
    },
  },
  created() {
    this.id = this.$route.query.id;
    console.log(this.id);
  }
};
</script>