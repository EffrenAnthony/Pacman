// pos is the PacMan image position variable- it is set to 0 initially
var pos = 0;
var posGhost = -360;
var running = true;
//pageWidth is the width of the webpage. This is later used to calculate when Pac-Man needs to turn around. 
let pageWidth = window.innerWidth;
//This array contains all the PacMan movement images
const pacArray = [
  ['./images/PacMan1.png', './images/PacMan2.png'],
  ['./images/PacMan3.png', './images/PacMan4.png'],
];
const GhostArray = [
  ['./images/ghost.png'],
  ['./images/scared.png'],
]


// this variable defines what direction should PacMan go into:
// 0 = left to right
// 1 = right to left (reverse)
var direction = 0;

// This variable helps determine which PacMan image should be displayed. It flips between values 0 and 1
var focus = 0;

// This function is called on mouse click. Every time it is called, it updates the PacMan image, position and direction on the screen.
function Run(id) {
  let img = document.getElementById(id);
  let imgWidth = img.width;
  if (id == 'PacMan') {
    focus = (focus + 1) % 2;
    direction = checkPageBounds(direction, imgWidth, pos, pageWidth);
    img.src = pacArray[direction][focus];  
    let cherry = document.getElementById('Cherry');
    if (direction) {
      pos -= 20;
      cherry.style.display = 'none';
      img.style.left = pos + 'px';
    } else {
      cherry.style.display = 'inline';
      pos += 20;
      img.style.left = pos + 'px';
    } 
  }else {
    direction = checkPageBounds(direction, imgWidth, posGhost, pageWidth);
    img.src = GhostArray[direction][0];
    if (direction) {
      posGhost -= 20;
      img.style.left = posGhost + 'px';
    } else {
      posGhost += 20;
      img.style.left = posGhost + 'px';
    } 
  }
  
}

// TODO: Add a Javascript setInterval() method that will call the Run() function above every 200 milliseconds. Note: in the video, Dr. Williams uses the setTimeout() method, but here we are going to use a slightly different

// method called setInterval(), so that you can have practice using this method.
// Inside of the Run() function you will also have to add an extra argument "pageWidth", which is declared on line 4 when you call the checkPageBounds() function below. 
var runPackman = setInterval(()=>{
  Run('PacMan')
  Run('Ghost')
},100);    
function start(){
  let button = document.getElementById('button')
  button.innerHTML = 'Stop'
  if (running == false) {
    running = true;
    window.location.reload();
  }else {
    running = false;
    button.innerHTML = 'Run again'
    stop()
  }
  
}

function stop(){
  window.clearInterval(runPackman);
}

// This function determines the direction of PacMan based on screen edge detection. 
function checkPageBounds(direction, imgWidth, pos, pageWidth) {
  //
  // TODO: Complete this to reverse direction upon hitting screen edge
  // console.log(imgWidth + 'img with ', pos + 'pos ', pageWidth + 'pagewith')
  if(direction === 0 && imgWidth + pos >= pageWidth){
    direction = 1;
  }else if(direction === 1 && pos < 0){
    direction = 0;
  }
  return direction;
}

//Please do not change
