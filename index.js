#!/usr/bin/env node

const inquirer = require('inquirer');
const chalk = require('chalk');
const figlet = require('figlet');

const init = () => {
  console.log(
    chalk.green(
      figlet.textSync('Welcome to stock analysis tool')
    )
  );
};

const getInputData = () => {
  const data = [
    {
      name: 'inputData',
      type: 'input',
      message: 'Please insert data:'
    }
  ];
  return inquirer.prompt(data);
};

const run = async () => {
  init();
  const { inputData }= await getInputData();
  console.log('Entered input: ',inputData);
};

run();