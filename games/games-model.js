const db = require('../data/dbConnector');

module.exports = {
    add,
    del,
    listAll,
    findById,
}

function add(game){
    return db('games').insert(game, "id").then(ids=>{
        return findById(ids[0]);
    });
}

function del(id){
    return db('games').where({id}).del();
}

function listAll(){
    return db('games');
}

function findById(id){
    return db('games').where({id}).first();
}
