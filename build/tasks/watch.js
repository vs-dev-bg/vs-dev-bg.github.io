(function () {
    "use strict";

    var gulp = require('gulp'),
        liveReload = require('gulp-livereload'),
        paths = require('../paths');

    gulp.task('watch', function () {
        liveReload.listen();

        gulp.watch(paths.scripts, ['scripts']);
        gulp.watch(paths.views, ['views']);
        gulp.watch(paths.scss, ['styles']);
    });

    gulp.task('default', ['watch'], function () {
    });
})();