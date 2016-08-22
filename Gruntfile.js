'use strict';

module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  // Project Configuration
  grunt.initConfig({
    exec: {
      appConfig: {
        command: 'node ./util/buildAppConfig.js'
      },
      clean: {
        command: 'rm -Rf bower_components node_modules'
      },
      cordovaclean: {
        command: 'make -C cordova clean'
      },
      android: {
        command: 'make -C cordova android',
      },
      androidrun: {
        command: 'make -C cordova androidrun'
      },
      androidbuild: {
        command: 'cd cordova/project && cordova build android --release'
      },
      androidsign: {
        command: 'rm -f cordova/project/platforms/android/build/outputs/apk/android-release-signed-aligned.apk; jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore ../copay.keystore -signedjar cordova/project/platforms/android/build/outputs/apk/android-release-signed.apk  cordova/project/platforms/android/build/outputs/apk/android-release-unsigned.apk copay_play && ../android-sdk-macosx/build-tools/21.1.1/zipalign -v 4 cordova/project/platforms/android/build/outputs/apk/android-release-signed.apk cordova/project/platforms/android/build/outputs/apk/android-release-signed-aligned.apk ',
        stdin: true
      },
      ios: {
        command: 'make -C cordova ios'
      },
      xcode: {
        command: 'open cordova/project-ios/platforms/ios/*.xcodeproj'
      },
      wp: {
        command: 'make -C cordova wp'
      },
    },
    watch: {
      options: {
        dateFormat: function(time) {
          grunt.log.writeln('The watch finished in ' + time + 'ms at ' + (new Date()).toString());
          grunt.log.writeln('Waiting for more changes...');
        },
      },
      css: {
        files: ['src/css/*.css'],
        tasks: ['concat:css']
      },
      main: {
        files: [
          'src/js/init.js',
          'src/js/app.js',
          'src/js/routes.js',
          'src/js/services/*.js',
          'src/js/controllers/**/*.js'
        ],
        tasks: ['concat:js']
      }
    },
    concat: {
      options: {
        sourceMap: false,
        sourceMapStyle: 'link' // embed, link, inline
      },
      angular: {
        src: [
					'bower_components/angular/angular.min.js',
          'bower_components/angular-ui-router/release/angular-ui-router.min.js',
          'bower_components/angular-bootstrap/ui-bootstrap.min.js',
					'bower_components/jquery/dist/jquery.min.js',
					'bower_components/bootstrap/dist/js/bootstrap.min.js',
          'angular-bitpay-public-client/angular-bitpay-public-client.js'
        ],
        dest: 'public/lib/angular.js'
      },
      topUpService: {
        src: [
          // Insert source reference for your top-up service here
        ],
        dest: 'public/lib/topUpService.js'
      },
      bootstrap: {
        src: [
          'bower_components/bootstrap/dist/css/bootstrap.css',
          'bower_components/fontawesome/css/font-awesome.css',
        ],
        dest: 'public/css/bootstrap.css',
      },
      components: {
        src: [
          'bower_components/ng-lodash/build/ng-lodash.min.js'
        ],
        dest: 'public/lib/components.js'
      },
      js: {
        src: [
          'src/js/app.js',
          'src/js/routes.js',
          'src/js/directives/*.js',
          'src/js/filters/*.js',
          'src/js/model/*.js',
          'src/js/services/*.js',
          'src/js/services/providers/*.js',
          'src/js/controllers/*.js',
          'src/js/appConfig.js',
          'src/js/init.js'
        ],
        dest: 'public/js/topUpApp.js'
      },
      css: {
        src: ['src/css/*.css'],
        dest: 'public/css/topUpApp.css'
      }
    },
    copy: {
      fonts: {
        expand: true,
        flatten: true,
        src: 'bower_components/fontawesome/fonts/*',
        dest: 'public/fonts/'
      }
    },
    browserify: {
      dist: {
        files: {
          'angular-bitpay-public-client/angular-bitpay-public-client.js': ['angular-bitpay-public-client/index.js']
        },
      }
    }
  });
  
  grunt.registerTask('default', ['browserify', 'exec:appConfig', 'concat', 'copy']);
  grunt.registerTask('prod', ['default', 'uglify']);
  grunt.registerTask('cordovaclean', ['exec:cordovaclean']);

  grunt.registerTask('android', ['prod', 'exec:android']);
  grunt.registerTask('android-debug', ['default', 'exec:android', 'exec:androidrun']);
  grunt.registerTask('android-release', ['prod', 'exec:android', 'exec:androidsign']);
  grunt.registerTask('ios', ['prod', 'exec:ios', 'exec:xcode']);
  grunt.registerTask('ios-debug', ['default', 'exec:ios', 'exec:xcode']);
  grunt.registerTask('wp', ['prod', 'exec:wp']);
  grunt.registerTask('wp-debug', ['default', 'exec:wp']);
};
