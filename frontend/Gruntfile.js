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

    grunt.loadNpmTasks('grunt-contrib-jasmine');

    // Define the configuration for all the tasks
    grunt.initConfig({

        // Project settings
        yeoman: {
          // configurable paths
          app: 'app',
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
            }
        },

        // Add browser specific prefixes e.g. -webkit-transform
        autoprefixer: {
          options: {
            browsers: ['last 2 versions']
          },
          default: {
            src: "<%= yeoman.app %>/styles/*.css"
          },
        },

        // Copies remaining files to dist.
        copy: {
            default: {
                files: [{
                expand: true,
                dot: true,
                cwd: '<%= yeoman.app %>',
                dest: '<%= yeoman.dist %>',
                src: [
                    '*.{html, ico, txt}',
                    '.htaccess',
                    '404/**/*',
                    'views/{,*/}*.html',
                    'bower_components/**/*',
                    'js/**/*',
                    'images/**/*',
                    'fonts/*'
                ]
                }, {
                    expand: true,
                    cwd: '.tmp/images',
                    dest: '<%= yeoman.dist %>/images',
                    src: ['generated/*']
                }]
            },
        },

        sass: {
            default: {
                options: {
                    style: 'expanded'
                },
                files: [{
                    expand: true,

                    cwd: '<%= yeoman.app %>',
                    src: ['main.scss'],
                    dest: '<%= yeoman.app %>/styles',
                    ext: '.css'
                }]
            }
        },

        cssmin: {
            default: {
                files: {
                  '<%= yeoman.dist %>/styles/main.css': ['<%= yeoman.app %>/styles/main.css']
                }
            }
        },

        // Test settings
        karma: {
          unit: {
            configFile: 'karma.conf.js'
          },
          dev: {
            configFile: 'karma.conf.js',
            singleRun: false,
            autoWatch: true
          }
        },

    });

    grunt.registerTask('build', [
        'karma:unit',
        'clean:dist',
        'sass',
        'autoprefixer',
        'cssmin',
        'copy'
    ]);

    grunt.registerTask('dev', [
        'jshint:all',
        'sass',
        'autoprefixer'
    ]);

    grunt.registerTask('default', [
        'dev'
    ]);
};
