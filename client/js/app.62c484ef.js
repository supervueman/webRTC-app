(function(e){function t(t){for(var r,i,s=t[0],u=t[1],l=t[2],p=0,f=[];p<s.length;p++)i=s[p],a[i]&&f.push(a[i][0]),a[i]=0;for(r in u)Object.prototype.hasOwnProperty.call(u,r)&&(e[r]=u[r]);c&&c(t);while(f.length)f.shift()();return o.push.apply(o,l||[]),n()}function n(){for(var e,t=0;t<o.length;t++){for(var n=o[t],r=!0,s=1;s<n.length;s++){var u=n[s];0!==a[u]&&(r=!1)}r&&(o.splice(t--,1),e=i(i.s=n[0]))}return e}var r={},a={app:0},o=[];function i(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.m=e,i.c=r,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)i.d(n,r,function(t){return e[t]}.bind(null,r));return n},i.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="/";var s=window["webpackJsonp"]=window["webpackJsonp"]||[],u=s.push.bind(s);s.push=t,s=s.slice();for(var l=0;l<s.length;l++)t(s[l]);var c=u;o.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"56d7":function(e,t,n){"use strict";n.r(t);n("cadf"),n("551c"),n("097d");var r=n("2b0e"),a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("Toolbar"),n("div",{staticClass:"container"},[n("router-view")],1)],1)},o=[],i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("header",{staticClass:"toolbar"},[n("div",{staticClass:"container d-flex content-end"},[e.profile?e._e():n("a",{staticClass:"btn flat",on:{click:function(t){e.isSignIn=!0,e.isSignUp=!1}}},[e._v("Sign In")]),e.profile?e._e():n("a",{staticClass:"btn flat",on:{click:function(t){e.isSignIn=!1,e.isSignUp=!0}}},[e._v("Sign Up")]),e.profile?n("a",{staticClass:"btn flat",on:{click:e.logout}},[e._v("Logout")]):e._e()])])},s=[],u={name:"toolbar",computed:{profile:function(){return this.$store.getters.getProfile}},methods:{logout:function(){this.$store.dispatch("logout")}}},l=u,c=n("0c7c"),p=Object(c["a"])(l,i,s,!1,null,null,null);p.options.__file="Toolbar.vue";var f=p.exports,d={name:"app",components:{Toolbar:f},beforeCreate:function(){this.$store.dispatch("fetchProfile")}},m=d,h=Object(c["a"])(m,a,o,!1,null,null,null);h.options.__file="App.vue";var v=h.exports,g=n("8c4f"),w=function(){var e=this,t=e.$createElement,n=e._self._c||t;return e.profile?e._e():n("section",{staticClass:"main-sect"},[e.isSignUp?n("div",{staticClass:"sign-up",attrs:{id:"auth"}},[n("h1",{staticClass:"h1"},[e._v("Registration")]),n("div",{staticClass:"form-group"},[n("input",{directives:[{name:"model",rawName:"v-model",value:e.email,expression:"email"}],attrs:{type:"text",name:"email",placeholder:"email"},domProps:{value:e.email},on:{input:function(t){t.target.composing||(e.email=t.target.value)}}})]),n("div",{staticClass:"form-group"},[n("input",{directives:[{name:"model",rawName:"v-model",value:e.password,expression:"password"}],attrs:{type:"text",name:"password",placeholder:"password"},domProps:{value:e.password},on:{input:function(t){t.target.composing||(e.password=t.target.value)}}})]),n("button",{staticClass:"btn",on:{click:e.signUp}},[e._v("Sign Up")])]):e._e(),e.isSignIn?n("div",{staticClass:"sign-in",attrs:{id:"auth"}},[n("h1",{staticClass:"h1"},[e._v("Login")]),n("div",{staticClass:"form-group"},[n("input",{directives:[{name:"model",rawName:"v-model",value:e.email,expression:"email"}],attrs:{type:"text",name:"email",placeholder:"email"},domProps:{value:e.email},on:{input:function(t){t.target.composing||(e.email=t.target.value)}}})]),n("div",{staticClass:"form-group"},[n("input",{directives:[{name:"model",rawName:"v-model",value:e.password,expression:"password"}],attrs:{type:"text",name:"password",placeholder:"password"},domProps:{value:e.password},on:{input:function(t){t.target.composing||(e.password=t.target.value)}}})]),n("button",{staticClass:"btn",on:{click:e.signIn}},[e._v("Sign In")])]):e._e()])},b=[],_={name:"auth",data:function(){return{password:"",email:"",isSignIn:!0,isSignUp:!1}},computed:{profile:function(){return this.$store.getters.getProfile}},methods:{signUp:function(){var e={password:this.password,email:this.email};this.$store.dispatch("signUp",e)},signIn:function(){var e={password:this.password,email:this.email};this.$store.dispatch("signIn",e)}}},x=_,y=Object(c["a"])(x,w,b,!1,null,null,null);y.options.__file="Auth.vue";var P=y.exports,S=function(){var e=this,t=e.$createElement,n=e._self._c||t;return e.profile?n("section",{staticClass:"main-sect"},[n("h1",{staticClass:"h1"},[e._v("Hello "+e._s(e.profile.email))])]):e._e()},C=[],O={name:"profile",computed:{profile:function(){return this.$store.getters.getProfile}}},k=O,j=Object(c["a"])(k,S,C,!1,null,null,null);j.options.__file="Profile.vue";var I=j.exports;r["a"].use(g["a"]);var R=new g["a"]({routes:[{path:"/",name:"authRoute",component:P},{path:"/profile",name:"profileRoute",component:I}],mode:"history"}),$=(n("96cf"),n("3b8d")),U=n("2f62"),T=n("bc3a"),E=n.n(T);r["a"].use(U["a"]);var M=new U["a"].Store({state:{profile:null},mutations:{setProfile:function(e,t){e.profile=t}},actions:{signUp:function(){var e=Object($["a"])(regeneratorRuntime.mark(function e(t,n){return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return t.commit,e.next=3,E()({method:"POST",data:n,url:"/user/signup"}).catch(function(e){});case 3:case"end":return e.stop()}},e,this)}));function t(t,n){return e.apply(this,arguments)}return t}(),signIn:function(){var e=Object($["a"])(regeneratorRuntime.mark(function e(t,n){var r;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return t.commit,e.next=3,E()({method:"POST",data:n,url:"/user/signin"}).catch(function(e){});case 3:r=e.sent,localStorage.setItem("access_token",r.data.token),this.dispatch("fetchProfile");case 6:case"end":return e.stop()}},e,this)}));function t(t,n){return e.apply(this,arguments)}return t}(),fetchProfile:function(){var e=Object($["a"])(regeneratorRuntime.mark(function e(t){var n,r;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n=t.commit,e.next=3,E()({method:"GET",url:"/user/profile",headers:{"x-access-token":localStorage.getItem("access_token")}}).catch(function(e){});case 3:r=e.sent,r&&200===r.status&&(n("setProfile",r.data),R.push("/profile"));case 5:case"end":return e.stop()}},e,this)}));function t(t){return e.apply(this,arguments)}return t}(),logout:function(){var e=Object($["a"])(regeneratorRuntime.mark(function e(t){var n,r;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n=t.commit,e.next=3,E()({method:"GET",url:"/user/logout"}).catch(function(e){});case 3:r=e.sent,r&&200===r.status&&(localStorage.setItem("access_token",r.data.token),n("setProfile",null),R.push("/"));case 5:case"end":return e.stop()}},e,this)}));function t(t){return e.apply(this,arguments)}return t}()},getters:{getProfile:function(e){return e.profile}}});n("a058");r["a"].config.productionTip=!1;var N="/";E.a.defaults.baseURL=N,new r["a"]({router:R,store:M,render:function(e){return e(v)}}).$mount("#app")},a058:function(e,t,n){}});