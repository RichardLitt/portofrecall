
loginController = RouteController.extend({
  layoutTemplate: 'login'
});

HomeController = RouteController.extend({
  layoutTemplate: 'home',
  yieldTemplates: {
    'sidebar'         : {to: 'sidebar'},
    'main-content'    : {to: 'content'},
    'new_conversation': {to: 'new_conversation'}
  }
});

DossierController = RouteController.extend({
  layoutTemplate: 'home',
  yieldTemplates: {
    'sidebar': {to: 'sidebar'},
    'dossier': {to: 'content'}
  }
});

ContactController = RouteController.extend({
  layoutTemplate: 'home',
  yieldTemplates: {
    'sidebar': {to: 'sidebar'},
    'contact': {to: 'content'}
  }
});

ConnectionsController = RouteController.extend({
  layoutTemplate: 'home',
  yieldTemplates: {
    'sidebar': {to: 'sidebar'},
    'connections': {to: 'content'}
  }
});

ConversationController = RouteController.extend({
  layoutTemplate: 'home',
  yieldTemplates: {
    'sidebar'             : {to: 'sidebar'},
    'conversation_content': {to: 'content'}
  }
});