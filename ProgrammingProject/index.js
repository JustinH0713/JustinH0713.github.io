let stars = [];

let fireworks = [];  // Array to store fireworks

let confetti = [];  // Array to store confetti particles
let confettiAmount = 10;  // Control the number of confetti created each time


function setup() {
  createCanvas(600, 900);
  createStars(400);  // Generate the stars once
}

function draw() {
  background(0);
  drawStars();   // Continuously draw the stars on each frame
  drawMoon();
  drawBuilding();
  draw3DSphere(300, 300, 100)
  
  // Update and display all fireworks
  for (let i = fireworks.length - 1; i >= 0; i--) {
    fireworks[i].update();  // Update firework particles
    fireworks[i].display();  // Display the firework
    if (fireworks[i].isFinished()) {
      fireworks.splice(i, 1);  // Remove the firework when it's finished
    }
  }
  
   // Update and display all confetti particles
  for (let i = confetti.length - 1; i >= 0; i--) {
    confetti[i].update();  // Update the position of the confetti
    confetti[i].display();  // Display the confetti
    if (confetti[i].isFinished()) {
      confetti.splice(i, 1);  // Remove the confetti particle if it’s finished
    }
  }
    
    // Periodically create new confetti pieces
  if (frameCount % 10 === 0) {  // Every 10 frames, spawn new confetti
    createConfetti(confettiAmount);
  }
}

// Function to create the stars
function createStars(numStars) {
  stars = []; // Clear any previous stars

  for (let i = 0; i < numStars; i++) {
    let x = random(width);         // Random x position
    let y = random(0, 400);        // Random y position between 0 and 400 (above 400)
    let size = random(1, 3);       // Random size for each star
    let star = { x: x, y: y, size: size }; // Star object
    stars.push(star);  // Add the star to the stars array
  }
}

// Function to draw the stars
function drawStars() {
  noStroke();
  fill(255); // White color for stars

  for (let star of stars) {
    ellipse(star.x, star.y, star.size);  // Draw each star
  }
}

function draw3DSphere(x, y, radius) {
  let numLayers = 5;  // Number of layers for the sphere
  let layerHeight = radius / numLayers;  // Height of each layer
  
  // Base color that will change over time (using RGB values)
  let time = millis() / 1000;  // Use 500ms (0.5 seconds) for faster cycling
  
  // Use sine and cosine to change the color smoothly over time
  let r = map(sin(time), -1, 1, 100, 255);  // Change red component over time
  let g = map(cos(time), -1, 1, 100, 255);  // Change green component over time
  let b = map(sin(time * 0.5), -1, 1, 100, 255);  // Change blue component over time
  
  for (let i = 0; i < numLayers; i++) {
    let currentRadius = radius - (i * layerHeight);  // Decrease the radius for each layer
    let shadeFactor = map(i, 0, numLayers, 200, 255);  // Adjust brightness per layer (higher opacity)
    
    // Adjust the color for each layer based on time and layer index
    let layerColor = color(r, g, b, shadeFactor);  // Gradual opacity based on shadeFactor

    fill(layerColor);  // Apply the color for the current layer
    noStroke();  // No stroke for smooth circles

    // Draw each layer (circle) to create the illusion of depth
    ellipse(x, y, currentRadius * 2, currentRadius * 2);  // Drawing each layer
    
    // Add "2025" text in the center of the orb
  textAlign(CENTER, CENTER);  // Center the text
  textSize(48);  // Set text size (adjust as needed)
  fill(255);  // White color for the text (you can change this as needed)
  text("2025", x, y);  // Draw the text at the center of the orb
  }
}

/*
function draw3DSphere(x, y, radius) {
  let numLayers = 5;  // Number of layers for the sphere
  let layerHeight = radius / numLayers;  // Height of each layer
  
  // Base color that will change over time (using RGB values)
  let time = millis() / 500;  // Use 2000ms (2 seconds) as the cycle duration
  
  // Use sine and cosine to change the color smoothly over time
  let r = map(sin(time), -1, 1, 100, 255);  // Change red component over time
  let g = map(cos(time), -1, 1, 100, 255);  // Change green component over time
  let b = map(sin(time * 0.5), -1, 1, 100, 255);  // Change blue component over time
  
  for (let i = 0; i < numLayers; i++) {
    let currentRadius = radius - (i * layerHeight);  // Decrease the radius for each layer
    let shadeFactor = map(i, 0, numLayers, 100, 255);  // Adjust brightness per layer
    
    // Adjust the color for each layer based on time and layer index
    let layerColor = color(r, g, b, shadeFactor);

    fill(layerColor);  // Apply the color for the current layer
    noStroke();  // No stroke for smooth circles

    // Draw each layer (circle) to create the illusion of depth
    ellipse(x, y, currentRadius * 2, currentRadius * 2);  // Drawing each layer
  }
}
*/

