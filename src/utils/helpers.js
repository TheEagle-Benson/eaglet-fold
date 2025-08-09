function extractClass(htmlstring){
  const searchPattern = /class\s*=\s*["']([^"']+)["']/;
  const march = searchPattern.exec(htmlstring);
  if (!march) return;
  return march
}

module.exports = { extractClass}