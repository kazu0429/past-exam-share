export const SearchField = () => {
    return (
        <form>
            <div className="relative mx-5 my-10">
                <input className="text-center block p-3 w-full z-20 rounded-2xl" placeholder="Search subjectname..." required />
                <button className="absolute top-0 right-0 p-3 pl-4 text-white bg-indigo-500 border border-indigo-500 hover:bg-indigo-800 rounded-r-2xl ">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 26 26" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg>
                </button>
            </div>
        </form>
    )
}

export default SearchField;