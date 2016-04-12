/*
 * css-ownprefix
 * https://github.com/qwerchuan/grunt-css-ownprefix
 *
 * Copyright (c) 2016 yangchuan
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('css_ownprefix', 'add own css prefix', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      prefix: 'self-'
    });

    function cssPrefix(str){
      var reg=/\.([A-Za-z0-9_\-]+)/g;
      return str.replace(reg,function(s,$1){
          return '.' + options.prefix + $1;
      });
    }
    function htmlPrefix(str){
      var reg=/class[\s]*=[\s]*"([A-Za-z0-9_\-\s]+)"/g;
      return str.replace(reg,function(s,$1){
        var classStr=$1.trim();
        classStr=classStr.replace(/\s+/g,' ' + options.prefix);
        return 'class="' + options.prefix + classStr + '"';
      });
    }

    function getFileName(path){
      var start = path.lastIndexOf('/');
      return path.substring(start + 1, path.length);
    }

    function addPrefix(filepath,str){
      //判定文件类型
      var fileTyle = filepath.split('.'),ret;
      fileTyle = fileTyle[fileTyle.length -1];
      switch (fileTyle){
          case 'html':
            ret=htmlPrefix(str);
              break;
          case 'css':
            ret = cssPrefix(str);
            break;
      }
      return ret;
    }



    // Iterate over all specified file groups.
    this.files.forEach(function(f) {

      if(grunt.file.isDir(f.dest)){

        f.src.filter(function(filepath) {

          if (!grunt.file.exists(filepath)) {
            grunt.log.warn('Source file "' + filepath + '" not found.');
            return false;
          } else {
            return true;
          }
        }).map(function(filepath) {

          var src= grunt.file.read(filepath);
          src= addPrefix(filepath,src);
          grunt.file.write(f.dest + getFileName(filepath), src);
          grunt.log.writeln('File "' + f.dest + getFileName(filepath) + '" created.');
        });

      }else{

        var str=f.src.filter(function(filepath) {
          if (!grunt.file.exists(filepath)) {
            grunt.log.warn('Source file "' + filepath + '" not found.');
            return false;
          } else {
            return true;
          }
        }).map(function(filepath) {
          var s= grunt.file.read(filepath);
          return addPrefix(filepath,s);
        }).join(grunt.util.normalizelf("\n"));
        grunt.log.writeln('File "' + f.dest + '" created.');
      }

    });
  });

};
