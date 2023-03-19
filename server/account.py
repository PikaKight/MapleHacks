import pymongo
import os

from dotenv import load_dotenv
from pymongo import MongoClient

load_dotenv()

cluster = MongoClient(os.getenv("URI"))
db = cluster["co2lator"]
account = db['account']


def save(username, password):

    acc = {
        "username": username,
        "password": password,
        "emissions": []
    }

    account.insert_one(acc)


def emission(username, emission):
    acc = account.find_one({"username": username})
    acc["emissions"].append(emission)

    account.update_one({"username": username}, {
                       '$set': {"emissions": acc["emissions"]}})


def getAccount(username):
    acc = account.find_one({"username": username})
    return acc


def checkExist(username):
    if account.find_one({"username": username}) == 1:
        return True
    else:
        return False
