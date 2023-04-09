import { useLoaderData } from "react-router-dom";
import Client from "../components/Client";
import { getClients } from "../data/clients"


export function loader() {
    const clients = getClients()

    return clients
}

function Index() {
    
    const clients = useLoaderData()

    return(
        <>
            <h1 className="text-4xl font-black text-blue-900">Clients</h1>
            <p className="mt-3">Manage your clients</p>
            {clients.length ? (
            <table className="w-full bg-withe shadow mt-5 table-auto">
                <thead className="bg-blue-800 text-white">
                    <tr>
                        <th className="p-2">Client</th>
                        <th className="p-2">Contact info</th>
                        <th className="p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                {clients.map(client => (
                    <Client
                    client={client}
                    key={client.id}
                    />               
                    ))}

                </tbody>
              

            </table>) : (
                <p className="text-center mt-10">There are no clients yet</p>
            )}
        </>
    )
}

export default Index