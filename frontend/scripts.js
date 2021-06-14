fetch("http://localhost:3000/notes")
  .then((response) => response.json())
  .then((data) => {
    data.map((note) => {
      const done = note.done ? `class="done"` : null;
      document.getElementById(
        "notes"
      ).innerHTML += `<li ${done} id=${note.date}>${note.data} <button>x</button></li>`;
    });
  });

document.getElementById("new_note").addEventListener("click", function (e) {
  const data = document.getElementById("new_note_text").value;
  const obj = { data: data, date: new Date(), done: false };
  fetch("http://localhost:3000/add_note", {
    method: "POST",
    body: JSON.stringify(obj),
  }).then((res) => {
    document.getElementById("notes").innerHTML += `<li>${data}</li>`;
  });
  e.preventDefault();
});

document.getElementById("notes").addEventListener("click", function (e) {
  if (e.target.tagName === "LI") {
    const element = document.getElementById(e.target.id);
    const classList = element.classList;
    fetch("http://localhost:3000/edit_note", {
      method: "POST",
      body: e.target.id,
    }).then((res) => {
      classList.contains("done")
        ? classList.remove("done")
        : classList.add("done");
    });
    e.preventDefault();
  } else if (e.target.tagName === "BUTTON") {
    const id = e.target.parentNode.id;
    fetch("http://localhost:3000/remove_note", {
      method: "POST",
      body: id,
    }).then((res) => {
      document.getElementById(id).remove();
    });
  }
});
