import PropTypes from 'prop-types';
import { useDropdown } from './Context';

const Option = ({ children, onClick }) => {
  const { setShow } = useDropdown();
  const handleClick = () => {
    onClick && onClick();
    setShow(false);
  };
  return (
    <div
      className='px-5 py-4 cursor-pointer flex items-center justify-between hover:bg-gray-100'
      onClick={handleClick}
    >
      {children}
    </div>
  );
};

Option.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
};
export default Option;
