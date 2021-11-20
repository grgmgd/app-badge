#! /usr/bin/env node

const { program } = require("commander");
const axios = require("axios");
var glob = require("glob");
const path = require("path");

const sharp = require("sharp");
sharp.cache(false);

const resizedSvgToSharp = require("../utils/resizedSvgToSharp");

const DEFAULT_GLOB =
  "{./ios/**/*.appiconset/*.{png,PNG}*,./android/app/src/main/res/mipmap-*/ic_launcher*.{png,PNG}}";

program
  .option("-s, --shield <type>")
  .option("-g, --gravity <type>")
  .option(
    "--scale <type>",
    "The preferred badge scale, calculated based on input image",
    "0.5"
  )
  .option("--glob <type>", "", DEFAULT_GLOB)
  .description("List all the TODO tasks")
  .action(list);

program.parse(process.argv);

async function list(options) {
  try {
    const shieldImage = await axios({
      url: `https://img.shields.io/badge/${options.shield}`,
      responseType: "arraybuffer",
    });

    glob(options.glob, { nocase: false }, (err, files) => {
      let images = [];
      images = files.map((filePath) => path.join(process.cwd(), filePath));

      const scale = +options.scale;

      images.forEach(async (image) => {
        const icon = sharp(image);
        const metadata = await icon.metadata();

        const badge = await resizedSvgToSharp(shieldImage.data, {
          width: (metadata.width * scale).toFixed(),
          height: (metadata.height * scale).toFixed(),
        });

        const final = await icon
          .composite([
            {
              input: badge,
              gravity: options.gravity,
            },
          ])
          .png()
          .toBuffer();

        sharp(final).toFile(image);
      });
    });
  } catch (error) {
    if (error.isAxiosError) {
      console.error("Failed to fetch shield from shields.io");
    }
    console.error(error);
  }
}
