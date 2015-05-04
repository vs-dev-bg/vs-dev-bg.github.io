(function () {
    "use strict";

    var gulp = require('gulp'),
        liveReload = require('gulp-livereload'),
        paths = require('../paths');

    gulp.task('views', function () {
        return gulp.src(paths.views)
                .pipe(gulp.dest(paths.output.dist))
                .pipe(liveReload());
    });
})();