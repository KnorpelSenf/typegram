import { Boolean, Float, Integer, String, True } from "./alias";

export namespace Update {
  /** Internal type holding properties that updates in channels share. */
  interface Channel {
    chat: Chat.ChannelChat;
    author_signature?: String;
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
    edit_date: Integer;
    forward_from?: never;
    forward_from_chat?: never;
    forward_from_message_id?: never;
    forward_signature?: never;
    forward_sender_name?: never;
    forward_date?: never;
  }

  export interface AbstractMessageUpdate {
    /** The update's unique identifier. Update identifiers start from a certain positive number and increase sequentially. This ID becomes especially handy if you're using Webhooks, since it allows you to ignore repeated updates or to restore the correct update sequence, should they get out of order. If there are no new updates for at least a week, then identifier of the next update will be chosen randomly instead of sequentially. */
    update_id: Integer;
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

/** Contains information about the current status of a webhook. */
export interface WebhookInfo {
  /** Webhook URL, may be empty if webhook is not set up */
  url?: String;
  /** True, if a custom certificate was provided for webhook certificate checks */
  has_custom_certificate: Boolean;
  /** Number of updates awaiting delivery */
  pending_update_count: Integer;
  /** Unix time for the most recent error that happened when trying to deliver an update via webhook */
  last_error_date: Integer;
  /** Error message in human-readable format for the most recent error that happened when trying to deliver an update via webhook */
  last_error_message: String;
  /** Maximum allowed number of simultaneous HTTPS connections to the webhook for update delivery */
  max_connections: Integer;
  /** A list of update types the bot is subscribed to. Defaults to all update types */
  allowed_updates: String[];
}

/** This object represents a Telegram user or bot. */
export interface User {
  /** Unique identifier for this user or bot */
  id: Integer;
  /** True, if this user is a bot */
  is_bot: Boolean;
  /** User's or bot's first name */
  first_name: String;
  /** User's or bot's last name */
  last_name?: String;
  /** User's or bot's username */
  username?: String;
  /** IETF language tag of the user's language */
  language_code?: String;
}
/** This object represents a Telegram user or bot that was returned by `getMe`. */
export interface UserFromGetMe extends User {
  is_bot: True;
  username: String;
  /** True, if the bot can be invited to groups. Returned only in getMe. */
  can_join_groups: Boolean;
  /** True, if privacy mode is disabled for the bot. Returned only in getMe. */
  can_read_all_group_messages: Boolean;
  /** True, if the bot supports inline queries. Returned only in getMe. */
  supports_inline_queries: Boolean;
}

export namespace Chat {
  // ABSTRACT
  /** Internal type holding properties that all kinds of chats share. */
  interface AbstractChat {
    /** Type of chat, can be either “private”, “group”, “supergroup” or “channel” */
    type: String;
    /** Unique identifier for this chat. This number may be greater than 32 bits and some programming languages may have difficulty/silent defects in interpreting it. But it is smaller than 52 bits, so a signed 64 bit integer or double-precision float type are safe for storing this identifier. */
    id: Integer;
  }

  // HELPERS
  /** Internal type holding properties that those chats with user names share. */
  interface UserNameChat {
    /** Username, for private chats, supergroups and channels if available */
    username?: String;
  }
  /** Internal type holding properties that those chats with titles share. */
  interface TitleChat {
    /** Title, for supergroups, channels and group chats */
    title: String;
  }

  // ==> CHATS
  /** Internal type representing private chats. */
  export interface PrivateChat extends AbstractChat, UserNameChat {
    type: "private";
    /** First name of the other party in a private chat */
    first_name: String;
    /** Last name of the other party in a private chat */
    last_name?: String;
  }
  /** Internal type representing group chats. */
  export interface GroupChat extends AbstractChat, TitleChat {
    type: "group";
  }
  /** Internal type representing super group chats. */
  export interface SupergroupChat
    extends AbstractChat,
      UserNameChat,
      TitleChat {
    type: "supergroup";
  }
  /** Internal type representing channel chats. */
  export interface ChannelChat extends AbstractChat, UserNameChat, TitleChat {
    type: "channel";
  }

  // GET CHAT HELPERS
  /** Internal type holding properties that those chats returned from `getChat` share. */
  interface GetChat {
    /** Chat photo. Returned only in getChat. */
    photo?: ChatPhoto;
  }
  /** Internal type holding properties that those group, supergroup, and channel chats returned from `getChat` share. */
  interface NonPrivateGetChat extends GetChat {
    /** Description, for groups, supergroups and channel chats. Returned only in getChat. */
    description?: String;
    /** Chat invite link, for groups, supergroups and channel chats. Each administrator in a chat generates their own invite links, so the bot must first generate the link using exportChatInviteLink. Returned only in getChat. */
    invite_link?: String;
    /** Pinned message, for groups, supergroups and channels. Returned only in getChat. */
    pinned_message?: Message;
  }
  /** Internal type holding properties that those group and supergroup chats returned from `getChat` share. */
  interface MultiUserGetChat extends NonPrivateGetChat {
    /** Default chat member permissions, for groups and supergroups. Returned only in getChat. */
    permissions?: ChatPermissions;
    /** True, if the bot can change the group sticker set. Returned only in getChat. */
    can_set_sticker_set?: Boolean;
  }

