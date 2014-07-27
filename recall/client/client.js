// Reference: https://github.com/dstavis/notdoingnow/blob/master/notdoingnow.js

// Some of these names are placeholders. Please update the template names to reflect the names you choose.
// The references to User will have to be rewritten as actual working code.

if (Meteor.isClient){
  Template.new_conversation.events = {
    'click input.save': function () {
      var new_conversation_title = document.getElementById("new_conversation_title").value;
      var new_conversation = document.getElementById("new_conversation").value;
      console.log('Is this even working?');
      Meteor.call('addConversation', {
        title: new_conversation_title,
        content: new_conversation
      });
    }
  };
}

