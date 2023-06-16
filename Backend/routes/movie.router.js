const express=require("express")
const {MovieModel}=require("../model/movie.model")
const jwt=require("jsonwebtoken")
const { auth } = require("../middleware/auth.middleware")
require("dotenv").config()

const movieRouter=express.Router()

movieRouter.use(auth)

movieRouter.post("/add",async(req,res)=>{
    try{
        const movie=new MovieModel(req.body)
        await movie.save()
        res.status(200).json({msg:"Movie has been added", movie:req.body})
    }catch(err){
        res.status(400).json({err:err.message})
    }
})
movieRouter.get("/",async(req,res)=>{
    try {
        const movie= await MovieModel.find({userId:req.body.userId})
        res.status(200).json({movie})
        
    } catch (error) {
        res.status(400).json({err:err.message})
    }
    
})

movieRouter.patch("/update/:movieID",async(req,res)=>{
    const userDocId=req.body.userID
    const {movieID}=req.params
    try {
        const movie=await MovieModel.findOne({_id:movieID});
        const userMovieId=movie.userID

        if(userDocId===userMovieId){
            await MovieModel.findByIdAndUpdate({_id:movieID},req.body)
            res.status(200).json({msg:"Movie has been updated"})
        }else{
            res.status(200).json({msg:"Not Authorized"})
        }
        
    } catch (error) {
        res.status(400).json({error:error.message})
    }
    
    
})
movieRouter.delete("/delete/:movieID",async(req,res)=>{
    const userDocId=req.body.userID
    const {movieID}=req.params
    try {
        const movie=await MovieModel.findOne({_id:movieID});
        const userMovieId=movie.userID

        if(userDocId===userMovieId){
            await MovieModel.findByIdAndDelete({_id:movieID})
            res.status(200).json({msg:"Movie has been deleted"})
        }else{
            res.status(200).json({msg:"Not Authorized"})
        }
        
    } catch (error) {
        res.status(400).json({error:error.message})
    }
})


movieRouter.get("/page/:pagenum",async(req,res)=>{
    const Page_Size=3
    const {pagenum}=req.params
    try {
        const movie=await MovieModel.find({}).skip((pagenum-1)*Page_Size).limit(Page_Size)
        res.status(200).json({movie})
    } catch (error) {
        res.status(400).json({error:error.message})
    }
})


module.exports={
    movieRouter
}