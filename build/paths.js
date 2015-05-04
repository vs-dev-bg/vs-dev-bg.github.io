var appRoot = 'src/',
    dist = 'dist/';

module.exports = {
    root: appRoot,
    scripts: appRoot + 'js/**/*.js',
    views: appRoot + '**/*.html',
    img: appRoot + 'img/**/**',
    fonts: appRoot + 'fonts/**/**',
    scss: appRoot + 'sass/**/*.scss',
    css: appRoot + 'sass/styles.scss',
    output: {
        dist: dist,
        js: dist + 'js/',
        css: dist + 'css/',
        img: dist + 'img/',
        fonts: dist + 'fonts/'
    }
};