const usersWebModel = require("../models/usersWebModel");
const functionHelper = require('../helpers/functionHelper');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
    create: async function (req, res, next) {
        try{
            console.log(req.body);
            const userWeb = new usersWebModel({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
            })
            const document = await userWeb.save();
            res.json(document);
        }catch(e){
            res.json({message:e.message});
        }        
    },
    login: async function (req, res, next){
        try{
            const userWeb = await usersWebModel.findOne({email:req.body.email});
            if (!userWeb){
                console.log(userWeb,functionHelper);
                res.json({
                    error:true, 
                    message:functionHelper('auth/user-not-found')
                });
                return
            }
            if(bcrypt.compareSync(req.body.password, userWeb.password)){
                const token = jwt.sign({userWeb:userWeb._id},req.app.get("secretKey"),{expiresIn:'30m'});
                res.json({error:false, message:functionHelper.userWeb.userOK, token:token});
                return
            }else{
                res.json({error:true, message:functionHelper.userWeb.passwordNoMatch});
                return
            }
            console.log(req.body);
        }catch(e){
            res.json({message:functionHelper(e.message)});
        }
    }
}