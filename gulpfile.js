var gulp = require('gulp'),
    less = require('gulp-less'),
    jade = require('gulp-jade'),
    groupMedia = require('gulp-group-css-media-queries'),
    autoprefixer = require('gulp-autoprefixer'),
    cleanCSS = require('gulp-clean-css'),
    imagemin = require('gulp-imagemin'),
    rename = require("gulp-rename"),
    browserSync = require("browser-sync").create(),
    notify = require("gulp-notify");


gulp.task( 'browser', function() {
    browserSync.init({
        server: {
            baseDir: 'dist/'
        }
    });
});

gulp.task('imageMIN', function() {
    return gulp.src( 'src/images/*.{png,jpg,jpeg,svg}' )
        .pipe(imagemin())
        .pipe(gulp.dest( 'dist/images/' ))
        .pipe(notify('Images Compress Success!'));
});


gulp.task('CSS', function() {
    return gulp.src( 'src/styles/style.less' )
        .pipe(less())
        .pipe(groupMedia())
        .pipe(autoprefixer({browsers: ['last 5 versions', '> 2%']}))
        .pipe(gulp.dest( 'dist/styles/' ))
        .pipe(cleanCSS())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest( 'dist/styles/' ))
        .pipe(notify('CSS Success!'));
});


gulp.task('watch_CSS', ['browser'], function() {
    gulp.watch('src/styles/*.less', ['CSS']);
    gulp.watch('src/styles/*.less').on('change', browserSync.reload)
});


gulp.task('watch_imageMIN', function() {
    gulp.watch('src/images/*.{png,jpg,jpeg,svg}', ['imageMIN']);
    gulp.watch('src/images/*.{png,jpg,jpeg,svg}').on('change', browserSync.reload)
});

gulp.task('watch_JADE', ['browser'], function() {
    gulp.watch('src/*.jade', ['jade']);
    gulp.watch('src/*.jade').on('change', browserSync.reload)
});

gulp.task('jade', function() {
    return gulp.src( 'src/index.jade' )
        .pipe(jade())
        .pipe(gulp.dest( 'dist/' ));
});



gulp.task('default', ['CSS', 'jade', 'watch_JADE', 'watch_CSS', 'imageMIN']);
gulp.task('images', ['imageMIN', 'watch_imageMIN']);