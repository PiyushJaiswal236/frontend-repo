"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsdom_1 = require("jsdom");
const fs_1 = require("fs");
const path_1 = require("path");
// Load the HTML file
const filePath = 'index.html';
console.log(`Reading HTML file from ${filePath}`);
const html = (0, fs_1.readFileSync)(filePath, 'utf-8');
const dom = new jsdom_1.JSDOM(html);
const document = dom.window.document;
// Function to get all folders in the root directory
const getFolders = (dir) => {
    console.log(`Getting folders in directory: ${dir}`);
    return (0, fs_1.readdirSync)(dir).filter(file => (0, fs_1.statSync)((0, path_1.join)(dir, file)).isDirectory());
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
}
else {
    console.error('No element with id "file-explorer" found.');
}
// Save the changes back to the HTML file
(0, fs_1.writeFileSync)(filePath, dom.serialize());
console.log(`Updated HTML file saved to ${filePath}`);
