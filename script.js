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
    const ordinary = parts[2];
    const year = parts[3];

    return `${sunday} Sunday Ordinary Year ${ordinary} ${year}`;
  };

  latestBulletins.forEach((bulletin, index) => {
    const itemTitle = bulletinElements[index].querySelector('.item-title');
    const itemSubtitle = bulletinElements[index].querySelector('.item-subtitle');
    const readMoreBtn = bulletinElements[index].querySelector('.item-footer a');

    const formattedTitle = getFormattedTitle(bulletin.title.replace('.pdf', ''));
    itemTitle.innerHTML = `<em>${formattedTitle}</em>`;
    itemSubtitle.textContent = ''; // Remove the subtitle
    readMoreBtn.href = bulletin.href;
  });
}


(async function () {
  const latestBulletins = await fetchLatestBulletins();
  updateBulletinElements(latestBulletins);
})();
