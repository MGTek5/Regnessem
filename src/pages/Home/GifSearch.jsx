import propTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import Search from '../../components/images/Search';
import { TENOR_API_BASE_URL, TENOR_API_KEY } from '../../constant';

const GifSearch = ({ sendMessage }) => {
  const [gifs, setGifs] = useState([]);
  const [gifFilter, setGifFilter] = useState('');
  const [t] = useTranslation();

  const clearGifSearchBarInput = () => {
    setGifs([]);
    setGifFilter('');
  };

  useEffect(() => {
    const fetchGifs = async () => {
      try {
        const res = await axios.get(`${TENOR_API_BASE_URL}/search?key=${TENOR_API_KEY}&q=${gifFilter}`);
        setGifs(res.data.results);
      } catch (err) {
        toast.error(t('common.error'));
      }
    };

    setGifs([]);
    if (gifFilter && gifFilter.length >= 3) {
      fetchGifs();
    }
  }, [gifFilter, t]);

  return (
    <div className="flex flex-col items-center justify-between shadow-md w-96 h-full">
      {
        !gifs.length
          ? (
            <div className="h-full items-center justify-center flex flex-col">
              <Search className="w-16 animate-bounce" />
              <span>{t('home.nothingToShow')}</span>
              <span>{t('home.searchSomething')}</span>
            </div>
          ) : (
            <div className="max-h-full overflow-y-auto overflow-x-hidden scrollbar-w-1 scrollbar-thumb-rounded-full scrollbar-thumb-gray-400 scrollbar-track-gray flex flex-wrap">
              {gifs.map((gif) => (
                <button
                  key={gif.id}
                  type="button"
                  className="w-1/2"
                  onClick={() => {
                    sendMessage(gif.media[0].gif.url, gif.media[0].gif.dims);
                    clearGifSearchBarInput();
                  }}
                >
                  <img className="w-48 h-48" alt={gif.id} src={gif.media[0].gif.url} />
                </button>
              ))}
            </div>
          )
      }
      <div className="flex items-center">
        <Search className="h-6 w-6" />
        <input value={gifFilter} className="input h-10 w-full m-2 ml-4" placeholder={t('home.searchBar')} onChange={(e) => setGifFilter(e.target.value)} />
      </div>
    </div>
  );
};

GifSearch.propTypes = {
  sendMessage: propTypes.func.isRequired,
};

export default GifSearch;
