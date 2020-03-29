
let tests =  {
    virtual:[
      ["Mary","Office","Manager","2019-11-04T07:00:00.000Z","2019-11-04T18:0000.000Z"],
      ["Kate","Office","Manager","2019-11-04T09:00:00.000Z","2019-11-04T20:1500.000Z"],
      ["Anne","Reception","Admin","2019-11-04T08:20:00.000Z","2019-11-04T20:3000.000Z"],
      ["July","Office","HR","2019-11-04T08:20:00.000Z","2019-11-04T08:50000.000Z"],
      ["Kate","Office","Manager","2019-11-04T09:00:00.000Z","2019-11-04T20:1500.000Z"],
      //["nameN","placeN","role1","datetime_fromN","datetime_toN"]
    ],
    actual:[
      ["Mary","Office","Manager","2019-11-04T07:00:00.000Z","2019-11-04T18:0000.000Z"],
      ["Kate","Office","Manager","2019-11-04T09:00:00.000Z","2019-11-04T22:0000.000Z"],
      ["Anne","Reception","Admin","2019-11-04T13:00:00.000Z","2019-11-04T19:0000.000Z"],
      ["July","Office","HR","2019-11-04T08:20:00.000Z","2019-11-04T20:3000.000Z"],
      ["Kate","Office","Manager","2019-11-04T09:00:00.000Z","2019-11-04T20:1500.000Z"],
      //["nameN","placeN","role1","datetime_fromN","datetime_toN"]
    ]
  }

  function theRow(variant, string) {
    if (variant == "virtual") {
      var arrVariant = tests.virtual;
      var colorClass = "virtual";
    } if (variant == "actual") {
      var arrVariant = tests.actual;
      var colorClass = "actual";
    };


    var timetable = document.getElementById("timetable"); // Инициализируем таблицу
    var allrows = document.getElementById("allrows"); // Инициализируем наполнение таблицы
    var newRow = document.createElement("tr"); // Создаем новую строку
    newRow.setAttribute('class', 'renewable');

    // Создаем первую ячейку со значением "Имя"
    var readName = arrVariant[string][0];
    var nameCell=document.createElement("td");
    nameCell.innerHTML = readName;
    newRow.appendChild(nameCell);

    nameCell.addEventListener ("click", function() {
      changeFun(string, variant);
     })

    // Создаем первую ячейку со значением "Расположение и роль"
    var readPlase = arrVariant[string][1];
    var readRole = arrVariant[string][2];
    var placeRoleCell=document.createElement("td");
    placeRoleCell.innerHTML = readPlase + " / " + readRole;
    newRow.appendChild(placeRoleCell);

    timetable.appendChild(newRow);


    // -----------------------------
    // -----------------------------
    // считывание времени ----------
    // -----------------------------
    // -----------------------------
    function timeHandler(variant, string) {
      let readStringF = variant[string][3];
      let readStringT = variant[string][4];
      let timeFrom = {
        year: readStringF[0] + readStringF[1] + readStringF[2] + readStringF[3],
        month: readStringF[5] + readStringF[6],
        day: readStringF[8] + readStringF[9],
        hour: readStringF[11] + readStringF[12],
        minute: readStringF[14] + readStringF[15]
      };
      let timeTo = {
        year: readStringT[0] + readStringT[1] + readStringT[2] + readStringT[3],
        month: readStringT[5] + readStringT[6],
        day: readStringT[8] + readStringT[9],
        hour: readStringT[11] + readStringT[12],
        minute: readStringT[14] + readStringT[15]
      };

      let differenceHour = timeTo.hour - timeFrom.hour;


      // -----------------------------
      // -----------------------------
      // функции создания ячеек ------
      // -----------------------------
      // -----------------------------

      // Создание пустой ячейки
      function empty() {
        var emptyCell=document.createElement("td");
        newRow.appendChild(emptyCell);
      };

      // Создание ячейки "Рабочее время"
      function work() {
        var colorCell=document.createElement("td");
        colorCell.setAttribute('class', colorClass);
        newRow.appendChild(colorCell);
      };

      // Определение того, нужно ли создавать не полный рабочий час ВНАЧАЛЕ рабочего создания
      // И его создание
      function partHourBefore() {
        var partCell=document.createElement("td");
        let reverceMinute = 60 - timeFrom.minute;
        let percent = Math.round(reverceMinute * 100 / 60);
        partCell.setAttribute('style', 'text-align: right;');
        partCell.innerHTML = '<div class="' + colorClass + '"style="margin-bottom: -3px; display: inline-block; height: 100%; width: ' + percent + '%;"></div>';
        newRow.appendChild(partCell);
      }

      // Определение того, нужно ли создавать не полный рабочий час ВКОНЦЕ рабочего создания
      // И его создание
      function partHourAfter() {
        // если минуты конечного времени 00
        if (timeTo.minute == "00") {
          for (var i = 0; i < 24 - timeTo.hour; i++) {
            empty();
          };

          // если минуты конечного времени не 00
        } else {

          // добавление ячейки с неполным часом "после"
          var partCell=document.createElement("td");
          let percent = Math.round(timeTo.minute * 100 / 60);
          partCell.innerHTML = '<div class="' + colorClass + '" style="height: 100%; width: ' + percent + '%;"></div>';
          newRow.appendChild(partCell);

          // добавление пустых яеек после рабочего времени
          for (var i = 0; i < 23 - timeTo.hour; i++) {
            empty();
          };
        };
      };

      if (differenceHour == 0) {

        // Добавляем ячейки "До рабочео времени"
        for (var i = 0; i < timeFrom.hour ; i++) {
          empty();
        };

        var partCell=document.createElement("td");
        let minuteLessHour = timeTo.minute - timeFrom.minute;
        let percent = Math.round(minuteLessHour * 100 / 60);
        let prePercent = Math.round(timeFrom.minute * 100 / 60);
        partCell.innerHTML = '<div style="display: inline-block; height: 100%; width: ' + prePercent + '%;"></div><div class="' + colorClass + '"style="margin-bottom: -1px; display: inline-block; height: 100%; width: ' + percent + '%;"></div>';
        newRow.appendChild(partCell);

        // Добавляем ячейки "После рабочео времени"
        for (var i = 0; i < 23 - timeTo.hour; i++) {
          empty();
        };

      // Если рабочее время больше часа
      } else {
        // -----------------------------
        // -----------------------------
        // если начальное время 00 минут
        // -----------------------------
        // -----------------------------
        if (timeFrom.minute == "00") {

          // Добавляем ячейки "До рабочео времени"
          for (var i = 0; i < timeFrom.hour ; i++) {
            empty();
          };

          // Добавляем ячейки "Рабочее время"
          for (var i = 0; i < differenceHour; i++) {
            work();
          };

          // Вызов функции пределения неполного часа + создание ячеек "после"
          partHourAfter();

        // --------------------------
        // --------------------------
        // если начальное время не 00
        // --------------------------
        // --------------------------
        } else {

          // Добавляем ячейки "До рабочео времени", не отнимаем 1, т.к. отсчет начинается с 00, а не с 01.
          for (var i = 0; i < timeFrom.hour ; i++) {
            empty();
          };

          // добавление ячейки с неполным часом
          partHourBefore();

          // Добавляем ячейки "Рабочее время"
          for (var i = 0; i < differenceHour - 1; i++) {
            work();
          };

          // Вызов функции пределения неполного часа + создание ячеек "после"
          partHourAfter();

        };
      };


















    }; // fun timeHandler

  timeHandler(arrVariant, string);

}; // fun treRow





// При загрузке страницы выводтся все плановые значения работы,
// а так же записываются в массив baseArray их статусы
var baseArray = [];
$(document).ready ( function() {
  for (var i = 0; i < tests.virtual.length; i++) {
    theRow("virtual", i);
    baseArray[i] = "virtual";
  }
});




// Функция вызывается при клике на ячейку
function changeFun(sequence, variant) {

  //Удаление предыдущих строк
  $('.renewable').html('');


  if (variant == "virtual") {

    for (var i = 0; i < sequence; i++) {
      theRow(baseArray[i], i);
    };

    theRow("actual", sequence);
    baseArray[sequence] = "actual";

    for (var i = sequence + 1; i < tests.virtual.length; i++) {
      theRow(baseArray[i], i);
    }

} if (variant == "actual") {

  for (var i = 0; i < sequence; i++) {
    theRow(baseArray[i], i);
  };

    theRow("virtual", sequence);
    baseArray[sequence] = "virtual";

    for (var i = sequence + 1; i < tests.virtual.length; i++) {
      theRow(baseArray[i], i);
    }

  }

}


























//
