(this["webpackJsonpmy-app"]=this["webpackJsonpmy-app"]||[]).push([[0],{100:function(e,t,n){"use strict";n.r(t);var c=n(6),i=n(0),s=n.n(i),a=n(39),l=n.n(a),o=(n(93),n(94),n(10)),r=n(36),d=n(147),u=n(2),j=n(144),m=n(21),b=n(33),h=n(40),v=function e(){Object(h.a)(this,e)};v.Users="".concat(v.Endpoint="https://jsonplaceholder.typicode.com","/users");var O=function(){var e=Object(i.useState)([]),t=Object(r.a)(e,2),n=t[0],s=t[1],a=[{minWidth:200,key:"name",name:"Name",onRender:function(e){return Object(c.jsx)(d.a,{size:u.c.size24,text:null===e||void 0===e?void 0:e.name})}},{minWidth:200,key:"email",name:"Email",fieldName:"email"},{minWidth:200,key:"website",name:"Website",fieldName:"website"},{minWidth:200,key:"address",name:"Address",onRender:function(e){return"".concat(null===e||void 0===e?void 0:e.address.street," ").concat(null===e||void 0===e?void 0:e.address.suite)}},{minWidth:100,key:"edit",name:"",onRender:function(e){return Object(c.jsxs)(b.b,{to:"/users/".concat(null===e||void 0===e?void 0:e.id,"/edit"),children:["Edit ",null===e||void 0===e?void 0:e.id]})},className:"ms-textAlignCenter"}];Object(i.useEffect)((function(){l()}));var l=function(){fetch(v.Users).then((function(e){return e.json()})).then((function(e){s(e),console.log(e)}))};return Object(c.jsx)(j.a,{items:n,columns:a,selectionMode:m.b.none})},f=n(71),p=n(74),x=n(73),y=function(e){Object(p.a)(n,e);var t=Object(x.a)(n);function n(){return Object(h.a)(this,n),t.apply(this,arguments)}return Object(f.a)(n,[{key:"render",value:function(){return Object(c.jsx)("h1",{children:"Home"})}}]),n}(s.a.Component),g=n(146),k=n(152),N=n(145),C=(n(99),n(150)),E=n(148),W=function(e){var t=Object(i.useState)(),n=Object(r.a)(t,2),s=n[0],a=n[1],l=Object(i.useState)(),o=Object(r.a)(l,2),d=o[0],u=o[1];return Object(i.useEffect)((function(){a(parseInt(e.match.params.id,0)),fetch("".concat(v.Users,"/").concat(s)).then((function(e){return e.json()})).then((function(e){u(e)}))})),Object(c.jsx)("div",{children:Object(c.jsxs)(C.a,{tokens:{childrenGap:15},children:[Object(c.jsx)(E.a,{label:"Name",value:null===d||void 0===d?void 0:d.name}),Object(c.jsx)(E.a,{label:"Username",value:null===d||void 0===d?void 0:d.username}),Object(c.jsx)(E.a,{label:"Email",value:null===d||void 0===d?void 0:d.email,type:"email"}),Object(c.jsx)(E.a,{label:"Phone",value:null===d||void 0===d?void 0:d.phone,type:"tel"}),Object(c.jsx)(E.a,{label:"Website",value:null===d||void 0===d?void 0:d.website,type:"url"})]})})};var w=Object(o.g)((function(){var e=Object(o.f)(),t=function(t,n){null===t||void 0===t||t.preventDefault(),e.push(n.url)},n=[{links:[{name:"Home",url:"/",onClick:t},{name:"Users",url:"/users",onClick:t}]}];return Object(g.a)(),Object(c.jsx)(k.a,{children:Object(c.jsx)("div",{className:"ms-Grid",dir:"ltr",children:Object(c.jsxs)("div",{className:"ms-Grid-row",children:[Object(c.jsx)("div",{className:"ms-Grid-col ms-sm6 ms-md4 ms-lg2",children:Object(c.jsx)(N.a,{groups:n})}),Object(c.jsx)("div",{className:"ms-Grid-col ms-sm6 ms-md8 ms-lg10",children:Object(c.jsxs)(o.c,{children:[Object(c.jsx)(o.a,{path:"/users/:id/edit",component:W}),Object(c.jsx)(o.a,{path:"/users",exact:!0,children:Object(c.jsx)(O,{})}),Object(c.jsx)(o.a,{path:"/",exact:!0,children:Object(c.jsx)(y,{})})]})})]})})})})),G=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,160)).then((function(t){var n=t.getCLS,c=t.getFID,i=t.getFCP,s=t.getLCP,a=t.getTTFB;n(e),c(e),i(e),s(e),a(e)}))};l.a.render(Object(c.jsx)(s.a.StrictMode,{children:Object(c.jsx)(b.a,{children:Object(c.jsx)(w,{})})}),document.getElementById("root")),G()},93:function(e,t,n){},94:function(e,t,n){}},[[100,1,2]]]);
//# sourceMappingURL=main.07dc90d5.chunk.js.map