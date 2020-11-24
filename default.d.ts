import { Typegram } from "./proxied";

/** This object represents the contents of a file to be uploaded. Must be posted using multipart/form-data in the usual way that files are uploaded via the browser. */
export type InputFile = never;

type DefaultTypegram = Typegram<InputFile>;

/** Wrapper type to bundle all methods of the Telegram API */
export type Telegram = DefaultTypegram["Telegram"];

/** Utility type providing the argument type for the given method name or `{}` if the method does not take any parameters */
export type Opts<
  M extends keyof DefaultTypegram["Telegram"]
> = DefaultTypegram["Opts"][M];

/** Utility type providing a promisified version of Telegram */
export type TelegramP = DefaultTypegram["TelegramP"];

/** This object represents the content of a media message to be sent. It should be one of
- InputMediaAnimation
- InputMediaDocument
- InputMediaAudio
- InputMediaPhoto
- InputMediaVideo */
export type InputMedia = DefaultTypegram["InputMedia"];
/** Represents a photo to be sent. */
export type InputMediaPhoto = DefaultTypegram["InputMediaPhoto"];
/** Represents a video to be sent. */
export type InputMediaVideo = DefaultTypegram["InputMediaVideo"];
/** Represents an animation file (GIF or H.264/MPEG-4 AVC video without sound) to be sent. */
export type InputMediaAnimation = DefaultTypegram["InputMediaAnimation"];
/** Represents an audio file to be treated as music to be sent. */
export type InputMediaAudio = DefaultTypegram["InputMediaAudio"];
/** Represents a general file to be sent. */
export type InputMediaDocument = DefaultTypegram["InputMediaDocument"];
