# It's So Shiny! A Pure TypeScript Ray Tracer

## Introduction

This project is a TypeScript implementation of a pure JavaScript ray tracer inspired by Dylan Beattie's talk, ["It's So Shiny! A Pure JavaScript Ray-Tracer"](https://www.youtube.com/live/PNKlC3lk9Kg?si=IdGzrk4F6QpYS4bj). The original implementation was in JavaScript, and my main motivation for this project was to learn TypeScript in an engaging and hands-on way.

By converting the project to TypeScript, I gained a deeper understanding of type safety, modern JavaScript tooling, and how to structure a TypeScript application while implementing an exciting rendering algorithm.

## Features

- Fully written in TypeScript
- Uses HTML5 Canvas for rendering
- Supports configurable lighting, camera, and material properties
- Multithreaded rendering using Web Workers
- Modular design with reusable components

## Installation

To get started, clone the repository and install the dependencies:

```sh
npm install
```

## Usage

To start the development server and experiment with the ray tracer in your browser, run:

```sh
npm run dev
```

To build the project for production:

```sh
npm run build
```

To preview the built version:

```sh
npm run preview
```

## Acknowledgments

This project is heavily based on Dylan Beattie's original ray tracing example. The only real innovation here is the TypeScript adaptation, which served as my learning experience. If you're interested in the original JavaScript version, I highly recommend watching his talk.

## License

This project is open-source and available under the MIT license.
