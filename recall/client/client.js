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

