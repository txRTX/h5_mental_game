!function(a,b){"function"==typeof define&&define.amd?define(b):"object"==typeof exports?module.exports=b():a.resLoader=b(a)}(this,function(){function b(a){if(this.option={resourceType:"image",baseUrl:"./",resources:[],onStart:null,onProgress:null,onComplete:null},!a)return alert("参数错误！"),void 0;for(i in a)this.option[i]=a[i];this.status=0,this.total=this.option.resources.length||0,this.currentIndex=0}var a=function(a){return"function"==typeof a};return b.prototype.start=function(){var b,c,d,e,f,g,h;for(this.status=1,b=this,c=this.option.baseUrl,d=0,e=this.option.resources.length;e>d;d++)f=this.option.resources[d],g="",g=0===f.indexOf("http://")||0===f.indexOf("https://")?f:c+f,h=new Image,h.onload=function(){b.loaded()},h.onerror=function(){b.loaded()},h.src=g;a(this.option.onStart)&&this.option.onStart(this.total)},b.prototype.loaded=function(){a(this.option.onProgress)&&this.option.onProgress(++this.currentIndex,this.total),this.currentIndex===this.total&&a(this.option.onComplete)&&this.option.onComplete(this.total)},b});