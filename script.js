async function fetchBulletinFiles() {
  const response = await fetch('/bulletin/');
  const html = await response.text();
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  const links = Array.from(doc.querySelectorAll('.js-navigation-open')).filter((link) => link.href.endsWith('.pdf'));

  return links.map((link) => {
    const title = link.textContent;
    const href = link.href;
    return { title, href };
  });
}

function generateBulletinList(bulletinFiles) {
  const listItems = bulletinFiles.map((file) => `<li><a href="${file.href}" target="_blank">${file.title}</a></li>`);
  const listHTML = `<ul>${listItems.join('')}</ul>`;
  return listHTML;
}

(async function () {
  const bulletinFiles = await fetchBulletinFiles();
  const bulletinListHTML = generateBulletinList(bulletinFiles);
  // Insert the bulletin list HTML into the page
  const bulletinListContainer = document.querySelector('.bulletin-list');
  bulletinListContainer.innerHTML = bulletinListHTML;
})();
