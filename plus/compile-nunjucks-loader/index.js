'use strict';

var nunjucks = require('nunjucks');
var path = require('path');

function getQueryString(self, name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = self.query.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}


module.exports = function(source) {
    this.cacheable && this.cacheable();
    var self = this;    
 
    try {

        var key = self['resourcePath'];
        var name = path.basename(key).replace(path.extname(key),'');
        var data = {};
        data[name] = true;
        var html = nunjucks.renderString(source,data);
        return `module.exports=function(){
            return \`${html}\`;
        }`;
    } catch(e) {
         console.error("nunjucks-loader:" + e);
         throw e;
    }
}