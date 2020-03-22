class Note {
  constructor(title) {
    this.title = title;
    this.element = this.createElement(title);
  }

  createElement(title) {
    let newNote = document.createElement('div');
    newNote.setAttribute("class", "card");
    let newP = document.createElement("p");
    newP.innerHTML = title;
    newNote.appendChild(newP);
    let newA = document.createElement("a");
    newA.innerHTML = "remove";
    newA.addEventListener('click', this.remove.bind(newNote));
    newNote.appendChild(newA);
    return newNote;
  }

  add() {
    document.querySelector(".notes").appendChild(this.element);
  }

  saveToStorage() {
    //nieuwe array notes, = leeg [] wanneer gelijk aan null
    let notes = JSON.parse(localStorage.getItem("notes")) || [];
    notes.push(this.title);
    //opslaan op local storage
    localStorage.setItem("notes", JSON.stringify(notes));

  }

  remove() {
    this.remove();
    let notes = JSON.parse(localStorage.getItem(`notes`)) || [];
    //inhoud van de note zoeken om zo via indexOf de key te vinden
    let noteContent = this.querySelector(`p`).innerHTML;
    let index = notes.indexOf(noteContent);
    notes.splice(index, 1);
    //array terugopslaan na verwijderen object
    localStorage.setItem("notes", JSON.stringify(notes));
    console.log(localStorage);
  }
}

class App {
  constructor() {
    this.btnAdd = document.querySelector("#btnAddNote");
    this.btnAdd.addEventListener("click", this.createNote.bind(this));
    // notes laden uit local storage op openen
    this.loadNotesFromStorage();
  }

  loadNotesFromStorage() {
    let notes = JSON.parse(localStorage.getItem("notes")) || [];

    for (let index = 0; index < notes.length; index++) {
      const title = notes[index];
      let note = new Note(title);
      note.add();
    }
  }

  createNote() {
    let text = document.querySelector("#txtAddNote").value;
    let note = new Note(text);
    note.add();
    note.saveToStorage();
    this.reset();
  }

  reset() {
    document.querySelector("form").reset();
  }

}
let app = new App();
console.log(localStorage);