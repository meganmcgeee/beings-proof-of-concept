/**
 * Created by User on 12/3/2014.
 */
Beacons = function() {

}
beaconColorStyles = [
	'style-color-unknown style-color-unknown-text',
	'style-color-mint style-color-mint-text',
	'style-color-ice style-color-ice-text',
	'style-color-blueberry-dark style-color-blueberry-dark-text',
	'style-color-white style-color-white-text',
	'style-color-transparent style-color-transparent-text'];
proximityNames = [
	'unknown',
	'immediate',
	'near',
	'far'];

Beacons.prototype.stopRanging = function () {
	EstimoteBeacons.stopRangingBeaconsInRegion({});
}

var minorToColor = {
	13089: "blue",
	8726:  "ice",
	28380: "mint",

	11937:  "blue 2",
	54945:  "ice 2",
	1433:   "mint 2",

	45489: "blue 3",
	15543:  "ice 3",
	26026: "mint 3",


	9999: "white"
};

var globalBeaconMap = {};

Beacons.prototype.startRanging = function() {
    EstimoteBeacons.requestAlwaysAuthorization();

    function beaconColorStyle(color)
   	{
   		if (!color)
   		{
   			color = 0;
   		}

   		// Eliminate bad values (just in case).
   		color = Math.max(0, color);
   		color = Math.min(5, color);

   		// Return style class for color.
   		return beaconColorStyles[color];
   	}

    function displayBeconInfo(beaconInfo)
 		{
 			// Clear beacon HTML items.
 			$('#id-screen-range .style-beacon-list').empty();

 			// Sort beacons by distance.
 			beaconInfo.beacons.sort(function(beacon1, beacon2) {
 				return beacon1.distance > beacon2.distance; });

			var nextBeaconMap = {};
 			// Generate HTML for beacons.
 			$.each(beaconInfo.beacons, function(key, beacon)
 			{
 				//var element = $(createBeaconHTML(beacon));
				var aColor = minorToColor[beacon.minor];
				if(aColor == undefined) {
					aColor = "white";
				}
				nextBeaconMap[aColor] =  beacon.rssi;
               // console.log(element);
               // $('#id-screen-range .style-beacon-list').append(element);
				//$('#id-screen-range .style-beacon-list').innerText =  JSON.stringify(nextBeaconMap);
 			});
			globalBeaconMap = nextBeaconMap;
			$(' #beaconLine')[0].innerText =  JSON.stringify(globalBeaconMap);
 		};

 		function createBeaconHTML(beacon)
 		{
 			var colorClasses = beaconColorStyle(beacon.color);
 			htm = '<div class="' + colorClasses + '">'
 				+ '<table><tr><td>Major</td><td>' + beacon.major
 				+ '</td><td>Minor</td><td>' + beacon.minor
 				+ '</td><td>RSSI</td><td>' + beacon.rssi;
 			if (beacon.proximity)
 			{
 				htm += '</td><td>Proximity</td><td>'
 					+ formatProximity(beacon.proximity)
 			}
 			if (beacon.distance)
 			{
 				htm += '</td></tr><tr><td>Distance</td><td>'
 					+ formatDistance(beacon.distance)
 			}
 			htm += '</td></tr></table></div>';
 			return htm;
 		};

    function onRange(beaconInfo) {
     //       if(beaconInfo.beacons.length > 0) {
     //            console.log('onRange ' + beaconInfo.beacons.length);
     //       }
  			displayBeconInfo(beaconInfo);
  		}

  		function onError(errorMessage)
  		{
  			console.log('Range error: ' + errorMessage);
  		}

  	EstimoteBeacons.startRangingBeaconsInRegion(
  			{}, // Empty region matches all beacons.
  			onRange,
  			onError);
}
//

var nearMote = function(ruleObj, agent, context) {
	var moteColor = ruleObj.Estimote;
	if(moteColor == "white")  {
		return true;
	}
	var moteStrength = globalBeaconMap[moteColor];
	if(moteStrength != undefined) {
		if(moteStrength > -45) return true;
	}
	return false;
}

var awareMote = function(ruleObj, agent, context) {
	var moteColor = ruleObj.Estimote;
	if(moteColor == "white")  {
		return true;
	}
	var moteStrength = globalBeaconMap[moteColor];
	if(moteStrength != undefined) {
		if(moteStrength > -80) return true;
	}
	return false;
}


