import { useRouteError } from "react-router-dom";
import errorImg from "../img/error.png"



export default function ErrorPage () {

    const error = useRouteError()
    return(
        <>
            <h1 className="text-center text-4xl font-bold mt-10 text-blue-900">
             Uuups... Let's try again!
            </h1>
            <div className="flex items-center">
                <img src={errorImg} alt="error"/>
                <h2 className="text-center text-xl font-bold text-blue-900">
                    {error.statusText || error.message}
                </h2>
            </div>
            
        </>
    )
}