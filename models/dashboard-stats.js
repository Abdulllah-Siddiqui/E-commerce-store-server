import mongoose from 'mongoose';

const dashboardStatSchema = mongoose.Schema(
  {
    todayStats: {
      type: Object
    },
    sevenDayStats: {
      type: Object
    },
    thirtyDayStats: {
      type: Object
    },
    ordersPaid: {
      type: Number
    },
    ordersUnPaid: {
      type: Number
    },
    topSellingOrders: {
      type: Object
    },
    statsOfYear: {
      type: Object
    },
  },
  {
    timestamps: true
  }
);

const DashboardStats = mongoose.model('DashboardStats', dashboardStatSchema);

export default DashboardStats;