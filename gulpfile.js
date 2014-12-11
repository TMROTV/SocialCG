/**
 * Module dependencies.
 */

var fs = require('fs');
var gulp = require('gulp');
var path = require('path');
var mkdirp = require('mkdirp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var del = require('del');
var templateCache = require('gulp-angular-templatecache');
var ngannotate = require('browserify-ngannotate');
var uglifyify = require('uglifyify');
var rework = require('gulp-rework');
var reworknpm = require('rework-npm');



gulp.task('templates', function() {
    return gulp.src('./client/views/**/*.html')
        .pipe(templateCache({
            moduleSystem: 'Browserify',
            standalone: true
        }))
        .pipe(gulp.dest('./client/'));
});

var getbundle = function(env){
    var d = env === "dev" ? true : false;
    var bundler = browserify({
        entries: ['./client/index.js'],
        debug: d
    });

    var bundle = function() {
        switch(env) {
            case 'dev':
            return bundler
                    .bundle()
                    .pipe(source('build.js'))
                    .pipe(gulp.dest('./build/'));
            break;
            case 'prod':
                return bundler
                    .transform(ngannotate)
                    .transform({
                        global: true
                    }, 'uglifyify')
                    .bundle()
                    .pipe(source('build.js'))
                    .pipe(gulp.dest('./build/'));
            break;
        }
    };
    return bundle();
};

gulp.task('browserify-dev',['templates'], function() {
    return getbundle('dev');
});

gulp.task('browserify-prod',['templates'], function() {
    return getbundle('prod');
});

gulp.task('clean',function(done){
    mkdirp('./build');
    del('./build/**/*.*');
    return done();
});

gulp.task('copy', function() {
    return gulp.src('./client/index.html')//,{cwd: '/frontend'})
        .pipe(gulp.dest('build'));
});

gulp.task('reworkcss', function() {
    return gulp.src('client/styles/index.css')
        .pipe(rework(reworknpm()))
        //.pipe(source('build.css'))
        .pipe(gulp.dest('build'));
});

gulp.task('watch',['default'], function() {
    return gulp.watch('./client/**/*.*', ['default']);
});

gulp.task('default',['clean','copy','browserify-dev','reworkcss']);

gulp.task('prod',['clean','copy','browserify-prod','reworkcss']);

