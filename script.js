async function fetchLatestBulletins() {
  const response = await fetch('/bulletin/');
  const html = await response.text();
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  const links = Array.from(doc.querySelectorAll('a')).filter((link) => link.href.endsWith('.pdf')).slice(0, 3);

  return links.map((link) => {
    const title = link.textContent;
    const href = link.href;
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
