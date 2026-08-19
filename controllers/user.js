import User from "../models/user.js"


async function handleuserSignup(req, res){
  const {name, email, password} = req.body;
   console.log("NAME =", name);
  console.log("EMAIL =", email);
  console.log("PASSWORD =", password);
  await User.create({
    name,
    email,
    password,
  });
  return res.redirect("/");
}


async function handleuserLogin(req, res){
  const {email, password} = req.body;
  const user = await User.findOne({email, password});
  if(!user)
    return res.render("login",{
      error: "Invalid Username or Password",
    });
  return res.redirect("/");
}

export {handleuserSignup, handleuserLogin};