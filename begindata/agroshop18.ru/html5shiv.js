!function(window,a){function b(a,b){var c=a.createElement("p"),d=a.getElementsByTagName("head")[0]||a.documentElement;return c.innerHTML="x<style>"+b+"</style>",d.insertBefore(c.lastChild,d.firstChild)}function c(){var a=x.elements;return"string"==typeof a?a.split(" "):a}function d(a,b){var c=x.elements;"string"!=typeof c&&(c=c.join(" ")),"string"!=typeof a&&(a=a.join(" ")),x.elements=c+" "+a,i(b)}function e(a){var b=w[a[u]];return b||(b={},v++,a[u]=v,w[v]=b),b}function f(b,c,d){if(c||(c=a),p)return c.createElement(b);d||(d=e(c));var f;return f=d.cache[b]?d.cache[b].cloneNode():t.test(b)?(d.cache[b]=d.createElem(b)).cloneNode():d.createElem(b),!f.canHaveChildren||s.test(b)||f.tagUrn?f:d.frag.appendChild(f)}function g(b,d){if(b||(b=a),p)return b.createDocumentFragment();d=d||e(b);for(var f=d.frag.cloneNode(),g=0,h=c(),i=h.length;i>g;g++)f.createElement(h[g]);return f}function h(a,b){b.cache||(b.cache={},b.createElem=a.createElement,b.createFrag=a.createDocumentFragment,b.frag=b.createFrag()),a.createElement=function(c){return x.shivMethods?f(c,a,b):b.createElem(c)},a.createDocumentFragment=Function("h,f","return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&("+c().join().replace(/[\w\-:]+/g,function(a){return b.createElem(a),b.frag.createElement(a),'c("'+a+'")'})+");return n}")(x,b.frag)}function i(c){c||(c=a);var d=e(c);return!x.shivCSS||o||d.hasCSS||(d.hasCSS=!!b(c,"article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}")),p||h(c,d),c}function j(a){for(var b,d=a.getElementsByTagName("*"),e=d.length,f=RegExp("^(?:"+c().join("|")+")$","i"),g=[];e--;)b=d[e],f.test(b.nodeName)&&g.push(b.applyElement(k(b)));return g}function k(a){for(var b,c=a.attributes,d=c.length,e=a.ownerDocument.createElement(z+":"+a.nodeName);d--;)b=c[d],b.specified&&e.setAttribute(b.nodeName,b.nodeValue);return e.style.cssText=a.style.cssText,e}function l(a){for(var b,d=a.split("{"),e=d.length,f=RegExp("(^|[\\s,>+~])("+c().join("|")+")(?=[[\\s,>+~#.:]|$)","gi"),g="$1"+z+"\\:$2";e--;)b=d[e]=d[e].split("}"),b[b.length-1]=b[b.length-1].replace(f,g),d[e]=b.join("}");return d.join("{")}function m(a){for(var b=a.length;b--;)a[b].removeNode()}function n(a){function c(){clearTimeout(g._removeSheetTimer),d&&d.removeNode(!0),d=null}var d,f,g=e(a),h=a.namespaces,i=a.parentWindow;return!A||a.printShived?a:("undefined"==typeof h[z]&&h.add(z),i.attachEvent("onbeforeprint",function(){c();for(var e,g,h,i=a.styleSheets,k=[],m=i.length,n=Array(m);m--;)n[m]=i[m];for(;h=n.pop();)if(!h.disabled&&y.test(h.media)){try{e=h.imports,g=e.length}catch(o){g=0}for(m=0;g>m;m++)n.push(e[m]);try{k.push(h.cssText)}catch(o){}}k=l(k.reverse().join("")),f=j(a),d=b(a,k)}),i.attachEvent("onafterprint",function(){m(f),clearTimeout(g._removeSheetTimer),g._removeSheetTimer=setTimeout(c,500)}),a.printShived=!0,a)}var o,p,q="3.7.2",r=window.html5||{},s=/^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,t=/^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,u="_html5shiv",v=0,w={};!function(){try{var b=a.createElement("a");b.innerHTML="<xyz></xyz>",o="hidden"in b,p=1==b.childNodes.length||function(){a.createElement("a");var b=a.createDocumentFragment();return"undefined"==typeof b.cloneNode||"undefined"==typeof b.createDocumentFragment||"undefined"==typeof b.createElement}()}catch(c){o=!0,p=!0}}();var x={elements:r.elements||"abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output picture progress section summary template time video",version:q,shivCSS:r.shivCSS!==!1,supportsUnknownElements:p,shivMethods:r.shivMethods!==!1,type:"default",shivDocument:i,createElement:f,createDocumentFragment:g,addElements:d};window.html5=x,i(a);var y=/^$|\b(?:all|print)\b/,z="html5shiv",A=!p&&function(){var b=a.documentElement;return!("undefined"==typeof a.namespaces||"undefined"==typeof a.parentWindow||"undefined"==typeof b.applyElement||"undefined"==typeof b.removeNode||"undefined"==typeof window.attachEvent)}();x.type+=" print",x.shivPrint=n,n(a)}(this,document);