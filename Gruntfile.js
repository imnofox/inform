module.exports = function(grunt) {
    // Load all grunt tasks
    require('load-grunt-tasks')(grunt);

    // Initialize configuration
    grunt.initConfig({
        coffeelint: {
          app: ['src/**/*.coffee'],
          options: {
            'no_backticks': {
              'level': 'ignore'
            }
          }
        },
        coffee: {
          production: {
            options: {
              bare: true,
              join: true
            },
            src: [
              'src/core/inform.coffee',
              'src/core/**/*.coffee',
              'src/cooperate/**/*.coffee'
            ],
            dest: 'build/inform.js'
          },
          development: {
            options: {
              separator: ';',
              bare: true,
              join: true
            },
            src: [
              'src/core/inform.coffee',
              'src/core/**/*.coffee',
              'src/cooperate/**/*.coffee',
              'src/test/**/*.coffee'
            ],
            dest: 'build/inform.develop.js'
          }
        },
        uglify: {
          production: {
            options: {
                mangle: false,
                banner: '/* inform by @sliceofcode, licensed under MIT license, (c) 2016 sliceofcode | http://github.com/sliceofcode/inform */\n'
            },
            src: 'build/inform.js',
            dest: 'build/inform.min.js'
          },
          development: {
            options: {
              mangle: true,
              banner: '/* inform (dev) by @sliceofcode, licensed under MIT license, (c) 2016 sliceofcode */\n'
            },
            src: 'build/inform.develop.js',
            dest: 'build/inform.develop.min.js'
          }
        },
        'ftp-deploy': {
          build: {
            auth: {
              host: process.env.FTP_PHONE_IP,
              port: process.env.FTP_PHONE_PORT,
              authKey: 'key1'
            },
            src: 'build/',
            dest: '/_Scripts'
          }
        }
    });

    // Register tasks
    grunt.registerTask('default', [
      'coffeelint',
      'coffee:production',
      'uglify:production'
    ]);

    grunt.registerTask('develop', [
      'coffeelint',
      'coffee:development',
      'uglify:development'
    ]);

    grunt.registerTask('ftp', [
      'develop', 'ftp-deploy'
    ]);
};
