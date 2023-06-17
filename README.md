# Types for the Telegram Bot API

> Please consider contributing to [@grammyjs/types](https://github.com/grammyjs/types) instead.
> `typegram` is legacy and will not be updated directly anymore.
> Instead, [@grammyjs/types](https://github.com/grammyjs/types) is maintained and kept in sync with the Bot API specification.
> Changes are backported to `typegram` periodically to keep older projects running.

This project provides TypeScript types for the entire [Telegram Bot API](https://core.telegram.org/bots/api) in version 6.8.

It contains zero bytes of executable code.

## Installation

```bash
npm install --save-dev typegram
```

## Available Types

Generally, this package just exposes a huge load of `interface`s that correspond to the **types** used throughout the Telegram Bot API.

Note that the API specification sometimes only has one name for multiple variants of a type, e.g. there are a number of different `Update`s you can receive, but they're all just called `Update`.
This package represents such types as large unions of all possible options of what an `Update` could be, such that type narrowing can work as expected on your side.
If you need to access the individual variants of an `Update`, refer to `Update.MessageUpdate` and its siblings.

In fact, this pattern is used for various types, namely:

- `CallbackQuery`
- `Chat`
- `ChatFromGetChat`
- `InlineKeyboardButton`
- `KeyboardButton`
- `Message`
- `MessageEntity`
- `Location`
- `Update`

(Naturally, when the API specification is actually modelling types to be unions (e.g. `InlineQueryResult`), this is reflected here as a union type, too.)

## Using API Response Objects

The Telegram Bot API does not return just the requested data in the body of the response objects.

Instead, they are wrapped inside an object that has an `ok: boolean` status flag, indicating success or failure of the preceding API request.
This outer object is modelled in `typegram` by the `ApiResponse` type.

## Customizing `InputFile` and accessing API methods

The Telegram Bot API lets bots send files in [three different ways](https://core.telegram.org/bots/api#sending-files).
Two of those ways are by specifying a `string`—either a `file_id` or a URL.
The third option, however, is by uploading files to the server using multipart/form-data.

The first two means to send a file are already covered by the type annotations across the library.
In all places where a `file_id` or a URL is permitted, the corresponding property allows a `string`.

We will now look at the type declarations that are relevant for uploading files directly.
Depending on the code you're using the `typegram` types for, you may want to support different ways to specify the file to be uploaded.
As an example, you may want to be able to make calls to `sendDocument` with an object that conforms to `{ path: string }` in order to specify the location of a local file.
(Your code is then assumed to able to translate calls to `sendDocument` and the like to multipart/form-data uploads when supplied with an object alike `{ path: '/tmp/file.txt' }` in the `document` property of the argument object.)

`typegram` cannot possibly know what objects you want to support as `InputFile`s.

However, you can specify your own version of what an `InputFile` is throughout all affected methods and interfaces.

For instance, let's stick with our example and say that you want to support `InputFile`s of the following type.

```ts
interface MyInputFile {
  path: string;
}
```

You can then customize `typegram` to fit your needs by passing your custom `InputFile` to the `ApiMethods` type.

```ts
import * as Typegram from "typegram";

type API = Typegram.ApiMethods<MyInputFile>;
```

You can now access all types that must respect `MyInputFile` through the `API` type:

```ts
// The utility types `Opts` and `Ret`:
type Opts<M extends keyof API> = Typegram.Opts<MyInputFile>[M];
type Ret<M extends keyof API> = Typegram.Ret<MyInputFile>[M];
```

Each method takes just a single argument with a structure that corresponds to the object expected by Telegram.
If you need to directly access that type, consider using `Opts<M>` where `M` is the method name (e.g. `Opts<'getMe'>`).

Each method returns the object that is specified by Telegram.
If you directly need to access the return type of a method, consider using `Ret<M>` where `M` is the method name (e.g. `Opts<'getMe'>`).

```ts
// The adjusted `InputMedia*` types:
type InputMedia = Typegram.InputMedia<MyInputFile>;
type InputMediaPhoto = Typegram.InputMediaPhoto<MyInputFile>;
type InputMediaVideo = Typegram.InputMediaVideo<MyInputFile>;
type InputMediaAnimation = Typegram.InputMediaAnimation<MyInputFile>;
type InputMediaAudio = Typegram.InputMediaAudio<MyInputFile>;
type InputMediaDocument = Typegram.InputMediaDocument<MyInputFile>;
```

Note that interfaces other than the ones mentioned above are unaffected by the customization through `MyInputFile`.
They can simply continue to be imported directly from `typegram`.
