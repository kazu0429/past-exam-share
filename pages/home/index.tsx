import SideBer from "@/components/sideBer";

export const Home = () => {
    return (
        <>
            <div className="flex">
                <SideBer/>
            <article className="h-screen flex-1 bg-indigo-50">
                <h1 className="text-borld text-xl p-5">Home</h1>
                <div>
                    <form>
                        <div className="relative m-5">
                        <input className="text-center block p-3 w-full z-20 rounded-2xl" placeholder="Search subjectname..." required/>
                        <button className="absolute top-0 right-0 p-3 pl-4 text-white bg-indigo-500 border border-indigo-500 hover:bg-indigo-800 rounded-r-2xl ">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 26 26" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                                </svg>
                            </button>
                        </div>
                    </form>
                </div>
                <div>
                    <main className="mt-10">
                        <div className="flex">
                            <p className="ml-5">過去問一覧</p>
                            <p className="ml-auto mr-4">Sort</p>
                                <select className="mr-5 px-5 rounded-xl border border-gray-500">
                                    <option>降順</option>
                                    <option>昇順</option>
                                </select>
                        </div>
                        <div className="m-5 p-2 bg-white border border-gray-300 rounded-xl hover:border-indigo-500">
                            <div className="flex">
                                <div className="group relative">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 22" fill="currentColor" className="w-16 hover:scale-110">
                                        <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div className="mr-auto mx-4">
                                    <h3 className="text-xl font-bold text-gray-800">タイトル</h3>
                                    <p>科目名</p>
                                    <p>2023/4/12</p>
                                </div>
                                <div className="ml-auto mx-4">
                                    <button>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 hover:stroke-2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
                                    </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </article>
            </div>
        </>
    )
}

export default Home;