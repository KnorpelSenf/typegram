import { Boolean, Float, Integer, String } from "./alias.d.ts";
import { User } from "./manage.d.ts";
import { Location, MessageEntity, ParseMode } from "./message.d.ts";

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

/** This object represents an inline keyboard that appears right next to the message it belongs to. */
export interface InlineKeyboardMarkup {
  /** Array of button rows, each represented by an Array of InlineKeyboardButton objects */
  inline_keyboard: InlineKeyboardButton[][];
}

export namespace InlineKeyboardButton {
  interface AbstractInlineKeyboardButton {
    /** Label text on the button */
    text: String;
  }
  export interface UrlButton extends AbstractInlineKeyboardButton {
    /** HTTP or tg:// url to be opened when button is pressed */
    url: String;
  }
  export interface LoginButton extends AbstractInlineKeyboardButton {
    /** An HTTP URL used to automatically authorize the user. Can be used as a replacement for the Telegram Login Widget. */
    login_url: LoginUrl;
  }
  export interface CallbackButton extends AbstractInlineKeyboardButton {
    /** Data to be sent in a callback query to the bot when button is pressed, 1-64 bytes */
    callback_data: String;
  }
  export interface SwitchInlineButton extends AbstractInlineKeyboardButton {
    /** If set, pressing the button will prompt the user to select one of their chats, open that chat and insert the bot's username and the specified inline query in the input field. Can be empty, in which case just the bot's username will be inserted.

    Note: This offers an easy way for users to start using your bot in inline mode when they are currently in a private chat with it. Especially useful when combined with switch_pm… actions – in this case the user will be automatically returned to the chat they switched from, skipping the chat selection screen. */
    switch_inline_query: String;
  }
  export interface SwitchInlineCurrentChatButton
    extends AbstractInlineKeyboardButton {
    /** If set, pressing the button will insert the bot's username and the specified inline query in the current chat's input field. Can be empty, in which case only the bot's username will be inserted.

    This offers a quick way for the user to open your bot in inline mode in the same chat – good for selecting something from multiple options. */
    switch_inline_query_current_chat: String;
  }
  export interface GameButton extends AbstractInlineKeyboardButton {
    /** Description of the game that will be launched when the user presses the button.

    NOTE: This type of button must always be the first button in the first row. */
    callback_game: CallbackGame;
  }
  export interface PayButton extends AbstractInlineKeyboardButton {
    /** Specify True, to send a Pay button.

    NOTE: This type of button must always be the first button in the first row. */
    pay: Boolean;
  }
}

/** This object represents one button of an inline keyboard. You must use exactly one of the optional fields. */
export type InlineKeyboardButton =
  | InlineKeyboardButton.CallbackButton
  | InlineKeyboardButton.GameButton
  | InlineKeyboardButton.LoginButton
  | InlineKeyboardButton.PayButton
  | InlineKeyboardButton.SwitchInlineButton
  | InlineKeyboardButton.SwitchInlineCurrentChatButton
  | InlineKeyboardButton.UrlButton;

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

/** A placeholder, currently holds no information. Use BotFather to set up your game. */
export interface CallbackGame {}

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
export type InlineQueryResult =
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
  /** List of special entities that appear in the caption, which can be specified instead of parse_mode */
  caption_entities?: MessageEntity[];
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
  /** List of special entities that appear in the caption, which can be specified instead of parse_mode */
  caption_entities?: MessageEntity[];
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
  /** List of special entities that appear in the caption, which can be specified instead of parse_mode */
  caption_entities?: MessageEntity[];
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
  /** List of special entities that appear in the caption, which can be specified instead of parse_mode */
  caption_entities?: MessageEntity[];
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
  /** The radius of uncertainty for the location, measured in meters; 0-1500 */
  horizontal_accuracy?: Float;
  /** Period in seconds for which the location can be updated, should be between 60 and 86400. */
  live_period?: Integer;
  /** The direction in which user is moving, in degrees; 1-360. For active live locations only. */
  heading?: Integer;
  /** Maximum distance for proximity alerts about approaching another chat member, in meters. For sent live locations only. */
  proximity_alert_radius?: Integer;
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
  /** Google Places identifier of the venue */
  google_place_id?: String;
  /** Google Places type of the venue. (See supported types.) */
  google_place_type?: String;
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
  /** List of special entities that appear in the caption, which can be specified instead of parse_mode */
  caption_entities?: MessageEntity[];
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
  /** List of special entities that appear in the caption, which can be specified instead of parse_mode */
  caption_entities?: MessageEntity[];
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
  /** List of special entities that appear in the caption, which can be specified instead of parse_mode */
  caption_entities?: MessageEntity[];
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
  /** List of special entities that appear in the caption, which can be specified instead of parse_mode */
  caption_entities?: MessageEntity[];
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
  /** List of special entities that appear in message text, which can be specified instead of parse_mode */
  entities?: MessageEntity[];
  /** Disables link previews for links in the sent message */
  disable_web_page_preview?: Boolean;
}

/** Represents the content of a location message to be sent as the result of an inline query. */
export interface InputLocationMessageContent {
  /** Latitude of the location in degrees */
  latitude: Float;
  /** Longitude of the location in degrees */
  longitude: Float;
  /** The radius of uncertainty for the location, measured in meters; 0-1500 */
  horizontal_accuracy?: Float;
  /** Period in seconds for which the location can be updated, should be between 60 and 86400. */
  live_period?: Integer;
  /** For live locations, a direction in which the user is moving, in degrees. Must be between 1 and 360 if specified. */
  heading?: Integer;
  /** For live locations, a maximum distance for proximity alerts about approaching another chat member, in meters. Must be between 1 and 100000 if specified. */
  proximity_alert_radius?: Integer;
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
  /** Google Places identifier of the venue */
  google_place_id?: String;
  /** Google Places type of the venue. (See supported types.) */
  google_place_type?: String;
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