  // ==> GET CHATS
  /** Internal type representing private chats returned from `getChat`. */
  export interface PrivateGetChat extends PrivateChat, GetChat {}
  /** Internal type representing group chats returned from `getChat`. */
  export interface GroupGetChat extends GroupChat, MultiUserGetChat {}
  /** Internal type representing supergroup chats returned from `getChat`. */
  export interface SupergroupGetChat extends SupergroupChat, MultiUserGetChat {
    /** For supergroups, the minimum allowed delay between consecutive messages sent by each unprivileged user. Returned only in getChat. */
    slow_mode_delay?: Integer;
    /** For supergroups, name of group sticker set. Returned only in getChat. */
    sticker_set_name?: String;
  }
  /** Internal type representing channel chats returned from `getChat`. */
  export interface ChannelGetChat extends ChannelChat, NonPrivateGetChat {}
}

/** This object represents a chat. */
export type Chat =
  | Chat.PrivateChat
  | Chat.GroupChat
  | Chat.SupergroupChat
  | Chat.ChannelChat;

/** This object represents a Telegram user or bot that was returned by `getChat`. */
export type ChatFromGetChat =
  | Chat.PrivateGetChat
  | Chat.GroupGetChat
  | Chat.SupergroupGetChat
  | Chat.ChannelGetChat;

export namespace Message {
  interface ServiceMessage {
    /** Unique message identifier inside this chat */
    message_id: Integer;
    /** Sender, empty for messages sent to channels */
    from?: User;
    /** Date the message was sent in Unix time */
    date: Integer;
    /** Conversation the message belongs to */
    chat: Chat;
  }
  interface CommonMessage extends ServiceMessage {
    /** For forwarded messages, sender of the original message */
    forward_from?: User;
    /** For messages forwarded from channels, information about the original channel */
    forward_from_chat?: Chat;
    /** For messages forwarded from channels, identifier of the original message in the channel */
    forward_from_message_id?: Integer;
    /** For messages forwarded from channels, signature of the post author if present */
    forward_signature?: String;
    /** Sender's name for messages forwarded from users who disallow adding a link to their account in forwarded messages */
    forward_sender_name?: String;
    /** For forwarded messages, date the original message was sent in Unix time */
    forward_date?: Integer;
    /** For replies, the original message. Note that the Message object in this field will not contain further reply_to_message fields even if it itself is a reply. */
    reply_to_message?: Omit<Message, "reply_to_message">;
    /** Bot through which the message was sent */
    via_bot?: User;
    /** Date the message was last edited in Unix time */
    edit_date?: Integer;
    /** Signature of the post author for messages in channels */
    author_signature?: String;
    /** Inline keyboard attached to the message. login_url buttons are represented as ordinary url buttons. */
    reply_markup?: InlineKeyboardMarkup;
  }
  export interface TextMessage extends CommonMessage {
    /** For text messages, the actual UTF-8 text of the message, 0-4096 characters */
    text: String;
    /** For text messages, special entities like usernames, URLs, bot commands, etc. that appear in the text */
    entities?: MessageEntity[];
  }
  interface MediaMessage extends CommonMessage {
    /** Caption for the animation, audio, document, photo, video or voice, 0-1024 characters */
    caption?: String;
    /** For messages with a caption, special entities like usernames, URLs, bot commands, etc. that appear in the caption */
    caption_entities?: MessageEntity[];
    /** The unique identifier of a media message group this message belongs to */
    media_group_id?: String;
  }
  export interface AudioMessage extends MediaMessage {
    /** Message is an audio file, information about the file */
    audio: Audio;
  }
  export interface DocumentMessage extends MediaMessage {
    /** Message is a general file, information about the file */
    document: Document;
  }
  export interface AnimationMessage extends DocumentMessage {
    /** Message is an animation, information about the animation. For backward compatibility, when this field is set, the document field will also be set */
    animation: Animation;
  }
  export interface PhotoMessage extends MediaMessage {
    /** Message is a photo, available sizes of the photo */
    photo: PhotoSize[];
  }
  export interface StickerMessage extends CommonMessage {
    /** Message is a sticker, information about the sticker */
    sticker: Sticker;
  }
  export interface VideoMessage extends MediaMessage {
    /** Message is a video, information about the video */
    video: Video;
  }
  export interface VideoNoteMessage extends CommonMessage {
    /** Message is a video note, information about the video message */
    video_note: VideoNote;
  }
  export interface VoiceMessage extends MediaMessage {
    /** Message is a voice message, information about the file */
    voice: Voice;
  }
  export interface ContactMessage extends CommonMessage {
    /** Message is a shared contact, information about the contact */
    contact: Contact;
  }
  export interface DiceMessage extends CommonMessage {
    /** Message is a dice with random value from 1 to 6 */
    dice: Dice;
  }
  export interface GameMessage extends CommonMessage {
    /** Message is a game, information about the game. More about games » */
    game: Game;
  }
  export interface PollMessage extends CommonMessage {
    /** Message is a native poll, information about the poll */
    poll: Poll;
  }
  export interface LocationMessage extends CommonMessage {
    /** Message is a shared location, information about the location */
    location: Location;
  }
  export interface VenueMessage extends LocationMessage {
    /** Message is a venue, information about the venue. For backward compatibility, when this field is set, the location field will also be set */
    venue: Venue;
  }
  export interface NewChatMembersMessage extends ServiceMessage {
    /** New members that were added to the group or supergroup and information about them (the bot itself may be one of these members) */
    new_chat_members: User[];
  }
  export interface LeftChatMemberMessage extends ServiceMessage {
    /** A member was removed from the group, information about them (this member may be the bot itself) */
    left_chat_member: User;
  }
  export interface NewChatTitleMessage extends ServiceMessage {
    /** A chat title was changed to this value */
    new_chat_title: String;
  }
  export interface NewChatPhotoMessage extends ServiceMessage {
    /** A chat photo was change to this value */
    new_chat_photo: PhotoSize[];
  }
  export interface DeleteChatPhotoMessage extends ServiceMessage {
    /** Service message: the chat photo was deleted */
    delete_chat_photo: True;
  }
  export interface GroupChatCreatedMessage extends ServiceMessage {
    /** Service message: the group has been created */
    group_chat_created: True;
  }
  export interface SupergroupChatCreated extends ServiceMessage {
    /** Service message: the supergroup has been created. This field can't be received in a message coming through updates, because bot can't be a member of a supergroup when it is created. It can only be found in reply_to_message if someone replies to a very first message in a directly created supergroup. */
    supergroup_chat_created: True;
  }
  export interface ChannelChatCreatedMessage extends ServiceMessage {
    /** Service message: the channel has been created. This field can't be received in a message coming through updates, because bot can't be a member of a channel when it is created. It can only be found in reply_to_message if someone replies to a very first message in a channel. */
    channel_chat_created: True;
  }
  export interface MigrateToChatIdMessage extends ServiceMessage {
    /** The group has been migrated to a supergroup with the specified identifier. This number may be greater than 32 bits and some programming languages may have difficulty/silent defects in interpreting it. But it is smaller than 52 bits, so a signed 64 bit integer or double-precision float type are safe for storing this identifier. */
    migrate_to_chat_id: Integer;
  }
  export interface MigrateFromChatIdMessage extends ServiceMessage {
    /** The supergroup has been migrated from a group with the specified identifier. This number may be greater than 32 bits and some programming languages may have difficulty/silent defects in interpreting it. But it is smaller than 52 bits, so a signed 64 bit integer or double-precision float type are safe for storing this identifier. */
    migrate_from_chat_id?: Integer;
  }
  export interface PinnedMessageMessage extends ServiceMessage {
    /** Specified message was pinned. Note that the Message object in this field will not contain further reply_to_message fields even if it is itself a reply. */
    pinned_message: Omit<Message, "reply_to_message">;
  }
  export interface InvoiceMessage extends ServiceMessage {
    /** Message is an invoice for a payment, information about the invoice. More about payments » */
    invoice: Invoice;
  }
  export interface SuccessfulPaymentMessage extends ServiceMessage {
    /** Message is a service message about a successful payment, information about the payment. More about payments » */
    successful_payment: SuccessfulPayment;
  }
  export interface ConnectedWebsiteMessage extends ServiceMessage {
    /** The domain name of the website on which the user has logged in. More about Telegram Login » */
    connected_website: String;
  }
  export interface PassportDataMessage extends ServiceMessage {
    /** Telegram Passport data */
    passport_data?: PassportData;
  }
}

/** This object represents a message. */
export type Message =
  | Message.AnimationMessage
  | Message.AudioMessage
  | Message.ChannelChatCreatedMessage
  | Message.ConnectedWebsiteMessage
  | Message.ContactMessage
  | Message.DeleteChatPhotoMessage
  | Message.DiceMessage
  | Message.DocumentMessage
  | Message.GameMessage
  | Message.GroupChatCreatedMessage
  | Message.InvoiceMessage
  | Message.LeftChatMemberMessage
  | Message.LocationMessage
  | Message.MigrateFromChatIdMessage
  | Message.MigrateToChatIdMessage
  | Message.NewChatMembersMessage
  | Message.NewChatPhotoMessage
  | Message.NewChatTitleMessage
  | Message.PassportDataMessage
  | Message.PhotoMessage
  | Message.PinnedMessageMessage
  | Message.PollMessage
  | Message.StickerMessage
  | Message.SuccessfulPaymentMessage
  | Message.SupergroupChatCreated
  | Message.TextMessage
  | Message.VenueMessage
  | Message.VideoMessage
  | Message.VideoNoteMessage
  | Message.VoiceMessage;

/** The Bot API supports basic formatting for messages. You can use bold, italic, underlined and strikethrough text, as well as inline links and pre-formatted code in your bots' messages. Telegram clients will render them accordingly. You can use either markdown-style or HTML-style formatting.

Note that Telegram clients will display an **alert** to the user before opening an inline link ('Open this link?' together with the full URL).

Message entities can be nested, providing following restrictions are met:
- If two entities has common characters then one of them is fully contained inside another.
- bold, italic, underline and strikethrough entities can contain and to be contained in any other entities, except pre and code.
- All other entities can't contain each other.

Links `tg://user?id=<user_id>` can be used to mention a user by their ID without using a username. Please note:

- These links will work only if they are used inside an inline link. For example, they will not work, when used in an inline keyboard button or in a message text.
- These mentions are only guaranteed to work if the user has contacted the bot in the past, has sent a callback query to the bot via inline button or is a member in the group where he was mentioned.

#### MarkdownV2 style
To use this mode, pass *MarkdownV2* in the *parse_mode* field. Use the following syntax in your message:

```
​*bold \*text*
_italic \*text_
__underline__
~strikethrough~
​*bold _italic bold ~italic bold strikethrough~ __underline italic bold___ bold*
[inline URL](http://www.example.com/)
[inline mention of a user](tg://user?id=123456789)
`inline fixed-width code`
`​`​`
pre-formatted fixed-width code block
`​`​`
`​`​`python
pre-formatted fixed-width code block written in the Python programming language
`​`​`
```
Please note:

- Any character with code between 1 and 126 inclusively can be escaped anywhere with a preceding '\' character, in which case it is treated as an ordinary character and not a part of the markup.
- Inside `pre` and `code` entities, all '`' and '\' characters must be escaped with a preceding '\' character.
- Inside `(...)` part of inline link definition, all ')' and '\' must be escaped with a preceding '\' character.
- In all other places characters '_', '*', '[', ']', '(', ')', '~', '`', '>', '#', '+', '-', '=', '|', '{', '}', '.', '!' must be escaped with the preceding character '\'.
- In case of ambiguity between `italic` and `underline` entities `__` is always greadily treated from left to right as beginning or end of `underline` entity, so instead of `___italic underline___` use `___italic underline_\r__`, where `\r` is a character with code 13, which will be ignored.

#### HTML style
To use this mode, pass *HTML* in the *parse_mode* field. The following tags are currently supported:

```html
<b>bold</b>, <strong>bold</strong>
<i>italic</i>, <em>italic</em>
<u>underline</u>, <ins>underline</ins>
<s>strikethrough</s>, <strike>strikethrough</strike>, <del>strikethrough</del>
<b>bold <i>italic bold <s>italic bold strikethrough</s> <u>underline italic bold</u></i> bold</b>
<a href="http://www.example.com/">inline URL</a>
<a href="tg://user?id=123456789">inline mention of a user</a>
<code>inline fixed-width code</code>
<pre>pre-formatted fixed-width code block</pre>
<pre><code class="language-python">pre-formatted fixed-width code block written in the Python programming language</code></pre>
```
Please note:

- Only the tags mentioned above are currently supported.
- All `<`, `>` and `&` symbols that are not a part of a tag or an HTML entity must be replaced with the corresponding HTML entities (`<` with `&lt;`, `>` with `&gt;` and `&` with `&amp;`).
- All numerical HTML entities are supported.
- The API currently supports only the following named HTML entities: `&lt;`, `&gt;`, `&amp;` and `&quot;`.
- Use nested `pre` and `code` tags, to define programming language for pre entity.
- Programming language can't be specified for standalone `code` tags.

#### Markdown style
This is a legacy mode, retained for backward compatibility. To use this mode, pass *Markdown* in the *parse_mode* field. Use the following syntax in your message:

```
​*bold text*
_italic text_
[inline URL](http://www.example.com/)
[inline mention of a user](tg://user?id=123456789)
`inline fixed-width code`
`​`​`
pre-formatted fixed-width code block
`​`​`
`​`​`python
pre-formatted fixed-width code block written in the Python programming language
`​`​`
```
Please note:

- Entities must not be nested, use parse mode MarkdownV2 instead.
- There is no way to specify underline and strikethrough entities, use parse mode MarkdownV2 instead.
- To escape characters '_', '*', '`', '[' outside of an entity, prepend the characters '\' before them.
- Escaping inside entities is not allowed, so entity must be closed first and reopened again: use `_snake_\__case_` for italic `snake_case` and `*2*\**2=4*` for bold `2*2=4`. */
export type ParseMode = "Markdown" | "MarkdownV2" | "HTML";

export namespace MessageEntity {
  interface AbstractMessageEntity {
    /** Type of the entity. Can be “mention” (@username), “hashtag” (#hashtag), “cashtag” ($USD), “bot_command” (/start@jobs_bot), “url” (https://telegram.org), “email” (do-not-reply@telegram.org), “phone_number” (+1-212-555-0123), “bold” (bold text), “italic” (italic text), “underline” (underlined text), “strikethrough” (strikethrough text), “code” (monowidth string), “pre” (monowidth block), “text_link” (for clickable text URLs), “text_mention” (for users without usernames) */
    type: String;
    /** Offset in UTF-16 code units to the start of the entity */
    offset: Integer;
    /** Length of the entity in UTF-16 code units */
    length: Integer;
  }
  export interface CommonMessageEntity extends AbstractMessageEntity {
    type:
      | "mention"
      | "hashtag"
      | "cashtag"
      | "bot_command"
      | "url"
      | "email"
      | "phone_number"
      | "bold"
      | "italic"
      | "underline"
      | "strikethrough"
      | "code";
  }
  export interface TextLinkMessageEntity extends AbstractMessageEntity {
    type: "text_link";
    /** For “text_link” only, url that will be opened after user taps on the text */
    url: String;
  }
  export interface TextMentionMessageEntity extends AbstractMessageEntity {
    type: "text_mention";
    /** For “text_mention” only, the mentioned user */
    user: User;
  }
  export interface PreMessageEntity extends AbstractMessageEntity {
    type: "pre";
    /** For “pre” only, the programming language of the entity text */
    language?: String;
  }
}

/** This object represents one special entity in a text message. For example, hashtags, usernames, URLs, etc. */
export type MessageEntity =
  | MessageEntity.CommonMessageEntity
  | MessageEntity.PreMessageEntity
  | MessageEntity.TextLinkMessageEntity
  | MessageEntity.TextMentionMessageEntity;

/** This object represents one size of a photo or a file / sticker thumbnail. */
export interface PhotoSize {
  /** Identifier for this file, which can be used to download or reuse the file */
  file_id: String;
  /** Unique identifier for this file, which is supposed to be the same over time and for different bots. Can't be used to download or reuse the file. */
  file_unique_id: String;
  /** Photo width */
  width: Integer;
  /** Photo height */
  height: Integer;
  /** File size */
  file_size?: Integer;
}

/** This object represents an animation file (GIF or H.264/MPEG-4 AVC video without sound). */
export interface Animation {
  /** Identifier for this file, which can be used to download or reuse the file */
  file_id: String;
  /** Unique identifier for this file, which is supposed to be the same over time and for different bots. Can't be used to download or reuse the file. */
  file_unique_id: String;
  /** Video width as defined by sender */
  width: Integer;
  /** Video height as defined by sender */
  height: Integer;
  /** Duration of the video in seconds as defined by sender */
  duration: Integer;
  /** Animation thumbnail as defined by sender */
  thumb?: PhotoSize;
  /** Original animation filename as defined by sender */
  file_name?: String;
  /** MIME type of the file as defined by sender */
  mime_type?: String;
  /** File size */
  file_size?: Integer;
}

/** This object represents an audio file to be treated as music by the Telegram clients. */
export interface Audio {
  /** Identifier for this file, which can be used to download or reuse the file */
  file_id: String;
  /** Unique identifier for this file, which is supposed to be the same over time and for different bots. Can't be used to download or reuse the file. */
  file_unique_id: String;
  /** Duration of the audio in seconds as defined by sender */
  duration: Integer;
  /** Performer of the audio as defined by sender or by audio tags */
  performer?: String;
  /** Title of the audio as defined by sender or by audio tags */
  title?: String;
  /** MIME type of the file as defined by sender */
  mime_type?: String;
  /** File size */
  file_size?: Integer;
  /** Thumbnail of the album cover to which the music file belongs */
  thumb?: PhotoSize;
}

/** This object represents a general file (as opposed to photos, voice messages and audio files). */
export interface Document {
  /** Identifier for this file, which can be used to download or reuse the file */
  file_id: String;
  /** Unique identifier for this file, which is supposed to be the same over time and for different bots. Can't be used to download or reuse the file. */
  file_unique_id: String;
  /** Document thumbnail as defined by sender */
  thumb?: PhotoSize;
  /** Original filename as defined by sender */
  file_name?: String;
  /** MIME type of the file as defined by sender */
  mime_type?: String;
  /** File size */
  file_size?: Integer;
}

/** This object represents a video file. */
export interface Video {
  /** Identifier for this file, which can be used to download or reuse the file */
  file_id: String;
  /** Unique identifier for this file, which is supposed to be the same over time and for different bots. Can't be used to download or reuse the file. */
  file_unique_id: String;
  /** Video width as defined by sender */
  width: Integer;
  /** Video height as defined by sender */
  height: Integer;
  /** Duration of the video in seconds as defined by sender */
  duration: Integer;
  /** Video thumbnail */
  thumb?: PhotoSize;
  /** Mime type of a file as defined by sender */
  mime_type?: String;
  /** File size */
  file_size?: Integer;
}

/** This object represents a video message (available in Telegram apps as of v.4.0). */
export interface VideoNote {
  /** Identifier for this file, which can be used to download or reuse the file */
  file_id: String;
  /** Unique identifier for this file, which is supposed to be the same over time and for different bots. Can't be used to download or reuse the file. */
  file_unique_id: String;
  /** Video width and height (diameter of the video message) as defined by sender */
  length: Integer;
  /** Duration of the video in seconds as defined by sender */
  duration: Integer;
  /** Video thumbnail */
  thumb?: PhotoSize;
  /** File size */
  file_size?: Integer;
}

/** This object represents a voice note. */
export interface Voice {
  /** Identifier for this file, which can be used to download or reuse the file */
  file_id: String;
  /** Unique identifier for this file, which is supposed to be the same over time and for different bots. Can't be used to download or reuse the file. */
  file_unique_id: String;
  /** Duration of the audio in seconds as defined by sender */
  duration: Integer;
  /** MIME type of the file as defined by sender */
  mime_type?: String;
  /** File size */
  file_size?: Integer;
}

/** This object represents a phone contact. */
export interface Contact {
  /** Contact's phone number */
  phone_number: String;
  /** Contact's first name */
  first_name: String;
  /** Contact's last name */
  last_name?: String;
  /** Contact's user identifier in Telegram */
  user_id?: Integer;
  /** Additional data about the contact in the form of a vCard */
  vcard?: String;
}

/** This object represents an animated emoji that displays a random value. */
export interface Dice {
  /** Emoji on which the dice throw animation is based */
  emoji: String;
  /** Value of the dice, 1-6 for “🎲” and “🎯” base emoji, 1-5 for “🏀” base emoji */
  value: Integer;
}

/** This object contains information about one answer option in a poll. */
export interface PollOption {
  /** Option text, 1-100 characters */
  text: String;
  /** Number of users that voted for this option */
  voter_count: Integer;
}

/** This object represents an answer of a user in a non-anonymous poll. */
export interface PollAnswer {
  /** Unique poll identifier */
  poll_id: String;
  /** The user, who changed the answer to the poll */
  user: User;
  /** 0-based identifiers of answer options, chosen by the user. May be empty if the user retracted their vote. */
  option_ids: Integer[];
}

/** This object contains information about a poll. */
export interface Poll {
  /** Unique poll identifier */
  id: String;
  /** Poll question, 1-255 characters */
  question: String;
  /** List of poll options */
  options: PollOption[];
  /** Total number of users that voted in the poll */
  total_voter_count: Integer;
  /** True, if the poll is closed */
  is_closed: Boolean;
  /** True, if the poll is anonymous */
  is_anonymous: Boolean;
  /** Poll type, currently can be “regular” or “quiz” */
  type: "regular" | "quiz";
  /** True, if the poll allows multiple answers */
  allows_multiple_answers: Boolean;
  /** 0-based identifier of the correct answer option. Available only for polls in the quiz mode, which are closed, or was sent (not forwarded) by the bot or to the private chat with the bot. */
  correct_option_id?: Integer;
  /** Text that is shown when a user chooses an incorrect answer or taps on the lamp icon in a quiz-style poll, 0-200 characters */
  explanation?: String;
  /** Special entities like usernames, URLs, bot commands, etc. that appear in the explanation */
  explanation_entities?: MessageEntity[];
  /** Amount of time in seconds the poll will be active after creation */
  open_period?: Integer;
  /** Point in time (Unix timestamp) when the poll will be automatically closed */
  close_date?: Integer;
}

/** This object represents a point on the map. */
export interface Location {
  /** Longitude as defined by sender */
  longitude: Float;
  /** Latitude as defined by sender */
  latitude: Float;
}

/** This object represents a venue. */
export interface Venue {
  /** Venue location */
  location: Location;
  /** Name of the venue */
  title: String;
  /** Address of the venue */
  address: String;
  /** Foursquare identifier of the venue */
  foursquare_id?: String;
  /** Foursquare type of the venue. (For example, “arts_entertainment/default”, “arts_entertainment/aquarium” or “food/icecream”.) */
  foursquare_type?: String;
}

/** This object represent a user's profile pictures. */
export interface UserProfilePhotos {
  /** Total number of profile pictures the target user has */
  total_count: Integer;
  /** Requested profile pictures (in up to 4 sizes each) */
  photos: PhotoSize[][];
}

/** This object represents a file ready to be downloaded. The file can be downloaded via the link https://api.telegram.org/file/bot<token>/<file_path>. It is guaranteed that the link will be valid for at least 1 hour. When the link expires, a new one can be requested by calling getFile. */
export interface File {
  /** Identifier for this file, which can be used to download or reuse the file */
  file_id: String;
  /** Unique identifier for this file, which is supposed to be the same over time and for different bots. Can't be used to download or reuse the file. */
  file_unique_id: String;
  /** File size, if known */
  file_size?: Integer;
  /** File path. Use https://api.telegram.org/file/bot<token>/<file_path> to get the file. */
  file_path?: String;
}

/** This object represents a custom keyboard with reply options (see Introduction to bots for details and examples). */
export interface ReplyKeyboardMarkup {
  /** Array of button rows, each represented by an Array of KeyboardButton objects */
  keyboard: KeyboardButton[][];
  /** Requests clients to resize the keyboard vertically for optimal fit (e.g., make the keyboard smaller if there are just two rows of buttons). Defaults to false, in which case the custom keyboard is always of the same height as the app's standard keyboard. */
  resize_keyboard?: Boolean;
  /** Requests clients to hide the keyboard as soon as it's been used. The keyboard will still be available, but clients will automatically display the usual letter-keyboard in the chat – the user can press a special button in the input field to see the custom keyboard again. Defaults to false. */
  one_time_keyboard?: Boolean;
  /** Use this parameter if you want to show the keyboard to specific users only. Targets: 1) users that are @mentioned in the text of the Message object; 2) if the bot's message is a reply (has reply_to_message_id), sender of the original message.

  Example: A user requests to change the bot's language, bot replies to the request with a keyboard to select the new language. Other users in the group don't see the keyboard. */
  selective?: Boolean;
}

/** This object represents one button of the reply keyboard. For simple text buttons String can be used instead of this object to specify text of the button. Optional fields request_contact, request_location, and request_poll are mutually exclusive. */
export interface KeyboardButton {
  /** Text of the button. If none of the optional fields are used, it will be sent as a message when the button is pressed */
  text: String;
  /** If True, the user's phone number will be sent as a contact when the button is pressed. Available in private chats only */
  request_contact?: Boolean;
  /** If True, the user's current location will be sent when the button is pressed. Available in private chats only */
  request_location?: Boolean;
  /** If specified, the user will be asked to create a poll and send it to the bot when the button is pressed. Available in private chats only */
  request_poll?: KeyboardButtonPollType;
}

/** This object represents type of a poll, which is allowed to be created and sent when the corresponding button is pressed. */
export interface KeyboardButtonPollType {
  /** If quiz is passed, the user will be allowed to create only polls in the quiz mode. If regular is passed, only regular polls will be allowed. Otherwise, the user will be allowed to create a poll of any type. */
  type?: String;
}

/** Upon receiving a message with this object, Telegram clients will remove the current custom keyboard and display the default letter-keyboard. By default, custom keyboards are displayed until a new keyboard is sent by a bot. An exception is made for one-time keyboards that are hidden immediately after the user presses a button (see ReplyKeyboardMarkup). */
export interface ReplyKeyboardRemove {
  /** Requests clients to remove the custom keyboard (user will not be able to summon this keyboard; if you want to hide the keyboard from sight but keep it accessible, use one_time_keyboard in ReplyKeyboardMarkup) */
  remove_keyboard: True;
  /** Use this parameter if you want to remove the keyboard for specific users only. Targets: 1) users that are @mentioned in the text of the Message object; 2) if the bot's message is a reply (has reply_to_message_id), sender of the original message.

  Example: A user votes in a poll, bot returns confirmation message in reply to the vote and removes the keyboard for that user, while still showing the keyboard with poll options to users who haven't voted yet. */
  selective?: Boolean;
}

/** This object represents an inline keyboard that appears right next to the message it belongs to. */
export interface InlineKeyboardMarkup {
  /** Array of button rows, each represented by an Array of InlineKeyboardButton objects */
  inline_keyboard: InlineKeyboardButton[][];
}

/** This object represents one button of an inline keyboard. You must use exactly one of the optional fields. */
export interface InlineKeyboardButton {
  /** Label text on the button */
  text: String;
  /** HTTP or tg:// url to be opened when button is pressed */
  url?: String;
  /** An HTTP URL used to automatically authorize the user. Can be used as a replacement for the Telegram Login Widget. */
  login_url?: LoginUrl;
  /** Data to be sent in a callback query to the bot when button is pressed, 1-64 bytes */
  callback_data?: String;
  /** If set, pressing the button will prompt the user to select one of their chats, open that chat and insert the bot's username and the specified inline query in the input field. Can be empty, in which case just the bot's username will be inserted.

  Note: This offers an easy way for users to start using your bot in inline mode when they are currently in a private chat with it. Especially useful when combined with switch_pm… actions – in this case the user will be automatically returned to the chat they switched from, skipping the chat selection screen. */
  switch_inline_query?: String;

