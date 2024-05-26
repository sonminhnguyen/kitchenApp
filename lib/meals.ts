// import fs from 'node:fs';
import { S3 } from "@aws-sdk/client-s3";
import sql from "better-sqlite3";
import slugify from "slugify";
import xss from "xss";
import { uploadImageToGgDrive } from "./upload";
import { randomStr } from "./utils/randomStr";

const db = sql("meals.db");

export async function getMeals() {
  // await new Promise((resolve) => setTimeout(resolve, 5000));

  return db.prepare("SELECT * FROM meals").all();
}

export function getMeal(slug) {
  return db.prepare("SELECT * FROM meals WHERE slug = ?").get(slug);
}

export async function saveMeal(meal) {
  meal.slug = slugify(meal.title, { lower: true });
  meal.instructions = xss(meal.instructions);

  const extension = meal.image.name.split(".").pop();
  const fileName = `${meal.slug}-${randomStr(5)}.${extension}`;
  const bufferedImage = await meal.image.arrayBuffer();

  uploadImageToGgDrive({
    fileName,
    folderName: 'kitchenApp/meals',
    image: Buffer.from(bufferedImage),
    contentType: meal.image.type,
  });

  meal.image = fileName;

  db.prepare(
    `
    INSERT INTO meals
      (title, summary, instructions, creator, creator_email, image, slug)
    VALUES (
      @title,
      @summary,
      @instructions,
      @creator,
      @creator_email,
      @image,
      @slug
    )
  `
  ).run(meal);
}
