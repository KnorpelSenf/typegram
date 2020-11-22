import { Boolean, Float, Integer, String, True } from "./alias";
import { P, Params } from "./util";

export interface Typegram<F = InputFile> {
  /** Utility type providing a promisified version of Telegram */
  TelegramP: { [M in keyof Typegram<F>["Telegram"]]: P<M, F> };
  /** Utility type providing the argument type for the given method name or `{}` if the method does not take any parameters */
  Opts: {
    [M in keyof Typegram<F>["Telegram"]]: Params<M, F>[0] extends undefined
      ? {}
      : Exclude<Params<M, F>[0], undefined>;
  };

  /** Wrapper type to bundle all methods of the Telegram API */
  Telegram: {
    /** Use this method to receive incoming updates using long polling (wiki). An Array of Update objects is returned.

    Notes
    1. This method will not work if an outgoing webhook is set up.
    2. In order to avoid getting duplicate updates, recalculate offset after each server response. */
    getUpdates(args?: {
      /** Identifier of the first update to be returned. Must be greater by one than the highest among the identifiers of previously received updates. By default, updates starting with the earliest unconfirmed update are returned. An update is considered confirmed as soon as getUpdates is called with an offset higher than its update_id. The negative offset can be specified to retrieve updates starting from -offset update from the end of the updates queue. All previous updates will forgotten. */
      offset?: Integer;
      /** Limits the number of updates to be retrieved. Values between 1-100 are accepted. Defaults to 100. */
      limit?: Integer;
      /** Timeout in seconds for long polling. Defaults to 0, i.e. usual short polling. Should be positive, short polling should be used for testing purposes only. */
      timeout?: Integer;
      /** A JSON-serialized list of the update types you want your bot to receive. For example, specify [“message”, “edited_channel_post”, “callback_query”] to only receive updates of these types. See Update for a complete list of available update types. Specify an empty list to receive all updates regardless of type (default). If not specified, the previous setting will be used.
    Please note that this parameter doesn't affect updates created before the call to the getUpdates, so unwanted updates may be received for a short period of time. */
      allowed_updates?: readonly String[];
    }): Update[];

    /** Use this method to specify a url and receive incoming updates via an outgoing webhook. Whenever there is an update for the bot, we will send an HTTPS POST request to the specified url, containing a JSON-serialized Update. In case of an unsuccessful request, we will give up after a reasonable amount of attempts. Returns True on success.

    If you'd like to make sure that the Webhook request comes from Telegram, we recommend using a secret path in the URL, e.g. https://www.example.com/<token>. Since nobody else knows your bot's token, you can be pretty sure it's us.

    Notes
    1. You will not be able to receive updates using getUpdates for as long as an outgoing webhook is set up.
    2. To use a self-signed certificate, you need to upload your public key certificate using certificate parameter. Please upload as InputFile, sending a String will not work.
    3. Ports currently supported for Webhooks: 443, 80, 88, 8443.

    NEW! If you're having any trouble setting up webhooks, please check out this amazing guide to Webhooks. */
    setWebhook(args: {
      /** HTTPS url to send updates to. Use an empty string to remove webhook integration */
      url: String;
      /** Upload your public key certificate so that the root certificate in use can be checked. See our self-signed guide for details. */
      certificate?: F;
      /** The fixed IP address which will be used to send webhook requests instead of the IP address resolved through DNS */
      ip_address?: String;
      /** Maximum allowed number of simultaneous HTTPS connections to the webhook for update delivery, 1-100. Defaults to 40. Use lower values to limit the load on your bot's server, and higher values to increase your bot's throughput. */
      max_connections?: Integer;
      /** A JSON-serialized list of the update types you want your bot to receive. For example, specify [“message”, “edited_channel_post”, “callback_query”] to only receive updates of these types. See Update for a complete list of available update types. Specify an empty list to receive all updates regardless of type (default). If not specified, the previous setting will be used.
    Please note that this parameter doesn't affect updates created before the call to the setWebhook, so unwanted updates may be received for a short period of time. */
      allowed_updates?: readonly String[];
      /** Pass True to drop all pending updates */
      drop_pending_updates?: Boolean;
    }): True;

    /** Use this method to remove webhook integration if you decide to switch back to getUpdates. Returns True on success. */
    deleteWebhook(args?: {
      /** Pass True to drop all pending updates */
      drop_pending_updates?: Boolean;
    }): True;

    /** Use this method to get current webhook status. Requires no parameters. On success, returns a WebhookInfo object. If the bot is using getUpdates, will return an object with the url field empty. */
    getWebhookInfo(): WebhookInfo;

    /** A simple method for testing your bot's auth token. Requires no parameters. Returns basic information about the bot in form of a User object. */
    getMe(): UserFromGetMe;

    /** Use this method to log out from the cloud Bot API server before launching the bot locally. You must log out the bot before running it locally, otherwise there is no guarantee that the bot will receive updates. After a successful call, you can immediately log in on a local server, but will not be able to log in back to the cloud Bot API server for 10 minutes. Returns True on success. Requires no parameters. */
    logOut(): True;

    /** Use this method to close the bot instance before moving it from one local server to another. You need to delete the webhook before calling this method to ensure that the bot isn't launched again after server restart. The method will return error 429 in the first 10 minutes after the bot is launched. Returns True on success. Requires no parameters. */
    close(): True;

    /** Use this method to send text messages. On success, the sent Message is returned. */
    sendMessage(args: {
      /** Unique identifier for the target chat or username of the target channel (in the format @channelusername) */
      chat_id: Integer | String;
      /** Text of the message to be sent, 1-4096 characters after entities parsing */
      text: String;
      /** Mode for parsing entities in the message text. See formatting options for more details. */
      parse_mode?: ParseMode;
      /** List of special entities that appear in message text, which can be specified instead of parse_mode */
      entities?: MessageEntity[];
      /** Boolean Disables link previews for links in this message */
      disable_web_page_preview?: Boolean;
      /** Sends the message silently. Users will receive a notification with no sound. */
      disable_notification?: Boolean;
      /** If the message is a reply, ID of the original message */
      reply_to_message_id?: Integer;
      /** Pass True, if the message should be sent even if the specified replied-to message is not found */
      allow_sending_without_reply?: Boolean;
      /** Additional interface options. A JSON-serialized object for an inline keyboard, custom reply keyboard, instructions to remove reply keyboard or to force a reply from the user. */
      reply_markup?:
        | InlineKeyboardMarkup
        | ReplyKeyboardMarkup
        | ReplyKeyboardRemove
        | ForceReply;
    }): Message.TextMessage;

    /** Use this method to forward messages of any kind. On success, the sent Message is returned. */
    forwardMessage(args: {
      /** Unique identifier for the target chat or username of the target channel (in the format @channelusername) */
      chat_id: Integer | String;
      /** Unique identifier for the chat where the original message was sent (or channel username in the format @channelusername) */
      from_chat_id: Integer | String;
      /** Sends the message silently. Users will receive a notification with no sound. */
      disable_notification?: Boolean;
      /** Message identifier in the chat specified in from_chat_id */
      message_id: Integer;
    }): Message;

    /** Use this method to copy messages of any kind. The method is analogous to the method forwardMessages, but the copied message doesn't have a link to the original message. Returns the MessageId of the sent message on success. */
    copyMessage(args: {
      /** Unique identifier for the target chat or username of the target channel (in the format @channelusername) */
      chat_id: Integer | String;
      /** Unique identifier for the chat where the original message was sent (or channel username in the format @channelusername) */
      from_chat_id: Integer | String;
      /** Message identifier in the chat specified in from_chat_id */
      message_id: Integer;
      /** New caption for media, 0-1024 characters after entities parsing. If not specified, the original caption is kept */
      caption?: String;
      /** Mode for parsing entities in the new caption. See formatting options for more details. */
      parse_mode?: String;
      /** List of special entities that appear in the new caption, which can be specified instead of parse_mode */
      caption_entities?: MessageEntity[];
      /** Sends the message silently. Users will receive a notification with no sound. */
      disable_notification?: Boolean;
      /** If the message is a reply, ID of the original message */
      reply_to_message_id?: Integer;
      /** Pass True, if the message should be sent even if the specified replied-to message is not found */
      allow_sending_without_reply?: Boolean;
      /** Additional interface options. A JSON-serialized object for an inline keyboard, custom reply keyboard, instructions to remove reply keyboard or to force a reply from the user. */
      reply_markup?:
        | InlineKeyboardMarkup
        | ReplyKeyboardMarkup
        | ReplyKeyboardRemove
        | ForceReply;
    }): MessageId;

    /** Use this method to send photos. On success, the sent Message is returned. */
    sendPhoto(args: {
      /** Unique identifier for the target chat or username of the target channel (in the format @channelusername) */
      chat_id: Integer | String;
      /** Photo to send. Pass a file_id as String to send a photo that exists on the Telegram servers (recommended), pass an HTTP URL as a String for Telegram to get a photo from the Internet, or upload a new photo using multipart/form-data. */
      photo: F | String;
      /** Photo caption (may also be used when resending photos by file_id), 0-1024 characters after entities parsing */
      caption?: String;
      /** Mode for parsing entities in the photo caption. See formatting options for more details. */
      parse_mode?: ParseMode;
      /** List of special entities that appear in the caption, which can be specified instead of parse_mode */
      caption_entities?: MessageEntity[];
      /** Sends the message silently. Users will receive a notification with no sound. */
      disable_notification?: Boolean;
      /** If the message is a reply, ID of the original message */
      reply_to_message_id?: Integer;
      /** Pass True, if the message should be sent even if the specified replied-to message is not found */
      allow_sending_without_reply?: Boolean;
      /** Additional interface options. A JSON-serialized object for an inline keyboard, custom reply keyboard, instructions to remove reply keyboard or to force a reply from the user. */
      reply_markup?:
        | InlineKeyboardMarkup
        | ReplyKeyboardMarkup
        | ReplyKeyboardRemove
        | ForceReply;
    }): Message.PhotoMessage;

    /** Use this method to send audio files, if you want Telegram clients to display them in the music player. Your audio must be in the .MP3 or .M4A format. On success, the sent Message is returned. Bots can currently send audio files of up to 50 MB in size, this limit may be changed in the future.

    For sending voice messages, use the sendVoice method instead. */
    sendAudio(args: {
      /** Unique identifier for the target chat or username of the target channel (in the format @channelusername) */
      chat_id: Integer | String;
      /** Audio file to send. Pass a file_id as String to send an audio file that exists on the Telegram servers (recommended), pass an HTTP URL as a String for Telegram to get an audio file from the Internet, or upload a new one using multipart/form-data. */
      audio: F | String;
      /** Audio caption, 0-1024 characters after entities parsing */
      caption?: String;
      /** Mode for parsing entities in the audio caption. See formatting options for more details. */
      parse_mode?: ParseMode;
      /** List of special entities that appear in the caption, which can be specified instead of parse_mode */
      caption_entities?: MessageEntity[];
      /** Duration of the audio in seconds */
      duration?: Integer;
      /** Performer */
      performer?: String;
      /** Track name */
      title?: String;
      /** Thumbnail of the file sent; can be ignored if thumbnail generation for the file is supported server-side. The thumbnail should be in JPEG format and less than 200 kB in size. A thumbnail's width and height should not exceed 320. Ignored if the file is not uploaded using multipart/form-data. Thumbnails can't be reused and can be only uploaded as a new file, so you can pass “attach://<file_attach_name>” if the thumbnail was uploaded using multipart/form-data under <file_attach_name>. */
      thumb?: F | String;
      /** Sends the message silently. Users will receive a notification with no sound. */
      disable_notification?: Boolean;
      /** If the message is a reply, ID of the original message */
      reply_to_message_id?: Integer;
      /** Pass True, if the message should be sent even if the specified replied-to message is not found */
      allow_sending_without_reply?: Boolean;
      /** Additional interface options. A JSON-serialized object for an inline keyboard, custom reply keyboard, instructions to remove reply keyboard or to force a reply from the user. */
      reply_markup?:
        | InlineKeyboardMarkup
        | ReplyKeyboardMarkup
        | ReplyKeyboardRemove
        | ForceReply;
    }): Message.AudioMessage;

    /** Use this method to send general files. On success, the sent Message is returned. Bots can currently send files of any type of up to 50 MB in size, this limit may be changed in the future. */
    sendDocument(args: {
      /** Unique identifier for the target chat or username of the target channel (in the format @channelusername) */
      chat_id: Integer | String;
      /** File to send. Pass a file_id as String to send a file that exists on the Telegram servers (recommended), pass an HTTP URL as a String for Telegram to get a file from the Internet, or upload a new one using multipart/form-data. */
      document: F | String;
      /** Thumbnail of the file sent; can be ignored if thumbnail generation for the file is supported server-side. The thumbnail should be in JPEG format and less than 200 kB in size. A thumbnail's width and height should not exceed 320. Ignored if the file is not uploaded using multipart/form-data. Thumbnails can't be reused and can be only uploaded as a new file, so you can pass “attach://<file_attach_name>” if the thumbnail was uploaded using multipart/form-data under <file_attach_name>. */
      thumb?: F | String;
      /** Document caption (may also be used when resending documents by file_id), 0-1024 characters after entities parsing */
      caption?: String;
      /** Mode for parsing entities in the document caption. See formatting options for more details. */
      parse_mode?: ParseMode;
      /** List of special entities that appear in the caption, which can be specified instead of parse_mode */
      caption_entities?: MessageEntity[];
      /** Disables automatic server-side content type detection for files uploaded using multipart/form-data. Always true, if the document is sent as part of an album. */
      disable_content_type_detection?: Boolean;
      /** Sends the message silently. Users will receive a notification with no sound. */
      disable_notification?: Boolean;
      /** If the message is a reply, ID of the original message */
      reply_to_message_id?: Integer;
      /** Pass True, if the message should be sent even if the specified replied-to message is not found */
      allow_sending_without_reply?: Boolean;
      /** Additional interface options. A JSON-serialized object for an inline keyboard, custom reply keyboard, instructions to remove reply keyboard or to force a reply from the user. */
      reply_markup?:
        | InlineKeyboardMarkup
        | ReplyKeyboardMarkup
        | ReplyKeyboardRemove
        | ForceReply;
    }): Message.DocumentMessage;

    /** Use this method to send video files, Telegram clients support mp4 videos (other formats may be sent as Document). On success, the sent Message is returned. Bots can currently send video files of up to 50 MB in size, this limit may be changed in the future. */
    sendVideo(args: {
      /** Unique identifier for the target chat or username of the target channel (in the format @channelusername) */
      chat_id: Integer | String;
      /** Video to send. Pass a file_id as String to send a video that exists on the Telegram servers (recommended), pass an HTTP URL as a String for Telegram to get a video from the Internet, or upload a new video using multipart/form-data. */
      video: F | String;
      /** Duration of sent video in seconds */
      duration?: Integer;
      /** Video width */
      width?: Integer;
      /** Video height */
      height?: Integer;
      /** Thumbnail of the file sent; can be ignored if thumbnail generation for the file is supported server-side. The thumbnail should be in JPEG format and less than 200 kB in size. A thumbnail's width and height should not exceed 320. Ignored if the file is not uploaded using multipart/form-data. Thumbnails can't be reused and can be only uploaded as a new file, so you can pass “attach://<file_attach_name>” if the thumbnail was uploaded using multipart/form-data under <file_attach_name>. */
      thumb?: F | String;
      /** Video caption (may also be used when resending videos by file_id), 0-1024 characters after entities parsing */
      caption?: String;
      /** Mode for parsing entities in the video caption. See formatting options for more details. */
      parse_mode?: ParseMode;
      /** List of special entities that appear in the caption, which can be specified instead of parse_mode */
      caption_entities?: MessageEntity[];
      /** Pass True, if the uploaded video is suitable for streaming */
      supports_streaming?: Boolean;
      /** Sends the message silently. Users will receive a notification with no sound. */
      disable_notification?: Boolean;
      /** If the message is a reply, ID of the original message */
      reply_to_message_id?: Integer;
      /** Pass True, if the message should be sent even if the specified replied-to message is not found */
      allow_sending_without_reply?: Boolean;
      /** Additional interface options. A JSON-serialized object for an inline keyboard, custom reply keyboard, instructions to remove reply keyboard or to force a reply from the user. */
      reply_markup?:
        | InlineKeyboardMarkup
        | ReplyKeyboardMarkup
        | ReplyKeyboardRemove
        | ForceReply;
    }): Message.VideoMessage;

    /** Use this method to send animation files (GIF or H.264/MPEG-4 AVC video without sound). On success, the sent Message is returned. Bots can currently send animation files of up to 50 MB in size, this limit may be changed in the future. */
    sendAnimation(args: {
      /** Unique identifier for the target chat or username of the target channel (in the format @channelusername) */
      chat_id: Integer | String;
      /** Animation to send. Pass a file_id as String to send an animation that exists on the Telegram servers (recommended), pass an HTTP URL as a String for Telegram to get an animation from the Internet, or upload a new animation using multipart/form-data. */
      animation: F | String;
      /** Duration of sent animation in seconds */
      duration?: Integer;
      /** Animation width */
      width?: Integer;
      /** Animation height */
      height?: Integer;
      /** Thumbnail of the file sent; can be ignored if thumbnail generation for the file is supported server-side. The thumbnail should be in JPEG format and less than 200 kB in size. A thumbnail's width and height should not exceed 320. Ignored if the file is not uploaded using multipart/form-data. Thumbnails can't be reused and can be only uploaded as a new file, so you can pass “attach://<file_attach_name>” if the thumbnail was uploaded using multipart/form-data under <file_attach_name>. */
      thumb?: F | String;
      /** Animation caption (may also be used when resending animation by file_id), 0-1024 characters after entities parsing */
      caption?: String;
      /** Mode for parsing entities in the animation caption. See formatting options for more details. */
      parse_mode?: ParseMode;
      /** List of special entities that appear in the caption, which can be specified instead of parse_mode */
      caption_entities?: MessageEntity[];
      /** Sends the message silently. Users will receive a notification with no sound. */
      disable_notification?: Boolean;
      /** If the message is a reply, ID of the original message */
      reply_to_message_id?: Integer;
      /** Pass True, if the message should be sent even if the specified replied-to message is not found */
      allow_sending_without_reply?: Boolean;
      /** Additional interface options. A JSON-serialized object for an inline keyboard, custom reply keyboard, instructions to remove reply keyboard or to force a reply from the user. */
      reply_markup?:
        | InlineKeyboardMarkup
        | ReplyKeyboardMarkup
        | ReplyKeyboardRemove
        | ForceReply;
    }): Message.AnimationMessage;

    /** Use this method to send audio files, if you want Telegram clients to display the file as a playable voice message. For this to work, your audio must be in an .OGG file encoded with OPUS (other formats may be sent as Audio or Document). On success, the sent Message is returned. Bots can currently send voice messages of up to 50 MB in size, this limit may be changed in the future. */
    sendVoice(args: {
      /** Unique identifier for the target chat or username of the target channel (in the format @channelusername) */
      chat_id: Integer | String;
      /** Audio file to send. Pass a file_id as String to send a file that exists on the Telegram servers (recommended), pass an HTTP URL as a String for Telegram to get a file from the Internet, or upload a new one using multipart/form-data. */
      voice: F | String;
      /** Voice message caption, 0-1024 characters after entities parsing */
      caption?: String;
      /** Mode for parsing entities in the voice message caption. See formatting options for more details. */
      parse_mode?: ParseMode;
      /** List of special entities that appear in the caption, which can be specified instead of parse_mode */
      caption_entities?: MessageEntity[];
      /** Duration of the voice message in seconds */
      duration?: Integer;
      /** Sends the message silently. Users will receive a notification with no sound. */
      disable_notification?: Boolean;
      /** If the message is a reply, ID of the original message */
      reply_to_message_id?: Integer;
      /** Pass True, if the message should be sent even if the specified replied-to message is not found */
      allow_sending_without_reply?: Boolean;
      /** Additional interface options. A JSON-serialized object for an inline keyboard, custom reply keyboard, instructions to remove reply keyboard or to force a reply from the user. */
      reply_markup?:
        | InlineKeyboardMarkup
        | ReplyKeyboardMarkup
        | ReplyKeyboardRemove
        | ForceReply;
    }): Message.VoiceMessage;

    /** Use this method to send video messages. On success, the sent Message is returned.
    As of v.4.0, Telegram clients support rounded square mp4 videos of up to 1 minute long. */
    sendVideoNote(args: {
      /** Unique identifier for the target chat or username of the target channel (in the format @channelusername) */
      chat_id: Integer | String;
      /** Video note to send. Pass a file_id as String to send a video note that exists on the Telegram servers (recommended) or upload a new video using multipart/form-data.. Sending video notes by a URL is currently unsupported */
      video_note: F | String;
      /** Duration of sent video in seconds */
      duration?: Integer;
      /** Video width and height, i.e. diameter of the video message */
      length?: Integer;
      /** | String Thumbnail of the file sent; can be ignored if thumbnail generation for the file is supported server-side. The thumbnail should be in JPEG format and less than 200 kB in size. A thumbnail's width and height should not exceed 320. Ignored if the file is not uploaded using multipart/form-data. Thumbnails can't be reused and can be only uploaded as a new file, so you can pass “attach://<file_attach_name>” if the thumbnail was uploaded using multipart/form-data under <file_attach_name>. */
      thumb?: F;
      /** Sends the message silently. Users will receive a notification with no sound. */
      disable_notification?: Boolean;
      /** If the message is a reply, ID of the original message */
      reply_to_message_id?: Integer;
      /** Pass True, if the message should be sent even if the specified replied-to message is not found */
      allow_sending_without_reply?: Boolean;
      /** Additional interface options. A JSON-serialized object for an inline keyboard, custom reply keyboard, instructions to remove reply keyboard or to force a reply from the user. */
      reply_markup?:
        | InlineKeyboardMarkup
        | ReplyKeyboardMarkup
        | ReplyKeyboardRemove
        | ForceReply;
    }): Message.VideoNoteMessage;

    /** Use this method to send a group of photos, videos, documents or audios as an album. Documents and audio files can be only grouped in an album with messages of the same type. On success, an array of Messages that were sent is returned. */
    sendMediaGroup(args: {
      /** Unique identifier for the target chat or username of the target channel (in the format @channelusername) */
      chat_id: Integer | String;
      /** A JSON-serialized array describing messages to be sent, must include 2-10 items */
      media: ReadonlyArray<
        | Typegram<F>["InputMediaAudio"]
        | Typegram<F>["InputMediaDocument"]
        | Typegram<F>["InputMediaPhoto"]
        | Typegram<F>["InputMediaVideo"]
      >;
      /** Sends the messages silently. Users will receive a notification with no sound. */
      disable_notification?: Boolean;
      /** If messages are a reply, ID of the original message */
      reply_to_message_id?: Integer;
      /** Pass True, if the message should be sent even if the specified replied-to message is not found */
      allow_sending_without_reply?: Boolean;
    }): Array<
      | Message.AudioMessage
      | Message.DocumentMessage
      | Message.PhotoMessage
      | Message.VideoMessage
    >;

    /** Use this method to send point on the map. On success, the sent Message is returned. */
    sendLocation(args: {
      /** Unique identifier for the target chat or username of the target channel (in the format @channelusername) */
      chat_id: Integer | String;
      /** Latitude of the location */
      latitude: Float;
      /** Longitude of the location */
      longitude: Float;
      /** The radius of uncertainty for the location, measured in meters; 0-1500 */
      horizontal_accuracy?: Float;
      /** Period in seconds for which the location will be updated (see Live Locations, should be between 60 and 86400. */
      live_period?: Integer;
      /** The direction in which user is moving, in degrees; 1-360. For active live locations only. */
      heading?: Integer;
      /** Maximum distance for proximity alerts about approaching another chat member, in meters. For sent live locations only. */
      proximity_alert_radius?: Integer;
      /** Sends the message silently. Users will receive a notification with no sound. */
      disable_notification?: Boolean;
      /** If the message is a reply, ID of the original message */
      reply_to_message_id?: Integer;
      /** Pass True, if the message should be sent even if the specified replied-to message is not found */
      allow_sending_without_reply?: Boolean;
      /** Additional interface options. A JSON-serialized object for an inline keyboard, custom reply keyboard, instructions to remove reply keyboard or to force a reply from the user. */
      reply_markup?:
        | InlineKeyboardMarkup
        | ReplyKeyboardMarkup
        | ReplyKeyboardRemove
        | ForceReply;
    }): Message.LocationMessage;

    /** Use this method to edit live location messages. A location can be edited until its live_period expires or editing is explicitly disabled by a call to stopMessageLiveLocation. On success, if the edited message is not an inline message, the edited Message is returned, otherwise True is returned. */
    editMessageLiveLocation(args: {
      /** Required if inline_message_id is not specified. Unique identifier for the target chat or username of the target channel (in the format @channelusername) */
      chat_id?: Integer;
      /** Required if inline_message_id is not specified. Identifier of the message to edit */
      message_id?: Integer;
      /** Required if chat_id and message_id are not specified. Identifier of the inline message */
      inline_message_id?: String;
      /** Latitude of new location */
      latitude: Float;
      /** Longitude of new location */
      longitude: Float;
      /** The radius of uncertainty for the location, measured in meters; 0-1500 */
      horizontal_accuracy?: Float;
      /** The direction in which user is moving, in degrees; 1-360. For active live locations only. */
      heading?: Integer;
      /** Maximum distance for proximity alerts about approaching another chat member, in meters. For sent live locations only. */
      proximity_alert_radius?: Integer;
      /** A JSON-serialized object for a new inline keyboard. */
      reply_markup?: InlineKeyboardMarkup;
    }): (Update.Edited & Message.LocationMessage) | True;

    /** Use this method to stop updating a live location message before live_period expires. On success, if the message was sent by the bot, the sent Message is returned, otherwise True is returned. */
    stopMessageLiveLocation(args: {
      /** Required if inline_message_id is not specified. Unique identifier for the target chat or username of the target channel (in the format @channelusername) */
      chat_id?: Integer | String;
      /** Required if inline_message_id is not specified. Identifier of the message with live location to stop */
      message_id?: Integer;
      /** Required if chat_id and message_id are not specified. Identifier of the inline message */
      inline_message_id?: String;
      /** A JSON-serialized object for a new inline keyboard. */
      reply_markup?: InlineKeyboardMarkup;
    }): (Update.Edited & Message.LocationMessage) | True;

    /** Use this method to send information about a venue. On success, the sent Message is returned. */
    sendVenue(args: {
      /** Unique identifier for the target chat or username of the target channel (in the format @channelusername) */
      chat_id: Integer | String;
      /** Latitude of the venue */
      latitude: Float;
      /** Longitude of the venue */
      longitude: Float;
      /** Name of the venue */
      title: String;
      /** Address of the venue */
      address: String;
      /** Foursquare identifier of the venue */
      foursquare_id?: String;
      /** Foursquare type of the venue, if known. (For example, “arts_entertainment/default”, “arts_entertainment/aquarium” or “food/icecream”.) */
      foursquare_type?: String;
      /** Google Places identifier of the venue */
      google_place_id?: String;
      /** Google Places type of the venue. (See supported types.) */
      google_place_type?: String;
      /** Sends the message silently. Users will receive a notification with no sound. */
      disable_notification?: Boolean;
      /** If the message is a reply, ID of the original message */
      reply_to_message_id?: Integer;
      /** Pass True, if the message should be sent even if the specified replied-to message is not found */
      allow_sending_without_reply?: Boolean;
      /** Additional interface options. A JSON-serialized object for an inline keyboard, custom reply keyboard, instructions to remove reply keyboard or to force a reply from the user. */
      reply_markup?:
        | InlineKeyboardMarkup
        | ReplyKeyboardMarkup
        | ReplyKeyboardRemove
        | ForceReply;
    }): Message.VenueMessage;

    /** Use this method to send phone contacts. On success, the sent Message is returned. */
    sendContact(args: {
      /** Unique identifier for the target chat or username of the target channel (in the format @channelusername) */
      chat_id: Integer | String;
      /** Contact's phone number */
      phone_number: String;
      /** Contact's first name */
      first_name: String;
      /** Contact's last name */
      last_name?: String;
      /** Additional data about the contact in the form of a vCard, 0-2048 bytes */
      vcard?: String;
      /** Sends the message silently. Users will receive a notification with no sound. */
      disable_notification?: Boolean;
      /** If the message is a reply, ID of the original message */
      reply_to_message_id?: Integer;
      /** Pass True, if the message should be sent even if the specified replied-to message is not found */
      allow_sending_without_reply?: Boolean;
      /** Additional interface options. A JSON-serialized object for an inline keyboard, custom reply keyboard, instructions to remove keyboard or to force a reply from the user. */
      reply_markup?:
        | InlineKeyboardMarkup
        | ReplyKeyboardMarkup
        | ReplyKeyboardRemove
        | ForceReply;
    }): Message.ContactMessage;

    /** Use this method to send a native poll. On success, the sent Message is returned. */
    sendPoll(args: {
      /** Unique identifier for the target chat or username of the target channel (in the format @channelusername) */
      chat_id: Integer | String;
      /** Poll question, 1-255 characters */
      question: String;
      /** A JSON-serialized list of answer options, 2-10 strings 1-100 characters each */
      options: readonly String[];
      /** True, if the poll needs to be anonymous, defaults to True */
      is_anonymous?: Boolean;
      /** Poll type, “quiz” or “regular”, defaults to “regular” */
      type?: "quiz" | "regular";
      /** True, if the poll allows multiple answers, ignored for polls in quiz mode, defaults to False */
      allows_multiple_answers?: Boolean;
      /** 0-based identifier of the correct answer option, required for polls in quiz mode */
      correct_option_id?: Integer;
      /** Text that is shown when a user chooses an incorrect answer or taps on the lamp icon in a quiz-style poll, 0-200 characters with at most 2 line feeds after entities parsing */
      explanation?: String;
      /** Mode for parsing entities in the explanation. See formatting options for more details. */
      explanation_parse_mode?: ParseMode;
      /** List of special entities that appear in the poll explanation, which can be specified instead of parse_mode */
      explanation_entities?: MessageEntity[];
      /** Amount of time in seconds the poll will be active after creation, 5-600. Can't be used together with close_date. */
      open_period?: Integer;
      /** Point in time (Unix timestamp) when the poll will be automatically closed. Must be at least 5 and no more than 600 seconds in the future. Can't be used together with open_period. */
      close_date?: Integer;
      /** Pass True, if the poll needs to be immediately closed. This can be useful for poll preview. */
      is_closed?: Boolean;
      /** Sends the message silently. Users will receive a notification with no sound. */
      disable_notification?: Boolean;
      /** If the message is a reply, ID of the original message */
      reply_to_message_id?: Integer;
      /** Pass True, if the message should be sent even if the specified replied-to message is not found */
      allow_sending_without_reply?: Boolean;
      /** Additional interface options. A JSON-serialized object for an inline keyboard, custom reply keyboard, instructions to remove reply keyboard or to force a reply from the user. */
      reply_markup?:
        | InlineKeyboardMarkup
        | ReplyKeyboardMarkup
        | ReplyKeyboardRemove
        | ForceReply;
    }): Message.PollMessage;

    /** Use this method to send an animated emoji that will display a random value. On success, the sent Message is returned. */
    sendDice(args: {
      /** Unique identifier for the target chat or username of the target channel (in the format @channelusername) */
      chat_id: Integer | String;
      /** Emoji on which the dice throw animation is based. Currently, must be one of “🎲”, “🎯”, “🏀”, “⚽”, or “🎰”. Dice can have values 1-6 for “🎲” and “🎯”, values 1-5 for “🏀” and “⚽”, and values 1-64 for “🎰”. Defaults to “🎲” */
      emoji?: String;
      /** Sends the message silently. Users will receive a notification with no sound. */
      disable_notification?: Boolean;
      /** If the message is a reply, ID of the original message */
      reply_to_message_id?: Integer;
      /** Pass True, if the message should be sent even if the specified replied-to message is not found */
      allow_sending_without_reply?: Boolean;
      /** Additional interface options. A JSON-serialized object for an inline keyboard, custom reply keyboard, instructions to remove reply keyboard or to force a reply from the user. */
      reply_markup?:
        | InlineKeyboardMarkup
        | ReplyKeyboardMarkup
        | ReplyKeyboardRemove
        | ForceReply;
    }): Message.DiceMessage;

    /** Use this method when you need to tell the user that something is happening on the bot's side. The status is set for 5 seconds or less (when a message arrives from your bot, Telegram clients clear its typing status). Returns True on success.

    Example: The ImageBot needs some time to process a request and upload the image. Instead of sending a text message along the lines of “Retrieving image, please wait…”, the bot may use sendChatAction with action = upload_photo. The user will see a “sending photo” status for the bot.

    We only recommend using this method when a response from the bot will take a noticeable amount of time to arrive. */
    sendChatAction(args: {
      /** Unique identifier for the target chat or username of the target channel (in the format @channelusername) */
      chat_id: Integer | String;
      /** Type of action to broadcast. Choose one, depending on what the user is about to receive: typing for text messages, upload_photo for photos, record_video or upload_video for videos, record_voice or upload_voice for voice notes, upload_document for general files, find_location for location data, record_video_note or upload_video_note for video notes. */
      action:
        | "typing"
        | "upload_photo"
        | "record_video"
        | "upload_video"
        | "record_voice"
        | "upload_voice"
        | "upload_document"
        | "find_location"
        | "record_video_note"
        | "upload_video_note";
    }): True;

    /** Use this method to get a list of profile pictures for a user. Returns a UserProfilePhotos object. */
    getUserProfilePhotos(args: {
      /** Unique identifier of the target user */
      user_id: Integer;
      /** Sequential number of the first photo to be returned. By default, all photos are returned. */
      offset?: Integer;
      /** Limits the number of photos to be retrieved. Values between 1-100 are accepted. Defaults to 100. */
      limit?: Integer;
    }): UserProfilePhotos;

    /** Use this method to get basic info about a file and prepare it for downloading. For the moment, bots can download files of up to 20MB in size. On success, a File object is returned. The file can then be downloaded via the link https://api.telegram.org/file/bot<token>/<file_path>, where <file_path> is taken from the response. It is guaranteed that the link will be valid for at least 1 hour. When the link expires, a new one can be requested by calling getFile again.

    Note: This function may not preserve the original file name and MIME type. You should save the file's MIME type and name (if available) when the File object is received. */
    getFile(args: {
      /** File identifier to get info about */
      file_id: String;
    }): File;

    /** Use this method to kick a user from a group, a supergroup or a channel. In the case of supergroups and channels, the user will not be able to return to the group on their own using invite links, etc., unless unbanned first. The bot must be an administrator in the chat for this to work and must have the appropriate admin rights. Returns True on success. */
    kickChatMember(args: {
      /** Unique identifier for the target group or username of the target supergroup or channel (in the format @channelusername) */
      chat_id: Integer | String;
      /** Unique identifier of the target user */
      user_id: Integer;
      /** Date when the user will be unbanned, unix time. If user is banned for more than 366 days or less than 30 seconds from the current time they are considered to be banned forever */
      until_date?: Integer;
    }): True;

    /** Use this method to unban a previously kicked user in a supergroup or channel. The user will not return to the group or channel automatically, but will be able to join via link, etc. The bot must be an administrator for this to work. By default, this method guarantees that after the call the user is not a member of the chat, but will be able to join it. So if the user is a member of the chat they will also be removed from the chat. If you don't want this, use the parameter only_if_banned. Returns True on success. */
    unbanChatMember(args: {
      /** Unique identifier for the target group or username of the target supergroup or channel (in the format @username) */
      chat_id: Integer | String;
      /** Unique identifier of the target user */
      user_id: Integer;
      /** Do nothing if the user is not banned */
      only_if_banned?: Boolean;
    }): True;

    /** Use this method to restrict a user in a supergroup. The bot must be an administrator in the supergroup for this to work and must have the appropriate admin rights. Pass True for all permissions to lift restrictions from a user. Returns True on success. */
    restrictChatMember(args: {
      /** Unique identifier for the target chat or username of the target supergroup (in the format @supergroupusername) */
      chat_id: Integer | String;
      /** Unique identifier of the target user */
      user_id: Integer;
      /** A JSON-serialized object for new user permissions */
      permissions: ChatPermissions;
      /** Date when restrictions will be lifted for the user, unix time. If user is restricted for more than 366 days or less than 30 seconds from the current time, they are considered to be restricted forever */
      until_date?: Integer;
    }): True;

    /** Use this method to promote or demote a user in a supergroup or a channel. The bot must be an administrator in the chat for this to work and must have the appropriate admin rights. Pass False for all boolean parameters to demote a user. Returns True on success. */
    promoteChatMember(args: {
      /** Unique identifier for the target chat or username of the target channel (in the format @channelusername) */
      chat_id: Integer | String;
      /** Unique identifier of the target user */
      user_id: Integer;
      /** Pass True, if the administrator's presence in the chat is hidden */
      is_anonymous?: Boolean;
      /** Pass True, if the administrator can change chat title, photo and other settings */
      can_change_info?: Boolean;
      /** Pass True, if the administrator can create channel posts, channels only */
      can_post_messages?: Boolean;
      /** Pass True, if the administrator can edit messages of other users and can pin messages, channels only */
      can_edit_messages?: Boolean;
      /** Pass True, if the administrator can delete messages of other users */
      can_delete_messages?: Boolean;
      /** Pass True, if the administrator can invite new users to the chat */
      can_invite_users?: Boolean;
      /** Pass True, if the administrator can restrict, ban or unban chat members */
      can_restrict_members?: Boolean;
      /** Pass True, if the administrator can pin messages, supergroups only */
      can_pin_messages?: Boolean;
      /** Pass True, if the administrator can add new administrators with a subset of their own privileges or demote administrators that he has promoted, directly or indirectly (promoted by administrators that were appointed by him) */
      can_promote_members?: Boolean;
    }): True;

    /** Use this method to set a custom title for an administrator in a supergroup promoted by the bot. Returns True on success. */
    setChatAdministratorCustomTitle(args: {
      /** Unique identifier for the target chat or username of the target supergroup (in the format @supergroupusername) */
      chat_id: Integer | String;
      /** Unique identifier of the target user */
      user_id: Integer;
      /** New custom title for the administrator; 0-16 characters, emoji are not allowed */
      custom_title: String;
    }): True;

    /** Use this method to set default chat permissions for all members. The bot must be an administrator in the group or a supergroup for this to work and must have the can_restrict_members admin rights. Returns True on success. */
    setChatPermissions(args: {
      /** Unique identifier for the target chat or username of the target supergroup (in the format @supergroupusername) */
      chat_id: Integer | String;
      /** New default chat permissions */
      permissions: ChatPermissions;
    }): True;

    /** Use this method to generate a new invite link for a chat; any previously generated link is revoked. The bot must be an administrator in the chat for this to work and must have the appropriate admin rights. Returns the new invite link as String on success.

    Note: Each administrator in a chat generates their own invite links. Bots can't use invite links generated by other administrators. If you want your bot to work with invite links, it will need to generate its own link using exportChatInviteLink — after this the link will become available to the bot via the getChat method. If your bot needs to generate a new invite link replacing its previous one, use exportChatInviteLink again. */
    exportChatInviteLink(args: {
      /** Unique identifier for the target chat or username of the target channel (in the format @channelusername) */
      chat_id: Integer | String;
    }): String;

    /** Use this method to set a new profile photo for the chat. Photos can't be changed for private chats. The bot must be an administrator in the chat for this to work and must have the appropriate admin rights. Returns True on success. */
    setChatPhoto(args: {
      /** Unique identifier for the target chat or username of the target channel (in the format @channelusername) */
      chat_id: Integer | String;
      /** New chat photo, uploaded using multipart/form-data */
      photo: F;
    }): True;

    /** Use this method to delete a chat photo. Photos can't be changed for private chats. The bot must be an administrator in the chat for this to work and must have the appropriate admin rights. Returns True on success. */
    deleteChatPhoto(args: {
      /** Unique identifier for the target chat or username of the target channel (in the format @channelusername) */
      chat_id: Integer | String;
    }): True;

    /** Use this method to change the title of a chat. Titles can't be changed for private chats. The bot must be an administrator in the chat for this to work and must have the appropriate admin rights. Returns True on success. */
    setChatTitle(args: {
      /** Unique identifier for the target chat or username of the target channel (in the format @channelusername) */
      chat_id: Integer | String;
      /** New chat title, 1-255 characters */
      title: String;
    }): True;

    /** Use this method to change the description of a group, a supergroup or a channel. The bot must be an administrator in the chat for this to work and must have the appropriate admin rights. Returns True on success. */
    setChatDescription(args: {
      /** Unique identifier for the target chat or username of the target channel (in the format @channelusername) */
      chat_id: Integer | String;
      /** New chat description, 0-255 characters */
      description?: String;
    }): True;

    /** Use this method to add a message to the list of pinned messages in a chat. If the chat is not a private chat, the bot must be an administrator in the chat for this to work and must have the 'can_pin_messages' admin right in a supergroup or 'can_edit_messages' admin right in a channel. Returns True on success. */
    pinChatMessage(args: {
      /** Unique identifier for the target chat or username of the target channel (in the format @channelusername) */
      chat_id: Integer | String;
      /** Identifier of a message to pin */
      message_id: Integer;
      /** Pass True, if it is not necessary to send a notification to all chat members about the new pinned message. Notifications are always disabled in channels and private chats. */
      disable_notification?: Boolean;
    }): True;

    /** Use this method to remove a message from the list of pinned messages in a chat. If the chat is not a private chat, the bot must be an administrator in the chat for this to work and must have the 'can_pin_messages' admin right in a supergroup or 'can_edit_messages' admin right in a channel. Returns True on success. */
    unpinChatMessage(args: {
      /** Unique identifier for the target chat or username of the target channel (in the format @channelusername) */
      chat_id: Integer | String;
      /** Identifier of a message to unpin. If not specified, the most recent pinned message (by sending date) will be unpinned. */
      message_id?: Integer;
    }): True;

    /** Use this method to clear the list of pinned messages in a chat. If the chat is not a private chat, the bot must be an administrator in the chat for this to work and must have the 'can_pin_messages' admin right in a supergroup or 'can_edit_messages' admin right in a channel. Returns True on success. */
    unpinAllChatMessages(args: {
      /** Unique identifier for the target chat or username of the target channel (in the format @channelusername) */
      chat_id: Integer | String;
    }): True;

    /** Use this method for your bot to leave a group, supergroup or channel. Returns True on success. */
    leaveChat(args: {
      /** Unique identifier for the target chat or username of the target supergroup or channel (in the format @channelusername) */
      chat_id: Integer | String;
    }): True;

    /** Use this method to get up to date information about the chat (current name of the user for one-on-one conversations, current username of a user, group or channel, etc.). Returns a Chat object on success. */
    getChat(args: {
      /** Unique identifier for the target chat or username of the target supergroup or channel (in the format @channelusername) */
      chat_id: Integer | String;
    }): ChatFromGetChat;

    /** Use this method to get a list of administrators in a chat. On success, returns an Array of ChatMember objects that contains information about all chat administrators except other bots. If the chat is a group or a supergroup and no administrators were appointed, only the creator will be returned. */
    getChatAdministrators(args: {
      /** Unique identifier for the target chat or username of the target supergroup or channel (in the format @channelusername) */
      chat_id: Integer | String;
    }): ChatMember[];

    /** Use this method to get the number of members in a chat. Returns Int on success. */
    getChatMembersCount(args: {
      /** Unique identifier for the target chat or username of the target supergroup or channel (in the format @channelusername) */
      chat_id: Integer | String;
    }): Integer;

    /** Use this method to get information about a member of a chat. Returns a ChatMember object on success. */
    getChatMember(args: {
      /** Unique identifier for the target chat or username of the target supergroup or channel (in the format @channelusername) */
      chat_id: Integer | String;
      /** Unique identifier of the target user */
      user_id: Integer;
    }): ChatMember;

    /** Use this method to set a new group sticker set for a supergroup. The bot must be an administrator in the chat for this to work and must have the appropriate admin rights. Use the field can_set_sticker_set ly returned in getChat requests to check if the bot can use this method. Returns True on success. */
    setChatStickerSet(args: {
      /** Unique identifier for the target chat or username of the target supergroup (in the format @supergroupusername) */
      chat_id: Integer | String;
      /** Name of the sticker set to be set as the group sticker set */
      sticker_set_name: String;
    }): True;

    /** Use this method to delete a group sticker set from a supergroup. The bot must be an administrator in the chat for this to work and must have the appropriate admin rights. Use the field can_set_sticker_set ly returned in getChat requests to check if the bot can use this method. Returns True on success. */
    deleteChatStickerSet(args: {
      /** Unique identifier for the target chat or username of the target supergroup (in the format @supergroupusername) */
      chat_id: Integer | String;
    }): True;

    /** Use this method to send answers to callback queries sent from inline keyboards. The answer will be displayed to the user as a notification at the top of the chat screen or as an alert. On success, True is returned.

    Alternatively, the user can be redirected to the specified Game URL. For this option to work, you must first create a game for your bot via @Botfather and accept the terms. Otherwise, you may use links like t.me/your_bot?start=XXXX that open your bot with a parameter. */
    answerCallbackQuery(args: {
      /** Unique identifier for the query to be answered */
      callback_query_id: String;
      /** Text of the notification. If not specified, nothing will be shown to the user, 0-200 characters */
      text?: String;
      /** If true, an alert will be shown by the client instead of a notification at the top of the chat screen. Defaults to false. */
      show_alert?: Boolean;
      /** URL that will be opened by the user's client. If you have created a Game and accepted the conditions via @Botfather, specify the URL that opens your game — note that this will only work if the query comes from a callback_game button.

    Otherwise, you may use links like t.me/your_bot?start=XXXX that open your bot with a parameter. */
      url?: String;
      /** The maximum amount of time in seconds that the result of the callback query may be cached client-side. Telegram apps will support caching starting in version 3.14. Defaults to 0. */
      cache_time?: Integer;
    }): True;

    /** Use this method to change the list of the bot's commands. Returns True on success. */
    setMyCommands(args: {
      /** A JSON-serialized list of bot commands to be set as the list of the bot's commands. At most 100 commands can be specified. */
      commands: readonly BotCommand[];
    }): True;

    /** Use this method to get the current list of the bot's commands. Requires no parameters. Returns Array of BotCommand on success. */
    getMyCommands(): BotCommand[];

    /** Use this method to edit text and game messages. On success, if the edited message is not an inline message, the edited Message is returned, otherwise True is returned. */
    editMessageText(args: {
      /** Required if inline_message_id is not specified. Unique identifier for the target chat or username of the target channel (in the format @channelusername) */
      chat_id?: Integer | String;
      /** Required if inline_message_id is not specified. Identifier of the message to edit */
      message_id?: Integer;
      /** Required if chat_id and message_id are not specified. Identifier of the inline message */
      inline_message_id?: String;
      /** New text of the message, 1-4096 characters after entities parsing */
      text: String;
      /** Mode for parsing entities in the message text. See formatting options for more details. */
      parse_mode?: ParseMode;
      /** List of special entities that appear in message text, which can be specified instead of parse_mode */
      entities?: MessageEntity[];
      /** Disables link previews for links in this message */
      disable_web_page_preview?: Boolean;
      /** A JSON-serialized object for an inline keyboard. */
      reply_markup?: InlineKeyboardMarkup;
    }): (Update.Edited & Message.TextMessage) | True;

    /** Use this method to edit captions of messages. On success, if the edited message is not an inline message, the edited Message is returned, otherwise True is returned. */
    editMessageCaption(args: {
      /** Required if inline_message_id is not specified. Unique identifier for the target chat or username of the target channel (in the format @channelusername) */
      chat_id?: Integer | String;
      /** Required if inline_message_id is not specified. Identifier of the message to edit */
      message_id?: Integer;
      /** Required if chat_id and message_id are not specified. Identifier of the inline message */
      inline_message_id?: String;
      /** New caption of the message, 0-1024 characters after entities parsing */
      caption?: String;
      /** Mode for parsing entities in the message caption. See formatting options for more details. */
      parse_mode?: ParseMode;
      /** A JSON-serialized object for an inline keyboard. */
      reply_markup?: InlineKeyboardMarkup;
    }): (Update.Edited & Message.CaptionableMessage) | True;

    /** Use this method to edit animation, audio, document, photo, or video messages. If a message is part of a message album, then it can be edited only to an audio for audio albums, only to a document for document albums and to a photo or a video otherwise. When an inline message is edited, a new file can't be uploaded. Use a previously uploaded file via its file_id or specify a URL. On success, if the edited message was sent by the bot, the edited Message is returned, otherwise True is returned. */
    editMessageMedia(args: {
      /** Required if inline_message_id is not specified. Unique identifier for the target chat or username of the target channel (in the format @channelusername) */
      chat_id?: Integer | String;
      /** Required if inline_message_id is not specified. Identifier of the message to edit */
      message_id?: Integer;
      /** Required if chat_id and message_id are not specified. Identifier of the inline message */
      inline_message_id?: String;
      /** A JSON-serialized object for a new media content of the message */
      media: Typegram<F>["InputMedia"];
      /** A JSON-serialized object for a new inline keyboard. */
      reply_markup?: InlineKeyboardMarkup;
    }):
      | (Update.Edited & Message.AnimationMessage)
      | (Update.Edited & Message.AudioMessage)
      | (Update.Edited & Message.DocumentMessage)
      | (Update.Edited & Message.PhotoMessage)
      | (Update.Edited & Message.VideoMessage)
      | True;

    /** Use this method to edit only the reply markup of messages. On success, if the edited message is not an inline message, the edited Message is returned, otherwise True is returned. */
    editMessageReplyMarkup(args: {
      /** Required if inline_message_id is not specified. Unique identifier for the target chat or username of the target channel (in the format @channelusername) */
      chat_id?: Integer | String;
      /** Required if inline_message_id is not specified. Identifier of the message to edit */
      message_id?: Integer;
      /** Required if chat_id and message_id are not specified. Identifier of the inline message */
      inline_message_id?: String;
      /** A JSON-serialized object for an inline keyboard. */
      reply_markup?: InlineKeyboardMarkup;
    }): (Update.Edited & Message) | True;

    /** Use this method to stop a poll which was sent by the bot. On success, the stopped Poll with the final results is returned. */
    stopPoll(args: {
      /** Unique identifier for the target chat or username of the target channel (in the format @channelusername) */
      chat_id: Integer | String;
      /** Identifier of the original message with the poll */
      message_id: Integer;
      /** A JSON-serialized object for a new message inline keyboard. */
      reply_markup?: InlineKeyboardMarkup;
    }): Poll;

    /** Use this method to delete a message, including service messages, with the following limitations:
    - A message can only be deleted if it was sent less than 48 hours ago.
    - A dice message in a private chat can only be deleted if it was sent more than 24 hours ago.
    - Bots can delete outgoing messages in private chats, groups, and supergroups.
    - Bots can delete incoming messages in private chats.
    - Bots granted can_post_messages permissions can delete outgoing messages in channels.
    - If the bot is an administrator of a group, it can delete any message there.
    - If the bot has can_delete_messages permission in a supergroup or a channel, it can delete any message there.
    Returns True on success. */
    deleteMessage(args: {
      /** Unique identifier for the target chat or username of the target channel (in the format @channelusername) */
      chat_id: Integer | String;
      /** Identifier of the message to delete */
      message_id: Integer;
    }): True;

    /** Use this method to send static .WEBP or animated .TGS stickers. On success, the sent Message is returned. */
    sendSticker(args: {
      /** Unique identifier for the target chat or username of the target channel (in the format @channelusername) */
      chat_id: Integer | String;
      /** Sticker to send. Pass a file_id as String to send a file that exists on the Telegram servers (recommended), pass an HTTP URL as a String for Telegram to get a .WEBP file from the Internet, or upload a new one using multipart/form-data. */
      sticker: F | String;
      /** Sends the message silently. Users will receive a notification with no sound. */
      disable_notification?: Boolean;
      /** If the message is a reply, ID of the original message */
      reply_to_message_id?: Integer;
      /** Pass True, if the message should be sent even if the specified replied-to message is not found */
      allow_sending_without_reply?: Boolean;
      /** Additional interface options. A JSON-serialized object for an inline keyboard, custom reply keyboard, instructions to remove reply keyboard or to force a reply from the user. */
      reply_markup?:
        | InlineKeyboardMarkup
        | ReplyKeyboardMarkup
        | ReplyKeyboardRemove
        | ForceReply;
    }): Message.StickerMessage;

    /** Use this method to get a sticker set. On success, a StickerSet object is returned. */
    getStickerSet(args: {
      /** Name of the sticker set */
      name: String;
    }): StickerSet;

    /** Use this method to upload a .PNG file with a sticker for later use in createNewStickerSet and addStickerToSet methods (can be used multiple times). Returns the uploaded File on success. */
    uploadStickerFile(args: {
      /** User identifier of sticker file owner */
      user_id: Integer;
      /** PNG image with the sticker, must be up to 512 kilobytes in size, dimensions must not exceed 512px, and either width or height must be exactly 512px. */
      png_sticker: F;
    }): File;

    /** Use this method to create a new sticker set owned by a user. The bot will be able to edit the sticker set thus created. You must use exactly one of the fields png_sticker or tgs_sticker. Returns True on success. */
    createNewStickerSet(args: {
      /** User identifier of created sticker set owner */
      user_id: Integer;
      /** Short name of sticker set, to be used in t.me/addstickers/ URLs (e.g., animals). Can contain only english letters, digits and underscores. Must begin with a letter, can't contain consecutive underscores and must end in “_by_<bot username>”. <bot_username> is case insensitive. 1-64 characters. */
      name: String;
      /** Sticker set title, 1-64 characters */
      title: String;
      /** PNG image with the sticker, must be up to 512 kilobytes in size, dimensions must not exceed 512px, and either width or height must be exactly 512px. Pass a file_id as a String to send a file that already exists on the Telegram servers, pass an HTTP URL as a String for Telegram to get a file from the Internet, or upload a new one using multipart/form-data. */
      png_sticker?: F | String;
      /** TGS animation with the sticker, uploaded using multipart/form-data. See https://core.telegram.org/animated_stickers#technical-requirements for technical requirements */
      tgs_sticker?: F;
      /** One or more emoji corresponding to the sticker */
      emojis: String;
      /** Pass True, if a set of mask stickers should be created */
      contains_masks?: Boolean;
      /** A JSON-serialized object for position where the mask should be placed on faces */
      mask_position?: MaskPosition;
    }): True;

    /** Use this method to add a new sticker to a set created by the bot. You must use exactly one of the fields png_sticker or tgs_sticker. Animated stickers can be added to animated sticker sets and only to them. Animated sticker sets can have up to 50 stickers. Static sticker sets can have up to 120 stickers. Returns True on success. */
    addStickerToSet(args: {
      /** User identifier of sticker set owner */
      user_id: Integer;
      /** Sticker set name */
      name: String;
      /** PNG image with the sticker, must be up to 512 kilobytes in size, dimensions must not exceed 512px, and either width or height must be exactly 512px. Pass a file_id as a String to send a file that already exists on the Telegram servers, pass an HTTP URL as a String for Telegram to get a file from the Internet, or upload a new one using multipart/form-data. */
      png_sticker?: F | String;
      /** TGS animation with the sticker, uploaded using multipart/form-data. See https://core.telegram.org/animated_stickers#technical-requirements for technical requirements */
      tgs_sticker?: F;
      /** One or more emoji corresponding to the sticker */
      emojis: String;
      /** A JSON-serialized object for position where the mask should be placed on faces */
      mask_position?: MaskPosition;
    }): True;

    /** Use this method to move a sticker in a set created by the bot to a specific position. Returns True on success. */
    setStickerPositionInSet(args: {
      /** File identifier of the sticker */
      sticker: String;
      /** New sticker position in the set, zero-based */
      position: Integer;
    }): True;

    /** Use this method to delete a sticker from a set created by the bot. Returns True on success. */
    deleteStickerFromSet(args: {
      /** File identifier of the sticker */
      sticker: String;
    }): True;

    /** Use this method to set the thumbnail of a sticker set. Animated thumbnails can be set for animated sticker sets only. Returns True on success. */
    setStickerSetThumb(args: {
      /** Sticker set name */
      name: String;
      /** User identifier of the sticker set owner */
      user_id: Integer;
      /** A PNG image with the thumbnail, must be up to 128 kilobytes in size and have width and height exactly 100px, or a TGS animation with the thumbnail up to 32 kilobytes in size; see https://core.telegram.org/animated_stickers#technical-requirements for animated sticker technical requirements. Pass a file_id as a String to send a file that already exists on the Telegram servers, pass an HTTP URL as a String for Telegram to get a file from the Internet, or upload a new one using multipart/form-data.. Animated sticker set thumbnail can't be uploaded via HTTP URL. */
      thumb: F | String;
    }): True;

    /** Use this method to send answers to an inline query. On success, True is returned.
    No more than 50 results per query are allowed.

    Example: An inline bot that sends YouTube videos can ask the user to connect the bot to their YouTube account to adapt search results accordingly. To do this, it displays a 'Connect your YouTube account' button above the results, or even before showing any. The user presses the button, switches to a private chat with the bot and, in doing so, passes a start parameter that instructs the bot to return an oauth link. Once done, the bot can offer a switch_inline button so that the user can easily return to the chat where they wanted to use the bot's inline capabilities. */
    answerInlineQuery(args: {
      /** Unique identifier for the answered query */
      inline_query_id: String;
      /** A JSON-serialized array of results for the inline query */
      results: readonly InlineQueryResult[];
      /** The maximum amount of time in seconds that the result of the inline query may be cached on the server. Defaults to 300. */
      cache_time?: Integer;
      /** Pass True, if results may be cached on the server side only for the user that sent the query. By default, results may be returned to any user who sends the same query */
      is_personal?: Boolean;
      /** Pass the offset that a client should send in the next query with the same text to receive more results. Pass an empty string if there are no more results or if you don't support pagination. Offset length can't exceed 64 bytes. */
      next_offset?: String;
      /** If passed, clients will display a button with specified text that switches the user to a private chat with the bot and sends the bot a start message with the parameter switch_pm_parameter */
      switch_pm_text?: String;
      /** Deep-linking parameter for the /start message sent to the bot when user presses the switch button. 1-64 characters, only A-Z, a-z, 0-9, _ and - are allowed. */
      switch_pm_parameter?: String;
    }): True;

    /** Use this method to send invoices. On success, the sent Message is returned. */
    sendInvoice(args: {
      /** Unique identifier for the target private chat */
      chat_id: Integer;
      /** Product name, 1-32 characters */
      title: String;
      /** Product description, 1-255 characters */
      description: String;
      /** Bot-defined invoice payload, 1-128 bytes. This will not be displayed to the user, use for your internal processes. */
      payload: String;
      /** Payments provider token, obtained via Botfather */
      provider_token: String;
      /** Unique deep-linking parameter that can be used to generate this invoice when used as a start parameter */
      start_parameter: String;
      /** Three-letter ISO 4217 currency code, see more on currencies */
      currency: String;
      /** Price breakdown, a JSON-serialized list of components (e.g. product price, tax, discount, delivery cost, delivery tax, bonus, etc.) */
      prices: readonly LabeledPrice[];
      /** A JSON-serialized data about the invoice, which will be shared with the payment provider. A detailed description of required fields should be provided by the payment provider. */
      provider_data?: String;
      /** URL of the product photo for the invoice. Can be a photo of the goods or a marketing image for a service. People like it better when they see what they are paying for. */
      photo_url?: String;
      /** Photo size */
      photo_size?: Integer;
      /** Photo width */
      photo_width?: Integer;
      /** Photo height */
      photo_height?: Integer;
      /** Pass True, if you require the user's full name to complete the order */
      need_name?: Boolean;
      /** Pass True, if you require the user's phone number to complete the order */
      need_phone_number?: Boolean;
      /** Pass True, if you require the user's email address to complete the order */
      need_email?: Boolean;
      /** Pass True, if you require the user's shipping address to complete the order */
      need_shipping_address?: Boolean;
      /** Pass True, if user's phone number should be sent to provider */
      send_phone_number_to_provider?: Boolean;
      /** Pass True, if user's email address should be sent to provider */
      send_email_to_provider?: Boolean;
      /** Pass True, if the final price depends on the shipping method */
      is_flexible?: Boolean;
      /** Sends the message silently. Users will receive a notification with no sound. */
      disable_notification?: Boolean;
      /** If the message is a reply, ID of the original message */
      reply_to_message_id?: Integer;
      /** Pass True, if the message should be sent even if the specified replied-to message is not found */
      allow_sending_without_reply?: Boolean;
      /** A JSON-serialized object for an inline keyboard. If empty, one 'Pay total price' button will be shown. If not empty, the first button must be a Pay button. */
      reply_markup?: InlineKeyboardMarkup;
    }): Message.InvoiceMessage;

    /** If you sent an invoice requesting a shipping address and the parameter is_flexible was specified, the Bot API will send an Update with a shipping_query field to the bot. Use this method to reply to shipping queries. On success, True is returned. */
    answerShippingQuery(args: {
      /** Unique identifier for the query to be answered */
      shipping_query_id: String;
      /** Specify True if delivery to the specified address is possible and False if there are any problems (for example, if delivery to the specified address is not possible) */
      ok: Boolean;
      /** Required if ok is True. A JSON-serialized array of available shipping options. */
      shipping_options?: readonly ShippingOption[];
      /** Required if ok is False. Error message in human readable form that explains why it is impossible to complete the order (e.g. "Sorry, delivery to your desired address is unavailable'). Telegram will display this message to the user. */
      error_message?: String;
    }): True;

    /** Once the user has confirmed their payment and shipping details, the Bot API sends the final confirmation in the form of an Update with the field pre_checkout_query. Use this method to respond to such pre-checkout queries. On success, True is returned. Note: The Bot API must receive an answer within 10 seconds after the pre-checkout query was sent. */
    answerPreCheckoutQuery(args: {
      /** Unique identifier for the query to be answered */
      pre_checkout_query_id: String;
      /** Specify True if everything is alright (goods are available, etc.) and the bot is ready to proceed with the order. Use False if there are any problems. */
      ok: Boolean;
      /** Required if ok is False. Error message in human readable form that explains the reason for failure to proceed with the checkout (e.g. "Sorry, somebody just bought the last of our amazing black T-shirts while you were busy filling out your payment details. Please choose a different color or garment!"). Telegram will display this message to the user. */
      error_message?: String;
    }): True;

    /** Informs a user that some of the Telegram Passport elements they provided contains errors. The user will not be able to re-submit their Passport to you until the errors are fixed (the contents of the field for which you returned the error must change). Returns True on success.

    Use this if the data submitted by the user doesn't satisfy the standards your service requires for any reason. For example, if a birthday date seems invalid, a submitted document is blurry, a scan shows evidence of tampering, etc. Supply some details in the error message to make sure the user knows how to correct the issues. */
    setPassportDataErrors(args: {
      /** User identifier */
      user_id: Integer;
      /** A JSON-serialized array describing the errors */
      errors: readonly PassportElementError[];
    }): True;

    /** Use this method to send a game. On success, the sent Message is returned. */
    sendGame(args: {
      /** Unique identifier for the target chat */
      chat_id: Integer;
      /** Short name of the game, serves as the unique identifier for the game. Set up your games via Botfather. */
      game_short_name: String;
      /** Sends the message silently. Users will receive a notification with no sound. */
      disable_notification?: Boolean;
      /** If the message is a reply, ID of the original message */
      reply_to_message_id?: Integer;
      /** Pass True, if the message should be sent even if the specified replied-to message is not found */
      allow_sending_without_reply?: Boolean;
      /** A JSON-serialized object for an inline keyboard. If empty, one 'Play game_title' button will be shown. If not empty, the first button must launch the game. */
      reply_markup?: InlineKeyboardMarkup;
    }): Message.GameMessage;

    /** Use this method to set the score of the specified user in a game. On success, if the message was sent by the bot, returns the edited Message, otherwise returns True. Returns an error, if the new score is not greater than the user's current score in the chat and force is False. */
    setGameScore(args: {
      /** User identifier */
      user_id: Integer;
      /** New score, must be non-negative */
      score: Integer;
      /** Pass True, if the high score is allowed to decrease. This can be useful when fixing mistakes or banning cheaters */
      force: Boolean;
      /** Pass True, if the game message should not be automatically edited to include the current scoreboard */
      disable_edit_message: Boolean;
      /** Required if inline_message_id is not specified. Unique identifier for the target chat */
      chat_id?: Integer;
      /** Required if inline_message_id is not specified. Identifier of the sent message */
      message_id?: Integer;
      /** Required if chat_id and message_id are not specified. Identifier of the inline message */
      inline_message_id?: String;
    }): (Update.Edited & Message.GameMessage) | True;

    /** Use this method to get data for high score tables. Will return the score of the specified user and several of their neighbors in a game. On success, returns an Array of GameHighScore objects.

    This method will currently return scores for the target user, plus two of their closest neighbors on each side. Will also return the top three users if the user and his neighbors are not among them. Please note that this behavior is subject to change. */
    getGameHighScores(args: {
      /** Target user id */
      user_id: Integer;
      /** Required if inline_message_id is not specified. Unique identifier for the target chat */
      chat_id?: Integer;
      /** Required if inline_message_id is not specified. Identifier of the sent message */
      message_id?: Integer;
      /** Required if chat_id and message_id are not specified. Identifier of the inline message */
      inline_message_id?: String;
    }): GameHighScore[];
  };

