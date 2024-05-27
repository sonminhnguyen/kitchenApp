// const sql = require('better-sqlite3');
// const db = sql('meals.db');
const { sql } = require("@vercel/postgres");
const { NextResponse } = require("next/server");
// import { NextResponse } from "next/server";

const dummyMeals = [
   {
      title: "Juicy Cheese Burger",
      slug: "juicy-cheese-burger-sj283",
      image: "burger.jpg",
      imageURL: "https://drive.google.com/uc?export=view&id=1rQ_hDU0x6XqmV_owNuuLzLQ_u_DZnfo-",
      summary:
         "A mouth-watering burger with a juicy beef patty and melted cheese, served in a soft bun.",
      instructions: `
      1. Prepare the patty:
         Mix 200g of ground beef with salt and pepper. Form into a patty.

      2. Cook the patty:
         Heat a pan with a bit of oil. Cook the patty for 2-3 minutes each side, until browned.

      3. Assemble the burger:
         Toast the burger bun halves. Place lettuce and tomato on the bottom half. Add the cooked patty and top with a slice of cheese.

      4. Serve:
         Complete the assembly with the top bun and serve hot.
    `,
      creator: "John Doe",
      creator_email: "johndoe@example.com",
   },
   {
      title: "Spicy Curry",
      slug: "spicy-curry-is934",
      image: "curry.jpg",
      imageURL: "https://drive.google.com/uc?export=view&id=1KsCXJm29IOvmb-vLgYQLETuyzXCe-4oH",
      summary:
         "A rich and spicy curry, infused with exotic spices and creamy coconut milk.",
      instructions: `
      1. Chop vegetables:
         Cut your choice of vegetables into bite-sized pieces.

      2. Sauté vegetables:
         In a pan with oil, sauté the vegetables until they start to soften.

      3. Add curry paste:
         Stir in 2 tablespoons of curry paste and cook for another minute.

      4. Simmer with coconut milk:
         Pour in 500ml of coconut milk and bring to a simmer. Let it cook for about 15 minutes.

      5. Serve:
         Enjoy this creamy curry with rice or bread.
    `,
      creator: "Max Schwarz",
      creator_email: "max@example.com",
   },
   {
      title: "Homemade Dumplings",
      slug: "homemade-dumplings-kd984",
      image: "dumplings.jpg",
      imageURL: "https://drive.google.com/uc?export=view&id=1V4rp19QBrSIiMWP2ptXhdWLVnjaekSSv",
      summary:
         "Tender dumplings filled with savory meat and vegetables, steamed to perfection.",
      instructions: `
      1. Prepare the filling:
         Mix minced meat, shredded vegetables, and spices.

      2. Fill the dumplings:
         Place a spoonful of filling in the center of each dumpling wrapper. Wet the edges and fold to seal.

      3. Steam the dumplings:
         Arrange dumplings in a steamer. Steam for about 10 minutes.

      4. Serve:
         Enjoy these dumplings hot, with a dipping sauce of your choice.
    `,
      creator: "Emily Chen",
      creator_email: "emilychen@example.com",
   },
   {
      title: "Classic Mac n Cheese",
      slug: "classic-mac-n-cheese-sl094",
      image: "macncheese.jpg",
      imageURL: "https://drive.google.com/uc?export=view&id=1MCtl4br1ogpAhFxWsY6tW3VggxCMSQDw",
      summary:
         "Creamy and cheesy macaroni, a comforting classic that's always a crowd-pleaser.",
      instructions: `
      1. Cook the macaroni:
         Boil macaroni according to package instructions until al dente.

      2. Prepare cheese sauce:
         In a saucepan, melt butter, add flour, and gradually whisk in milk until thickened. Stir in grated cheese until melted.

      3. Combine:
         Mix the cheese sauce with the drained macaroni.

      4. Bake:
         Transfer to a baking dish, top with breadcrumbs, and bake until golden.

      5. Serve:
         Serve hot, garnished with parsley if desired.
    `,
      creator: "Laura Smith",
      creator_email: "laurasmith@example.com",
   },
   {
      title: "Authentic Pizza",
      slug: "authentic-pizza-dn092",
      image: "pizza.jpg",
      imageURL: "https://drive.google.com/uc?export=view&id=17gCSrVey6r230IPlu6u67If6-bet-XZK",
      summary:
         "Hand-tossed pizza with a tangy tomato sauce, fresh toppings, and melted cheese.",
      instructions: `
      1. Prepare the dough:
         Knead pizza dough and let it rise until doubled in size.

      2. Shape and add toppings:
         Roll out the dough, spread tomato sauce, and add your favorite toppings and cheese.

      3. Bake the pizza:
         Bake in a preheated oven at 220°C for about 15-20 minutes.

      4. Serve:
         Slice hot and enjoy with a sprinkle of basil leaves.
    `,
      creator: "Mario Rossi",
      creator_email: "mariorossi@example.com",
   },
   {
      title: "Wiener Schnitzel",
      slug: "wiener-schnitzel-rt283",
      image: "schnitzel.jpg",
      imageURL: "https://drive.google.com/uc?export=view&id=1kLFLz3q2jB6fnEIDsWegsmvxttTAj-EB",
      summary:
         "Crispy, golden-brown breaded veal cutlet, a classic Austrian dish.",
      instructions: `
      1. Prepare the veal:
         Pound veal cutlets to an even thickness.

      2. Bread the veal:
         Coat each cutlet in flour, dip in beaten eggs, and then in breadcrumbs.

      3. Fry the schnitzel:
      Heat oil in a pan and fry each schnitzel until golden brown on both sides.

      4. Serve:
      Serve hot with a slice of lemon and a side of potato salad or greens.
 `,
      creator: "Franz Huber",
      creator_email: "franzhuber@example.com",
   },
   {
      title: "Fresh Tomato Salad",
      slug: "fresh-tomato-salad-rm938",
      image: "tomato-salad.jpg",
      imageURL: "https://drive.google.com/uc?export=view&id=1SwebxsJVdcQGm_oQvEAw9ts_9QUaTSyB",
      summary:
         "A light and refreshing salad with ripe tomatoes, fresh basil, and a tangy vinaigrette.",
      instructions: `
      1. Prepare the tomatoes:
        Slice fresh tomatoes and arrange them on a plate.
    
      2. Add herbs and seasoning:
         Sprinkle chopped basil, salt, and pepper over the tomatoes.
    
      3. Dress the salad:
         Drizzle with olive oil and balsamic vinegar.
    
      4. Serve:
         Enjoy this simple, flavorful salad as a side dish or light meal.
    `,
      creator: "Sophia Green",
      creator_email: "sophiagreen@example.com",
   },
];

