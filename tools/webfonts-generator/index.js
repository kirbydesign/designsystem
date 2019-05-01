const fs = require('fs');
const webfontsGenerator = require('webfonts-generator');

/*
 * Where are the svg's located
 */
const src = `${__dirname}/../../src/assets/icons/sprites`;
/*
 * Where should the generated webfont be located
 */
const dest = 'src/assets/fonts/iconfont';

/*
 * Read all svg's from src folder
 */
fs.readdir(src, (err, files) => {
  const icons = files.filter(file => {
    return file.endsWith('.svg');
  }).map(file => {
    return `${src}/${file}`;
  });
  generateWebfont(icons);
});

/*
 * Generate webfont
 */
function generateWebfont(icons) {
  webfontsGenerator({
    files: icons,
    dest: `${__dirname}/../../${dest}`,
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


