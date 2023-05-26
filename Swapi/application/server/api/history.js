
// use the express router to create endpoints in our server
const express = require('express');
const router = express.Router();
const SearchItems = require('../models/itemModel');

// searching for the character
router.get('/history/search/:searchTerm', async (req,res) =>{
    let searchTerm = req.params.searchTerm
    try{
        //get from the database
        let data = await SearchItems.getAll(searchTerm);
        
        console.log(data);

        res.status(200).json({data}) 
    }catch(err){
        res.status(500).json({err})
    }    
})

// exporting everything attached to router. 
module.exports = router;
