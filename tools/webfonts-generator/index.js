const fs = require('fs');
const webfontsGenerator = require('webfonts-generator');

/*
 * Get required arguments, and init
 */
const src = getNamedArg('src');
const dest = getNamedArg('dest');

if(src && dest) {
  const icons = locateIcons(src);
  generateWebfont(icons, dest);
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
function generateWebfont(icons, dest) {
  webfontsGenerator({
    files: icons,
    dest,
    html: true,
    htmlTemplate: `${__dirname}/html.hbs`
  }, function(error) {
    if (error) {
      console.log('Fail!', error);
    } else {
      console.log(`Done! Webfont is located here: ${dest}`);
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


