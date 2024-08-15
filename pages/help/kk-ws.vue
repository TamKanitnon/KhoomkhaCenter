<template>
    <div class="container">
        <h2 class="text-center mt-2 mb-4">Help : Khoomkha Wholesale</h2>
        <div class="row my-5">
            <v-row class="pa-2">
                <v-col clos="12">
                <div class="d-flex justify-space-between align-center mb-3">
                    <div> Total item found : <b>{{ topic.length }}</b> </div>
                    <div>
                        <v-btn @click="addModal = true" color="success">
                            <v-icon class="pr-1"> mdi-plus</v-icon> เพิ่ม
                        </v-btn>
                    </div>
                </div>
                <v-data-table
                    :headers="headers"
                    :items="topic"
                    :items-per-page="100"
                    class="elevation-1"
                >
                    <template v-slot:[`item.index`]="{ index }">
                        {{ index + 1 }}
                    </template>
                    <template v-slot:[`item.action`]="{ item }">
                        <v-btn color="primary" @click="editTopic(item.maintopicId, item.subtopicId)">แก้ไข</v-btn>
                        <v-btn color="error" @click="deleteTopic(item.maintopicId, item.maintopic)">ลบ</v-btn>
                    </template>
                </v-data-table>
                </v-col>
            </v-row>
        </div>

        <v-dialog v-if="addModal" max-width="700px" :value="true" persistent>
            <v-card>
                <div class="container">
                    <div class="text-center mb-6">
                        <v-btn :color="subtopicColor" @click="switchAddition(true)">Subtopic Addition</v-btn>
                        <v-btn :color="maintopicColor" @click="switchAddition(false)">Maintopic Addition</v-btn>
                    </div>
                    <div class="justify-space-between align-center mb-3">
                        <v-text-field label="Maintopic" v-model="maintopic" v-if="!subtopicAddition"></v-text-field>
                        <label class="label-box" v-if="subtopicAddition">Select maintopic</label>
                        <select class="select-box" v-if="subtopicAddition" v-model="maintopicId">
                        <option selected></option>
                        <option v-for="item in items" :value="item.maintopicId">{{ item.maintopic }}</option>
                        </select>
                        <v-text-field label="Subtopic" v-model="subtopic"></v-text-field>
                    </div>
                    <div class="text-center">
                        <v-btn color="primary" v-if="subtopicAddition" @click="createSubtopic">บันทึก</v-btn>
                        <v-btn color="primary" v-if="!subtopicAddition" @click="createMaintopic">บันทึก</v-btn>
                        <v-btn color="error" @click="addModal = false">ยกเลิก</v-btn>
                    </div>
                </div>
            </v-card>
        </v-dialog>

        <v-dialog v-if="deleteModal" max-width="700px" :value="true" persistent>
            <v-card>
                <v-card-title class="headline">Confirm Delete</v-card-title>
                <v-card-text>
                    Are you sure you want to delete this item? <br>
                    Item ID: <b>{{ idDelete }}</b> <br>
                    Item Maintopic: <b>{{ nameDelete }}</b>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="error" @click="deleteModal = false">Cancel</v-btn>
                    <v-btn color="success" @click="deleteMaintopic(idDelete)">Confirm</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>
  
