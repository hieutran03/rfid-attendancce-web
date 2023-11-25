const dashboardRoutes = require("./dashboard.route");
const logMonitorRoutes = require("./logMonitor.route");
module.exports = (app) => {
  app.use("/admin/dashboard", dashboardRoutes);
  app.use("/admin/logMonitor", logMonitorRoutes);
}