const pgp = require("pg-promise")();

require("dotenv").config();

const db = pgp({
  connectionString: process.env.DATABASE_URL_HEROKU,
  ssl: true,
});

const table = "quotes_table";

let insertQuotes = () => {
  let quotes = [
    `I hate when Im on a flight and I wake up with a water bottle next to me like oh great now I gotta be responsible for this water bottle.`,
    `Perhaps I should have been more like water today.`,
    `My dad got me a drone for Christmas.`,
    `I wish I had a friend like me!`,
    `If I got any cooler I would freeze to death.`,
    `The world is our family.`,
    `Id like to meet with Tim Cook. I got some ideas.`,
    `Man... whatever happened to my antique fish tank?`,
    `Have you ever thought you were in love with someone but then realized you were just staring in a mirror for 20 minutes?`,
    `One day Im gona marry a porn star.`,
  ];
  let author = "Kanye West";

  quotes.forEach((quote) => {
    console.log(quote);
    db.any(
      `INSERT INTO ${table} ("text", "author") VALUES ('${quote}', '${author}');`
    )
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  });
};

let getQuotes = () => {
  db.any(`SELECT * FROM ${table};`)
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      console.log(error);
    });
};