  /** This object represents the content of a media message to be sent. It should be one of
  - InputMediaAnimation
  - InputMediaDocument
  - InputMediaAudio
  - InputMediaPhoto
  - InputMediaVideo */
  InputMedia:
    | Typegram<F>["InputMediaAnimation"]
    | Typegram<F>["InputMediaDocument"]
    | Typegram<F>["InputMediaAudio"]
    | Typegram<F>["InputMediaPhoto"]
    | Typegram<F>["InputMediaVideo"];

  /** Represents a photo to be sent. */
  InputMediaPhoto: {
    /** Type of the result, must be photo */
    type: "photo";
    /** File to send. Pass a file_id to send a file that exists on the Telegram servers (recommended), pass an HTTP URL for Telegram to get a file from the Internet, or pass “attach://<file_attach_name>” to upload a new one using multipart/form-data under <file_attach_name> name. More info on Sending Files » */
    media: F | String;
    /** Caption of the photo to be sent, 0-1024 characters after entities parsing */
    caption?: String;
    /** Mode for parsing entities in the photo caption. See formatting options for more details. */
    parse_mode?: ParseMode;
    /** List of special entities that appear in the caption, which can be specified instead of parse_mode */
    caption_entities?: MessageEntity[];
  };

  /** Represents a video to be sent. */
  InputMediaVideo: {
    /** Type of the result, must be video */
    type: "video";
    /** File to send. Pass a file_id to send a file that exists on the Telegram servers (recommended), pass an HTTP URL for Telegram to get a file from the Internet, or pass “attach://<file_attach_name>” to upload a new one using multipart/form-data under <file_attach_name> name. More info on Sending Files » */
    media: F | String;
    /** Thumbnail of the file sent; can be ignored if thumbnail generation for the file is supported server-side. The thumbnail should be in JPEG format and less than 200 kB in size. A thumbnail's width and height should not exceed 320. Ignored if the file is not uploaded using multipart/form-data. Thumbnails can't be reused and can be only uploaded as a new file, so you can pass “attach://<file_attach_name>” if the thumbnail was uploaded using multipart/form-data under <file_attach_name>. More info on Sending Files » */
    thumb?: F | String;
    /** Caption of the video to be sent, 0-1024 characters after entities parsing */
    caption?: String;
    /** Mode for parsing entities in the video caption. See formatting options for more details. */
    parse_mode?: ParseMode;
    /** List of special entities that appear in the caption, which can be specified instead of parse_mode */
    caption_entities?: MessageEntity[];
    /** Video width */
    width?: Integer;
    /** Video height */
    height?: Integer;
    /** Video duration */
    duration?: Integer;
    /** Pass True, if the uploaded video is suitable for streaming */
    supports_streaming?: Boolean;
  };

