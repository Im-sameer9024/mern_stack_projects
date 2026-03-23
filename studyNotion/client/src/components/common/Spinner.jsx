import { Circles } from 'react-loader-spinner';

const Spinner = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <Circles
        height="80"
        width="80"
        color="#424854"
        ariaLabel="circles-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
};

export default Spinner;
