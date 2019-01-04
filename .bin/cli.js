#!/usr/bin/env node

'use strict';

let commander = require('commander');
let copydir   = require('copy-dir');
let execSync  = require('child_process').execSync;
let fs        = require('fs');
let path      = require('path');

// Get global module $PATH
let NODE_MODULES = path.dirname(process.env._) + '/../lib/node_modules';

// Process CLI options.
commander
  .usage('[options]')
  .option('--create [project-name]', 'Create a new seed project', /^[\w-]+$/g)
  .option('--build',  'Compile sources (using Babel) to a distribution')
  .option('--start',  'Launch a single server from a compiled distribution')
  .option('--deploy', 'Launch a server cluster from a compiled distribution')
  .option('--watch',  'Launch the server (development mode)')
  .option('--lint',   'Run ESLint on project sources')
  .option('--test',   'Run Mocha integration tests')
  .option('--docker', 'Deploy your application as a Docker service')
  .option('--gendoc', 'Generate documentation using ESDoc')
  .parse(process.argv);

switch (true) {
  case !!commander.create:
    createProject(commander.create);
    break;

  case !!commander.build:
    runCommand('build');
    break;

  case !!commander.start:
    runCommand('start');
    break;

  case !!commander.deploy:
    runCommand('deploy');
    break;

  case !!commander.watch:
    runCommand('watch');
    break;

  case !!commander.lint:
    runCommand('lint');
    break;

  case !!commander.test:
    runCommand('test');
    break;

  case !!commander.docker:
    runCommand('docker');
    break;

  case !!commander.gendoc:
    runCommand('gendoc');
    break;

  default:
    commander.outputHelp();
}

/**
 * Create a new project using seed sources.
 *
 * @param {String} name
 *   Output directory name.
 */
function createProject(name) {
  let srcdir = `${NODE_MODULES}/nodejs-restful-jsonapi-seed`;

  let outdir = process.cwd() + '/' + name;

  if (fs.existsSync(outdir)) {
    console.log(`Cannot create directory \`${name}\`: Project exists`);
    process.exit(1);
  }

  // Load the package manifest.
  let sources = fs.readFileSync(`${srcdir}/MANIFEST`);

  // Copy the project sources.
  copydir.sync(srcdir, outdir, function (stat, filepath, filename) {
    if (sources.includes(filename)) {
      return true;
    }
  });

  // Create package.json file.
  let options = getPackageConfig(srcdir);

  let withProps = [
    'name',
    'version',
    'description',
    'main',
    'scripts',
    'keywords',
    'author',
    'dependencies',
    'devDependencies',
    'engines'
  ];

  let pkgOpts = {};

  withProps.forEach(function(prop) {
    if (options[prop]) {
      pkgOpts[prop] = options[prop];
    }
  });

  fs.writeFileSync(`${outdir}/package.json`, JSON.stringify(pkgOpts, null, 2));

  console.log(`Project \`${name}\` created in:\n  ${outdir}`);
}

/**
 * Execute an NPM run-script by name.
 *
 * @param {String} name
 *   NPM command value.
 */
function runCommand(name) {

  // Install NPM dependencies (first-run).
  if (!fs.existsSync('node_modules')) {
    console.log('Missing package dependencies. Installing...');

    execSync('npm install --silent');
  }

  // Execute the NPM script.
  if (getPackageConfig().scripts[name]) {
    execSync(`npm run ${name}`, {
      stdio: 'inherit'
    });
  } else {
    console.log(`Cannot run script \`${name}\`: Invalid project`);
    process.exit(1);
  }
}

/**
 * Return package.json as object for a given path.
 *
 * @param {String} path
 *   Path to file (optional).
 *
 * @return {Object}
 */
function getPackageConfig(path = '.') {
  return JSON.parse(fs.readFileSync(`${path}/package.json`).toString());
}
