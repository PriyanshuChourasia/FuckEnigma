const InputBox = ({ inputText, setInpuText, placeHolder, label, name, onClick }) => {
  return (
    <div className="w-full flex flex-col justify-center max-w-md mx-auto p-4 space-y-3">
      <label htmlFor="search" className="text-sm font-medium text-gray-900">
        {label}
      </label>

      <div className="relative">
        <input
          value={inputText}
          onChange={(e) => setInpuText(e.target.value)}
          type="search"
          id="search"
          placeholder={placeHolder}
          required
          className="block w-full p-3 pl-4 text-sm sm:text-base text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <button
        onClick={onClick}
        type="button"
        className="w-full sm:w-auto text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 transition-colors duration-200"
      >
        {name}  
      </button>
    </div>
  );
};

export default InputBox;
