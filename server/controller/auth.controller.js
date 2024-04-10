import User from "../models/user.models.js"

export const signup = async(req, res)=>{
    try {
    const{fullName , username,password,confirmPassword,gender} = req.body;
    console.log(req.body);
    // confirm password condition
    if (password !== confirmPassword) {
        return res.status(400).json({error:"password don't match"})
      }
     // finding user in database 
     console.log(12);
     const user  = await User.findOne({username});
     console.log(14);
     // if username already exist 
     if (user) {return res.status(400).json({error:"Username already exists"})}
     console.log(17);
     // getting rabndom user profile  from avatar.iran
     const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
		 const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`; 
     console.log(21);
     // creating user object 
     const newUser = new User ({
      
        fullName,
        username,
        password,
        gender,
        profilePic : gender === "male" ? boyProfilePic:girlProfilePic
      
     });
    //  console.log(newUser);
     // user doees not exist already then save it to database 
     await newUser.save();
     console.log(35);
res.status(201).json({
  status:"success"
})
    } catch (error) {
      console.log("error in signup",error.message)
        res.status(500).json({error:'internet server error'});
    }
} 

export const login = async(req, res)=>{
    try {
      console.log('login');
    } catch (error) {
        console.log(error)
    }
} 
export const logout = async(req, res)=>{
    try {
      console.log('logout');
    } catch (error) {
        console.log(error)
    }
} 