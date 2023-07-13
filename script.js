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
    const formattedMonth = new Date(`${year}-${month}-${days}`).toLocaleString('en-US', { month: 'long' });
    const formattedDays = parseInt(days) > 9 ? days : `0${days}`;

    return `${formattedDays}-${parseInt(formattedDays) + 1}, ${formattedMonth} ${year}`;
  };

  const getFormattedTitle = (title) => {
    const parts = title.split('-');
    const sunday = parts[0];
    const year = parts[4];

    return `${sunday}th Sunday Ordinary Year ${year}`;
  };

  latestBulletins.forEach((bulletin, index) => {
    const itemDate = bulletinElements[index].querySelector('.item-title');
    const itemTitle = bulletinElements[index].querySelector('.item-subtitle');
    const readMoreBtn = bulletinElements[index].querySelector('.item-footer a');

    const formattedDate = formatDate(bulletin.title.replace('.pdf', ''));
    const formattedTitle = getFormattedTitle(bulletin.title.replace('.pdf', ''));

    itemDate.textContent = formattedDate;
    itemTitle.innerHTML = `<strong>${formattedTitle}</strong>`;
    readMoreBtn.href = bulletin.href;
  });
}


(async function () {
  const latestBulletins = await fetchLatestBulletins();
  updateBulletinElements(latestBulletins);
})();
