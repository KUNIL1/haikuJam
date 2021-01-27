'use strict';
const util = require('util');
const haikuModel = require('../models/haiku.model');

// Create Haikus
const create = (req, res) =>{
    let haikuObj = new haikuModel(req.body)
    return haikuObj.save()
    .then(haikuDoc =>{
        console.log(haikuDoc);
        return res.status(200).json(haikuDoc)
    })
    .catch(err =>{
        console.log(err);
        res.status(404).json(err)
    })
}

// Update incomplete Haiku 
const update = (req, res) =>{    
    const updateObj = {};
    return haikuModel.findOne(req.body.filter)
    .then(haikuDoc =>{        
        if(!haikuDoc){
            return Promise.reject({error: true, message: "Haiku not fount"})
        } else {
            if(req.body.update && req.body.update.content){
                updateObj.content = haikuDoc.content + " " + req.body.update.content;
                updateObj.completed = true
            }
            updateObj.updated_at = new Date();
            console.log(updateObj)
            return haikuModel.findOneAndUpdate(req.body.filter, updateObj, {
                new: true
            })
        }        
    })
    .then(updateDOc =>{
        res.status(200).json(updateDOc)
    })
    .catch(err =>{
        console.log(err);
        res.status(404).json(err)
    })
}

// Haiku List
const list = (req, res) =>{
    return haikuModel.find(req.query)
    .then(haikusDoc =>{
        res.status(200).json(haikusDoc)
    })
    .catch(err =>{
        console.log(err)
        res.status(404).json(err)
    })
}

module.exports = {create: create,
                update: update,
                list: list
            };
  