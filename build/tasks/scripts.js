(function () {
    "use strict";

    var gulp = require('gulp'),
        uglify = require('gulp-uglify'),
        liveReload = require('gulp-livereload'),
        paths = require('../paths');

    gulp.task('scripts', function () {
        return gulp.src(paths.scripts)
                .pipe(uglify())
                .pipe(gulp.dest(paths.output.js))
                .pipe(liveReload());
    });
})();