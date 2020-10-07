// Code that shows all required classes, as well as inquirer, path, and fs
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

// Creates a new array labeled employees which starts off blank
const employees = []

// Defines output directory, output path, and render function
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");
const render = require("./lib/htmlRenderer");


// Function that uses inquirer to ask the user what kind of employee they want to add, and calls functions depending on their choices
function generateEmployee() {
    inquirer.prompt({
        type: "list",
        name: "choice",
        message: "Which type of employee would you like to add?",
        choices: ["Manager", "Intern", "Engineer", "All done"]
    })
    .then(function ({ choice }) {
        switch (choice) {
            case "Manager":
                // If they select Manager, generates a new manager
                generateManager();
                break;

            case "Engineer":
                // If they select Engineer, it generates a new engineer
                generateEngineer();
                break;

            case "Intern":
                // If they select Intern, it generates a new intern
                generateIntern();
                break;
            
            case "All done":
                // If there are no employees in the array, the generator will tell them to add an employee before generating the profile
                if (!employees.length) {
                    console.log("You must add information for at least one employee in order to generate your profile.")
                    generateEmployee()
                } else {
                    // If there are employees, the generator uses the render function to convert it to HTML
                    const rendered = render(employees);
                    // Then, it writes a team.html file using the outputPath variable
                    fs.writeFile(outputPath, rendered, function(err) {
                    if (err) return console.log(err)
                    })
                    console.log("Your team profile has been written to team.html in the output folder. Thank you for using the Employee Profile Generator!")
                        };
                    break;
        }
    })
}

// Function that prompts the user to input the information with inquirer, and then creates a new Manager object with their answers
function generateManager() {
    inquirer.prompt([
    {
        type: "input",
        name: "name",
        message: "What is the employee's name?"
    },

    {
        type: "input",
        name: "id",
        message: "What is the employee's ID?"
    },

    {
        type: "input",
        name: "email",
        message: "What is the employee's e-mail address?"
    },

    {
        type: "input",
        name: "officenumber",
        message: "What is the employee's office number?"
    }
])

.then (function(answers) {
    const newManager = new Manager(answers.name, answers.id, answers.email, answers.officenumber);
    employees.push(newManager);
    console.log(`${answers.name} the Manager has been added to your list of employees.`)
    generateEmployee()
}
)}

// Function that prompts the user to input the information with inquirer, and then creates a new Engineer object with their answers
function generateEngineer() {
    inquirer.prompt([
    {
        type: "input",
        name: "name",
        message: "What is the employee's name?"
    },

    {
        type: "input",
        name: "id",
        message: "What is the employee's ID?"
    },

    {
        type: "input",
        name: "email",
        message: "What is the employee's e-mail address?"
    },

    {
        type: "input",
        name: "github",
        message: "What is the employee's GitHub username?"
    }
])
.then (function(answers) {
    const newEngineer = new Engineer(answers.name, answers.id, answers.email, answers.github);
    employees.push(newEngineer);
    console.log(`${answers.name} the Engineer has been added to your list of employees.`)
    generateEmployee()
}
)}

// Function that prompts the user to input the information with inquirer, and then creates a new Intern object with their answers
function generateIntern() {
    inquirer.prompt([
    {
        type: "input",
        name: "name",
        message: "What is the employee's name?"
    },

    {
        type: "input",
        name: "id",
        message: "What is the employee's ID?"
    },

    {
        type: "input",
        name: "email",
        message: "What is the employee's e-mail address?"
    },

    {
        type: "input",
        name: "school",
        message: "What school does this employee attend?"
    }
])
.then (function(answers) {
    const newIntern = new Intern(answers.name, answers.id, answers.email, answers.school);
    employees.push(newIntern);
    console.log(`${answers.name} the Intern has been added to your list of employees.`);
    generateEmployee()
}
)}

// calls the generateEmployee function as soon as the user runs the program
console.log("Welcome to the Employee Profile Generator.")
generateEmployee()