  /** Represents an animation file (GIF or H.264/MPEG-4 AVC video without sound) to be sent. */
  InputMediaAnimation: {
    /** Type of the result, must be animation */
    type: "animation";
    /** File to send. Pass a file_id to send a file that exists on the Telegram servers (recommended), pass an HTTP URL for Telegram to get a file from the Internet, or pass “attach://<file_attach_name>” to upload a new one using multipart/form-data under <file_attach_name> name. More info on Sending Files » */
    media: F | String;
    /** Thumbnail of the file sent; can be ignored if thumbnail generation for the file is supported server-side. The thumbnail should be in JPEG format and less than 200 kB in size. A thumbnail's width and height should not exceed 320. Ignored if the file is not uploaded using multipart/form-data. Thumbnails can't be reused and can be only uploaded as a new file, so you can pass “attach://<file_attach_name>” if the thumbnail was uploaded using multipart/form-data under <file_attach_name>. More info on Sending Files » */
    thumb?: F | String;
    /** Caption of the animation to be sent, 0-1024 characters after entities parsing */
    caption?: String;
    /** Mode for parsing entities in the animation caption. See formatting options for more details. */
    parse_mode?: ParseMode;
    /** List of special entities that appear in the caption, which can be specified instead of parse_mode */
    caption_entities?: MessageEntity[];
    /** Animation width */
    width?: Integer;
    /** Animation height */
    height?: Integer;
    /** Animation duration */
    duration?: Integer;
  };

