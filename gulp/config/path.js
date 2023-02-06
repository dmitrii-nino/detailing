// Получаем имя папки проекта
import * as nodePath from 'path';
const rootFolder = nodePath.basename(nodePath.resolve());

const buildFolder = `./dist`; // Также можно использовать rootFolder
const srcFolder = `./src`;

export const path = {
	build: {
		js: `${buildFolder}/js/`,
		css: `${buildFolder}/css/`,
		html: `${buildFolder}/`,
		images: `${buildFolder}/assets/img/`,
		icons: `${buildFolder}/assets/icons/`,
		fonts: `${buildFolder}/fonts/`,
		constants: `${buildFolder}/constants/`
	},
	src: {
		js: `${srcFolder}/js/**/*.js`,
		images: `${srcFolder}/assets/img/**/*.{jpg,jpeg,png,webp}`,
		svg: `${srcFolder}/assets/icons/*.{svg,ico}`,
		scss: `${srcFolder}/scss/style.scss`,
		html: `${srcFolder}/*.html`, //.pug
		constants: `${srcFolder}/constants/**/*.*`,
	},
	watch: {
		js: `${srcFolder}/js/**/*.js`,
		scss: `${srcFolder}/scss/**/*.scss`,
		html: `${srcFolder}/**/*.html`, //.pug
		images: `${srcFolder}/assets/**/*.{jpg,jpeg,png}`,
		constants: `${srcFolder}/constants/**/*.*`,
	},
	clean: buildFolder,
	buildFolder: buildFolder,
	srcFolder: srcFolder,
	rootFolder: rootFolder,
	ftp: ``
}