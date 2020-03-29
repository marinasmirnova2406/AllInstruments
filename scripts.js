// Объект-база данных
var testing =  {
    virtual:[
      ["Mary","Office","Manager","2020-03-30T07:00:00.000Z","2020-03-30T18:0000.000Z"],
      ["Kate","Office","Manager","2020-03-30T07:00:00.000Z","2020-03-30T20:0000.000Z"],
      ["Anne","Reception","Admin","2020-03-30T08:20:00.000Z","2020-03-30T20:3000.000Z"],
      ["July","Reception","Admin","2020-03-30T08:20:00.000Z","2020-03-30T20:3000.000Z"],
      ["Emily","Office","HR","2020-03-30T07:50:00.000Z","2020-03-30T18:1000.000Z"],
      ["Sam","Office","HR","2020-03-30T09:00:00.000Z","2020-03-30T20:0000.000Z"],
      ["Jake","Office","Accountant","2020-03-31T07:30:00.000Z","2020-03-31T20:0000.000Z"],
      ["Max","Reception","Admin","2020-03-31T08:20:00.000Z","2020-03-30T21:3000.000Z"],
      ["Monica","Office","Director","2020-03-31T08:40:00.000Z","2020-03-31T15:3000.000Z"],
      ["Russel","Office","Manager","2020-03-31T09:50:00.000Z","2020-03-31T18:0000.000Z"],
      //["nameN","placeN","role1","datetime_fromN","datetime_toN"]
    ],
    actual:[
      ["Mary","Office","Manager","2020-03-30T07:40:00.000Z","2020-03-30T19:0000.000Z"],
      ["Kate","Office","Manager","2020-03-30T07:50:00.000Z","2020-03-30T20:1000.000Z"],
      ["Anne","Reception","Admin","2020-03-30T07:50:00.000Z","2020-03-30T19:3000.000Z"],
      ["July","Reception","Admin","2020-03-30T08:00:00.000Z","2020-03-30T20:0000.000Z"],
      ["Emily","Office","HR","2020-03-30T07:50:00.000Z","2020-03-30T18:1000.000Z"],
      ["Sam","Office","HR","2020-03-30T09:50:00.000Z","2020-03-30T20:0000.000Z"],
      ["Jake","Office","Accountant","2020-03-31T07:20:00.000Z","2020-03-31T20:1000.000Z"],
      ["Max","Reception","Admin","2020-03-31T08:20:00.000Z","2020-03-30T21:2000.000Z"],
      ["Monica","Office","Director","2020-03-31T08:00:00.000Z","2020-03-31T17:3000.000Z"],
      ["Russel","Office","Manager","2020-03-31T09:45:00.000Z","2020-03-31T19:0000.000Z"],
      //["nameN","placeN","role1","datetime_fromN","datetime_toN"]
    ]
  };


  var inp = document.getElementById('inputDate');
  var sub = document.getElementById('submit');
  var cont = document.getElementById('cont');

  cont.innerHTML = inputDate.value;
  var tests = new Object();
  tests.virtual = [];
  tests.actual = [];
  var baseArray = [];



  // ---------------------------------------
  // ---------------------------------------
  // Функция, создающая новую строку таблицы
  // ---------------------------------------
  // ---------------------------------------
  function theRow(variant, string) {

    // Присвоение переменым arrVariant и colorClass значений, отвечающих необходимому статусу времени (актуальный или плановый)
    if (variant == "virtual") {
      var arrVariant = tests.virtual;
      var colorClass = "virtual";
    } if (variant == "actual") {
      var arrVariant = tests.actual;
      var colorClass = "actual";
    };


    var timetable = document.getElementById("timetable"); // Инициализируем таблицу
    var newRow = document.createElement("tr"); // Создаем новую строку
    newRow.setAttribute('class', 'renewable');

    // Добавляем строку
    timetable.appendChild(newRow);

    // Создаем первую ячейку со значением "Имя"
    let readName = arrVariant[string][0];
    let nameCell=document.createElement("td");
    nameCell.innerHTML = readName;
    newRow.appendChild(nameCell);

    // Назначаем событие: по клику на ячейку происходит выхов функции имены статуса (актуальное или плановое)
    nameCell.addEventListener ("click", function() {
      changeFun(string, variant);
    });

    // Создаем первую ячейку со значением "Расположение и роль"
    let readPlase = arrVariant[string][1];
    let readRole = arrVariant[string][2];
    let placeRoleCell=document.createElement("td");
    placeRoleCell.innerHTML = readPlase + " / " + readRole;
    newRow.appendChild(placeRoleCell);

    // Назначаем событие: по клику на ячейку происходит выхов функции имены статуса (актуальное или плановое)
    placeRoleCell.addEventListener ("click", function() {
      changeFun(string, variant);
    });

    // --------------------------------------------------------------------------------------
    // --------------------------------------------------------------------------------------
    // Считывание времени объекта-базы данных и назначение ячейкам визуального их отображения
    // --------------------------------------------------------------------------------------
    // --------------------------------------------------------------------------------------
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

      let differenceHour = timeTo.hour - timeFrom.hour; // Разница значений "Час"


      // -----------------------------
      // -----------------------------
      // Функции создания ячеек ------
      // -----------------------------
      // -----------------------------

      // Функция, создающая пустую ячейку
      function empty() {
        var emptyCell=document.createElement("td");
        newRow.appendChild(emptyCell);
      };

      // Функция, создающая ячейку "Рабочее время" (полностью закрашенную)
      function work() {
        var colorCell=document.createElement("td");
        colorCell.setAttribute('class', colorClass);
        newRow.appendChild(colorCell);
      };

      // Определение того, нужно ли создавать не полный рабочий час ВНАЧАЛЕ рабочего дня
      // И функция, котораЯ его создает
      function partHourBefore() {
        var partCell=document.createElement("td");
        let reverceMinute = 60 - timeFrom.minute;
        let percent = Math.round(reverceMinute * 100 / 60);
        partCell.setAttribute('style', 'text-align: right;');
        partCell.innerHTML = '<div class="' + colorClass + '"style="margin-bottom: -3px; display: inline-block; height: 100%; width: ' + percent + '%;"></div>';
        newRow.appendChild(partCell);
      }

      // Определение того, нужно ли создавать не полный рабочий час ВКОНЦЕ рабочего создания
      // И функция, котораЯ его создает
      function partHourAfter() {
        // если минуты конечного времени 00
        if (timeTo.minute == "00") {
          for (var i = 0; i < 24 - timeTo.hour; i++) {
            empty();
          };

          // Решение на случай, если последний час рабочего времени является не полным
        } else {

          // Добавление ячейки с неполным часом
          var partCell=document.createElement("td");
          let percent = Math.round(timeTo.minute * 100 / 60);
          partCell.innerHTML = '<div class="' + colorClass + '" style="height: 100%; width: ' + percent + '%;"></div>';
          newRow.appendChild(partCell);

          // Добавление пустых яеек после рабочего времени
          for (var i = 0; i < 23 - timeTo.hour; i++) {
            empty();
          };
        };
      };

      // Решение на случай, если весь рабочий день менее одного часа
      if (differenceHour == 0) {

        // Добавление ячейки "До рабочео времени"
        for (var i = 0; i < timeFrom.hour ; i++) {
          empty();

          // Назначаем событие: по клику на ячейку происходит выхов функции имены статуса (актуальное или плановое)
          nameCell.addEventListener ("click", function() {
            changeFun(string, variant);
          });


        };

        var partCell=document.createElement("td");
        let minuteLessHour = timeTo.minute - timeFrom.minute;
        let percent = Math.round(minuteLessHour * 100 / 60);
        let prePercent = Math.round(timeFrom.minute * 100 / 60);
        partCell.innerHTML = '<div style="display: inline-block; height: 100%; width: ' + prePercent + '%;"></div><div class="' + colorClass + '"style="margin-bottom: -1px; display: inline-block; height: 100%; width: ' + percent + '%;"></div>';
        newRow.appendChild(partCell);

        // Добавление ячейки "После рабочео времени"
        for (var i = 0; i < 23 - timeTo.hour; i++) {
          empty();
        };

      // Если рабочее время больше часа
      } else {

        // ------------------------------------------
        // ------------------------------------------
        // Если начальное время начинается с 00 минут
        // ------------------------------------------
        // ------------------------------------------
        if (timeFrom.minute == "00") {

          // Добавление ячеек "До рабочео времени"
          for (var i = 0; i < timeFrom.hour ; i++) {
            empty();
          };

          // Добавление ячейки "Рабочее время"
          for (var i = 0; i < differenceHour; i++) {
            work();
          };

          // Вызов функции пределения неполного часа + создание ячеек "после"
          partHourAfter();

        // ---------------------------------------------
        // ---------------------------------------------
        // Если начальное время начинается не с 00 минут
        // ---------------------------------------------
        // ---------------------------------------------
        } else {

          // Добавление ячейки пустых ячеек до "рабочего времени"
          for (var i = 0; i < timeFrom.hour ; i++) {
            empty();
          };

          // Добавление ячейки с неполным часом
          partHourBefore();

          // Добавляем ячейки "Рабочее время"
          for (var i = 0; i < differenceHour - 1; i++) {
            work();
          };

          // Вызов функции определения неполного часа + создание ячеек "после"
          partHourAfter();

        }; // Конец eslse внутреннего

      }; // Конец eslse внешнего

    }; // fun timeHandler

  timeHandler(arrVariant, string);

}; // fun treRow

