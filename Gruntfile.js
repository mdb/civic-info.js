module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    simplemocha: {
      all: {
        src: 'test/**/*.js'
      }
    },
    jshint: {
      gruntfile: {
        src: 'Gruntfile.js'
      },
      lib: {
        src: ['lib/**/*.js']
      },
      test: {
        src: ['test/**/*.js']
      }
    },
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      lib: {
        files: '<%= jshint.lib.src %>',
        tasks: ['jshint:lib', 'simplemocha']
      },
      test: {
        files: '<%= jshint.test.src %>',
        tasks: ['jshint:test', 'simplemocha']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-simple-mocha');

  // Default task.
  grunt.registerTask('default', ['jshint', 'simplemocha']);
};
