const dashboardRoutes = require("./dashboard.route");
const logMonitorRoutes = require("./logMonitor.route");
const deviceRoutes = require("./device.route");
const accountRoutes = require("./account.route");
const authRoutes = require("./auth.route")
const authMiddleware = require("../../middlewares/admin/auth.middleware");

module.exports = (app) => {
  app.use("/admin/dashboard",
    authMiddleware.requireAuth,
    dashboardRoutes);
  // app.use("/",
  //   authMiddleware.requireAuth,
  //   dashboardRoutes
  // );
  // app.use("/admin",
  //   authMiddleware.requireAuth,
  //   dashboardRoutes
  // );
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
  app.get("*", (req, res) => {
    res.render("admin/pages/errors/404.pug", {
      pageTitle: "404 Not Found",
    });
  });
}