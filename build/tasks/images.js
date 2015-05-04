(function () {
    "use strict";

    var gulp = require('gulp'),
    paths = require('../paths');

    gulp.task('images', function () {
        return gulp.src(paths.img)
                .pipe(gulp.dest(paths.output.img));
    });
})();