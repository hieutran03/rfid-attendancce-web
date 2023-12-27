const WaitingList = require("../../models/waitingList.model");
const Employee = require("../../models/employee.model");
const paginationHelper = require("../../helpers/pagination");
module.exports.index = async(req,res)=>{
    const count= await WaitingList.countDocuments({});
    let objectPagination = paginationHelper(
        {
        currentPage: 1,
        limitItems: 5
        },
        req.query,
        count
    );
   
    
    const waitingList = await WaitingList.find({})
        .populate({
            path: "deviceID",
        })
        .sort({ timeIn: "desc" })
        .limit(objectPagination.limitItems)
        .skip(objectPagination.skip);;
    
        
    
        
    const result = waitingList.filter((item)=> item.deviceID !== null);

    res.render("admin/pages/waitingList/index.pug",{
        pageTitle: "Danh sách chờ",
        waitingList: result,
        pagination: objectPagination
    });
}
module.exports.deleteItem =  async(req, res)=>{
    const id = req.params.id;
    if(id != null)
        await WaitingList.deleteOne({_id: id});
    res.redirect("back");
}

module.exports.create = async(req, res)=>{
    const id = req.params.id;
    const waiting = await WaitingList.findOne({
        _id: id
    })
    res.render("admin/pages/waitingList/create.pug",{
        pageTitle:"Tạo nhân viên",
        waiting:waiting
    })
}

module.exports.createPost = async(req, res) =>{
    if(req.body.gender === "true"){
        req.body.gender = true;
    }
    else{
        req.body.gender = false;
    }
    const employee = new Employee(req.body);
    try{
        await WaitingList.deleteOne({_id : req.body.idDel})
        await employee.save();
    }catch(e){
        console.log(e);
    }
    
    res.redirect('/admin/waitingList');
}