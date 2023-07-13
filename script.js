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
    const [sunday, ordinary, month, days, year] = dateString.split('-');
    const formattedMonth = new Date(`${month} 1, ${year}`).toLocaleString('en-US', { month: 'long' });

    return `${formattedMonth} ${days}-${parseInt(days) + 1}, ${year}`;
  };

  latestBulletins.forEach((bulletin, index) => {
    const itemDate = bulletinElements[index].querySelector('.item-title');
    const itemTitle = bulletinElements[index].querySelector('.item-subtitle');
    const readMoreBtn = bulletinElements[index].querySelector('.item-footer a');

    const formattedDate = formatDate(bulletin.title.replace('.pdf', ''));
    const parts = bulletin.title.split('-');
    const sunday = parts[0];
    const year = parts[4];
    const formattedTitle = `${sunday} Sunday Ordinary Year ${year}`;

    itemDate.textContent = formattedDate;
    itemTitle.innerHTML = `<em>${formattedTitle}</em>`;
    readMoreBtn.href = bulletin.href;
  });
}

(async function () {
  const latestBulletins = await fetchLatestBulletins();
  updateBulletinElements(latestBulletins);
})();
