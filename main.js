var prediction1 = "";
var prediction2 = "";

Webcam.set({
    width: 350,
    height: 300,
    image_format: 'png',
    png_quality: 90
});
camera = document.getElementById("camera");
Webcam.attach(
    '#camera'
);

function captureImage() {
    Webcam.snap(function(dataURI) {
        document.getElementById("result").innerHTML = "<img id='capturedImage' src='" + dataURI + "'/>";
    });
}
console.log("ml5 version:", ml5.version);
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/pK600kTYN/model.json', modelLoaded)

function modelLoaded() {
    console.log("model loaded!");
}

function speak() {
    var synth = window.speechSynthesis;
    var speakData1 = "The first Prediction is " + prediction1;
    var speakData2 = "The second Prediction is " + prediction2;
    var utterThis = new SpeechSynthesisUtterance(speakData1 + speakData2);
    synth.speak(utterThis);
}

function predictImage() {
    img = document.getElementById("capturedImage");
    classifier.classify(img, gotResult)
}

function gotResult(error, results) {
    if (error) {
        console.error(error);
    } else {
        console.log(results);
        document.getElementById("resultEmotionName1").innerHTML = results[0].label;
        document.getElementById("resultEmotionName2").innerHTML = results[1].label;
        prediction1 = results[0].label;
        prediction2 = results[1].label;
        speak();
        if (results[0].label == "happy") {
            document.getElementById("updateEmoji1").innerHTML = "&#128522;"
        }
        if (results[0].label == "sad") {
            document.getElementById("updateEmoji1").innerHTML = "&#128532;"
        }
        if (results[0].label == "angry") {
            document.getElementById("updateEmoji1").innerHTML = "&#128548;"
        }
        if (results[1].label == "happy") {
            document.getElementById("updateEmoji2").innerHTML = "&#128522;"
        }
        if (results[1].label == "sad") {
            document.getElementById("updateEmoji2").innerHTML = "&#128532;"
        }
        if (results[1].label == "angry") {
            document.getElementById("updateEmoji2").innerHTML = "&#128548;"
        }
    }



}