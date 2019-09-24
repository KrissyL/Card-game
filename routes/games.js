const express = require('express');
const router = express.Router();

module.exports = function (gameHelpers) {

  router.get("/uno", (req, res) => {
    gameHelpers.getAllGames()
    .then(games => {
      res.render("uno", {games})
    })
  .catch(err => console.log(err))
    });

  router.get("/uno/:id", (req, res) => {  
    res.render("gameID")
    .catch (err => console.log(err))
    });
    
  router.post("/uno/:id", (req, res) => {
      gameHelpers.joinGame(req.cookies.userID, req.params.id)
      .then (res.redirect("/"))
      .catch ((err) => {
        console.log(err)
    })
  })

  router.post("/uno", (req, res) => {
    gameHelpers.newGame(req.cookies.userID)
    .then(cards => {
      res.render("gameID", {cards})
    })
  })

  return router;
}