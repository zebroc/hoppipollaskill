'use strict';
var Alexa = require('alexa-sdk');

var APP_ID = "amzn1.ask.skill.fdb478d6-0555-46cd-8a55-9ece8550c50c";
//var APP_ID = "amzn1.echo-sdk-ams.app.fdb478d6-0555-46cd-8a55-9ece8550c50c";
var SKILL_NAME = 'Hoppipolla';

/**
 * Array containing space facts.
 */
var FACTS = [
    "Island liegt direkt auf der Grenze zwischen der eurasischen und nordamerikanischen Kontinentalplatten.",
    "Wenn ein Islandpferd das Land einmal verlassen hat, darf es nie wieder zurück kommen.",
    "Puffins, die kleinen Papageientauche, suchen sich einen Partner und bleiben den Rest ihres Lebens zusammen.",
    "Isländer haben keinen Weihnachtsmann, sondern 13 Trolle die in den Bergen wohnen.",
    "In Island gibt es so gut wie keine Wälder, weil Bäume hier nur sehr sehr langsam wachsen.",
    "Island ist toll!",
    "Island ist super!"
];

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

var handlers = {
    'LaunchRequest': function () {
        this.emit('GetFact');
    },
    'GetNewFactIntent': function () {
        this.emit('GetFact');
    },
    'GetFact': function () {
        // Get a random space fact from the space facts list
        var factIndex = Math.floor(Math.random() * FACTS.length);
        var randomFact = FACTS[factIndex];

        // Create speech output
        var speechOutput = "Hier ist dein Fakt: " + randomFact;

        this.emit(':tellWithCard', speechOutput, SKILL_NAME, randomFact)
    },
    'AMAZON.HelpIntent': function () {
        var speechOutput = "Du kannst mich nach einem Island-Fakt fragen, oder den Skill beenden.";
        var reprompt = "Wie kann ich dir helfen?";
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', 'Auf wiedersehen!');
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', 'Auf wiedersehen!');
    }
};