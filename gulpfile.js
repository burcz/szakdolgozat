const gulp = require('gulp');
const ts = require('gulp-typescript');
const sourcemaps = require('gulp-sourcemaps');
const tsProject = ts.createProject('./tsconfig.json')

const requiredDevDistFiles = ['src/config.json', 'package.json', 'tsconfig.json'];
const devDist = 'dist';

function buildTs() {
	return tsProject.src()
		.pipe(sourcemaps.init())
		.pipe(tsProject())
		.js
		.pipe(sourcemaps.write('./', {
			includeContent: false,
			sourceRoot: () => ""
		}))
		.pipe(gulp.dest(devDist));
}

function copyDevDistRequiredFiles(cb) {
	gulp.src(requiredDevDistFiles)
		.pipe(gulp.dest(devDist));
	cb();
}

exports.buildTs = gulp.parallel(buildTs, copyDevDistRequiredFiles);