  /** Represents an audio file to be treated as music to be sent. */
  InputMediaAudio: {
    /** Type of the result, must be audio */
    type: "audio";
    /** File to send. Pass a file_id to send a file that exists on the Telegram servers (recommended), pass an HTTP URL for Telegram to get a file from the Internet, or pass “attach://<file_attach_name>” to upload a new one using multipart/form-data under <file_attach_name> name. More info on Sending Files » */
    media: F | String;
    /** Thumbnail of the file sent; can be ignored if thumbnail generation for the file is supported server-side. The thumbnail should be in JPEG format and less than 200 kB in size. A thumbnail's width and height should not exceed 320. Ignored if the file is not uploaded using multipart/form-data. Thumbnails can't be reused and can be only uploaded as a new file, so you can pass “attach://<file_attach_name>” if the thumbnail was uploaded using multipart/form-data under <file_attach_name>. More info on Sending Files » */
    thumb?: F | String;
    /** Caption of the audio to be sent, 0-1024 characters after entities parsing */
    caption?: String;
    /** Mode for parsing entities in the audio caption. See formatting options for more details. */
    parse_mode?: ParseMode;
    /** List of special entities that appear in the caption, which can be specified instead of parse_mode */
    caption_entities?: MessageEntity[];
    /** Duration of the audio in seconds */
    duration?: Integer;
    /** Performer of the audio */
    performer?: String;
    /** Title of the audio */
    title?: String;
  };

