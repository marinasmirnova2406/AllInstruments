
let tests =  {
    virtual:[
      ["Mary","Office","Manager","2019-11-04T08:00:00.000Z","2019-11-04T18:0000.000Z"],
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


var ipCreator = "0";

//document.getElementById("tests").textContent = "Текст элемента р изменён";
var myP = document.getElementById("td17");
//получить HTML содержимое элемента, имеющего id="myP"
myP.innerHTML;
//изменить HTML содержимое элемента, имеющего id="myP"
myP.innerHTML = "<em>Что-то новое</em>";





function theRow(name, place, role) {
  let timeTable = document.getElementById("timetable"); // Инициализируем таблицу
  let newRow = document.createElement("tr"); // Создаем новую строку

  let nameCell = document.createElement("td"); // Создаем первую ячейку

  newRow.appendChild(newCell);
  timeTable.appendChild(newRow);

}

TheRow(One);





  function addRow() {
    var timeTable = document.getElementById("timetable"); // Инициализируем таблицу
    var newRow = document.createElement("tr"); // Создаем новую строку


for (var i=0; i<26; i++) {
 var newCell=document.createElement("td");
 newCell.setAttribute('class', ipCreator + i);
 ipCreator ++;


 newRow.appendChild(newCell);
}
timeTable.appendChild(newRow);
   }

   addRow();
   addRow();
   addRow();
   addRow();
   addRow();
