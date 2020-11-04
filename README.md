# Types for the Telegram API

This project provides TypeScript types for the entire [Telegram API](https://core.telegram.org/bots/api) in version 4.9 which was released on June 4, 2020.

Note that the work for support of version 5.0 is in active progress.

## Installation

```bash
npm install --save-dev typegram
```

## Available Types

Generally this package just exposes a huge load of `interface`s that correspond to the **types** used throughout the Telegram API.

Note that the API specification sometimes only has one name for multiple variants of a type, e.g. there is a number of different `Update`s you can receive, but they're all just called `Update`.
This package represents such types as large unions of all possible options of what an `Update` could be, such that type narrowing can work as expected on your side.
If you need to access the individual variants of an `Update`, refer to `Update.MessageUpdate` and its siblings.

The same pattern is used for various other types, too.

## Available Methods

In addition to the types, this package provides you with another `interface Telegram` which contains all available **methods** of the API.
There is no further structure applied to this, but if you can come up with something reasonable, please suggest it in an issue or directly open a PR.

Each method takes just a single argument with a structure that corresponds to the object expected by Telegram.
If you need to directly access that type, consider using `Opts<M>` where `M` is the method name (e.g. `Opts<'getMe'>`).

Note that `Opts<M>` will give you an empty object type (i.e. `{}`) for methods that do not take any parameters.
That is to say, it will not give you a type error or `undefined` (as opposed to something like `Parameters<Telegram['getMe']>[0]`).

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