  /** Represents a general file to be sent. */
  InputMediaDocument: {
    /** Type of the result, must be document */
    type: "document";
    /** File to send. Pass a file_id to send a file that exists on the Telegram servers (recommended), pass an HTTP URL for Telegram to get a file from the Internet, or pass “attach://<file_attach_name>” to upload a new one using multipart/form-data under <file_attach_name> name. More info on Sending Files » */
    media: F | String;
    /** Thumbnail of the file sent; can be ignored if thumbnail generation for the file is supported server-side. The thumbnail should be in JPEG format and less than 200 kB in size. A thumbnail's width and height should not exceed 320. Ignored if the file is not uploaded using multipart/form-data. Thumbnails can't be reused and can be only uploaded as a new file, so you can pass “attach://<file_attach_name>” if the thumbnail was uploaded using multipart/form-data under <file_attach_name>. More info on Sending Files » */
    thumb?: F | String;
    /** Caption of the document to be sent, 0-1024 characters after entities parsing */
    caption?: String;
    /** Mode for parsing entities in the document caption. See formatting options for more details. */
    parse_mode?: ParseMode;
    /** List of special entities that appear in the caption, which can be specified instead of parse_mode */
    caption_entities?: MessageEntity[];
    /** Disables automatic server-side content type detection for files uploaded using multipart/form-data. Always true, if the document is sent as part of an album. */
    disable_content_type_detection?: Boolean;
  };
}

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
    /** Date the message was last edited in Unix time */
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

