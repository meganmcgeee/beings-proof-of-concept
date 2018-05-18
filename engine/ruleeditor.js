Red = function () {
    this.ruleCache = {};
    this.ruleIdCtr = 1;
    this.ruleDepthCtr = 10000;
    this.activeRules = [];
    this.ruleTextCache = {};
    this.compiledRules = {};
    this.mem = {};
}
/*
 var templateText = "<table class='outBox' style='z-index:{{{ruleDepth}}}'> <tr><td id='{{{ruleId}}}'>{{{ruleBody}}}</td></tr></table>";

 console.log("Spacebars: " + Spacebars);
 Red.prototype.ruleEntryTemplate = Spacebars.compile(templateText);
 */
// parses a rule string
Red.prototype.addRule = function (rString, rFun) {

}
InputItem = function(itemN, itemT, itemS) {

    this.itemName = itemN;
    this.itemType = itemT;
    this.itemStyle = itemS;
}
// Part of hack to put earlier part of a sentence in front of later parts. See RuleList.toHtmlUL();

InputItem.prototype.name = function () {
    return this.itemName;
}

InputItem.prototype.toHtml = function (val) {
    var sb = new Array();
    sb.push("<input class='ruleinput' type='");
    sb.push(this.itemType);
    if (this.itemStyle !== undefined) {
        sb.push("' style='")
        sb.push(this.itemStyle);
    }
    // push value if defined.
    if (val !== undefined) {
        sb.push("' value='")
        sb.push(val);
    }
    sb.push("'>");
    sb.push("</input>");
    return sb.join("");
}

RuleList = function(listN, listD) {
    this.listName = listN;
    this.listData = listD;
}


RuleList.prototype.name = function () {
    return this.listName;
}

RuleList.prototype.toBNF = function () {
    var sb = new Array();
    sb.push("<" + this.listName + "> ::= ");
    for (var i = 0; i < this.listData.length; ++i) {
        var el = this.listData[i];
        if (sb.length > 1) {
            sb.push(" | ");
        }
        if (el instanceof InputItem) {

            sb.push("[" + el.name() + "]");
        }
        if (el instanceof Rule) {

            sb.push("<" + el.name() + ">");
        } else {
            sb.push(el);
        }
    }
    return sb.join("");
}

RuleList.prototype.addListData = function (fname) {
    this.listData.push(fname);
}

function generateUniqueSlotName(usedList, proposed, position) {
    var possible = proposed;
    var num = 1;
    while (usedList[possible] != undefined) {
        num++;
        possible = proposed + num;
    }
    usedList[possible] = position;
    return possible;
}

Rule = function(forLang, rName, pat, toRun) {
    this.ruleName = rName;
    this.rulePattern = pat;
    this.execFunction = toRun;
    // The next bit gives each appearance of a rule list an unique slot name
    this.slotNames = new Array();
    var slotsUsed = {};
    for (var i = 0; i < this.rulePattern.length; ++i) {
        var el = this.rulePattern[i];
        if (el instanceof RuleList) {
            var aSlotName = generateUniqueSlotName(slotsUsed, el.listName, i);
            this.slotNames[i] = aSlotName;
        } else if (el instanceof InputItem) {
            var aSlotName = generateUniqueSlotName(slotsUsed, el.name(), i);
            this.slotNames[i] = aSlotName;
        }
    }
    if (forLang.ruleCache[this.ruleName] != undefined) {
        console.log("DUPLICATE RULE NAME ERROR: " + this.ruleName);
    }
    forLang.ruleCache[this.ruleName] = this;
}


Rule.prototype.name = function () {
    return this.ruleName;
}

Rule.prototype.pattern = function () {
    return this.rulePattern;
}


Rule.prototype.toBNF = function () {
    var sb = new Array();
    sb.push("<" + this.ruleName + "> ::= ");
    for (var i = 0; i < this.rulePattern.length; ++i) {
        var el = this.rulePattern[i];
        if (sb.length > 1) {
            sb.push(" ");
        }
        if (el instanceof RuleList) {
            sb.push("<" + el.name() + ">");
        } else {
            sb.push(el);
        }
    }
    return sb.join("");
}

