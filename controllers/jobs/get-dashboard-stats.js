import DashboardStats from "../../models/dashboard-stats";

const GetDashboardStats = async (req, res) => {
  try {
    const dashboardStats = await DashboardStats.find();

    res.status(200).send(dashboardStats);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
export default GetDashboardStats;