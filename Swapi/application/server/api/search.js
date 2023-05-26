// use the express router to create endpoints in server
const express = require('express');
const router = express.Router();
const SearchItems = require('../models/itemModel');

// require in the custom node module previously built
const people_module = require('people_module');

// searching for the character
router.get('/search/:item', async (req,res) =>{
    // console.log(req.params);
    let characterNameInput = req.params.item
    try{
        const searchCharacter = await people_module.search(characterNameInput) // This is displaying array of characters(objects)
        // console.log(searchCharacter)
        //store in the database

        await SearchItems.insertSearch({searchKeyWord: characterNameInput, resultCount: searchCharacter.count});

        res.status(200).json({searchCharacter}) // might change 
    }catch(err){
        res.status(500).json({err})
    }    
})

// Need Fetch
router.post('/search', async (req,res) =>{
    const {characterUrl} = req.body
    try{
        const fetchCharacter = await people_module.fetch(characterUrl)
        res.status(200).json({fetchCharacter})
        console.log(fetchCharacter);
    }catch(err){
        res.status(500).json({err})
    }
})

// exporting everything attached to router. 
module.exports = router;
