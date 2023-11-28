
const searchHelper = require("../../helpers/search");
const UserLog = require("../../models/userLog.model")
const Employee = require("../../models/employee.model");
const Device = require("../../models/device.model");
module.exports.index = async(req, res)=>{
    const findFilter ={

    }
    const objectSearch={

    }

    try{
        if(req.query.timeIn){
            const targetDate = new Date(`${req.query.timeIn}T00:00:00.000+07:00`);
            const startOfDay = new Date(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate());
            const endOfDay = new Date(startOfDay);
            endOfDay.setHours(23, 59, 59, 999);
            findFilter.timeIn = {
                $gte: startOfDay,
                $lte: endOfDay
            }
            objectSearch.timeIn = req.query.timeIn;
            // console.log(findFilter.timeIn);
        }
        if(req.query.deviceName){
            searchHelper(req.query, "deviceName", objectSearch);
            const devices = await Device.find({deviceName:objectSearch.deviceNameRegex}).select("_id");
            findFilter.deviceID = {$in: devices};   
        }
        if(req.query.name){
            searchHelper(req.query, "name", objectSearch);
            const employees = await Employee.find({name:objectSearch.nameRegex}).select("_id");
            findFilter.uid = {$in: employees};
        }        
    }catch(e){
        console.log(e)
    }
    console.log(findFilter)
    const userLogs = await UserLog
        .find(findFilter).populate([{
            path: "uid",
        },{
            path: "deviceID"
        }])
        .sort({timeIn: "desc"});
    
    res.render("admin/pages/logMonitor", {
        pageTitle: "Trang giám sát",
        filter: objectSearch,
        userLogs: userLogs
    });
}
module.exports.create = async(req,res)=>{
    const log ={
    }
    
    // console.log(req.body);
    log.deviceID = req.body.deviceID;
    log.uid = req.body.tagID.toString();
    timeIn = (`${req.body.timestamp}`);
    console.log(timeIn)
    log.timeIn = new Date(timeIn);
    console.log(log.timeIn);
    const newLog = new UserLog(log);
    console.log(newLog);
    await newLog.save();
    res.send(newLog);
}
