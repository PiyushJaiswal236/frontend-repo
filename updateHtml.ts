import { JSDOM } from 'jsdom';
import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join } from 'path';

// Load the HTML file
const filePath = 'index.html';
console.log(`Reading HTML file from ${filePath}`);
const html = readFileSync(filePath, 'utf-8');
const dom = new JSDOM(html);
const document = dom.window.document;

// Function to get all folders in the root directory
const getFolders = (dir: string) => {
  console.log(`Getting folders in directory: ${dir}`);
  return readdirSync(dir).filter(file => statSync(join(dir, file)).isDirectory());
};

// Get all folders in the root directory
const folders = getFolders('.');
console.log(`Found folders: ${folders.join(', ')}`);

// Clear existing links
const fileExplorerDiv = document.getElementById('file-explorer');
if (fileExplorerDiv) {
  fileExplorerDiv.innerHTML = ''; // Clear existing content

  // Create new links for each folder
  folders.forEach(folder => {
    const newLink = document.createElement('a');
    newLink.href = `${folder}/index.html`;
    newLink.textContent = folder;
    newLink.className = 'folder-link';
    fileExplorerDiv.appendChild(newLink);
    fileExplorerDiv.appendChild(document.createElement('br')); // Add a line break
    console.log(`Added link for folder: ${folder}`);
  });
} else {
  console.error('No element with id "file-explorer" found.');
}

// Save the changes back to the HTML file
writeFileSync(filePath, dom.serialize());
console.log(`Updated HTML file saved to ${filePath}`);
