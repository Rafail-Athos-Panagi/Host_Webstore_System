import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sidebarShow: true,
  usersStatistics: [],
  totalUsers: 0,
  incomeStatistics: [],
  totalIncome: 0,
  averageOrderValueStatistics: [],
  totalAverageOrderValue: 0,
  offerSalesStatistics: [],
  totalOffers: 0,
  monthlySalesStatistics: [],
  mostPopularDishesStatistics: [],
  mostPopularDishesLabels: [],
  recentlyAddedUsersStatistics: [],
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    set: (state, action) => {
      return { ...state, ...action.payload };
    },
    adminStats: (state, action) => {
      const {
        usersStatistics,
        totalUsers,
        incomeStatistics,
        totalIncome,
        averageOrderValueStatistics,
        totalAverageOrderValue,
        offerSalesStatistics,
        totalOffers,
        monthlySalesStatistics,
        mostPopularDishesStatistics,
        mostPopularDishesLabels,
        recentlyAddedUsersStatistics,
      } = action.payload;

      if (usersStatistics !== undefined) {
        state.usersStatistics = usersStatistics;
      }
      if (totalUsers !== undefined) {
        state.totalUsers = totalUsers;
      }
      if (incomeStatistics !== undefined) {
        state.incomeStatistics = incomeStatistics;
      }
      if (totalIncome !== undefined) {
        state.totalIncome = totalIncome;
      }
      if (averageOrderValueStatistics !== undefined) {
        state.averageOrderValueStatistics = averageOrderValueStatistics;
      }
      if (totalAverageOrderValue !== undefined) {
        state.totalAverageOrderValue = totalAverageOrderValue;
      }
      if (offerSalesStatistics !== undefined) {
        state.offerSalesStatistics = offerSalesStatistics;
      }
      if (totalOffers !== undefined) {
        state.totalOffers = totalOffers;
      }
      if (monthlySalesStatistics !== undefined) {
        state.monthlySalesStatistics = monthlySalesStatistics;
      }
      if (mostPopularDishesStatistics !== undefined) {
        state.mostPopularDishesStatistics = mostPopularDishesStatistics;
      }
      if (mostPopularDishesLabels !== undefined) {
        state.mostPopularDishesLabels = mostPopularDishesLabels;
      }
      if (recentlyAddedUsersStatistics !== undefined) {
        state.recentlyAddedUsersStatistics = recentlyAddedUsersStatistics;
      }
    },
  },
});

export const adminActions = adminSlice.actions;
export default adminSlice;
