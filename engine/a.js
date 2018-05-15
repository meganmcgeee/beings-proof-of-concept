RF = {}; // Initialize Global singleton.


RF.isAndroid = navigator.userAgent.match(/Android/) || navigator.userAgent.match(/android/);

RF.isIOS = navigator.userAgent.match(/iPhone/);

if (RF.isAndroid) {
    console.log("Android detected.");
 } else {
    console.log("Not running Android.");
}
