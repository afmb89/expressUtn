const mongoose = require('../bin/mongodb');
const functionHelper = require('../helpers/functionHelper');
const validators = require('../helpers/validators');
const bcrypt = require('bcrypt');

const userWebSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        validate:{
            validator: (v)=>{
                return validators.emailValidate(v);
            },
            message:functionHelper.userWeb.userExist
        }
    },
    password:{
        type:String,
        required:true,
        validate:{
            validator: (v)=>{
                return validators.isGoodPassword(v);
            },
            message:functionHelper.userWeb.passwordIncorrect
        }
    }
});

userWebSchema.pre("save", function (next){
    this.password  = bcrypt.hashSync(this.password,10);
    next();
});

userWebSchema.statics.findByIdAndValidate = async function(id){
    const docuemnt = await this.findById(id);
    if(!docuemnt){
        return{
            error:true,
            message:"No exite usuario"
        }
    }

    return document;
}

module.exports = mongoose.model("usersWeb", userWebSchema);