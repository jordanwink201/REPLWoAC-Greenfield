/***

  Grunt Tasks

***/

var paths = {

  // Client
  clientPath : 'client/',
  styles : this.clientPath + '/styles',
  scripts : this.clientPath + '/scripts',

  // Server
  serverPath : 'server/'

};

module.exports = function(grunt) {
  grunt.initConfig({

    pkg : grunt.file.readJSON('package.json'),

    // Utilities
    nodemon : {
      dev : {
        script : paths.serverPath + 'server.js'
      }
    },

    // Linting
    jshint : {
      files : [ paths.scripts + '*.js' ]
      // options : {
      //   force : true,
      //   ignores : []
      // }
    },



  });

  /***

    Load Grunt Tasks

  ***/

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-nodemon');

  /***

    Development Grunt Tasks

  ***/

  grunt.registerTask('serve', ['nodemon']);
  grunt.registerTask('test', ['jshint']);

  /***

    Scrum Master Grunt Tasks

  ***/

};