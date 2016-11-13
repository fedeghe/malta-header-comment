This plugin can be used on: **.html**, **.xml**, **.svg**, **.js**, **.css**, **.less**, **.scss**, **.php**, **.java**, **.ts**

Options :  
    - **name** : path of the file containing the text that must be prepended, the path is relative to the execution folder

Sample usage:  

    malta app/source/style.css public/css -plugins=malta-css-uglify...malta-header-comment[name:\"licence.txt\"]

or in the .json file :

    "app/source/style.css" : "public/css -plugins=malta-css-uglify...malta-header-comment[name:\"licence.txt\"]"

or in a script : 

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
            */
        });
