var gulp = require('gulp'),
    concat = require('gulp-concat'),
    gutil = require('gulp-util'),
    jshint = require('gulp-jshint'),
    runSequence = require('run-sequence'),
    del = require('del'),
    refresh = require('gulp-livereload'),
    lrserver = require('tiny-lr')(),
    express = require('express'),
    livereload = require('connect-livereload'),
    copy = require('gulp-copy'),
    uglify = require('gulp-uglify'),
    usemin = require('gulp-usemin'),
    annotate = require('gulp-ng-annotate'),
    path = require('path'),
    minifyCss = require('gulp-minify-css'),
    minifyHtml = require('gulp-minify-html'),
    rev = require('gulp-rev'),
    coffee = require('gulp-coffee'),
    sourcemaps = require('gulp-sourcemaps'),
    templateCache = require('gulp-angular-templatecache');

var livereloadport = 35729,
    serverport = 5000;


// DEV SERVER
var devServer = express();
devServer.use(livereload({port: livereloadport}));
devServer.use(express.static('./dev'));
devServer.all('/*', function (req, res) {
    res.sendFile('index.html', { root: 'dev' });
});

// PATHS
var pathToIndexFile = 'src/index.html';
var pathToStaticFolder = 'static/*';
var pathToJsSource = 'src/app/**/*.js';
var pathToCoffeeSource = 'src/app/**/*.coffee';
var pathToCssSource = 'src/app/**/*.css';
var pathToTemplates = 'src/app/**/*.html';
var pathToLibs = ['src/vendor/**/*.js', 'src/vendor/**/*.css'];

gulp.task('default', ['dev'], function () {
});

gulp.task('dev', function () {
        runSequence(
            'cleanDevFolder',
            [
                'buildDev',
                'startDevServer',
                'watchSource'
            ]);
    }
);

gulp.task('buildDev', [
    'copyLibs',
    'buildJs',
    'buildCoffee',
    'buildStyle',
    'copyIndex',
    'copyStaticFolder',
    'cacheTemplates'
], function () {
});

gulp.task('cleanDevFolder', function (cb) {
    del('dev', cb);
});

gulp.task('copyLibs', function () {
    gulp.src(pathToLibs)
        .pipe(copy('dev', {prefix: 1}));
});

gulp.task('buildJs', function () {
    gulp.src(pathToJsSource)
        .pipe(sourcemaps.init())
        .pipe(concat('build.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dev'))
        .pipe(refresh(lrserver));
});

gulp.task('buildCoffee', function () {
    gulp.src(pathToCoffeeSource)
        .pipe(sourcemaps.init())
        .pipe(coffee())
        .pipe(concat('buildCoffee.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dev'))
        .pipe(refresh(lrserver));
});

gulp.task('buildStyle', function () {
    gulp.src(pathToCssSource)
        .pipe(concat('build.css'))
        .pipe(gulp.dest('dev'));
    gulp.src(pathToIndexFile)
        .pipe(refresh(lrserver));
});

gulp.task('copyIndex', function () {
    gulp.src(pathToIndexFile)
        .pipe(copy('dev', {prefix: 1}))
    gulp.src(pathToIndexFile)
        .pipe(refresh(lrserver));
});

gulp.task('copyStaticFolder', function () {
    gulp.src(pathToStaticFolder)
        .pipe(copy('dev'));
    gulp.src(pathToIndexFile)
        .pipe(refresh(lrserver));
});

gulp.task('cacheTemplates', function () {
    gulp.src(pathToTemplates)
        .pipe(templateCache({module: 'app'}))
        .pipe(gulp.dest('dev'))
        .pipe(refresh(lrserver));
});

gulp.task('startDevServer', function () {
    devServer.listen(serverport);
    lrserver.listen(livereloadport);
});

gulp.task('watchSource', function () {
    gulp.watch(pathToJsSource, ['buildJs', 'lint']);
    gulp.watch(pathToCoffeeSource, ['buildCoffee']);
    gulp.watch(pathToCssSource, ['buildStyle']);
    gulp.watch(pathToIndexFile, ['copyIndex']);
    gulp.watch(pathToStaticFolder, ['copyStaticFolder']);
    gulp.watch(pathToTemplates, ['cacheTemplates']);
});

gulp.task('lint', function () {
    gulp.src(pathToJsSource)
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});


/////////////////////////////////////
/////////////// PROD ///////////////
///////////////////////////////////


gulp.task('prod', function () {
        runSequence(
            'cleanProdFolder',
            'buildDev',
            'buildProd',
            'startProdServer'
        );
    }
);

gulp.task('cleanProdFolder', function (cb) {
    del('prod', cb);
});

gulp.task('buildProd', function () {
    gulp.src('dev/index.html')
        .pipe(usemin({
            css: [minifyCss()],
            html: [minifyHtml({empty: true})],
            js: [annotate(), uglify(), rev()]
        }))
        .pipe(gulp.dest('prod'));
    gulp.src('static/*').pipe(copy('prod'));
});

gulp.task('startProdServer', function () {
    var server = express();
    server.use(express.static('./prod'));
    server.all('/*', function (req, res) {
        res.sendFile('index.html', { root: 'prod' });
    });
    server.listen(serverport);
});


/////////////////////////////////////
/////////////// OLD STUFF //////////
///////////////////////////////////


gulp.task('watch', function () {
    gulp.watch(pathToJsSource, ['js']);
//    gulp.watch([ './app/**/**/*.scss', './app/styles/main.scss'], [
//        'sass'
//    ]);
//    gulp.watch('./app/**/*.js', [
//        'lint'
//    ])
});

gulp.task('js', function () {
    gulp.src([pathToJsSource, 'src/index.html'])
        .pipe(usemin({
//            css: [minifyCss()],
//            html: [minifyHtml({empty: true})],
            js: [annotate()]
        }))
        .pipe(gulp.dest('dist'))
        .pipe(refresh(lrserver));
});

gulp.task('lib', function () {
    gulp.src('src/index.html')
        .pipe(usemin({
//            css: [minifyCss()],
//            html: [minifyHtml({empty: true})],
            js: [annotate()]
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('template', function () {
    gulp.src('dist/index.html')
        .pipe(inlineAngularTemplates({
            base: 'app/modules/**/*.html'
        }))
        .pipe(gulp.dest('dist'));
});

//gulp.task('lint', function () {
//    gulp.src('./app/modules/**/*.js')
//        .pipe(refresh(lrserver))
//        .pipe(jshint())
//        .pipe(jshint.reporter('default'));
//});

//gulp.task('sass', function () {
//    gulp.src('./app/styles/main.scss')
//        .pipe(refresh(lrserver))
//        .pipe(sass())
//        .pipe(gulp.dest('./app/styles'));
//});

//gulp.task('serveprod', function () {
//    var server = express();
//    server.use(livereload({port: livereloadport}));
//    server.use(express.static('./dist'));
//    server.all('/*', function (req, res) {
//        res.sendFile('index.html', { root: 'dist' });
//    });
//    server.listen(serverport);
//    lrserver.listen(livereloadport);
//});

//build tasks

gulp.task('temp', function () {
    gulp.run('grunt-inline_angular_templates')
});

gulp.task('build', function () {
    gulp.src('./app/index.html')
        .pipe(usemin({
            css: [minifyCss()],
            html: [minifyHtml({empty: true})],
            js: [annotate(), uglify(), rev()]
        }))
        .pipe(gulp.dest('./dist'))
//    gulp.src('./app/modules/**/*.tpl.html')
//        .pipe(minifyHtml())
//        .pipe(gulp.dist('./temp'));
//    gulp.src('./app/modules/**/*.html')
});
