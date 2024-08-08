<template>
  <v-container>
    <loading-page v-if="isLoading"></loading-page>
    <h2 class="text-center mt-2 mb-4">Reports</h2>
    <v-row justify="center">
      <v-col cols="12" md="4">
        <v-select
          v-model="selectedPeriod"
          :items="periods"
          label="Select Time Period"
          dense
          outlined
        ></v-select>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="4" v-for="metric in metrics" :key="metric.title">
        <v-card>
          <v-card-title>{{ metric.title }}</v-card-title>
          <v-card-subtitle>{{ formatDate(selectedPeriod) }}</v-card-subtitle>
          <v-card-text>
            <div>Total: {{ metric.total }}</div>
            <div v-for="detail in metric.details" :key="detail.label">
              {{ detail.label }}: {{ detail.value }}
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex';
import LoadingPage from '@/components/LoadingPage';

export default {
  name: 'FinancialReports',
  components: {
    LoadingPage,
  },
  data() {
    return {
      isLoading: false,
      selectedPeriod: 'Day',
      periods: ['Day', 'Week', 'Month', 'Year', 'All Time'],
      metrics: [
        { title: 'Total Income', total: 0, details: [] },
        { title: 'Total Loss', total: 0, details: [] },
        { title: 'Total Revenue', total: 0, details: [] },
      ],
    };
  },
  watch: {
    selectedPeriod() {
      this.fetchData();
    },
  },
  created() {
    this.fetchData();
  },
  methods: {
    ...mapActions('finance', {
      fetchFinancialData: 'fetchFinancialData', // Map your Vuex action
    }),
    async fetchData() {
      this.isLoading = true;
      try {
        const response = await this.fetchFinancialData({ period: this.selectedPeriod });
        this.metrics = this.calculateMetrics(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        this.isLoading = false;
      }
    },
    calculateMetrics(data) {
      const income = data.filter(item => item.type === 'income');
      const loss = data.filter(item => item.type === 'loss');
      const revenue = data.filter(item => item.type === 'revenue');

      return [
        {
          title: 'Total Income',
          total: income.reduce((sum, item) => sum + item.amount, 0),
          details: income.map(item => ({ label: item.label, value: item.amount })),
        },
        {
          title: 'Total Loss',
          total: loss.reduce((sum, item) => sum + item.amount, 0),
          details: loss.map(item => ({ label: item.label, value: item.amount })),
        },
        {
          title: 'Total Revenue',
          total: revenue.reduce((sum, item) => sum + item.amount, 0),
          details: revenue.map(item => ({ label: item.label, value: item.amount })),
        },
      ];
    },
    formatDate(period) {
      const now = new Date();
      let startDate, endDate;
      switch (period) {
        case 'Day':
          startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
          endDate = new Date(startDate);
          endDate.setDate(endDate.getDate() + 1);
          break;
        case 'Week':
          startDate = new Date(now.setDate(now.getDate() - now.getDay()));
          endDate = new Date(startDate);
          endDate.setDate(endDate.getDate() + 7);
          break;
        case 'Month':
          startDate = new Date(now.getFullYear(), now.getMonth(), 1);
          endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0);
          break;
        case 'Year':
          startDate = new Date(now.getFullYear(), 0, 1);
          endDate = new Date(now.getFullYear(), 11, 31);
          break;
        case 'All Time':
        default:
          startDate = new Date(0);
          endDate = new Date();
      }
      return `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`;
    },
  },
};
</script>