// db.prepare(`
//    CREATE TABLE IF NOT EXISTS meals (
//        id INTEGER PRIMARY KEY AUTOINCREMENT,
//        slug TEXT NOT NULL UNIQUE,
//        title TEXT NOT NULL,
//        image TEXT NOT NULL,
//        summary TEXT NOT NULL,
//        instructions TEXT NOT NULL,
//        creator TEXT NOT NULL,
//        creator_email TEXT NOT NULL
//     )
// `).run();

// async function initData() {
//   const stmt = db.prepare(`
//       INSERT INTO meals VALUES (
//          null,
//          @slug,
//          @title,
//          @image,
//          @summary,
//          @instructions,
//          @creator,
//          @creator_email
//       )
//    `);

//   for (const meal of dummyMeals) {
//     stmt.run(meal);
//   }
// }

// initData();
async function createTableMeals() {
   try {
      const result = await sql`CREATE TABLE IF NOT EXISTS kitchenApp_meals (
                  id SERIAL PRIMARY KEY,
                  slug VARCHAR(255) NOT NULL UNIQUE,
                  title VARCHAR(255) NOT NULL,
                  image VARCHAR(255) NOT NULL,
                  imageURL VARCHAR(255) NOT NULL,
                  summary TEXT NOT NULL,
                  instructions TEXT NOT NULL,
                  creator VARCHAR(255) NOT NULL,
                  creator_email VARCHAR(255) NOT NULL
                );`;
      return NextResponse.json({ result }, { status: 200 });
   } catch (error) {
      console.log("create database kitchenApp_meals error: " + error)
      return NextResponse.json({ error }, { status: 500 });
   }
};

async function insertMockData() {
   try {

      for (const meal of dummyMeals) {
         await sql`INSERT INTO kitchenApp_meals (slug, title, image, imageURL, summary, instructions, creator, creator_email) VALUES (
         ${meal.slug},
         ${meal.title},
         ${meal.image},
         ${meal.imageURL},
         ${meal.summary},
         ${meal.instructions},
         ${meal.creator},
         ${meal.creator_email}
      )`;
      }
      console.log("success!")

   } catch (error) {
      console.log(error)
      return NextResponse.json({ error }, { status: 500 });
   }

   const meals = await sql`SELECT * FROM kitchenApp_meals;`;
   console.log(meals)
   //   return NextResponse.json({ meals }, { status: 200 });
};

async function initData() {
   try {
      await createTableMeals();
      await insertMockData();
      return NextResponse.json({ result }, { status: 200 });
   } catch (error) {
      console.log(error)
      return NextResponse.json({ error }, { status: 500 });
   }
}

initData();