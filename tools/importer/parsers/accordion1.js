export default function parse(element, {document}) {
    const cells = [];

    // Header row for Accordion block
    const headerRow = [document.createElement('strong')];
    headerRow[0].textContent = 'Accordion';
    cells.push(headerRow);

    // Extract the sections for 'Prénoms', 'Fêtes et saints', and 'Calendriers'
    const sections = element.querySelectorAll('.list-group');

    sections.forEach((section) => {
        const titleElement = section.querySelector('.list-group-item-secondary');
        const links = section.querySelectorAll('a');

        if (titleElement && links.length > 0) {
            const title = document.createElement('p');
            title.textContent = titleElement.textContent;

            const content = document.createElement('ul');
            links.forEach((link) => {
                const listItem = document.createElement('li');
                const anchor = document.createElement('a');
                anchor.href = link.href;
                anchor.textContent = link.textContent;
                listItem.appendChild(anchor);
                content.appendChild(listItem);
            });

            cells.push([title, content]);
        }
    });

    // Replace the original element with the new block table
    const block = WebImporter.DOMUtils.createTable(cells, document);
    element.replaceWith(block);
}