export const svgSpriteTask = () => {
	return app.gulp.src(`${app.path.src.svg}`, {})
		.pipe(app.plugins.plumber(
			app.plugins.notify.onError({
				title: "SVG",
				message: "Error: <%= error.message %>"
			}))
		)
		.pipe(app.gulp.dest(`${app.path.build.icons}`));
}