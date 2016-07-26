var gulp = require('gulp');
var initGulpTasks = require('react-component-gulp-tasks');

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
      'app.js'
    ],
    less: [
      'app.less'
    ]
  }
}

initGulpTasks(gulp, taskConfig);
