Router.configure({
  loadingTemplate: 'loading'
})

Router.map(function(){
  this.route('login', {
    path: '/',
    redirectOnLogin: true
  });
  this.route('home', {
    path: '/home',
    loginRequired: 'login'
  });
  this.route('contact', {
    path: '/contact/:_id',
    loginRequired: 'login',
    waitOn: function() { return Meteor.subscribe('contacts')},
    data: function() {
      return Contacts.findOne(this.params._id);
    }
  });
  this.route('connections', {
    path: '/connections/',
    loginRequired: 'login',
    waitOn: function() { return Meteor.subscribe('contacts')},
    data: function() {
      return Contacts.find().fetch();
    }
  });
  this.route('dossier', {
    path: '/dossier',
    loginRequired: 'login'
  });
  this.route('conversation', {
    path: '/conversations/:_id',
    loginRequired: 'login',
    waitOn: function() { return Meteor.subscribe('conversations', this.params._id)},
    data: function() {
      console.log(Conversations.findOne(this.params._id));
      return Conversations.findOne(this.params._id);
    }
  });
  this.route('*', {
    action: function() {
      Router.go('home');
    }
  })
});

var mustBeSignedIn = function(pause) {
  if (!(Meteor.user() || Meteor.loggingIn())) {
    Router.go('login');
    //pause();
  }
};

var goToDashboard = function(pause) {
  if (Meteor.user()) {
    Router.go('home');
    //pause();
  }
};

Router.onBeforeAction(mustBeSignedIn, {except: ['login']});
Router.onBeforeAction(goToDashboard, {only: ['login']});