  const Button = ({btntxt, reviewCode}) => {
    return (
      <button onClick={reviewCode} className=" absolute px-0.5 bottom-1 right-1 py-0.5 inline-flex items-center justify-center  mb-2 me-2 overflow-hidden text-xs font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-zinc-600 to-zinc-500 group-hover:from-zinc-600 group-hover:to-zinc-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-zinc-300 dark:focus:ring-zinc-800">
      <span className="relative px-3 py-1.5 transition-all ease-in duration-75 bg-white dark:bg-zinc-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
        {btntxt}
      </span>
    </button>
    )
  }

  export default Button