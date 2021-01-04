// TODO: Write code to define and export the Employee class
class Employee {
  constructor(name, role, email) {
    this.name = name;
    this.role = role;
    this.email = email;
  }

  getName() {
    return this.name;
  }
  getId() {
    return this.role;
  }
  getEmail() {
    return this.email;
  }
  getRole() {
    return "Employee";
  }
}

module.exports = Employee;
