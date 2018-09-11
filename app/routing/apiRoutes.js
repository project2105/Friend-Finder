// GET route with the url `/api/friends`. This will be used to display a JSON of all possible friends.
// POST routes `/api/friends`. This will be used to handle incoming survey results. This route will also be used to handle the compatibility logic.

var friends = require("../data/friends");
module.exports = function (app) {

    app.get("/api/friends", function (req, res) {
        res.json(friends);
    });

    app.post("/api/friends", function (req, res) {
        // logic to compare newfriend to friends array
        console.log(friends);
        console.log(req.body);
        var thisUser = req.body;
        var differences = [];


        friends.forEach(function (user) {
            var totalDifference = 0;
            for (var i = 0; i < thisUser.scores.length; i++) {
                var otherAnswer = user.scores[i];
                var thisAnswer = thisUser.scores[i];
                var difference = +otherAnswer - +thisAnswer;
                totalDifference += Math.abs(difference);
            }

            differences.push(totalDifference);
        });

        var minimumDifference = Math.min.apply(null, differences);
        var bestMatches = [];
        for (var i = 0; i < differences.length; i++) {
            if (differences[i] === minimumDifference) {
                bestMatches.push(friends[i]);
            }
        }

        // Then send bestMatches to the client.
        res.json(bestMatches);
        console.log('best', bestMatches);
        console.log(bestMatches[0].name);

        friends.push(req.body);
        //res.json(true);

    });
};
