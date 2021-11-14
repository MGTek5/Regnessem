import React from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const NO_FOOTER_ROUTES = [];

const Footer = () => {
  const location = useLocation().pathname;
  const { t, i18n } = useTranslation();
  if (NO_FOOTER_ROUTES.includes(location)) return null;
  return (
    <footer className="flex justify-center items-center bg-gray-800 text-white z-10">
      <a
        target="_blank"
        rel="noreferrer"
        href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
      >
        {t('footer.rgpd')}
      </a>
      <div className="flex absolute right-1">
        <button
          type="button"
          className="outline-none focus:outline-none"
          onClick={() => i18n.changeLanguage('fr')}
        >
          <img
            alt="fr flag"
            src="/fr.png"
            className="cursor-pointer h-3 mr-2"
          />
        </button>
        <button
          type="button"
          className="outline-none focus:outline-none"
          onClick={() => i18n.changeLanguage('us')}
        >
          <img
            alt="us flag"
            src="/us.png"
            className="cursor-pointer h-3"
          />
        </button>
      </div>
    </footer>
  );
};

export default Footer;
