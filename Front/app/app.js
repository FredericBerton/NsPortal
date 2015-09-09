
define(['marionette', 'backbone', 'moment', './base/rootView/lyt-rootview', 'router', 'controller', 'config'],
function(Marionette, Backbone, moment, Lyt_rootview, Router, Controller, config) {


	var app = {}, JST = window.JST = window.JST || {};

	Backbone.Marionette.Renderer.render = function(template, data){
		if (!JST[template]) throw "Template '" + template + "' not found!";
		return JST[template](data);
	};

	app = new Marionette.Application();


	app.on('start', function() {
		var _this = this;
		var Patern = Backbone.Model.extend({
			urlRoot : config.infosUrl,
		});

		var model = new Patern();
		model.fetch({
			success: function(){
				console.log('success')
				app.rootView = new Lyt_rootview();
				app.rootView.render();
				app.controller = new Controller({app : app});
				app.router = new Router({controller: app.controller, app: app});
				app.user = new Backbone.Model({
					user: 'Admin User',
				});
				app.siteInfo = model;
				Backbone.history.start();
				console.log(model);
			},
			error: function(){
				//TODO : choose the default behavior
			},
		});
	});


	$( document ).ajaxStart(function(e) {
		$('#header-loader').removeClass('hidden');
	});
	$( document ).ajaxStop(function() {
		$('#header-loader').addClass('hidden');
	});

	window.app = app;
	return app;
});
