class NoteItem extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  set note(data) {
    this.render(data);
  }

  render(data) {
    this.shadowRoot.innerHTML = `
            <style>
                .note {
                    background: #fff;
                    padding: 10px;
                    margin: 5px;
                    border-radius: 5px;
                    box-shadow: 2px 2px 5px rgba(0,0,0,0.1);
                }
            </style>
            <div class="note">
                <h3>${data.title}</h3>
                <p>${data.body}</p>
                <small>${data.createdAt}</small>
            </div>
        `;
  }
}

customElements.define("note-item", NoteItem);