// Deeper Rules show as literal sentences until they are hoisted up
Rule.prototype.toMarkedUpLine = function () {
    var sb = new Array()

    for (var i = 0; i < this.rulePattern.length; ++i) {
        var el = this.rulePattern[i];
        if (el instanceof RuleList) {
            sb.push("<b>");
            sb.push(el.name());
            sb.push("</b>");

        } else if (el instanceof InputItem) {
            sb.push("<b>[");
            sb.push(el.name());
            sb.push("]</b>");
        } else {
            sb.push(el);
        }
        sb.push(" ");
    }
    var joined = sb.join("");
//  console.log("joined=" + joined);
    return joined;
}

// Deeper Rules show as literal sentences until they are hoisted up
Rule.prototype.toHtmlUL = function () {
    var sb = [];
    if (this.rulePattern.length <= 0) {
        return "";
    }
    sb.push("<li data-rule='");
    sb.push(this.ruleName);
    sb.push("'><a>");
    sb.push(this.toMarkedUpLine());
    sb.push("</a></li>");
    return sb.join("");
}

// Generate a line of HTML for the "Gallery View" of this rule:
Rule.prototype.toGalleryEntry = function () {
    var sb = [];
    sb.push("<div class='senPro' id='");
    sb.push(this.ruleName);
    sb.push("'>");
    sb.push(this.toMarkedUpLine());
    sb.push("</div>");
    return sb.join("");
}


Rule.prototype.toInnerRuleHtml = function (parentSlot) {
    var sb = [];
    for (var i = 0; i < this.rulePattern.length; ++i) {
        var el = this.rulePattern[i];
        if (el instanceof RuleList) {
            sb.push("<li data-slot='");
            sb.push(this.slotNames[i]);
            sb.push("' data-parent-slot='")
            sb.push(parentSlot);
            sb.push("'>");
            sb.push(el.toHtmlUL());
        }
        else if (el instanceof InputItem) {
            sb.push("<li data-parent-slot='");
            sb.push(parentSlot);
            sb.push("' data-slot='");
            sb.push(this.slotNames[i]);
            sb.push("'>");
            sb.push(el.toHtml());
        } else {
            sb.push("<li data-parent-slot='");
            sb.push(parentSlot);
            sb.push("'>");
            sb.push(el);
        }
        sb.push("</li>");
    }
    return sb.join("");
}


RuleList.prototype.zCounter = 100000;

RuleList.prototype.toHtmlUL = function () {
    var sb = [];
    sb.push("<a>");
    sb.push(this.listName);
    sb.push("</a>");
    this.toHtmlULinside(sb);
    return sb.join("");
}


RuleList.prototype.toHtmlULinside = function (sb) {

    sb.push("<ul data-list='");
    sb.push(this.listName);
    // set the z-index to a descending value in order to force earlier entries to be
    // in front of later entries.
    sb.push("' style='z-index: ");
    sb.push(this.zCounter--);
    sb.push("'>");
    for (var i = 0; i < this.listData.length; ++i) {
        var el = this.listData[i];
        if (el instanceof Rule) {
            sb.push(el.toHtmlUL());
        } else if (el instanceof RuleList) {
            sb.push("<li>");
            sb.push(el.toHtmlUL());
            sb.push("</li>");
        } else {
            sb.push("<li><a>");
            sb.push(el);
            sb.push("</a></li>");
        }
    }
    sb.push("</ul>");
}

var dumpTree = function (elem) {
    var obj = elem;
    console.log(obj.innerHTML);
    console.log(obj.dataset.rule);
    while (obj != undefined) {
        var str = "";
        var ds = obj.dataset;
        if (ds != undefined) {
            str = ds.rule;
        }
        console.log(obj.nodeName + " " + obj.text + " " + str);
        obj = obj.parentNode;
    }
}

var dumper = function (obj, lvl) {

    var tabF = function (n) {
        var sb = [];
        for (var i = 0; i < n; ++i) {
            sb.push("...");
        }
        return sb.join("");
    }

    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            var eObj = obj[key];
            var Ot = typeof eObj;
            var tabs = tabF(lvl);
            if (Ot === "string") {
                console.log(tabs + key + ": " + eObj);
            } else {
                console.log(tabs + key + ":");
                dumper(eObj, lvl + 1);
            }
        }
    }
}


