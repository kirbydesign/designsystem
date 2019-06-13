#!/usr/bin/env node

'use strict';

const fs = require('fs');
const path = require('path');
const webfontsGenerator = require('webfonts-generator');
const handlebars = require('handlebars');

/*
 * Get required arguments, and init
 */
const src = getNamedArg('src');
const dest = getNamedArg('dest');
const svgSpriteDest = getNamedArg('svg-sprite-dest');
const configDest = getNamedArg('config-dest');
const fontname = getNamedArg('fontname', true) || 'iconfont';

if(src && dest) {
  handlebars.registerHelper('svg', () => {
    const svg = src.substring(src.indexOf("assets"));
    return new handlebars.SafeString(svg);
  });

  handlebars.registerHelper('dest', () => {
    return new handlebars.SafeString(dest);
  });

  const icons = locateIcons(src);
  generateWebfont(icons, dest, fontname, configDest);
}

/*
 * Get all svg's from src folder
 */
function locateIcons(src) {
  try {
    return fs.readdirSync(src).filter(file => {
      return file.endsWith('.svg');
    }).map(file => {
      return `${src}/${file}`;
    });
  } catch (e) {
    console.log(e.message);
  }
}

/*
 * Generate webfont
 */
function generateWebfont(icons, dest, fontname, configDest = dest) {
  webfontsGenerator({
    files: icons,
    dest,
    fontName: fontname,
    types: ['ttf'],
    cssDest: path.join(configDest, fontname + '.ts'),
    cssTemplate: `${__dirname}/customIconSettings.hbs`
  }, function(error) {
    if (error) {
      console.log('Fail!', error);
    } else {
      // Move svg sprite
      if(svgSpriteDest) {
        fs.rename(`${dest}/${fontname}.svg`, `${svgSpriteDest}/${fontname}.svg`, (err) => {
          if (err) throw err;
          console.log(`Done! Webfont is located here: ${dest}`);
          console.log(`Configuration is located here: ${configDest}`);
          console.log(`SVG sprite is located here: ${svgSpriteDest}`);
        });
      } else {
        console.log(`Done! Webfont is located here: ${dest}`);
        console.log(`Configuration is located here: ${configDest}`);
      }
    }
  });
}

function getNamedArg(name, optional = false) {
  const result = process.argv.filter((arg) => {
    return arg.startsWith(`${name}=`);
  }).map(arg => arg.replace(`${name}=`, ''))[0];

  if(!result && !optional) console.log(`Argument: "${name}" is required`);

  return result;
}


