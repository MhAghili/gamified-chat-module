class MessageParser {
  constructor(actionProvider, state) {
    this.actionProvider = actionProvider;
    this.state = state;
  }

  parse(message) {
    const lowerCaseMessage = message.toLowerCase();
    if (this.state.conversationStage === "initial_greeting") {
      this.actionProvider.handleNameInput(lowerCaseMessage);
    } else {
      this.actionProvider.handleUserQuestion(lowerCaseMessage);
    }
  }
}

export default MessageParser;
