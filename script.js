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

  latestBulletins.forEach((bulletin, index) => {
    const itemTitle = bulletinElements[index].querySelector('.item-title');
    const itemSubtitle = bulletinElements[index].querySelector('.item-subtitle');
    const readMoreBtn = bulletinElements[index].querySelector('.item-footer a');

    itemTitle.innerHTML = `<em>${bulletin.title}</em>`;
    itemSubtitle.textContent = ''; // Remove the subtitle
    readMoreBtn.href = bulletin.href;
  });
}

(async function () {
  const latestBulletins = await fetchLatestBulletins();
  updateBulletinElements(latestBulletins);
})();
