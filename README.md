# app-badge

Easily add badges to your app icons

insprired by https://github.com/HazAT/badge. This is a minified version of the package without installing all the dependencies required by fastlane.

This is particularly useful when you have multiple release channels for your app and you need to show the status of different builds.

- Works with iOS
- Works with android
- Works with react-native

## Installation

```bash
$ yarn global add @grgmgd/app-badge
```

or

```bash
$ yarn add -D @grgmgd/app-badge
```

## Usage

Using it with the default options, just run:

```bash
$ app-badge --shield Staging-2.6.0-orange
```

You'll have to pass a valid shield name as described in [shields.io](https://shields.io/)

### You can also pass the following options to customize the behaviour

| Option  |                           Description                            |  Default |
| ------- | :--------------------------------------------------------------: | -------: |
| shield  |        Shield name from [shields.io](https://shields.io/)        |          |
| gravity |           Badge alignment with respect to the app icon           | "center" |
| scale   |          Badge scale with respect to the app icon size           |      0.5 |
| glob    | Passing a different regex path for the package to look for icons |          |

Default `glob` value is defined in `lib/index.js` and is configured to work out of the box with `react-native`. But it should work with `ios` and `android` too, you'll have to change the glob in order for it to work though.
