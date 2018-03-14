#!/usr/bin/env node

const prog = require('caporal');
const git = require('simple-git');
const interpolate = require('interpolate');

prog
  .version('1.0.0')
  .command('create', 'Creates a new application from Github bases.')
  .argument('<base>', 'The project <base> to be used, e.g: rails, rails-api, ios, react, etc.')
  .option('--name <name>', 'The <name> of the new project is going to be created.')
  .option('--path <path>', 'Select the <path> of the new project.')
  .action((args, options, logger) => {
    console.log('.::. START TO CLONE THE REPO .::.');

    var option = (function(base) {
      switch (base) {
        case 'rails':
          return 'rails_base';
        case 'rails-api':
          return 'rails_api_base';
        case 'react':
          return 'react-redux-base';
        case 'react-native':
          return 'react-native-base';
        case 'ios':
          return 'ios-base';
        case 'python':
          return 'python-api-base';
        default:
          return '';
      }
    })(args.base);

    let repo = interpolate('https://github.com/rootstrap/{option}', {
      option
    });

    // Destination folder to clone the repo, default: CLI invoked path
    let dst = interpolate('{dir}/{name}', {
      dir: options.path || __dirname,
      name: options.name || option
    });

    git().clone(repo, dst, function(err) {
      console.log('.::. FINISH, HAPPY CODING! .::.');
    });
  });

prog.parse(process.argv);
