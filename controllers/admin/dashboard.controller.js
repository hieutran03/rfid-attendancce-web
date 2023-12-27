const Employee = require("../../models/employee.model");
const Device = require("../../models/device.model");
const Log = require("../../models/userLog.model");
const WaitingList = require("../../models/waitingList.model");
const dates = [];
const counts = [];
const backgroundColor = new Array(7).fill("rgb(54, 162, 235)");

module.exports.index = async(req, res)=>{
    const numOfEmployees = await Employee.find().countDocuments();
    const numOfDevices = await Device.find().countDocuments();
    const numOfWaitings = await WaitingList.find().countDocuments();
    const stats = {

    }
    let targetDay = new Date(Date.now()).setHours(0,0,0,0);

    if(req.query.dateChose)
    {
        stats.dateChose = req.query.dateChose;
        targetDay =  new Date(req.query.dateChose).setHours(0,0,0,0);
    }
    const dayOfWeek = new Date(targetDay).getDay();
    const firstDateOfWeek = new Date(targetDay-dayOfWeek*1000*60*60*24);
    
    dates.length = 0;
    counts.length = 0;
    for(let i = 0; i < 7; i++){
        const itemDate = new Date(firstDateOfWeek.getTime()+i*1000*60*60*24);
        const startOfDay = new Date(itemDate);
        const endOfDay = new Date(itemDate);
        endOfDay.setHours(23, 59, 59, 999);
        const itemCount = await Log.find({
            timeIn:{
                $gte: startOfDay,
                $lte: endOfDay
            }
        }).countDocuments();
        dates.push(itemDate.toDateString());
        counts.push(itemCount);
    }

    backgroundColor.fill("rgb(54, 162, 235)");
    backgroundColor[dayOfWeek] = "rgb(255, 205, 86)";
    
    const Employees = await Employee.find();
    res.render("admin/pages/dashboard/index.pug", {
        pageTitle: "Trang tổng quan",
        numOfEmployees: numOfEmployees,
        numOfDevices: numOfDevices,
        numOfWaitings: numOfWaitings,
        dateChose: stats.dateChose
    });
}

module.exports.api = async(req,res)=>{
    res.status(200).json({
        status: "success",
        dates: dates,
        counts: counts,
        backgroundColor: backgroundColor
    });
}