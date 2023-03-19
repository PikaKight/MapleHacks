from fastapi import FastAPI, Request
from datetime import datetime
import account

app = FastAPI()

isLogin = False

"""
Calculates the emission of a given action based on the giving value (amount or hour) and the CO2 per (hour or kg)
Param:
    type: A String that signifies the type of emission activity
    value: A Float that siginifies the amount or hour of the giving activity
Return: The calculated emission for the given activity and value
"""


def calcEmission(type, value):
    emission = {
        'Bus': 4.3,
        'Car': 17.28,  # assume avg 90 km/h and 0.192 kg/km (2018)
        'Bike': 0.52,  # assume avg 25.5 km/h and
        'Red Meat': 8.0,
        'Dairy': 6.3,
        'Grains': 3.7,
        'Cellphone': 3.6,
        'PC': 4.2,
        'TV': 6.8
    }

    carbonEmmission = value*emission[type]

    return carbonEmmission


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.post("signup")
async def signup(req: Request):
    reqBody = await req.json()

    if account.checkExist(reqBody["username"]):
        return {"message": "User already exist. Please choose another username or login."}

    account.save(reqBody["username"], reqBody["password"])
    return {"message": "Account created."}


@app.post("/login")
async def login(req: Request):
    reqBody = await req.json()
    if not account.checkExist(reqBody["username"]):
        return {"message": "User not found."}

    acc = account.getAccount(reqBody["username"])
    if acc["password"] == reqBody["password"]:
        acc["message"] = "Logging in"
        isLogin = True
        return acc
    else:
        return {"message": "Incorrect password"}


@app.post("/calc")
async def calc(req: Request):
    currentTime = datetime.now()

    reqBody = await req.json()

    phone = calcEmission('Cellphone', reqBody['Phone'])
    PC = calcEmission('PC', reqBody['PC'])
    TV = calcEmission('TV', reqBody['TV'])
    electronic = phone + PC + TV

    car = calcEmission('Car', reqBody['Car'])
    bus = calcEmission('Bus', reqBody['Bus'])
    bike = calcEmission('Bike', reqBody['Bike'])
    travel = car + bus + bike

    redMeat = calcEmission('Red Meat', reqBody['RedMeat'])
    dairy = calcEmission('Dairy', reqBody['Dairy'])
    grains = calcEmission('Grains', reqBody['Grains'])
    food = redMeat + dairy + grains

    totalEmission = electronic + travel + food

    emission = {
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
        'Time': currentTime
    }

    return emission
