'use strict';

export function hello(event: any, context: any, callback: Function) {
  console.log(event)
  callback(null, {
    message: "Hello World!"
  });
};
