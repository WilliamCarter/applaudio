// Generated on 2014-03-20 using generator-angular 0.7.1
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    // Define the configuration for all the tasks
    grunt.initConfig({

        // Project settings
        yeoman: {
          // configurable paths
          app: require('./bower.json').appPath || 'app',
          dist: '../public'
        },

        // Make sure code styles are up to par and there are no obvious mistakes
        jshint: {
            options : {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: [
                'Gruntfile.js',
                '<%= yeoman.app %>/js/controllers/*.js',
                '<%= yeoman.app %>/js/directives/*.js',
                '<%= yeoman.app %>/js/services/*.js',
                '<%= yeoman.app %>/js/*.js'
            ]
        },

        // Empties folders to start fresh
        clean: {
            dist: {
                options: {
                    force: true
                },
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%= yeoman.dist %>/*',
                        '!<%= yeoman.dist %>/.git*'
                    ]
                }]
            },
            server: '.tmp'
        },

        // Add vendor prefixed styles
        autoprefixer: {
          options: {
            browsers: ['last 2 versions']
          },
          dev: {
            src: "<%= yeoman.app %>/styles/*.css"
          },
          dist: {
            src: "<%= yeoman.dist %>/styles/*.css"
          }
        },

        // Copies remaining files to places other tasks can use
        copy: {
            dist: {
                files: [{
                expand: true,
                dot: true,
                cwd: '<%= yeoman.app %>',
                dest: '<%= yeoman.dist %>',
                src: [
                    '*.{ico,png,txt}',
                    '.htaccess',
                    '*.html',
                    '404/**/*',
                    'views/{,*/}*.html',
                    'bower_components/**/*',
                    'images/{,*/}*.{webp}',
                    'fonts/*'
                ]
                }, {
                    expand: true,
                    cwd: '.tmp/images',
                    dest: '<%= yeoman.dist %>/images',
                    src: ['generated/*']
                }]
            },
            debug: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= yeoman.app %>',
                    dest: '<%= yeoman.dist %>',
                    src: [
                        '*.{ico,png,txt}',
                        '.htaccess',
                        '*.html',
                        '404/**/*',
                        'views/{,*/}*.html',
                        'bower_components/**/*',
                        'images/**/*',
                        'fonts/*',
                        'js/**/*',
                        '.tmp/*',
                        'music/**/*'
                    ]
                    }, {
                        expand: true,
                        cwd: '.tmp/images',
                        dest: '<%= yeoman.dist %>/images',
                        src: ['generated/*']
                    }]
                },
                styles: {
                expand: true,
                cwd: '<%= yeoman.app %>/styles',
                dest: '.tmp/styles/',
                src: '{,*/}*.css'
            },

        },

        sass: {
            dev: {
                options: {
                    style: 'expanded'
                },
                files: [{
                    expand: true,

                    cwd: '<%= yeoman.app %>/styles',
                    src: ['main.scss'],
                    dest: '<%= yeoman.app %>/styles',
                    ext: '.css'
                }]
            },
            dist: {
                files: [{
                    expand: true,

                    cwd: '<%= yeoman.app %>/styles',
                    src: ['*.scss'],
                    dest: '<%= yeoman.dist %>/styles',
                    ext: '.css'
                }]
            },
        },

        // Test settings
        karma: {
          unit: {
            configFile: 'karma.conf.js',
            singleRun: true
          }
        }
    });


    grunt.registerTask('build', [
        'clean:dist',
        'autoprefixer',
        'copy:dist'
    ]);

    grunt.registerTask('dev', [
        'jshint:all',
        'sass:dev',
        'autoprefixer:dev'
    ]);

    grunt.registerTask('default', [
        'dev'
    ]);
};
