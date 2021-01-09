const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
const employees = [];

const team = () =>
  inquirer.prompt([
    {
      type: "input",
      message: "What is your name?",
      name: "name",
      validate: (answer) => {
        if (answer !== "") {
          return true;
        }
        return "Please enter a valid name.";
      },
    },
    {
      type: "list",
      message: "What is your role?",
      choices: ["Manager", "Engineer", "Intern"],
      name: "role",
    },
    {
      type: "input",
      message: "What is your email?",
      name: "email",
      validate: (answer) => {
        const email = answer.match(/\S+@\S+\.\S+/);
        if (email) {
          return true;
        }
        return "Please enter a valid email address.";
      },
    },
    {
      type: "input",
      message: "Please provide your id.",
      name: "id",
    },
  ]);

function main() {
  team().then(async (response) => {
    switch (response.role) {
      case "Manager":
        const employeeMgr = await createManager(
          response.name,
          response.id,
          response.email
        );

        employees.push(employeeMgr);

        addAnotherEmployee();
        break;

      case "Engineer":
        const employeeEng = await createEngineer(
          response.name,
          response.id,
          response.email
        );
        employees.push(employeeEng);
        addAnotherEmployee();
        break;

      case "Intern":
        const employeeInt = await createIntern(
          response.name,
          response.id,
          response.email
        );
        employees.push(employeeInt);

        addAnotherEmployee();
        break;
      default:
        break;
    }
  });
}
async function createManager(name, id, email) {
  const response = await inquirer.prompt([
    {
      type: "input",
      message: "What is your office number?",
      name: "officeNumber",
    },
  ]);

  return new Manager(name, id, email, response.officeNumber);
}
async function createEngineer(name, id, email) {
  const response = await inquirer.prompt([
    {
      type: "input",
      message: "What is your Github username?",
      name: "github",
    },
  ]);

  return new Engineer(name, id, email, response.github);
}

async function createIntern(name, id, email) {
  const response = await inquirer.prompt([
    {
      type: "input",
      message: "Where do you attend University?",
      name: "university",
    },
  ]);
  return new Intern(name, id, email, response.university);
}
function addAnotherEmployee() {
  inquirer
    .prompt([
      {
        type: "confirm",
        message: "Would you like to add another employee?",
        name: "addEmployee",
      },
    ])
    .then((response) => {
      if (response.addEmployee) {
        main();
      } else {
        const data = render(employees);
        //fs function
        if (!fs.existsSync(OUTPUT_DIR)) {
          fs.mkdirSync(OUTPUT_DIR);
        }
        fs.writeFile(outputPath, data, (err) => {
          return err ? console.log(err) : console.log("Success!");
        });
      }
    });
}

main();
