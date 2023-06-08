export const plainHtml = () => {
    return app.gulp.src(app.path.src.plainHtml).pipe(app.gulp.dest(app.path.build.html))
}