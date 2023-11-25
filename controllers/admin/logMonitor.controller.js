
const searchHelper = require("../../helpers/search");
const Log = require("../../models/userLog.model")
module.exports.index = async(req, res)=>{
    // const findFilter ={
    // }
    // const objectSearch={

    // }
    // try{
    //     if(req.query.timeIn){
    //         const targetDate = new Date(`${req.query.timeIn}T00:00:00.000+07:00`);
    //         const startOfDay = new Date(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate());
    //         const endOfDay = new Date(startOfDay);
    //         endOfDay.setHours(23, 59, 59, 999);
    //         findFilter.timeIn = {
    //             $gte: startOfDay,
    //             $lte: endOfDay
    //         }
    //         objectSearch.timeIn = req.query.timeIn;
    //         // console.log(findFilter.timeIn);
    //     }
    // }catch(e){
    //     console.log(e)
    // }
    // try{
    //     if(req.query.uid){
    //         searchHelper(req.query, "uid", objectSearch);

    //         findFilter.uid = objectSearch.uidRegex;
    //     }
    //     if(req.query.name){
    //         searchHelper(req.query, "name", objectSearch);
    //         findFilter.name = objectSearch.nameRegex;
    //     }
        
        
    // }catch(e){
    //     console.log(e);
    // }
    // console.log(findFilter);
    const userLogs = await Log.find();
    console.log(userLogs)
    // res.render("admin/pages/logMonitor", {
    //     pageTitle: "Trang giám sát",
    //     filter: objectSearch,
    //     userLogs: userLogs
    // });
    res.send("Ok")
}
module.exports.create = async(req,res)=>{
    const log ={
    }
    
    // console.log(req.body);
    log.deviceID = req.body.deviceID;
    log.uid = req.body.tagID;
    log.timeIn = new Date(req.body.timestamp);
    const newLog = new UserLog(log);
    // console.log(newLog);
    await newLog.save();
    res.send(newLog);
}
