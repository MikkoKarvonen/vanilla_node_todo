const get_html = () => {
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
    <form method="post" action="http://localhost:3000" id="new_note">
        <input type="text" name="name" />
        <input type="submit" value="Submit">
    </form> 
    <script>
    document.getElementbyId("new_note").addEventListener("click", 
    function(e){
      e.preventDefault();
    })
    </script>
</body>
</html>
  `;
};

exports.get_html = get_html;