Red.prototype.checkForRuleAndSlot = function (obj) {
    var rule = undefined;
    var slot = undefined;
    var slotName = undefined;
    while (obj != undefined) {
        var ds = obj.dataset;
        if (ds != undefined) {
            if (ds.rule != undefined && slot === undefined) {
                rule = ds.rule;
            }
            if (ds.slot != undefined) {
                slot = obj;
                slotName = ds.slot;
            }
        }
        obj = obj.parentNode;
    }
    if (rule != undefined && slot != undefined) {
        return {rule: rule, slot: slot, name: slotName};
    }

    return undefined;
}


Red.prototype.findRuleTop = function (obj, forID) {
    while (obj != undefined) {
        if (obj.id == forID) {
            topObj = obj;
            return obj;
        }
        obj = obj.parentNode;
    }
    return undefined;
}

Red.prototype.removeChildRule = function (slotObj, slotName) {
    var zonkList = [];
    var slotWalk = slotObj;
    var slotStack = [];
    slotStack.push(slotName);
    while (slotWalk != null) {
        var psVal = slotWalk.dataset.parentSlot;
        if (psVal != undefined) {
            var psIndex = slotStack.indexOf(psVal);
            if (psIndex >= 0) {
                zonkList.push(slotWalk);
                if ((slotWalk.dataset.slot != undefined) && (slotWalk.dataset.which != undefined)) {
                    slotStack.push(slotWalk.dataset.slot);
                } else {
                    // we did not descend, so lets see if we need to ascend.
                    // compute "how deep" our match was, and if there are intermediates
                    // pop them off.
                    var dropCount = slotStack.length - (psIndex + 1);
                    for (var i = 0; i < dropCount; ++i) {
                        slotStack.pop();
                    }
                }
            }
        }
        slotWalk = slotWalk.nextSibling;
    }
    for (var z = 0; z < zonkList.length; ++z) {
        var zap = zonkList[z];
        $(zap).remove();
    }
}

Red.prototype.clickFun = function (e) {
//    console.log("Click detected");
    var ruleSlot = this.checkForRuleAndSlot(e.target);
    if (ruleSlot != undefined) {
//        console.log("R/S=" + ruleSlot.rule + " " + ruleSlot.slot);
        var thisRule = this.ruleCache[ruleSlot.rule];
        var compiledRule = thisRule.toInnerRuleHtml(ruleSlot.name);
        //  ruleSlot.slot.innerHTML = compiledRule;
        ruleSlot.slot.firstElementChild.innerHTML = "<img src='/images/sdown.gif'>";
        ruleSlot.slot.dataset.which = ruleSlot.rule;
        this.removeChildRule(ruleSlot.slot, ruleSlot.name);

        $(ruleSlot.slot).after(compiledRule);

        $(" .sent li").unbind("click");
        $('.sent li').on('click', function(elem, templ) {
    	  RF.redit.clickFun(elem, templ);
    	 });
/*
        $(" .sent li").click(clicker);
        $(" .sent li").hover(function () {
//        	  console.log("Hover visible");
            $(this).find('ul:first').css({visibility: "visible", display: "none"}).show(400);
        }, function () {
//        	  console.log("Hover invisible");
            $(this).find('ul:first').css({visibility: "hidden"});
        });
*/
        return false;
    }
//  dumpTree(e.target);

    var lastLI = null;
    var pathStr = e.target.parentNode.firstElementChild.text;
    var obj = e.target.parentNode.parentNode.parentNode;
    while (obj.nodeName == "LI") {
        lastLI = obj;
        obj = obj.parentNode.parentNode;
    }
    if (lastLI !== null) {
        lastLI.firstElementChild.innerHTML = pathStr;
        var childName = lastLI.dataset.slot;
        if (childName != undefined) {
            this.removeChildRule(lastLI, childName);
        }

    }
    return false;
}

