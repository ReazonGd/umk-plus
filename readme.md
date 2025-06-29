# UMK+

UMK+ is a Chrome browser extension focused on UMK (Universitas Muria Kudus) students. Built with TypeScript, Webpack, and Preact to facilitate development.

### Language

- English
- [Indonesian](./readme_id.md)

# Installation

UMK+ can only be installed manually and is not available on the Chrome Web Store.

## Installation with crx file

- Go to the releases page. [here](https://github.com/ReazonGd/umk-plus/releases).
- Download the umk-plus-x.x.x.crx file
- Go to Extension manager [chrome://extensions/](chrome://extensions/)
- Enable developer mode in the top right corner
- Drag and drop crx file.

## Installation with zip

- Go to the releases page. [here](https://github.com/ReazonGd/umk-plus/releases).
- Download the umk-plus-x.x.x.zip file
- Extract the zip file
- Go to Extension manager [chrome://extensions/](chrome://extensions/)
- Enable developer mode in the top right corner
- Click "Load unpacked" button
- Navigate to the extracted folder

## Build Installation

Clone this repository

```sh
git clone https://github.com/ReazonGd/umk-plus
```

Install packages and build

```sh
npm i && npm run build
```

After the build is complete, the ready-to-use files will be copied to `./release/umk-plus-x.x.x`. Go to Extension manager [chrome://extensions/](chrome://extensions/), enable developer mode, click the "Load unpacked" button, and navigate to the release directory.

# Disclaimer

    This project is not affiliated with any organization. Use at your own risk.
