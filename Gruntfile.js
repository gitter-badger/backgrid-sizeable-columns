/*
  backgrid-grouped-columns
  https://github.com/WRidder/backgrid-grouped-columns

  Copyright (c) 2014 Wilbert van de Ridder and contributors
  Licensed under the MIT license.
*/

// jshint globalstrict:true, node:true

"use strict";

module.exports = function (grunt) {

  grunt.initConfig({

    pkg: grunt.file.readJSON("package.json"),

    clean: {
      options: {
        force: true
      },
      api: [
        "api/**/*"
      ],
      "default": [
        "*.min.*",
        "test/coverage/**/*"
      ]
    },
    jasmine: {
      test: {
        version: "1.3.1",
        src: [
          "backgrid-sizeable-columns.js"
        ],
        options: {
          specs: [
            "test/sizeable-columns.js"
          ],
          template: require("grunt-template-jasmine-istanbul"),
          templateOptions: {
            coverage: "test/coverage/coverage.json",
            report: {
              type: "html",
              options: {
                dir: "test/coverage"
              }
            }
          },
          vendor: [
            "test/vendor/js/jquery.js",
            "test/vendor/js/underscore.js",
            "test/vendor/js/backbone.js",
            "test/vendor/js/backgrid.js",
            'test/vendor/js/backbone-pageable.js'
          ]
        }
      }
    },
    jsduck: {
      main: {
        src: ["backgrid-sizeable-columns.js"],
        dest: "api",
        options: {
          "external": ["Backbone.Model,Backbone.Collection,Backbone.View,Backgrid.Grid,Backgrid.Column"],
          "title": "backgrid-sizeable-columns",
          "no-source": true,
          "categories": "categories.json",
          "warnings": "-no_doc",
          "pretty-json": true
        }
      }
    },
    recess: {
      csslint: {
        options: {
          compile: true
        },
        files: {
          "backgrid-sizeable-columns.css": ["backgrid-sizeable-columns.css"]
        }
      },
      "default": {
        options: {
          compress: true
        },
        files: {
          "backgrid-sizeable-columns.min.css": ["backgrid-sizeable-columns.css"]
        }
      }
    },
    uglify: {
      options: {
        mangle: true,
        compress: true,
        preserveComments: "some"
      },
      "default": {
        files: {
          "backgrid-sizeable-columns.min.js": ["backgrid-sizeable-columns.js"]
        }
      }
    }
  });

  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-recess");
  grunt.loadNpmTasks("grunt-jsduck");
  grunt.loadNpmTasks("grunt-contrib-jasmine");

  grunt.registerTask("dist", ["uglify", "recess"]);
  grunt.registerTask("default", ["clean", "jsduck", "dist", "jasmine"]);
};
