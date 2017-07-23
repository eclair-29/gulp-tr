/* =================================================

 * Gulp System Builder File - at gulpfile.js
 * git repo: https://github.com/eclair-29/app 

 * =================================================

 * developer: Miguel A. de Chavez (dmgzky@gmail.com)
 * file version: 1.0.0 -- © 2017 Skuld Project, LLC

 * ================================================= 
 
 * file specs: 
 * desc: tasks management for preprocessing files
 * tasks to be preprocess: 
 * sass files
 * javascript files
 * html markup files
 * images (metadata)
 * browser relaoding
 * error log 

 * =================================================

 * system build file: gulpfile.js v.1.0.0
 * tasks name: 'default' tasks

 * ================================================= */







// ==========================
// File Configurations
// ==========================

var fileConfig = {

	jsConcatFiles: [
	/* bower dependency files: 
	 * note: must include bower jquery first! 
	 * components version: 
	 * jquery v.3.2.1
	 * angular v.1.6.5
	 * =============================================== */
		'src/bower/jquery/dist/jquery.js',
		'src/bower/angular/angular.js',

	/* bootstrap javascript file: 
	 * require this file to use bootstrap js components
	 * components version: 
	 * bootstrap-sass v.3.3.7
	 * =============================================== */
		'src/utilities/bootstrap/javascripts/bootstrap.js',

	// main javascript files (project specsfic): 
		'src/js/**/*.js'
	]
}


// ==========================
// Requires
// ==========================

var gulp 		 = require('gulp');
var sass 		 = require('gulp-sass');
var uglify  	 = require('gulp-uglify');
var concat		 = require('gulp-concat');
var sourcemaps	 = require('gulp-sourcemaps');
var imagemin	 = require('gulp-imagemin');
var autoprefixer = require('gulp-autoprefixer');
var browsersync	 = require('browser-sync');
var reload	 	 = browsersync.reload;


// ==========================
// Error Log 
// ==========================

function errorlog(err) {
	console.log(err.message);
	this.emit('end');
}


// ==========================
// Scripts Tasks
// ==========================

gulp.task('scripts', function(){
	return gulp.src(fileConfig.jsConcatFiles)

		.pipe(sourcemaps.init())
		.pipe(concat('app.js'))
		.pipe(uglify())
		.on('error', errorlog)
		.pipe(sourcemaps.write('../js/maps'))
		.pipe(gulp.dest('build/js'))

		.pipe(reload({stream: true}));
});


// ==========================
// Styles Tasks
// ==========================

gulp.task('styles', function(){
	return gulp.src('src/sass/**/*.+(sass|scss)')

		.pipe(sourcemaps.init())
		.pipe(sass({outputStyle: 'compressed'}))
		.on('error', errorlog)
		.pipe(autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
		}))
		.pipe(sourcemaps.write('../css/maps'))
		.pipe(gulp.dest('build/css'))

		.pipe(reload({stream: true}));
});


// ==========================
// HTML Markup Tasks
// ==========================

gulp.task('html', function(){
	return gulp.src('build/**/*.html')
	.pipe(reload({stream: true}));
});


// ==========================
// Image Minification Tasks
// ==========================

gulp.task('image:min', function(){
	return gulp.src('build/images/*')
	.pipe(imagemin());
});


// ==========================
// Browser Sync Tasks
// ==========================

gulp.task('browser-sync', function(){
	browsersync({
		server: {baseDir: "./build/"}
	});
});


// ==========================
// Watch Tasks
// ==========================

gulp.task('watch', function(){
	gulp.watch('src/js/**/*.js', ['scripts']);
	gulp.watch('src/sass/**/*.+(sass|scss)', ['styles']);
	gulp.watch('build/**/*.html', ['html']);
});


// ==========================
// Default Tasks
// ==========================

gulp.task('default', ['scripts', 'styles', 'html', 'browser-sync', 'image:min', 'watch']);