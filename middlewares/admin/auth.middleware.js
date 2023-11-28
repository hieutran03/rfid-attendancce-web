const Account = require("../../models/account.model");


module.exports.requireAuth = async (req, res, next) => {
  if(!req.cookies.token) {
    if(!req.body.token){
      res.redirect(`/admin/auth/login`);
    }else{
      const user = await Account.findOne({ token: req.body.token });
      if(!user) {
        res.redirect(`/admin/auth/login`);
      } else {
        next();
      }
    }
  } else {
    const user = await Account.findOne({ token: req.cookies.token });
    if(!user) {
      res.redirect(`/admin/auth/login`);
    } else {
      next();
    }
  }
}