var gulp = require ('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var cleanCSS = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var del = require('del');
var livereload = require('gulp-livereload');
var replace = require('gulp-replace');
var imagemin = require('gulp-imagemin');
var iconfont = require('gulp-iconfont');
var iconfontCSS = require('gulp-iconfont-css');

var date = new Date();
var cssFilename = 'main.min.' + date.getFullYear() + (date.getMonth() + 1) + date.getDate() + '-' + date.getTime() + '.css';
var jsFilename = 'scripts.min.' + date.getFullYear() + (date.getMonth() + 1) + date.getDate() + '-' + date.getTime() + '.js';

function createErrorHandler(name) {
    return function (err) {
    	console.error('Error from ' + name, err.toString());
    };
}

// Concat/autoprefix CSS
gulp.task('styles', function(){
	return gulp.src('_ui/scss/main.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer({browsers: ['last 2 version', 'safari 5', 'ie 9', 'ios 6', 'android 4', '> 1%']}))
		.pipe(gulp.dest('_ui/compiled'))
    	.on('error', createErrorHandler('styles task'))
		.pipe(livereload());
});

// Iconfont Generation
gulp.task('icons', function(){
  gulp.src(['_ui/img/icons/*.svg'])
    .pipe(iconfontCSS({
      fontName: 'iconfont',
      targetPath: '../scss/base/_icon-fonts.scss',
      fontPath: '../fonts/',
      path: 'scss'
    }))
    .pipe(iconfont({
      fontName: 'iconfont',
      formats: ['eot', 'woff', 'woff2'],
      normalize: true,
      fontHeight: 1001
    }))
    .pipe(gulp.dest('_ui/fonts/'))
});

// Concat JS
gulp.task('scripts', function(){
	return gulp.src(['_ui/js/lib/*.js', '_ui/js/app.main.js', '_ui/js/components/*.js'])
		.pipe(concat('scripts.js'))
		.pipe(gulp.dest('_ui/compiled'))
    	.on('error', createErrorHandler('scripts task'))
		.pipe(livereload());
});

// Minify
gulp.task('minify', function(){
	return gulp.src('_ui/compiled/main.css')
		.pipe(cleanCSS())
		.pipe(rename(cssFilename))
		.pipe(gulp.dest('_ui/dist'))
    	.on('error', createErrorHandler('minify task'))
});

// Uglify
gulp.task('uglify', function(){
	return gulp.src('_ui/compiled/scripts.js')
		.pipe(rename(jsFilename))
		.pipe(uglify())
    	.on('error', createErrorHandler('uglify task'))
		.pipe(gulp.dest('_ui/dist'))
});

// Templates
gulp.task('templates', () => {
    gulp.src(['templates/*.twig', 'templates/components/*.twig', 'views/*.twig']).pipe(livereload());
});

// Cache Busting
gulp.task('cache', function(){
  gulp.src(['templates/base.twig']) //must define base so I can overwrite the src file below. Per http://stackoverflow.com/questions/22418799/can-gulp-overwrite-all-src-files
    .pipe(replace(/<link id="stylesheet".*>/g, '<link id="stylesheet" rel="stylesheet" href="{{site.theme.link}}/_ui/dist/' + cssFilename + '" type="text/css" media="all">'))  //so find the script tag with an id of bundle, and replace its src.
    .pipe(replace(/<script id="scripts".*><\/script>/g, '<script id="scripts" src="{{site.theme.link}}/_ui/dist/' + jsFilename + '"></script>'))  //so find the script tag with an id of bundle, and replace its src.
    .on('error', createErrorHandler('cache task'))
    .pipe(gulp.dest('templates/')); //Write the file back to the same spot.
});

// Cleaners
gulp.task('cleancompiled', function(){
	return del(['_ui/compiled']);
});
gulp.task('cleandist', function(){
	return del(['_ui/dist']);
});


// Default task
gulp.task('default', ['cleancompiled'], function(){
	gulp.start('icons', ['styles', 'scripts']);
});

// Watch task
gulp.task('watch', function(){
	livereload.listen();

 	gulp.watch(['templates/*.twig', 'templates/components/*.twig', 'views/*.twig'], ['templates']);
 	gulp.watch('_ui/scss/**/*.scss', ['styles']);
	gulp.watch('_ui/js/**/*.js', ['scripts']);
 	gulp.watch('_ui/img/icons/*.svg', ['icons']);
});


// Build task
gulp.task('build', ['cleandist'], function(){
	gulp.start('icons', ['minify', 'uglify'],'cache');
});
