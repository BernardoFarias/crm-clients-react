function Error({children}) {
    return(
        <div className="text-center bg-red-600 text-white uppercase font-bold p-3 mb-6">
            {children}
        </div>
    )
}

export default Error