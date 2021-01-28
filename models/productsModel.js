const mongoose = require('../bin/mongodb');
const functionHelper = require('../helpers/functionHelper');

const tagsSChema = new mongoose.Schema({
    name:String
});

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,functionHelper.General.campo_obligatorio],
        minlength:1,
        maxlength:10
    },
    sku:{
        type:String,
        unique:true
    },
    description:String,
    price:{
        type:Number,
        get:function(price){
            return price*1.21
        }
    },
    status:{
        type:String,
        enum:["aprobado","inactivo"]
    },
    category:{
        type:mongoose.Schema.ObjectId,
        ref:"categories"
    },
    tags:[tagsSChema]
});

productSchema.virtual("price_currency").get(function(){
    return "$ "+this.price;
});

productSchema.set("toJSON",{getters:true,virtuals:true})

productSchema.plugin(mongoose.mongoosePaginate);

module.exports = mongoose.model("products", productSchema);