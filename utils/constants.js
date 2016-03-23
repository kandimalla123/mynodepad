  function define(name, value) {
    Object.defineProperty(exports, name, {
        value:      value,
        enumerable: true
    });
}
  
 define("METHOD_BEGIN", 'method begin');
 define("METHOD_END", 'method end');
 
 define("SUCCESS_RESP", 'sucess:repsonse ');
 define("ERROR_RESP", 'error:response ');
