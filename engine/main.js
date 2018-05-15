
doGen1 = function () {
	
	var datM = {"_rule": "Master"};
	var dat = {"_rule":"demoRule","Conditions":{"_rule":"testButton"},"Actions":{"_rule":"Set Box","Colors":"red"}};
	var dat2 = {"_rule":"demoRule","Conditions":{"_rule":"closeMote","Estimote":"ice 2"},"Actions":{"_rule":"Play Sound","Sounds":"every cop a criminal.wav"}};
	RF.RF.redit.addInRule(dat._rule, datM);
}



Template.home.rendered = function () {

	LoadTheRules();
//  RF.redit.setupGallery();
  
  RF.TouchClick("#runButton", function() {RF.redit.setRunFlag(true);});
  RF.TouchClick("#stopButton", function() {RF.redit.setRunFlag(false);});
  RF.TouchClick("#testButton", function() {doTest(true);}); 
  RF.TouchClick("#testButton1", function() {doTest2(true)});
  RF.TouchEndClick("#testButton", function() {doTest(false);}); 
  RF.TouchEndClick("#testButton1", function() {doTest2(false)}); 
  
  RF.TouchClick("#addrulebutton", function() {doGen1()});
};

Template.layout.rendered = function () {

	LoadTheRules();
}