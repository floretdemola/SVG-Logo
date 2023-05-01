const inquirer = require('inquirer');
const fs = require('fs');

// Define the available shapes
const { Triangle, Square, Circle } = require("./lib/shapes");

function writeToFile(fileName, answers) {
    let svgString = "";
    svgString =
      '<svg version="1.1" width="300" height="200" xmlns="http://www.w3.org/2000/svg">';
    svgString += "<g>";
    svgString += `${answers.shape}`;
  
    let shapeChoice;
    if (answers.shape === "Triangle") {
      shapeChoice = new Triangle();
      svgString += `<polygon points="150, 18 244, 182 56, 182" fill="${answers.shapeBackgroundColor}"/>`;
    } else if (answers.shape === "Square") {
      shapeChoice = new Square();
      svgString += `<rect x="73" y="40" width="160" height="160" fill="${answers.shapeBackgroundColor}"/>`;
    } else {
      shapeChoice = new Circle();
      svgString += `<circle cx="150" cy="115" r="80" fill="${answers.shapeBackgroundColor}"/>`;
    }
  

    svgString += `<text x="150" y="130" text-anchor="middle" font-size="40" fill="${answers.textColor}">${answers.text}</text>`;
    svgString += "</g>";
    svgString += "</svg>";
  
    
    fs.writeFile(fileName, svgString, (err) => {
      err ? console.log(err) : console.log("Generated logo.svg");
    });
  }
// Prompt the user for input
function promptUser() {
    inquirer
    .prompt([
        {
        type: 'input',
        name: 'text',
        message: 'Enter up to three characters for the logo:',
        },
        {
        type: 'input',
        name: 'textColor',
        message: 'Enter a color keyword or hexadecimal number for the text:',
        },
        {
        type: 'list',
        name: 'shape',
        message: 'Choose a shape for the logo:',
        choices: ["Triangle", "Square", "Circle"],
        },
        {
        type: 'input',
        name: 'shapeBackgroundColor',
        message: 'Enter a color keyword or hexadecimal number for the background color:',
        },
    ])
    .then((answers) => {
        if (answers.text.length > 3) {
            console.log("Must enter a value of no more than 3 characters");
            promptUser();
        } else {
            writeToFile("logo.svg", answers);
        }

        // Print a success message
        console.log('Generated logo.svg');
    });
}
  promptUser();