import EmberRouter from '@ember/routing/router';
import config from 'training2/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function() {
  this.route('registration',{path:'/registration'});
  this.route('authenticated', { path: '/auth' }, function() {
    // all routes that require the session to be authenticated
  });


  this.route('home', {path:'/'});

});
