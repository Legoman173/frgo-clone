var buttons = {};
var starterColors = ["#ffffff", "#ff0000", "#ffff00","#00ff00","#00ffff","#0000ff","#ff00ff","#000000"];
var selections = [];

function copyStringToClipboard (str) {
    // Create new element
    var el = document.createElement('textarea');
    // Set value (string to be copied)
    el.value = str;
    // Set non-editable to avoid focus and move outside of view
    el.setAttribute('readonly', '');
    el.style = {position: 'absolute', left: '-9999px'};
    document.body.appendChild(el);
    // Select text inside element
    el.select();
    // Copy text to clipboard
    document.execCommand('copy');
    // Remove temporary element
    document.body.removeChild(el);
 }

function restart(){
    var window = document.getElementById("resultWindow");
    window.remove()
    var body = document.getElementById("body")
    body.style.setProperty("background-color", "white")
    buttons = {};
    starterColors = ["#ffffff", "#ff0000", "#ffff00","#00ff00","#00ffff","#0000ff","#ff00ff","#000000"];
    selections = [];
    var div = document.getElementById("colorsDiv");
    if (div == null){
        div = document.createElement("div");
        div.setAttribute("class","colorsDiv");
        div.setAttribute("id", "colorsDiv");
        document.getElementById("body").appendChild(div);
    }
    for (var x = 0; x < 8; x++){
        var button = document.createElement("div");
        button.setAttribute("type","Button")
        button.setAttribute("id", "colorSelection"+x);
        button.setAttribute("class", "colorSelection");
        button.style.setProperty("background-color",starterColors[x]);
        button.setAttribute("onclick","OnButtonSelectionClick(\""+x+"\")");
        var sample = document.createElement("h6");
        sample.innerHTML = "@@!!--SAMPLE--!!@@";
        sample.style.setProperty("color", starterColors[x]);
        sample.setAttribute("id","sample"+x);
        var br = document.createElement("br");
        sample.appendChild(br);
        button.appendChild(sample);
        buttons[x] = button;
        div.appendChild(button);
    }
}


function toRGB(colorCode){
    var color = [];
    var colorRGB = [];
    color[0]=colorCode.toString(16).substring(1,3);
    color[1]=colorCode.toString(16).substring(3,5);
    color[2]=colorCode.toString(16).substring(5,7);
    colorRGB[0] = parseInt(color[0],16);
    colorRGB[1] = parseInt(color[1],16);
    colorRGB[2] = parseInt(color[2],16);
    return colorRGB;
}
function toCoords(name){
    switch(parseInt(name)){
        case 0: return [1,1,1];
        case 1: return [1,0,0];
        case 2: return [1,1,0];
        case 3: return [0,1,0];
        case 4: return [0,1,1];
        case 5: return [0,0,1];
        case 6: return [1,0,1];
        case 7: return [0,0,0];
        default: return null;
    }
}

