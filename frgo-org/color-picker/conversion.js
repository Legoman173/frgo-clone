function makeZero(value){
	if (value < 0 || value == null){
		return 0;
	}
	return value;
}


function partToHex(part) {
  var hex = part.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

/*CMYK conversions:
R, G, and B are red, green and blue
if k, c, m, or y are below zero or undefined, set to zero.
code:*/

function convertToCMYK(r, g, b){
	var computedC = 0;
 var computedM = 0;
 var computedY = 0;
 var computedK = 0;

 //remove spaces from input RGB values, convert to int
 var r = parseInt( (''+r).replace(/\s/g,''),10 ); 
 var g = parseInt( (''+g).replace(/\s/g,''),10 ); 
 var b = parseInt( (''+b).replace(/\s/g,''),10 ); 

 if ( r==null || g==null || b==null ||
     isNaN(r) || isNaN(g)|| isNaN(b) )
 {
   alert ('Please enter numeric RGB values!');
   return;
 }
 if (r<0 || g<0 || b<0 || r>255 || g>255 || b>255) {
   alert ('RGB values must be in the range 0 to 255.');
   return;
 }

 // BLACK
 if (r==0 && g==0 && b==0) {
  computedK = 1;
  return [0,0,0,1];
 }

 computedC = 1 - (r/255);
 computedM = 1 - (g/255);
 computedY = 1 - (b/255);

 var minCMY = Math.min(computedC,
              Math.min(computedM,computedY));
 computedC = (computedC - minCMY) / (1 - minCMY) ;
 computedM = (computedM - minCMY) / (1 - minCMY) ;
 computedY = (computedY - minCMY) / (1 - minCMY) ;
 computedK = minCMY;

 return [computedC,computedM,computedY,computedK];
}

/*Hexidecimal Conversion*/


function convertToHex(r, g, b) {
  return "#" + partToHex(r) + partToHex(g) + partToHex(b);
}

/*HSV Conversion*/
60

function convertToHSV (r, g, b) {
    let rabs, gabs, babs, rr, gg, bb, h, s, v, diff, diffc, percentRoundFn;
    rabs = r / 255;
    gabs = g / 255;
    babs = b / 255;
    v = Math.max(rabs, gabs, babs),
    diff = v - Math.min(rabs, gabs, babs);
    diffc = c => (v - c) / 6 / diff + 1 / 2;
    percentRoundFn = num => Math.round(num * 100) / 100;
    if (diff == 0) {
        h = s = 0;
    } else {
        s = diff / v;
        rr = diffc(rabs);
        gg = diffc(gabs);
        bb = diffc(babs);

        if (rabs === v) {
            h = bb - gg;
        } else if (gabs === v) {
            h = (1 / 3) + rr - bb;
        } else if (babs === v) {
            h = (2 / 3) + gg - rr;
        }
        if (h < 0) {
            h += 1;
        }else if (h > 1) {
            h -= 1;
        }
    }
    return [Math.round(h * 360), percentRoundFn(s * 100),percentRoundFn(v * 100)];
}