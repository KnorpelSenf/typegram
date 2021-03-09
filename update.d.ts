import { CallbackQuery } from "./callback";
import { Close } from "./close";
import { ChosenInlineResult, InlineQuery } from "./inline";
import { Chat, ChatMemberUpdated, User } from "./manage";
import { Message, Poll, PollAnswer } from "./message";
import { PreCheckoutQuery, ShippingQuery } from "./payment";

export namespace Update {
  /** Internal type holding properties that updates in channels share. */
  export interface Channel {
    chat: Chat.ChannelChat;
    author_signature?: string;
    from?: never;
  }
  /** Internal type holding properties that updates outside of channels share. */
  export interface NonChannel {
    chat: Exclude<Chat, Chat.ChannelChat>;
    author_signature?: never;
    from: User;
  }
  /** Internal type holding properties that updates about new messages share. */
  export interface New {
    edit_date?: never;
  }
  /** Internal type holding properties that updates about edited messages share. */
  export interface Edited {
    /** Date the message was last edited in Unix time */
    edit_date: number;
    forward_from?: never;
    forward_from_chat?: never;
    forward_from_message_id?: never;
    forward_signature?: never;
    forward_sender_name?: never;
    forward_date?: never;
  }

  interface AbstractUpdate {
    /** The update's unique identifier. Update identifiers start from a certain positive number and increase sequentially. This ID becomes especially handy if you're using Webhooks, since it allows you to ignore repeated updates or to restore the correct update sequence, should they get out of order. If there are no new updates for at least a week, then identifier of the next update will be chosen randomly instead of sequentially. */
    update_id: number;
  }
  export interface MessageUpdate extends AbstractUpdate {
    /** New incoming message of any kind — text, photo, sticker, etc. */
    message: Message & New & NonChannel;
  }
  export interface EditedMessageUpdate extends AbstractUpdate {
    /** New version of a message that is known to the bot and was edited */
    edited_message: Message & Edited & NonChannel;
  }
  export interface ChannelPostUpdate extends AbstractUpdate {
    /** New incoming channel post of any kind — text, photo, sticker, etc. */
    channel_post: Message & New & Channel;
  }
  export interface EditedChannelPostUpdate extends AbstractUpdate {
    /** New version of a channel post that is known to the bot and was edited */
    edited_channel_post: Message & Edited & Channel;
  }
  export interface InlineQueryUpdate extends AbstractUpdate {
    /** New incoming inline query */
    inline_query: InlineQuery;
  }
  export interface ChosenInlineResultUpdate extends AbstractUpdate {
    /** The result of an inline query that was chosen by a user and sent to their chat partner. Please see our documentation on the feedback collecting for details on how to enable these updates for your bot. */
    chosen_inline_result: ChosenInlineResult;
  }
  export interface CallbackQueryUpdate extends AbstractUpdate {
    /** New incoming callback query */
    callback_query: CallbackQuery;
  }
  export interface ShippingQueryUpdate extends AbstractUpdate {
    /** New incoming shipping query. Only for invoices with flexible price */
    shipping_query: ShippingQuery;
  }
  export interface PreCheckoutQueryUpdate extends AbstractUpdate {
    /** New incoming pre-checkout query. Contains full information about checkout */
    pre_checkout_query: PreCheckoutQuery;
  }
  export interface PollUpdate extends AbstractUpdate {
    /** New poll state. Bots receive only updates about stopped polls and polls, which are sent by the bot */
    poll: Poll;
  }
  export interface PollAnswerUpdate extends AbstractUpdate {
    /** A user changed their answer in a non-anonymous poll. Bots receive new votes only in polls that were sent by the bot itself. */
    poll_answer: PollAnswer;
  }
  export interface MyChatMemberUpdate extends AbstractUpdate {
    /** The bot's chat member status was updated in a chat. For private chats, this update is received only when the bot is blocked or unblocked by the user. */
    my_chat_member: ChatMemberUpdated;
  }
  export interface ChatMemberUpdate extends AbstractUpdate {
    /** A chat member's status was updated in a chat. The bot must be an administrator in the chat and must explicitly specify “chat_member” in the list of allowed_updates to receive these updates. */
    chat_member: ChatMemberUpdated;
  }
}

export type Update = Close<
  | Update.CallbackQueryUpdate
  | Update.ChannelPostUpdate
  | Update.ChatMemberUpdate
  | Update.ChosenInlineResultUpdate
  | Update.EditedChannelPostUpdate
  | Update.EditedMessageUpdate
  | Update.InlineQueryUpdate
  | Update.MessageUpdate
  | Update.MyChatMemberUpdate
  | Update.PreCheckoutQueryUpdate
  | Update.PollAnswerUpdate
  | Update.PollUpdate
  | Update.ShippingQueryUpdate
>;