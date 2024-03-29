import * as nodePath from 'path';
const rootFolder = nodePath.basename(nodePath.resolve());

const buildFolder = `./dist`;
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
        html: `${srcFolder}/*.pug`,
        plainHtml: `${srcFolder}/**/*.html`,
        constants: `${srcFolder}/constants/**/*.*`,
    },
    watch: {
        js: `${srcFolder}/js/**/*.js`,
        scss: `${srcFolder}/scss/**/*.scss`,
        html: `${srcFolder}/**/*.pug`,
        plainHtml: `${srcFolder}/**/*.html`,
        images: `${srcFolder}/assets/**/*.{jpg,jpeg,png,webp}`,
        constants: `${srcFolder}/constants/**/*.*`,
    },
    clean: buildFolder,
    buildFolder: buildFolder,
    srcFolder: srcFolder,
    rootFolder: rootFolder,
    ftp: ``
}