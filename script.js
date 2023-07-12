// Fetch the latest bulletin data from the /bulletin/ directory
fetch('/bulletin/')
  .then(response => response.text())
  .then(data => {
    // Extract the bulletin items from the fetched data
    const bulletinItems = extractBulletinItems(data);

    // Update the first bulletin item with the latest data
    updateBulletinItem(0, bulletinItems[0], '1');

    // Shift the existing bulletin items
    shiftBulletinItems(bulletinItems);
  })
  .catch(error => {
    console.error('Error fetching bulletin data:', error);
  });

// Function to extract bulletin items from the fetched data
function extractBulletinItems(data) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(data, 'text/html');

  // Get all the bulletin item elements
  const itemElements = doc.querySelectorAll('.item');

  // Extract the bulletin data from each item
  const bulletinItems = [];
  itemElements.forEach((item, index) => {
    const date = item.querySelector('.item-title').textContent;
    const title = item.querySelector('.item-subtitle').textContent;
    const link = item.querySelector('.item-footer a').getAttribute('href');

    bulletinItems.push({ date, title, link });
  });

  return bulletinItems;
}

// Function to update a bulletin item with new data
function updateBulletinItem(index, { date, title, link }, itemNumber) {
  const dateElement = document.getElementById(`bulletin-date-${itemNumber}`);
  const titleElement = document.getElementById(`bulletin-title-${itemNumber}`);

  dateElement.textContent = date;
  titleElement.textContent = title;

  // Update the "Read More" button link
  const readMoreButton = document.querySelector(`#bulletin-title-${itemNumber} + .item-footer a`);
  readMoreButton.setAttribute('href', link);
}

// Function to shift the bulletin items
function shiftBulletinItems(bulletinItems) {
  // Check if there are at least two bulletin items
  if (bulletinItems.length >= 2) {
    // Get the second and third bulletin items
    const secondItem = bulletinItems[1];
    const thirdItem = bulletinItems[2];

    // Update the second item with the data of the third item
    updateBulletinItem(1, thirdItem, '2');

    // Remove the third item from the page
    const thirdItemElement = document.querySelector('.item:nth-child(3)');
    thirdItemElement.parentNode.removeChild(thirdItemElement);

    // Push the old second item to the third position
    const newItemElement = createBulletinItemElement(secondItem, '3');
    const rowElement = document.querySelector('.row');
    rowElement.appendChild(newItemElement);
  }
}

// Function to create a bulletin item element
function createBulletinItemElement({ date, title }, itemNumber) {
  const itemElement = document.createElement('div');
  itemElement.className = 'item features-image col-12 col-md-6 col-lg-4';

  const itemContent = `
    <div class="item-wrapper">
      <div class="item-img">
        <img src="assets/images/mbr-696x522.webp" alt="Mobirise Website Builder" title="">
      </div>
      <div class="item-content">
        <h5 id="bulletin-date-${itemNumber}" class="item-title mbr-fonts-style display-4"><em>${date}</em></h5>
        <h6 id="bulletin-title-${itemNumber}" class="item-subtitle mbr-fonts-style mt-1 display-7"><strong>${title}</strong></h6>
      </div>
      <div class="mbr-section-btn item-footer mt-2"><a href="" class="btn item-btn btn-primary-outline display-7" target="_blank">Read More &gt;</a></div>
    </div>
  `;

  itemElement.innerHTML = itemContent;

  return itemElement;
}
