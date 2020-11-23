import { Integer, String } from "./alias";

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

/** This object represents the contents of a file to be uploaded. Must be posted using multipart/form-data in the usual way that files are uploaded via the browser. */
export type InputFile = String;
