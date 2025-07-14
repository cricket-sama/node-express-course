const http = require("http");
var StringDecoder = require("string_decoder").StringDecoder;

const getBody = (req, callback) => {
  const decode = new StringDecoder("utf-8");
  let body = "";
  req.on("data", function (data) {
    body += decode.write(data);
  });
  req.on("end", function () {
    body += decode.end();
    const body1 = decodeURI(body);
    const bodyArray = body1.split("&");
    const resultHash = {};
    bodyArray.forEach((part) => {
      const partArray = part.split("=");
      resultHash[partArray[0]] = partArray[1];
    });
    callback(resultHash);
  });
};

// here, you could declare one or more variables to store what comes back from the form.
let mood = null;
const moodColor = {
  happy: "#EFC050",
  sad: "#5B5EA6",
  angry: "#9B2335",
  calm: "#6F8D6A"
}
const moodMessage = {
  happy: "Happiness and confidence are the prettiest things you can wear",
  sad: `I have found, through painful experience,<br>
        that the most important step a person can take<br>
        is always the next one.`,
  angry: "Feel it all,<br>Then, let it go",
  calm: "I am a slow walker,<br>but I never walk back."
}

// here, you can change the form below to modify the input fields and what is displayed.
// This is just ordinary html with string interpolation.
const form = () => {
  return `
  <body style='background-color: ${moodColor[mood] || '#EFDECD'}'>
  <h2>${moodMessage[mood] || "What mood are you in right now?"}</h2>
  <p>
  <form method="POST">
  <select name="mood">
    <option value="happy">Happy</option>
    <option value="sad">Sad</option>
    <option value="angry">Angry</option>
    <option value="calm">Calm</option>
  </select>
  <button name="submit">Submit</button>
  </form>
  </body>
  `;
};

const server = http.createServer((req, res) => {
  console.log("req.method is ", req.method);
  console.log("req.url is ", req.url);
  if (req.method === "POST") {
    getBody(req, (body) => {
      console.log("The body of the post is ", body);
      // here, you can add your own logic
      if (body["mood"]) {
        mood = body["mood"];
      } else {
        mood = null;
      }
      // Your code changes would end here
      res.writeHead(303, {
        Location: "/",
      });
      res.end();
    });
  } else {
    res.end(form());
  }
});

server.listen(3000);
console.log("The server is listening on port 3000.");
