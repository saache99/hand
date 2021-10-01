var idea_1 = "";
var idea_2 = "";

Webcam.set(
{
    width:350,
    height:300,
    img_format:'png',
    png_quality:90
});

camera = document.getElementById("camera");
Webcam.attach('#camera');

function take()
{
    Webcam.snap(function(data_uri)
    {
        document.getElementById("result").innerHTML = '<img id="img_op" src="'+data_uri+'">';
    })
}

console.log("ml5 version",ml5.version);

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/ByXxo_FgH/model.json",modelready);

function modelready()
{
    console.log("loaded");
}

function speech()
{
    var synth = window.speechSynthesis;
    speech_data1 = "Prediction 1"+ idea_1;
    speech_data2 = "Prediction 1"+ idea_2;
    var utterThis = new SpeechSynthesisUtterance(speech_data1+speech_data2);
    synth.speak(utterThis);
}
function show()
{
    img = document.getElementById("img_op");
    classifier.classify(img,gotResult);
}

function gotResult(error,results)
{
if(error)
{
    console.log(error);
}
else
{
    console.log(results);

    idea_1 = results[0].label;
    idea_2 = results[1].label;

    speech()

    if(results[0].label == "Up")
    {
        document.getElementById("show_3").innerHTML = "&#9757;";
    }

    if(results[0].label == "Dw")
    {
        document.getElementById("show_3").innerHTML = "&#128071;";
    }

    if(results[0].label == "Vi")
    {
        document.getElementById("show_3").innerHTML = "&#128075;";
    }

    
    if(results[1].label == "Up")
    {
        document.getElementById("show_4").innerHTML = "&#9757;";
    }

    if(results[1].label == "Dw")
    {
        document.getElementById("show_4").innerHTML = "&#128071;";
    }

    if(results[1].label == "Vi")
    {
        document.getElementById("show_4").innerHTML = "&#128075;";
    }

    if(results[1].label == "Vi" && results[0].label == "Vi")
    {
        document.getElementById("c").style.backgroundColor = "pink";
    }
    if(results[1].label == "Up" && results[0].label == "Up")
    {
        document.getElementById("u").style.backgroundColor = "pink";
    }
    if(results[1].label == "Dw" && results[0].label == "Dw")
    {
        document.getElementById("d").style.backgroundColor = "pink";
    }

    if(results[2].label == "Up" && results[1].label == "Up" && results[0].label == "Up")
    {
        idea_1 = "None of match";
        idea_2 = "None of match";

        document.getElementById("show_4").innerHTML = "None of match";
        document.getElementById("show_3").innerHTML = "None of match";
    }
}}