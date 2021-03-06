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
const fs = require('fs'),
    path = require('path');

function header_comment(o, options) {

    var self = this,
        start = +new Date,
        ext = self.utils.getFileExtension(self.outName),
        hfile = self.execDir + '/' + options.name,
        exists = fs.existsSync(hfile),
        pluginName = path.basename(path.dirname(__filename)),
        getSize = s => {
            const factor = 1024;
            const metric = ['B', 'KB', 'MB', 'GB', 'TB']; /// already GB does not makes much sense! 
            let i = 0
            let done = false
            while (!done) {
                if (s > factor) {
                    i++;
                    s = s / factor
                } else {
                    s = parseFloat(s.toFixed(2), 10) + metric[i] || 'Huge file'
                    done = true
                }
            }
            return s
        }

    let msg = "",
        size = 0,
        hContent;

    try {
        size = o.content.length;

        if (exists && ext in self.comments) {
            hContent = self.comments[ext](self.replace_calc(self.replace_wiredvars(self.replace_vars(fs.readFileSync(hfile).toString()))));
            size += hContent.length;
            o.content = hContent.replace(/__SIZE__/, '~' + getSize(size)) + o.content
            if (!('nostrict' in options)) {
                o.content = `'use strict';\n${o.content}`;
            }
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

    return (solve, reject) => {
        fs.writeFile(o.name, o.content, err => {
            err && self.doErr(err, o, pluginName);
            msg += 'plugin ' + pluginName.white() + ' wrote ' + o.name +' (' + self.getSize(o.name) + ')';
            err
                ? reject(`Plugin ${pluginName} write Error:\n${err}`)
                : solve(o);
            self.notifyAndUnlock(start, msg);
        });
    };
}

// header_comment.ext = ['js', 'css', 'scss', 'less']; 
header_comment.ext = ['html', 'xml', 'svg', 'js', 'css', 'less', 'scss', 'php', 'java', 'ts', 'jsx']; 
module.exports = header_comment;