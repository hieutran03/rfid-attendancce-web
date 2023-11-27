const Device = require("../../models/device.model");
module.exports.index = async (req, res)=>{
    const devices = await Device.find({
        deleted: false
    });
    res.render("admin/pages/device/index.pug",{
            pageTitle : "Danh sách thiết bị",
            devices: devices
        }
    );
}

module.exports.create = async (req, res)=>{
    res.render("admin/pages/device/create.pug",{
        pageTitle : "Tạo thiết bị",
    }
    );
}

module.exports.createPost = async(req, res)=>{
    const device = new Device(req.body);
    console.log(req.body);
    try{
        await device.save();    
    }catch(e){
        console.log(e);
    }
    
    res.redirect('/admin/device');
}
module.exports.delete = async(req, res)=>{
    const id = req.params.id;
    if(id != null)
        await Device.updateOne({_id:id},{
            deleted:true
        });
    res.redirect("back");
}

module.exports.edit = async(req, res)=>{
    const id = req.params.id;
    const device = await Device.findOne({_id:id});
    res.render("admin/pages/device/edit.pug",{
        pageTitle:"Sửa",
        device: device
    })
}

module.exports.editPatch = async(req, res)=>{
    const id = req.params.id;
    if(id != null)
        await Device.updateOne({_id:id},{
            ...req.body
        });
    res.redirect("/admin/device");
}