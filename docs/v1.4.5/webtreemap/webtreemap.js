var r=function(a){var b=0;return function(){return b<a.length?{done:!1,value:a[b++]}:{done:!0}}},y=function(a){var b="undefined"!=typeof Symbol&&Symbol.iterator&&a[Symbol.iterator];return b?b.call(a):{next:r(a)}};/*
 Copyright (c) Microsoft Corporation. All rights reserved.
 Licensed under the Apache License, Version 2.0 (the "License"); you may not use
 this file except in compliance with the License. You may obtain a copy of the
 License at http://www.apache.org/licenses/LICENSE-2.0

 THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
 WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
 MERCHANTABLITY OR NON-INFRINGEMENT.

 See the Apache Version 2.0 License for specific language governing permissions
 and limitations under the License.
*/
/*
 Copyright 2019 Google Inc. All Rights Reserved.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/
function z(a){var b=document.createElement("style");b.innerText="\n.webtreemap-node {\n  cursor: pointer;\n  position: absolute;\n  border: solid 1px #666;\n  box-sizing: border-box;\n  overflow: hidden;\n  background: white;\n  transition: left .15s, top .15s, width .15s, height .15s;\n}\n\n.webtreemap-node:hover {\n  background: #ddd;\n}\n\n.webtreemap-caption {\n  font-size: 10px;\n  text-align: center;\n}\n";a.appendChild(b)}function A(a){return a.classList.contains("webtreemap-node")}
function B(a){return Math.round(a)+"px"}function C(){var a={},b={padding:a.padding||[14,3,3,3],caption:a.caption||function(e){return e.id||""},c:a.c||function(e,g,k){return 20<g&&k>=b.padding[0]},b:a.b||function(e,g,k){return 40<g&&40<k}};return b}
var E=function(a){this.node=a;this.options=C()},F=function(a,b){if(b.a)return b.a;var e=document.createElement("div");e.className="webtreemap-node";if(a.options.caption){var g=document.createElement("div");g.className="webtreemap-caption";g.innerText=a.options.caption(b);e.appendChild(g)}return b.a=e},G=function(a,b,e,g,k){var m=b.size,c=b.children;if(c){--g;var d=a.options.padding;var f=-1+d[0];d[1]&&(g-=d[1]+1);var n=k-1-d[2];k=-1+d[3];d=0;if(a.options.b(b,g-k,n-f)){n=Math.sqrt(m/((g-k)*(n-f)));
var p=f,l=0;a:for(;l<c.length;){f=k;for(var t=n*(g-k),v=c[l].size,u=v,q=0,x=0,w=l;w<c.length;w++){var h=c[w].size;h<v&&(v=h);h>u&&(u=h);h=q+h;var D=Math.max(u*t*t/(h*h),h*h/(v*t*t));if(x&&D>x)break;x=D;q=h}v=w;if(.1>q/m)break;t=q/t;q=Math.round(t/n)+1;for(d=l;d<v;d++){l=c[d];u=Math.round(l.size/t/n)+1;if(!a.options.c(l,u-0,q-0))break a;x=null==l.a;w=F(a,l);h=w.style;h.left=B(f);h.width=B(u-0);h.top=B(p);h.height=B(q-0);x&&b.a.appendChild(w);G(a,l,e+1,u,q);f+=u-1}p+=q-1;l=v}}for(;d<c.length&&c[d].a;d++)c[d].a.parentNode.removeChild(c[d].a),
c[d].a=void 0}},H=function(a,b){z(b);var e=F(a,a.node),g=b.offsetWidth,k=b.offsetHeight;e.onclick=function(m){for(var c=m.target;!A(c);)if(c=c.parentElement,!c)return;for(m=[];c&&A(c);){for(var d=0,f=c;f=f.previousElementSibling;)A(f)&&d++;m.unshift(d);c=c.parentElement}m.shift();a.zoom(m)};e.style.width=g+"px";e.style.height=k+"px";b.appendChild(e);G(a,a.node,0,g,k)};
E.prototype.zoom=function(a){var b=this.node,e=y(this.options.padding),g=e.next().value,k=e.next().value,m=e.next().value;e=e.next().value;var c=b.a.offsetWidth,d=b.a.offsetHeight;a=y(a);for(var f=a.next();!f.done;f=a.next()){f=f.value;c-=e+k;d-=g+m;if(!b.children)throw Error("bad address");for(var n=y(b.children),p=n.next();!p.done;p=n.next())p=p.value,p.a&&(p.a.style.zIndex="0");b=b.children[f];f=b.a.style;f.zIndex="1";f.left=B(e-1);f.width=B(c);f.top=B(g-1);f.height=B(d)}G(this,b,0,c,d)};function I(a){return{id:a.name,size:a.data.$area,children:a.children?a.children.map(I):void 0}};window.appendTreemap=function(a,b){H(new E(I(b)),a)};