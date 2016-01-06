// Compiled using typings@0.4.0
// Source: https://raw.githubusercontent.com/inakianduaga/node-express-boilerplate/cc3d14a2b795e13d6a59652dd7ff111689b778b2/typings/dotenv/dotenv.d.ts
// Type definitions for dotenv
// Project: https://github.com/visionmedia/debug


declare module "dotenv" {

  export function load(options?: {
    path?: string,
    encoding?: string,
    silent?: Boolean
  }) : Boolean;

  export function config(options?: {
    path?: string,
    encoding?: string,
    silent?: Boolean
  }) : Boolean;
  
  export function parse(src: any): Object;

}