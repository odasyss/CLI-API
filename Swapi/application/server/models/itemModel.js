const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const config = require('../config');

const SearchItemsSchema = new Schema({
    searchKeyWord: {
        type: String,
    },
    resultCount: {
        type: Number,
    },
    timeStamp: {
        type: Date,
        default: Date.now()
    },

});


const SearchItems = module.exports = mongoose.model('search', SearchItemsSchema, 'search');

/**
 *  Add a new item
 * 
 */
module.exports.insertSearch = function (body, callback) {

    var newItem = new SearchItems({
        searchKeyWord: body.searchKeyWord,
        resultCount: body.resultCount
    });

    newItem.save(callback);

}


/**
 *  Get search history by keyword
 * 
 */
module.exports.getAll = async  function (term) {
    return SearchItems.find({ searchKeyWord: term });
    
}

