const mongoose = require('../bin/mongodb');

const categorySchema = new mongoose.Schema({
    name:String
});

categorySchema.statics.findByIdAndValidate = async function(id){
    const docuemnt = await this.findById(id);
    if(!docuemnt){
        return{
            error:true,
            message:"No exite categoria"
        }
    }

    return document;
}

module.exports = mongoose.model("categories", categorySchema);