  /** If set, pressing the button will insert the bot's username and the specified inline query in the current chat's input field. Can be empty, in which case only the bot's username will be inserted.

  This offers a quick way for the user to open your bot in inline mode in the same chat – good for selecting something from multiple options. */
  switch_inline_query_current_chat?: String;

  /** Description of the game that will be launched when the user presses the button.

  NOTE: This type of button must always be the first button in the first row. */
  callback_game?: CallbackGame;
  /** Specify True, to send a Pay button.

  NOTE: This type of button must always be the first button in the first row. */
  pay?: Boolean;
}

/** This object represents a parameter of the inline keyboard button used to automatically authorize a user. Serves as a great replacement for the Telegram Login Widget when the user is coming from Telegram. All the user needs to do is tap/click a button and confirm that they want to log in.
Telegram apps support these buttons as of version 5.7. */
export interface LoginUrl {
  /** An HTTP URL to be opened with user authorization data added to the query string when the button is pressed. If the user refuses to provide authorization data, the original URL without information about the user will be opened. The data added is the same as described in Receiving authorization data.

  NOTE: You must always check the hash of the received data to verify the authentication and the integrity of the data as described in Checking authorization. */
  url: String;
  /** New text of the button in forwarded messages. */
  forward_text?: String;
  /** Username of a bot, which will be used for user authorization. See Setting up a bot for more details. If not specified, the current bot's username will be assumed. The url's domain must be the same as the domain linked with the bot. See Linking your domain to the bot for more details. */
  bot_username?: String;
  /** Pass True to request the permission for your bot to send messages to the user. */
  request_write_access?: Boolean;
}

/** This object represents an incoming callback query from a callback button in an inline keyboard. If the button that originated the query was attached to a message sent by the bot, the field message will be present. If the button was attached to a message sent via the bot (in inline mode), the field inline_message_id will be present. Exactly one of the fields data or game_short_name will be present.

NOTE: After the user presses a callback button, Telegram clients will display a progress bar until you call answerCallbackQuery. It is, therefore, necessary to react by calling answerCallbackQuery even if no notification to the user is needed (e.g., without specifying any of the optional parameters). */
export interface CallbackQuery {
  /** Unique identifier for this query */
  id: String;
  /** Sender */
  from: User;
  /** Message with the callback button that originated the query. Note that message content and message date will not be available if the message is too old */
  message?: Message;
  /** Identifier of the message sent via the bot in inline mode, that originated the query. */
  inline_message_id?: String;
  /** Global identifier, uniquely corresponding to the chat to which the message with the callback button was sent. Useful for high scores in games. */
  chat_instance: String;
  /** Data associated with the callback button. Be aware that a bad client can send arbitrary data in this field. */
  data?: String;
  /** Short name of a Game to be returned, serves as the unique identifier for the game */
  game_short_name?: String;
}

/** Upon receiving a message with this object, Telegram clients will display a reply interface to the user (act as if the user has selected the bot's message and tapped 'Reply'). This can be extremely useful if you want to create user-friendly step-by-step interfaces without having to sacrifice privacy mode.

Example: A poll bot for groups runs in privacy mode (only receives commands, replies to its messages and mentions). There could be two ways to create a new poll:

Explain the user how to send a command with parameters (e.g. /newpoll question answer1 answer2). May be appealing for hardcore users but lacks modern day polish.

Guide the user through a step-by-step process. 'Please send me your question', 'Cool, now let's add the first answer option', 'Great. Keep adding answer options, then send /done when you're ready'.

The last option is definitely more attractive. And if you use ForceReply in your bot's questions, it will receive the user's answers even if it only receives replies, commands and mentions — without any extra work for the user. */
export interface ForceReply {
  /** Shows reply interface to the user, as if they manually selected the bot's message and tapped 'Reply' */
  force_reply: True;
  /** Use this parameter if you want to force reply from specific users only. Targets: 1) users that are @mentioned in the text of the Message object; 2) if the bot's message is a reply (has reply_to_message_id), sender of the original message. */
  selective?: Boolean;
}

/** This object represents a chat photo. */
export interface ChatPhoto {
  /** File identifier of small (160x160) chat photo. This file_id can be used only for photo download and only for as long as the photo is not changed. */
  small_file_id: String;
  /** Unique file identifier of small (160x160) chat photo, which is supposed to be the same over time and for different bots. Can't be used to download or reuse the file. */
  small_file_unique_id: String;
  /** File identifier of big (640x640) chat photo. This file_id can be used only for photo download and only for as long as the photo is not changed. */
  big_file_id: String;
  /** Unique file identifier of big (640x640) chat photo, which is supposed to be the same over time and for different bots. Can't be used to download or reuse the file. */
  big_file_unique_id: String;
}

/** This object contains information about one member of a chat. */
export interface ChatMember {
  /** Information about the user */
  user: User;
  /** The member's status in the chat. Can be “creator”, “administrator”, “member”, “restricted”, “left” or “kicked” */
  status:
    | "creator"
    | "administrator"
    | "member"
    | "restricted"
    | "left"
    | "kicked";
  /** Owner and administrators only. Custom title for this user */
  custom_title?: String;
  /** Restricted and kicked only. Date when restrictions will be lifted for this user; unix time */
  until_date?: Integer;
  /** Administrators only. True, if the bot is allowed to edit administrator privileges of that user */
  can_be_edited?: Boolean;
  /** Administrators only. True, if the administrator can post in the channel; channels only */
  can_post_messages?: Boolean;
  /** Administrators only. True, if the administrator can edit messages of other users and can pin messages; channels only */
  can_edit_messages?: Boolean;
  /** Administrators only. True, if the administrator can delete messages of other users */
  can_delete_messages?: Boolean;
  /** Administrators only. True, if the administrator can restrict, ban or unban chat members */
  can_restrict_members?: Boolean;
  /** Administrators only. True, if the administrator can add new administrators with a subset of their own privileges or demote administrators that he has promoted, directly or indirectly (promoted by administrators that were appointed by the user) */
  can_promote_members?: Boolean;
  /** Administrators and restricted only. True, if the user is allowed to change the chat title, photo and other settings */
  can_change_info?: Boolean;
  /** Administrators and restricted only. True, if the user is allowed to invite new users to the chat */
  can_invite_users?: Boolean;
  /** Administrators and restricted only. True, if the user is allowed to pin messages; groups and supergroups only */
  can_pin_messages?: Boolean;
  /** Restricted only. True, if the user is a member of the chat at the moment of the request */
  is_member?: Boolean;
  /** Restricted only. True, if the user is allowed to send text messages, contacts, locations and venues */
  can_send_messages?: Boolean;
  /** Restricted only. True, if the user is allowed to send audios, documents, photos, videos, video notes and voice notes */
  can_send_media_messages?: Boolean;
  /** Restricted only. True, if the user is allowed to send polls */
  can_send_polls?: Boolean;
  /** Restricted only. True, if the user is allowed to send animations, games, stickers and use inline bots */
  can_send_other_messages?: Boolean;
  /** Restricted only. True, if the user is allowed to add web page previews to their messages */
  can_add_web_page_previews?: Boolean;
}

/** Describes actions that a non-administrator user is allowed to take in a chat. */
export interface ChatPermissions {
  /** True, if the user is allowed to send text messages, contacts, locations and venues */
  can_send_messages?: Boolean;
  /** True, if the user is allowed to send audios, documents, photos, videos, video notes and voice notes, implies can_send_messages */
  can_send_media_messages?: Boolean;
  /** True, if the user is allowed to send polls, implies can_send_messages */
  can_send_polls?: Boolean;
  /** True, if the user is allowed to send animations, games, stickers and use inline bots, implies can_send_media_messages */
  can_send_other_messages?: Boolean;
  /** True, if the user is allowed to add web page previews to their messages, implies can_send_media_messages */
  can_add_web_page_previews?: Boolean;
  /** True, if the user is allowed to change the chat title, photo and other settings. Ignored in public supergroups */
  can_change_info?: Boolean;
  /** True, if the user is allowed to invite new users to the chat */
  can_invite_users?: Boolean;
  /** True, if the user is allowed to pin messages. Ignored in public supergroups */
  can_pin_messages?: Boolean;
}

/** This object represents a bot command. */
export interface BotCommand {
  /** Text of the command, 1-32 characters. Can contain only lowercase English letters, digits and underscores. */
  command: String;
  /** Description of the command, 3-256 characters. */
  description: String;
}

/** Contains information about why a request was unsuccessful. */
export interface ResponseParameters {
  /** The group has been migrated to a supergroup with the specified identifier. This number may be greater than 32 bits and some programming languages may have difficulty/silent defects in interpreting it. But it is smaller than 52 bits, so a signed 64 bit integer or double-precision float type are safe for storing this identifier. */
  migrate_to_chat_id?: Integer;
  /** In case of exceeding flood control, the number of seconds left to wait before the request can be repeated */
  retry_after?: Integer;
}

/** This object represents the content of a media message to be sent. It should be one of
- InputMediaAnimation
- InputMediaDocument
- InputMediaAudio
- InputMediaPhoto
- InputMediaVideo */
export type InputMedia =
  | InputMediaAnimation
  | InputMediaDocument
  | InputMediaAudio
  | InputMediaPhoto
  | InputMediaVideo;

/** Represents a photo to be sent. */
export interface InputMediaPhoto {
  /** Type of the result, must be photo */
  type: "photo";
  /** File to send. Pass a file_id to send a file that exists on the Telegram servers (recommended), pass an HTTP URL for Telegram to get a file from the Internet, or pass “attach://<file_attach_name>” to upload a new one using multipart/form-data under <file_attach_name> name. More info on Sending Files » */
  media: String;
  /** Caption of the photo to be sent, 0-1024 characters after entities parsing */
  caption?: String;
  /** Mode for parsing entities in the photo caption. See formatting options for more details. */
  parse_mode?: ParseMode;
}

/** Represents a video to be sent. */
export interface InputMediaVideo {
  /** Type of the result, must be video */
  type: "video";
  /** File to send. Pass a file_id to send a file that exists on the Telegram servers (recommended), pass an HTTP URL for Telegram to get a file from the Internet, or pass “attach://<file_attach_name>” to upload a new one using multipart/form-data under <file_attach_name> name. More info on Sending Files » */
  media: String;
  /** Thumbnail of the file sent; can be ignored if thumbnail generation for the file is supported server-side. The thumbnail should be in JPEG format and less than 200 kB in size. A thumbnail's width and height should not exceed 320. Ignored if the file is not uploaded using multipart/form-data. Thumbnails can't be reused and can be only uploaded as a new file, so you can pass “attach://<file_attach_name>” if the thumbnail was uploaded using multipart/form-data under <file_attach_name>. More info on Sending Files » */
  thumb?: InputFile | String;
  /** Caption of the video to be sent, 0-1024 characters after entities parsing */
  caption?: String;
  /** Mode for parsing entities in the video caption. See formatting options for more details. */
  parse_mode?: ParseMode;
  /** Video width */
  width?: Integer;
  /** Video height */
  height?: Integer;
  /** Video duration */
  duration?: Integer;
  /** Pass True, if the uploaded video is suitable for streaming */
  supports_streaming?: Boolean;
}

/** Represents an animation file (GIF or H.264/MPEG-4 AVC video without sound) to be sent. */
export interface InputMediaAnimation {
  /** Type of the result, must be animation */
  type: "animation";
  /** File to send. Pass a file_id to send a file that exists on the Telegram servers (recommended), pass an HTTP URL for Telegram to get a file from the Internet, or pass “attach://<file_attach_name>” to upload a new one using multipart/form-data under <file_attach_name> name. More info on Sending Files » */
  media: String;
  /** Thumbnail of the file sent; can be ignored if thumbnail generation for the file is supported server-side. The thumbnail should be in JPEG format and less than 200 kB in size. A thumbnail's width and height should not exceed 320. Ignored if the file is not uploaded using multipart/form-data. Thumbnails can't be reused and can be only uploaded as a new file, so you can pass “attach://<file_attach_name>” if the thumbnail was uploaded using multipart/form-data under <file_attach_name>. More info on Sending Files » */
  thumb?: InputFile | String;
  /** Caption of the animation to be sent, 0-1024 characters after entities parsing */
  caption?: String;
  /** Mode for parsing entities in the animation caption. See formatting options for more details. */
  parse_mode?: ParseMode;
  /** Animation width */
  width?: Integer;
  /** Animation height */
  height?: Integer;
  /** Animation duration */
  duration?: Integer;
}

/** Represents an audio file to be treated as music to be sent. */
export interface InputMediaAudio {
  /** Type of the result, must be audio */
  type: "audio";
  /** File to send. Pass a file_id to send a file that exists on the Telegram servers (recommended), pass an HTTP URL for Telegram to get a file from the Internet, or pass “attach://<file_attach_name>” to upload a new one using multipart/form-data under <file_attach_name> name. More info on Sending Files » */
  media: String;
  /** Thumbnail of the file sent; can be ignored if thumbnail generation for the file is supported server-side. The thumbnail should be in JPEG format and less than 200 kB in size. A thumbnail's width and height should not exceed 320. Ignored if the file is not uploaded using multipart/form-data. Thumbnails can't be reused and can be only uploaded as a new file, so you can pass “attach://<file_attach_name>” if the thumbnail was uploaded using multipart/form-data under <file_attach_name>. More info on Sending Files » */
  thumb?: InputFile | String;
  /** Caption of the audio to be sent, 0-1024 characters after entities parsing */
  caption?: String;
  /** Mode for parsing entities in the audio caption. See formatting options for more details. */
  parse_mode?: ParseMode;
  /** Duration of the audio in seconds */
  duration?: Integer;
  /** Performer of the audio */
  performer?: String;
  /** Title of the audio */
  title?: String;
}

/** Represents a general file to be sent. */
export interface InputMediaDocument {
  /** Type of the result, must be document */
  type: "document";
  /** File to send. Pass a file_id to send a file that exists on the Telegram servers (recommended), pass an HTTP URL for Telegram to get a file from the Internet, or pass “attach://<file_attach_name>” to upload a new one using multipart/form-data under <file_attach_name> name. More info on Sending Files » */
  media: String;
  /** Thumbnail of the file sent; can be ignored if thumbnail generation for the file is supported server-side. The thumbnail should be in JPEG format and less than 200 kB in size. A thumbnail's width and height should not exceed 320. Ignored if the file is not uploaded using multipart/form-data. Thumbnails can't be reused and can be only uploaded as a new file, so you can pass “attach://<file_attach_name>” if the thumbnail was uploaded using multipart/form-data under <file_attach_name>. More info on Sending Files » */
  thumb?: InputFile | String;
  /** Caption of the document to be sent, 0-1024 characters after entities parsing */
  caption?: String;
  /** Mode for parsing entities in the document caption. See formatting options for more details. */
  parse_mode?: ParseMode;
}

/** This object represents the contents of a file to be uploaded. Must be posted using multipart/form-data in the usual way that files are uploaded via the browser. */
export type InputFile =
  | FileId
  | InputFileByPath
  | InputFileByReadableStream
  | InputFileByBuffer
  | InputFileByURL;

export type FileId = String;

export interface InputFileByPath {
  source: String;
}

export interface InputFileByReadableStream {
  source: NodeJS.ReadableStream;
}

export interface InputFileByBuffer {
  source: Buffer;
}

export interface InputFileByURL {
  url: String;
  filename: String;
}

/** This object represents a sticker. */
export interface Sticker {
  /** Identifier for this file, which can be used to download or reuse the file */
  file_id: String;
  /** Unique identifier for this file, which is supposed to be the same over time and for different bots. Can't be used to download or reuse the file. */
  file_unique_id: String;
  /** Sticker width */
  width: Integer;
  /** Sticker height */
  height: Integer;
  /** True, if the sticker is animated */
  is_animated: Boolean;
  /** Sticker thumbnail in the .WEBP or .JPG format */
  thumb?: PhotoSize;
  /** Emoji associated with the sticker */
  emoji?: String;
  /** Name of the sticker set to which the sticker belongs */
  set_name?: String;
  /** For mask stickers, the position where the mask should be placed */
  mask_position?: MaskPosition;
  /** File size */
  file_size?: Integer;
}

/** This object represents a sticker set. */
export interface StickerSet {
  /** Sticker set name */
  name: String;
  /** Sticker set title */
  title: String;
  /** True, if the sticker set contains animated stickers */
  is_animated: Boolean;
  /** True, if the sticker set contains masks */
  contains_masks: Boolean;
  /** List of all set stickers */
  stickers: Sticker[];
  /** Sticker set thumbnail in the .WEBP or .TGS format */
  thumb?: PhotoSize;
}

/** This object describes the position on faces where a mask should be placed by default. */
export interface MaskPosition {
  /** The part of the face relative to which the mask should be placed. One of “forehead”, “eyes”, “mouth”, or “chin”. */
  point: "forehead" | "eyes" | "mouth" | "chin";
  /** Shift by X-axis measured in widths of the mask scaled to the face size, from left to right. For example, choosing -1.0 will place mask just to the left of the default mask position. */
  x_shift: Float;
  /** Shift by Y-axis measured in heights of the mask scaled to the face size, from top to bottom. For example, 1.0 will place the mask just below the default mask position. */
  y_shift: Float;
  /** Mask scaling coefficient. For example, 2.0 means double size. */
  scale: Float;
}

/** This object represents an incoming inline query. When the user sends an empty query, your bot could return some default or trending results. */
export interface InlineQuery {
  /** Unique identifier for this query */
  id: String;
  /** Sender */
  from: User;
  /** Sender location, only for bots that request user location */
  location?: Location;
  /** Text of the query (up to 256 characters) */
  query: String;
  /** Offset of the results to be returned, can be controlled by the bot */
  offset: String;
}

/** This object represents one result of an inline query. Telegram clients currently support results of the following 20 types:
- InlineQueryResultCachedAudio
- InlineQueryResultCachedDocument
- InlineQueryResultCachedGif
- InlineQueryResultCachedMpeg4Gif
- InlineQueryResultCachedPhoto
- InlineQueryResultCachedSticker
- InlineQueryResultCachedVideo
- InlineQueryResultCachedVoice
- InlineQueryResultArticle
- InlineQueryResultAudio
- InlineQueryResultContact
- InlineQueryResultGame
- InlineQueryResultDocument
- InlineQueryResultGif
- InlineQueryResultLocation
- InlineQueryResultMpeg4Gif
- InlineQueryResultPhoto
- InlineQueryResultVenue
- InlineQueryResultVideo
- InlineQueryResultVoice

Note: It is necessary to enable inline feedback via @Botfather in order to receive these objects in updates. */
type InlineQueryResult =
  | InlineQueryResultCachedAudio
  | InlineQueryResultCachedDocument
  | InlineQueryResultCachedGif
  | InlineQueryResultCachedMpeg4Gif
  | InlineQueryResultCachedPhoto
  | InlineQueryResultCachedSticker
  | InlineQueryResultCachedVideo
  | InlineQueryResultCachedVoice
  | InlineQueryResultArticle
  | InlineQueryResultAudio
  | InlineQueryResultContact
  | InlineQueryResultGame
  | InlineQueryResultDocument
  | InlineQueryResultGif
  | InlineQueryResultLocation
  | InlineQueryResultMpeg4Gif
  | InlineQueryResultPhoto
  | InlineQueryResultVenue
  | InlineQueryResultVideo
  | InlineQueryResultVoice;

/** Represents a link to an article or web page. */
export interface InlineQueryResultArticle {
  /** Type of the result, must be article */
  type: "article";
  /** Unique identifier for this result, 1-64 Bytes */
  id: String;
  /** Title of the result */
  title: String;
  /** Content of the message to be sent */
  input_message_content: InputMessageContent;
  /** Inline keyboard attached to the message */
  reply_markup?: InlineKeyboardMarkup;
  /** URL of the result */
  url?: String;
  /** Pass True, if you don't want the URL to be shown in the message */
  hide_url?: Boolean;
  /** Short description of the result */
  description?: String;
  /** Url of the thumbnail for the result */
  thumb_url?: String;
  /** Thumbnail width */
  thumb_width?: Integer;
  /** Thumbnail height */
  thumb_height?: Integer;
}

/** Represents a link to a photo. By default, this photo will be sent by the user with optional caption. Alternatively, you can use input_message_content to send a message with the specified content instead of the photo. */
export interface InlineQueryResultPhoto {
  /** Type of the result, must be photo */
  type: "photo";
  /** Unique identifier for this result, 1-64 bytes */
  id: String;
  /** A valid URL of the photo. Photo must be in jpeg format. Photo size must not exceed 5MB */
  photo_url: String;
  /** URL of the thumbnail for the photo */
  thumb_url: String;
  /** Width of the photo */
  photo_width?: Integer;
  /** Height of the photo */
  photo_height?: Integer;
  /** Title for the result */
  title?: String;
  /** Short description of the result */
  description?: String;
  /** Caption of the photo to be sent, 0-1024 characters after entities parsing */
  caption?: String;
  /** Mode for parsing entities in the photo caption. See formatting options for more details. */
  parse_mode?: ParseMode;
  /** Inline keyboard attached to the message */
  reply_markup?: InlineKeyboardMarkup;
  /** Content of the message to be sent instead of the photo */
  input_message_content?: InputMessageContent;
}

/** Represents a link to an animated GIF file. By default, this animated GIF file will be sent by the user with optional caption. Alternatively, you can use input_message_content to send a message with the specified content instead of the animation. */
export interface InlineQueryResultGif {
  /** Type of the result, must be gif */
  type: "gif";
  /** Unique identifier for this result, 1-64 bytes */
  id: String;
  /** A valid URL for the GIF file. File size must not exceed 1MB */
  gif_url: String;
  /** Width of the GIF */
  gif_width?: Integer;
  /** Height of the GIF */
  gif_height?: Integer;
  /** Duration of the GIF */
  gif_duration?: Integer;
  /** URL of the static (JPEG or GIF) or animated (MPEG4) thumbnail for the result */
  thumb_url: String;
  /** MIME type of the thumbnail, must be one of “image/jpeg”, “image/gif”, or “video/mp4”. Defaults to “image/jpeg” */
  thumb_mime_type?: "image/jpeg" | "image/gif" | "video/mp4";
  /** Title for the result */
  title?: String;
  /** Caption of the GIF file to be sent, 0-1024 characters after entities parsing */
  caption?: String;
  /** Mode for parsing entities in the caption. See formatting options for more details. */
  parse_mode?: ParseMode;
  /** Inline keyboard attached to the message */
  reply_markup?: InlineKeyboardMarkup;
  /** Content of the message to be sent instead of the GIF animation */
  input_message_content?: InputMessageContent;
}

/** Represents a link to a video animation (H.264/MPEG-4 AVC video without sound). By default, this animated MPEG-4 file will be sent by the user with optional caption. Alternatively, you can use input_message_content to send a message with the specified content instead of the animation. */
export interface InlineQueryResultMpeg4Gif {
  /** Type of the result, must be mpeg4_gif */
  type: "mpeg4_gif";
  /** Unique identifier for this result, 1-64 bytes */
  id: String;
  /** A valid URL for the MP4 file. File size must not exceed 1MB */
  mpeg4_url: String;
  /** Video width */
  mpeg4_width?: Integer;
  /** Video height */
  mpeg4_height?: Integer;
  /** Video duration */
  mpeg4_duration?: Integer;
  /** URL of the static (JPEG or GIF) or animated (MPEG4) thumbnail for the result */

