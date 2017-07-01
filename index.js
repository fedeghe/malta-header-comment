/**
 * malta-header-comment plugin
 * dependency : none
 * 
 * affects: .js .css .html .xml .pack.js .min.js
 * outputs: a file named as the template
 * parameters accepted:
 * - name: path to the file containing the comment text needed (here oen can use vars.json placeholders as weel as malta wired vars)
 * 
 * pipe support : yes
 */
var fs = require('fs'),
    path = require('path');

function header_comment(o, options) {

    var self = this,
        start = +new Date,
        // fpath = options.name,
        ext = self.utils.getFileExtension(self.outName),
        hfile = self.execDir + '/' + options.name,
        // hfile = path.dirname(self.tplPath) + '/' + options.name,
        exists = fs.existsSync(hfile),
        msg = "",
        pluginName = path.basename(path.dirname(__filename)),
        size = 0,
        hContent;

    try {
        size = o.content.length;

        if (exists && ext in self.comments) {
            hContent = self.comments[ext](self.replace_calc(self.replace_wiredvars(self.replace_vars(fs.readFileSync(hfile).toString()))));
            size += hContent.length;
            o.content = hContent.replace(/__SIZE__/, '~' + ~~(size/1E3) + 'KB') + o.content
        }

    } catch (err) {
        self.doErr(err, o, pluginName);
    }
    
    if (!exists) {
        msg = 'file ' + hfile + ' doesn`t exists';
        return function (solve) {
            solve(o);
            self.notifyAndUnlock(start, msg.red());
        }; 
    }

    self.listen(hfile);

    return function (solve, reject){
        fs.writeFile(o.name, o.content, function(err) {
            err && self.doErr(err, o, pluginName);
            msg += 'plugin ' + pluginName.white() + ' wrote ' + o.name +' (' + self.getSize(o.name) + ')';
            solve(o);
            self.notifyAndUnlock(start, msg);
        });
    };
}

// header_comment.ext = ['js', 'css', 'scss', 'less']; 
header_comment.ext = ['html', 'xml', 'svg', 'js', 'css', 'less', 'scss', 'php', 'java', 'ts', 'jsx']; 
module.exports = header_comment;