#!/usr/bin/env node

'use strict';

let commander = require('commander');
let copydir   = require('copy-dir');
let execSync  = require('child_process').execSync;
let fs        = require('fs');
let path      = require('path');

// Get global modules $PATH
let NODE_MODULES = path.dirname(process.env._) + '/../lib/node_modules';

// Process CLI options.
commander
  .usage('[options]')
  .option('--create [name]', 'Create a new seed project', /^[\w-]+$/gi)
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
    console.log(
      execSync('npm run build', {
        stdio: 'inherit'
      }));
    break;

  case !!commander.start:
    console.log(
      execSync('npm run start', {
        stdio: 'inherit'
      }));
    break;

  case !!commander.deploy:
    console.log(
      execSync('npm run deploy', {
        stdio: 'inherit'
      }));
    break;

  case !!commander.watch:
    console.log(
      execSync('npm run watch', {
        stdio: 'inherit'
      }));
    break;

  case !!commander.lint:
    console.log(
      execSync('npm run lint', {
        stdio: 'inherit'
      }));
    break;

  case !!commander.test:
    console.log(
      execSync('npm run test', {
        stdio: 'inherit'
      }));
    break;

  case !!commander.docker:
    console.log(
      execSync('npm run docker', {
        stdio: 'inherit'
      }));
    break;

  case !!commander.gendoc:
    console.log(
      execSync('npm run gendoc', {
        stdio: 'inherit'
      }));
    break;

  default:
    commander.outputHelp();
}

process.exit(0);

/**
 * Create a new project using package sources.
 *
 * @param {String} dirname
 *   Output directory name.
 */
function createProject(dirname) {
  let basedir = NODE_MODULES + '/nodejs-restful-jsonapi-seed';
  let outdir  = process.cwd() + '/' + dirname;

  // Load the package manifest.
  let sources = fs.readFileSync(`${basedir}/MANIFEST`);

  // Copy the project sources.
  copydir.sync(basedir, outdir, function(stat, filepath, filename) {
    if (sources.includes(filename)) {
      return true;
    }
  });
}
