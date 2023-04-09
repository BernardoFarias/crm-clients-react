import { getClient, putClient } from "../data/clients"
import {Form as ReactRouterForm, useActionData, useLoaderData, useNavigate, redirect} from "react-router-dom"
import Form from "../components/Form"
import Error from "../components/Error"

export async function loader({params}){
    const client = await getClient(params.clientId)

    if(Object.values(client).length === 0){
        throw new Response("", {
            status: 404,
            statusText: "Looks like we didn't find what we were looking for."
        })
    }

    return client
}

export async function action ({request, params}){
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


    // Update client
    console.log(data)
    await putClient(params.clientId, data)

    return redirect("/");
}

export default function EditClient() {

    const navigate = useNavigate()

    const client = useLoaderData()

    const errors = useActionData()

    return (
        <>
        <h1 className="text-4xl font-black text-blue-900">Edit Client</h1>
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
                <Form client={client}/>

                <input 
                type="submit"
                className="mt-5 w-full bg-blue-800 p-3 uppercase font-bold text-white text-lg cursor-pointer"
                value="Edit client"
                />
            </ReactRouterForm>
        </div>
    </>
    )
}