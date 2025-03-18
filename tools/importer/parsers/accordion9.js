export default function parse(element, {document}) {
  const createTable = WebImporter.DOMUtils.createTable;

  // Extract relevant content
  const headerRow = [document.createElement('strong')];
  headerRow[0].textContent = "Accordion";

  const rows = [];

  // Extracting each accordion group and its items
  const accordions = element.querySelectorAll('.list-group');

  accordions.forEach((accordion) => {
    const titleElement = accordion.querySelector('span');

    if (titleElement) {
      // Extract title text
      const titleText = titleElement.textContent.trim();

      // Collect links or other content in accordion body
      const links = accordion.querySelectorAll('a');

      const contentCell = [];

      links.forEach((link) => {
        const linkElement = document.createElement('a');
        linkElement.href = link.href;
        linkElement.textContent = link.textContent.trim();
        contentCell.push(linkElement);
      });

      rows.push([titleText, contentCell]);
    }
  });

  // Create the table with extracted rows
  const table = createTable([headerRow, ...rows], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}