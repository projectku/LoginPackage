angular.module('starter')
.service('UtilService', function($q,$http,$filter,StorageService) 
{
    var ApiUrl = function()
    {
      return "http://api.lukisongroup.com/";
    }
    
    var ArrayChunk = function (arr, size) 
    {
      var newArr = [];
      for (var i=0; i<arr.length; i+=size) 
      {
        newArr.push(arr.slice(i, i+size));
      }
      return newArr;
    }

    var SerializeObject = function (objecttoserialize) 
    {
        var resultobjecttoserialize = {};
        function serializeObj(obj) 
        {
            var str = [];
            for (var key in obj) 
            {
                if (obj[key] instanceof Array) 
                {
                    for(var idx in obj[key])
                    {
                        var subObj = obj[key][idx];
                        for(var subKey in subObj)
                        {
                            str.push(encodeURIComponent(key) + "[" + idx + "][" + encodeURIComponent(subKey) + "]=" + encodeURIComponent(subObj[subKey]));
                        }
                    }
                }
                else 
                {
                    str.push(encodeURIComponent(key) + "=" + encodeURIComponent(obj[key]));
                }
            }
            return str.join("&");
        }
        
        var serialized = serializeObj(objecttoserialize); 
        var config = 
        {
            headers : 
            {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded;application/json;charset=utf-8;'   
            }
        };
        resultobjecttoserialize.serialized   = serialized;
        resultobjecttoserialize.config       = config;

        return resultobjecttoserialize;
    }

    var SqliteToArray = function(sqliteresult)
    {
    	var panjang = sqliteresult.rows.length;
    	var response = [];
  		for(var i=0; i < panjang; i++)
  		{
  			response.push(sqliteresult.rows.item(i));
  		}
		  return response;
    }

    return {
      ApiUrl:ApiUrl,
      ArrayChunk:ArrayChunk,
      SerializeObject:SerializeObject,
      SqliteToArray:SqliteToArray
    };
});