function drawCustomStackedQuads(x1, y1, x2, y2, x3, y3, x4, y4, numQuads, spacing) {
  // Set stroke and fill
  stroke('yellow');
  strokeWeight(10);
  fill('#1E1E30');

  for (let i = 0; i < numQuads; i++) {
    // Adjust Y-coordinates for the current quad
    let offsetY = i * spacing;
    quad(
      x1, y1 - offsetY, // Bottom-left
      x2, y2 - offsetY, // Bottom-right
      x3, y3 - offsetY, // Top-right
      x4, y4 - offsetY  // Top-left
    );
  }
}

// Draw the moon
function drawMoon() {
  fill("#E6D729");
  noStroke();
  ellipse(550, 50, 200); // Main moon
  fill("#F2E54B");
  ellipse(560, 40, 150);
  fill("#FAED57");
  ellipse(560, 40, 100);
}

// Draw the building
function drawBuilding() {
  
          //Building Sides
  strokeWeight(10);
  stroke("#00008B");
  fill("#1E1E30");       
      //  TL,      TR,        BR,       BL
  quad(100, 400, 300, 500, 300, 1200, 100, 1200)
  quad(300, 500, 500, 400, 500, 1200, 300, 1200)
  
  
          //Roof
  stroke("magenta");
  
  quad(300, 300, 500, 400, 300, 500, 100, 400)//BaseAE ROOF
  
  quad(300, 300, 450, 375, 300, 450, 150, 375)//MID
  
  quad(300, 300, 400, 350, 300, 400, 200, 350)//TOP
  
  line(300, 400, 300, 500)
  
          //Antenna
  stroke("orange");
  line(300, 50, 300, 350)
  ellipse(300, 50, 10, 10)
  
  
  
          //windows
  drawCustomStackedQuads(120, 810, 280, 890, 280, 950, 120, 870, 3, 100);
  drawCustomStackedQuads(320, 890, 480, 810, 480, 870, 320, 950, 3, 100);
  
          //ClockBox
  stroke("#90EE90");
  quad(120, 440, 280, 520, 280, 650, 120, 570)
  quad(320, 520, 480, 440, 480, 570, 320, 650)
  
  
          //Time
  stroke("Red"); 
  strokeWeight(6);
  noFill();

  // Draw "1" Left side
  line(135, 470, 135, 555) // First "1"
  
  // Draw "1" Ride side
  line(335, 535, 335, 615) // First "1"
  
  fill("Red");
  // Draw colon ":" Left Side
  ellipse(187, 520, 2, 4); // Top dot
  ellipse(187, 560, 2, 4); // Bottom dot
  
  // Draw colon ":" Right Side
  ellipse(387, 530, 2, 4); // Top dot
  ellipse(387, 570, 2, 4); // Bottom dot
  
  noFill();
  // Draw "2" Left Side
  line(150, 480, 175, 495);   // Top horizontal
  line(175, 495, 175, 535);  // Top vertical
  line(150, 520, 175, 535); // Middle horizontal
  line(150, 520, 150, 560); // Bottom vertical
  line(150, 560, 175, 575); // Bottom horizontal
  
  // Draw "0 0" Left Side 
  line(200, 505, 225, 520);   // Top horizontal
  line(200, 505, 200, 585);  // left vertical
  line(225, 520, 225, 600); // Right vertical
  line(200, 585, 225, 600); // bottom horizontal
  
  line(240, 525, 265, 540);   // Top horizontal
  line(240, 525, 240, 605);  // left vertical
  line(265, 540, 265, 620); // Right vertical
  line(240, 605, 265, 620); // bottom horizontal
  
  //Draw "2" Right Side
  line(350, 530, 375, 515);   // Top horizontal
  line(375, 515, 375, 555);  // Top vertical
  line(350, 570, 375, 555); // Middle horizontal
  line(350, 570, 350, 610); // Bottom vertical
  line(350, 610, 375, 595); // Bottom horizontal
  
  // Draw "0 0" Right Side 
  line(400, 505, 425, 490);   // Top horizontal
  line(400, 505, 400, 585);  // left vertical
  line(425, 490, 425, 570); // Right vertical
  line(400, 585, 425, 570); // bottom horizontal
  
  line(440, 485, 465, 470);   // Top horizontal
  line(440, 485, 440, 565);  // left vertical
  line(465, 470, 465, 550); // Right vertical
  line(440, 565, 465, 550); // bottom horizontal  
  
}

