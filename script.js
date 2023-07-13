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
    const year = parts[8];

    return `${sunday} Sunday Ordinary Year ${year}`;
  };

  const getFormattedDate = (title) => {
    const parts = title.split('-');
    const month1 = parts[2];
    const month2 = parts[3];
    const startDay = parts[4];
    const endDay = parts[5];
    const year = parts[8];

    let monthName;
    if (month1 && month2) {
      const monthIndex = parseInt(month1) - 1;
      monthName = monthNames[monthIndex];
    } else {
      monthName = "";
    }

    const dayStr = startDay ? (endDay ? `${startDay}-${endDay}` : startDay) : "";
    const formattedDay = dayStr.padStart(2, '0');
    return `${formattedDay}, ${monthName} ${year}`;
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
    itemTitle.innerHTML = formattedTitle;
    itemSubtitle.innerHTML = `<em>${formattedDate}</em>`;
    readMoreBtn.href = bulletin.href;
  });
}

(async function () {
  const latestBulletins = await fetchLatestBulletins();
  updateBulletinElements(latestBulletins);
})();

(async function () {
  const latestBulletins = await fetchLatestBulletins();
  updateBulletinElements(latestBulletins);
})();
