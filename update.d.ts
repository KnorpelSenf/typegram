import { CallbackQuery } from "./callback";
import { ChosenInlineResult, InlineQuery } from "./inline";
import { Chat, User } from "./manage";
import { Message, Poll, PollAnswer } from "./message";
import { PreCheckoutQuery, ShippingQuery } from "./payment";

export namespace Update {
  /** Internal type holding properties that updates in channels share. */
  interface Channel {
    chat: Chat.ChannelChat;
    author_signature?: string;
    from?: never;
  }
  /** Internal type holding properties that updates outside of channels share. */
  interface NonChannel {
    chat: Exclude<Chat, Chat.ChannelChat>;
    author_signature?: never;
    from: User;
  }
  /** Internal type holding properties that updates about new messages share. */
  interface New {
    edit_date?: never;
  }
  /** Internal type holding properties that updates about edited messages share. */
  interface Edited {
    /** Date the message was last edited in Unix time */
    edit_date: number;
    forward_from?: never;
    forward_from_chat?: never;
    forward_from_message_id?: never;
    forward_signature?: never;
    forward_sender_name?: never;
    forward_date?: never;
  }

  export interface AbstractMessageUpdate {
    /** The update's unique identifier. Update identifiers start from a certain positive number and increase sequentially. This ID becomes especially handy if you're using Webhooks, since it allows you to ignore repeated updates or to restore the correct update sequence, should they get out of order. If there are no new updates for at least a week, then identifier of the next update will be chosen randomly instead of sequentially. */
    update_id: number;
  }
  export interface MessageUpdate extends AbstractMessageUpdate {
    /** New incoming message of any kind — text, photo, sticker, etc. */
    message: New & NonChannel & Message;
  }
  export interface EditedMessageUpdate extends AbstractMessageUpdate {
    /** New version of a message that is known to the bot and was edited */
    edited_message: Edited & NonChannel & Message;
  }
  export interface ChannelPostUpdate extends AbstractMessageUpdate {
    /** New incoming channel post of any kind — text, photo, sticker, etc. */
    channel_post: New & Channel & Message;
  }
  export interface EditedChannelPostUpdate extends AbstractMessageUpdate {
    /** New version of a channel post that is known to the bot and was edited */
    edited_channel_post: Edited & Channel & Message;
  }
  export interface InlineQueryUpdate extends AbstractMessageUpdate {
    /** New incoming inline query */
    inline_query: InlineQuery;
  }
  export interface ChosenInlineResultUpdate extends AbstractMessageUpdate {
    /** The result of an inline query that was chosen by a user and sent to their chat partner. Please see our documentation on the feedback collecting for details on how to enable these updates for your bot. */
    chosen_inline_result: ChosenInlineResult;
  }
  export interface CallbackQueryUpdate extends AbstractMessageUpdate {
    /** New incoming callback query */
    callback_query: CallbackQuery;
  }
  export interface ShippingQueryUpdate extends AbstractMessageUpdate {
    /** New incoming shipping query. Only for invoices with flexible price */
    shipping_query: ShippingQuery;
  }
  export interface PreCheckoutQueryUpdate extends AbstractMessageUpdate {
    /** New incoming pre-checkout query. Contains full information about checkout */
    pre_checkout_query: PreCheckoutQuery;
  }
  export interface PollUpdate extends AbstractMessageUpdate {
    /** New poll state. Bots receive only updates about stopped polls and polls, which are sent by the bot */
    poll: Poll;
  }
  export interface PollAnswerUpdate extends AbstractMessageUpdate {
    /** A user changed their answer in a non-anonymous poll. Bots receive new votes only in polls that were sent by the bot itself. */
    poll_answer: PollAnswer;
  }
}

/** This object represents an incoming update.
At most one of the optional parameters can be present in any given update. */
export type Update =
  | Update.CallbackQueryUpdate
  | Update.ChannelPostUpdate
  | Update.ChosenInlineResultUpdate
  | Update.EditedChannelPostUpdate
  | Update.EditedMessageUpdate
  | Update.InlineQueryUpdate
  | Update.MessageUpdate
  | Update.PreCheckoutQueryUpdate
  | Update.PollAnswerUpdate
  | Update.PollUpdate
  | Update.ShippingQueryUpdate;
