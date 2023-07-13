async function fetchLatestBulletins() {
  const response = await fetch('/bulletin-manifest.json');
  const manifest = await response.json();
  const bulletins = manifest.slice(0, 3);

  return bulletins.map(({ name, url }) => {
    const dateStr = name.match(/(\d{1,2}-\w+-\d{4})/)[1];
    const formattedDate = getFormattedDate(dateStr);
    const titleStr = name.replace(/(\.pdf)$/i, '').replace(/-/g, ' ');
    const title = `${titleStr} - ${formattedDate}`;
    const href = url;
    return { title, href };
  });
}

function updateBulletinElements(latestBulletins) {
  const bulletinElements = document.querySelectorAll('.item.features-image');

  latestBulletins.forEach((bulletin, index) => {
    if (index < bulletinElements.length) {
      const itemTitle = bulletinElements[index].querySelector('.item-title');
      const readMoreBtn = bulletinElements[index].querySelector('.item-footer a');

      itemTitle.innerHTML = `<em>${bulletin.title}</em>`;
      readMoreBtn.href = bulletin.href;
    }
  });
}

(async function () {
  const latestBulletins = await fetchLatestBulletins();
  updateBulletinElements(latestBulletins);
})();
