var gulp = require('gulp');
var initGulpTasks = require('react-component-gulp-tasks');
var webserver = require('gulp-webserver');


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
      'example-custom-theme.js',
      'example-active-item.js',
    ],
    less: [
      'app.less'
    ]
  }
}

initGulpTasks(gulp, taskConfig);
gulp.task('server', function() {
    return gulp.src('./example/dist').pipe(webserver({
        host: '0.0.0.0',
        port: process.env.PORT || 8080,
        https: false,
        open: true
    }));
});

gulp.task('copy_favicon', function() {
   gulp.src('./example/src/favicon.ico')
   .pipe(gulp.dest('./example/dist'));
});
