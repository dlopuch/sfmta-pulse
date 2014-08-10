module.exports = function(grunt) {

  var DEV_HTTP_PORT = 8000;

  require('time-grunt')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('./package.json'),

    assemble: {
      options: {
        // specified main template
        layout: 'page.hbs',
        layoutdir: './src/templates/layouts/',

        partials:  './src/templates/partials/**/*.hbs',

        helpers: [
          // load all helpers from `handlebars-helpers` npm module
          //'handlebars-helpers/**/helpers-*.js',
          'src/helpers/**/*.js'
        ]
      },

      // assemble content: build everything in content/
      content: {
        files: [
          {
            cwd: './src/content/',
            dest: './dist/',
            expand: true,
            src: ['**/*.hbs', '**/*.md', '!_pages/**/*.hbs'] // skips content/_pages/, which is handled separately below
          }, {
            cwd: './src/content/_pages/',
            dest: './dist/',
            expand: true,
            src: '**/*.hbs'
          }
        ]
      }
    },

    /**
     * Lint all JavaScript
     */
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      files: [
        'Gruntfile.js',
        'src/**/*.js',
      ]
    },


    // dev-dependency: serve pages locally (uses grunt-watch's livereload to reload js inline)
    express: {
      dev: {
        options: {
          port: DEV_HTTP_PORT,
          bases: ['dist/'],
          livereload: true
        }
      }
    },

    // dev-dependency: grunt-watch looks for changes to files and automatically causes an appropriate re-assemble,
    //                 which is then automatically re-served using grunt-express.
    watch: {
      // watch for changes on 'assemble:content' task
      content: {
        files: [
          'src/helpers/**/*.js',
          'src/templates/**/*.hbs',
          'src/content/**/*.hbs',
          'src/content/**/*.md'
        ],
        tasks: ['assemble:content'],
        options: {
          port: DEV_HTTP_PORT,
        },
      },
      livereload: {
        // Here we watch the files the assemble task will compile to
        // These files are sent to the live reload server after assemble builds to them
        options: { livereload: true },
        files: ['dist/**/*'],
      },
    },

    // dev-dependency: conveniently opens a browser to the live-reloaded site
    // TODO: not quite working with `grunt start`?
    open: {
      all: {
        path: 'http://localhost:' + DEV_HTTP_PORT
      }
    }
  });

  /* load every plugin in package.json */
  grunt.loadNpmTasks('assemble');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-express');
  grunt.loadNpmTasks('grunt-open');

  /* grunt tasks */
  grunt.registerTask('default', [
    'jshint',
    'assemble',
    'express',
    'watch'
  ]);
  grunt.registerTask('start', ['default', 'open']);

};