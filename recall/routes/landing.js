loginController = RouteController.extend({
  layoutTemplate: 'login'
});

HomeController = RouteController.extend({
  layoutTemplate: 'home',
  yieldTemplates: {
    'sidebar': {
      to: 'sidebar'
    },
    'main-content': {
      to: 'main-content'
    },
    'new_conversation': {
      to: 'new_conversation'
    }
  }
});

WriteController = RouteController.extend({
  layoutTemplate: 'write',
  yieldTemplates: {
    'navbar': { to: 'navbar'}
  }
});

ContactsController = RouteController.extend({
  layoutTemplate: 'contacts',
  yieldTemplates: {
    'navbar': { to: 'navbar'}
  }
});

ConversationController = RouteController.extend({
  layoutTemplate: 'conversation',
  yieldTemplates: {
    'navbar': { to: 'navbar'}
  }
});