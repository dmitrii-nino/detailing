export const copy = () => {
	return app.gulp.src(app.path.src.constants)
		.pipe(app.gulp.dest(app.path.build.constants))
}