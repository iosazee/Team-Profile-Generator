const Employee = require("./lib/Employee");
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs/promises");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");


// TODO: Write Code to gather information about the development team members, and render the HTML file.


let team = []

const init = async () => {

    const questions = [

        {
            type: 'input',
            name: 'name',
            message: "Welcome to the team profile generator. Begin your team selection by entering team manager's name:\n",
        },

        {
            type: 'input',
            name: 'identification',
            message: "Enter team manager's ID:",
        },

        {
            type: 'input',
            name: 'email',
            message: "Enter team manager's email:",
        },

        {
            type: 'input',
            name: 'telNo',
            message: "Enter team manager's office Number:",
        },

    ]

    let resp = await inquirer
        .prompt(questions)
        team.push(new Manager(resp.name, resp.identification, resp.email, resp.telNo))
        next()

}

const next = async () => {
    const questions = [

        {
            type: 'list',
            name: 'option',
            message: "Select a team member to add to your team or exit by choosing 'Finish building the team'\n",
            choices: ["Add an engineer", "Add an intern", "Finish building the team"],
        },
    ]

    let resp = await inquirer
        .prompt(questions)
        if (resp.option.includes("engineer")) {
            addEngr()
        }
        else if(resp.option.includes("intern")) {
            addIntern()
        }
        else {
            createTemplate()
            console.log("Exit Program")
        }
}

const addEngr = async() => {

    const questions = [

        {
            type: 'input',
            name: 'name',
            message: 'Enter the name of your engineer:'
        },

        {
            type: 'input',
            name: 'identification',
            message: 'Enter the ID of your engineer: '
        },

        {
            type: 'input',
            name: 'email',
            message: 'Enter the email of your engineer: '
        },

        {
            type: 'input',
            name: 'github',
            message: "Enter the github's username of your engineer: "
        },
    ]

    let resp = await inquirer
        .prompt(questions)
        team.push(new Engineer(resp.name, resp.identification, resp.email, resp.github))
        next()
}


const addIntern = async() => {

    const questions = [
        {
            type: 'input',
            name: 'name',
            message: 'Enter the name of your intern:'
        },

        {
            type: 'input',
            name: 'ID',
            message: 'Enter the ID of your intern:'
        },

        {
            type: 'input',
            name: 'email',
            message: 'Enter the email address for your intern:'
        },

        {
            type: 'input',
            name: 'school',
            message: 'Enter the school your intern attends:'
        },
    ]

    let resp = await inquirer
        .prompt(questions)
        team.push(new Intern(resp.name, resp.ID, resp.email, resp.school))
        next()
}


const writeToFile =  async (filename, data, msg) => {
    msg = ''
    await fs.writeFile(filename, data, (err, msg) =>
    err ? console.error(err) : console.log(msg))

  }


const createTemplate = () => {

    const htmlDocument = render(team)

    console.log('Generating HTML document...')

    writeToFile(outputPath, htmlDocument, 'Generating HTML document..')


}



init();



