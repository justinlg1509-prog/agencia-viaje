const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const dir = process.cwd();
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));
const cssFile = path.join(dir, 'styles.css');

let cssAppend = '\n\n/* --- AUTO EXTRACTED INLINE STYLES --- */\n';
let styleMap = {};
let classCounter = 1;
let modifiedFiles = 0;

files.forEach(file => {
    const filePath = path.join(dir, file);
    const content = fs.readFileSync(filePath, 'utf8');
    const $ = cheerio.load(content, { decodeEntities: false, recognizeSelfClosing: true });
    let fileChanged = false;

    $('[style]').each(function() {
        const el = $(this);
        const style = el.attr('style').trim();
        
        // Skip display:none handled by JS commonly
        if (style === 'display: none;' || style === 'display:none;') {
            return;
        }

        if (!styleMap[style]) {
            const className = `auto-style-${classCounter++}`;
            styleMap[style] = className;
            cssAppend += `.${className} { ${style} }\n`;
        }

        const className = styleMap[style];
        el.removeAttr('style');
        
        let existingClass = el.attr('class');
        if (existingClass) {
            el.attr('class', existingClass + ' ' + className);
        } else {
            el.attr('class', className);
        }

        fileChanged = true;
    });

    if (fileChanged) {
        fs.writeFileSync(filePath, $.html());
        modifiedFiles++;
        console.log(`Updated ${file}`);
    }
});

if (modifiedFiles > 0) {
    fs.appendFileSync(cssFile, cssAppend);
    console.log(`Appended ${classCounter - 1} new utility classes to styles.css`);
} else {
    console.log('No inline styles found to extract.');
}
