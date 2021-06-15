fetch("/notes")
  .then((response) => response.json())
  .then((data) => {
    data.map((note) => {
      const done = note.done ? `class="done"` : null;
      document.getElementById(
        "notes"
      ).innerHTML += `<li><span ${done} id="${note.date}" onclick="noteClick('${note.date}')">${note.data}</span> <button onclick="noteRemove('${note.date}')">x</button></li>`;
    });
  });

document.getElementById("new_note").addEventListener("click", function (e) {
  const data = document.getElementById("new_note_text").value;
  const id = new Date().getTime();
  if (data.replace(/\s/g, "").length) {
    const obj = { data: data, date: id, done: false };
    fetch("/add_note", {
      method: "POST",
      body: JSON.stringify(obj),
    }).then((res) => {
      document.getElementById(
        "notes"
      ).innerHTML += `<li><span id="${id}" onclick="noteClick('${id}')">${data}</span> <button onclick="noteRemove('${id}')">x</button></li>`;
    });
  }
  e.preventDefault();
});

const noteClick = (id) => {
  const element = document.getElementById(id);
  const classList = element.classList;
  fetch("/edit_note", {
    method: "POST",
    body: id,
  }).then((res) => {
    classList.contains("done")
      ? classList.remove("done")
      : classList.add("done");
  });
  return false;
};

const noteRemove = (id) => {
  fetch("/remove_note", {
    method: "POST",
    body: id,
  }).then((res) => {
    document.getElementById(id).parentElement.remove();
  });
  return false;
};
