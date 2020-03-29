
let tests =  {
    virtual:[
      ["Mary","Office","Manager","2019-11-04T07:00:00.000Z","2019-11-04T18:0000.000Z"],
      ["Kate","Office","Manager","2019-11-04T09:00:00.000Z","2019-11-04T20:2500.000Z"],
      ["Anne","Reception","Admin","2019-11-04T12:00:00.000Z","2019-11-04T20:0000.000Z"],
      ["nameN","placeN","role1","datetime_fromN","datetime_toN"]
    ],
    actual:[
      ["Mary","Office","Manager","2019-11-04T07:00:00.000Z","2019-11-04T18:0000.000Z"],
      ["Kate","Office","Manager","2019-11-04T09:00:00.000Z","2019-11-04T22:0000.000Z"],
      ["Anne","Reception","Admin","2019-11-04T13:00:00.000Z","2019-11-04T19:0000.000Z"],
      ["nameN","placeN","role1","datetime_fromN","datetime_toN"]
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


    var timeTable = document.getElementById("timetable"); // Инициализируем таблицу
    var newRow = document.createElement("tr"); // Создаем новую строку

    // Создаем первую ячейку со значением "Имя"
    var readName = arrVariant[string][0];
    var nameCell=document.createElement("td");
    nameCell.innerHTML = readName;
    newRow.appendChild(nameCell);

    // Создаем первую ячейку со значением "Расположение и роль"
    var readPlase = arrVariant[string][1];
    var readRole = arrVariant[string][2];
    var placeRoleCell=document.createElement("td");
    placeRoleCell.innerHTML = readPlase + " / " + readRole;
    newRow.appendChild(placeRoleCell);

    timeTable.appendChild(newRow);


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

      // Создание пустой ячейки
      function empty() {
        var emptyCell=document.createElement("td");
        emptyCell.innerHTML = "e";
        newRow.appendChild(emptyCell);
      };

      if (timeFrom.minute == "00") {
        let differenceHour = timeTo.hour - timeFrom.hour;

        // Добавляем ячейки "До рабочео времени", не отнимает 1, т.к. отсчет начинается с 00, а не с 01.
        for (var i = 0; i < timeFrom.hour ; i++) {
          empty();
        };

        // Добавляем ячейки "Рабочее время"
        for (var i = 0; i < differenceHour; i++) {
          var readName = "abc";
          var colorCell=document.createElement("td");
          colorCell.innerHTML = readName;
          colorCell.setAttribute('class', colorClass);
          newRow.appendChild(colorCell);
        };

        // если минуты конечного времени 00
        if (timeTo.minute == "00") {
          for (var i = 0; i < 24 - timeTo.hour; i++) {
            empty();
          };


          // если минуты конечного времени не 00
        } else {
          var partCell=document.createElement("td");
          let percent = Math.round(timeTo.minute * 100 / 60);
          partCell.innerHTML = '<div class="' + colorClass + '" style="height: 100%; width: ' + percent + '%;"></div>';
          newRow.appendChild(partCell);

          for (var i = 0; i < 23 - timeTo.hour; i++) {
            empty();
          };
        };


      } else { // если начальное время не 00








        return "NO!";
      };



    }; // fun timeHandler



timeHandler(arrVariant, string);
//изменить HTML содержимое элемента, имеющего id="myP"
//myP.innerHTML = differenceHour;


}; // fun treRow

   theRow("virtual", 0);
   theRow("virtual", 1);
   theRow("virtual", 2);
   theRow("virtual", 3);




























  /* function addRow(name) {
     var timeTable = document.getElementById("timetable"); // Инициализируем таблицу
     var newRow = document.createElement("tr"); // Создаем новую строку


 for (var i=0; i<26; i++) {
  var newCell=document.createElement("td");
  newCell.setAttribute('class', ipCreator + i);
  newCell.innerHTML = name;
  ipCreator ++;


  newRow.appendChild(newCell);
 }
 timeTable.appendChild(newRow);
} */
