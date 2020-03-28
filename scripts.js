
let tests =  {
    virtual:[
      ["Mary","Office","Manager","2019-11-04T08:30:00.000Z","2019-11-04T18:3000.000Z"],
      ["Kate","Office","Manager","2019-11-04T09:00:00.000Z","2019-11-04T20:0000.000Z"],
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

  function theRow(string) {
    var timeTable = document.getElementById("timetable"); // Инициализируем таблицу
    var newRow = document.createElement("tr"); // Создаем новую строку

    // Создаем первую ячейку со значением "Имя"
    var readName = tests.virtual[string][0];
    var nameCell=document.createElement("td");
    nameCell.innerHTML = readName;
    newRow.appendChild(nameCell);

    // Создаем первую ячейку со значением "Расположение и роль"
    var readPlase = tests.virtual[string][1];
    var readRole = tests.virtual[string][2];
    var placeRoleCell=document.createElement("td");
    placeRoleCell.innerHTML = readPlase + " / " + readRole;
    newRow.appendChild(placeRoleCell);

    timeTable.appendChild(newRow);


/*for (var i=0; i<2; i++) {
 var newCell=document.createElement("td");
 newCell.setAttribute('class', "virtual");
 ipCreator ++;
 newRow.appendChild(newCell);
}*/


var ipCreator = "0";
//document.getElementById("tests").textContent = "Текст элемента р изменён";
var myP = document.getElementById("td17");
//получить HTML содержимое элемента, имеющего id="myP"
myP.innerHTML;


function timeHandler(string) {
  let readStringF = tests.virtual[string][3];
  let readStringT = tests.virtual[string][4];
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

  if (timeFrom.minute == "00") {
    let differenceHour = timeTo.hour - timeFrom.hour;

    // Добавляем ячейки "До рабочео времени"
    for (var i = 0; i < timeFrom.hour ; i++) {
      var nameCell=document.createElement("td");
      nameCell.innerHTML = "f";
      newRow.appendChild(nameCell);
    };

    // Добавляем ячейки "Рабочее время"
    for (var i = 0; i < differenceHour; i++) {
      var readName = "abc";
      var colorCell=document.createElement("td");
      colorCell.innerHTML = readName;
      colorCell.setAttribute('class', "virtual");

      newRow.appendChild(colorCell);
    };

    // если минуты конечного времени 00
    if (timeTo.minute == "00") {
      for (var i = 0; i < 24 - timeTo.hour; i++) {
        var nameCell=document.createElement("td");
        nameCell.innerHTML = "t";
        newRow.appendChild(nameCell);
      };


      // если минуты конечного времени не 00
    } else {
      return "No.";
    }



  } else { // если начальное время не 00
    return "NO!";
  };



}; // fun timeHandler



timeHandler(1);
//изменить HTML содержимое элемента, имеющего id="myP"
//myP.innerHTML = timeHandler(1);


}; // fun treRow

   theRow(0);
   theRow(1);
   theRow(2);
   theRow(3);




























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
