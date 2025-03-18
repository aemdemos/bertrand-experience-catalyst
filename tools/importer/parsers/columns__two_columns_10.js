export default function parse(element, {document}) {
    // Extracting the carousel items
    const carouselItems = element.querySelectorAll('.carousel-item');

    // Check if carouselItems exist and handle empty cases
    if (!carouselItems.length) {
        return; // Exit if no data found
    }

    // Prepare the table header dynamically (matching example header format)
    const headerCell = document.createElement('strong');
    headerCell.textContent = 'Columns';
    const headerRow = [headerCell];

    // Collecting content for table rows dynamically
    const contentRows = Array.from(carouselItems).map((item) => {
        const image = item.querySelector('img');
        const caption = item.querySelector('.carousel-caption h5');

        // Handle cases where image or caption might be missing
        const imgElement = document.createElement('img');
        imgElement.src = image ? image.src : '';
        imgElement.alt = image ? image.alt : '';

        const captionElement = document.createElement('p');
        captionElement.textContent = caption ? caption.textContent : '';

        return [imgElement, captionElement];
    });

    const cells = [headerRow, ...contentRows];

    // Creating the table block
    const block = WebImporter.DOMUtils.createTable(cells, document);

    // Replace the original element with the block table
    element.replaceWith(block);
}