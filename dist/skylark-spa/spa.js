/**
 * skylark-spa - An Elegant  HTML5 Single Page Application Framework.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["skylark-langx/skylark","skylark-langx/langx","skylark-router/router"],function(t,n,e){function r(t,e){var r=new CustomEvent(t,e);return n.safeMixin(r,e)}var i,o=n.Deferred,a=e.Route=e.Route.inherit({klassName:"SpaRoute",init:function(t,e){this.overrided(t,e),this.content=e.content,this.data=e.data;var r=this;["preparing","rendering","rendered"].forEach(function(t){n.isFunction(e[t])&&r.on(t,e[t])})},_entering:function(t){return this._prepared?this:this.prepare()},getConfigData:function(t){return t?this.data[t]:this.data},prepare:function(){var t=new o,n=this._setting,i=n.controller,a=this.controller,u=this;n.content,n.contentPath;return i&&!a?require([i.type],function(n){a=u.controller=new n(i),t.resolve()}):t.resolve(),t.then(function(){var t=r("preparing",{route:u,result:!0});return u.trigger(t),o.when(t.result).then(function(){e.trigger(r("prepared",{route:u})),u._prepared=!0})})},render:function(t){var n=r("rendering",{route:this,context:t,content:this.content});return this.trigger(n),n.content},trigger:function(t){var n=this.controller;return n?n.perform(t):this.overrided(t)}}),u=n.Evented.inherit({klassName:"SpaRouteController",init:function(t,n){n=n||{},this.content=n.content,this.data=n.data},getConfigData:function(t){return t?this.data[t]:this.data},perform:function(t){var n=t.type;if(this[n])return this[n].call(this,t)}}),s=n.Evented.inherit({klassName:"SpaPage",init:function(t){t=n.mixin({routeViewer:"body"},t),this._params=t,this._rvc=document.querySelector(t.routeViewer),this._router=e,e.on("routing",n.proxy(this,"refresh"))},prepare:function(){},refresh:function(){var t=e.current(),r=(e.previous(),t.route.render(t));n.isString(r)?this._rvc.innerHTML=r:(this._rvc.innerHTML="",this._rvc.appendChild(r))}}),h=n.Evented.inherit({klassName:"SpaPlugin",init:function(t,n){this.name=t,this._setting=n},prepare:function(){var t=new o,i=this._setting,a=i.controller,u=this.controller,s=this;return a&&!u?require([a.type],function(r){u=s.controller=new r(a),e.on(i.hookers,{plugin:s},n.proxy(u.perform,u)),t.resolve()}):(n.each(i.hookers,function(t,n){e.on(t,{plugin:s},n)}),t.resolve()),t.then(function(){var t=r("preparing",{result:!0});return s.trigger(t),o.when(t.result).then(function(){s._prepared=!0})})}}),c=n.Evented.inherit({klassName:"SpaPluginController",init:function(t){this.plugin=t},perform:function(t){var n=t.type;if(this[n])return this[n].call(this,t)}}),l=n.Evented.inherit({klassName:"SpaApplication",init:function(t){if(i)return i;var r=this._plugins={};t=this._config=n.mixin({plugins:{}},t,!0),n.each(t.plugins,function(t,n){r[t]=new h(t,n)}),e.routes(t.routes),this._router=e,this._page=new p.Page(t.page),document.title=t.title;var o=t.baseUrl;void 0===o&&(o=t.baseUrl=document.location.pathname),e.baseUrl(o),t.homePath&&e.homePath(t.homePath),i=this},getConfig:function(t){return t?this._config[t]:this._config},go:function(t){return e.go(t),this},page:function(){return this._page},prepare:function(){var t=this,i=n.map(e.routes(),function(t,n){if(t.lazy===!1)return t.prepare()}),a=n.map(this._plugins,function(t,n){return t.prepare()});return o.all(i.concat(a)).then(function(){return e.trigger(r("starting",{spa:t}))})},run:function(){this._router.start()}}),p=function(t){return i||(window[t.name||"app"]=i=new p.Application(t)),i};return n.mixin(p,{Application:l,Page:s,Plugin:h,PluginController:c,Route:a,RouteController:u}),t.spa=p});
//# sourceMappingURL=sourcemaps/spa.js.map
