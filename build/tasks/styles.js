(function () {
    "use strict";

    var gulp = require('gulp'),
        sass = require('gulp-sass'),
        liveReload = require('gulp-livereload'),
        paths = require('../paths');

    gulp.task('styles', function () {
        return gulp.src(paths.css)
                .pipe(sass())
                .pipe(gulp.dest(paths.output.css))
                .pipe(liveReload());
    });
})();