import { Boolean, Integer, String, True } from "./alias";
import { Location, Message, PhotoSize } from "./message";

/** Contains information about the current status of a webhook. */
export interface WebhookInfo {
  /** Webhook URL, may be empty if webhook is not set up */
  url?: String;
  /** True, if a custom certificate was provided for webhook certificate checks */
  has_custom_certificate: Boolean;
  /** Number of updates awaiting delivery */
  pending_update_count: Integer;
  /** Currently used webhook IP address */
  ip_address?: String;
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
    /** The most recent pinned message (by sending date). Returned only in getChat. */
    pinned_message?: Message;
  }
  /** Internal type holding properties that those group, supergroup, and channel chats returned from `getChat` share. */
  interface NonPrivateGetChat extends GetChat {
    /** Description, for groups, supergroups and channel chats. Returned only in getChat. */
    description?: String;
    /** Chat invite link, for groups, supergroups and channel chats. Each administrator in a chat generates their own invite links, so the bot must first generate the link using exportChatInviteLink. Returned only in getChat. */
    invite_link?: String;
  }
  /** Internal type holding properties that those group and supergroup chats returned from `getChat` share. */
  interface MultiUserGetChat extends NonPrivateGetChat {
    /** Default chat member permissions, for groups and supergroups. Returned only in getChat. */
    permissions?: ChatPermissions;
    /** True, if the bot can change the group sticker set. Returned only in getChat. */
    can_set_sticker_set?: Boolean;
  }
  /** Internal type holding properties that those supergroup and channel chats returned from `getChat` share. */
  interface LargeGetChat extends NonPrivateGetChat {
    /** Unique identifier for the linked chat, i.e. the discussion group identifier for a channel and vice versa; for supergroups and channel chats. This identifier may be greater than 32 bits and some programming languages may have difficulty/silent defects in interpreting it. But it is smaller than 52 bits, so a signed 64 bit integer or double-precision float type are safe for storing this identifier. Returned only in getChat. */
    linked_chat_id?: Integer;
  }

  // ==> GET CHATS
  /** Internal type representing private chats returned from `getChat`. */
  export interface PrivateGetChat extends PrivateChat, GetChat {
    /** Bio of the other party in a private chat. Returned only in getChat. */
    bio?: String;
  }
  /** Internal type representing group chats returned from `getChat`. */
  export interface GroupGetChat extends GroupChat, MultiUserGetChat {}
  /** Internal type representing supergroup chats returned from `getChat`. */
  export interface SupergroupGetChat
    extends SupergroupChat,
      MultiUserGetChat,
      LargeGetChat {
    /** For supergroups, the minimum allowed delay between consecutive messages sent by each unprivileged user. Returned only in getChat. */
    slow_mode_delay?: Integer;
    /** For supergroups, name of group sticker set. Returned only in getChat. */
    sticker_set_name?: String;
    /** For supergroups, the location to which the supergroup is connected. Returned only in getChat. */
    location?: ChatLocation;
  }
  /** Internal type representing channel chats returned from `getChat`. */
  export interface ChannelGetChat extends ChannelChat, LargeGetChat {}
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

/** This object represent a user's profile pictures. */
export interface UserProfilePhotos {
  /** Total number of profile pictures the target user has */
  total_count: Integer;
  /** Requested profile pictures (in up to 4 sizes each) */
  photos: PhotoSize[][];
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
  /** Owner and administrators only. True, if the user's presence in the chat is hidden */
  is_anonymous?: Boolean;
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
  /** Restricted and kicked only. Date when restrictions will be lifted for this user; unix time */
  until_date?: Integer;
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

/** Represents a location to which a chat is connected. */
export interface ChatLocation {
  /** The location to which the supergroup is connected. Can't be a live location. */
  location: Location;
  /** Location address; 1-64 characters, as defined by the chat owner */
  address: String;
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
