#!/usr/bin/env node

const inquirer = require('inquirer');
const chalk = require('chalk');
const figlet = require('figlet');
const parserService = require('./services/parser');
const quandlService = require('./services/quandl');
const reportService = require('./services/report');

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
  try {
    const { inputData }= await getInputData();
    console.log('Entered input: ',inputData);
    const {parsed: parameters} = parserService.cli(inputData);
    const stocks = await quandlService.get(parameters).then(parserService.parseResponseQuandl);
    const report = await reportService.makeReport(stocks);
    console.log(report);
  } catch (e) {
    console.error(e.message);
  }

};

run();