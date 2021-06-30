import { User } from "./manage";
import { Message } from "./message";

/** This object represents a custom keyboard with reply options (see Introduction to bots for details and examples). */
export interface ReplyKeyboardMarkup {
  /** Array of button rows, each represented by an Array of KeyboardButton objects */
  keyboard: KeyboardButton[][];
  /** Requests clients to resize the keyboard vertically for optimal fit (e.g., make the keyboard smaller if there are just two rows of buttons). Defaults to false, in which case the custom keyboard is always of the same height as the app's standard keyboard. */
  resize_keyboard?: boolean;
  /** Requests clients to hide the keyboard as soon as it's been used. The keyboard will still be available, but clients will automatically display the usual letter-keyboard in the chat – the user can press a special button in the input field to see the custom keyboard again. Defaults to false. */
  one_time_keyboard?: boolean;
  /** The placeholder to be shown in the input field when the keyboard is active; 1-64 characters */
  input_field_placeholder?: string;
  /** Use this parameter if you want to show the keyboard to specific users only. Targets: 1) users that are @mentioned in the text of the Message object; 2) if the bot's message is a reply (has reply_to_message_id), sender of the original message.

  Example: A user requests to change the bot's language, bot replies to the request with a keyboard to select the new language. Other users in the group don't see the keyboard. */
  selective?: boolean;
}

export namespace KeyboardButton {
  export interface CommonButton {
    /** Text of the button. If none of the optional fields are used, it will be sent as a message when the button is pressed */
    text: string;
  }
  export interface RequestContactButton extends CommonButton {
    /** If True, the user's phone number will be sent as a contact when the button is pressed. Available in private chats only */
    request_contact: boolean;
  }
  export interface RequestLocationButton extends CommonButton {
    /** If True, the user's current location will be sent when the button is pressed. Available in private chats only */
    request_location: boolean;
  }
  export interface RequestPollButton extends CommonButton {
    /** If specified, the user will be asked to create a poll and send it to the bot when the button is pressed. Available in private chats only */
    request_poll: KeyboardButtonPollType;
  }
}

/** This object represents one button of the reply keyboard. For simple text buttons String can be used instead of this object to specify text of the button. Optional fields request_contact, request_location, and request_poll are mutually exclusive. */
export type KeyboardButton =
  | KeyboardButton.CommonButton
  | KeyboardButton.RequestContactButton
  | KeyboardButton.RequestLocationButton
  | KeyboardButton.RequestPollButton
  | string;

/** This object represents type of a poll, which is allowed to be created and sent when the corresponding button is pressed. */
export interface KeyboardButtonPollType {
  /** If quiz is passed, the user will be allowed to create only polls in the quiz mode. If regular is passed, only regular polls will be allowed. Otherwise, the user will be allowed to create a poll of any type. */
  type?: "quiz" | "regular";
}

/** Upon receiving a message with this object, Telegram clients will remove the current custom keyboard and display the default letter-keyboard. By default, custom keyboards are displayed until a new keyboard is sent by a bot. An exception is made for one-time keyboards that are hidden immediately after the user presses a button (see ReplyKeyboardMarkup). */
export interface ReplyKeyboardRemove {
  /** Requests clients to remove the custom keyboard (user will not be able to summon this keyboard; if you want to hide the keyboard from sight but keep it accessible, use one_time_keyboard in ReplyKeyboardMarkup) */
  remove_keyboard: true;
  /** Use this parameter if you want to remove the keyboard for specific users only. Targets: 1) users that are @mentioned in the text of the Message object; 2) if the bot's message is a reply (has reply_to_message_id), sender of the original message.

  Example: A user votes in a poll, bot returns confirmation message in reply to the vote and removes the keyboard for that user, while still showing the keyboard with poll options to users who haven't voted yet. */
  selective?: boolean;
}

export namespace CallbackQuery {
  interface AbstractCallbackQuery {
    /** Unique identifier for this query */
    id: string;
    /** Sender */
    from: User;
    /** Message with the callback button that originated the query. Note that message content and message date will not be available if the message is too old */
    message?: Message;
    /** Identifier of the message sent via the bot in inline mode, that originated the query. */
    inline_message_id?: string;
    /** Global identifier, uniquely corresponding to the chat to which the message with the callback button was sent. Useful for high scores in games. */
    chat_instance: string;
  }
  export interface DataCallbackQuery extends AbstractCallbackQuery {
    /** Data associated with the callback button. Be aware that a bad client can send arbitrary data in this field. */
    data: string;
  }
  export interface GameShortGameCallbackQuery extends AbstractCallbackQuery {
    /** Short name of a Game to be returned, serves as the unique identifier for the game */
    game_short_name: string;
  }
}

/** This object represents an incoming callback query from a callback button in an inline keyboard. If the button that originated the query was attached to a message sent by the bot, the field message will be present. If the button was attached to a message sent via the bot (in inline mode), the field inline_message_id will be present. Exactly one of the fields data or game_short_name will be present.

NOTE: After the user presses a callback button, Telegram clients will display a progress bar until you call answerCallbackQuery. It is, therefore, necessary to react by calling answerCallbackQuery even if no notification to the user is needed (e.g., without specifying any of the optional parameters). */
export type CallbackQuery =
  | CallbackQuery.DataCallbackQuery
  | CallbackQuery.GameShortGameCallbackQuery;

/** Upon receiving a message with this object, Telegram clients will display a reply interface to the user (act as if the user has selected the bot's message and tapped 'Reply'). This can be extremely useful if you want to create user-friendly step-by-step interfaces without having to sacrifice privacy mode.

Example: A poll bot for groups runs in privacy mode (only receives commands, replies to its messages and mentions). There could be two ways to create a new poll:

Explain the user how to send a command with parameters (e.g. /newpoll question answer1 answer2). May be appealing for hardcore users but lacks modern day polish.

Guide the user through a step-by-step process. 'Please send me your question', 'Cool, now let's add the first answer option', 'Great. Keep adding answer options, then send /done when you're ready'.

The last option is definitely more attractive. And if you use ForceReply in your bot's questions, it will receive the user's answers even if it only receives replies, commands and mentions — without any extra work for the user. */
export interface ForceReply {
  /** Shows reply interface to the user, as if they manually selected the bot's message and tapped 'Reply' */
  force_reply: true;
  /** The placeholder to be shown in the input field when the reply is active; 1-64 characters */
  input_field_placeholder?: string;
  /** Use this parameter if you want to force reply from specific users only. Targets: 1) users that are @mentioned in the text of the Message object; 2) if the bot's message is a reply (has reply_to_message_id), sender of the original message. */
  selective?: boolean;
}
