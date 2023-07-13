async function fetchLatestBulletins() {
  const response = await fetch('/bulletin-manifest.json');
  const manifest = await response.json();
  const bulletins = manifest.slice(0, 3);

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  return bulletins.map(({ name, url }) => {
    const match = name.match(/^(\d{1,2})-(\w+)-(\d{4})/);
    if (!match) {
      console.error(`Invalid file name format: ${name}`);
      return null;
    }
    const [_, dayStr, monthStr, yearStr] = match;
    const monthIndex = monthNames.findIndex(name => name.startsWith(monthStr));
    const monthName = monthNames[monthIndex];
    const dayNum = parseInt(dayStr);
    const daySuffix = getDaySuffix(dayNum);
    const yearNum = parseInt(yearStr);
    const yearShort = yearNum.toString().slice(-2);
    const title = `${dayNum}${daySuffix} ${monthName} Ordinary Year A`;
    const href = url;
    return { title, href };
  }).filter(bulletin => bulletin != null);
}
