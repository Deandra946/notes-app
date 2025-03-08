class NoteForm extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
    <style>
        :host {
            display: block;
            width: 100%;
            max-width: 400px;
            margin: auto;
            box-sizing: border-box;
        }

        form {
            background: linear-gradient(135deg, #f8f9fa, #dfe6e9);
            padding: 20px;
            border-radius: 15px;
            box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
            backdrop-filter: blur(8px);
            display: flex;
            flex-direction: column;
            gap: 15px;
            border: 1px solid rgba(255, 255, 255, 0.3);
            transition: all 0.3s ease-in-out;
            width: 100%;
            box-sizing: border-box;
        }

        input, textarea {
            width: 100%;
            max-width: 100%;
            padding: 12px 15px;
            border: none;
            border-radius: 8px;
            font-family: 'Quicksand', sans-serif;
            font-size: 1em;
            background: rgba(255, 255, 255, 0.6);
            backdrop-filter: blur(5px);
            box-shadow: inset 2px 2px 5px rgba(0, 0, 0, 0.05);
            transition: all 0.3s ease-in-out;
            color: #2d3436;
            outline: none;
            box-sizing: border-box;
        }

        button {
            background: linear-gradient(135deg, #74b9ff, #a29bfe);
            color: white;
            font-size: 1.1em;
            padding: 10px;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        button:hover {
            transform: scale(1.05);
            box-shadow: 3px 3px 8px rgba(108, 92, 231, 0.4);
        }

        .popup {
            position: fixed;
            top: 20px;
            right: 20px;
            background: #2ecc71;
            color: white;
            padding: 10px 20px;
            border-radius: 5px;
            box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);
            opacity: 0;
            transform: translateY(-20px);
            transition: opacity 0.3s ease, transform 0.3s ease;
        }

        .popup.show {
            opacity: 1;
            transform: translateY(0);
        }
    </style>
    <form id="noteForm">
        <input type="text" id="title" placeholder="Judul Catatan" required>
        <textarea id="body" placeholder="Isi Catatan" required></textarea>
        <button type="submit">Tambah Catatan</button>
    </form>
    <div id="popup" class="popup">Catatan berhasil ditambahkan!</div>
`;

    this.shadowRoot
      .querySelector("#noteForm")
      .addEventListener("submit", this.addNote.bind(this));
  }

  addNote(event) {
    event.preventDefault();

    const title = this.shadowRoot.querySelector("#title").value;
    const body = this.shadowRoot.querySelector("#body").value;

    if (title && body) {
      const newNote = {
        id: Date.now(),
        title,
        body,
        createdAt: new Date().toLocaleString(),
        archived: false,
      };

      const noteList = document.querySelector("note-list");
      const notes = JSON.parse(noteList.getAttribute("data-notes"));
      notes.push(newNote);
      noteList.setAttribute("data-notes", JSON.stringify(notes));

      this.shadowRoot.querySelector("#title").value = "";
      this.shadowRoot.querySelector("#body").value = "";

      this.showPopup();
    }
  }

  showPopup() {
    const popup = this.shadowRoot.querySelector("#popup");
    popup.classList.add("show");

    setTimeout(() => {
      popup.classList.remove("show");
    }, 2000);
  }
}

customElements.define("note-form", NoteForm);
