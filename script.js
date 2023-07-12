// Fetch the latest bulletin data from the /bulletin/ directory
fetch('/bulletin/')
  .then(response => response.text())
  .then(data => {
    // Extract the bulletin items from the fetched data
    const bulletinItems = extractBulletinItems(data);

    // Update the bulletin items with the extracted data
    bulletinItems.forEach((item, index) => {
      const itemNumber = index + 1;
      updateBulletinItem(index, item, itemNumber);
    });
  })
  .catch(error => {
    console.error('Error fetching bulletin data:', error);
  });

// Function to extract bulletin items from the fetched data
function extractBulletinItems(data) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(data, 'text/html');

  // Get all the bulletin item elements
  const itemElements = doc.querySelectorAll('.item.features-image');

  // Extract the bulletin data from each item
  const bulletinItems = Array.from(itemElements).map((item, index) => {
    const date = item.querySelector('.item-content .item-title').textContent;
    const title = item.querySelector('.item-content .item-subtitle').textContent;
    const link = item.querySelector('.item-footer a').getAttribute('href');

    return { date, title, link };
  });

  return bulletinItems;
}

// Function to update a bulletin item with new data
function updateBulletinItem(index, { date, title, link }, itemNumber) {
  const dateElement = document.getElementById(`bulletin-date-${itemNumber}`);
  const titleElement = document.getElementById(`bulletin-title-${itemNumber}`);
  const linkElement = document.querySelector(`#bulletin-title-${itemNumber} + .item-footer a`);

  dateElement.textContent = date;
  titleElement.textContent = title;
  linkElement.setAttribute('href', link);
}
