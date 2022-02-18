/*
 Copyright (c) 2012-2017 Open Lab
 Permission is hereby granted, free of charge, to any person obtaining
 a copy of this software and associated documentation files (the
 "Software"), to deal in the Software without restriction, including
 without limitation the rights to use, copy, modify, merge, publish,
 distribute, sublicense, and/or sell copies of the Software, and to
 permit persons to whom the Software is furnished to do so, subject to
 the following conditions:

 The above copyright notice and this permission notice shall be
 included in all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */


function dateToRelative(localTime){
  var diff=new Date().getTime()-localTime;
  var ret="";

  var min=60000;
  var hour=3600000;
  var day=86400000;
  var wee=604800000;
  var mon=2629800000;
  var yea=31557600000;

  if (diff<-yea*2)
    ret ="em ## anos".replace("##",(-diff/yea).toFixed(0));

  else if (diff<-mon*9)
    ret ="em ## meses".replace("##",(-diff/mon).toFixed(0));

  else if (diff<-wee*5)
    ret ="em ## semanas".replace("##",(-diff/wee).toFixed(0));

  else if (diff<-day*2)
    ret ="em ## dias".replace("##",(-diff/day).toFixed(0));

  else if (diff<-hour)
    ret ="em ## horas".replace("##",(-diff/hour).toFixed(0));

  else if (diff<-min*35)
    ret ="em cerca de uma hora";

  else if (diff<-min*25)
    ret ="em cerca de meia hora";

  else if (diff<-min*10)
    ret ="Em alguns minutos.";

  else if (diff<-min*2)
    ret ="em poucos minutos";

  else if (diff<=min)
    ret ="agora mesmo";

  else if (diff<=min*5)
    ret ="alguns minutos atrás";

  else if (diff<=min*15)
    ret ="alguns minutos atrás";

  else if (diff<=min*35)
    ret ="cerca de meia hora atrás";

  else if (diff<=min*75)
    ret ="cerca de uma hora atrás";

  else if (diff<=hour*5)
    ret ="algumas horas atrás";

  else if (diff<=hour*24)
    ret ="## horas atrás".replace("##",(diff/hour).toFixed(0));

  else if (diff<=day*7)
    ret ="## dias atrás".replace("##",(diff/day).toFixed(0));

  else if (diff<=wee*5)
    ret ="## semanas atrás".replace("##",(diff/wee).toFixed(0));

  else if (diff<=mon*12)
    ret ="## meses antes".replace("##",(diff/mon).toFixed(0));

  else
    ret ="## anos atrás".replace("##",(diff/yea).toFixed(0));

  return ret;
}

//override date format i18n

Date.monthNames = ["Janeiro","Fevereiro","Março","April","Maio","junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"];
// Month abbreviations. Change this for local month names
Date.monthAbbreviations = ["Jan","Fev","Mar","Apr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"];
// Full day names. Change this for local month names
Date.dayNames =["Domingo","Segunda","Terça","Quarta","Quinta","Sexta","Sábado"];
// Day abbreviations. Change this for local month names
Date.dayAbbreviations = ["Dom","Seg","Ter","Qua","Qui","Sex","Sáb"];
// Used for parsing ambiguous dates like 1/2/2000 - default to preferring 'American' format meaning Jan 2.
// Set to false to prefer 'European' format meaning Feb 1
Date.preferAmericanFormat = false;

Date.firstDayOfWeek =0;
Date.defaultFormat = "dd/MM/yyyy";
Date.masks = {
  fullDate:       "EEEE, MMMM d, yyyy",
  shortTime:      "h:mm a"
};
Date.today="Hoje";

Number.decimalSeparator = ",";
Number.groupingSeparator = ".";
Number.minusSign = "-";
Number.currencyFormat = "###,##0.00";



var millisInWorkingDay =28800000;
var workingDaysPerWeek =5;

var _holidaysCalender="#01_01##04_21##05_01##09_07##11_2##11_15##12_31#";

function setHolidaysGantt(halidays) {
  if (typeof halidays=='string'){
    _holidaysCalender = halidays;
  }if (Array.isArray(holidays)){
    _holidaysCalender = "";
    holidays.forEach(holiday => {
      if (typeof haliday=='string'){
        _holidaysCalender += haliday;
      }else if (typeof haliday.getMonth === 'function'){
        _holidaysCalender += "#" + haliday.getFullYear() + "_" + pad(haliday.getMonth() + 1) + "_" + pad(haliday.getDate()) + "#";
      }
    });
  }

}

function isHoliday(date) {
  var friIsHoly =false;
  var satIsHoly =true;
  var sunIsHoly =true;

  var pad = function (val) {
    val = "0" + val;
    return val.substr(val.length - 2);
  };

  var holidays = _holidaysCalender;

  var ymd = "#" + date.getFullYear() + "_" + pad(date.getMonth() + 1) + "_" + pad(date.getDate()) + "#";
  var md = "#" + pad(date.getMonth() + 1) + "_" + pad(date.getDate()) + "#";
  var day = date.getDay();

  return  (day == 5 && friIsHoly) || (day == 6 && satIsHoly) || (day == 0 && sunIsHoly) || holidays.indexOf(ymd) > -1 || holidays.indexOf(md) > -1;
}



var i18n = {
  YES:                 "Sim",
  NO:                  "Não",
  FLD_CONFIRM_DELETE:  "confirme a exclusão?",
  INVALID_DATA:        "Os dados inseridos são inválidos para o formato de campo.",
  ERROR_ON_FIELD:      "Erro no campo",
  OUT_OF_BOUDARIES:      "Fora dos valores admitidos em campo:",
  CLOSE_ALL_CONTAINERS:"feche tudo?",
  DO_YOU_CONFIRM:      "Você confirma?",
  ERR_FIELD_MAX_SIZE_EXCEEDED:      "Tamanho máximo do campo excedido",
  WEEK_SHORT:      "S.",

  FILE_TYPE_NOT_ALLOWED:"Tipo de arquivo não permitido.",
  FILE_UPLOAD_COMPLETED:"Upload de arquivos concluído.",
  UPLOAD_MAX_SIZE_EXCEEDED:"Tamanho máximo do arquivo excedido",
  ERROR_UPLOADING:"Erro ao upload",
  UPLOAD_ABORTED:"Carregar abortado",
  DROP_HERE:"Drop Arquivos aqui",

  FORM_IS_CHANGED:     "Você tem alguns dados não salvos na página!",

  PIN_THIS_MENU: "PIN_THIS_MENU",
  UNPIN_THIS_MENU: "UNPIN_THIS_MENU",
  OPEN_THIS_MENU: "OPEN_THIS_MENU",
  CLOSE_THIS_MENU: "CLOSE_THIS_MENU",
  PROCEED: "Continuar?",

  PREV: "Anterior",
  NEXT: "Próximo",
  HINT_SKIP: "Entendi, feche esta sugestão.",

  WANT_TO_SAVE_FILTER: "Salve este filtro",
  NEW_FILTER_NAME: "Nome do novo filtro",
  SAVE: "Salvar",
  DELETE: "Excluir",
  HINT_SKIP: "Entendi, feche esta sugestão.",

  COMBO_NO_VALUES: "Não há valores disponíveis...?",

  FILTER_UPDATED:"Filtro atualizado.",
  FILTER_SAVED:"Filtro corretamente salvo."

};


