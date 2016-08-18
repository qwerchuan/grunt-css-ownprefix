/*
 * css-ownprefix
 * https://github.com/qwerchuan/grunt-css-ownprefix
 *
 * Copyright (c) 2016 yangchuan
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {
    var path = require('path');

    // Please see the Grunt documentation for more information regarding task
    // creation: http://gruntjs.com/creating-tasks

    grunt.registerMultiTask('css_ownprefix', 'add own css prefix', function() {
        var options = this.options({
            prefix: 'self-'
        });

        function cssPrefix(str) {
            var css = /[^}]+{/g;
            var regClassName = /\.([a-zA-Z][a-zA-Z\-_0-9]*)/g;

            return str.replace(css, function(s) {
                return s.replace(regClassName, function(name, $1) {
                    return '.' + options.prefix + $1;
                })
            });
        }

        function htmlPrefix(str) {
            var reg = /class[\s]*=[\s]*"([A-Za-z0-9_\-\s]+)"/g;
            return str.replace(reg, function(s, $1) {
                var classStr = $1.trim();
                classStr = classStr.replace(/\s+/g, ' ' + options.prefix);
                return 'class="' + options.prefix + classStr + '"';
            });
        }

        function getFileName(filepath) {
            var start = filepath.lastIndexOf('/');
            return filepath.substring(start + 1, filepath.length);
        }

        function addPrefix(filepath, str) {
            //判定文件类型
            var fileTyle = filepath.split('.'),
                ret;
            fileTyle = fileTyle[fileTyle.length - 1];
            switch (fileTyle) {
                case 'html':
                    ret = htmlPrefix(str);
                    break;
                case 'css':
                    ret = cssPrefix(str);
                    break;
            }
            return ret;
        }



        // Iterate over all specified file groups.
        this.files.forEach(function(f) {

            f.src.forEach(function(filepath) {

                filepath = unixifyPath(filepath);

                var isExpandedPair = f.orig.expand || false;

                var dest = unixifyPath(f.dest);

                if (detectDestType(dest) === 'directory') {
                    dest = (isExpandedPair) ? dest : path.join(dest, filepath);
                }

                if (!grunt.file.exists(filepath) || grunt.file.isDir(filepath)) {
                    grunt.log.warn('Source file "' + filepath + '" not found.');
                } else {
                    var str = grunt.file.read(filepath);
                    str = addPrefix(filepath, str);
                    grunt.file.write(dest, str);
                    grunt.log.writeln('File "' + dest + '" created.');

                }
            });

        });
    });

    var detectDestType = function(dest) {
        if (grunt.util._.endsWith(dest, '/')) {
            return 'directory';
        } else {
            return 'file';
        }
    };


    var unixifyPath = function(filepath) {
        if (process.platform === 'win32') {
            return filepath.replace(/\\/g, '/');
        } else {
            return filepath;
        }
    };
};
