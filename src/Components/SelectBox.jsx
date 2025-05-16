

const SelectBox = ({label,selectedOption,setSelectedOption}) =>{
    const options = [1,2,3,4,5,6,7,8];
    return(
          <div className="w-full  max-w-md sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto">
      <label className="block mb-2 text-sm font-medium text-gray-700">{label}</label>
      <select
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800"
        value={selectedOption}
        onChange={(e) => setSelectedOption(e.target.value)}
      >
        <option value="" disabled>Select an option</option>
        {options.map((opt, index) => (
          <option key={index} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>

    )
}


export default SelectBox;