<script>
export default {
    data () {
        return {
            loading: false,
            addModal: false,
            deleteModal: false,
            idDelete: '',
            nameDelete: '',
            subtopicColor: 'success',
            maintopicColor: '',
            subtopicAddition: true,
            headers: [
                { text: 'Index', value: 'index', align: 'left'},
                { text: 'Maintopic', value: 'maintopic', align: 'left' },
                { text: 'Subtopic', value: 'subtopic', align: 'left' },
                { text: 'Action', value: 'action', align: 'center' },
            ],
            items: [],
            topic: [],
            maintopicId: '',
            maintopic: '',
            subtopic: '',
        }
    },
    methods: {
        editTopic(MainID, SubID) {
            this.$router.push({ 
            path: '/help/kk-ws-edit',
                query: {
                    maintopicId: MainID,
                    subtopicId: SubID
                }
            });
        },
        deleteTopic(id, name) {
            this.idDelete = id;
            this.nameDelete = name;
            this.deleteModal = true;
        },
        switchAddition(state) {
            this.subtopicAddition = state;
            if(state) {
                this.subtopicColor = 'success';
                this.maintopicColor = '';
            } else {
                this.subtopicColor = '';
                this.maintopicColor = 'success';
            }
        },
        async getApi() {
            const buffer = await this.$axios.get(`${process.env.CLUSTER_URL}${process.env.MASTER_DATA}HelpCategory/HelpCategoryDetails?languageCode=TH&appType=SP`);
            const help = buffer.data.Data.Help;
            // console.log(help);
            this.items = [];
            this.topic = [];
            for(let i = 0; i < help.length; i++) {
                this.items.push({ maintopicId: help[i].CategoryId, maintopic: help[i].Category });
                for(let j = 0; j < help[i].SubCategory.length; j++) {
                    const topic = {
                        maintopicId: help[i].CategoryId,
                        maintopic: help[i].Category,
                        subtopicId: help[i].SubCategory[j].HelpSubCategoryId,
                        subtopic: help[i].SubCategory[j].SubCategory
                    }
                    // console.log(topic);
                    this.topic.push(topic);
                }
            }
        },
        async createMaintopic() {
            if(this.subtopic == '') {
                console.log('Input subtopic shout not be empty.');
                return;
            }
            const bodyMaintopic = {
                Category: this.maintopic,
                LanguageCode: "TH",
                AppType: "SP",
                IsActive: true
            }
            let response = await this.$axios.post(`${process.env.CLUSTER_URL}${process.env.MASTER_DATA}HelpCategory/HelpCategory`, bodyMaintopic, {
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                },
            });
            const MaintopicId = response.data.Data.HelpCategoryId;

            const bodySubtopic = {
                HelpCategoryId: MaintopicId,
                SubCategory: this.subtopic,
                Description: "<p>input description</p>",
                LanguageCode: "TH",
                IsActive: true
            }
            response = await this.$axios.post(`${process.env.CLUSTER_URL}${process.env.MASTER_DATA}HelpSubCategory/HelpSubCategory`, bodySubtopic, {
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                },
            });

            this.maintopic = '';
            this.subtopic = '';
            this.getApi();
            this.addModal = false;
        },
        async createSubtopic() {
            if((this.subtopic == '') || (this.maintopicId == '')) {
                console.log('Input maintopic and subtopic shout not be empty.');
                return;
            }
            const bodySubtopic = {
                HelpCategoryId: this.maintopicId,
                SubCategory: this.subtopic,
                Description: "<i>พิมพ์ข้อความหรืออัพโหลดรูปภาพลงไปในนี้</i>",
                LanguageCode: "TH",
                IsActive: true
            }
            let response = await this.$axios.post(`${process.env.CLUSTER_URL}${process.env.MASTER_DATA}HelpSubCategory/HelpSubCategory`, bodySubtopic, {
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                },
            });
            console.log(response);
            this.subtopic = '';
            this.maintopicId = '',
            this.getApi();
            this.addModal = false;
        },
        async deleteMaintopic(id) {
            let response = await this.$axios.delete(`${process.env.CLUSTER_URL}${process.env.MASTER_DATA}HelpCategory/HelpCategory?helpCategoryId=${id}`);
            console.log(response);
            this.getApi();
            this.deleteModal = false;
        }
    },
    created() {
        this.getApi();
    }
}
</script>
  
<style scoped>
    .select-box {
        border-bottom: 1px solid #8f8989;
        width: 100%;
        padding: 8px 0 6px;
        outline: none;
        background: #f5f3f3;
        cursor: pointer;
        margin-bottom: 24px;
    }
    .label-box {
        font-size: 13px;
        color: #8f8989;
        float: none;
    }
</style>