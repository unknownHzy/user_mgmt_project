const gulp = require('gulp');
const mocha = require('gulp-mocha');

const mochaConfig = Object.freeze({
    //将mocha的 command-line options（http://mochajs.org/#usage） 通过key:value引入
    recursive: true,  //递归
    ui: 'tdd',
    require: 'mochaCompiler', //在ut开始之前引入mochaCompiler
    reporter: 'spec' //default spec
});

gulp.task('default', function () {
    console.log('callback of default gulp task');
});

gulp.task('mocha', function () {
    return gulp.src(['test/*.js'])
        .pipe(mocha(mochaConfig))
        .on('error', function (error) {
            console.log(error);
        });
});
