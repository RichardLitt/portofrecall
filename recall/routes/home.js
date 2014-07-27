HomeController = RouteController.extend({
  layoutTemplate: 'home',
  yieldTemplates: {
    'splash': {
      to: 'content'
    },
    'navbar': {
      to: 'navbar'
    }
  }
})