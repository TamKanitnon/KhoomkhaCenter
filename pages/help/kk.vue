<template>
  <div class="container">
    <loading-page v-if="loading"></loading-page>
    <h2 class="text-center mt-2 mb-4">Help : Khoomkha Grocery</h2>
    <div class="row my-5">
      <v-row class="pa-2">
        <v-col clos="12">
          <div class="d-flex justify-space-between align-center mb-3">
            <div> Total item found : {{ topic.length }} </div>
            <div>
              <v-btn @click="addModal = true" color="success">
                <v-icon class="pr-1"> mdi-plus</v-icon> เพิ่ม
              </v-btn>
            </div>
          </div>
          <v-row class="my-3 mx-1">
            <v-text-field
              v-model="filterKeyword"
              label="Filter Search"
              outlined
              dense
              hide-details="auto"
            ></v-text-field>
          </v-row>
          <v-data-table
            :headers="headers"
            :items="topic"
            :items-per-page="15"
            class="elevation-1"
          >
          <template v-slot:[`item.index`]="{ index }">
            {{ index + 1 }}
          </template>
          <template v-slot:[`item.action`]="{ item }">
            <v-btn color="primary" @click="editTopic(item.id)">แก้ไข</v-btn>
            <v-btn color="error" @click="deleteTopic(item.id)">ลบ</v-btn>
          </template>
          </v-data-table>
        </v-col>
      </v-row>
    </div>

    <v-dialog v-if="addModal" max-width="700px" :value="true" persistent>
      <v-card>
        <div class="container">
          <h2 class="text-center">Add grocery topic</h2>
          <div class="justify-space-between align-center mb-3">
            <v-text-field label="Maintopic" v-model="maintopic"></v-text-field>
            <v-text-field label="Subtopic" v-model="subtopic"></v-text-field>
          </div>
          <div class="text-center">
            <v-btn color="primary">บันทึก</v-btn>
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
          Item ID: {{ idDelete }}
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="success">Confirm</v-btn>
          <v-btn color="error" @click="deleteModal = false">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog></v-dialog>

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
        headers: [
          { text: 'Index', value: 'index', align: 'left'},
          { text: 'ID', value: 'id', align: 'left'},
          { text: 'Maintopic', value: 'maintopic', align: 'left' },
          { text: 'Subtopic', value: 'subtopic', align: 'left' },
          { text: 'Action', value: 'action', align: 'center' },
        ],
        topic: [
          {
            id: '1111',
            maintopic: 'การสมัครใช้งานแพลตฟอร์ม',
            subtopic: 'ลงทะเบียนยังไง'
          },
          {
            id: '2222',
            maintopic: 'การสมัครใช้งานแพลตฟอร์ม',
            subtopic: 'เข้าสู่ระบบยังไง',
          },
          {
            id: '3333',
            maintopic: 'ตรวจสอบระบบการเงิน',
            subtopic: 'ตรวจสอบยอดขายรวมยังไง',
          },
          {
            id: '4444',
            maintopic: 'ตรวจสอบระบบการเงิน',
            subtopic: 'ตรวจสอบยอดค่าใช้จ่ายรวมยังไง',
          },
          {
            id: '5555',
            maintopic: 'สถานะการจัดส่งสินค้า',
            subtopic: 'ตรวจสอบสถานะการจัดส่งสินค้ายังไง',
          },
          {
            id: '6666',
            maintopic: 'สถานะการจัดส่งสินค้า',
            subtopic: 'สั่งสินค้าจากร้านค้าส่งได้ยังไง',
          },
        ],
      }
    },
    methods: {
      editTopic(id) {
        this.$router.push({ 
          path: '/help/kk-edit',
          query: {
            id: id
          }
        });
      },
      deleteTopic(id) {
        this.idDelete = id;
        this.deleteModal = true;
      }
    }
  }
</script>