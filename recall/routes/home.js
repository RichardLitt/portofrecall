HomeController = RouteController.extend({
  layoutTemplate: 'home',
  yieldTemplates: {
    'splash': {
      to: 'content'
    }
  }
})