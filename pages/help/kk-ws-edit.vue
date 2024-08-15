<template>
    <div class="container">
        <h2 class="text-center mt-2 mb-4">Help : Edit Khoomkha Wholesale</h2>
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
            <v-btn color="primary" @click="edit">บันทึก</v-btn>
            <v-btn color="error" @click="cancel">ยกเลิก</v-btn>
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
            maintopicId: '',
            maintopic: '',
            subtopicId: '',
            subtopic: '',
            content: '',
        }
    },
    methods: {
        cancel() {
            this.$router.push({
                path: '/help/kk-ws',
            });
        },
        async getApi() {
            let response = await this.$axios.get(`${process.env.CLUSTER_URL}${process.env.MASTER_DATA}HelpCategory/HelpCategory?helpCategoryId=${this.maintopicId}`);
            this.maintopic = response.data.Data.Category;
            response = await this.$axios.get(`${process.env.CLUSTER_URL}${process.env.MASTER_DATA}HelpSubCategory/HelpSubCategory?helpSubCategoryId=${this.subtopicId}`);
            this.subtopic = response.data.Data.SubCategory;
            this.content = response.data.Data.Description;
        },
        async edit() {
            let bodyMaintopic = {
                HelpCategoryId: this.maintopicId,
                Category: this.maintopic,
                LanguageCode: "TH",
                AppType: "SP",
                IsActive: true
            };
            let response = await this.$axios.put(`${process.env.CLUSTER_URL}${process.env.MASTER_DATA}HelpCategory/HelpCategory`, bodyMaintopic, {
                headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                },
            });
            console.log(response);
            let bodySubtopic = {
                HelpSubCategoryId: this.subtopicId,
                HelpCategoryId: this.maintopicId,
                SubCategory: this.subtopic,
                Description: this.content,
                LanguageCode: "TH",
                IsActive: true
            };
            response = await this.$axios.put(`${process.env.CLUSTER_URL}${process.env.MASTER_DATA}HelpSubCategory/HelpSubCategory`, bodySubtopic, {
                headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                },
            });
            console.log(response);

            this.$router.push({ path: '/help/kk-ws' });
        }
    },
    created() {
        this.maintopicId = this.$route.query.maintopicId;
        this.subtopicId = this.$route.query.subtopicId;
        this.getApi();
    }
};
</script>