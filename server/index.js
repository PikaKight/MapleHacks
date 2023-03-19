const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt")
const {saveData, findAll, checkExist, update, deleteOne, findOneStr} = require('./database.js');
const Account = require('./schema/account');


const port = 5000;

const app = express();

app.use(express.json())
app.use(cors());


const calcEmission = (type, value) => {
   const emission = {
        'Bus': 4.3,
        'Car': 17.28,  // assume avg 90 km/h and 0.192 kg/km (2018)
        'Bike': 0.52, // assume avg 25.5 km/h and
        'Red Meat': 8.0,
        'Dairy': 6.3,
        'Grains': 3.7,
        'Cellphone': 3.6,
        'PC': 4.2,
        'TV': 6.8
    }

    let carbonEmmission = value*emission[type]

    return carbonEmmission
}

app.post('/login', async (req, res) => {

    // uses mongoose's exists to check if the user exists
    let isUser = await checkExist(Account, "username", req.body.username);

    // if user exists then it will try to login
    if (isUser){
        try {
            // gets the user's info
            let user = await findOneStr(Account, "username", req.body.username);
            
            // checks if the password entered is the same as the one on the account
            if (await bcrypt.compare(req.body.password, user.password)){
                
                // sends a status 200 with a message if authorized
                res.status(200).json({msg: "Logged In"});
            }
            else{
                // if password doesn't match, sends a status 401 and an error message
                res.status(401).json({msg: "Wrong Password"});
            }
    
        } catch (error) {
            // sends an error message with status 500 if there are 
            res.status(500).json({msg: error});
        }
    }
    else{

        // sends an error 400 if the user is not found with a message
        res.status(400).json({msg: "User not Found"});
    }
})

app.post('/signup', async (req, res) => {
    
    // checks if the user already exists
    let isUser = await checkExist(Account, "username", req.body.username);

    if (isUser){
        // if true, then sends an error 409 and a message to tell user to login
        res.status(409).json({msg: "User already exist, please login."})
    }
    else{
        // if false, then try to sign up
        try {
            // encrypts the password
            const encryptPsw = await bcrypt.hash(req.body.password, 10);

            // creates the account based on the schema
            const acc = new Account({
                'username': `${req.body.username}`,
                'password': `${encryptPsw}`
            })

            // saves the data into the database
            saveData(acc);
            
            // send a status 200 and a signed up message
            res.status(200).json({msg: "signed up"});

        } catch (error) {
            // send a status 500 if the account couldn't be created
            res.status(500).json({msg: "Hi"});

        }
    }
});

app.post('/calc', (req, res) => {
    let currentTime;

    let phone = calcEmission('Cellphone', req.body['Phone']);
    let PC = calcEmission('PC', req.body['PC']);
    let TV = calcEmission('TV', req.body['TV']);
    let electronic = phone + PC + TV;

    let car = calcEmission('Car', req.body['Car']);
    let bus = calcEmission('Bus', req.body['Bus']);
    let bike = calcEmission('Bike', req.body['Bike']);
    let travel = car + bus + bike;

    let redMeat = calcEmission('Red Meat', req.body['RedMeat']);
    let dairy = calcEmission('Dairy', req.body['Dairy']);
    let grains = calcEmission('Grains', req.body['Grains']);
    let food = redMeat + dairy + grains;

    let totalEmission = electronic + travel + food;

    let emission = {
        'Phone': phone,
        'PC': PC,
        'TV': TV,
        'Car': car,
        'Bus': bus,
        'Bike': bike,
        'Red Meat': redMeat,
        'Dairy': dairy,
        'Grains': grains,
        'Total Electronic': electronic,
        'Total Travel': travel,
        'Total Food': food,
        'Total Emission': totalEmission,
        // 'Time': currentTime
    }

    
    res.status(200).json(emission);
})

app.listen(port, () => {
    console.log('Listening on port ' + port);
});