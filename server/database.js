const mongoose = require('mongoose');

const uri = 'mongodb+srv://root:root@pikakight.lfwvkyo.mongodb.net';
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true})
    .then((result) => console.log('connected to db'))
    .catch((err) => console.log(err))
/**
 * Used To create and update the collections on MongoDB
 * @param {*} collection: An object that is based on the database schema
 */    
function saveData(collection){
    collection.save()
};

/**
 * Used to delete a specific collection's data
 * @param {*} collection: An object that is based on the database schema
 */
function delData(collection){
    collection.remove()
    console.log("removed")
};


/**
 * Used to get all the data from a specifc collection
 * @param {*} collection: An object that is based on the database schema
 * @returns A query of the data, .then will need to be used to get the information
 */
function getAll(collection){
    return collection.find({})
}


/**
 * Used to get specific data from the specific collection based on the given filters
 * @param {*} collection: An object that is based on the database schema
 * @param {*} param: The key of the filter, looking at what type of info we are filtering 
 * @param {*} value: The value of the filter, looking at what the conditions are
 * @returns 
 */
function findAll(collection, param, value){
    return collection.find({
        [param]: value
    })
}


async function findOneStr(collection, param, value){
    let res = await collection.findOne({
        [param]: {$regex: new RegExp(value, 'i')}
    }).exec();
   
    return res
}
/**
 * Used to update a specific data in a given collection
 * @param {*} collection: An object that is based on the database schema
 * @param {*} param: The key of the filter, looking at what type of info we are filtering 
 * @param {*} value: The value of the filter, looking at what the conditions are
 * @param {*} updateKey: The field of info we want to change
 * @param {*} updateValue: The new value for that field
 */
function update(collection, param, value, updateKey, updateValue){
    let item = collection.findOne({
        [param]: value
    })
    
    item[updateKey] = updateValue;

    const doc = new collection(item)

    doc.save();
}


/**
 * Used to delete all data in a given collection
 * @param {*} collection: An object that is based on the database schema 
 */
function deleteAll(collection){
    collection.deleteMany({})
}


/**
 * Used to delete a specific data in a given collection
 * @param {*} collection: An object that is based on the database schema  
 * @param {*} param: The key of the filter, looking at what type of info we are filtering 
 * @param {*} value: The value of the filter, looking at what the conditions are
 */
function deleteOne(collection, param, value){
    collection.deleteOne({[param]: value});
}


/**
 * Used to check if a collection's data already exists
 * @param {*} collection: An object that is based on the database schema  
 * @param {*} param: The key of the filter, looking at what type of info we are filtering 
 * @param {*} check: The value of the filter, looking at what the conditions are
 * @returns A bool
 */
function checkExist(collection, param, check){
    let res = collection.exists({
        [param]: check
    })

    return res
}

module.exports = {saveData, delData, getAll, findAll, deleteAll, checkExist, update, deleteOne, findOneStr};