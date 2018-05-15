/**
 * Created by Jamie on 12/15/2014.
 */



RF.s3Root = "http://ifbuck.s3.amazonaws.com/";

RF.openS3 = function(extMap) {
    $.ajax({
        url: RF.s3Root,
        type: 'GET',
        complete: function(xhr, textStatus) {
            console.log("openS3:");
        //    console.log(xhr.responseText);
            var xmlDoc = $.parseXML(xhr.responseText);
            var xml = $( xmlDoc);
            var list = xml.find("Contents");
            for(var i = 0; i < list.length; ++i) {
                var aCon = list[i];
                var aKey = aCon.firstChild;
                var aKeyText = aKey.textContent;
                var aLowKey = aKeyText.toLowerCase();
                for (var ext in extMap) {
                     if (extMap.hasOwnProperty(ext)) {
                         var px = aLowKey.search(ext);
                         if(px >= 0) {
                             var ruleO = extMap[ext];
                             ruleO.addListData(aKeyText);
                         }
                     }
                }
                console.log(aKeyText);
            }
        }
    })
}

