var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserify = require('browserify');
var watchify = require('watchify');
var babel = require('babelify');

function compile(watch) {
  var bundler = watchify(
      browserify('./src/js/main.js', { debug: true})
        .transform(
          babel.configure({presets: ["es2015"]})
        )
      );

  function rebundle() {
    bundler.bundle()
      .on('error', function(err) { console.error(err); this.emit('end'); })
      .pipe(source('main.js'))
      .pipe(buffer())
      .pipe(sourcemaps.init({ loadMaps: true }))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest('./build/js'));
  }

  if (watch) {
    bundler.on('update', function() {
      console.log('-> bundling...');
      rebundle();
    });
  }

  rebundle();
}

function watch() {
  return compile(true);
};

gulp.task('build', ['css', 'html', 'semantic'], function() {
  return compile();
});

gulp.task('watch', function() {
  gulp.watch('src/css/**/*.css', ['css']);
  gulp.watch('src/**/*.html', ['html']);
  gulp.watch(['semantic/dist/**/*.js','semantic/dist/**/*.css'], ['semantic']);
  return watch();
});
gulp.task('html',  function() {
  gulp.src('src/index.html').pipe(gulp.dest('./build/'));
});
gulp.task('css',  function() {
  gulp.src('src/css/eclipse.css').pipe(gulp.dest('./build/css'));
});
gulp.task('semantic',  function() {
  gulp.src('semantic/dist/semantic.css').pipe(gulp.dest('./build/css'));
  gulp.src('semantic/dist/semantic.js') .pipe(gulp.dest('./build/js'));
});


gulp.task('clean', function() {
  return del(['build/', 'build/css']);
});

gulp.task('default', ['watch']);
