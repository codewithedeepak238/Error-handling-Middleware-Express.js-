const express = require("express");

const app = express();

// Middleware - Plugins
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next)=>{
    const body = req.body;

    let specialChars =/[`!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?~ ]/;

    function containsUppercase(str) {
        return /[A-Z]/.test(str);
    }

    function containsNumber(str) {
        return /\d/.test(str);
    }

    if (!body.first_name || !body.last_name || !body.password || !body.email || !body.phone) {
        return res.status(200).json({ status: "unsuccessful", error: "All fields must be filled." })
    } else if (body.password.length<8) {
        return res.status(200).json({ status: "unsuccessful", error: "Password must be of minimum 8 char lenght." })
    }else if(!specialChars.test(body.password)){
        return res.status(200).json({ status: "unsuccessful", error: "Password must contain a special character." })
    }else if(!containsNumber(body.password)){
        return res.status(200).json({ status: "unsuccessful", error: "Password must contain a numeric letter." })
    }else if(!containsUppercase(body.password)){
        return res.status(200).json({ status: "unsuccessful", error: "Password must contain a uppercase letter." })
    }else if(body.phone.length<10){
        return res.status(200).json({ status: "unsuccessful", error: "Phone number must of 10 digits long." })
    }else if(!body.email.includes("@")){
        return res.status(200).json({ status: "unsuccessful", error: "Please enter a valid email address." })
    }else if(body.first_name[0]!==body.first_name[0].toUpperCase()){
        return res.status(200).json({ status: "unsuccessful", error: "First letter of name must be in capital." })
    }else if(body.last_name[0]!==body.last_name[0].toUpperCase()){
        return res.status(200).json({ status: "unsuccessful", error: "First letter of last name must be in capital." })
    }
    
    next();
})

//Routes
app.get("/", (req, res) => {
    return res.send("Homepage")
});

app.post("/signup", (req, res) => {
    return res.json({ status: 'Successfull' });
});

app.listen(8000, () => console.log("Server Started!!"))