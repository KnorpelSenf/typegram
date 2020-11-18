# Types for the Telegram API

This project provides TypeScript types for the entire [Telegram API](https://core.telegram.org/bots/api) in version 5.0 which was released on November 4, 2020.

It contains zero bytes of executable code.

## Installation

```bash
npm install --save-dev typegram
```

## Available Types

Generally this package just exposes a huge load of `interface`s that correspond to the **types** used throughout the Telegram API.

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
- `Update`

(Naturally, when the API specification is actually modelling types to be unions (e.g. `InputMedia`), this is reflected here as a union type, too.)

## Available Methods

In addition to the types, this package provides you with another `interface Telegram` which contains all available **methods** of the API.
There is no further structure applied to this, but if you can come up with something reasonable, please suggest it in an issue or directly open a PR.

Each method takes just a single argument with a structure that corresponds to the object expected by Telegram.
If you need to directly access that type, consider using `Opts<M>` where `M` is the method name (e.g. `Opts<'getMe'>`).

Note that `Opts<M>` will give you an empty object type (i.e. `{}`) for methods that do not take any parameters.
That is to say, it will not give you a type error or `undefined` (as opposed to something like `Parameters<Telegram['getMe']>[0]`).

## Caveat with JSON-serialized objects

Some methods of the Telegram API are expected to be called with JSON-serialized objects contained in a property of the payload, rather than an actual JSON payload.
In other words, the objects are serialized twice—the first time in order to conform with the docs, and the second time when the payload is actually sent in the POST body to the API server.

The most prominent example is the `reply_markup` property that appears in a number of different methods, but more than a dozen other properties like this can be found throughout the API.

Strictly speaking, the `typegram` types do not reflect this accurately.
Instead of using `string` (that is representing an object) as the type, `typegram` uses the type of the object itself, thus ignoring the serialization step.
For instance, instead of declaring `reply_markup: string`, it declares the property as `reply_markup: InlineKeyboardMarkup | ReplyKeyboardMarkup | ReplyKeyboardRemove | ForceReply` because that is what is supposed to be serialized to `string` before calling the respective method.

This makes sense for two reasons.

1. The goal of this library is to provide type safety.
   However, the contents of a string cannot be typechecked for being valid JSON of the correct object.
   As a result, we would be missing type safety if we would only model the properties as `string`.
2. A common use case for this library is to pull the types into some wrapper code around the Telegram Bot API.
   This wrapper code often does the necessary JSON serialization automatically for the required properties.
   The consumer then does not need to care about which properties to serialize and which not.
   Given that `typegram` refers to the objects themselves instead of their serialized strings, the wrapper code can now simply expose the `typegram` types to its consumers without having to transform the types before.

## Using Promises

All of the methods are specified with the actual return type of the Telegram API.
If you need them to return `Promise`s instead, consider using `TelegramP`.
This type maps all methods of `Telegram` to a promisified version.

## Where do the types come from

They're handwritten.

That is, they're of course not entirely handwritten.
The initial version of them were produced in one afternoon by a combination of copying and pasting from the website, VIM magic, regular expressions and VSCode auto-formatting the rest.

After that, some more work and a few community contributions did the polishing.

Future updates to the API will be integrated manually in a similar fashion.

Other people's previous attempts to harvest the types directly from the website using a script failed due to the required effort of handling special cases about the layout of the website.
