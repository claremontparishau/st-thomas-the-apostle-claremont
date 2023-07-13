function updateBulletinElements(latestBulletins) {
  const bulletinElements = document.querySelectorAll('.item.features-image');

  const formatDate = (dateString) => {
    const [sunday, ordinary, month, days, year] = dateString.split('-');
    const formattedMonth = new Date(`${month} 1, ${year}`).toLocaleString('en-US', { month: 'long' });
    const formattedDays = parseInt(days) > 9 ? days : `0${days}`;

    return `${formattedMonth} ${formattedDays}-${parseInt(formattedDays) + 1}, ${year}`;
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
    itemTitle.innerHTML = `<em>${formattedTitle}</em>`;
    readMoreBtn.href = bulletin.href;
  });
}
