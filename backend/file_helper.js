const fs = require("fs");
const path = "./notes.json";

const fileFetcher = () => {
  let notes = [];
  try {
    if (fs.existsSync(path)) {
      try {
        const data = fs.readFileSync(path, "utf8");
        notes = JSON.parse(data);
      } catch (err) {
        console.error(err);
      }
    } else {
      try {
        fs.writeFileSync(path, JSON.stringify([]));
      } catch (err) {
        console.error(err);
      }
    }
  } catch (err) {
    console.error(err);
  }
  return notes;
};

const updateFile = (data) => {
  try {
    fs.writeFileSync(path, JSON.stringify(data));
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  fileFetcher: fileFetcher,
  updateFile: updateFile,
};
