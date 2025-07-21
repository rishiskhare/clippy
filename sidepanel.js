(() => {
  const container = document.getElementById('links-container');
  const toast = document.getElementById('toast');

  const addBtn = document.getElementById('add-link-btn');
  const modal = document.getElementById('add-link-modal');
  const form = document.getElementById('add-link-form');
  const nameInput = document.getElementById('link-name');
  const urlInput = document.getElementById('link-url');
  const cancelBtn = document.getElementById('cancel-link-btn');
  const closeBtn = document.getElementById('close-link-btn');

  function getFaviconUrl(pageUrl) {
    try {
      const { hostname } = new URL(pageUrl);
      return `https://www.google.com/s2/favicons?domain=${hostname}&sz=64`;
    } catch {
      return '';
    }
  }

  function createLinkBox(label, url) {
    const btn = document.createElement('button');
    btn.className = 'link-box';
    btn.dataset.url = url;

    const faviconImg = document.createElement('img');
    faviconImg.className = 'favicon';
    faviconImg.src = getFaviconUrl(url);
    faviconImg.alt = `${label} favicon`;
    faviconImg.width = 20;
    faviconImg.height = 20;
    faviconImg.loading = 'lazy';
    faviconImg.onerror = () => faviconImg.remove();

    const textWrapper = document.createElement('div');
    textWrapper.className = 'text';

    const labelSpan = document.createElement('span');
    labelSpan.className = 'label';
    labelSpan.textContent = label;

    const urlSpan = document.createElement('span');
    urlSpan.className = 'url';
    urlSpan.textContent = url;

    textWrapper.appendChild(labelSpan);
    textWrapper.appendChild(urlSpan);

    btn.appendChild(faviconImg);
    btn.appendChild(textWrapper);

    const copiedSpan = document.createElement('span');
    copiedSpan.className = 'copied-message';
    copiedSpan.textContent = 'Copied to clipboard ✅';

    btn.appendChild(copiedSpan);
    return btn;
  }

  function showToast(message) {
    toast.textContent = message;
    toast.style.opacity = '1';
    setTimeout(() => (toast.style.opacity = '0'), 1800);
  }

  chrome.storage.sync.get({ links: [] }, ({ links }) => {
    links.forEach(({ label, url }) => {
      container.insertBefore(createLinkBox(label, url), addBtn);
    });
  });

  addBtn.addEventListener('click', () => {
    modal.hidden = false;
    nameInput.value = '';
    urlInput.value = '';
    nameInput.focus();
  });

  cancelBtn.addEventListener('click', () => {
    modal.hidden = true;
  });

  closeBtn.addEventListener('click', () => {
    modal.hidden = true;
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.hidden = true;
    }
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const label = nameInput.value.trim();
    const url = urlInput.value.trim();

    if (!label || !url) {
      showToast('Both fields are required.');
      return;
    }

    try {
      new URL(url);
    } catch {
      showToast('Please enter a valid URL.');
      return;
    }

    container.insertBefore(createLinkBox(label, url), addBtn);

    chrome.storage.sync.get({ links: [] }, (data) => {
      chrome.storage.sync.set({ links: [...data.links, { label, url }] });
    });

    modal.hidden = true;
    showToast('Link added!');
  });

  container.addEventListener('click', async (e) => {
    const target = e.target.closest('.link-box');
    if (!target) return;

    target.classList.add('pressed');
    const handleAnimationEnd = () => {
      target.classList.remove('pressed');
      target.removeEventListener('animationend', handleAnimationEnd);
    };
    target.addEventListener('animationend', handleAnimationEnd);

    const url = target.dataset.url;
    try {
      await navigator.clipboard.writeText(url);

      if (target._copiedTimeout) {
        clearTimeout(target._copiedTimeout);
      }

      target.classList.add('show-copied');

      target._copiedTimeout = setTimeout(() => {
        target.classList.remove('show-copied');
        target._copiedTimeout = null;
      }, 900);
    } catch (err) {
      console.error('Failed to copy: ', err);
      showToast('Could not copy. See console.');
    }
  });
})(); 