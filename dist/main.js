/*! For license information please see main.js.LICENSE.txt */
!function(){var t={471:function(t,e){var n;!function(){"use strict";function r(t){if(void 0===t)throw new Error('Pathformer [constructor]: "element" parameter is required');if(t.constructor===String&&!(t=document.getElementById(t)))throw new Error('Pathformer [constructor]: "element" parameter is not related to an existing ID');if(!(t instanceof window.SVGElement||t instanceof window.SVGGElement||/^svg$/i.test(t.nodeName)))throw new Error('Pathformer [constructor]: "element" parameter must be a string or a SVGelement');this.el=t,this.scan(t)}var i,a,o,s;function c(t,e,n){i(),this.isReady=!1,this.setElement(t,e),this.setOptions(e),this.setCallback(n),this.isReady&&this.init()}r.prototype.TYPES=["line","ellipse","circle","polygon","polyline","rect"],r.prototype.ATTR_WATCH=["cx","cy","points","r","rx","ry","x","x1","x2","y","y1","y2"],r.prototype.scan=function(t){for(var e,n,r,i=t.querySelectorAll(this.TYPES.join(",")),a=0;a<i.length;a++)n=(0,this[(e=i[a]).tagName.toLowerCase()+"ToPath"])(this.parseAttr(e.attributes)),r=this.pathMaker(e,n),e.parentNode.replaceChild(r,e)},r.prototype.lineToPath=function(t){var e={},n=t.x1||0,r=t.y1||0,i=t.x2||0,a=t.y2||0;return e.d="M"+n+","+r+"L"+i+","+a,e},r.prototype.rectToPath=function(t){var e={},n=parseFloat(t.x)||0,r=parseFloat(t.y)||0,i=parseFloat(t.width)||0,a=parseFloat(t.height)||0;if(t.rx||t.ry){var o=parseInt(t.rx,10)||-1,s=parseInt(t.ry,10)||-1;o=Math.min(Math.max(o<0?s:o,0),i/2),s=Math.min(Math.max(s<0?o:s,0),a/2),e.d="M "+(n+o)+","+r+" L "+(n+i-o)+","+r+" A "+o+","+s+",0,0,1,"+(n+i)+","+(r+s)+" L "+(n+i)+","+(r+a-s)+" A "+o+","+s+",0,0,1,"+(n+i-o)+","+(r+a)+" L "+(n+o)+","+(r+a)+" A "+o+","+s+",0,0,1,"+n+","+(r+a-s)+" L "+n+","+(r+s)+" A "+o+","+s+",0,0,1,"+(n+o)+","+r}else e.d="M"+n+" "+r+" L"+(n+i)+" "+r+" L"+(n+i)+" "+(r+a)+" L"+n+" "+(r+a)+" Z";return e},r.prototype.polylineToPath=function(t){var e,n,r={},i=t.points.trim().split(" ");if(-1===t.points.indexOf(",")){var a=[];for(e=0;e<i.length;e+=2)a.push(i[e]+","+i[e+1]);i=a}for(n="M"+i[0],e=1;e<i.length;e++)-1!==i[e].indexOf(",")&&(n+="L"+i[e]);return r.d=n,r},r.prototype.polygonToPath=function(t){var e=r.prototype.polylineToPath(t);return e.d+="Z",e},r.prototype.ellipseToPath=function(t){var e={},n=parseFloat(t.rx)||0,r=parseFloat(t.ry)||0,i=parseFloat(t.cx)||0,a=parseFloat(t.cy)||0,o=i-n,s=a,c=parseFloat(i)+parseFloat(n),l=a;return e.d="M"+o+","+s+"A"+n+","+r+" 0,1,1 "+c+","+l+"A"+n+","+r+" 0,1,1 "+o+","+l,e},r.prototype.circleToPath=function(t){var e={},n=parseFloat(t.r)||0,r=parseFloat(t.cx)||0,i=parseFloat(t.cy)||0,a=r-n,o=i,s=parseFloat(r)+parseFloat(n),c=i;return e.d="M"+a+","+o+"A"+n+","+n+" 0,1,1 "+s+","+c+"A"+n+","+n+" 0,1,1 "+a+","+c,e},r.prototype.pathMaker=function(t,e){var n,r,i=document.createElementNS("http://www.w3.org/2000/svg","path");for(n=0;n<t.attributes.length;n++)r=t.attributes[n],-1===this.ATTR_WATCH.indexOf(r.name)&&i.setAttribute(r.name,r.value);for(n in e)i.setAttribute(n,e[n]);return i},r.prototype.parseAttr=function(t){for(var e,n={},r=0;r<t.length;r++){if(e=t[r],-1!==this.ATTR_WATCH.indexOf(e.name)&&-1!==e.value.indexOf("%"))throw new Error("Pathformer [parseAttr]: a SVG shape got values in percentage. This cannot be transformed into 'path' tags. Please use 'viewBox'.");n[e.name]=e.value}return n},c.LINEAR=function(t){return t},c.EASE=function(t){return-Math.cos(t*Math.PI)/2+.5},c.EASE_OUT=function(t){return 1-Math.pow(1-t,3)},c.EASE_IN=function(t){return Math.pow(t,3)},c.EASE_OUT_BOUNCE=function(t){var e=1-Math.cos(t*(.5*Math.PI)),n=Math.pow(e,1.5),r=Math.pow(1-t,2);return 1-r+(1-Math.abs(Math.cos(n*(2.5*Math.PI))))*r},c.prototype.setElement=function(t,e){var n,r;if(void 0===t)throw new Error('Vivus [constructor]: "element" parameter is required');if(t.constructor===String&&!(t=document.getElementById(t)))throw new Error('Vivus [constructor]: "element" parameter is not related to an existing ID');if(this.parentEl=t,e&&e.file){r=this,n=function(){var t=document.createElement("div");t.innerHTML=this.responseText;var n=t.querySelector("svg");if(!n)throw new Error("Vivus [load]: Cannot find the SVG in the loaded file : "+e.file);r.el=n,r.el.setAttribute("width","100%"),r.el.setAttribute("height","100%"),r.parentEl.appendChild(r.el),r.isReady=!0,r.init(),r=null};var i=new window.XMLHttpRequest;return i.addEventListener("load",n),i.open("GET",e.file),void i.send()}switch(t.constructor){case window.SVGSVGElement:case window.SVGElement:case window.SVGGElement:this.el=t,this.isReady=!0;break;case window.HTMLObjectElement:r=this,(n=function(e){if(!r.isReady){if(r.el=t.contentDocument&&t.contentDocument.querySelector("svg"),!r.el&&e)throw new Error("Vivus [constructor]: object loaded does not contain any SVG");r.el&&(t.getAttribute("built-by-vivus")&&(r.parentEl.insertBefore(r.el,t),r.parentEl.removeChild(t),r.el.setAttribute("width","100%"),r.el.setAttribute("height","100%")),r.isReady=!0,r.init(),r=null)}})()||t.addEventListener("load",n);break;default:throw new Error('Vivus [constructor]: "element" parameter is not valid (or miss the "file" attribute)')}},c.prototype.setOptions=function(t){var e=["delayed","sync","async","nsync","oneByOne","scenario","scenario-sync"],n=["inViewport","manual","autostart"];if(void 0!==t&&t.constructor!==Object)throw new Error('Vivus [constructor]: "options" parameter must be an object');if((t=t||{}).type&&-1===e.indexOf(t.type))throw new Error("Vivus [constructor]: "+t.type+" is not an existing animation `type`");if(this.type=t.type||e[0],t.start&&-1===n.indexOf(t.start))throw new Error("Vivus [constructor]: "+t.start+" is not an existing `start` option");if(this.start=t.start||n[0],this.isIE=-1!==window.navigator.userAgent.indexOf("MSIE")||-1!==window.navigator.userAgent.indexOf("Trident/")||-1!==window.navigator.userAgent.indexOf("Edge/"),this.duration=s(t.duration,120),this.delay=s(t.delay,null),this.dashGap=s(t.dashGap,1),this.forceRender=t.hasOwnProperty("forceRender")?!!t.forceRender:this.isIE,this.reverseStack=!!t.reverseStack,this.selfDestroy=!!t.selfDestroy,this.onReady=t.onReady,this.map=[],this.frameLength=this.currentFrame=this.delayUnit=this.speed=this.handle=null,this.ignoreInvisible=!!t.hasOwnProperty("ignoreInvisible")&&!!t.ignoreInvisible,this.animTimingFunction=t.animTimingFunction||c.LINEAR,this.pathTimingFunction=t.pathTimingFunction||c.LINEAR,this.delay>=this.duration)throw new Error("Vivus [constructor]: delay must be shorter than duration")},c.prototype.setCallback=function(t){if(t&&t.constructor!==Function)throw new Error('Vivus [constructor]: "callback" parameter must be a function');this.callback=t||function(){}},c.prototype.mapping=function(){var t,e,n,r,i,a,o,c;for(c=a=o=0,e=this.el.querySelectorAll("path"),t=0;t<e.length;t++)n=e[t],this.isInvisible(n)||(i={el:n,length:Math.ceil(n.getTotalLength())},isNaN(i.length)?window.console&&console.warn&&console.warn("Vivus [mapping]: cannot retrieve a path element length",n):(this.map.push(i),n.style.strokeDasharray=i.length+" "+(i.length+2*this.dashGap),n.style.strokeDashoffset=i.length+this.dashGap,i.length+=this.dashGap,a+=i.length,this.renderPath(t)));for(a=0===a?1:a,this.delay=null===this.delay?this.duration/3:this.delay,this.delayUnit=this.delay/(e.length>1?e.length-1:1),this.reverseStack&&this.map.reverse(),t=0;t<this.map.length;t++){switch(i=this.map[t],this.type){case"delayed":i.startAt=this.delayUnit*t,i.duration=this.duration-this.delay;break;case"oneByOne":i.startAt=o/a*this.duration,i.duration=i.length/a*this.duration;break;case"sync":case"async":case"nsync":i.startAt=0,i.duration=this.duration;break;case"scenario-sync":n=i.el,r=this.parseAttr(n),i.startAt=c+(s(r["data-delay"],this.delayUnit)||0),i.duration=s(r["data-duration"],this.duration),c=void 0!==r["data-async"]?i.startAt:i.startAt+i.duration,this.frameLength=Math.max(this.frameLength,i.startAt+i.duration);break;case"scenario":n=i.el,r=this.parseAttr(n),i.startAt=s(r["data-start"],this.delayUnit)||0,i.duration=s(r["data-duration"],this.duration),this.frameLength=Math.max(this.frameLength,i.startAt+i.duration)}o+=i.length,this.frameLength=this.frameLength||this.duration}},c.prototype.drawer=function(){var t=this;if(this.currentFrame+=this.speed,this.currentFrame<=0)this.stop(),this.reset();else{if(!(this.currentFrame>=this.frameLength))return this.trace(),void(this.handle=a((function(){t.drawer()})));this.stop(),this.currentFrame=this.frameLength,this.trace(),this.selfDestroy&&this.destroy()}this.callback(this),this.instanceCallback&&(this.instanceCallback(this),this.instanceCallback=null)},c.prototype.trace=function(){var t,e,n,r;for(r=this.animTimingFunction(this.currentFrame/this.frameLength)*this.frameLength,t=0;t<this.map.length;t++)e=(r-(n=this.map[t]).startAt)/n.duration,e=this.pathTimingFunction(Math.max(0,Math.min(1,e))),n.progress!==e&&(n.progress=e,n.el.style.strokeDashoffset=Math.floor(n.length*(1-e)),this.renderPath(t))},c.prototype.renderPath=function(t){if(this.forceRender&&this.map&&this.map[t]){var e=this.map[t],n=e.el.cloneNode(!0);e.el.parentNode.replaceChild(n,e.el),e.el=n}},c.prototype.init=function(){this.frameLength=0,this.currentFrame=0,this.map=[],new r(this.el),this.mapping(),this.starter(),this.onReady&&this.onReady(this)},c.prototype.starter=function(){switch(this.start){case"manual":return;case"autostart":this.play();break;case"inViewport":var t=this,e=function e(){t.isInViewport(t.parentEl,1)&&(t.play(),window.removeEventListener("scroll",e))};window.addEventListener("scroll",e),e()}},c.prototype.getStatus=function(){return 0===this.currentFrame?"start":this.currentFrame===this.frameLength?"end":"progress"},c.prototype.reset=function(){return this.setFrameProgress(0)},c.prototype.finish=function(){return this.setFrameProgress(1)},c.prototype.setFrameProgress=function(t){return t=Math.min(1,Math.max(0,t)),this.currentFrame=Math.round(this.frameLength*t),this.trace(),this},c.prototype.play=function(t,e){if(this.instanceCallback=null,t&&"function"==typeof t)this.instanceCallback=t,t=null;else if(t&&"number"!=typeof t)throw new Error("Vivus [play]: invalid speed");return e&&"function"==typeof e&&!this.instanceCallback&&(this.instanceCallback=e),this.speed=t||1,this.handle||this.drawer(),this},c.prototype.stop=function(){return this.handle&&(o(this.handle),this.handle=null),this},c.prototype.destroy=function(){var t,e;for(this.stop(),t=0;t<this.map.length;t++)(e=this.map[t]).el.style.strokeDashoffset=null,e.el.style.strokeDasharray=null,this.renderPath(t)},c.prototype.isInvisible=function(t){var e,n=t.getAttribute("data-ignore");return null!==n?"false"!==n:!!this.ignoreInvisible&&!(e=t.getBoundingClientRect()).width&&!e.height},c.prototype.parseAttr=function(t){var e,n={};if(t&&t.attributes)for(var r=0;r<t.attributes.length;r++)n[(e=t.attributes[r]).name]=e.value;return n},c.prototype.isInViewport=function(t,e){var n=this.scrollY(),r=n+this.getViewportH(),i=t.getBoundingClientRect(),a=i.height,o=n+i.top;return o+a*(e=e||0)<=r&&o+a>=n},c.prototype.getViewportH=function(){var t=this.docElem.clientHeight,e=window.innerHeight;return t<e?e:t},c.prototype.scrollY=function(){return window.pageYOffset||this.docElem.scrollTop},i=function(){c.prototype.docElem||(c.prototype.docElem=window.document.documentElement,a=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(t){return window.setTimeout(t,1e3/60)},o=window.cancelAnimationFrame||window.webkitCancelAnimationFrame||window.mozCancelAnimationFrame||window.oCancelAnimationFrame||window.msCancelAnimationFrame||function(t){return window.clearTimeout(t)})},s=function(t,e){var n=parseInt(t,10);return n>=0?n:e},void 0===(n=function(){return c}.apply(e,[]))||(t.exports=n)}()},678:function(){},379:function(t,e,n){"use strict";var r,i=function(){var t={};return function(e){if(void 0===t[e]){var n=document.querySelector(e);if(window.HTMLIFrameElement&&n instanceof window.HTMLIFrameElement)try{n=n.contentDocument.head}catch(t){n=null}t[e]=n}return t[e]}}(),a=[];function o(t){for(var e=-1,n=0;n<a.length;n++)if(a[n].identifier===t){e=n;break}return e}function s(t,e){for(var n={},r=[],i=0;i<t.length;i++){var s=t[i],c=e.base?s[0]+e.base:s[0],l=n[c]||0,u="".concat(c," ").concat(l);n[c]=l+1;var h=o(u),d={css:s[1],media:s[2],sourceMap:s[3]};-1!==h?(a[h].references++,a[h].updater(d)):a.push({identifier:u,updater:m(d,e),references:1}),r.push(u)}return r}function c(t){var e=document.createElement("style"),r=t.attributes||{};if(void 0===r.nonce){var a=n.nc;a&&(r.nonce=a)}if(Object.keys(r).forEach((function(t){e.setAttribute(t,r[t])})),"function"==typeof t.insert)t.insert(e);else{var o=i(t.insert||"head");if(!o)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");o.appendChild(e)}return e}var l,u=(l=[],function(t,e){return l[t]=e,l.filter(Boolean).join("\n")});function h(t,e,n,r){var i=n?"":r.media?"@media ".concat(r.media," {").concat(r.css,"}"):r.css;if(t.styleSheet)t.styleSheet.cssText=u(e,i);else{var a=document.createTextNode(i),o=t.childNodes;o[e]&&t.removeChild(o[e]),o.length?t.insertBefore(a,o[e]):t.appendChild(a)}}function d(t,e,n){var r=n.css,i=n.media,a=n.sourceMap;if(i?t.setAttribute("media",i):t.removeAttribute("media"),a&&"undefined"!=typeof btoa&&(r+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(a))))," */")),t.styleSheet)t.styleSheet.cssText=r;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(r))}}var p=null,f=0;function m(t,e){var n,r,i;if(e.singleton){var a=f++;n=p||(p=c(e)),r=h.bind(null,n,a,!1),i=h.bind(null,n,a,!0)}else n=c(e),r=d.bind(null,n,e),i=function(){!function(t){if(null===t.parentNode)return!1;t.parentNode.removeChild(t)}(n)};return r(t),function(e){if(e){if(e.css===t.css&&e.media===t.media&&e.sourceMap===t.sourceMap)return;r(t=e)}else i()}}t.exports=function(t,e){(e=e||{}).singleton||"boolean"==typeof e.singleton||(e.singleton=(void 0===r&&(r=Boolean(window&&document&&document.all&&!window.atob)),r));var n=s(t=t||[],e);return function(t){if(t=t||[],"[object Array]"===Object.prototype.toString.call(t)){for(var r=0;r<n.length;r++){var i=o(n[r]);a[i].references--}for(var c=s(t,e),l=0;l<n.length;l++){var u=o(n[l]);0===a[u].references&&(a[u].updater(),a.splice(u,1))}n=c}}}}},e={};function n(r){var i=e[r];if(void 0!==i)return i.exports;var a=e[r]={exports:{}};return t[r](a,a.exports,n),a.exports}n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,{a:e}),e},n.d=function(t,e){for(var r in e)n.o(e,r)&&!n.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:e[r]})},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},function(){"use strict";var t=n(379),e=n.n(t),r=n(678),i=n.n(r),a=(e()(i(),{insert:"head",singleton:!1}),i().locals,n(471));function o(t){return(t=(t=(t=(t=t.replace(/&/g,"&amp;")).replace(/</g,"&lt;")).replace(/>/g,"&gt;")).replace(/"/g,"&quot;")).replace(/'/g,"&#39;")}var s,c,l="",u=0,h="",d=document.querySelector("#uploaded-file"),p=document.querySelector("#output"),f=document.querySelector("#incorrect-sound"),m=document.querySelector("#repeat"),y=document.getElementById("loading-wrapper"),g=document.querySelector("#dark-theme-button"),v=document.querySelector(".notice-wrapper.upload"),w=!1;m.addEventListener("click",(function(){(l=p.textContent).length,u=0,h=l.charAt(u),p.innerHTML='<span class="text-cursor">'.concat(o(l.slice(0,u+1)),"</span>").concat(o(l.slice(u+1,l.length)))})),g.addEventListener("click",(function(){w=!w,document.querySelector("body").classList.toggle("dark"),document.querySelectorAll("img").forEach((function(t){(t.classList.contains("dark")||t.classList.contains("light"))&&t.classList.toggle("display")}))})),d.addEventListener("input",(function(t){v.remove();var e=t.target.files[0],n=new FileReader;n.addEventListener("load",(function(){var t=n.result.replace(/\t/g," ").replace(/[^0-9a-zA-Z!"#$%&'()\*\+\-\.,\/:;<=>?@\[\\\]^_`{|}~\n\s]/g,"");p.textContent=t.trim(),d.value="",(l=p.textContent).length,u=0,h=l.charAt(u),p.innerHTML='<span class="text-cursor">'.concat(o(l.slice(0,u+1)),"</span>").concat(o(l.slice(u+1,l.length))),f.load()})),n.readAsText(e)})),p.addEventListener("keydown",(function(t){"Shift"===t.key||"Alt"===t.key||"Ctrl"===t.key||"Control"===t.key||"Meta"===t.key||"Backspace"===t.key||"Escape"===t.key||"ArrowUp"===t.key||"ArrowDown"===t.key||"ArrowLeft"===t.key||"ArrowRight"===t.key?t.preventDefault():t.key===h?(t.preventDefault(),u++,h=l.charAt(u),p.innerHTML=o(l.slice(0,u))+'<span class="text-cursor">'+o(l.slice(u,u+1))+"</span>"+o(l.slice(u+1,l.length)),h.match(/\r?\n/g)&&(h="Enter",document.querySelector(".text-cursor").classList.add("enter-cursor")),1===u&&(s=performance.now(),console.log(s)),u===l.length&&(c=performance.now(),console.log(c),function(){var t=c-s,e=Math.floor(t/6e4),n=Math.floor(t%6e4/1e3),r=t%1e3;e="0".concat(e).slice(-2),n="0".concat(n).slice(-2),r="00".concat(r).slice(-3);var i=document.createElement("div");i.classList.add("end-modal","row-nocol","just-center","align-middle");var a=document.createElement("section");a.classList.add("notice-to-end"),a.innerHTML='\n    <p><img src="img/finish.svg" class="finish" alt="Finish!"><p>\n    <p class="time">Time: <span>'.concat(e,":").concat(n,".").concat(r,'</span></p>\n    <p class="count">Word: <span>').concat(l.length,'</span></p>\n    <div class="clearfix">\n      <button class="close btn btn-radius">Close</button>\n    </div>\n  '),i.appendChild(a),document.body.appendChild(i),document.querySelector("button.close").addEventListener("click",(function(){!function(t){document.body.removeChild(t)}(i)}))}())):t.key!=h&&(t.preventDefault(),f.pause(),f.currentTime=0,f.play())})),window.onload=function(){new a("svg-animation",{duration:80,start:"autostart",type:"delayed"},(function(){setTimeout((function(){y.classList.add("loaded")}),800)}))}}()}();