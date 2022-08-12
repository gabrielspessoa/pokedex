import './Alert.scss';

export const Alert = (props: { active?: boolean }) => {
  return (
    <div className={`alert-container ${props.active ? 'active' : ''}`}>
      <div className='alert-box'>Pokémon não encontrado</div>
    </div>
  );
};
