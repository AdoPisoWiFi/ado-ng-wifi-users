const { task, src, dest, start, series } = require('gulp')
const pkg = require('./bower.json')
const concat = require('gulp-concat')
const ngTemplates = require('gulp-angular-templatecache')
const del = require('del')

const APP_FILES = [
  './src/wifi-users.js',
  './src/wifi-users-service.js',
  './src/edit_customer_time_modal/edit_customer_time_modal.js'
]

function clean() {
  return del([
    'dist'
  ]);
}

function templates() {
  return src('./src/**/*.html')
    .pipe(ngTemplates({
      root: '.',
      module: pkg.name + '.tpls',
      standalone: true
    }))
    .pipe(dest('.tmp'))
}

function build() {

  APP_FILES.unshift('.tmp/**/*.js')

  return src(APP_FILES)
    .pipe(concat(pkg.name + '.js'))
    .pipe(dest('./dist'))
}

task('default', series(clean, templates, build))