// Firework class
class Firework {
  constructor(x, y) {
    this.origin = createVector(x, y);  // Position where firework was triggered
    this.particles = [];  // Array of particles for the firework
    this.numParticles = 100;  // Number of particles in the firework
    this.color = color(random(255), random(255), random(255));  // Random color for the firework
    
    // Create particles
    for (let i = 0; i < this.numParticles; i++) {
      this.particles.push(new Particle(this.origin.x, this.origin.y, this.color));
    }
  }

  // Update all the particles
  update() {
    for (let particle of this.particles) {
      particle.update();  // Update each particle
    }
  }

  // Display all the particles
  display() {
    for (let particle of this.particles) {
      particle.display();  // Display each particle
    }
  }

  // Check if all particles have finished
  isFinished() {
    for (let particle of this.particles) {
      if (!particle.isFinished()) {
        return false;
      }
    }
    return true;
  }
}

// Particle class for each firework particle
class Particle {
  constructor(x, y, color) {
    this.position = createVector(x, y);  // Particle starting position
    this.velocity = p5.Vector.random2D();  // Random direction for velocity
    this.velocity.mult(random(2, 6));  // Random speed
    this.acceleration = createVector(0, 0.1);  // Gravity effect to pull particles downwards
    this.lifespan = 255;  // Particle lifespan (how long it lasts)
    this.color = color;  // Particle color
  }

  // Update particle position and apply gravity
  update() {
    this.velocity.add(this.acceleration);  // Apply gravity
    this.position.add(this.velocity);  // Update position
    this.lifespan -= 2;  // Decrease lifespan
  }

  // Display the particle
  display() {
    noStroke();
    fill(this.color.levels[0], this.color.levels[1], this.color.levels[2], this.lifespan);
    ellipse(this.position.x, this.position.y, 5, 5);  // Draw the particle
  }

  // Check if the particle has finished (out of lifespan)
  isFinished() {
    return this.lifespan <= 0;
  }
}

// Trigger fireworks on mouse click
function mousePressed() {
  // Create a new firework at the mouse position
  fireworks.push(new Firework(mouseX, mouseY));
}
  
// Confetti class
class Confetti {
  constructor() {
    let side = random(1) < 0.33 ? "left" : (random(1) < 0.5 ? "right" : "center"); // Randomly choose left, right, or center

    if (side === "left") {
      this.position = createVector(random(0, width / 4), height);  // Spawn from bottom left
      this.velocity = createVector(random(-3, -1), random(-4, -6));  // Move upwards to the left
    } else if (side === "right") {
      this.position = createVector(random(width - width / 4, width), height);  // Spawn from bottom right
      this.velocity = createVector(random(1, 3), random(-4, -6));  // Move upwards to the right
    } else {  // Center
      this.position = createVector(random(width / 4, width - width / 4), height);  // Spawn from center
      this.velocity = createVector(random(-2, 2), random(-4, -6));  // Move upwards
    }

    this.size = random(10, 30);  // Random size for the confetti piece
    this.color = color(random(255), random(255), random(255));  // Random color
    this.lifespan = 255;  // Lifespan (how long it lasts)

    // Randomly choose a shape for the confetti (rect, square, or quad)
    this.shapeType = random(["rect", "square", "quad"]);
  }

  // Update position and lifespan of the confetti
  update() {
    this.position.add(this.velocity);  // Move the confetti
    this.lifespan -= 2;  // Decrease lifespan to simulate fading
  }

  // Display the confetti
  display() {
    fill(this.color.levels[0], this.color.levels[1], this.color.levels[2], this.lifespan);
    
    if (this.shapeType === "rect") {
      // Rectangular shape
      rect(this.position.x, this.position.y, this.size, this.size / 2);  // Rectangle
    } else if (this.shapeType === "square") {
      // Square shape
      rect(this.position.x, this.position.y, this.size, this.size);  // Square
    } else if (this.shapeType === "quad") {
      // Randomly generated quad shape
      beginShape();
      for (let i = 0; i < 4; i++) {
        let xOffset = random(-this.size / 2, this.size / 2);
        let yOffset = random(-this.size / 2, this.size / 2);
        vertex(this.position.x + xOffset, this.position.y + yOffset);
      }
      endShape(CLOSE);  // Create a random quadrilateral
    }
  }

  // Check if the confetti is finished (faded out)
  isFinished() {
    return this.lifespan <= 0 || this.position.y < 0;  // Remove confetti when it fades or moves off the screen
  }
}

// Function to create new confetti particles
function createConfetti(amount) {
  for (let i = 0; i < amount; i++) {
    confetti.push(new Confetti());  // Add a new confetti particle to the array
  }
}
