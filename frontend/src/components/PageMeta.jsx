import { useEffect } from 'react';

function PageMeta({ titre, description }) {
  useEffect(() => {
    document.title = `${titre} — Trouve ton artisan !`;

    let balise = document.querySelector(
      'meta[name="description"]'
    );

    if (!balise) {
      balise = document.createElement('meta');
      balise.name = 'description';
      document.head.appendChild(balise);
    }

    balise.content = description;
  }, [titre, description]);

  return null;
}

export default PageMeta;