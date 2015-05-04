(function () {
    "use strict";

    var gulp = require('gulp'),
        del = require('del'),
        vinylPaths = require('vinyl-paths'),
        paths = require('../paths');

    gulp.task('clean', function () {
        return gulp.src([paths.output.dist])
                .pipe(vinylPaths(del));
    });
})();