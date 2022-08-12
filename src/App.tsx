import axios from 'axios';
import 'normalize.css';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Alert } from './components/Alert';
import './style.scss';
import { PokemonDataType } from './Types/PokemonDataType';

function App() {
  const [currentPkmn, setCurrentPkmn] = useState('1');
  const [currentPkmnId, setCurrentPkmnId] = useState(1);
  const [pkmnData, setPkmnData] = useState<PokemonDataType | null>(null);
  const [activeAlert, setActiveAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [image, setImage] = useState('/assets/images/spinner.svg');
  const inputRef = useRef<HTMLInputElement>(null);
  let inputText: string;

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${currentPkmn}/`)
      .then((res) => {
        setPkmnData({
          id: res.data.id,
          name: res.data.name,
          order: res.data.order,
          types: res.data.types,
          weight: res.data.weight,
        });
        setIsLoading(false);

        setImage(
          `https://projectpokemon.org/images/normal-sprite/${res.data.name}.gif`
        );
      });
  }, []);

  useEffect(() => {
    setIsLoading(true);
    setActiveAlert(false);
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${currentPkmn}/`)
      .then((res) => {
        setCurrentPkmnId(res.data.id);
      })
      .catch(() => {
        setActiveAlert(true);
        setImage(
          'https://pixelartmaker-data-78746291193.nyc3.digitaloceanspaces.com/image/ef680c30a573972.png'
        );

        setPkmnData({
          id: '?',
          name: '?',
          types: [{ type: { name: '?' } }, { type: { name: '?' } }],
        });
      });
  }, [currentPkmn]);

  useEffect(() => {
    setActiveAlert(false);
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${currentPkmnId}/`)
      .then((res) => {
        setIsLoading(true);
        setPkmnData(res.data);
        const img = new Image();
        img.src = `https://projectpokemon.org/images/normal-sprite/${res.data.name}.gif`;
        img.onload = () => {
          setImage(img.src);
          setIsLoading(false);
        };
      })
      .catch(() => {
        setActiveAlert(true);
        setImage(
          'https://pixelartmaker-data-78746291193.nyc3.digitaloceanspaces.com/image/ef680c30a573972.png'
        );
        setIsLoading(false);
      });
  }, [currentPkmnId]);

  useEffect(() => {
    if (isLoading) {
      setImage('/assets/images/spinner.svg');
    }
  }, [isLoading]);

  return (
    <>
      <Alert active={activeAlert}></Alert>
      <main>
        <div className='pokedex-container'>
          <div className='pokedex-form'>
            <div className='input-container'>
              <input
                type='text'
                onChange={(e) => {
                  // setInputText(e.currentTarget.value);
                  inputText = e.currentTarget.value;
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    setCurrentPkmn(inputText);
                    inputRef.current ? (inputRef.current.value = '') : null;
                  }
                }}
                ref={inputRef}
              />
              <button
                aria-label='Search Pokemon Button'
                onClick={() => {
                  setCurrentPkmn(inputText);
                  inputRef.current ? (inputRef.current.value = '') : null;
                }}
              >
                <img alt='' src='/assets/icons/search.svg'></img>
              </button>
            </div>
            <div className='control-container'>
              <button
                aria-label='Previous Pokemon Button'
                className='btn-left'
                onClick={() => {
                  currentPkmnId > 1
                    ? setCurrentPkmnId(currentPkmnId - 1)
                    : null;
                }}
              >
                <img alt='' src='/assets/icons/carret-l.svg'></img>
              </button>
              <button
                aria-label='Next Pokemon Button'
                className='btn-right'
                onClick={() => {
                  setCurrentPkmnId(currentPkmnId + 1);
                }}
              >
                <img alt='' src='/assets/icons/carret-r.svg'></img>
              </button>
            </div>
          </div>
          <img
            alt='Pokedex Image'
            src='/assets/images/pokedex.svg'
            className='pokedex-image'
          ></img>
          <img alt='Pokemon Image' src={image} className='pokemon-image'></img>
          <div className='pokemon-info'>
            <div className='pokemon-type-list'>
              {pkmnData?.types
                ? pkmnData.types?.map((value) => {
                    return (
                      <span
                        key={value.slot}
                        className={`pokemon-type-item ${value.type!.name}`}
                      >
                        {value.type!.name!.charAt(0).toUpperCase() +
                          value.type!.name!.slice(1)}
                      </span>
                    );
                  })
                : null}
            </div>
            <span className='pokemon-name'>
              {pkmnData ? (
                <>
                  <span>{pkmnData.id} </span>
                  <span>
                    {pkmnData.name!.charAt(0).toUpperCase() +
                      pkmnData.name!.slice(1)}
                  </span>
                </>
              ) : null}
            </span>
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