// Функция вызывается при клике на ячейку
function changeFun(sequence, variant) {

  //Удаление предыдущих строк
  $('.renewable').html('');

  // Если вариант выбранной строки - плановое время
  if (variant == "virtual") {

    // Воссоздание строк до выбранной, соответствующе их текущему статусу
    for (var i = 0; i < sequence; i++) {
      theRow(baseArray[i], i);
    };

    // Переопределение статуса выбраной строки и её создание
    theRow("actual", sequence);
    baseArray[sequence] = "actual";

    // Воссоздание строк после выбранной, соответствующе их текущему статусу
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


// По клику по кнопке "ОК" вызов следующей функции:
sub.addEventListener ("click", function() {
  // Обнуление массива с предыдущими датами
  tests.virtual = [];
  tests.actual = [];

  // Отбираем все смены с совпадающей датов в отдельный массив
  for (var i = 0; i < testing.virtual.length; i++) {
    var testDate = testing.virtual[i][3][0] + testing.virtual[i][3][1] + testing.virtual[i][3][2] + testing.virtual[i][3][3] + "-" + testing.virtual[i][3][5] + testing.virtual[i][3][6] + "-" + testing.virtual[i][3][8] + testing.virtual[i][3][9];
    if (testDate == inputDate.value) {
      tests.virtual.push(testing.virtual[i]);
    }
  }

  for (var i = 0; i < testing.actual.length; i++) {
    var testDate = testing.actual[i][3][0] + testing.actual[i][3][1] + testing.actual[i][3][2] + testing.actual[i][3][3] + "-" + testing.actual[i][3][5] + testing.actual[i][3][6] + "-" + testing.actual[i][3][8] + testing.actual[i][3][9];
    if (testDate == inputDate.value) {
      tests.actual.push(testing.actual[i]);
    }
  }

    for (var i = 0; i < tests.virtual.length; i++) {
      theRow("virtual", i);
      baseArray[i] = "virtual";
    }

});
