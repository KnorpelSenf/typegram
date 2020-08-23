# Types for the Telegram API

This project provides TypeScript types for the entire [Telegram API](https://core.telegram.org/bots/api) in version 4.9 which was released on June 4, 2020.

## Good to know

- Generally this package just exposes a huge load of `interface`s as well as another `interface Telegram` which contains all available methods of the API.
  There is no further structure applied to this, but if you can come up with something reasonable, please suggest it in an issue or directly open a PR.

- All of the methods are specified with the actual return type of the Telegram API.
  If you need them to return `Promise`s instead, consider using `TelegramP`.
  This type maps all methods of `Telegram` to a promisified version.

- Each method takes just a single argument with a structure that corresponds to the object expected by Telegram.
  If you need to directly access that type, consider using `Opts<M>` where `M` is the method name (e.g. `Opts<'getMe'>`).

## Where do the types come from

They're handwritten.

That is, they're of course not entirely handwritten.
The initial version of them were produced in one afternoon by a combination of copying and pasting from the website, VIM magic, regular expressions and VSCode auto-formatting the rest.

Previous attempts to harvest them directly from the website with a script failed due to the required effort of handling special cases about the layout of the website.

Future updates to the API will be integrated manually in a similar fashion.
