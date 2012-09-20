module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
		mocha: {
			all: {
			src: 'test/*.js',
			options: {
				globals: ['should'],
				timeout: 3000,
				ignoreLeaks: false,
				// grep: '*-test',
				ui: 'bdd',
				reporter: 'progress'
			}
			}
		},
    lint: {
      all: ['grunt.js', 'app.js', 'test/*.js', 'lib/*.js']
    },
    watch: {
      scripts: {
        files: '<config:lint.all>',
        tasks: 'lint'
      }
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        node: true,
        es5: true,
				laxcomma: true
      },
      globals: {
				describe: true,
				it: true,
				expect: true,
				beforeEach: true
			}
    }
  });
grunt.loadNpmTasks('grunt-simple-mocha');
  // Default task.
  grunt.registerTask('default', 'lint mocha');

};
