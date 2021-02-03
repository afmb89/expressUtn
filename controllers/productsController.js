const productsModel = require("../models/productsModel");
const categoriesModel = require("../models/categoriesModel");

module.exports = {
    getAll:async function(req, res, next) {
        try{
            const productos = await productsModel
            .find({important:true})
            .limit(4)
            .populate("category");
            console.log("productos: ",productos);
            res.json(productos);
        }catch(e){
            console.log("e: ", e);
            next(e);
        }        
    },
    getAllPaginate:async function(req, res, next) {
        try{
            let queryFind={};
            if(req.query.buscar){
                queryFind={name:{$regex:".*"+req.query.buscar+".*",$options:"i"}}
            }
            const productos = await productsModel.paginate(queryFind, {
                sort:{name:1},
                populate:"category",
                limit:req.query.limit || 4,
                page:req.query.page || 1
            });
            res.json(productos['docs']);
        }catch(e){
            next(e);
        }        
    },/*
    getById: async function(req, res, next) {
        try{
            const productos = await productsModel.findById(req.params.id, {category:{$exist:true}})
            .populate("category")
            .select("name price sku description category.name");
            res.json(productos);
        }catch(e){
            next(e);
        }        
    },*/
    getByName: async function(req, res, next) {
        try{
            let queryFind={};
            if(req.query.buscar){
                queryFind={name:{$regex:".*"+req.query.buscar+".*",$options:"i"}}
            }
            const productos = await productsModel
            .find(queryFind)
            .populate("category")
            .select("name price sku description category.name");
            res.json(productos);
        }catch(e){
            next(e);
        }        
    },
    getByTags: async function(req, res, next) {
        try{
            const productos = await productsModel.findOne({"tags._id":req.params.id});
            res.json(productos);
        }catch(e){
            next(e);
        }        
    },
    create: async function(req, res, next){        
        try{
            const categoria = await categoriesModel.findByIdAndValidate(req.body.category);
            if(categoria.error){
                res.json(categoria);
                return;
            }
            const producto = new productsModel({
                name:req.body.name,
                sku:req.body.sku,
                description:req.body.description,
                price:req.body.price,
                img:req.body.img,
                category:req.body.category,
                tags:req.body.tags
            });
            const prod = await producto.save();
            const productos = await productsModel.find();
            res.json(productos);
        }catch(e){
            next(e.name);
        }
    },
    update: async function(req, res, next){
        try{
            let producto = await productsModel.updateOne({_id:req.params.id}, req.body, {multi:false});
            const productos = await productsModel.find();
            res.json(productos);
        }catch(e){
            next(e);
        }
    },
    delete: async function(req, res, next){
        try{
            let producto = await productsModel.deleteOne({_id:req.params.id});
            const productos = await productsModel.find();
            res.json(productos);
        }catch(e){
            next(e);
        }
    }
}