const gulp = require("gulp");
const webpack = require("webpack-stream");
const sass = require("gulp-sass");
const autoprefixer = require("autoprefixer");
const cleanCSS = require("gulp-clean-css");
const postcss = require("gulp-postcss");
const del = require("del");

const prod = "./build/";

gulp.task("copy-html", () => {
  return gulp.src("./src/index.html").pipe(gulp.dest("./"));
});

gulp.task("build-js", () => {
  return gulp
    .src("./src/main.js")
    .pipe(
      webpack({
        mode: "development",
        output: {
          filename: "common.js"
        },
        watch: false,
        devtool: "source-map",
        module: {
          rules: [
            {
              test: /\.m?js$/,
              exclude: /(node_modules|bower_components)/,
              use: {
                loader: "babel-loader",
                options: {
                  presets: [
                    [
                      "@babel/preset-env",
                      {
                        debug: true,
                        corejs: 3,
                        useBuiltIns: "usage"
                      }
                    ]
                  ]
                }
              }
            }
          ]
        }
      })
    )
    .pipe(gulp.dest("./js/"));
});

gulp.task("build-sass", () => {
  return gulp
    .src("./src/scss/style.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest("./css"));
});

gulp.task("watch", () => {
  gulp.watch("./src/index.html", gulp.parallel("copy-html"));
  gulp.watch("./src/**/*.js", gulp.parallel("build-js"));
  gulp.watch("./src/scss/**/*.scss", gulp.parallel("build-sass"));
});

gulp.task("build", gulp.parallel("copy-html", "build-js", "build-sass"));

gulp.task("clean-build", function() {
  return del(["./build/"]);
});

gulp.task("prod-build", () => {
  gulp.src("./src/index.html").pipe(gulp.dest(prod));

  gulp.src("./img/**/*.*").pipe(gulp.dest(prod + "/img"));

  gulp
    .src("./src/main.js")
    .pipe(
      webpack({
        mode: "production",
        output: {
          filename: "common.js"
        },
        module: {
          rules: [
            {
              test: /\.m?js$/,
              exclude: /(node_modules|bower_components)/,
              use: {
                loader: "babel-loader",
                options: {
                  presets: [
                    [
                      "@babel/preset-env",
                      {
                        debug: false,
                        corejs: 3,
                        useBuiltIns: "usage"
                      }
                    ]
                  ]
                }
              }
            }
          ]
        }
      })
    )
    .pipe(gulp.dest(prod + "/js"));

  return gulp
    .src("./src/scss/style.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(postcss([autoprefixer()]))
    .pipe(cleanCSS())
    .pipe(gulp.dest(prod + "/css"));
});

gulp.task("default", gulp.parallel("watch", "build"));

gulp.task("prod", gulp.series("clean-build", "prod-build"));
