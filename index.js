subjectContents = document.getElementById("subjectContentsRow");
let globalTaskData = [];

const addCard = () => {
    const newSubjectDetails = {
        id: `${Date.now()}`,
        subject: document.getElementById("Subject").value,
        topics: document.getElementById("TopicsCovered").value,
        duration: document.getElementById("Duration").value,
        tests: document.getElementById("Tests").value,   
        date: document.getElementById("date").value    
    };


    subjectContents.insertAdjacentHTML('beforeend', generateSubjectCard(newSubjectDetails));

    globalTaskData.push(newSubjectDetails);
    saveToLocalStorage();
    

}

const generateSubjectCard = ({id, subject, topics, duration, tests, date}) =>  {
    return (
        
        `<div class="col-md-6 col-lg-4 mt-3" id=${id} keys=${id}>
            <div class="card" style="width: 18rem">
                <div class="card-header" style="padding: 20%; text-align: center; background-color: rgb(30, 224, 224); background-image: url(./assets/bg4.jpg)"><strong><p style="font-size:25px;">
                    ${subject}</strong></p>
                    <div>
                        <span class="badge bg-light text-dark float-md-end" 
                            ><i class="far fa-calendar-alt"></i> <strong>Date:</strong> ${date}</span
                        >
                    </div>
                </div>

                <ul class="list-group list-group-flush">
                    <li class="list-group-item">
                    <i class="fa fa-book" aria-hidden="true"></i> <strong>Topics Covered:</strong> ${topics}
                    </li>
                    <li class="list-group-item">
                    <i class="fas fa-clock"></i> <strong>Duration:</strong> ${duration}
                    </li>
                    <li class="list-group-item">
                    <i class="fas fa-pen-alt"></i> <strong>Tests appeared:</strong> ${tests}
                    </li>
                </ul>

                <div class="card-footer">
                    <div class="d-flex justify-content-end">

                        <button type="button" class="btn btn-outline-dark">OPEN</button>

                        <button type="button" class="btn btn btn-outline-dark" onclick="editSubject(this)" name=${id}>
                            <i class="fas fa-pencil-alt"></i>
                        </button>
                        <button type="button" class="btn btn btn-outline-danger" onclick="deleteSubject(this)" name=${id}>
                            <i class="fa fa-trash" aria-hidden="true" onclick="deleteSubject(this)" name=${id}></i>
                        </button>
                    </div>
                </div>
            </div>
    </div>`
  )

  
};

const saveToLocalStorage = () => {
    localStorage.setItem("Studybeta", JSON.stringify({tasks: globalTaskData}));
}

const reloadTaskCard = () => {
    const localStorageCopy = JSON.parse(localStorage.getItem("Studybeta"));
    if(localStorageCopy) {
        globalTaskData = localStorageCopy["tasks"];

    }
    globalTaskData.map((cardData) =>{
        subjectContents.insertAdjacentHTML('beforeend', generateSubjectCard(cardData));
        
    })
}

const deleteSubject = (e) => {
    
    const targetID = e.getAttribute("name")
    globalTaskData = globalTaskData.filter((cardData) => cardData.id!==targetID);
    saveToLocalStorage();
    window.location.reload();
}

const editSubject = (e) => {
    
    const targetID = e.getAttribute("name");
    console.log(e);
    console.log(e.parentNode);
    console.log(e.parentNode.parentNode.parentNode.childNodes);

    // header
    console.log(e.parentNode.parentNode.parentNode.childNodes[1]);
    console.log(e.parentNode.parentNode.parentNode.childNodes[1].childNodes[1]);
    console.log(e.parentNode.parentNode.parentNode.childNodes[1].childNodes[3]);

    //  ul list
    console.log(e.parentNode.parentNode.parentNode.childNodes[3].childNodes[1]);
    console.log(e.parentNode.parentNode.parentNode.childNodes[3].childNodes[3]);
    console.log(e.parentNode.parentNode.parentNode.childNodes[3].childNodes[5]);
   

    // edit header
    console.log(e.parentNode.parentNode.parentNode.childNodes[1].setAttribute("contenteditable", "true"));
    console.log(e.parentNode.parentNode.parentNode.childNodes[1].childNodes[1].setAttribute("contenteditable", "true"));
    console.log(e.parentNode.parentNode.parentNode.childNodes[1].childNodes[3].setAttribute("contenteditable", "true"));

    //edit ul list
    console.log(e.parentNode.parentNode.parentNode.childNodes[3].childNodes[1].setAttribute("contenteditable", "true"));
    console.log(e.parentNode.parentNode.parentNode.childNodes[3].childNodes[3].setAttribute("contenteditable", "true"));
    console.log(e.parentNode.parentNode.parentNode.childNodes[3].childNodes[5].setAttribute("contenteditable", "true"));

    e.parentNode.parentNode.parentNode.childNodes[5].childNodes[1].childNodes[1].innerHTML="SAVE";
    e.parentNode.parentNode.parentNode.childNodes[5].childNodes[1].childNodes[1].setAttribute("onclick", "saveEditSubject(this)");
    

   
}


const saveEditSubject = (e) => {
    if (!e) e = window.event;
    console.log(e);
    console.log(e.targetID);
    const targetID = e.target.id;
    const parentNode = e.target.parentNode.parentNode.parentNode;
    console.log(parentNode.childNodes);

    const Subject = parentNode.childNodes[1].childNodes[1];
    const Date = parentNode.childNodes[1].childNodes[3];

    const Topics = parentNode.childNodes[3].childNodes[1];
    const Duration = parentNode.childNodes[3].childNodes[3];
    const Tests = parentNode.childNodes[3].childNodes[5];

    const updateData ={
        Subject: Subject.innerHTML,
        Date: Date.innerHTML,
        Topics: Topics.innerHTML,
        Duration: Duration.innerHTML,
        Tests: Tests.innerHTML
    };


    let stateCopy = globalTaskData;
    stateCopy =stateCopy.map((task) =>
        task.id ==targetID
            ?
                {
                    id: task.id,
                    Subject: updateData.Subject,
                    Date: updateData.Date,
                    Topics: updateData.Topics,
                    Duration: updateData.Duration,
                    Tests: updateData.Tests

                }
            :   task
    )   ;

    globalTaskData = stateCopy;
    saveToLocalStorage();
    Subject.setAttribute("contenteditable", "false");
    Date.setAttribute("contenteditable", "false");
    Topics.setAttribute("contenteditable", "false");
    Duration.setAttribute("contenteditable", "false");
    Tests.setAttribute("contenteditable", "false");
}



