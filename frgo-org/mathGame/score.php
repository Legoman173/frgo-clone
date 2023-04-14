<!doctype html>
<html>
    <head>
        <title>Math Game Score</title>
        <link rel = "stylesheet" type = "text/css" href = "main.css">
        <style>
            body{
                text-align:center;
                user-select: none;
                background-color:#000080;
                color:white;
            }
            #middle{
                display:inline-block;
                text-align:center;
                font-family:"Comic Sans", sans-serif;
            }
            #score{
                font-size:5em;
            }
            #paragraph{
                font-size:2em;
            }
            #back{
                font-size:2em;
                text-decoration:none;
                color:#0f0;
            }
            #back:visited{
                color:#0f0;
            }
            #back:hover{
                color:#0ff;
            }

        </style>
    </head>
    <body>
        <div id = "middle">
            <p id = "score"></p>
            <p id = "paragraph"></p>
            <a id = "back" target = "_blank">Play again!</a>
        </div>
        <script>
            var score = <?php print($_POST["score"]);?>;
            var problems = <?php print($_POST["problems"]);?>;
            var difficulty = <?php print($_POST["difficulty"]);?>;
            console.log(score);
            console.log(problems);
            console.log(difficulty);

            function getProblems(){
                var string = ""
                for (i = 0; i < problems.length; i++){
                    var fancyText = ["add","subtract","multiply","divide","convert numbers from binary to decimal","convert numbers from decimal to binary", "add in binary", "subtract in binary", "multiply in binary", "divide in binary"];
                    
                    console.log(i,problems)
                    if (problems.length > 1 && i == problems.length-1){
                        string += "and "+fancyText[problems[i]];
                    }
                    else{
                        if (problems.length > 1){
                            string += fancyText[problems[i]] + ", "
                        }
                        else{
                            string += fancyText[problems[i]];
                        }
                    }
                    
                    console.log(string);
                }
                return string;
            }

            document.getElementById("score").innerHTML = "You scored "+score+" points!";

            document.getElementById("paragraph").innerHTML = "You scored "+ score+" points in "+["easy","medium","hard"][difficulty-1]+" difficulty. You were given questions where you had to "+getProblems()+"."

            document.getElementById("back").setAttribute("href","./game.html?q="+JSON.stringify(problems)+"&d="+JSON.stringify(difficulty));
        </script>
    </body>
</html>