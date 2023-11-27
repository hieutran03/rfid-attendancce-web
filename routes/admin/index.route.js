const dashboardRoutes = require("./dashboard.route");
const logMonitorRoutes = require("./logMonitor.route");
const deviceRoutes = require("./device.route");
const accountRoutes = require("./account.route");
const authRoutes = require("./auth.route")
module.exports = (app) => {
  app.use("/admin/dashboard", dashboardRoutes);
  app.use("/admin/logMonitor", logMonitorRoutes);
  app.use("/admin/device", deviceRoutes);
  app.use("/admin/accounts", accountRoutes);
  app.use("/admin/auth", authRoutes)
}