function OnButtonSelectionClick(n){
    var colorrgb = toCoords(n);
    var newpoint = [];
    var pointset = [];
    var oldColors = starterColors;
    selections.push(toCoords(n));
    var div = document.getElementById("colorsDiv");
    var br = document.createElement("br");
    div.appendChild(br);
    for (var x = 0; x < 8; x++){
        pointset[x] = [];
        pointset[x][0] = ((toCoords(x)[0])*((2**(8-selections.length))-1));
        pointset[x][1] = ((toCoords(x)[1])*((2**(8-selections.length))-1));
        pointset[x][2] = ((toCoords(x)[2])*((2**(8-selections.length))-1));
        for (var y = 0; y < selections.length; y++){
            pointset[x][0] += (selections[y][0]*(2**(7-y)));
            pointset[x][1] += (selections[y][1]*(2**(7-y)));
            pointset[x][2] += (selections[y][2]*(2**(7-y)));
        }   
        console.log(pointset[x][0]);
        console.log(pointset[x][1]);
        console.log(pointset[x][2]);
        var oldButton = document.getElementById("colorSelection"+x);
        console.log(oldButton)
        oldButton.setAttribute("id","Test");
        oldButton.setAttribute("onclick","");
        
        var button = document.createElement("div");
        button.setAttribute("id", "colorSelection"+x);
        button.setAttribute("class", "colorSelection");
        button.style.setProperty("background-color","rgb("+pointset[x][0]+","+pointset[x][1]+","+pointset[x][2]+")");
        button.setAttribute("onclick","OnButtonSelectionClick(\""+x+"\")");
        var sample = document.createElement("h6");
        sample.innerHTML = "@@!!--SAMPLE--!!@@";
        sample.style.setProperty("color", "rgb("+pointset[x][0]+","+pointset[x][1]+","+pointset[x][2]+")");
        sample.setAttribute("id","sample"+x);
        var br = document.createElement("br");
        sample.appendChild(br);
        button.appendChild(sample);

        div.appendChild(button);
        buttons[x] = button;
    }

    if (selections.length == 6){
        var finalColor = [pointset[n][0],pointset[n][1],pointset[n][2]]
        copyStringToClipboard(convertToHex(finalColor[0],finalColor[1], finalColor[2]))
        var div = document.getElementById("colorsDiv");
        div.remove();
        var body = document.getElementById("body");
        body.style.setProperty("background-color","rgb("+finalColor[0]+","+finalColor[1]+","+finalColor[2]+")");
        var wind = document.createElement("div");
        wind.setAttribute("class","resultsMenu");
        wind.setAttribute("id","resultWindow")
        body.appendChild(wind);
        var hex = document.createElement("h1");
        hex.innerHTML = "Hexadecimal: "+convertToHex(finalColor[0],finalColor[1],finalColor[2]);
        wind.appendChild(hex);
        var RGB0 = document.createElement("h1");
        RGB0.innerHTML = "RGB:";
        var r = document.createElement("span");
        r.innerHTML = "Red: "+finalColor[0]+", ";
        r.style.setProperty("color","#ff0000");
        var g = document.createElement("span");
        g.innerHTML = "Green: "+finalColor[1]+", ";
        g.style.setProperty("color","#00ff00");
        var b = document.createElement("span");
        b.innerHTML = "Blue: "+finalColor[2];
        b.style.setProperty("color","#0000ff");
        wind.appendChild(RGB0);
        wind.appendChild(r);
        wind.appendChild(g);
        wind.appendChild(b);
        var chart = document.createElement("div");
        chart.setAttribute("class", "chart");
        wind.appendChild(chart);
        var hidden = document.createElement("div");
        hidden.setAttribute("class","hiddenColumn");
        hidden.style.setProperty("height","100%");
        chart.appendChild(hidden);
        var red = document.createElement("div");
        red.setAttribute("class","redColumn");
        red.style.setProperty("height",(finalColor[0]/2.55).toString()+"%");
        chart.appendChild(red);
        var green = document.createElement("div");
        green.setAttribute("class","greenColumn");
        green.style.setProperty("height",(finalColor[1]/2.55).toString()+"%");
        chart.appendChild(green);
        var blue = document.createElement("div");
        blue.setAttribute("class","blueColumn");
        blue.style.setProperty("height",(finalColor[2]/2.55).toString()+"%");
        chart.appendChild(blue);
        var CMYKVal = convertToCMYK(finalColor[0],finalColor[1],finalColor[2]);
        console.log(CMYKVal);
        var CMYK = document.createElement("h1");
        CMYK.innerHTML = "CMYK:";
        wind.appendChild(CMYK);
        var C = document.createElement("span");
        C.setAttribute("class","Cyan");
        C.innerHTML = Math.round(CMYKVal[0]*100)+"%, ";
        wind.appendChild(C);
        var M = document.createElement("span");
        M.setAttribute("class","Magenta");
        M.innerHTML = Math.round(CMYKVal[1]*100)+"%, ";
        wind.appendChild(M);
        var Y = document.createElement("span");
        Y.setAttribute("class","Yellow");
        Y.innerHTML = Math.round(CMYKVal[2]*100)+"%, ";
        wind.appendChild(Y);
        var K = document.createElement("span");
        K.setAttribute("class","Black");
        K.innerHTML = Math.round(CMYKVal[3]*100)+"%";
        wind.appendChild(K);
        var HSV0 = document.createElement("h1");
        HSV0.innerHTML = "HSV:";
        var HSVVal = convertToHSV(finalColor[0],finalColor[1],finalColor[2]);
        var HSV = document.createElement("span");
        HSV.innerHTML = "Hue: "+ HSVVal[0]+", Saturation: "+HSVVal[1]+", Value: "+HSVVal[2];
        wind.appendChild(HSV0);
        wind.appendChild(HSV);
        var restartButton = document.createElement("div");
        restartButton.setAttribute("type","Button");
        restartButton.setAttribute("class","printButton");
        restartButton.setAttribute("onclick", "restart()")
        var restartText = document.createElement("h1");
        restartText.innerHTML = "Restart program";
        restartButton.appendChild(restartText);
        wind.appendChild(restartButton);

    }
}

 



function OnStartSetColors(){
    var div = document.getElementById("colorsDiv");
    if (div == null){
        div = document.createElement("div");
        div.setAttribute("class","colorsDiv");
        div.setAttribute("id", "colorsDiv");
        document.getElementById("body").appendChild(div);
    }
    for (var x = 0; x < 8; x++){
        var button = document.createElement("div");
        button.setAttribute("type","Button")
        button.setAttribute("id", "colorSelection"+x);
        button.setAttribute("class", "colorSelection");
        button.style.setProperty("background-color",starterColors[x]);
        button.setAttribute("onclick","OnButtonSelectionClick(\""+x+"\")");
        var sample = document.createElement("h6");
        sample.innerHTML = "@@!!--SAMPLE--!!@@";
        sample.style.setProperty("color", starterColors[x]);
        sample.setAttribute("id","sample"+x);
        var br = document.createElement("br");
        sample.appendChild(br);
        button.appendChild(sample);
        buttons[x] = button;
        div.appendChild(button);
    }
}

OnStartSetColors();