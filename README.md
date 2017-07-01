---
[![npm version](https://badge.fury.io/js/malta-header-comment.svg)](http://badge.fury.io/js/malta-header-comment)
[![Dependencies](https://david-dm.org/fedeghe/malta-header-comment.svg)](https://david-dm.org/fedeghe/malta-header-comment)
[![npm downloads](https://img.shields.io/npm/dt/malta-header-comment.svg)](https://npmjs.org/package/malta-header-comment)
[![npm downloads](https://img.shields.io/npm/dm/malta-header-comment.svg)](https://npmjs.org/package/malta-header-comment)  
---  

This plugin can be used on: **.html**, **.xml**, **.svg**, **.js**, **.css**, **.less**, **.scss**, **.php**, **.java**, **.ts**

Options :  
    - **name** : path of the file containing the text that must be prepended, the path is relative to the execution folder  

In the header file it is possible to use the \_\_SIZE\_\_ placeholder, il will be replaced with "~nKB" where _n_ is the size of the output file.  

Sample usage:  
```
malta app/source/style.css public/css -plugins=malta-css-uglify...malta-header-comment[name:\"licence.txt\"]
```
or in the .json file :
```
"app/source/style.css" : "public/css -plugins=malta-css-uglify...malta-header-comment[name:\"licence.txt\"]"
```
or in a script : 
``` js
var Malta = require('malta');
Malta.get().check([
    'app/source/style.css',
    'public/css',
    '-plugins=malta-css-uglify...malta-header-comment[name:\"licence.txt\"]',
    '-options=showPath:false,watchInterval:500,verbose:0'
    ]).start(function (o) {
        var s = this;
        console.log('name : ' + o.name)
        console.log("content : \n" + o.content);
        'plugin' in o && console.log("plugin : " + o.plugin);
        console.log('=========');
    });
```