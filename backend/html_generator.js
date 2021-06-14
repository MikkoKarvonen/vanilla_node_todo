const get_html = (listItems) => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>vanilla_node_todo</title>
</head>
<body>
    <h1>vanilla_node_todo</h1>
    <form>
        <input type="text" name="name" id="new_note_text"/>
        <button id="new_note">Submit</button>
    </form>
    <ul>
        ${generateTodos(listItems)}
    </ul>
    <script>
    document.getElementById("new_note").addEventListener("click", 
    function(e){
        const data = document.getElementById("new_note_text").value
        fetch("/add_note", {
            method: "POST", 
            body: data
        }).then(res => {
            console.log("Request complete! response:", res);
        });
      e.preventDefault();
    })
    </script>
</body>
</html>
  `;
};

const generateTodos = (listItems) => {
  let items = ``;
  listItems.map((item) => {
    items += `<li>${item}</li>`;
  });
  return items;
};

exports.get_html = get_html;
