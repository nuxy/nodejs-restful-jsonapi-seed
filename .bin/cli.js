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
    execSync('npm run build', {
      stdio: 'inherit'
    });
    break;

  case !!commander.start:
    execSync('npm run start', {
      stdio: 'inherit'
    });
    break;

  case !!commander.deploy:
    execSync('npm run deploy', {
      stdio: 'inherit'
    });
    break;

  case !!commander.watch:
    execSync('npm run watch', {
      stdio: 'inherit'
    });
    break;

  case !!commander.lint:
    execSync('npm run lint', {
      stdio: 'inherit'
    });
    break;

  case !!commander.test:
    execSync('npm run test', {
      stdio: 'inherit'
    });
    break;

  case !!commander.docker:
    execSync('npm run docker', {
      stdio: 'inherit'
    });
    break;

  case !!commander.gendoc:
    execSync('npm run gendoc', {
      stdio: 'inherit'
    });
    break;

  default:
    commander.outputHelp();
}

/**
 * Create a new project using seed sources.
 *
 * @param {String} dirname
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
  let options = JSON.parse(fs.readFileSync(`${srcdir}/package.json`));

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