Red.prototype.setupMenu = function () {
    $(" .sent ul ").css({display: "none"}); // Opera Fix
    $(" .sent li").hover(function () {
//    	  console.log("Hover visible");
        $(this).find('ul:first').css({visibility: "visible", display: "none"}).show(400);
    }, function () {
//    	   console.log("Hover invisible");
        $(this).find('ul:first').css({visibility: "hidden"});
    });

    var that = this;
    // a hack until we generate menus from templates.
    var clicker = function (e) {
        return that.clickFun(e);
    }
    $(".sent li").click(clicker);
    var that = this;
    var closer = function (e) {
        var walkUp = e.delegateTarget;
        while (walkUp != document) {
            var walkPar = walkUp.parentNode;
            var myID = walkPar.id;
            if ((myID != undefined) && (myID != "")) {
                while (walkPar != document) {
                    if (walkPar.localName == "table") {
                        $(walkPar).remove();
                        that.compiledRules[myID] = undefined;
                        that.mem[myID] = undefined;
                        var i = that.activeRules.indexOf(myID);
                        if (i != -1) {
                            that.activeRules.splice(i, 1);
                        }
                        return;
                    }
                    walkPar = walkPar.parentNode;
                }
                return;
            }
            walkUp = walkPar;
        }

         return that.clickFun(e);
    }

    $(".closeBox").click(closer);
}


Red.prototype.genRuleMenu = function (lfs) {
    var sb = [];
    var ruleStack = [];

    var ruleName = lfs._rule;
    var pos = 0;
    var activeRule;
    var valSet = lfs;
    var parentSlot = undefined;

    // filter garbage.
    if (ruleName === undefined) {
        console.log("undefined rule name: " + ruleName);
        return;
    }

    activeRule = this.ruleCache[ruleName];
    if (activeRule === undefined) {
        console.log("rule object not in compiled list: " + ruleName);
        return;
    }

    // Create expanded rule entry
    sb.push("<ul class='sent' data-rule='");
    sb.push(ruleName);
    sb.push("'>");

    do {
        // Fill in the rule entries and nested info
        while (pos < activeRule.rulePattern.length) {
            var entry = activeRule.rulePattern[pos];
            var slotName = activeRule.slotNames[pos];

            if (entry instanceof RuleList) {
                // Has there been a selection from the list yet?

                var slotValue = valSet[slotName];
                var liText = slotValue;
                var whichName = undefined;

                if (slotValue !== undefined) {
                    // We have a slot value to work from.
                    // Is the slot's value contain _rule?
                    whichName = slotValue._rule;
                    if (whichName !== undefined) {
                        // We have a rule, generate an <li> with a data-which showing the rule name and just a dropper.
                        liText = "<img src='/images/sdown.gif'>";
                    }
                } else { // no slot value, use name instead.
                    liText = slotName;
                }
                // generate the <ul> stuff
                sb.push("<li data-slot='");
                sb.push(slotName);
                sb.push("'");
                if (parentSlot != undefined) {
                    sb.push(" data-parent-slot='");
                    sb.push(parentSlot);
                    sb.push("'");
                }

                if (whichName != undefined) {
                    sb.push(" data-which='");
                    sb.push(whichName);
                    sb.push("'");
                }
                sb.push("><a>");
                sb.push(liText);
                sb.push("</a>");

                // generate the popup insides
                entry.toHtmlULinside(sb);
                sb.push("</li>");
                pos++;
                // if we have a subrule, push old stuff on stack		      
                if (whichName !== undefined) {
                    ruleStack.push(ruleName);
                    ruleStack.push(pos);
                    ruleStack.push(activeRule);
                    ruleStack.push(valSet);
                    ruleStack.push(parentSlot);

                    ruleName = whichName;
                    pos = 0;
                    activeRule = this.ruleCache[ruleName];
                    parentSlot = slotName;
                    valSet = valSet[parentSlot];
                }
            }
            else if (entry instanceof InputItem) {
            	  sb.push("<li data-slot='");
            	  sb.push(slotName);
                if (parentSlot !== undefined) {
                    sb.push("' data-parent-slot='");
                    sb.push(parentSlot);
                }
								sb.push("'>");
                var inItemVal = valSet[slotName];
                sb.push(entry.toHtml(inItemVal));
                sb.push("</li>");
                pos++;
            } else { // literal word(s)
                if (parentSlot !== undefined) {
                    sb.push("<li data-parent-slot='");
                    sb.push(parentSlot);
                    sb.push("'>");
                } else {
                    sb.push("<li>");
                }
                sb.push(entry);
                sb.push("</li>");
                pos++;
            }
        }
        if (pos >= activeRule.rulePattern.length && ruleStack.length > 0) {
            // rule done, pop stack if at end.
            parentSlot = ruleStack.pop();
            valSet = ruleStack.pop();
            activeRule = ruleStack.pop();
            pos = ruleStack.pop();
            ruleName = ruleStack.pop();
        }
        if (pos >= activeRule.rulePattern.length && ruleStack.length == 0) {
            // Insert close box if we are now at top
            sb.push("<li>.<img class='closeBox' src='/images/closeboxL.png'></li>");
        }

    } while (ruleStack.length !== 0);
    sb.push("</ul>");

    var str = sb.join("");
    return str;
}


