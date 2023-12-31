import PropTypes from 'prop-types';

const Remover = ({ onClick, disabled, id, content }) => {
  return (
    <button
      data-tooltip-id={id}
      data-tooltip-content={content}
      className={`flex items-center text-black justify-center w-10 h-10 border border-gray-200 rounded cursor-pointer ${
        disabled &&
        'disabled:bg-red-300 disabled:text-white disabled:cursor-not-allowed'
      }`}
      onClick={onClick}
      disabled={disabled}
    >
      <svg
        xmlns='http://www.w3.org/2000/svg'
        className='w-5 h-5'
        fill='none'
        viewBox='0 0 24 24'
        stroke='currentColor'
        strokeWidth='2'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
        />
      </svg>
    </button>
  );
};

Remover.propTypes = {
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  id: PropTypes.string,
  content: PropTypes.string,
};

export default Remover;
