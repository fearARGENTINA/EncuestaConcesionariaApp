"use strict";

fillChart = function fillChart(dataArray) {
  myChart.data.datasets[0].data = dataArray;
  myChart.update();
};

$('.reportes-button button').on('click', function () {
  var data = mapToDataChart(listaEncuestados);
  var ctx = $('#myChart');
  fillChart(data);
  ctx.show();
});