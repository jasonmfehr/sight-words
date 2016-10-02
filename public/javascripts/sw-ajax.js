var sw = sw || {};
sw.ajax = sw.ajax || {};

(function(ajax, $) {

  ajax.get = function(url, callback) {
    $.ajax('/api/' + url, {
      "dataType": "json",
      "error": function(errorText) { handleError(errorText);callback(false); },
      "success": function(data) { if(callback){callback(data);} }
    });
  };

  ajax.post = function(url, data, callback) {
    $.ajax('/api/' + url, {
      "contentType": "application/json; charset=UTF-8",
      "data": JSON.stringify({"data": data}),
      "dataType": "json",
      "method": "POST",
      "error": handleError,
      "success": function(ret) { if(callback){callback(ret);}}
    });
  };

  function handleError(errText){
    console.error(errText);
  }

  function handleSuccess(data, callback) {

  }

})(sw.ajax, jQuery);
