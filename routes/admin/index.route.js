const dashboardRoutes = require("./dashboard.route");
const employeeRoutes = require("./employee.route");
const logMonitorRoutes = require("./logMonitor.route");
const deviceRoutes = require("./device.route");
const accountRoutes = require("./account.route");
const authRoutes = require("./auth.route");
const waitingListRoutes = require("./waitingList.route");
const authMiddleware = require("../../middlewares/admin/auth.middleware");

module.exports = (app) => {
  app.use("/admin/dashboard",
    authMiddleware.requireAuth,
    dashboardRoutes);
  app.use("/admin/employee",
    authMiddleware.requireAuth,
    employeeRoutes);
  app.use("/admin/logMonitor",
    authMiddleware.requireAuth,  
    logMonitorRoutes);
  app.use("/admin/device",
    authMiddleware.requireAuth,  
    deviceRoutes);
  app.use("/admin/accounts",
    authMiddleware.requireAuth,   
    accountRoutes);
  app.use("/admin/auth",
    authRoutes);
  app.use("/admin/waitingList",
    waitingListRoutes
  );
  app.get("*", (req, res) => {
    res.render("admin/pages/errors/404.pug", {
      pageTitle: "404 Not Found",
    });
  });
}