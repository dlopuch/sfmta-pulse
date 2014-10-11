module.exports = function(grunt) {

  // Add Bower javascript dependencies to concatenate and minify into dist/js/libs.js
  var BOWER_JS_LIBS = [
    './bower_components/jquery/dist/jquery.min.js',
    './bower_components/bootstrap/dist/js/bootstrap.js',
    './bower_components/d3/d3.min.js',
    './bower_components/lodash/dist/lodash.min.js'
  ];

  var DEV_HTTP_PORT = 8000;

  require('time-grunt')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('./package.json'),

    assemble: {
      options: {
        // specified main template
        layoutdir: './src/templates/layouts/',

        partials:  './src/templates/partials/**/*.hbs',

        helpers: [
          // load all helpers from `handlebars-helpers` npm module
          //'handlebars-helpers/**/helpers-*.js',
          'src/helpers/**/*.js'
        ]
      },

      pages: {
        options: {
          layout: 'index.hbs'
        },
        files: [
          {
            cwd: './src/content/_pages/',
            dest: './dist/',
            expand: true,
            src: ['**/*.hbs', '**/*.md']
          }
        ]
      }
    },


    // less -- css preparser, builds Bootstrap (brought in via Bower and style.less)
    // less:development just compiles less, less:production minifies it
    less: {
      development: {
        files: {
          "./dist/css/style.css": ["./src/css/style.less"]
        }
      },
      production: {
        options: {
          cleancss: true, //minifies the result
          modifyVars: {
            // eg:
            //imgPath: '"http://mycdn.com/path/to/images"',
            //bgColor: 'red'
          }
        },
        files: {
          "./dist/css/style.min.css": ["./src/css/style.less"]
        }
      }
    },

    // dev-dependency: Lint all JavaScript
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      files: [
        'Gruntfile.js',
        'src/**/*.js',
      ]
    },

    // concatenate all javascript together
    concat: {
      options: {
        separator: ';\n'
      },
      js_libs: {
        src: BOWER_JS_LIBS,
        dest: './dist/js/libs.js'
      }
    },

    uglify: {
      options: {
        mangle: false  // Use if you want the names of your functions and variables unchanged
      },
      js_libs: {
        src:  './dist/js/libs.js',
        dest: './dist/js/libs.js'
      }
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
        tasks: ['assemble:pages'],
        options: {
          port: DEV_HTTP_PORT,
        },
      },
      css: {
        files: [
          'src/css/**/*.css',
          'src/css/**/*.less'
        ],
        tasks: ['less:development']
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
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-express');
  grunt.loadNpmTasks('grunt-open');

  /* grunt tasks */
  grunt.registerTask('start', ['default', 'open']);
  grunt.registerTask('build_js', ['jshint', 'concat:js_libs']);
  grunt.registerTask('default', [
    'build_js',
    'less:development',
    'assemble',
    'express',
    'watch'
  ]);

};