const mongoose=require("mongoose");
const jwt=require("jsonwebtoken")
const bcrypt=require("bcryptjs")

const userSchema= new mongoose.Schema({
    name:{
        type:String,
        trim:true
    },
    userName:{
        type:String,
        trim:true,
        unique:true
    },
    email:{
        type:String,
        trim:true
    },
    password:{
        type:String,
        trim:true
    },
    Date:{
        type : Date,
        default : Date.now()
    },
  

   
    tokens:[
        {
            token:{
                type:String,
                required:true
            }
        }
    ]
})

userSchema.methods.generateAuthToken= async function(){
    try{

        const token= jwt.sign({_id:this._id},"dlfdldiojdfdfjdoffueyrieihkdfdflhfofhfdlfldffdrerbghykii")
         this.tokens=this.tokens.concat({token:token})
         this.save()
         return token;
    }catch(err){
     console.log(err)
    }
}

userSchema.pre("save",async function(next){
  
    if(this.isModified("password")){
        const salt = await bcrypt.genSalt(10)
        this.password= await bcrypt.hash(this.password,salt)
       

    }
    next();
});
    



const userCollection=new mongoose.model("userCollection",userSchema);
module.exports=userCollection;