
const searchHelper = require("../../helpers/search");
const UserLog = require("../../models/userLog.model")
const Employee = require("../../models/employee.model");
const Device = require("../../models/device.model");
const WaitingList = require("../../models/waitingList.model");

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

    try{
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
    }catch(e){
        console.log(e)
    }
    
    
    
}
module.exports.create = async(req,res)=>{
    const log ={
    }
    
    // console.log(req.body);
    log.deviceID = req.body.deviceID;
    log.uid = req.body.tagID.toString();
    timeIn = (`${req.body.timestamp}`);
    log.timeIn = new Date(timeIn);
    
    const employee = await Employee.find({
        _id: log.uid
    })
    const device = await Device.find({
        _id: log.deviceID
    })
    if(device.length == 0){
        res.send("Invallid Card");
        return;
    }
    if(employee.length == 0){
        res.send("Invallid Card");
        const newWaiting = new WaitingList(log);
        try{
            const test = await WaitingList.find({
                uid: newWaiting.uid
            })
            if(test.length === 0)
                await newWaiting.save();
        }catch{

        }
        
        return;
    }
    
    const newLog = new UserLog(log);
    console.log(newLog);
    try{
        await newLog.save();
    }
    catch(e){
        console.log(e);
    }
    res.send(newLog);
}
