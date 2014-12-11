/**
 * Module dependencies.
 */

//var fs = require('fs');
var gulp = require('gulp');
//var path = require('path');
var mkdirp = require('mkdirp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
//var buffer = require('vinyl-buffer');
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
    var bundler = browserify({
        entries: ['./client/index.js'],
        debug: env === "dev"
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

gulp.task('browserify-dev',['templates','clean'], function() {
    return getbundle('dev');
});

gulp.task('browserify-prod',['templates','clean'], function() {
    return getbundle('prod');
});

gulp.task('clean',function(done){
    mkdirp('./build');
    del('./build/**/*.*',{},done);
});

gulp.task('copy', function() {
    return gulp.src('./client/index.html')//,{cwd: '/frontend'})
        .pipe(gulp.dest('build'));
});

gulp.task('reworkcss',['clean'], function() {
    return gulp.src('client/styles/index.css')
        .pipe(rework(reworknpm()))
        .pipe(gulp.dest('build'));
});

gulp.task('watch',['default'], function() {
    return gulp.watch('./client/**/*.*', ['default']);
});

gulp.task('default',['copy','browserify-dev','reworkcss'], function(done){
    //run all tasks then cleanup
    del('./client/templates.js',{},done);
});

gulp.task('prod',['copy','browserify-prod','reworkcss'],function(done){
    //run all tasks then cleanup
    del('./client/templates.js',{},done);
});

