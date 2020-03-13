const gulp =require("gulp");
const uglify = require("gulp-uglify");
const babel = require("gulp-babel");
const csso = require("gulp-csso");
const webserver = require("gulp-webserver");
const sass = require("gulp-sass");
const watch = require("gulp-watch");


// gulp.task("first", ()=>{
//     console.log("first");
// } )


gulp.task("compileJs",()=>{
    gulp.src("./src/**/*.js")

    // .pipe( babel() )

    // .pipe(uglify())

    .pipe( gulp.dest("./dist/"))
    
});

gulp.task("compileCss",()=>{

    gulp.src("./src/**/*.css")

    .pipe( babel( {
        parset :["@babel/env"]
    }) )

    .pipe( uglify())

    .pipe(gulp.dest("./dist/"))

});

gulp.task("compileHTML", ()=>{
	gulp.src("./src/**/*.html")
		.pipe( gulp.dest("./dist") )
})


gulp.task("compileSass",()=>{
    return gulp.src("./src/**/*.scss")
    .pipe( sass({
        outputStyle:"expanded"
    }).on('error',sass.logError)
    ).pipe(gulp.dest('./dist'));
});



gulp.task("server",["build"],()=>{
    gulp.src("./")
    .pipe(webserver({
        livereload : true,
        directoryListing :true,
        proxies:[{
            source:"/api",
            target:"http://store.blackshark.com"
        }]
    }));
    gulp.watch("./src/**/*.js",["compileJs"]);
    gulp.watch("./src/**/*.scss",["compileSass"]);
    gulp.watch("./src/**/*.html",["compileHTML"]);
});

gulp.task("build",()=>{
    gulp.src("./src/scripts/**/*.js", {
		base: "./src"
	}).pipe( gulp.dest("./dist") );
	
	gulp.src("./src/pages/**/*.js", {
		base: "./src"
	}).pipe( gulp.dest("./dist") );
	
	gulp.src("./src/pages/**/*.html", {
		base: "./src"
	}).pipe( gulp.dest("./dist") );
	
	gulp.src("./src/styles/**/*.scss", {
		base: "./src"
	}).pipe(sass({
		outputStyle : "expanded"  //设定生成代码风格
	}).on('error', sass.logError))
	.pipe( gulp.dest("./dist") );
		
	gulp.src("./src/static/**/*.*", {
		base: "./src"
	}).pipe( gulp.dest("./dist") )
    // gulp.src("./src/scripts/**/*.js",{
    //     base:"./src"
    // }).pipe(gulp.dest("./dist"));
    // gulp.src("./src/scripts/**/*.html",{
    //     base:"./src"
    // }).pipe(gulp.dest("./dist"));
    // gulp.src("./src/style/**/*.scss",{
    //     base:"./src"
    // }).pipe(gulp.dest("./dist"));
})


