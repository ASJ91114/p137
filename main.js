objects = [];
status = "";

function setup() {
    canvas = createCanvas(480, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(480, 380);
    video.hide();
}

function start() {
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "STATUS: DETECTING OBJECTS";
    objectName = document.getElementById("objectName").value;
}

function modelLoaded() {
    console.log("MODEL LOADED");
    status = true;
}

function draw() {
    image(video, 0, 0, 480, 380);
    if (status != "") {
        objectDetector.detect(video, gotResults);
        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "STATUS: OBJECTS DETECTED"
            document.getElementById("numberOfObjects").innerHTML = "NUMBER OF OBJECTS DETECTED ARE: " + objects.length;
            r = random(255);
            g = random(255);
            b = random(255);
            fill(r, g, b);
            noFill();
            stroke(r, g, b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

            if (object[i].label == objectName) {
                video.stop();
                objectDetector.detect(gotResults);
                document.getElementById("objectStatus").innerHTML = objectName + " FOUND ";
                synth = window.speechSynthesis;
                utterThis = new SpeechSynthesisUtterance(objectName + "FOUND!");
                synth.speak(utterThis);
            } else {
                document.getElementById("objectStatus").innerHTML = objectName + " NOT FOUND ";
            }
        }
    }
}

function gotResults(error, results) {
    if (error) {
        console.log(error);
    }
    console.log(results);
    object = results;
}