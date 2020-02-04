let video;
let poseNet;
// add more nodes for body part

let noseX = 0;
let noseY = 0;
let eyelX = 0;
let eyelY = 0;
let eyeRX = 0;
let eyeRY = 0;

function setup() {
    createCanvas(640, 480);
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelReady);
    poseNet.on('pose', gotPoses);
}

function gotPoses(poses) {
    console.log(poses);
    if (poses.length > 0) {
        // Add more nodes
        let nX = poses[0].pose.keypoints[0].position.x;
        let nY = poses[0].pose.keypoints[0].position.y;
        let eX = poses[0].pose.keypoints[1].position.x;
        let eY = poses[0].pose.keypoints[1].position.y;
        let eeX = poses[0].pose.keypoints[2].position.x;
        let eeY = poses[0].pose.keypoints[2].position.y;
        noseX = lerp(noseX, nX, 0.5);
        noseY = lerp(noseY, nY, 0.5);
        eyelX = lerp(eyelX, eX, 0.5);
        eyelY = lerp(eyelY, eY, 0.5);
        eyeRX = lerp(eyeRX, eeX, 0.5);
        eyeRY = lerp(eyeRY, eeY, 0.5);
    }
}

function modelReady() {
    console.log('model ready');
}

function draw() {
    image(video, 0, 0);

    let d = dist(noseX, noseY, eyelX, eyelY);
    // Draw your Nose here
    fill(255, 0, 0);
    ellipse(noseX, noseY, d - 10);
    // Draw your Left Eyes
    fill(0, 0, 255);
    ellipse(eyelX, eyelY, 50);
    // Draw your Right Eyes
    fill(0, 0, 255);
    ellipse(eyeRX, eyeRY, 50);


}