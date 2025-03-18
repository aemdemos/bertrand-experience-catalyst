export default function parse(element, {document}) {
  const cells = [];

  // Create header row with the block name
  const headerRow = [document.createElement('strong')];
  headerRow[0].textContent = 'Accordion';
  cells.push(headerRow);

  // Process each section within the element
  const sections = element.querySelectorAll('.list-group');
  sections.forEach((section) => {
    // Extract the title
    const titleElement = section.querySelector('.list-group-item-secondary');
    if (!titleElement) return; // Skip sections without a title
    const title = document.createElement('p');
    title.textContent = titleElement.textContent.trim();

    // Extract the content links
    const contentCells = [];
    section.querySelectorAll('a.list-group-item-action').forEach((link) => {
      const content = document.createElement('p');
      const anchor = document.createElement('a');
      anchor.href = link.href;
      anchor.textContent = link.textContent.trim();
      content.append(anchor);
      contentCells.push(content);
    });

    // Skip rows without content
    if (contentCells.length > 0) {
      cells.push([title, contentCells]);
    }
  });

  // Handle edge cases for empty sections
  if (cells.length === 1) { // Only header row exists
    const emptyRow = [document.createElement('p'), document.createElement('p')];
    emptyRow[0].textContent = 'No data available';
    cells.push(emptyRow);
  }

  // Create the block table
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}