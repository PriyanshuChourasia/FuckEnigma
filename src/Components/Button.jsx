


const Button = ({name}) =>{
    return(
         <button
            type="submit"
            className="w-full bg-blue-600 h-12 text-white text-sm sm:text-base py-2 sm:py-3 rounded-md shadow hover:bg-blue-700 transition-colors duration-200"
        >
            {name}
        </button>
    )
}


export default Button;