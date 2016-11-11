/**
 * malta-header-comment plugin
 * dependency : none
 * 
 * affects: .js .css .html .xml .pack.js .min.js
 * outputs: a file named as the template
 * parameters accepted:
 * - headerCommentFile: path to the file containing the comment text needed (here oen can use vars.json placeholders as weel as malta wired vars)
 * 
 * pipe support : yes
 */
var fs = require('fs'),
    path = require('path');

function header_comment(o, options) {

    var start = +new Date,
        self = this,
        fpath = options.headerCommentFile,
        ext = self.utils.getFileExtension(self.outName),
        hfile = self.execDir + '/' + fpath,
        exists = fs.existsSync(hfile),
        msg;

    o.content = exists && ext in self.comments ? 
        self.comments[ext].replace(/\%content\%/, self.replace_wiredvars(self.replace_vars(fs.readFileSync(hfile).toString()))) + o.content
        :
        o.content;
    
    if (!exists) {
        msg = 'file ' + hfile + ' doesn`t exists';
        return function (solve) {
            solve(o);
            self.notifyAndUnlock(start, msg.red());
        }; 
    }

    self.listen(fpath);

    return function (solve, reject){
   
        fs.writeFile(o.name, o.content, function(err) {

            if (err == null) {
                msg += 'plugin malta-header-comment wrote ' + o.name +' (' + self.getSize(o.name) + ')';
            } else {
                console.log('[ERROR] header-comment says:');
                console.dir(err);
                self.stop();
            }
            solve(o);
            self.notifyAndUnlock(start, msg);
        });
    };
}

// header_comment.ext = ['js', 'css', 'scss', 'less']; 
header_comment.ext = ['html', 'xml', 'svg', 'js', 'css', 'less', 'scss', 'php', 'java', 'ts']; 
module.exports = header_comment;