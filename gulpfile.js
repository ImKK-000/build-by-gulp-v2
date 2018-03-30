const gulp = require('gulp')
const babel = require('gulp-babel')
const del = require('del')

const paths = {
  src: 'src/**/*.js',
  dest: 'lib'
}

gulp.task('clean', function() {
  const { dest } = paths
  return del(dest)
})

gulp.task('babel', function() {
  const { src, dest } = paths
  return gulp
    .src(src)
    .pipe(
      babel({
        presets: ['env'],
        sourceMaps: true
      })
    )
    .on('error', function(error) {
      console.log(error)
    })
    .pipe(gulp.dest(dest))
})

const tasks = ['clean', 'babel']

gulp.task('watch', function() {
  const { src } = paths
  gulp.watch(src, gulp.series(tasks))
})

gulp.task('default', gulp.series([...tasks, 'watch']))
