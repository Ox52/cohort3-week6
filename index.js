const express = require("express")

const app = express();

const users =[];

app.use(express.json())

function generate(){

    const options = [
      "a",
      "b",
      "c",
      "d",
      "e",
      "f",
      "g",
      "h",
      "i",
      "j",
      "k",
      "l",
      "m",
      "n",
      "o",
      "p",
      "q",
      "r",
      "s",
      "t",
      "u",
      "v",
      "w",
      "x",
      "y",
      "z",
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "J",
      "K",
      "L",
      "M",
      "N",
      "O",
      "P",
      "Q",
      "R",
      "S",
      "T",
      "U",
      "V",
      "W",
      "X",
      "Y",
      "Z",
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
    ];
    let token ="";

    for(i=0;i<32;i++){

        token =token+options[Math.floor(Math.random()*options.length)]
    }
    return token;
}


app.post("/signup",(req,res)=>{

    const username = req.body.username;
    const password = req.body.password;

// if (!username && !password){
//     return res.status(400).send("mot valid")
// }

// if (users.find(user =>user.username===username)){
//     return res.status(400).send("invalid")
// }
    users.push({
      username,
      password,
    });

    res.send({
        message:"your log in"
    })
console.log(users);
})


app.post("/signin", (req, res) => {
        const username = req.body.username;
        const password = req.body.password;


     const user =users.find(user=>user.username===username && user.password===password)

     if(user){
        const token= generate();
        user.token=token
        res.send(token)
     }else{
        res.status(403).send(
            {message:"nope"}
        )
     }
     console.log(users);
});


app.get("/me",(req,res)=>{

    token = req.header.token;

    let founduser = null
    for(i=0;i<users.length;i++){


        if(users[i].token =token){
founduser = users[i];
        }

        if(founduser){
res.json({
  username: founduser.username,
  password: founduser.password,
});


            
        }else{

            res.json({message:"no valid"})

        }
        

    }

})


app.listen(3000,()=>{
    console.log("sever is running")
})