export default function parse(element, {document}) {
  // Dynamically create the header row based on example prompt
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Columns';
  const headerRow = [headerCell];

  const columnContent = [];

  // Locate all columns dynamically
  const columns = element.querySelectorAll('.col-md-8, .col-md-2, .col-md-5');

  columns.forEach((col) => {
    // Extract image dynamically and provide uniform fallback
    const image = col.querySelector('img');
    let imageElement; // Change from const to let
    if (image) {
      imageElement = document.createElement('img');
      imageElement.src = image.src;
      imageElement.alt = image.alt || 'Image unavailable';
    } else {
      const fallbackImage = document.createElement('div');
      fallbackImage.textContent = 'No image available';
      imageElement = fallbackImage; // Assign fallbackImage to imageElement
    }

    // Extract title dynamically and ensure proper fallback
    const title = col.querySelector('h1, h2, h3');
    const columnTitle = document.createElement('div');
    columnTitle.textContent = title ? title.textContent.trim() : 'No title available';

    // Extract description dynamically and ensure organization for readability
    const description = col.querySelector('p');
    const columnDescription = document.createElement('div');
    if (description) {
      const descriptionParts = description.textContent.split('. ').map((text) => {
        const paragraph = document.createElement('p');
        paragraph.textContent = text.trim();
        return paragraph;
      });
      columnDescription.append(...descriptionParts);
    } else {
      columnDescription.textContent = 'No description available';
    }

    columnContent.push([imageElement, columnTitle, columnDescription]);
  });

  const cells = [headerRow, ...columnContent];

  // Use WebImporter.DOMUtils.createTable() to construct the block
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block
  element.replaceWith(blockTable);
}