# Types for the Telegram Bot API

This project provides TypeScript types for the entire [Telegram Bot API](https://core.telegram.org/bots/api) in version 5.1 which was released on March 9, 2021.

It contains zero bytes of executable code.

## Installation

```bash
npm install --save-dev typegram
```

## Available Types

Generally this package just exposes a huge load of `interface`s that correspond to the **types** used throughout the Telegram Bot API.

Note that the API specification sometimes only has one name for multiple variants of a type, e.g. there is a number of different `Update`s you can receive, but they're all just called `Update`.
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

## Available Methods

In addition to the types, this package provides you with another type `Telegram` which contains all available **methods** of the API.
There is no further structure applied to this, but if you can come up with something reasonable, please suggest it in an issue or directly open a PR.

Each method takes just a single argument with a structure that corresponds to the object expected by Telegram.
If you need to directly access that type, consider using `Opts<M>` where `M` is the method name (e.g. `Opts<'getMe'>`).

Note that `Opts<M>` will give you an empty object type (i.e. `{}`) for methods that do not take any parameters.
That is to say, it will not give you a type error or `undefined` (as opposed to something like `Parameters<Telegram['getMe']>[0]`).

## Caveat with JSON-Serialized Objects

Some methods of the Telegram Bot API are expected to be called with JSON-serialized objects contained in a property of the payload, rather than an actual JSON payload.
In other words, the objects are serialized twice—the first time in order to conform with the docs, and the second time when the payload is actually sent in the POST body to the API server.

The most prominent example is the `reply_markup` property that appears in a number of different methods, but more than a dozen other properties like this can be found throughout the API.

Strictly speaking, the `typegram` types do not reflect this accurately.
Instead of using `string` (representing a serialized object) as the type, `typegram` uses the type of the object itself, thus ignoring the serialization step.
For instance, instead of declaring `reply_markup: string`, it declares the property as `reply_markup: InlineKeyboardMarkup | ReplyKeyboardMarkup | ReplyKeyboardRemove | ForceReply` because that is what is supposed to be serialized to `string` before calling the respective method.

This makes sense for two reasons.

1. The goal of this library is to provide type safety.
   However, the contents of a string cannot be typechecked for being valid JSON of the correct object.
   As a result, we would be missing type safety if we would only model the properties as `string`.
2. A common use case for this library is to pull the types into some wrapper code around the Telegram Bot API.
   This wrapper code often does the necessary JSON serialization automatically for the required properties.
   The consumer then does not need to care about which properties to serialize and which not.
   Given that `typegram` refers to the objects themselves instead of their serialized strings, the wrapper code can now simply expose the `typegram` types to its consumers without having to transform them before.

## Using Promises

All of the methods are specified with the actual return type of the Telegram Bot API.
If you need them to return `Promise`s instead, consider using `TelegramP`.
This type maps all methods of `Telegram` to a promisified version.

## Using API Response Objects

The Telegram Bot API does not return just the requested data in the body of the response objects.
Instead, they are wrapped inside an object that has an `ok: boolean` status flag, indicating success or failure of the preceding API request.
This outer object is modelled in `typegram` by the `ApiResponse` type.

If you need the methods of `Telegram` to return `ApiResponse` objects instead of the raw data, consider using `TelegramR`.
This works analogously to `TelegramP`.
The type maps all methods of `Telegram` to a version where they return `ApiResponse` objects of the data, instead of the data themselves.

## Using Both Promises and API Response Objects

Yes.
`TelegramPR`.

## Customizing `InputFile`

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
Consequently, the exposed type `InputFile` is merely an alias for `never`.

However, you can specify your own version of what an `InputFile` is, hence effectively creating a completely new version of `typegram` with your custom `InputFile` type used throughout all affected methods and interfaces.
This is possible by what we call a _proxy type_.

For instance, let's stick with our example and say that you want to support `InputFile`s of the following type.

```ts
interface MyInputFile {
  path: string;
}
```

You can then customize `typegram` to fit your needs by

1. importing the magical `Typegram` proxy type and
2. setting this alias:

```ts
import { Typegram } from "typegram";

type MyTypegram = Typegram<MyInputFile>;
```

You can now access all types that must respect `MyInputFile` through the `MyTypegram` type:

```ts
// The `Telegram` type that contains all API methods:
type Telegram = MyTypegram["Telegram"]; // analogous for `TelegramP`, `TelegramR`, and `TelegramPR`

// The utility type `Opts`:
type Opts<M extends keyof Telegram> = MyTypegram["Opts"][M];

// The adjusted `InputMedia*` types:
type InputMedia = MyTypegram["InputMedia"];
type InputMediaPhoto = MyTypegram["InputMediaPhoto"];
type InputMediaVideo = MyTypegram["InputMediaVideo"];
type InputMediaAnimation = MyTypegram["InputMediaAnimation"];
type InputMediaAudio = MyTypegram["InputMediaAudio"];
type InputMediaDocument = MyTypegram["InputMediaDocument"];
```

In fact, if you are using the type annotations of `typegram` without relying on the `Typegram` proxy type, you are actually still using a default proxy type under the hood.
The declaration of this default proxy type may help you to define your own version.
Check out [the default.d.ts file](https://github.com/KnorpelSenf/typegram/blob/master/default.d.ts).

Note that interfaces other than the ones mentioned above are unaffected by the customization through `MyInputFile`.
They can simply continue to be imported directly from `typegram`.

## Where Do the Types Come from

They're handwritten.

That is, they're of course not entirely handwritten.
The initial version of them were produced in one afternoon by a combination of copying and pasting from the website, VIM magic, regular expressions, and VSCode auto-formatting the rest.

After that, some more work and a few community contributions did the polishing.

Future updates to the API will be integrated manually in a similar fashion.

Other people's previous attempts to harvest the types directly from the website using a script failed due to the required effort of handling special cases about the layout of the website.
