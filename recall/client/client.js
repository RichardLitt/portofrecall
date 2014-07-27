// Reference: https://github.com/dstavis/notdoingnow/blob/master/notdoingnow.js

// Some of these names are placeholders. Please update the template names to reflect the names you choose.
// The references to User will have to be rewritten as actual working code.

if (Meteor.isClient){
  Template.conversationTemplateName.helpers({
    conversation: function(){
      return Conversations.find(User.id)
    }
  })
}