(this.webpackJsonppuhelinluettelo=this.webpackJsonppuhelinluettelo||[]).push([[0],{21:function(e,n,t){},22:function(e,n,t){},40:function(e,n,t){"use strict";t.r(n);var c=t(0),o=t(2),r=t.n(o),i=t(15),a=t.n(i),u=(t(21),t(6)),s=t(4),l=(t(22),t(3)),d=t.n(l),b="https://powerful-coast-67055.herokuapp.com/api/persons",j=function(){return d.a.get(b)},f=function(e){return d.a.post(b,e)},m=function(e,n){return d.a.put("".concat(b,"/").concat(e),n)},h=function(e){return d.a.delete("".concat(b,"/").concat(e)).then((function(e){return e.data}))},O=function(e){return Object(c.jsxs)("div",{children:[Object(c.jsx)("p",{children:"name:"})," ",Object(c.jsx)("input",{value:e.newName,onChange:e.handleNameChange}),Object(c.jsx)("p",{children:"number:"})," ",Object(c.jsx)("input",{value:e.newNumber,onChange:e.handleNumberChange}),Object(c.jsx)("button",{onClick:e.addInformation,type:"submit",children:"add"})]})},p=function(e){var n=e.message;return null===n?null:Object(c.jsx)("div",{className:"notification",children:n})},g=function(e){var n=e.person,t=e.msg,o=e.persons;return Object(c.jsxs)("tr",{children:[Object(c.jsx)("td",{children:n.name}),Object(c.jsx)("td",{children:n.number}),Object(c.jsx)("td",{children:Object(c.jsx)("button",{onClick:function(){window.confirm("Delete ".concat(n.name," ?"))&&(o.includes(n)&&(h(n.id),console.log("Person deleted.")),t("".concat(n.name," deleted.")),setTimeout((function(){t(null)}),2500))},type:"submit",children:"delete"})})]})},x=function(e){var n=e.setPersons,t=e.persons,r=e.setNewMessage;return Object(o.useEffect)((function(){console.log("effect"),j().then((function(e){console.log("promise fulfilled"),n(e.data)}))}),[]),console.log("render",t.length,"notes"),Object(c.jsx)("table",{children:Object(c.jsx)("tbody",{children:t.map((function(e){return Object(c.jsx)(g,{person:e,msg:r,persons:t},e.name)}))})})},v=function(){var e=Object(o.useState)([]),n=Object(s.a)(e,2),t=n[0],r=n[1],i=Object(o.useState)(""),a=Object(s.a)(i,2),l=a[0],d=a[1],b=Object(o.useState)(""),j=Object(s.a)(b,2),g=j[0],v=j[1],w=Object(o.useState)(null),N=Object(s.a)(w,2),C=N[0],k=N[1];return Object(c.jsxs)("div",{children:[Object(c.jsx)("h2",{children:"Phonebook"}),Object(c.jsx)(p,{message:C}),Object(c.jsx)("form",{children:Object(c.jsx)(O,{handleNumberChange:function(e){v(e.target.value)},newNumber:g,handleNameChange:function(e){d(e.target.value)},newName:l,addInformation:function(e){e.preventDefault();var n={name:l,number:g},c=t.find((function(e){return e.name===l}));void 0!==c&&""!==g?window.confirm("".concat(l," is already added to phonebook, replace the old number with a new one?"))&&function(e){var n=t.find((function(n){return n.id===e})),c=Object(u.a)(Object(u.a)({},n),{},{number:g});m(Number(n.id),c).then((function(e){return e.data})).then((function(n){r(t.map((function(t){return Number(t.id)!==Number(e)?t:n.data})))})).catch((function(n){k("Information of '".concat(c.name,"' has already been removed from server")),setTimeout((function(){k(null)}),4e3),r(t.filter((function(n){return Number(n.id)!==Number(e)})))}))}(c.id):""!==l&&""!==g&&(r(t.concat(n)),d(""),v(""),k("Lis\xe4ttiin ".concat(l)),setTimeout((function(){k(null)}),2500),f(n).then((function(e){console.log(e)})))}})}),Object(c.jsx)("h2",{children:"Numbers"}),Object(c.jsx)(x,{persons:t,setPersons:r,setNewMessage:k}),Object(c.jsx)("button",{onClick:function(){if(window.confirm("Delete all the names?")){for(var e=0;e<t.length;e++){var n=t[e];h(n.id)}console.log("Persons deleted.")}},type:"submit",children:"delete all"})]})},w=function(e){e&&e instanceof Function&&t.e(3).then(t.bind(null,41)).then((function(n){var t=n.getCLS,c=n.getFID,o=n.getFCP,r=n.getLCP,i=n.getTTFB;t(e),c(e),o(e),r(e),i(e)}))};a.a.render(Object(c.jsx)(r.a.StrictMode,{children:Object(c.jsx)(v,{})}),document.getElementById("root")),w()}},[[40,1,2]]]);
//# sourceMappingURL=main.e6617cd1.chunk.js.map