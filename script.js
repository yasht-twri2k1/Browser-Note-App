const addBtn = document.getElementById("add");//create add note button

const notes = JSON.parse(localStorage.getItem("notes")); //save key/value pair in browser

if (notes) {//condition
    notes.forEach((note) => {
        addNewNote(note);
        saveDynamicDataToFile(note);
    });
}
 
addBtn.addEventListener("click", () => { //event on click add note
   addNewNote();                       //call function addNewNote
});
//function after clicking event code goes as 
function addNewNote(text = "") {
    const note = document.createElement("div");
    note.classList.add("note");//it returns CSS property of that element 

    note.innerHTML = `
        <div class="box">    
        <div class="notes">
            <div class="tools">
                <button class="edit"><i class="fas fa-edit"></i></button>
                <button class="delete"><i class="fas fa-trash-alt"></i></button>
            </div>
            <div class="main ${text ? "" : "hidden"}"></div>
            <textarea class="${text ? "hidden" : ""}" placeholder="Add Note" autofocus></textarea>
        </div>
        </div>
    `;
    // 2 btn and main  class & textarea
    //btn edit
    const editBtn = note.querySelector(".edit");
    //btn delete
    const deleteBtn = note.querySelector(".delete");
    //select main class
    const main = note.querySelector(".main");
    //textarea
    const textArea = note.querySelector("textarea");

    textArea.value = text;//specifies it takes text
    main.innerHTML = marked(text);//return html which is complied by marked (CLI)

    //event on edit btn
    editBtn.addEventListener("click", () => {
        main.classList.toggle("hidden");
        textArea.classList.toggle("hidden");
    });

    //event on deletebtn
    deleteBtn.addEventListener("click", () => {
        note.remove();

        updateLS();//function call LS
    });

    //event on textarea
    textArea.addEventListener("input", (e) => {
        const { value } = e.target; //trigger target (e)elemnt

        main.innerHTML = marked(value); //return text

        updateLS();
    });

    document.body.appendChild(note);//appends in body tag on event listing 
}
//function 
function updateLS() {
    //var noteText = textarea
    const notesText = document.querySelectorAll("textarea"); 

    const notes = [];
//push text in notes as array
    notesText.forEach((note) => {
        notes.push(note.value);
    });
//store as json in key/value
    localStorage.setItem("notes", JSON.stringify(notes));
    
}

function saveDynamicDataToFile() {
    
    var userInput = notes.value;
    var data_string=JSON.stringify(userInput);
     
    var blob = new Blob([notes],{ type:"text"});
    var anchor=document.createElement("a");
   
    anchor.href=URL.createObjectURL(blob);
   
    anchor.download="save.txt"
     
    anchor.click();

    confirm("refresh to download ");
}
//03 56 13
// Summary:
// ADD NOTE
// EVENT ON CLICKING => FUNCTION CALL addNewNote
// FUNCTION addNewNote GOES AS => CSS&HTML=>EDIT&DELETE &TEXTAREA BTN
//=>EVENT LISTNER =>APPEND TO BODY=>CALL ANOTHER FUNCTION updateLS()
// FUNCTON updateLS() => SELECTALL TEXTAREA IN THE DOCUMENT => 
//=>TAKE ALL THE TEXT IN THE ARRAY =>
// STORE IN JSON AS KEY:NOTES/VALUE CONVERT INTO STRING BY FUNCTON stringify();

