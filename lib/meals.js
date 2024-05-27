// import fs from 'node:fs';
import { S3 } from "@aws-sdk/client-s3";
// import sql from "better-sqlite3";
import slugify from "slugify";
import xss from "xss";
import { uploadImageToGgDrive } from "./upload";
import { randomStr } from "./utils/randomStr";

const { sql } = require("@vercel/postgres");
const { NextResponse } = require("next/server");

// const db = sql("meals.db");

export async function getMeals() {
  try {
    const res = await sql`SELECT * FROM kitchenApp_meals;`;
    // console.log(res)
    return res.rows;
  } catch (err) {
    console.log(err)
  }
}

export async function getMeal(slug) {
  try {
    const res = await sql`SELECT * FROM kitchenApp_meals WHERE slug = ${slug}`;
    // console.log(res);
    return res.rows[0];
  } catch (error) {
    console.log(error)
  }
}

export async function saveMeal(meal) {
  meal.slug = slugify(meal.title, { lower: true });
  meal.instructions = xss(meal.instructions);

  const extension = meal.image.name.split(".").pop();
  const fileName = `${meal.slug}-${randomStr(5)}.${extension}`;
  const bufferedimageURL = await meal.image.arrayBuffer();

  const res = uploadImageToGgDrive({
    fileName,
    folderName: 'kitchenApp/meals',
    image: Buffer.from(bufferedimageURL),
    contentType: meal.imageURLURL.type,
  });

  // console.log(res)
  meal.image = fileName;
  meal.imageURL = res.id;

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
