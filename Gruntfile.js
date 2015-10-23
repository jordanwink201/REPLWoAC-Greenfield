/***

  Grunt Tasks

***/

var paths = {

  // Client
  clientPath : 'client/',
  styles : this.clientPath + 'styles/',
  scripts : this.clientPath + 'scripts/',

  // Server
  serverPath : 'server/',

  // Build
  distPath : 'dist/'

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
      files : [ 'client/scripts/*.js' ],
      options : {
        force : true,
        ignores : []
      }
    },

    // Testing


    // 
    concat : {
      dist : {
        src : 'client/scripts/**/*.js',
        dest : 'client/production.js'
      }
    },

    uglify : {
      build : {
        src : 'client/production.js',
        dest : 'client/production.min.js'
      }
    },

    sass : {
      dist : {
        options : {
          style : 'compressed' // or 'expanded'
        },
        files : {
          'client/styles/main.css' : 'client/styles/main.scss'
        }
      }
    },

    copy : { // copy 
      files : {
        expand: true,
        cwd: 'client/',
        src : ['scripts/production.min.js', 'styles/main.css', 'styles/main.css.map', 'index.html'],
        dest : 'dist/'
      }
    },

    watch : {
      options : {
        livereload : true // must include the livereload.js file
      },
      scripts : {
        files : ['client/scripts/**/*.js'],
        tasks : ['jshint', 'concat'] // add test
      },
      css : {
        files : ['client/styles/**/*.scss'],
        tasks : ['sass']
      }
    },

    clean : {
      build : ['client/styles/main.css.map'],
    },

  });

  /***

    Load Grunt Tasks

  ***/

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-nodemon');

  /***

    Development Grunt Tasks

  ***/

  grunt.registerTask('serve', ['nodemon']);

  // Test
  // grunt.registerTask('test', ['jshint']);

  grunt.registerTask('watcher', ['watch']);

  /***

    Scrum Master Grunt Tasks

  ***/

  // grunt.registerTask('build', ['jshint', 'concat', 'uglify', 'sass', 'copy', 'clean']);

  grunt.registerTask('build', ['jshint', 'concat', 'uglify', 'copy', 'clean']);

};