export namespace Message {
  interface ServiceMessage {
    /** Unique message identifier inside this chat */
    message_id: Integer;
    /** Sender, empty for messages sent to channels */
    from?: User;
    /** Sender of the message, sent on behalf of a chat. The channel itself for channel messages. The supergroup itself for messages from anonymous group administrators. The linked channel for messages automatically forwarded to the discussion group */
    sender_chat?: Chat;
    /** Date the message was sent in Unix time */
    date: Integer;
    /** Conversation the message belongs to */
    chat: Chat;
  }
  interface CommonMessage extends ServiceMessage {
    /** For forwarded messages, sender of the original message */
    forward_from?: User;
    /** For messages forwarded from channels or from anonymous administrators, information about the original sender chat */
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
    /** Signature of the post author for messages in channels, or the custom title of an anonymous group administrator */
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
  interface CaptionableMessage extends CommonMessage {
    /** Caption for the animation, audio, document, photo, video or voice, 0-1024 characters */
    caption?: String;
    /** For messages with a caption, special entities like usernames, URLs, bot commands, etc. that appear in the caption */
    caption_entities?: MessageEntity[];
  }
  interface MediaMessage extends CaptionableMessage {
    /** The unique identifier of a media message group this message belongs to */
    media_group_id?: String;
  }
  export interface AudioMessage extends CaptionableMessage {
    /** Message is an audio file, information about the file */
    audio: Audio;
  }
  export interface DocumentMessage extends CaptionableMessage {
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
  export interface VoiceMessage extends CaptionableMessage {
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
    migrate_from_chat_id: Integer;
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
    passport_data: PassportData;
  }
  export interface ProximityAlertTriggeredMessage extends ServiceMessage {
    /** Service message. A user in the chat triggered another user's proximity alert while sharing Live Location. */
    proximity_alert_triggered?: ProximityAlertTriggered;
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
  | Message.ProximityAlertTriggeredMessage
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

/** This object represents a unique message identifier. */
export interface MessageId {
  /** Unique message identifier */
  message_id: Integer;
}

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
  /** Original filename as defined by sender */
  file_name?: String;
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
  /** Original filename as defined by sender */
  file_name?: String;
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
  /** Value of the dice, 1-6 for “🎲” and “🎯” base emoji, 1-5 for “🏀” and “⚽” base emoji, 1-64 for “🎰” base emoji */
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
  /** Poll question, 1-300 characters */
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
  /** The radius of uncertainty for the location, measured in meters; 0-1500 */
  horizontal_accuracy?: Float;
  /** Time relative to the message sending date, during which the location can be updated, in seconds. For active live locations only. */
  live_period?: Integer;
  /** The direction in which user is moving, in degrees; 1-360. For active live locations only. */
  heading?: Integer;
  /** Maximum distance for proximity alerts about approaching another chat member, in meters. For sent live locations only. */
  proximity_alert_radius?: Integer;
}

/** This object represents a venue. */
export interface Venue {
  /** Venue location. Can't be a live location */
  location: Location;
  /** Name of the venue */
  title: String;
  /** Address of the venue */
  address: String;
  /** Foursquare identifier of the venue */
  foursquare_id?: String;
  /** Foursquare type of the venue. (For example, “arts_entertainment/default”, “arts_entertainment/aquarium” or “food/icecream”.) */
  foursquare_type?: String;
  /** Google Places identifier of the venue */
  google_place_id?: String;
  /** Google Places type of the venue. (See supported types.) */
  google_place_type?: String;
}

/** This object represents the content of a service message, sent whenever a user in the chat triggers a proximity alert set by another user. */
export interface ProximityAlertTriggered {
  /** User that triggered the alert */
  traveler: User;
  /** User that set the alert */
  watcher: User;
  /** The distance between the users */
  distance: Integer;
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

export namespace KeyboardButton {
  export interface CommonButton {
    /** Text of the button. If none of the optional fields are used, it will be sent as a message when the button is pressed */
    text: String;
  }
  export interface RequestContactButton extends CommonButton {
    /** If True, the user's phone number will be sent as a contact when the button is pressed. Available in private chats only */
    request_contact: Boolean;
  }
  export interface RequestLocationButton extends CommonButton {
    /** If True, the user's current location will be sent when the button is pressed. Available in private chats only */
    request_location: Boolean;
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

export namespace CallbackQuery {
  interface AbstractCallbackQuery {
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
  }
  export interface DataCallbackQuery extends AbstractCallbackQuery {
    /** Data associated with the callback button. Be aware that a bad client can send arbitrary data in this field. */
    data: String;
  }
  export interface GameShortGameCallbackQuery extends AbstractCallbackQuery {
    /** Short name of a Game to be returned, serves as the unique identifier for the game */
    game_short_name: String;
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

/** This object represents the contents of a file to be uploaded. Must be posted using multipart/form-data in the usual way that files are uploaded via the browser. */
export type InputFile = FileId;
export type FileId = String;

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
