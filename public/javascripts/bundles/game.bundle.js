!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=83)}({1:function(e,t,n){"use strict";n.d(t,"c",(function(){return L})),n.d(t,"b",(function(){return a})),n.d(t,"a",(function(){return v}));var r,o,l,_,u,i={},s=[],c=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord/i;function p(e,t){for(var n in t)e[n]=t[n];return e}function f(e){var t=e.parentNode;t&&t.removeChild(e)}function a(e,t,n){var r,o=arguments,l={};for(r in t)"key"!==r&&"ref"!==r&&(l[r]=t[r]);if(arguments.length>3)for(n=[n],r=3;r<arguments.length;r++)n.push(o[r]);if(null!=n&&(l.children=n),"function"==typeof e&&null!=e.defaultProps)for(r in e.defaultProps)void 0===l[r]&&(l[r]=e.defaultProps[r]);return d(e,l,t&&t.key,t&&t.ref)}function d(e,t,n,o){var l={type:e,props:t,key:n,ref:o,__k:null,__:null,__b:0,__e:null,__d:void 0,__c:null,constructor:void 0};return r.vnode&&r.vnode(l),l}function h(e){return e.children}function v(e,t){this.props=e,this.context=t}function y(e,t){if(null==t)return e.__?y(e.__,e.__.__k.indexOf(e)+1):null;for(var n;t<e.__k.length;t++)if(null!=(n=e.__k[t])&&null!=n.__e)return n.__e;return"function"==typeof e.type?y(e):null}function m(e){var t,n;if(null!=(e=e.__)&&null!=e.__c){for(e.__e=e.__c.base=null,t=0;t<e.__k.length;t++)if(null!=(n=e.__k[t])&&null!=n.__e){e.__e=e.__c.base=n.__e;break}return m(e)}}function g(e){(!e.__d&&(e.__d=!0)&&1===o.push(e)||_!==r.debounceRendering)&&((_=r.debounceRendering)||l)(b)}function b(){var e,t,n,r,l,_,u;for(o.sort((function(e,t){return t.__v.__b-e.__v.__b}));e=o.pop();)e.__d&&(n=void 0,r=void 0,_=(l=(t=e).__v).__e,(u=t.__P)&&(n=[],r=E(u,l,p({},l),t.__n,void 0!==u.ownerSVGElement,null,n,null==_?y(l):_),T(n,l),r!=_&&m(l)))}function k(e,t,n,r,o,l,_,u,c){var p,a,d,h,v,m,g,b=n&&n.__k||s,k=b.length;if(u==i&&(u=null!=l?l[0]:k?y(n,0):null),p=0,t.__k=w(t.__k,(function(n){if(null!=n){if(n.__=t,n.__b=t.__b+1,null===(d=b[p])||d&&n.key==d.key&&n.type===d.type)b[p]=void 0;else for(a=0;a<k;a++){if((d=b[a])&&n.key==d.key&&n.type===d.type){b[a]=void 0;break}d=null}if(h=E(e,n,d=d||i,r,o,l,_,u,c),(a=n.ref)&&d.ref!=a&&(g||(g=[]),d.ref&&g.push(d.ref,null,n),g.push(a,n.__c||h,n)),null!=h){var s;if(null==m&&(m=h),void 0!==n.__d)s=n.__d,n.__d=void 0;else if(l==d||h!=u||null==h.parentNode){e:if(null==u||u.parentNode!==e)e.appendChild(h),s=null;else{for(v=u,a=0;(v=v.nextSibling)&&a<k;a+=2)if(v==h)break e;e.insertBefore(h,u),s=u}"option"==t.type&&(e.value="")}u=void 0!==s?s:h.nextSibling,"function"==typeof t.type&&(t.__d=u)}else u&&d.__e==u&&u.parentNode!=e&&(u=y(d))}return p++,n})),t.__e=m,null!=l&&"function"!=typeof t.type)for(p=l.length;p--;)null!=l[p]&&f(l[p]);for(p=k;p--;)null!=b[p]&&C(b[p],b[p]);if(g)for(p=0;p<g.length;p++)D(g[p],g[++p],g[++p])}function w(e,t,n){if(null==n&&(n=[]),null==e||"boolean"==typeof e)t&&n.push(t(null));else if(Array.isArray(e))for(var r=0;r<e.length;r++)w(e[r],t,n);else n.push(t?t("string"==typeof e||"number"==typeof e?d(null,e,null,null):null!=e.__e||null!=e.__c?d(e.type,e.props,e.key,null):e):e);return n}function x(e,t,n){"-"===t[0]?e.setProperty(t,n):e[t]="number"==typeof n&&!1===c.test(t)?n+"px":null==n?"":n}function S(e,t,n,r,o){var l,_,u,i,s;if(o?"className"===t&&(t="class"):"class"===t&&(t="className"),"key"===t||"children"===t);else if("style"===t)if(l=e.style,"string"==typeof n)l.cssText=n;else{if("string"==typeof r&&(l.cssText="",r=null),r)for(_ in r)n&&_ in n||x(l,_,"");if(n)for(u in n)r&&n[u]===r[u]||x(l,u,n[u])}else"o"===t[0]&&"n"===t[1]?(i=t!==(t=t.replace(/Capture$/,"")),s=t.toLowerCase(),t=(s in e?s:t).slice(2),n?(r||e.addEventListener(t,P,i),(e.l||(e.l={}))[t]=n):e.removeEventListener(t,P,i)):"list"!==t&&"tagName"!==t&&"form"!==t&&"type"!==t&&"size"!==t&&!o&&t in e?e[t]=null==n?"":n:"function"!=typeof n&&"dangerouslySetInnerHTML"!==t&&(t!==(t=t.replace(/^xlink:?/,""))?null==n||!1===n?e.removeAttributeNS("http://www.w3.org/1999/xlink",t.toLowerCase()):e.setAttributeNS("http://www.w3.org/1999/xlink",t.toLowerCase(),n):null==n||!1===n&&!/^ar/.test(t)?e.removeAttribute(t):e.setAttribute(t,n))}function P(e){this.l[e.type](r.event?r.event(e):e)}function E(e,t,n,o,l,_,u,i,s){var c,f,a,d,y,m,g,b,w,x,S=t.type;if(void 0!==t.constructor)return null;(c=r.__b)&&c(t);try{e:if("function"==typeof S){if(b=t.props,w=(c=S.contextType)&&o[c.__c],x=c?w?w.props.value:c.__:o,n.__c?g=(f=t.__c=n.__c).__=f.__E:("prototype"in S&&S.prototype.render?t.__c=f=new S(b,x):(t.__c=f=new v(b,x),f.constructor=S,f.render=N),w&&w.sub(f),f.props=b,f.state||(f.state={}),f.context=x,f.__n=o,a=f.__d=!0,f.__h=[]),null==f.__s&&(f.__s=f.state),null!=S.getDerivedStateFromProps&&(f.__s==f.state&&(f.__s=p({},f.__s)),p(f.__s,S.getDerivedStateFromProps(b,f.__s))),d=f.props,y=f.state,a)null==S.getDerivedStateFromProps&&null!=f.componentWillMount&&f.componentWillMount(),null!=f.componentDidMount&&f.__h.push(f.componentDidMount);else{if(null==S.getDerivedStateFromProps&&b!==d&&null!=f.componentWillReceiveProps&&f.componentWillReceiveProps(b,x),!f.__e&&null!=f.shouldComponentUpdate&&!1===f.shouldComponentUpdate(b,f.__s,x)){for(f.props=b,f.state=f.__s,f.__d=!1,f.__v=t,t.__e=n.__e,t.__k=n.__k,f.__h.length&&u.push(f),c=0;c<t.__k.length;c++)t.__k[c]&&(t.__k[c].__=t);break e}null!=f.componentWillUpdate&&f.componentWillUpdate(b,f.__s,x),null!=f.componentDidUpdate&&f.__h.push((function(){f.componentDidUpdate(d,y,m)}))}f.context=x,f.props=b,f.state=f.__s,(c=r.__r)&&c(t),f.__d=!1,f.__v=t,f.__P=e,c=f.render(f.props,f.state,f.context),t.__k=null!=c&&c.type==h&&null==c.key?c.props.children:Array.isArray(c)?c:[c],null!=f.getChildContext&&(o=p(p({},o),f.getChildContext())),a||null==f.getSnapshotBeforeUpdate||(m=f.getSnapshotBeforeUpdate(d,y)),k(e,t,n,o,l,_,u,i,s),f.base=t.__e,f.__h.length&&u.push(f),g&&(f.__E=f.__=null),f.__e=!1}else t.__e=M(n.__e,t,n,o,l,_,u,s);(c=r.diffed)&&c(t)}catch(e){r.__e(e,t,n)}return t.__e}function T(e,t){r.__c&&r.__c(t,e),e.some((function(t){try{e=t.__h,t.__h=[],e.some((function(e){e.call(t)}))}catch(e){r.__e(e,t.__v)}}))}function M(e,t,n,r,o,l,_,u){var c,p,f,a,d,h=n.props,v=t.props;if(o="svg"===t.type||o,null!=l)for(c=0;c<l.length;c++)if(null!=(p=l[c])&&((null===t.type?3===p.nodeType:p.localName===t.type)||e==p)){e=p,l[c]=null;break}if(null==e){if(null===t.type)return document.createTextNode(v);e=o?document.createElementNS("http://www.w3.org/2000/svg",t.type):document.createElement(t.type,v.is&&{is:v.is}),l=null}if(null===t.type)h!==v&&e.data!=v&&(e.data=v);else if(t!==n){if(null!=l&&(l=s.slice.call(e.childNodes)),f=(h=n.props||i).dangerouslySetInnerHTML,a=v.dangerouslySetInnerHTML,!u){if(h===i)for(h={},d=0;d<e.attributes.length;d++)h[e.attributes[d].name]=e.attributes[d].value;(a||f)&&(a&&f&&a.__html==f.__html||(e.innerHTML=a&&a.__html||""))}(function(e,t,n,r,o){var l;for(l in n)l in t||S(e,l,null,n[l],r);for(l in t)o&&"function"!=typeof t[l]||"value"===l||"checked"===l||n[l]===t[l]||S(e,l,t[l],n[l],r)})(e,v,h,o,u),t.__k=t.props.children,a||k(e,t,n,r,"foreignObject"!==t.type&&o,l,_,i,u),u||("value"in v&&void 0!==v.value&&v.value!==e.value&&(e.value=null==v.value?"":v.value),"checked"in v&&void 0!==v.checked&&v.checked!==e.checked&&(e.checked=v.checked))}return e}function D(e,t,n){try{"function"==typeof e?e(t):e.current=t}catch(e){r.__e(e,n)}}function C(e,t,n){var o,l,_;if(r.unmount&&r.unmount(e),(o=e.ref)&&(o.current&&o.current!==e.__e||D(o,null,t)),n||"function"==typeof e.type||(n=null!=(l=e.__e)),e.__e=e.__d=void 0,null!=(o=e.__c)){if(o.componentWillUnmount)try{o.componentWillUnmount()}catch(e){r.__e(e,t)}o.base=o.__P=null}if(o=e.__k)for(_=0;_<o.length;_++)o[_]&&C(o[_],t,n);null!=l&&f(l)}function N(e,t,n){return this.constructor(e,n)}function L(e,t,n){var o,l,_;r.__&&r.__(e,t),l=(o=n===u)?null:n&&n.__k||t.__k,e=a(h,null,[e]),_=[],E(t,(o?t:n||t).__k=e,l||i,i,void 0!==t.ownerSVGElement,n&&!o?[n]:l?null:s.slice.call(t.childNodes),_,n||i,o),T(_,e)}r={__e:function(e,t){for(var n,r;t=t.__;)if((n=t.__c)&&!n.__)try{if(n.constructor&&null!=n.constructor.getDerivedStateFromError&&(r=!0,n.setState(n.constructor.getDerivedStateFromError(e))),null!=n.componentDidCatch&&(r=!0,n.componentDidCatch(e)),r)return g(n.__E=n)}catch(t){e=t}throw e}},v.prototype.setState=function(e,t){var n;n=this.__s!==this.state?this.__s:this.__s=p({},this.state),"function"==typeof e&&(e=e(n,this.props)),e&&p(n,e),null!=e&&this.__v&&(t&&this.__h.push(t),g(this))},v.prototype.forceUpdate=function(e){this.__v&&(this.__e=!0,e&&this.__h.push(e),g(this))},v.prototype.render=h,o=[],l="function"==typeof Promise?Promise.prototype.then.bind(Promise.resolve()):setTimeout,u=i},8:function(e,t,n){"use strict";var r=function(e,t,n,o){var l;t[0]=0;for(var _=1;_<t.length;_++){var u=t[_++],i=t[_]?(t[0]|=u?1:2,n[t[_++]]):t[++_];3===u?o[0]=i:4===u?o[1]=Object.assign(o[1]||{},i):5===u?(o[1]=o[1]||{})[t[++_]]=i:6===u?o[1][t[++_]]+=i+"":u?(l=e.apply(i,r(e,i,n,["",null])),o.push(l),i[0]?t[0]|=2:(t[_-2]=0,t[_]=l)):o.push(i)}return o},o=new Map;t.a=function(e){var t=o.get(this);return t||(t=new Map,o.set(this,t)),(t=r(this,t.get(e)||(t.set(e,t=function(e){for(var t,n,r=1,o="",l="",_=[0],u=function(e){1===r&&(e||(o=o.replace(/^\s*\n\s*|\s*\n\s*$/g,"")))?_.push(0,e,o):3===r&&(e||o)?(_.push(3,e,o),r=2):2===r&&"..."===o&&e?_.push(4,e,0):2===r&&o&&!e?_.push(5,0,!0,o):r>=5&&((o||!e&&5===r)&&(_.push(r,0,o,n),r=6),e&&(_.push(r,e,0,n),r=6)),o=""},i=0;i<e.length;i++){i&&(1===r&&u(),u(i));for(var s=0;s<e[i].length;s++)t=e[i][s],1===r?"<"===t?(u(),_=[_],r=3):o+=t:4===r?"--"===o&&">"===t?(r=1,o=""):o=t+o[0]:l?t===l?l="":o+=t:'"'===t||"'"===t?l=t:">"===t?(u(),r=1):r&&("="===t?(r=5,n=o,o=""):"/"===t&&(r<5||">"===e[i][s+1])?(u(),3===r&&(_=_[0]),r=_,(_=_[0]).push(2,0,r),r=0):" "===t||"\t"===t||"\n"===t||"\r"===t?(u(),r=2):o+=t),3===r&&"!--"===o&&(r=4,_=_[0])}return u(),_}(e)),t),arguments,[])).length>1?t:t[0]}},83:function(e,t,n){"use strict";n.r(t);var r=n(1);const o=n(8).a.bind(r.b);class l extends r.a{handleTimerEvent(){var e=(new Date).getTime()+3e4,t=setInterval((function(){var n=(new Date).getTime(),r=e-n;document.getElementById("timer").innerHTML=parseInt((e-n)/1e3)+"s",r<0&&(clearInterval(t),document.getElementById("timer").innerHTML="EXPIRED")}),1e3)}render(){return o`
    <div style="text-align:left;">
      <div class="container-fliud m-3">
        <h3 class="display-4">Welcome to Risk Game!
        <p style="float:right;" id="timer" onload="${this.handleTimerEvent()}">
      </p></h3>
        <a href="/lobby">Back to lobby</a>
      </div>
      
    </div>
    `}}Object(r.c)(o`<${l} />`,document.getElementById("app"))}});