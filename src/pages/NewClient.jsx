import { useNavigate, Form as ReactRouterForm, useActionData, redirect} from "react-router-dom"
import Form from "../components/Form"
import Error from "../components/Error"
import { addClient } from "../data/clients"

export async function action ({request}) {

    const formData = await request.formData()

    const data = Object.fromEntries(formData)

    const email = formData.get("email")

    // Validation
    const errors = []

    if(Object.values(data).includes("")) {
        errors.push("All the fields are mandatory")
    }

    let regex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])");
    
    if(!regex.test(email)){
        errors.push("Email is not valid")
    }

    // Return data with errors
    if(Object.keys(errors).length){
       return errors
    }

    await addClient(data)

    return redirect("/");
}

function NewClient() {

    const errors = useActionData()

    const navigate = useNavigate()

    return(
        <>
            <h1 className="text-4xl font-black text-blue-900">New Client</h1>
            <p className="mt-3">Fill out all the fields to add a new client</p>
            <div className="flex justify-start">
                <button 
                className="bg-blue-800 text-white px-3 py-1 m-10 uppercase font-bold"
                onClick={() => navigate(-1)}
                >
                    Back
                </button>
            </div>
            <div className="bg-white shadow rounded-md md:w-3/4 mx-auto px-5 py-10">

                {errors?.length && errors.map((error, i ) => 
                    <Error key={i}>
                        {error}
                    </Error>
                )}

                <ReactRouterForm
                    method="post"
                    noValidate
                >
                    <Form/>

                    <input 
                    type="submit"
                    className="mt-5 w-full bg-blue-800 p-3 uppercase font-bold text-white text-lg cursor-pointer"
                    value="Add client"
                    />
                </ReactRouterForm>
            </div>
        </>
    )
}

export default NewClient