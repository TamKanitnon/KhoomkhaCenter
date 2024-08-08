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
              <v-btn @click="handleAddItem" color="success">
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
            <v-btn color="primary">แก้ไข</v-btn>
            <v-btn color="error">ลบ</v-btn>
          </template>
          </v-data-table>
        </v-col>
      </v-row>
    </div>

  </div>
</template>

<script>
  export default {
    data () {
      return {
        headers: [
          { text: 'Index', value: 'index', align: 'left'},
          { text: 'Maintopic', value: 'maintopic', align: 'left' },
          { text: 'Subtopic', value: 'subtopic', align: 'left' },
          { text: 'Action', value: 'action', align: 'center' },
        ],
        topic: [
          {
            maintopic: 'การสมัครใช้งานแพลตฟอร์ม',
            subtopic: 'ลงทะเบียนยังไง',
          },
          {
            maintopic: 'การสมัครใช้งานแพลตฟอร์ม',
            subtopic: 'เข้าสู่ระบบยังไง',
          },
          {
            maintopic: 'ตรวจสอบระบบการเงิน',
            subtopic: 'ตรวจสอบยอดขายรวมยังไง',
          },
          {
            maintopic: 'ตรวจสอบระบบการเงิน',
            subtopic: 'ตรวจสอบยอดค่าใช้จ่ายรวมยังไง',
          },
          {
            maintopic: 'สถานะการจัดส่งสินค้า',
            subtopic: 'ตรวจสอบสถานะการจัดส่งสินค้ายังไง',
          },
          {
            maintopic: 'สถานะการจัดส่งสินค้า',
            subtopic: 'สั่งสินค้าจากร้านค้าส่งได้ยังไง',
          },
        ],
      }
    },
  }
</script>