Router.map(function(){
  this.route('login', {
    path: '/',
    redirectOnLogin: true
  });
  this.route('home', {
    path: '/home',
    loginRequired: 'login'
  });
  this.route('dossier', {
    path: '/dossier',
    loginRequired: 'login'
  });
  this.route('contact', {
    path: '/contacts/:name',
    data: function() {
      return Contacts.findOne(this.params._id); 
    },
    loginRequired: 'login'
  });
  this.route('contact', {
    path: '/contacts/',
    data: function() {
      return Contacts.find().fetch();
    },
    loginRequired: 'login'
  });
  this.route('conversation', {
    path: '/conversations/:_id',
    data: function() {
      return Conversations.findOne(this.params._id);
    },
    loginRequired: 'login'
  });
});

var mustBeSignedIn = function(pause) {
  if (!(Meteor.user() || Meteor.loggingIn())) {
    Router.go('login');
    pause();
  }
};

var goToDashboard = function(pause) {
  if (Meteor.user()) {
    Router.go('home');
    pause();
  }
};

Router.onBeforeAction(mustBeSignedIn, {except: ['login']});
Router.onBeforeAction(goToDashboard, {only: ['login']});