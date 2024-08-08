<template>
  <div class="container">
    <loading-page v-if="loading"></loading-page>
    <h2 class="text-center mt-2 mb-4">Dashboard</h2>
    <v-row class="row  my-5">
      <v-col cols="12" sm="6" >
        <!-- PIE: Income source (** should devide into day/week/month/year **)--> 
        <v-card class="my-3">
          <!-- Filter: Duration -->
          <v-row  class="time-group">
            <!-- DAY -->
            <v-col align="center">
              <button
                :class="{'active': selected === 'day'}"
                @click="selectTime('day')"
              >
                Day
              </button>
            </v-col>
            <!-- WEEK -->
            <v-col align="center" >
              <button
                :class="{'active': selected === 'week'}"
                @click="selectTime('week')"
              >
                Week
              </button>
            </v-col>
            <!-- MONTH -->
            <v-col align="center" >
              <button
                :class="{'active': selected === 'month'}"
                @click="selectTime('month')"
              >
                Month
              </button>
            </v-col>
            <!-- YEAR -->
            <v-col align="center" >
              <button
                :class="{'active': selected === 'year'}"
                @click="selectTime('year')"
              >
                Year
              </button>
            </v-col>
          </v-row>
          <!-- PIE CHART -->
          <v-row >
            <!-- CHART -->
            <v-col cols="8">
              <apexchart
                height="400"
                type="pie" 
                :options="IncomePie" 
                :series="IncomeData">
              </apexchart>
            </v-col>
            <!-- DATA -->
            <v-col cols="4" justify="center" class="my-auto">
              <div>Wholesale : {{ IncomeData[0] }}</div>
              <div>Promotion : {{ IncomeData[1] }}</div>
              <div>Fee : {{ IncomeData[2] }}</div>
              <div>Logistic : {{ IncomeData[3] }}</div>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6">
        <!-- LINE: 2 lines for new register -->
        <v-card class="my-3">
          <v-row  class="time-group-register">
            <!-- DAY -->
            <v-col align="center">
              <button
                :class="{'active': selectedRegister === '3m'}"
                @click="selectTime2('3m')"
              >
                3 Month
              </button>
            </v-col>
            <!-- WEEK -->
            <v-col align="center" >
              <button
                :class="{'active': selectedRegister === '6m'}"
                @click="selectTime2('6m')"
              >
                6 Month
              </button>
            </v-col>
            <!-- MONTH -->
            <v-col align="center" >
              <button
                :class="{'active': selectedRegister === '1y'}"
                @click="selectTime2('1y')"
              >
                1 Year
              </button>
            </v-col>
          </v-row>
          <apexchart
            :options="NewMemeberLine"
            :series="NewMemberData"
          >
          </apexchart>
        </v-card>
      </v-col>
      <v-col cols="12">
        <!-- BAR: Total income & expected each month -->
        <v-card align="center">
          <v-col cols="10">
            <apexchart
              :options="TotalIncomeColumn"
              :series="TotalIncomeData"
            >
            </apexchart>
          </v-col>
        </v-card>
      </v-col>      
    </v-row>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'Dashboard',
  data() {
    return {
      selected: 'day',
      IncomePie: {
        chart: {
          id: "apexchart-example",
        },
        title: {
          text: "Income sources",
          align: "center",
          margin: 30,
          style: {
            fontSize: "20px",
            fontWeight: "bold",
            color: "#263238",
          },
        },
        colors: ['#2E93fA', '#46DA62', '#242E8A', '#E91E63', '#FF9800'],
        dataLabels: {
          enabled: true,
        },
        legend: {
          show: true,
          position: 'bottom',
        },
        labels: ["Wholesale", "Promotion", "Fee", "Logistic"],
      },
      IncomeData: [60000, 5000, 1340, 1780],
      selectedRegister: 'day',
      NewMemeberLine:{
        chart: {
          height: 380,
          type: "line",
          stacked: false,
          zoom: {
            enabled: false
          },
        },
        title: {
          text: "New Register",
          align: "center",
          margin: 30,
          style: {
            fontSize: "20px",
            fontWeight: "bold",
            color: "#263238",
          },
        },
        dataLabels: {
          enabled: false
        },
        colors: ["#FF1654", "#247BA0"],
        stroke: {
          width: [4, 4]
        },
        plotOptions: {
          bar: {
            columnWidth: "20%"
          }
        },
        xaxis: {
          categories: ['Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr']
        },
        yaxis: [
        {
          axisTicks: {
            show: true
          },
          axisBorder: {
            show: true,
            color: "#FF1654"
          },
          labels: {
            style: {
              colors: "#FF1654"
            }
          },
          title: {
            text: "Wholesale",
            style: {
              color: "#FF1654"
            }
          }
        },
        {
          opposite: true,
          axisTicks: {
            show: true
          },
          axisBorder: {
            show: true,
            color: "#247BA0"
          },
          labels: {
            style: {
              colors: "#247BA0"
            }
          },
          title: {
            text: "Grocery",
            style: {
              color: "#247BA0"
            }
          }
        }
      ],
      grid: {
          row: {
            colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
            opacity: 0.5
          },
        },
      tooltip: {
        y: [
          {
            title: {
              formatter: function (val) {
                return val + " : "
              }
            }
          },
          {
            title: {
              formatter: function (val) {
                return val + " : "
              }
            }
          },
        ]
      },
      legend: {
        horizontalAlign: "left",
        offsetX: 40
      }
      },
      NewMemberData:[
        {
          name: "Wholesale",
          data: [200, 300, 500, 600, 620, 860],
        },
        {
          name: "Grocery",
          data: [2000, 2700, 2000, 4100, 4200, 4760],
        }
      ],
      TotalIncomeColumn: {
        title: {
          text: "Achive Income & Expected Income",
          align: "center",
          margin: 30,
          style: {
            fontSize: "20px",
            fontWeight: "bold",
            color: "#263238",
          },
        },
        chart: {
          height: 750,
          type: 'bar',
        },
        plotOptions: {
          bar: {
            columnWidth: '50%'
          }
        },
        colors: ['#00E396'],
        dataLabels: {
          enabled: false
        },
        legend: {
          show: true,
          showForSingleSeries: true,
          customLegendItems: ['Actual', 'Expected'],
          markers: {
            fillColors: ['#00E396', '#775DD0']
          }
        }
      },
      TotalIncomeData: [
        {
          name: 'Actual',
          data: [
            {
              x: 'Sep 2024',
              y: 196250,
              goals: [
                {
                  name: 'Expected',
                  value: 300000,
                  strokeHeight: 5,
                  strokeColor: '#775DD0'
                }
              ]
            },
            {
              x: 'Oct 2024',
              y: 420680,
              goals: [
                {
                  name: 'Expected',
                  value: 400000,
                  strokeHeight: 5,
                  strokeColor: '#775DD0'
                }
              ]
            },
            {
              x: 'Nov 2024',
              y: 593143,
              goals: [
                {
                  name: 'Expected',
                  value: 600000,
                  strokeHeight: 5,
                  strokeColor: '#775DD0'
                }
              ]
            },
            {
              x: 'Dec 2024',
              y: 950063,
              goals: [
                {
                  name: 'Expected',
                  value: 900000,
                  strokeHeight: 5,
                  strokeColor: '#775DD0'
                }
              ]
            },
            {
              x: 'Jan 2025',
              y: 1206781,
              goals: [
                {
                  name: 'Expected',
                  value: 1200000,
                  strokeHeight: 13,
                  strokeWidth: 0,
                  strokeLineCap: 'round',
                  strokeColor: '#775DD0'
                }
              ]
            },
            {
              x: 'Feb 2025',
              y: 2361951,
              goals: [
                {
                  name: 'Expected',
                  value: 1500000,
                  strokeHeight: 5,
                  strokeColor: '#775DD0'
                }
              ]
            },
            {
              x: 'Mar 2025',
              y: 2894136,
              goals: [
                {
                  name: 'Expected',
                  value: 2000000,
                  strokeHeight: 5,
                  strokeColor: '#775DD0'
                }
              ]
            },
            {
              x: 'Apr 2025',
              y: 3194687,
              goals: [
                {
                  name: 'Expected',
                  value: 2500000,
                  strokeHeight: 2,
                  strokeDashArray: 2,
                  strokeColor: '#775DD0'
                }
              ]
            },
            {
              x: 'May 2025',
              y: 3481679,
              goals: [
                {
                  name: 'Expected',
                  value: 3000000,
                  strokeHeight: 2,
                  strokeDashArray: 2,
                  strokeColor: '#775DD0'
                }
              ]
            },
            {
              x: 'Jun 2025',
              y: 3416785,
              goals: [
                {
                  name: 'Expected',
                  value: 3500000,
                  strokeHeight: 2,
                  strokeDashArray: 2,
                  strokeColor: '#775DD0'
                }
              ]
            },
            {
              x: 'Jul 2025',
              y: 3951367,
              goals: [
                {
                  name: 'Expected',
                  value: 4000000,
                  strokeHeight: 2,
                  strokeDashArray: 2,
                  strokeColor: '#775DD0'
                }
              ]
            },
            {
              x: 'Aus 2025',
              y: 4689156,
              goals: [
                {
                  name: 'Expected',
                  value: 4500000,
                  strokeHeight: 2,
                  strokeDashArray: 2,
                  strokeColor: '#775DD0'
                }
              ]
            },
          ]
        }

      ]
    }
  },
  computed: {
  },
  watch: {
  },
  async created() {
  },
  methods: {
    // --- INCOME SOURCE ---
    selectTime(timePeriod) {
      this.selected = timePeriod;
      switch (timePeriod) {
        case 'day':
          this.dayPieIncome();
          break;
        case 'week':
          this.weekPieIncome();
          break;
        case 'month':
          this.monthPieIncome();
          break;
        case 'year':
          this.yearPieIncome();
          break;
      }
    },
    dayPieIncome(){
      this.IncomePie =  {
        chart: {
          id: "apexchart-example",
        },
        title: {
          text: "Income sources",
          align: "center",
          margin: 30,
          style: {
            fontSize: "20px",
            fontWeight: "bold",
            color: "#263238",
          },
        },
        colors: ['#2E93fA', '#46DA62', '#242E8A', '#E91E63', '#FF9800'],
        dataLabels: {
          enabled: true,
        },
        legend: {
          show: true,
          position: 'bottom',
        },
        labels: ["Wholesale", "Promotion", "Fee", "Logistic"],
      };
      this.IncomeData= [52000, 5000, 1340, 1780];
    },
    weekPieIncome(){
      this.IncomePie =  {
        chart: {
          id: "apexchart-example",
        },
        title: {
          text: "Income sources",
          align: "center",
          margin: 30,
          style: {
            fontSize: "20px",
            fontWeight: "bold",
            color: "#263238",
          },
        },
        colors: ['#2E93fA', '#46DA62', '#242E8A', '#E91E63', '#FF9800'],
        dataLabels: {
          enabled: true,
        },
        legend: {
          show: true,
          position: 'bottom',
        },
        labels: ["Wholesale", "Promotion", "Fee", "Logistic"],
      };
      this.IncomeData= [257802, 29000, 7640, 8780];
    },
    monthPieIncome(){
      this.IncomePie =  {
        chart: {
          id: "apexchart-example",
        },
        title: {
          text: "Income sources",
          align: "center",
          margin: 30,
          style: {
            fontSize: "20px",
            fontWeight: "bold",
            color: "#263238",
          },
        },
        colors: ['#2E93fA', '#46DA62', '#242E8A', '#E91E63', '#FF9800'],
        dataLabels: {
          enabled: true,
        },
        legend: {
          show: true,
          position: 'bottom',
        },
        labels: ["Wholesale", "Promotion", "Fee", "Logistic"],
      };
      this.IncomeData= [986345, 120568, 35070, 29956];
    },
    yearPieIncome(){
      this.IncomePie =  {
        chart: {
          id: "apexchart-example",
        },
        title: {
          text: "Income sources",
          align: "center",
          margin: 30,
          style: {
            fontSize: "20px",
            fontWeight: "bold",
            color: "#263238",
          },
        },
        colors: ['#2E93fA', '#46DA62', '#242E8A', '#E91E63', '#FF9800'],
        dataLabels: {
          enabled: true,
        },
        legend: {
          show: true,
          position: 'bottom',
        },
        labels: ["Wholesale", "Promotion", "Fee", "Logistic"],
      };
      this.IncomeData= [16590863, 1658080, 406138, 389462];
    },

    // --- LINE CHART ---
    selectTime2(timePeriod) {
      this.selectedRegister = timePeriod;
      switch (timePeriod) {
        case '3m':
          this.threeMonthRegister();
          break;
        case '6m':
          this.sixMonthRegister();
          break;
        case '1y':
          this.yearRegister();
          break;
        
      }
    },
    threeMonthRegister(){
      this.NewMemeberLine = {
        ...this.NewMemeberLine,
        xaxis: {
          categories: ['Sep', 'Oct', 'Nov']
        },
      };
      this.NewMemberData = [
        {
          name: "Wholesale",
          data: [ 200, 300, 500 ],
        },
        {
          name: "Grocery",
          data: [ 2000, 2700, 2000 ],
        }
      ];
    },
    sixMonthRegister(){
      this.NewMemeberLine = {
        ...this.NewMemeberLine,
        xaxis: {
          categories: [ 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb' ]
        },
      };
      this.NewMemberData = [
        {
          name: "Wholesale",
          data: [ 200, 300, 500, 600, 620, 860 ],
        },
        {
          name: "Grocery",
          data: [ 2000, 2700, 2000, 4100, 4200, 4760 ],
        }
      ];
    },
    yearRegister(){
      this.NewMemeberLine = {
        ...this.NewMemeberLine,
        xaxis: {
          categories: [ 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug' ]
        },
      };
      this.NewMemberData = [
        {
          name: "Wholesale",
          data: [ 200, 300, 500, 600, 620, 860, 900, 1020, 1300, 1460, 1630, 1800 ],
        },
        {
          name: "Grocery",
          data: [ 2000, 2700, 2000, 4100, 4200, 4760, 6000, 6700, 8000, 9500, 10300, 12220 ],
        }
      ];
    },
  }
};

</script>

<style>
.time-group,
.time-group-register {
  display: flex;
  gap: 10px;
}

.time-group button,
.time-group-register button {
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  background-color: #f0f0f0;
}


.time-group button.active,
.time-group-register button.active {
  background-color: #007bff;
  color: white;
}
</style>