/*

 - (CGPoint)getCoordinateWithBeaconA:(CGPoint)a beaconB:(CGPoint)b beaconC:(CGPoint)c distanceA:(CGFloat)dA distanceB:(CGFloat)dB distanceC:(CGFloat)dC {
 CGFloat W, Z, x, y, y2;
 W = dA*dA - dB*dB - a.x*a.x - a.y*a.y + b.x*b.x + b.y*b.y;
 Z = dB*dB - dC*dC - b.x*b.x - b.y*b.y + c.x*c.x + c.y*c.y;

 x = (W*(c.y-b.y) - Z*(b.y-a.y)) / (2 * ((b.x-a.x)*(c.y-b.y) - (c.x-b.x)*(b.y-a.y)));
 y = (W - 2*x*(b.x-a.x)) / (2*(b.y-a.y));
 //y2 is a second measure of y to mitigate errors
 y2 = (Z - 2*x*(c.x-b.x)) / (2*(c.y-b.y));

 y = (y + y2) / 2;
 return CGPointMake(x, y);
 }




 (CGPoint)getCoordinateWithBeaconA:(CGPoint)a beaconB:(CGPoint)b beaconC:(CGPoint)c distanceA:(CGFloat)dA distanceB:(CGFloat)dB distanceC:(CGFloat)dC {


 CGFloat x, y;
 x = ( ( (pow(dA,2)-pow(dB,2)) + (pow(c.x,2)-pow(a.x,2)) + (pow(b.y,2)-pow(a.y,2)) ) * (2*c.y-2*b.y) - ( (pow(dB,2)-pow(dC,2)) + (pow(c.x,2)-pow(c.x,2)) + (pow(c.y,2)-pow(b.y,2)) ) *(2*b.y-2*a.y) ) / ( (2*b.x-2*c.x)*(2*b.y-2*a.y)-(2*a.x-2*b.x)*(2*c.y-2*b.y) );

 y = ( (pow(dA,2)-pow(dB,2)) + (pow(c.x,2)-pow(a.x,2)) + (pow(b.y,2)-pow(a.y,2)) + x*(2*a.x-2*b.x)) / (2*b.y-2*a.y);



 return CGPointMake(x, y);

 // Get RSSI and Measured Power
 int rssi = buf[11];
 int txpower = buf[42];

 // Calculate Distance
 // This is based on the algorithm from http://stackoverflow.com/questions/20416218/understanding-ibeacon-distancing
 //
 double distance = 0.0;
 double ratio = (256 - rssi) * 1.0 / (256 - txpower);

 if(ratio < 1.0)
 distance = pow(ratio, 10);
 else
 distance = (0.89976)*pow(ratio,7.7095) + 0.111;

 }





 ratio_dB = txCalibratedPower - RSSI
 To convert that into a linear ratio, we use the standard formula for dB:

 ratio_linear = 10 ^ (ratio_dB / 10)
 If we assume conservation of energy, then the signal strength must fall off as 1/r^2. So:

 power = power_at_1_meter / r^2. Solving for r, we get:

 r = sqrt(ratio_linear)
 In Javascript, the code would look like this:

 function getRange(txCalibratedPower, rssi) {
 var ratio_db = txCalibratedPower - rssi;
 var ratio_linear = Math.pow(10, ratio_db / 10);

 var r = Math.sqrt(ratio_linear);
 return r;
 }
 Note, that, if you're inside a steel building, then perhaps there will be internal reflections that make the
  signal decay slower than 1/r^2. If the signal passes through a human body (water) then the signal will be attenuated.
  It's very likely that the antenna doesn't have equal gain in all directions. Metal objects in the room may create
  strange interference patterns. Etc, etc... YMMV.




 ######################################################################## 100.0%

 Meteor 1.0.2.1 has been installed in your home directory (~/.meteor).
 Writing a launcher script to /usr/local/bin/meteor for your convenience.

 To get started fast:

 $ meteor create ~/my_cool_app
 $ cd ~/my_cool_app
 $ meteor

 Or see the docs at:

 docs.meteor.com

 Jamies-MacBook-Pro:~ jamie$
 */