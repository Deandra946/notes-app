class NoteList extends HTMLElement {
  constructor() {
    super();
  }

  static get observedAttributes() {
    return ["data-notes"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "data-notes") {
      this.render(JSON.parse(newValue));
    }
  }

  render(notes) {
    this.innerHTML = "";
    notes.forEach((note) => {
      const noteElement = document.createElement("note-item");
      noteElement.note = note;
      this.appendChild(noteElement);
    });
  }
}

customElements.define("note-list", NoteList);
