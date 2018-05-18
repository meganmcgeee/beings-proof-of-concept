// Generate grammar for test language
//
testButtonState = false;
 testButton2State = false; 
 
LoadTheRules = function () {
    var lang = new Red();
    RF.redit = lang;
    var runWhen = function (ruleObj, agent, context) {
        if (!agent.check_again) {
            var condVal = context.runRule(ruleObj.Conditions, agent, context);
            if (condVal) {
                var actVal = context.runRule(ruleObj.Actions, agent, context);
                if(!actVal) {
                    agent.check_again = true;
                }
                return actVal;
            }
        } else {
            var wtVal = context.runRule(ruleObj.Actions, agent, context);
            if(wtVal) {
                agent.check_again = false;
                return wtVal;
            }
        }
        return false;
    }

    var runRule = function (ruleObj, agent, context) {
       var ruleSlot = ruleObj.Rule;
       if(ruleSlot === undefined) return;
    
    //   var ruleDef = redit.ruleCache[ruleSlot];
    //   if (ruleDef == undefined) return undefined;
       return context.runRule(ruleSlot, agent, context);

}


    doTest = function (newState) {
        testButtonState = newState;
    }

    var checkTestButton = function(ruleObj, agent, context) {
           return testButtonState;
    }

     doTest2 = function (newState) {
         testButton2State = newState;
     }

     var checkTestButton2 = function(ruleObj, agent, context) {
            return testButton2State;
     }
    var numberBox = new InputItem("N", "number", "width:2em");
    var textBox = new InputItem("Text", "text", "width: 40em;text-align:left");
    var colorBox = new InputItem("Color", "color");


    var soundList = new RuleList("Sounds", []);
    var wwwList = new RuleList("Pages", []);
    var imgList = new RuleList("Images",[]);

    /*
    var cats = new RuleList("Cats", ["Katie", "Carly", "Gaga", "Felix"]);
    var animal = new RuleList("Animals", [cats, "dog", "mouse"]);
    var places = new RuleList("Places", ["ears", "head", "nose", "back"]);
    var critterRule = new Rule(lang, "pet", ["pet", animal, "on", places]);
    var feedPlaces = new RuleList("Food Places", ["bowl", "front door", "back door"]);
    var feedRule = new Rule(lang, "feed", ["feed", animal, "at the", feedPlaces, "repeat", numberBox, "times every", numberBox, "days"]);
    var subRule = new RuleList("Do", [critterRule, feedRule]);
    var feed2Rule = new Rule(lang, "FeedingTo", ["Feed the", animal, "to the", animal, "while you", subRule]);


    var people = new RuleList("Person", ["Marc Canter", "Jamie Fenton", "Scott Weiner", "Steve Katz"]);
    var songList = new RuleList("Songs", ["Bob Marley", "Peter Tosh", "St. Vincent", "The Star Spangled Banner"]);
    var places = new RuleList("Place", ["at front door", "at back door", "on TV", "calling on the phone"]);
    var playRule = new Rule(lang, "Play", ["Play", songList, numberBox, "time(s)"]);
    var actions = new RuleList("Action", [playRule, "release the hounds", feedRule]);
    var whenRule = new Rule(lang, "When", ["When", people, "is", places, "then", actions]);
    */



    var WeatherList = new RuleList("Weather", ["raining", "snowing", "too windy", "too cold"]);
    var ClubList = new RuleList("Clubs", ["Running Club", "Jogger's R Us", "Marc's Marauders", "Catnip Anonymous"]);
    var RunningPlaceList =new RuleList("RunningPlaces", ["Tremont Gym", "Dolores Park", "Golden Gate park", "Los Gatos Athletic Club"]);
    var WeatherRule = new Rule(lang, "WeatherRule", ["If it's", WeatherList, "then move the", ClubList, "appointment to the", RunningPlaceList]);


    var PerformanceList = new RuleList("performance criteria", ["Speeding up", "Hit a Plateau", "Slowing down", "Stopped"]);
    var ThresholdList = new RuleList("this threshold", [":00-:30 secs", ":30-1:00 mins", "1:00-2:00 mins", "3:00-4:00 mins"]);
    var SongList = new RuleList("this song", ["Naive melody", "All about the Bass", "Freedom of choice", "That's Good"]);

    var PerformanceRule = new Rule(lang, "PerformanceRule", ["If", PerformanceList,  "falls within", ThresholdList, "then start playing", SongList]);

    var AvailableList = new RuleList("availablity", ["available time in their schedule", "needs to meet with me", "has an update to talk to me about", "has a hot stock tip"]);
    var TrainerList = new RuleList("my pro", ["my trainer", "my therapist", "my consultant", "my parole officer"]);

    var AppointmentsList = new RuleList("time", ["an available slot", "a lunch", "a dinner", "phone call"]);
    var availableTimeRule = new Rule(lang, "If", [TrainerList, "has", AvailableList, "then book me", AppointmentsList]);


    var GoalsList = new RuleList("Goals",  ["I hit my daily goals", "I miss my daily goals", "I match my best performance", "I top the Leaderboard"]);
    var HuzzaList = new RuleList("Huzza", ["a Hazzah", "a Fuck It", "My photo", "a Yo"]);
    var GroupList = new RuleList("My Group",["lovers", "frat friends", "hottie list", "biz associates"]);
    var FriendList = new RuleList("Friend",  ["myself", "my family", GroupList, "my imaginary friend"]);
    var MoreHuzzasList = new RuleList("another Hazzah", [ "shit - I need to do better", "Check me out", "a photo of me"]);
    var BlogList = new RuleList("Blogs", ["TechCrunch", "My Tumblr", "My old Wordpress blog", "Instagram", "all of the above"]);

    var HitGoalRule = new Rule(lang,"Hit Goals", ["If",  GoalsList, "then send", HuzzaList, "to", FriendList, "and post",  MoreHuzzasList, "to", BlogList]);


    var FamilyMembers = new RuleList("Family Members", ["My kids", "My wife"," My interns", "My biz associates"]);
    var TaskPlace =  new RuleList( "Task Place", ["finished","started","hit the halfway point"]);
    var TaskName = new RuleList("Tasks", ["their homework", "their chores", "housework", "assigned projects"]);
    var TaskReward = new RuleList("Reward", ["open up the candy cabinet","issue more stock options","make 'quality time' alone","send flowers"]);

    var FamilyRule = new Rule(lang, "FamilyRule", ["When", FamilyMembers, "have", TaskPlace, TaskName,  "then", TaskReward, "and post", imgList, "to", BlogList]);

    var setBoxToColor = function (ruleObj, agent, context) {
        var setColorTo = ruleObj["Colors"];
        if (setColorTo != undefined) {
            var myBoxEl = document.getElementById("box1");
            myBoxEl.style.backgroundColor = setColorTo;
        }
        return true;
    }

    var moteList = new RuleList("Estimote", ["blue", "ice", "mint", "blue 2", "ice 2", "mint 2", "blue 3", "ice 3", "mint 3", "white"]);
    var aware_moteList = new Rule(lang, "awareMote", ["aware of ", moteList, "mote&nbsp;"], RF.awareMote);
    var close_moteList = new Rule(lang, "closeMote", ["close to ", moteList, "mote&nbsp;"], RF.nearMote);
    var testButtonDown = new Rule(lang, "testButton", ["test button A pressed&nbsp; "], checkTestButton);
    var testButton2Down = new Rule(lang, "testButton2", ["test button B pressed&nbsp; "], checkTestButton2);

    //  ,"http://www.soundjay.com/button/beep-01a.mp3","http://www.soundjay.com/free-music/jungle-run-01.mp3"

    var soundCmd = new Rule(lang, "Play Sound", ["play", soundList], RF.sounder);

    var jumpToURL = new Rule(lang, "Go", ["go", wwwList], RF.changeURL);
    var jumpToImg = new Rule(lang, "Show", ["show", imgList], RF.changeURL);

    var pageCmdList = new RuleList("PageActions", [jumpToImg, jumpToURL]);
    var pageCmdCmd = new Rule(lang, "Page Commands", ["do", pageCmdList], RF.runPageAction );

    var demoConditionList = new RuleList("Conditions", [aware_moteList, close_moteList, testButtonDown, testButton2Down]);

    var boxColorList = new RuleList("Colors", ["red", "green", "blue", "yellow"]);
    var setBoxCmd = new Rule(lang, "Set Box", ["set box to", boxColorList], setBoxToColor);
    // pageCmdCmd
    var demoActionList = new RuleList("Actions", [setBoxCmd, soundCmd, jumpToImg, jumpToURL]);


    var demoRule = new Rule(lang, "demoRule", ["When", demoConditionList, "then", demoActionList], runWhen);
    var demoRule2 = lang.addRule("demoRule ::= When [demoConditionList] then [demoActionList]", runWhen);
    var countToN = new Rule(lang, "countRule", ["Repeat activity", numberBox, "times"]);
    var chat = new Rule(lang, "sayRule", ["Say", textBox]);
    var listRule = new Rule(lang, "listRule", ["List"]);
    var schedRule = new Rule(lang, "schedRule", ["Schedule"]);    
    // whenRule, playRule, feedRule
    var ruleList = new RuleList("Rule", [listRule, schedRule, demoRule, soundCmd, jumpToURL, countToN, chat, WeatherRule, PerformanceRule, availableTimeRule, HitGoalRule, FamilyRule ]);

    var masterRule = new Rule(lang, "Master", [ruleList], runRule);

//console.log(animal.toBNF());
//console.log(places.toBNF());
//console.log(feedPlaces.toBNF());
//console.log(critterRule.toBNF());
//console.log(feedRule.toBNF());
//console.log(feed2Rule.toBNF());
    var ruleElems = "";
    for(var i = 0; i < ruleList.listData.length; ++i) {
        ruleElems += ruleList.listData[i].toGalleryEntry();
    }
aRuleGallery = ruleElems;


  var extMap = {
      ".gif":   imgList,
      ".jpg":   imgList,
      ".png":   imgList,
      ".html":  wwwList,
      ".mp3":   soundList,
      ".wav":   soundList
    };
// Uncomment below to populate asset list
//    RF.openS3(extMap);
    
    return lang;
};
// $.each(ruleCache, function(k,v) {console.log(k + " " + v.toBNF())});




LoadTheRules();