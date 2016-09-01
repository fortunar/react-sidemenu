var gulp = require('gulp');
var initGulpTasks = require('react-component-gulp-tasks');
var serve = require('gulp-serve');

var taskConfig = {
  component: {
    file: 'SideMenu.js',
    name: 'SideMenu',
    src: 'src',
    dist: 'dist',
    pkgName: 'react-sidemenu',
    dependencies: ['react'],
    less: {
      entry: 'default.less',
      path: 'less'
    }
  },
  example: {
    src: 'example/src',
    dist: 'example/dist',
    files: [
      'index.html'
    ],
    scripts: [
      'example-custom-click.js',
      'example-custom-render.js',
      'example-no-collapse.js',
      'example-normal.js',
      'example-rtl.js',
    ],
    less: [
      'app.less'
    ]
  }
}

initGulpTasks(gulp, taskConfig);

// for serving the examples on Heroku
gulp.task('serve-prod', serve({
  root: ['example/dist'],
  port: 80
}));
