const exec = require('child_process').exec;
var CLIEngine = require("eslint").CLIEngine;

var cli = new CLIEngine({
  "env": {
      "browser": true,
      "es2020": true,
      "node": true,
      "es6": true
  },
  "extends": "eslint:recommended",
  "parserOptions": {
      "ecmaVersion": 11,
      "sourceType": "module"
  },
  "rules": {
  },
  "globals": ['$'],
  "ignorePatterns": ["src/lib"]
});

// lint myfile.js and all files in lib/
var report = cli.executeOnFiles(["src"]);
const myShellScript = exec('npm run lint', {stdout: 'inherit'});
myShellScript.stdout.on('data', (data)=>{
    console.log(data); 
    // do whatever you want here with data
});
// myShellScript.stderr.on('data', (data)=>{
//     // console.error(222, data);
// });
myShellScript.stdout.on('close', (data)=>{
  const Table = require('cli-table');
  var colors = require('colors/safe');
  const table = new Table();

  table.push(
      { [colors.yellow('Warnings')]: colors.yellow(report.warningCount) }
    , { [colors.red('Errors')]: colors.red(report.errorCount) }
  );

  console.log(table.toString());
  // do whatever you want here with data
});