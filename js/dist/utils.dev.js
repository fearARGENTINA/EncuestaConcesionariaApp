"use strict";

listaEncuestados = [];

transformSerialParamsToObject = function transformSerialParamsToObject(serial) {
  obj = Object.fromEntries(serial.map(function (item) {
    return [item.name, item.value];
  }));
  defParams = ["has_vehicle", "has_car", "has_motorbike", "has_van"];
  defParams.forEach(function (param) {
    if (!obj.hasOwnProperty(param)) {
      obj[param] = false;
    } else {
      obj[param] = true;
    }
  });
  obj["edad"] = parseInt(obj["edad"]);
  return obj;
};

hasMinParams = function hasMinParams(obj) {
  paramsStr = ["apellido", "edad", "nombre", "email", "tel"];
  paramsNum = ["edad"];
  return !(paramsStr.some(function (param) {
    return obj[param] === "";
  }) || paramsNum.some(function (param) {
    return isNaN(obj[param]);
  }));
};

filterPotencialesClientes = function filterPotencialesClientes(lista) {
  return listaEncuestados.filter(function (c) {
    return c["edad"] >= 25 && c["edad"] <= 50 && c["has_vehicle"];
  });
};

totalEncuestados = function totalEncuestados(lista) {
  return lista.length;
};

mapToDataChart = function mapToDataChart(lista) {
  potencialesClientes = filterPotencialesClientes(lista);
  lenPot = potencialesClientes.length;
  lenTotal = totalEncuestados(lista);
  return [lenPot, lenTotal - lenPot];
};

$(function () {
  $('#has_vehicle').on('click', function () {
    if (!$(this).is(':checked')) {
      $('#has_motorbike').attr('disabled', true);
      $('#has_car').attr('disabled', true);
      $('#has_van').attr('disabled', true);
    } else {
      $('#has_motorbike').attr('disabled', false);
      $('#has_car').attr('disabled', false);
      $('#has_van').attr('disabled', false);
    }
  });
  $('#form_survey').on('submit', function () {
    serialArr = $(this).serializeArray();
    objCliente = transformSerialParamsToObject(serialArr);
    console.log(objCliente);

    if (hasMinParams(objCliente)) {
      listaEncuestados.push(objCliente);
      console.log(listaEncuestados);
      $('input', this).val('').removeAttr('checked').removeAttr('selected');
    }

    return false;
  });
});