//RF = {}; // Initialize Global singleton.


AudioDriver = function() {
    this.audioFX = undefined;
    this.currentSoundName = undefined;
    this.soundPlaying = false;

}

AudioDriver.prototype.playBrowser = function (snd, callback) {
//    console.log("playABrowser: " + snd);
    var sndPath = snd;
    if(snd.indexOf("http") === -1) {
        sndPath = RF.s3Root + snd;
    }
//    console.log(sndPath);
    this.stopAudio();
    this.audioFX =  new Audio(sndPath);
    this.audioFX.src = sndPath; //"assets/sounds/meow.wav";
    $(this.audioFX).off("ended"); // avoid duplicates
    $(this.audioFX).on("ended", callback);
    this.audioFX.play();
}


AudioDriver.prototype.playAndroid = function (snd, callback) {
//    console.log("playABrowser: " + snd);
    var sndPath = snd;
    if(snd.indexOf("http") === -1) {
        sndPath = RF.s3Root + snd;
    }

    this.stopAudio();
    this.audioFX =  new Media(sndPath, callback);
    this.audioFX.play();
}

AudioDriver.prototype.stopAudio = function () {
    if(this.audioFX != undefined) {
        this.audioFX.pause();
        this.audioFX = undefined;
        this.soundPlaying = false;
    }
}
/*
 // For Android, we have to fudge the path to be an absolute one
 // and use the PhoneGap library.
 AudioDriver.playAndroid = function (snd, callback) {
 //    console.log("playAndroid: " + snd);
 var sndPath = snd;
 if(snd.indexOf("http") === -1) {
 sndPath = "/android_asset/www/assets/sounds/" + snd;
 }
 var dunner = function(e) {
 alert("error: " + e);
 }
 var audioFX =  new Media(sndPath, callback, dunner);
 audioFX.play();
 }
 */
AudioDriver.prototype.playSound = function (snd) {
    var that = this;
    var doneFun = function () {
        that.soundPlaying = false;
    }
    if(RF.isAndroid) {
        this.playAndroid(snd, doneFun );
    } else {
        this.playBrowser(snd, doneFun );
    }
    this.soundPlaying = true;

}

AudioDriver.prototype.isDonePlaying = function() {
    return this.soundPlaying;
}

var soundDriver = new AudioDriver();


RF.sounder = function(ruleObj, agent, context) {
	var soundNameRel = ruleObj.Sounds;
    var soundName = RF.s3Root + soundNameRel;
    if(!agent.running) {
        console.log(soundName);
        if(soundNameRel != soundDriver.currentSoundName) {
            soundDriver.stopAudio();
        }
        agent.running = true;
        soundDriver.playSound(soundName);
        soundDriver.currentSoundName = soundNameRel;
        return false;
    } else {
        // Check for sound having been closed elsewhere, or intended sound different
          if(!soundDriver.soundPlaying || soundNameRel != soundDriver.currentSoundName) {
              agent.running = false;
              return true;
          }
    }
	return false;
}


RF.changeURL = function(ruleObj, agent, context) {
    var el = window.document.getElementById('stagef');
    var relTargetURL = ruleObj.Images;
    if(relTargetURL === undefined) {
        relTargetURL = ruleObj.Pages;
    }
    var targetURL = RF.s3Root + relTargetURL;
    if ((targetURL != undefined) && (targetURL != el.src)) {
        el.src = targetURL;
    }
    return targetURL;
}

RF.runPageAction = function (ruleObj, agent, context) {
    var pa = ruleObj.PageActions;
    var paT = typeof pa;
    if(paT != "string") {
          return context.runRule(pa, agent, context);
    }
    return pa;
}

