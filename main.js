video = "";
status = "";
objects = [];

function setup(){
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function preload(){

}

function draw(){
    image(video, 0, 0, 380, 380);
    if(status != "")
    {
       for(i = 0; i < objects.length; i++)
       {
           r = random(255);
           g = random(255);
           b = random(255);
           document.getElementById("status").innerHTML = "Status : Object Detected";
           document.getElementById("number_of_objects").innerHTML = "Number Of Objects"+objects;

           fill(r, g, b);
           percent = floor(objects[i].confidence * 100);
           text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
           noFill();
           stroke(r, g, b);
           rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
       } 
    }
}

function modelLoaded(){
    console.log("Model Is Loaded");
    status = true;
    objectDetector.detect(video, gotResults);
}

function gotResults(error, results){
    if(error){
        console.error(error);
    }
    console.log(results);
    objects = results;
}
