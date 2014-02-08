module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    jshint: {

      files: ['lib/*.js', 'test/specs/*.js']
    },

    mochacli: {

        options: {

            reporter: 'nyan',
            bail: true
        },
        files: ['test/specs/*.js']
    },

    complexity: {

        generic: {

            src: ['lib/*.js'],
            options: {

                /*
                  @errorsOnly - show only maintainabilty errors
                  @cycolmatic - typical acceptance is a value of 4 (lower is better)
                  @halstead - typcial acceptance is 10, (lower is better)
                  @maintainability - typical acceptance is ~70. Higher is better, 171 max
                */
                errorsOnly: false,
                cyclomatic: 3,
                halstead: 10,
                maintainability: 100
            }
        },
    },

    plato: {

      dev: {

        options : {

          jshint : false
        },
        files: {

          'reports': ['lib/*.js']
        },
      },
    }
  });

  // Load Grunt Tasks
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-mocha-cli');
  grunt.loadNpmTasks('grunt-complexity');
  grunt.loadNpmTasks('grunt-plato');

  // Defined task(s).
  grunt.registerTask('default', ['jshint', 'mochacli', 'complexity']);
  grunt.registerTask('dev', ['jshint', 'mochacli', 'complexity', 'plato:dev']);
  grunt.registerTask('report', ['plato:dev']);
};