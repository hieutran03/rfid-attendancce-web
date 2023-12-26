const Employee = require("../../models/employee.model");
const paginationHelper = require("../../helpers/pagination");
module.exports.index = async(req, res)=>{
    const find = {
        deleted:false
    }
    const countEmployee= await Employee.countDocuments(find);
    let objectPagination = paginationHelper(
        {
        currentPage: 1,
        limitItems: 5
        },
        req.query,
        countEmployee
    );
    const employees = await Employee
        .find(find)
        .sort({ name: "desc" })
        .limit(objectPagination.limitItems)
        .skip(objectPagination.skip);
    res.render("admin/pages/employee/index.pug", {
        pageTitle: "Danh sách nhân viên",
        employees: employees,
        pagination: objectPagination
    });
}

module.exports.create = async(req, res) =>{
    res.render("admin/pages/employee/create.pug",{
        pageTitle:"Tạo nhân viên"        
    });
    

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
        await employee.save();    
    }catch(e){
        console.log(e);
    }
    
    res.redirect('/admin/employee');
}

module.exports.deleteEmployee = async(req, res)=>{
    const id = req.params.id;
    if(id != null)
        await Employee.updateOne({_id:id},{
            deleted:true
        });
    res.redirect("back");
}

module.exports.editEmployee = async(req, res)=>{
    const id = req.params.id;
    const employee = await Employee.findOne({_id:id});
    res.render("admin/pages/employee/edit.pug",{
        pageTitle:"Tạo nhân viên",
        employee:employee
    })
}

module.exports.editEmployeePatch = async(req, res)=>{
    const id = req.params.id;
    if(id != null)
        await Employee.updateOne({_id:id},{
            ...req.body
        });
    res.redirect("/admin/employee");
}