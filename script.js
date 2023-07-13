function getFormattedDate(dateStr) {
  const date = new Date(dateStr);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString('en-US', options);
}

async function fetchLatestBulletins() {
  const response = await fetch('/bulletin-manifest.json');
  const manifest = await response.json();
  const bulletins = manifest.slice(0, 3);

  return bulletins.map(({ name, url }) => {
    const dateMatch = name.match(/(\d{4}-\d{2}-\d{2})/);
    const dateStr = dateMatch ? dateMatch[1] : '';
    const titleStr = name.replace(/(\.pdf)$/i, '').replace(/-/g, ' ').replace(/\d{4}-\d{2}-\d{2}/, '').trim();
    const formattedDate = getFormattedDate(dateStr);
    const formattedTitle = getFormattedTitle(titleStr);
    const title = `${formattedTitle} - ${formattedDate}`;
    const href = url;
    return { title, href };
  });
}

async function fetchLatestBulletins() {
  const response = await fetch('/bulletin-manifest.json');
  const manifest = await response.json();
  const bulletins = manifest.slice(0, 3);

  return bulletins.map(({ name, url }) => {
    const dateMatch = name.match(/(\d{4}-\d{2}-\d{2})/);
    const dateStr = dateMatch ? dateMatch[1] : '';
    const titleStr = name.replace(/(\.pdf)$/i, '').replace(/-/g, ' ').replace(/\d{4}-\d{2}-\d{2}/, '').trim();
    const formattedDate = getFormattedDate(dateStr);
    const formattedTitle = getFormattedTitle(titleStr);
    const title = `${formattedTitle} - ${formattedDate}`;
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
