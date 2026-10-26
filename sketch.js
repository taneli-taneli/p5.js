
let blockSize = 550;
let cols = 16;
let rows = 16;
let cell;
let pixels = [];

let grassColors = [
  "#42602d",
  "#4d6b32",
  "#385426",
  "#55783a",
  "#607d3c"
];

let dirtColors = [
  "#68432d",
  "#754a30",
  "#855536",
  "#96613b",
  "#a8754b",
  "#5a3929"
];

let stoneColors = [
  "#777b7b",
  "#858989",
  "#686d6d"
];

function setup() {
  createCanvas(blockSize, blockSize);
  cell = blockSize / cols;
  noStroke();
  generateBlock();
}

function generateBlock() {
  pixels = [];

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      let tileColor;

      // Green grass at the top
      if (y < 3) {
        tileColor = random(grassColors);

      // Uneven grass-to-dirt edge
      } else if (y === 3 && random() < 0.55) {
        tileColor = random(grassColors);

      // Brown dirt underneath
      } else {
        tileColor = random(dirtColors);

        // Occasional gray stone tiles
        if (random() < 0.055) {
          tileColor = random(stoneColors);
        }
      }

      pixels.push({
        x: x,
        y: y,
        c: tileColor
      });
    }
  }
}

function draw() {
  background("#30271e");

  for (let p of pixels) {
    // Original grid position
    let x = p.x * cell;
    let y = p.y * cell;

    // Center of each grid square
    let cx = x + cell / 2;
    let cy = y + cell / 2;

    // Distance between cursor and square
    let d = dist(mouseX, mouseY, cx, cy);

    // Squares grow near the cursor
    let growth = map(
      constrain(d, 0, 150),
      140, 0,
      1, 1.9
    );

    // Keep every square centered in its grid cell
    let s = cell * growth;

    // Slightly brighten nearby squares
    let glow = map(
      constrain(d, 0, 140),
      140, 0,
      0, 0.2
    );

    let baseColor = color(p.c);
    let hoverColor = color("#e0bd91");

    fill(lerpColor(baseColor, hoverColor, glow));

    // Draw the expanding square
    rect(
      cx - s / 2,
      cy - s / 2,
      s,
      s
    );
  }
}

// Click to create a new Minecraft texture
function mousePressed() {
  if (
    mouseX >= 0 &&
    mouseX <= width &&
    mouseY >= 0 &&
    mouseY <= height
  ) {
    generateBlock();
  }
}