// Hack to close all open rule menus
closeRules = function (evt) {
    //$(this).find('ul:first').css({visibility: "hidden"});
}

Red.prototype.genParseTree = function (firstMenuElement) {
//    var menuElement = $(idCode);
//    if (menuElement.length == 0) return;
//   var firstMenuElement = menuElement[0];
    
    
//    var firstMenuText = firstMenuElement.innerHTML;
//    console.log(firstMenuText);
    var ruleBase = firstMenuElement.childNodes[0];
    var sentence = ruleBase.childNodes;
    var grandObj = {"_rule": ruleBase.dataset.rule};
    var objStack = [grandObj];
    var slotStack = [undefined];

    for (var slotX = 0; slotX < sentence.length; ++slotX) {
        var anEntry = sentence[slotX];
        if (anEntry.dataset.slot) {
            // If I am a "dataset.which", then descend down.
            var aWhich = anEntry.dataset.which;
            if (anEntry.dataset.which != undefined) {
                // make a new object for my slot
                var childObj = {"_rule": anEntry.dataset.which};
                var aTop = objStack[objStack.length - 1];
                aTop[anEntry.dataset.slot] = childObj;
                objStack.push(childObj);
                slotStack.push(anEntry.dataset.slot);
                continue;
            }
        }  // pop stack if needed.
        var psVal = anEntry.dataset.parentSlot;
        var psIndex = slotStack.indexOf(psVal);
        var dropCount = slotStack.length - (psIndex + 1);
        for (var i = 0; i < dropCount; ++i) {
            slotStack.pop();
            objStack.pop();
        }
        if (anEntry.dataset.slot) {
            var bTop = objStack[objStack.length - 1];
            var elemValue;
            if (anEntry.firstElementChild.nodeName === "INPUT") {
                elemValue = anEntry.firstElementChild.value;
            } else {
                elemValue = anEntry.firstElementChild.innerHTML;
            }
            bTop[anEntry.dataset.slot] = elemValue;
        }
    }
//    dumper(grandObj, 0);
    return grandObj;
}

var ranger = undefined;
var runFlag = false;
var rangeFlag = false;
var timerPeriod = 200;
var timerCode = 0;


Red.prototype.runRule = function (ruleObj, agentId, context) {
    if (ruleObj == undefined) {
        return undefined;
    }
    var ruleSlot = ruleObj._rule;
    if (ruleSlot == undefined) {
        return ruleObj;
    }
    var ruleDef = this.ruleCache[ruleSlot];
    if (ruleDef == undefined) return undefined;
    var ruleFunction = ruleDef.execFunction;
    if (ruleFunction == undefined) {
        return ruleObj;
    }
    var result = undefined;
    try {
        result = ruleFunction(ruleObj, agentId, context);
    } catch (err) {
        console.log(err);
    }
    return result;
}

Red.prototype.convertRules = function () {
    for (var i = 0; i < this.activeRules.length; ++i) {
        var ruleName = this.activeRules[i];
        if (ruleName != undefined) {
        var menuElement = $("#" + idCode);
        if (menuElement.length > 0) {
          var firstMenuElement = menuElement[0];
            var aGenTree = this.genParseTree(firstMenuElement);
            this.compiledRules[ruleName] = aGenTree;
            var asJSON = JSON.stringify(aGenTree);
//          console.log(asJSON);
          }
        }
     }

}

Red.prototype.setRunFlag = function (val) {
    var prevRunState = runFlag;
    if (val) {

        this.convertRules();
        if (!rangeFlag) {
            if (RF.isAndroid || RF.isIOS) {
                if (ranger == undefined) {
                    ranger = new Beacons();
                }
                ranger.startRanging();
            }
            rangeFlag = true;
        }

        if (!prevRunState) {
            var that = this;

            var periodicFunction = function () {
                that.runTheRules();
            }

            timerCode = setInterval(periodicFunction, timerPeriod);
        }
        runFlag = true;
        var ek = $("#runstate");
        ek[0].innerHTML = "State: Running " + this.activeRules.length + " rule(s)";
    } else {
        if (prevRunState) {
            clearInterval(timerCode);
            if (rangeFlag && (ranger != undefined)) {
                ranger.stopRanging();
                rangeFlag = false;
            }
            runFlag = false;
            $("#runstate")[0].innerHTML = "State: Stopped";
            this.mem = {}; // clear all rule states
            soundDriver.stopAudio();
        }
    }
}

