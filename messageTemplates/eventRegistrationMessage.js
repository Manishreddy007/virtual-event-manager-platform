const eventRegistrationMessage = (username, eventName, eventDate, eventTime) => {
    return `
  Hi ${username},
  
  You're all set! 🎉  
  You've successfully registered for ${eventName} happening on ${eventDate} at ${eventTime}.

  🗓 Date: ${eventDate}  
  ⏰ Time: ${eventTime}
  
  Cheers,  
  The EventHive Team
    `;
  };

  module.exports = {eventRegistrationMessage}