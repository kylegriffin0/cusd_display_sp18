function getAlert() {
    var token = 'Bearer e5159b89-86c1-3cca-8412-59de037c674b';
    return $.ajax({
      url: 'https://gateway.api.cloud.wso2.com:443/t/mystop/tcat/v1/rest/PublicMessages/GetCurrentMessages',
      type: 'GET',
      dataType: 'json',
      beforeSend: function(xhr) {
        xhr.setRequestHeader("Authorization", token);
      },
      success: function(msg) {
        var data = JSON.stringify(msg);
        //setMsg(msg);
        //DrawMap();
        //MapRoute(msg);
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) {
        alert(errorThrown);
      }
      })
}





























