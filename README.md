# minimal-assemble-blog-boilerplate

A static site generator and build system using only Javascript tooling.

Using only Grunt plugins, this project provides a build system to create a template-driven blog, parsing
either markdown (md) or handlebars (hbs) templates.

It grew out of frustration with the documentation around [Assemble](http://assemble.io/), mostly it not being clear
how to use it.  Most static site generators out there point to using [Jekyll](https://rubygems.org/gems/jekyll),
but I was looking for a purely javascript-based solution to avoid mixing Ruby with Grunt/Javascript tooling in the
same environment.

## Features
- **Javascript only!**
    - Grunt is used for build scripts and all assembly.
    - Bower is used for dependency management.
    - No Jekyll or anything non-javascript.  **Stay in one language and environment.**
- Uses [Assemble](http://assemble.io/) for template-driven static site generation
    - Parses **Markdown** and **Handlebars** templates
- **[LESS CSS pre-parser](http://lesscss.org/)**
    - Includes building **[Bootstrap](http://getbootstrap.com/)**, meaning you can include your own themes and variable
      overrides.
- Javascript concatenation and minification
- Includes **local webserver** with File Watching and Live Reload
    - Build the site then serve it on localhost to **avoid browser request security restrictions**
    - **Watches** for changes to any files then **automatically rebuilds in the background**
    - **Live Reload** automatically refreshes your browser tab with the updated assets!

## To Use
- `$ npm install`
- `$ bower install` (assuming you have bower installed globally)
- `$ grunt`
    - Builds all assets then starts serving them at localhost
- Open up a browser and go to [localhost:8000](http://localhost:8000)
- Make changes in some code, **behold as things are automatically rebuilt and reloaded into the open browser!**

Development made easy, baby!

# License
Released under the GPLv3