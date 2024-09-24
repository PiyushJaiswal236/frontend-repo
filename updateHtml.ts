import { JSDOM } from 'jsdom';
import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join } from 'path';

// Load the HTML file
const html = readFileSync('root/index.html', 'utf-8');
const dom = new JSDOM(html);
const document = dom.window.document;

// Function to get all folders in the root directory
const getFolders = (dir: string) => {
  return readdirSync(dir).filter(file => statSync(join(dir, file)).isDirectory());
};

// Get all folders in the root directory
const folders = getFolders('root');

// Clear existing links
const existingLinks = document.querySelectorAll('a.folder-link') as NodeListOf<HTMLAnchorElement>;
existingLinks.forEach((link: HTMLAnchorElement) => link.remove());

// Create new links for each folder
folders.forEach(folder => {
  const newLink = document.createElement('a');
  newLink.href = `${folder}/index.html`;
  newLink.textContent = folder;
  newLink.className = 'folder-link';
  document.body.appendChild(newLink);
  document.body.appendChild(document.createElement('br')); // Add a line break
});

// Save the changes back to the HTML file
writeFileSync('root/index.html', dom.serialize());
