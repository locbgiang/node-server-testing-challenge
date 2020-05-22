const express = require('express');
const Games = require('./games/games-model');
const server = express();
server.use(express.json());

server.get('/', (req, res) => {
    res.status(200).json({ api: 'Up' })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: 'Failed to run server'
            });
        });
});

server.get('/games', (req, res) => {
    Games.listAll()
        .then(games => {
            res.status(200).json(games);
        }).catch(err => {
            res.status(500).json({ error: err.message })
        });
});

server.post('/games', (req, res) => {
    if (gameValid(req.body)) {
        Games.add(req.body).then(ids => {
            res.status(201).json({
                data: ids
            });
        });
    } else {
        res.status(400).json({
            message: 'Please provide a name for the game'
        });
    }
});

server.delete('/games/:id', (req, res) => {
    const { id } = req.params;

    Games.del(id).then(deleted => {
        if (deleted) {
            res.status(200).json({removed: deleted});
        } else {
            res.status(404).json({
                message: 'Could not find game with given id'
            })
        }
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            Error: "Unable to delete game"
        })
    })
})

function gameValid(game) {
    return Boolean(game.name);
}


module.exports = server;