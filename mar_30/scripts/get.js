$(document).ready(function () {

  console.log("hell0");
  var token = 'Bearer e5159b89-86c1-3cca-8412-59de037c674b';
  $.ajax({
    url: 'https://gateway.api.cloud.wso2.com:443/t/mystop/tcat/v1/rest/StopDepartures/Get/1525',
    type: 'GET',
    dataType: 'json',
    beforeSend: function(xhr) {
      xhr.setRequestHeader("Authorization", token);
    },
    //data: 'json=' + escape(JSON.stringify(createRequestObject)),
    success: function(msg) {
      console.log(msg);
      TimeTable(msg);
    },
    error: function(XMLHttpRequest, textStatus, errorThrown) {
      alert(errorThrown);
    }
  });
});