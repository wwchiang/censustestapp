/*global module:false*/

module.exports = function(grunt) {
  // load all grunt tasks
  require('load-grunt-tasks')(grunt);

  // Project configuration.
  grunt.initConfig({

    clean: ["public"],

    concurrent: {
      dev: {
        tasks: ['shell:nodemon', 'watch', 'browserify:client-dev'],
        options: {
          logConcurrentOutput: true
        }
      }
    },

    copy: {
      html: {
        files: [{
          expand: true,
          flatten: true,
          src: ['client/*.html'],
          dest: 'public/'
        }]
      },
      scripts: {
        files: [{
          expand: true,
          flatten: true,
          src: ['bower_components/**/bootstrap.min.js', 'bower_components/**/jquery.min.js'],
          dest: 'public/scripts/'
        }]
      },
      css: {
        files: [{
          expand: true,
          flatten: true,
          src: ['bower_components/**/bootstrap.min.css'],
          dest: 'public/styles/'
        }]
      }
    },

    shell: {
      nodemon: {
          command: './node_modules/nodemon/bin/nodemon.js --harmony server/index.js'
      }
    },

    browserify: {
      options: {
      },
      vendor: {
        src: [],
        dest: 'public/scripts/vendor.build.js',
        options: {
          require: ["lodash"],
          browserifyOptions: {
            extensions: [".js", ".jsx"],
            debug: true,
            transform: [
              ["babelify", {
                presets: ["es2015"]
              }]
            ]
          }
        }
      },
      "client-dev": {
        src: ['client/scripts/index.js'],
        dest: 'public/scripts/app.build.js',
        options: {
          watch: true,
          keepAlive: true,
          browserifyOptions: {
            extensions: [".js", ".jsx"],
            debug: true,
            transform: [
              ["babelify"]
            ]
          }
        }
      }
    },
    watch: {
      html: {
        files: ['client/index.html'],
        tasks: ['copy:html']
      },
    }
  });

  // Default task.
  grunt.registerTask('default', ['clean', 'copy',
    'browserify:client-dev']);
  grunt.registerTask('build-dev', ['clean', 'copy',
    'browserify:client-dev']);
  grunt.registerTask('dev', ['clean', 'copy', 'concurrent:dev']);

};
