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

  const formatDate = (dateString) => {
    const parts = dateString.split('-');
    const day1 = parts[0];
    const day2 = parts[1];
    const month = parts[2];
    const year = parts[3];

    const monthIndex = parseInt(month) - 1;
    const monthName = monthNames[monthIndex];
    return `${day1}-${day2}, ${monthName} ${year}`;
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  latestBulletins.forEach((bulletin, index) => {
    const itemDate = bulletinElements[index].querySelector('.item-title');
    const itemTitle = bulletinElements[index].querySelector('.item-subtitle');
    const readMoreBtn = bulletinElements[index].querySelector('.item-footer a');

    const formattedDate = formatDate(bulletin.title.replace('.pdf', ''));
    const formattedTitle = bulletin.title.replace('.pdf', '');

    itemDate.textContent = formattedDate;
    itemTitle.innerHTML = `<em>${formattedTitle}</em>`;
    readMoreBtn.href = bulletin.href;
  });
}

(async function () {
  const latestBulletins = await fetchLatestBulletins();
  updateBulletinElements(latestBulletins);
})();
