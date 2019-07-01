

const { promisify } = require('util');
const { readFile, readFileSync } = require('fs');
const pReadFile = promisify(readFile);





// forgive me father
const re = /(?<pre>\s*\/\*\*$(?:$\s*\*[^/].*$)+\s+\*\s*@example\s+\[(?<name>[^\]]+)\]\((?<path>[^)]+)\)$)(?<post>$\s*\*\/)/mgi

pReadFile(process.argv[2]).then(file => {
  const { groups: {pre, name, path, post} } = re.exec(`${file}`);
  console.log({pre,name,path,post});
  `${file}`.replace(re, (all,pre,name,url,post) => {
    console.log(`${pre}${`\n\n\`\`\`javascript\n${readFileSync(url)}\n\`\`\``.replace(/\n/g,"\n  * ")}${post}`)
  });
})


