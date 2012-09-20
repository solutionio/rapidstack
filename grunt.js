module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    lint: {
      all: ['grunt.js', 'app.js', 'test/*.js']
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
				it: true
			}
    }
  });

  // Default task.
  grunt.registerTask('default', 'lint');

};
