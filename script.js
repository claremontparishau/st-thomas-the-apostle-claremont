async function fetchLatestBulletins() {
  const response = await fetch('/bulletin-manifest.json');
  const manifest = await response.json();
  const bulletins = manifest.slice(0, 3);

  return bulletins.map(({ name, url }) => {
    const title = name.replace('.pdf', '');
    const href = url;
    return { title, href };
  });
}

function updateBulletinElements(latestBulletins) {
  const bulletinElements = document.querySelectorAll('.item.features-image');

  const getFormattedTitle = (title) => {
    const parts = title.split('-');
    const sunday = parts[0];
    const year = parts[5];

    return `${sunday}th Sunday Ordinary Year ${year}`;
  };

  const getFormattedDate = (title) => {
    const parts = title.split('-');
    const day1 = parts[6];
    const day2 = parts[7];
    const month = parts[8];
    const year = parts[9];

    const monthIndex = parseInt(month) - 1;
    const monthName = monthNames[monthIndex];
    return `${day1}-${day2}, ${monthName} ${year}`;
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  latestBulletins.forEach((bulletin, index) => {
    const itemTitle = bulletinElements[index].querySelector('.item-title');
    const itemSubtitle = bulletinElements[index].querySelector('.item-subtitle');
    const readMoreBtn = bulletinElements[index].querySelector('.item-footer a');

    const formattedTitle = getFormattedTitle(bulletin.title.replace('.pdf', ''));
    const formattedDate = getFormattedDate(bulletin.title.replace('.pdf', ''));
    itemTitle.innerHTML = `<strong>${formattedTitle}</strong>`;
    itemSubtitle.textContent = formattedDate;
    readMoreBtn.href = bulletin.href;
  });
}

(async function () {
  const latestBulletins = await fetchLatestBulletins();
  updateBulletinElements(latestBulletins);
})();
