function modifyLinks() {
  chrome.storage.local.get(['configuredDomain', 'useHttps'], function(result) {
    const configuredDomain = result.configuredDomain || 'bolt.diy';
    const useHttps = result.useHttps !== false;
    const protocol = useHttps ? 'https' : 'http';
    const links = document.querySelectorAll('a[href*="bolt.new"]');
    links.forEach(link => {
      const originalHref = link.href;
      const newHref = originalHref.replace('bolt.new', configuredDomain);
       if (newHref.startsWith(`https://${configuredDomain}/`)) {
        const url = new URL(newHref);
        const gitUrl = url.pathname.substring(1);
        link.href = `${protocol}://${configuredDomain}/git?url=https://${gitUrl}`;
      }

      // Update text content case-insensitively
      const regex = new RegExp('bolt\\.new', 'gi');
      if (link.textContent.match(regex)) {
        link.textContent = link.textContent.replace(regex, 'bolt.diy');
      }
      
      // Update text content in child nodes case-insensitively
      link.childNodes.forEach(node => {
        if (node.nodeType === Node.TEXT_NODE && node.textContent.match(regex)) {
          node.textContent = node.textContent.replace(regex, 'bolt.diy');
        }
      });
    });
  });
}

modifyLinks();