Red.prototype.runTheRules = function () {
    var ruleMap = this.compiledRules;
    for (var key in ruleMap) {
        if (ruleMap.hasOwnProperty(key)) {
            var aRule = ruleMap[key];
            var aMem = this.mem[key];
            if (aMem === undefined) {
                aMem = {};
                this.mem[key] = aMem;
            }
            this.runRule(aRule, aMem, this);
        }
    }
}

Red.prototype.ruleToHTML = function (valSet, forId, ruleNumber) {
	  var ruleId = valSet._rule;
    var dropRule = this.ruleCache[ruleId];
    if (dropRule == undefined) {
        return;
    }

    var ruleGuts = this.genRuleMenu(valSet);

    sb = [];
    sb.push("<table class='outBox' style='z-index:");

    sb.push(10000 - ruleNumber); // {{{ruleDepth}}}

    sb.push("'> <tr><td id='");

    sb.push(forId); //  {{{ruleId}}}
    sb.push("'>");
    sb.push(ruleGuts); // {{{ruleBody}}}
    sb.push("</td></tr></table>");

    //   var ruleContext = {ruleId: thisRuleIdStr, ruleBody: ruleGuts, ruleDepth: this.ruleDepthCtr--};
    var ruleHTML = sb.join("");
    return ruleHTML;
}

Red.prototype.addInRule = function (ruleId, valSet) {
    var dropRule = this.ruleCache[ruleId];
    if (dropRule == undefined) {
        return;
    }

    var ruleGuts = this.genRuleMenu(valSet);
    var thisRuleIdNum = this.ruleIdCtr++;
    var thisRuleIdStr = "rule" + thisRuleIdNum;

    sb = [];
    sb.push("<table class='outBox' style='z-index:");

    sb.push(this.ruleDepthCtr--); // {{{ruleDepth}}}

    sb.push("'> <tr><td id='");

    sb.push(thisRuleIdStr); //  {{{ruleId}}}
    sb.push("'>");
    sb.push(ruleGuts); // {{{ruleBody}}}
    sb.push("</td></tr></table>");

    //   var ruleContext = {ruleId: thisRuleIdStr, ruleBody: ruleGuts, ruleDepth: this.ruleDepthCtr--};
    var ruleHTML = sb.join("");

//    console.log(ruleHTML);
    $("#endOfRulesList").before(ruleHTML);
    this.setupMenu();
    this.activeRules.push(thisRuleIdStr);
}

Red.prototype.dropInRule = function (ruleId) {
    this.addInRule(ruleId, {"_rule": ruleId});
}

Red.prototype.setupGallery = function () {
//    console.log(aRuleGallery);
    var gH = $("#gallery");
    gH[0].innerHTML = aRuleGallery;
    RF.redit.setupMenu();

    // generate and fill-in test rule:
    function handleDragStop(event, ui) {

        var offsetXPos = parseInt(ui.offset.left);
        var offsetYPos = parseInt(ui.offset.top);
//      console.log( "Drag stopped!\n\nOffset: (" + offsetXPos + ", " + offsetYPos + ")\n");
    }

    /*
     function handleDropEvent( event, ui ) {
     var draggable = ui.draggable;
     console.log( 'The square with ID "' + draggable.attr('id') + '" was dropped onto me!' );
     }
     */
    var that = this;

    function handleDropEvent(event, ui) {
        console.log("Dropped!");
        var draggable = ui.draggable;
        var dropId = draggable.attr('id');
        if (dropId != undefined) {
            that.dropInRule(dropId);
        }
//      console.log( 'The square with ID "' + draggable.attr('id') + '" was dropped onto me!' );
    }

    $(".senPro").draggable({opacity: 0.8, helper: "clone", stop: handleDragStop});
    $("#center").droppable({drop: handleDropEvent});
}