  thumb_url: String;
  /** MIME type of the thumbnail, must be one of “image/jpeg”, “image/gif”, or “video/mp4”. Defaults to “image/jpeg” */
  thumb_mime_type?: "image/jpeg" | "image/gif" | "video/mp4";
  /** Title for the result */
  title?: String;
  /** Caption of the MPEG-4 file to be sent, 0-1024 characters after entities parsing */
  caption?: String;
  /** Mode for parsing entities in the caption. See formatting options for more details. */
  parse_mode?: ParseMode;
  /** Inline keyboard attached to the message */
  reply_markup?: InlineKeyboardMarkup;
  /** Content of the message to be sent instead of the video animation */
  input_message_content?: InputMessageContent;
}

/** Represents a link to a page containing an embedded video player or a video file. By default, this video file will be sent by the user with an optional caption. Alternatively, you can use input_message_content to send a message with the specified content instead of the video.

If an InlineQueryResultVideo message contains an embedded video (e.g., YouTube), you must replace its content using input_message_content. */
export interface InlineQueryResultVideo {
  /** Type of the result, must be video */
  type: "video";
  /** Unique identifier for this result, 1-64 bytes */
  id: String;
  /** A valid URL for the embedded video player or video file */
  video_url: String;
  /** Mime type of the content of video url, “text/html” or “video/mp4” */
  mime_type: String;
  /** URL of the thumbnail (jpeg only) for the video */
  thumb_url: String;
  /** Title for the result */
  title: String;
  /** Caption of the video to be sent, 0-1024 characters after entities parsing */
  caption?: String;
  /** Mode for parsing entities in the video caption. See formatting options for more details. */
  parse_mode?: ParseMode;
  /** Video width */
  video_width?: Integer;
  /** Video height */
  video_height?: Integer;
  /** Video duration in seconds */
  video_duration?: Integer;
  /** Short description of the result */
  description?: String;
  /** Inline keyboard attached to the message */
  reply_markup?: InlineKeyboardMarkup;
  /** Content of the message to be sent instead of the video. This field is required if InlineQueryResultVideo is used to send an HTML-page as a result (e.g., a YouTube video). */
  input_message_content?: InputMessageContent;
}

/** Represents a link to an MP3 audio file. By default, this audio file will be sent by the user. Alternatively, you can use input_message_content to send a message with the specified content instead of the audio.

Note: This will only work in Telegram versions released after 9 April, 2016. Older clients will ignore them. */
export interface InlineQueryResultAudio {
  /** Type of the result, must be audio */
  type: "audio";
  /** Unique identifier for this result, 1-64 bytes */
  id: String;
  /** A valid URL for the audio file */
  audio_url: String;
  /** Title */
  title: String;
  /** Caption, 0-1024 characters after entities parsing */
  caption?: String;
  /** Mode for parsing entities in the audio caption. See formatting options for more details. */
  parse_mode?: ParseMode;
  /** Performer */
  performer?: String;
  /** Audio duration in seconds */
  audio_duration?: Integer;
  /** Inline keyboard attached to the message */
  reply_markup?: InlineKeyboardMarkup;
  /** Content of the message to be sent instead of the audio */
  input_message_content?: InputMessageContent;
}

/** Represents a link to a voice recording in an .OGG container encoded with OPUS. By default, this voice recording will be sent by the user. Alternatively, you can use input_message_content to send a message with the specified content instead of the the voice message.

Note: This will only work in Telegram versions released after 9 April, 2016. Older clients will ignore them. */
export interface InlineQueryResultVoice {
  /** Type of the result, must be voice */
  type: "voice";
  /** Unique identifier for this result, 1-64 bytes */
  id: String;
  /** A valid URL for the voice recording */
  voice_url: String;
  /** Recording title */
  title: String;
  /** Caption, 0-1024 characters after entities parsing */
  caption?: String;
  /** Mode for parsing entities in the voice message caption. See formatting options for more details. */
  parse_mode?: ParseMode;
  /** Recording duration in seconds */
  voice_duration?: Integer;
  /** Inline keyboard attached to the message */
  reply_markup?: InlineKeyboardMarkup;
  /** Content of the message to be sent instead of the voice recording */
  input_message_content?: InputMessageContent;
}

/** Represents a link to a file. By default, this file will be sent by the user with an optional caption. Alternatively, you can use input_message_content to send a message with the specified content instead of the file. Currently, only .PDF and .ZIP files can be sent using this method.

Note: This will only work in Telegram versions released after 9 April, 2016. Older clients will ignore them. */
export interface InlineQueryResultDocument {
  /** Type of the result, must be document */
  type: "document";
  /** Unique identifier for this result, 1-64 bytes */
  id: String;
  /** Title for the result */
  title: String;
  /** Caption of the document to be sent, 0-1024 characters after entities parsing */
  caption?: String;
  /** Mode for parsing entities in the document caption. See formatting options for more details. */
  parse_mode?: ParseMode;
  /** A valid URL for the file */
  document_url: String;
  /** Mime type of the content of the file, either “application/pdf” or “application/zip” */
  mime_type: String;
  /** Short description of the result */
  description?: String;
  /** Inline keyboard attached to the message */
  reply_markup?: InlineKeyboardMarkup;
  /** Content of the message to be sent instead of the file */
  input_message_content?: InputMessageContent;
  /** URL of the thumbnail (jpeg only) for the file */
  thumb_url?: String;
  /** Thumbnail width */
  thumb_width?: Integer;
  /** Thumbnail height */
  thumb_height?: Integer;
}

/** Represents a location on a map. By default, the location will be sent by the user. Alternatively, you can use input_message_content to send a message with the specified content instead of the location.

Note: This will only work in Telegram versions released after 9 April, 2016. Older clients will ignore them. */
export interface InlineQueryResultLocation {
  /** Type of the result, must be location */
  type: "location";
  /** Unique identifier for this result, 1-64 Bytes */
  id: String;
  /** Location latitude in degrees */
  latitude: Float;
  /** Location longitude in degrees */
  longitude: Float;
  /** Location title */
  title: String;
  /** Period in seconds for which the location can be updated, should be between 60 and 86400. */
  live_period?: Integer;
  /** Inline keyboard attached to the message */
  reply_markup?: InlineKeyboardMarkup;
  /** Content of the message to be sent instead of the location */
  input_message_content?: InputMessageContent;
  /** Url of the thumbnail for the result */
  thumb_url?: String;
  /** Thumbnail width */
  thumb_width?: Integer;
  /** Thumbnail height */
  thumb_height?: Integer;
}

/** Represents a venue. By default, the venue will be sent by the user. Alternatively, you can use input_message_content to send a message with the specified content instead of the venue.

Note: This will only work in Telegram versions released after 9 April, 2016. Older clients will ignore them. */
export interface InlineQueryResultVenue {
  /** Type of the result, must be venue */
  type: "venue";
  /** Unique identifier for this result, 1-64 Bytes */
  id: String;
  /** Latitude of the venue location in degrees */
  latitude: Float;
  /** Longitude of the venue location in degrees */
  longitude: Float;
  /** Title of the venue */
  title: String;
  /** Address of the venue */
  address: String;
  /** Foursquare identifier of the venue if known */
  foursquare_id?: String;
  /** Foursquare type of the venue, if known. (For example, “arts_entertainment/default”, “arts_entertainment/aquarium” or “food/icecream”.) */
  foursquare_type?: String;
  /** Inline keyboard attached to the message */
  reply_markup?: InlineKeyboardMarkup;
  /** Content of the message to be sent instead of the venue */
  input_message_content?: InputMessageContent;
  /** Url of the thumbnail for the result */
  thumb_url?: String;
  /** Thumbnail width */
  thumb_width?: Integer;
  /** Thumbnail height */
  thumb_height?: Integer;
}

/** Represents a contact with a phone number. By default, this contact will be sent by the user. Alternatively, you can use input_message_content to send a message with the specified content instead of the contact.

Note: This will only work in Telegram versions released after 9 April, 2016. Older clients will ignore them. */
export interface InlineQueryResultContact {
  /** Type of the result, must be contact */
  type: "contact";
  /** Unique identifier for this result, 1-64 Bytes */
  id: String;
  /** Contact's phone number */
  phone_number: String;
  /** Contact's first name */
  first_name: String;
  /** Contact's last name */
  last_name?: String;
  /** Additional data about the contact in the form of a vCard, 0-2048 bytes */
  vcard?: String;
  /** Inline keyboard attached to the message */
  reply_markup?: InlineKeyboardMarkup;
  /** Content of the message to be sent instead of the contact */
  input_message_content?: InputMessageContent;
  /** Url of the thumbnail for the result */
  thumb_url?: String;
  /** Thumbnail width */
  thumb_width?: Integer;
  /** Thumbnail height */
  thumb_height?: Integer;
}

/** Represents a Game.

Note: This will only work in Telegram versions released after October 1, 2016. Older clients will not display any inline results if a game result is among them. */
export interface InlineQueryResultGame {
  /** Type of the result, must be game */
  type: "game";
  /** Unique identifier for this result, 1-64 bytes */
  id: String;
  /** Short name of the game */
  game_short_name: String;
  /** Inline keyboard attached to the message */
  reply_markup?: InlineKeyboardMarkup;
}

/** Represents a link to a photo stored on the Telegram servers. By default, this photo will be sent by the user with an optional caption. Alternatively, you can use input_message_content to send a message with the specified content instead of the photo. */
export interface InlineQueryResultCachedPhoto {
  /** Type of the result, must be photo */
  type: "photo";
  /** Unique identifier for this result, 1-64 bytes */
  id: String;
  /** A valid file identifier of the photo */
  photo_file_id: String;
  /** Title for the result */
  title?: String;
  /** Short description of the result */
  description?: String;
  /** Caption of the photo to be sent, 0-1024 characters after entities parsing */
  caption?: String;
  /** Mode for parsing entities in the photo caption. See formatting options for more details. */
  parse_mode?: ParseMode;
  /** Inline keyboard attached to the message */
  reply_markup?: InlineKeyboardMarkup;
  /** Content of the message to be sent instead of the photo */
  input_message_content?: InputMessageContent;
}

/** Represents a link to an animated GIF file stored on the Telegram servers. By default, this animated GIF file will be sent by the user with an optional caption. Alternatively, you can use input_message_content to send a message with specified content instead of the animation. */
export interface InlineQueryResultCachedGif {
  /** Type of the result, must be gif */
  type: "gif";
  /** Unique identifier for this result, 1-64 bytes */
  id: String;
  /** A valid file identifier for the GIF file */
  gif_file_id: String;
  /** Title for the result */
  title?: String;
  /** Caption of the GIF file to be sent, 0-1024 characters after entities parsing */
  caption?: String;
  /** Mode for parsing entities in the caption. See formatting options for more details. */
  parse_mode?: ParseMode;
  /** Inline keyboard attached to the message */
  reply_markup?: InlineKeyboardMarkup;
  /** Content of the message to be sent instead of the GIF animation */
  input_message_content?: InputMessageContent;
}

/** Represents a link to a video animation (H.264/MPEG-4 AVC video without sound) stored on the Telegram servers. By default, this animated MPEG-4 file will be sent by the user with an optional caption. Alternatively, you can use input_message_content to send a message with the specified content instead of the animation. */
export interface InlineQueryResultCachedMpeg4Gif {
  /** Type of the result, must be mpeg4_gif */
  type: "mpeg4_gif";
  /** Unique identifier for this result, 1-64 bytes */
  id: String;
  /** A valid file identifier for the MP4 file */
  mpeg4_file_id: String;
  /** Title for the result */
  title?: String;
  /** Caption of the MPEG-4 file to be sent, 0-1024 characters after entities parsing */
  caption?: String;
  /** Mode for parsing entities in the caption. See formatting options for more details. */
  parse_mode?: ParseMode;
  /** Inline keyboard attached to the message */
  reply_markup?: InlineKeyboardMarkup;
  /** Content of the message to be sent instead of the video animation */
  input_message_content?: InputMessageContent;
}

/** Represents a link to a sticker stored on the Telegram servers. By default, this sticker will be sent by the user. Alternatively, you can use input_message_content to send a message with the specified content instead of the sticker.

Note: This will only work in Telegram versions released after 9 April, 2016 for static stickers and after 06 July, 2019 for animated stickers. Older clients will ignore them.
*/
export interface InlineQueryResultCachedSticker {
  /** Type of the result, must be sticker */
  type: "sticker";
  /** Unique identifier for this result, 1-64 bytes */
  id: String;
  /** A valid file identifier of the sticker */
  sticker_file_id: String;
  /** Inline keyboard attached to the message */
  reply_markup?: InlineKeyboardMarkup;
  /** Content of the message to be sent instead of the sticker */
  input_message_content?: InputMessageContent;
}

/** Represents a link to a file stored on the Telegram servers. By default, this file will be sent by the user with an optional caption. Alternatively, you can use input_message_content to send a message with the specified content instead of the file.

Note: This will only work in Telegram versions released after 9 April, 2016. Older clients will ignore them. */
export interface InlineQueryResultCachedDocument {
  /** Type of the result, must be document */
  type: "document";
  /** Unique identifier for this result, 1-64 bytes */
  id: String;
  /** Title for the result */
  title: String;
  /** A valid file identifier for the file */
  document_file_id: String;
  /** Short description of the result */
  description?: String;
  /** Caption of the document to be sent, 0-1024 characters after entities parsing */
  caption?: String;
  /** Mode for parsing entities in the document caption. See formatting options for more details. */
  parse_mode?: ParseMode;
  /** Inline keyboard attached to the message */
  reply_markup?: InlineKeyboardMarkup;
  /** Content of the message to be sent instead of the file */
  input_message_content?: InputMessageContent;
}

/** Represents a link to a video file stored on the Telegram servers. By default, this video file will be sent by the user with an optional caption. Alternatively, you can use input_message_content to send a message with the specified content instead of the video. */
export interface InlineQueryResultCachedVideo {
  /** Type of the result, must be video */
  type: "video";
  /** Unique identifier for this result, 1-64 bytes */
  id: String;
  /** A valid file identifier for the video file */
  video_file_id: String;
  /** Title for the result */
  title: String;
  /** Short description of the result */
  description?: String;
  /** Caption of the video to be sent, 0-1024 characters after entities parsing */
  caption?: String;
  /** Mode for parsing entities in the video caption. See formatting options for more details. */
  parse_mode?: ParseMode;
  /** Inline keyboard attached to the message */
  reply_markup?: InlineKeyboardMarkup;
  /** Content of the message to be sent instead of the video */
  input_message_content?: InputMessageContent;
}

/** Represents a link to a voice message stored on the Telegram servers. By default, this voice message will be sent by the user. Alternatively, you can use input_message_content to send a message with the specified content instead of the voice message.

Note: This will only work in Telegram versions released after 9 April, 2016. Older clients will ignore them. */
export interface InlineQueryResultCachedVoice {
  /** Type of the result, must be voice */
  type: "voice";
  /** Unique identifier for this result, 1-64 bytes */
  id: String;
  /** A valid file identifier for the voice message */
  voice_file_id: String;
  /** Voice message title */
  title: String;
  /** Caption, 0-1024 characters after entities parsing */
  caption?: String;
  /** Mode for parsing entities in the voice message caption. See formatting options for more details. */
  parse_mode?: ParseMode;
  /** Inline keyboard attached to the message */
  reply_markup?: InlineKeyboardMarkup;
  /** Content of the message to be sent instead of the voice message */
  input_message_content?: InputMessageContent;
}

/** Represents a link to an MP3 audio file stored on the Telegram servers. By default, this audio file will be sent by the user. Alternatively, you can use input_message_content to send a message with the specified content instead of the audio.

Note: This will only work in Telegram versions released after 9 April, 2016. Older clients will ignore them. */
export interface InlineQueryResultCachedAudio {
  /** Type of the result, must be audio */
  type: "audio";
  /** Unique identifier for this result, 1-64 bytes */
  id: String;
  /** A valid file identifier for the audio file */
  audio_file_id: String;
  /** Caption, 0-1024 characters after entities parsing */
  caption?: String;
  /** Mode for parsing entities in the audio caption. See formatting options for more details. */
  parse_mode?: ParseMode;
  /** Inline keyboard attached to the message */
  reply_markup?: InlineKeyboardMarkup;
  /** Content of the message to be sent instead of the audio */
  input_message_content?: InputMessageContent;
}

/** This object represents the content of a message to be sent as a result of an inline query. Telegram clients currently support the following 4 types:

- InputTextMessageContent
- InputLocationMessageContent
- InputVenueMessageContent
- InputContactMessageContent */
export type InputMessageContent =
  | InputTextMessageContent
  | InputLocationMessageContent
  | InputVenueMessageContent
  | InputContactMessageContent;

/** Represents the content of a text message to be sent as the result of an inline query. */
export interface InputTextMessageContent {
  /** Text of the message to be sent, 1-4096 characters */
  message_text: String;
  /** Mode for parsing entities in the message text. See formatting options for more details. */
  parse_mode?: ParseMode;
  /** Disables link previews for links in the sent message */
  disable_web_page_preview?: Boolean;
}

/** Represents the content of a location message to be sent as the result of an inline query. */
export interface InputLocationMessageContent {
  /** Latitude of the location in degrees */
  latitude: Float;
  /** Longitude of the location in degrees */
  longitude: Float;
  /** Period in seconds for which the location can be updated, should be between 60 and 86400. */
  live_period?: Integer;
}

/** Represents the content of a venue message to be sent as the result of an inline query. */
export interface InputVenueMessageContent {
  /** Latitude of the venue in degrees */
  latitude: Float;
  /** Longitude of the venue in degrees */
  longitude: Float;
  /** Name of the venue */
  title: String;
  /** Address of the venue */
  address: String;
  /** Foursquare identifier of the venue, if known */
  foursquare_id?: String;
  /** Foursquare type of the venue, if known. (For example, “arts_entertainment/default”, “arts_entertainment/aquarium” or “food/icecream”.) */
  foursquare_type?: String;
}

/** Represents the content of a contact message to be sent as the result of an inline query. */
export interface InputContactMessageContent {
  /** Contact's phone number */
  phone_number: String;
  /** Contact's first name */
  first_name: String;
  /** Contact's last name */
  last_name?: String;
  /** Additional data about the contact in the form of a vCard, 0-2048 bytes */
  vcard?: String;
}

/** Represents a result of an inline query that was chosen by the user and sent to their chat partner. */
export interface ChosenInlineResult {
  /** The unique identifier for the result that was chosen */
  result_id: String;
  /** The user that chose the result */
  from: User;
  /** Sender location, only for bots that require user location */
  location?: Location;
  /** Identifier of the sent inline message. Available only if there is an inline keyboard attached to the message. Will be also received in callback queries and can be used to edit the message. */
  inline_message_id?: String;
  /** The query that was used to obtain the result */
  query: String;
}

/** This object represents a portion of the price for goods or services. */
export interface LabeledPrice {
  /** Portion label */
  label: String;
  /** Price of the product in the smallest units of the currency (integer, not float/double). For example, for a price of US$ 1.45 pass amount = 145. See the exp parameter in currencies.json, it shows the number of digits past the decimal point for each currency (2 for the majority of currencies). */
  amount: Integer;
}

/** This object contains basic information about an invoice. */
export interface Invoice {
  /** Product name */
  title: String;
  /** Product description */
  description: String;
  /** Unique bot deep-linking parameter that can be used to generate this invoice */
  start_parameter: String;
  /** Three-letter ISO 4217 currency code */
  currency: String;
  /** Total price in the smallest units of the currency (integer, not float/double). For example, for a price of US$ 1.45 pass amount = 145. See the exp parameter in currencies.json, it shows the number of digits past the decimal point for each currency (2 for the majority of currencies). */
  total_amount: Integer;
}

/** This object represents a shipping address. */
export interface ShippingAddress {
  /** ISO 3166-1 alpha-2 country code */
  country_code: String;
  /** State, if applicable */
  state: String;
  /** City */
  city: String;
  /** First line for the address */
  street_line1: String;
  /** Second line for the address */
  street_line2: String;
  /** Address post code */
  post_code: String;
}

/** This object represents information about an order. */
export interface OrderInfo {
  /** User name */
  name?: String;
  /** User's phone number */
  phone_number?: String;
  /** User email */
  email?: String;
  /** User shipping address */
  shipping_address?: ShippingAddress;
}

/** This object represents one shipping option. */
export interface ShippingOption {
  /** Shipping option identifier */
  id: String;
  /** Option title */
  title: String;
  /** List of price portions */
  prices: LabeledPrice[];
}

/** This object contains basic information about a successful payment. */
export interface SuccessfulPayment {
  /** Three-letter ISO 4217 currency code */
  currency: String;
  /** Total price in the smallest units of the currency (integer, not float/double). For example, for a price of US$ 1.45 pass amount = 145. See the exp parameter in currencies.json, it shows the number of digits past the decimal point for each currency (2 for the majority of currencies). */
  total_amount: Integer;
  /** Bot specified invoice payload */
  invoice_payload: String;
  /** Identifier of the shipping option chosen by the user */
  shipping_option_id?: String;
  /** Order info provided by the user */
  order_info?: OrderInfo;
  /** Telegram payment identifier */
  telegram_payment_charge_id: String;
  /** Provider payment identifier */
  provider_payment_charge_id: String;
}

/** This object contains information about an incoming shipping query. */
export interface ShippingQuery {
  /** Unique query identifier */
  id: String;
  /** User who sent the query */
  from: User;
  /** Bot specified invoice payload */
  invoice_payload: String;
  /** User specified shipping address */
  shipping_address: ShippingAddress;
}

/** This object contains information about an incoming pre-checkout query. */
export interface PreCheckoutQuery {
  /** Unique query identifier */
  id: String;
  /** User who sent the query */
  from: User;
  /** Three-letter ISO 4217 currency code */
  currency: String;
  /** Total price in the smallest units of the currency (integer, not float/double). For example, for a price of US$ 1.45 pass amount = 145. See the exp parameter in currencies.json, it shows the number of digits past the decimal point for each currency (2 for the majority of currencies). */
  total_amount: Integer;
  /** Bot specified invoice payload */
  invoice_payload: String;
  /** Identifier of the shipping option chosen by the user */
  shipping_option_id?: String;
  /** Order info provided by the user */
  order_info?: OrderInfo;
}

/** Contains information about Telegram Passport data shared with the bot by the user. */
export interface PassportData {
  /** Array with information about documents and other Telegram Passport elements that was shared with the bot */
  data: EncryptedPassportElement[];
  /** Encrypted credentials required to decrypt the data */
  credentials: EncryptedCredentials;
}

/** This object represents a file uploaded to Telegram Passport. Currently all Telegram Passport files are in JPEG format when decrypted and don't exceed 10MB. */
export interface PassportFile {
  /** Identifier for this file, which can be used to download or reuse the file */
  file_id: String;
  /** Unique identifier for this file, which is supposed to be the same over time and for different bots. Can't be used to download or reuse the file. */
  file_unique_id: String;
  /** File size */
  file_size: Integer;
  /** Unix time when the file was uploaded */
  file_date: Integer;
}

/** Contains information about documents or other Telegram Passport elements shared with the bot by the user. */
export interface EncryptedPassportElement {
  /** Element type. One of “personal_details”, “passport”, “driver_license”, “identity_card”, “internal_passport”, “address”, “utility_bill”, “bank_statement”, “rental_agreement”, “passport_registration”, “temporary_registration”, “phone_number”, “email”. */
  type:
    | "personal_details"
    | "passport"
    | "driver_license"
    | "identity_card"
    | "internal_passport"
    | "address"
    | "utility_bill"
    | "bank_statement"
    | "rental_agreement"
    | "passport_registration"
    | "temporary_registration"
    | "phone_number"
    | "email";
  /** Base64-encoded encrypted Telegram Passport element data provided by the user, available for “personal_details”, “passport”, “driver_license”, “identity_card”, “internal_passport” and “address” types. Can be decrypted and verified using the accompanying EncryptedCredentials. */
  data?: String;
  /** User's verified phone number, available only for “phone_number” type */
  phone_number?: String;
  /** User's verified email address, available only for “email” type */
  email?: String;
  /** Array of encrypted files with documents provided by the user, available for “utility_bill”, “bank_statement”, “rental_agreement”, “passport_registration” and “temporary_registration” types. Files can be decrypted and verified using the accompanying EncryptedCredentials. */
  files?: PassportFile[];
  /** Encrypted file with the front side of the document, provided by the user. Available for “passport”, “driver_license”, “identity_card” and “internal_passport”. The file can be decrypted and verified using the accompanying EncryptedCredentials. */
  front_side?: PassportFile;
  /** Encrypted file with the reverse side of the document, provided by the user. Available for “driver_license” and “identity_card”. The file can be decrypted and verified using the accompanying EncryptedCredentials. */
  reverse_side?: PassportFile;
  /** Encrypted file with the selfie of the user holding a document, provided by the user; available for “passport”, “driver_license”, “identity_card” and “internal_passport”. The file can be decrypted and verified using the accompanying EncryptedCredentials. */
  selfie?: PassportFile;
  /** Array of encrypted files with translated versions of documents provided by the user. Available if requested for “passport”, “driver_license”, “identity_card”, “internal_passport”, “utility_bill”, “bank_statement”, “rental_agreement”, “passport_registration” and “temporary_registration” types. Files can be decrypted and verified using the accompanying EncryptedCredentials. */
  translation?: PassportFile[];
  /** Base64-encoded element hash for using in PassportElementErrorUnspecified */
  hash: String;
}

/** Contains data required for decrypting and authenticating EncryptedPassportElement. See the Telegram Passport Documentation for a complete description of the data decryption and authentication processes. */
export interface EncryptedCredentials {
  /** Base64-encoded encrypted JSON-serialized data with unique user's payload, data hashes and secrets required for EncryptedPassportElement decryption and authentication */
  data: String;
  /** Base64-encoded data hash for data authentication */
  hash: String;
  /** Base64-encoded secret, encrypted with the bot's public RSA key, required for data decryption */
  secret: String;
}

/** This object represents an error in the Telegram Passport element which was submitted that should be resolved by the user. It should be one of:
- PassportElementErrorDataField
- PassportElementErrorFrontSide
- PassportElementErrorReverseSide
- PassportElementErrorSelfie
- PassportElementErrorFile
- PassportElementErrorFiles
- PassportElementErrorTranslationFile
- PassportElementErrorTranslationFiles
- PassportElementErrorUnspecified
*/
export type PassportElementError =
  | PassportElementErrorDataField
  | PassportElementErrorFrontSide
  | PassportElementErrorReverseSide
  | PassportElementErrorSelfie
  | PassportElementErrorFile
  | PassportElementErrorFiles
  | PassportElementErrorTranslationFile
  | PassportElementErrorTranslationFiles
  | PassportElementErrorUnspecified;

/** Represents an issue in one of the data fields that was provided by the user. The error is considered resolved when the field's value changes. */
export interface PassportElementErrorDataField {
  /** Error source, must be data */
  source: "data";
  /** The section of the user's Telegram Passport which has the error, one of “personal_details”, “passport”, “driver_license”, “identity_card”, “internal_passport”, “address” */
  type:
    | "personal_details"
    | "passport"
    | "driver_license"
    | "identity_card"
    | "internal_passport"
    | "address";
  /** Name of the data field which has the error */
  field_name: String;
  /** Base64-encoded data hash */
  data_hash: String;
  /** Error message */
  message: String;
}

/** Represents an issue with the front side of a document. The error is considered resolved when the file with the front side of the document changes. */
export interface PassportElementErrorFrontSide {
  /** Error source, must be front_side */
  source: "front_side";
  /** The section of the user's Telegram Passport which has the issue, one of “passport”, “driver_license”, “identity_card”, “internal_passport” */
  type: "passport" | "driver_license" | "identity_card" | "internal_passport";
  /** Base64-encoded hash of the file with the front side of the document */
  file_hash: String;
  /** Error message */
  message: String;
}

/** Represents an issue with the reverse side of a document. The error is considered resolved when the file with reverse side of the document changes. */
export interface PassportElementErrorReverseSide {
  /** Error source, must be reverse_side */
  source: "reverse_side";
  /** The section of the user's Telegram Passport which has the issue, one of “driver_license”, “identity_card” */
  type: "driver_license" | "identity_card";
  /** Base64-encoded hash of the file with the reverse side of the document */
  file_hash: String;
  /** Error message */
  message: String;
}

/** Represents an issue with the selfie with a document. The error is considered resolved when the file with the selfie changes. */
export interface PassportElementErrorSelfie {
  /** Error source, must be selfie */
  source: "selfie";
  /** The section of the user's Telegram Passport which has the issue, one of “passport”, “driver_license”, “identity_card”, “internal_passport” */
  type: "passport" | "driver_license" | "identity_card" | "internal_passport";
  /** Base64-encoded hash of the file with the selfie */
  file_hash: String;
  /** Error message */
  message: String;
}

/** Represents an issue with a document scan. The error is considered resolved when the file with the document scan changes. */
export interface PassportElementErrorFile {
  /** Error source, must be file */
  source: "file";
  /** The section of the user's Telegram Passport which has the issue, one of “utility_bill”, “bank_statement”, “rental_agreement”, “passport_registration”, “temporary_registration” */
  type:
    | "utility_bill"
    | "bank_statement"
    | "rental_agreement"
    | "passport_registration"
    | "temporary_registration";
  /** Base64-encoded file hash */
  file_hash: String;
  /** Error message */
  message: String;
}

/** Represents an issue with a list of scans. The error is considered resolved when the list of files containing the scans changes. */
export interface PassportElementErrorFiles {
  /** Error source, must be files */
  source: "files";
  /** The section of the user's Telegram Passport which has the issue, one of “utility_bill”, “bank_statement”, “rental_agreement”, “passport_registration”, “temporary_registration” */
  type:
    | "utility_bill"
    | "bank_statement"
    | "rental_agreement"
    | "passport_registration"
    | "temporary_registration";
  /** List of base64-encoded file hashes */
  file_hashes: String[];
  /** Error message */
  message: String;
}

/** Represents an issue with one of the files that constitute the translation of a document. The error is considered resolved when the file changes. */
export interface PassportElementErrorTranslationFile {
  /** Error source, must be translation_file */
  source: "translation_file";
  /** Type of element of the user's Telegram Passport which has the issue, one of “passport”, “driver_license”, “identity_card”, “internal_passport”, “utility_bill”, “bank_statement”, “rental_agreement”, “passport_registration”, “temporary_registration” */
  type:
    | "passport"
    | "driver_license"
    | "identity_card"
    | "internal_passport"
    | "utility_bill"
    | "bank_statement"
    | "rental_agreement"
    | "passport_registration"
    | "temporary_registration";
  /** Base64-encoded file hash */
  file_hash: String;
  /** Error message */
  message: String;
}

/** Represents an issue with the translated version of a document. The error is considered resolved when a file with the document translation change. */
export interface PassportElementErrorTranslationFiles {
  /** Error source, must be translation_files */
  source: "translation_files";
  /** Type of element of the user's Telegram Passport which has the issue, one of “passport”, “driver_license”, “identity_card”, “internal_passport”, “utility_bill”, “bank_statement”, “rental_agreement”, “passport_registration”, “temporary_registration” */
  type:
    | "passport"
    | "driver_license"
    | "identity_card"
    | "internal_passport"
    | "utility_bill"
    | "bank_statement"
    | "rental_agreement"
    | "passport_registration"
    | "temporary_registration";
  /** List of base64-encoded file hashes */
  file_hashes: String[];
  /** Error message */
  message: String;
}

/** Represents an issue in an unspecified place. The error is considered resolved when new data is added. */
export interface PassportElementErrorUnspecified {
  /** Error source, must be unspecified */
  source: "unspecified";
  /** Type of element of the user's Telegram Passport which has the issue */
  type: String;
  /** Base64-encoded element hash */
  element_hash: String;
  /** Error message */
  message: String;
}

/** This object represents a game. Use BotFather to create and edit games, their short names will act as unique identifiers. */
export interface Game {
  /** Title of the game */
  title: String;
  /** Description of the game */
  description: String;
  /** Photo that will be displayed in the game message in chats. */
  photo: PhotoSize[];
  /** Brief description of the game or high scores included in the game message. Can be automatically edited to include current high scores for the game when the bot calls setGameScore, or manually edited using editMessageText. 0-4096 characters. */
  text: String;
  /** Special entities that appear in text, such as usernames, URLs, bot commands, etc. */
  text_entities: MessageEntity[];
  /** Animation that will be displayed in the game message in chats. Upload via BotFather */
  animation: Animation;
}

/** A placeholder, currently holds no information. Use BotFather to set up your game. */
export interface CallbackGame {}

/** This object represents one row of the high scores table for a game. */
export interface GameHighScore {
  /** Position in high score table for the game */
  position: Integer;
  /** User */
  user: User;
  /** Score */
  score: Integer;
}
