import axios from 'axios';
import 'normalize.css';
import { useEffect, useState } from 'react';
import './style.scss';
import { PokemonDataType } from './Types/PokemonDataType';

function App() {
  const [currentPkmn, setCurrentPkmn] = useState('1');
  const [currentPkmnId, setCurrentPkmnId] = useState(1);
  const [pkmnData, setPkmnData] = useState<PokemonDataType | null>(null);
  const [inputText, setInputText] = useState('');

  useEffect(() => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${currentPkmn}/`).then((res) =>
      setPkmnData({
        id: res.data.id,
        name: res.data.name,
        order: res.data.order,
        types: res.data.types,
        weight: res.data.weight,
      })
    );
  }, []);

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${currentPkmn}/`)
      .then((res) => {
        setPkmnData(res.data);
        setCurrentPkmnId(res.data.id);
      });
  }, [currentPkmn]);

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${currentPkmnId}/`)
      .then((res) => {
        setPkmnData(res.data);
      });
  }, [currentPkmnId]);

  return (
    <main>
      <div className='pokedex-container'>
        <div className='pokedex-form'>
          <div className='input-container'>
            <input
              type='text'
              onChange={(e) => {
                setInputText(e.currentTarget.value);
              }}
              onKeyDown={(e) => {
                e.key == 'Enter' ? setCurrentPkmn(inputText) : null;
              }}
            />
            <button
              onClick={() => {
                setCurrentPkmn(inputText);
              }}
            >
              <img src='/assets/icons/search.svg'></img>
            </button>
          </div>
          <div className='control-container'>
            <button
              className='btn-left'
              onClick={() => {
                currentPkmnId > 1 ? setCurrentPkmnId(currentPkmnId - 1) : null;
              }}
            >
              <img src='/assets/icons/carret-l.svg'></img>
            </button>
            <button
              className='btn-right'
              onClick={() => {
                setCurrentPkmnId(currentPkmnId + 1);
              }}
            >
              <img src='/assets/icons/carret-r.svg'></img>
            </button>
          </div>
        </div>
        <img src='/assets/images/pokedex.svg' className='pokedex-image'></img>
        {pkmnData && (
          <img
            src={`https://projectpokemon.org/images/normal-sprite/${pkmnData.name}.gif`}
            className='pokemon-image'
          ></img>
        )}
        <div className='pokemon-info'>
          <div className='pokemon-type-list'>
            {pkmnData
              ? pkmnData.types.map((value) => {
                  return (
                    <span
                      key={value.slot}
                      className={`pokemon-type-item ${value.type.name}`}
                    >
                      {value.type.name.charAt(0).toUpperCase() +
                        value.type.name.slice(1)}
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
                  {pkmnData.name.charAt(0).toUpperCase() +
                    pkmnData?.name.slice(1)}
                </span>
              </>
            ) : null}
          </span>
        </div>
      </div>
    </main>
  );
}

export default App;
