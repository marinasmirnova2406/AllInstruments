
let tests =  {
    virtual:[
      ["Mary","Office","Manager","2019-11-04T07:00:00.000Z","2019-11-04T18:0000.000Z"],
      ["Kate","Office","Manager","2019-11-04T09:00:00.000Z","2019-11-04T20:1500.000Z"],
      ["Anne","Reception","Admin","2019-11-04T08:20:00.000Z","2019-11-04T20:3000.000Z"],
      ["July","Office","HR","2019-11-04T08:20:00.000Z","2019-11-04T08:50000.000Z"],
      //["nameN","placeN","role1","datetime_fromN","datetime_toN"]
    ],
    actual:[
      ["Mary","Office","Manager","2019-11-04T07:00:00.000Z","2019-11-04T18:0000.000Z"],
      ["Kate","Office","Manager","2019-11-04T09:00:00.000Z","2019-11-04T22:0000.000Z"],
      ["Anne","Reception","Admin","2019-11-04T13:00:00.000Z","2019-11-04T19:0000.000Z"],
      ["July","Office","HR","2019-11-04T08:20:00.000Z","2019-11-04T20:3000.000Z"],
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


    let timeTable = document.getElementById("timetable"); // Инициализируем таблицу
    let newRow = document.createElement("tr"); // Создаем новую строку

    // Создаем первую ячейку со значением "Имя"
    let readName = arrVariant[string][0];
    let nameCell=document.createElement("td");
    nameCell.innerHTML = readName;
    newRow.appendChild(nameCell);

    // Создаем первую ячейку со значением "Расположение и роль"
    let readPlase = arrVariant[string][1];
    let readRole = arrVariant[string][2];
    let placeRoleCell=document.createElement("td");
    placeRoleCell.innerHTML = readPlase + " / " + readRole;
    newRow.appendChild(placeRoleCell);

    timeTable.appendChild(newRow);


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
        let emptyCell=document.createElement("td");
        emptyCell.innerHTML = "e";
        newRow.appendChild(emptyCell);
      };

      // Создание ячейки "Рабочее время"
      function work() {
        let readName = "abc";
        let colorCell=document.createElement("td");
        colorCell.innerHTML = readName;
        colorCell.setAttribute('class', colorClass);
        newRow.appendChild(colorCell);
      };

      // Определение того, нужно ли создавать не полный рабочий час ВНАЧАЛЕ рабочего создания
      // И его создание
      function partHourBefore() {
        let partCell=document.createElement("td");
        let reverceMinute = 60 - timeFrom.minute;
        let percent = Math.round(reverceMinute * 100 / 60);
        partCell.setAttribute('style', 'text-align: right;');
        partCell.innerHTML = '<div class="' + colorClass + '"style="display: inline-block; height: 100%; width: ' + percent + '%;"></div>';
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
          let partCell=document.createElement("td");
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

        let partCell=document.createElement("td");
        let minuteLessHour = timeTo.minute - timeFrom.minute;
        let percent = Math.round(minuteLessHour * 100 / 60);
        let prePercent = Math.round(timeFrom.minute * 100 / 60);
        partCell.innerHTML = '<div style="display: inline-block; height: 100%; width: ' + prePercent + '%;"></div><div class="' + colorClass + '"style="display: inline-block; height: 100%; width: ' + percent + '%;"></div>';
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

      }; // else (рабочее время больше часа)

    }; // fun timeHandler

  timeHandler(arrVariant, string);

}; // fun treRow



for (var i = 0; i < tests.virtual.length; i++) {
  theRow("virtual", i);
}
