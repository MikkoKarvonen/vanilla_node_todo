fetch("http://localhost:3000/notes")
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    data.map((note) => {
      document.getElementById("notes").innerHTML += `<li>${note}</li>`;
    });
  });

document.getElementById("new_note").addEventListener("click", function (e) {
  const data = document.getElementById("new_note_text").value;
  fetch("http://localhost:3000/add_note", {
    method: "POST",
    body: data,
  }).then((res) => {
    document.getElementById("notes").innerHTML += `<li>${data}</li>`;
  });
  e.preventDefault();
});
