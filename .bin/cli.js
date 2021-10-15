#!/usr/bin/env node

'use strict';

const commander = require('commander');
const copyDir   = require('copy-dir');
const execSync  = require('child_process').execSync;
const fs        = require('fs');

// Get global module $PATH
const NODE_MODULES = execSync('npm root -g').toString().trim();

const PACKAGE_NAME = 'nodejs-restful-jsonapi-seed';
const PACKAGE_PATH = `${NODE_MODULES}/${PACKAGE_NAME}`;

// Process CLI options.
commander
  .usage('[options]')

  /* eslint-disable max-len */
  .option('--create <project-name>', 'Create a new seed example project', /^[\w-]+$/g)
  .option('--build',  'Transpile ES6 sources (using Babel) to a distribution')
  .option('--start',  'Launch a single server instance from a transpiled distribution')
  .option('--deploy', 'Launch a server cluster from a transpiled distribution')
  .option('--watch',  'Launch the server (development mode)')
  .option('--lint',   'Run ESLint on project sources')
  .option('--test',   'Run Mocha integration tests')
  .option('--docker', 'Deploy your application as a Docker service')
  .option('--gendoc', 'Generate documentation using ESDoc')
  .option('--env <environment>', 'Set the NODE_ENV (default: development)')
  /* eslint-enable max-len */

  .parse(process.argv);

const NODE_CONFIG_ENV = commander.env || 'development';

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
    printVersion(PACKAGE_PATH);

    commander.outputHelp();
}

/**
 * Create a new project using seed sources.
 *
 * @param {String} name
 *   Output directory name.
 */
function createProject(name) {
  const outDir = process.cwd() + '/' + name;

  if (fs.existsSync(outDir)) {
    console.log(`Cannot create directory \`${name}\`: Project exists`);
    process.exit(1);
  }

  const manifest = `${PACKAGE_PATH}/MANIFEST`;

  if (!fs.existsSync(manifest)) {
    console.log(`Cannot find \`${manifest}\`: node \$PATH conflict?`);
    process.exit(1);
  }

  // Load the package manifest.
  const sources = fs.readFileSync(manifest);

  // Copy the project sources.
  copyDir.sync(PACKAGE_PATH, outDir, {
    filter: function(stat, filepath, filename) {
      if (!sources.includes(filename)) {
        return false;
      }

      return true;
    }
  });

  // Create package.json file.
  const options = getPackageConfig(PACKAGE_PATH);

  const withProps = [
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

  const pkgOpts = {};

  withProps.forEach(function(prop) {
    if (options[prop]) {
      pkgOpts[prop] = options[prop];
    }
  });

  fs.writeFileSync(`${outDir}/package.json`, JSON.stringify(pkgOpts, null, 2));

  console.log(`Project \`${name}\` created in:\n  ${outDir}`);
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
    execSync(`NODE_CONFIG_ENV=${NODE_CONFIG_ENV} npm run ${name}`, {
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

/**
 * Print package version to the console.
 *
 * @param {String} path
 *   Path to file (optional).
 */
function printVersion(path = '.') {
  const version = getPackageConfig(path).version;

  console.log(`${PACKAGE_NAME} (v${version})\n`);
}
