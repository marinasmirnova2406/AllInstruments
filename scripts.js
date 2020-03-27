
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


for (var i=0; i<24; i++) {
 var newCell=document.createElement("td");
 newCell.setAttribute('class', ipCreator + i);
 ipCreator ++;


 newRow.appendChild(newCell);
}
timeTable.appendChild(newRow);
   }

   theRow(0);
   theRow(1);
   theRow(2);
   theRow(3);




   var ipCreator = "0";
   //document.getElementById("tests").textContent = "Текст элемента р изменён";
   var myP = document.getElementById("td17");
   //получить HTML содержимое элемента, имеющего id="myP"
   myP.innerHTML;


   function timeHandler(string) {
     let readStringV = tests.virtual[string][3];
     let readStringA = tests.virtual[string][4];
     let timeVirtual = {
       year: readStringV[0] + readStringV[1] + readStringV[2] + readStringV[3],
       month: readStringV[5] + readStringV[6],
       day: readStringV[8] + readStringV[9],
       hour: readStringV[11] + readStringV[12],
       minute: readStringV[14] + readStringV[15]
     };
     let timeActual = {
       year: readStringA[0] + readStringA[1] + readStringA[2] + readStringA[3],
       month: readStringA[5] + readStringA[6],
       day: readStringA[8] + readStringA[9],
       hour: readStringA[11] + readStringA[12],
       minute: readStringA[14] + readStringA[15]
     };

     if (timeVirtual.minute == "00") {
       return "Yes";
     } else {
       return "NO!";
     }





   }



   //изменить HTML содержимое элемента, имеющего id="myP"
   myP.innerHTML = timeHandler(1);



















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
