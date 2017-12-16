'use strict';

export function hello(event: any, context: any, callback: any) {
  console.log(event)
  callback(null, {
    message: "Hello World!"
  });
};
