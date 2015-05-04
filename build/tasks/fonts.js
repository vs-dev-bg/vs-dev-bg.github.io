(function () {
    "use strict";

    var gulp = require('gulp'),
    paths = require('../paths');

    gulp.task('fonts', function () {
        return gulp.src(paths.fonts)
                .pipe(gulp.dest(paths.output.fonts));
    });
})();