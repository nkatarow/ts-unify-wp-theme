#Wordpress Boilerplate Theme

**Starting point for custom Wordpress theme development.**

The primary goals of this build process are a clean, component based organization, mixed with automation for CSS/SASS and JavaScript concatenation and minification/uglification.

## Author(s) / Inspiration
Build process, base styles, and JavaScript by [Nick Katarow](http://github.com/nkatarow).

Original [Starkers Theme](https://github.com/viewportindustries/starkers) built by [Viewport Industries, Ltd](http://http://viewportindustries.com/).

SASS Structure and base styles inspired by [Brad Frost](http://bradfrostweb.com/)'s [Pattern Lab](http://demo.patternlab.io/).

## What it does

**CSS/SASS**



The CSS directory structure broken into three categories.

* **helpers** - Used primarily for things like CSS reset/normalize files, SASS variables and mixins.
* **base** - Intended for base, classless, global styles for HTML elements. In addition, utilities like clear fixes and offscreen text can be considered base styles.
* **components** - Where the majority of your custom styling should take place. For best organization, create a new file for each new component you build and take advantage of SASS nesting techniques to keep your components self contained.

**JavaScript**

The JavaScript build process varies slightly from the CSS process for easier debugging in development. Details on the differences between the development and production processes can be found in the **Usage** section below.

The JavaScript directory structure broken into three categories.

* **libs** - Vendor libraries should go here (jQuery, Modernizr, etc.)
* **components** - Outside of the **_ui/js/app.main.js** file, all of your JS components should be placed here. By default, this comes with an empty name spaced file to used as a template.

**Templates**

The included templates are largely unchanged from the Starkers Wordpress theme. There are two includes that have been edited include conditional loading based on the compiled files as described below.

Each of these files detect the host and perform an if/then to see if it matches your development host (default is **wordpress-boilerplate.dev/**). You'll need to change this if your development host differs.

## Setup
To get the app up and running, you will need to make sure you have the following software installed prior to running. If you've already got these all installed, skip to the app dependencies.

### System Dependancies
* [Node](http://nodejs.org/) - Download and install using the link provided.
* [NPM](https://npmjs.org/) - This should be installed automatically with Node.js.
* [Gulp](https://gulpjs.com/) - Run the following command after Node/NPM are installed:

```
$
```
 
* [Sass](http://sass-lang.com/) - Assuming you're running ruby, run the following command (if you get an error, try running with sudo):

```
gem install sass
```

### Application Dependencies
Once you have the proper system dependencies installed, run the following command in the application's root directory:

```
npm install
```

## Usage
Below you'll fine a list of commands to perform varying tasks followed by a detailed description of what each does.

```
grunt
```
* **CSS/SASS**
	* The default grunt task will check the **_ui/css/main.scss** file and compile all the specified scss files into **_ui/compiled/main.css**. This CSS style is expanded, have a sourcemap file, trace, debug info and line number. This is the CSS file loaded when viewing the development site.
* **JavaScript**
	* The default grunt task will also run through the js directories and create **scripts.js** in the **_ui/compiled/** directory. 

```
grunt watch
```
The watch task will look for changes on all SCSS and JS files, automatically run the same processes as the default grunt task, and reload your webpage for you (if you have the live reload plugin/extension installed). (**Note:** If new files are added, you will make sure they are added as described above and the default grunt task will need to be run first.)

```
grunt build
```
The build task should be run when you're ready to generate or update your optimized production files.

* **CSS/SASS**
	* The build task will take **_ui/compiled/main.css** and minify it to **_ui/dist/main.min.css** but will be compressed and will not include any of the debug options turned on for the development build.
	* The file will also output with a series of numbers attached used for cache busting.
* **JavaScript**
	* The build task will take **_ui/compiled/scripts.js** and uglify it to **_ui/dist/scripts.min.js** but will be compressed and will not include any of the debug options turned on for the development build.
	* The file will also output with a series of numbers attached used for cache busting.
* **Cache Busting**
    * As mentioned in the CSS/JS bullets above, the build process will also attach a series of numbers to each file name. The process will also go into the base template file and update the production script and link references to include the correct series of numbers. This will ensure than when a new build is posted to the server, the updated files are always used instead of any cached versions.
    
## Libraries Included
* [Profound Grid](http://www.profoundgrid.com/)
* [jQuery 2.2.0](http://jquery.com/)

