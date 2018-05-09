function getWeather() {

    return $.ajax({
      url: 'https://query.yahooapis.com/v1/public/yql?q=select%20item.condition%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22ithaca%2C%20ny%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys',
      type: 'GET',
      dataType: 'json',
      success: function(msg) {
        console.log(msg);
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) {
        alert(errorThrown);
      }
      })
}