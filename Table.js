let json

if (window.XMLHttpRequest) {
    xmlhttp = new XMLHttpRequest();
} else {
    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
}
xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        json = JSON.parse(xmlhttp.responseText);
            
        createTable()
    }
}

xmlhttp.open("GET", "https://ip-uacs.herokuapp.com/api/student", true);
xmlhttp.send();


function createTable(){
    let table = document.getElementById("studentsTable")
    table.innerHTML =   "<tr>" + 
                            "<th>ID</th>" +
                            "<th>Name</th>" +
                            "<th>Surname</th>" +
                            "<th>STID</th>" +
                            "<th>email</th>" + 
                            "<th>createdDate</th>" + 
                        "</tr>" // set table header and remove any previous data


    for(const x in json){
        let student = json[x]

        let row = document.createElement("tr")

        row.innerHTML = `<td>${student.id}</td>` + 

                        `<td>${student.firstName}</td>` + 
                        `<td>${student.lastName}</td>` +
            `<td>${student.studentId}</td>` +
            `<td>${student.email}</td>` +
                        `<td>${student.createdDate}</td>`

        table.appendChild(row)       
    }
}

function updateTable(){
    let searchTerm = document.querySelector("input[name='studentIdInput']").value

    let table = document.getElementById("studentsTable")
    table.innerHTML =   "<tr>" + 
                            "<th>id</th>" + 

                            "<th>firstName</th>" + 
                            "<th>lastName</th>" +
        "<th>studentId</th>" +
        "<th>email</th>" +
                            "<th>createdDate</th>" + 
                        "</tr>" // set table header and remove any previous data


    for(const x in json){
        let student = json[x]

        if(student.studentId && student.studentId.startsWith(searchTerm)){
            let row = document.createElement("tr")

            row.innerHTML = `<td>${student.id}</td>` + 

                            `<td>${student.firstName}</td>` + 
                            `<td>${student.lastName}</td>` +
                `<td>${student.studentId}</td>` +
                `<td>${student.email}</td>` +
                            `<td>${student.createdDate}</td>`

            table.appendChild(row)
        }
    }
}

