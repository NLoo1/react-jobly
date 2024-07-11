import { useState, useEffect } from "react";
import JoblyApi from "./api";
import { Link } from "react-router-dom";

// REFACTOR TO List, Detail, Card   

export function List({ type }) {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([]);

    useEffect(() => {
        async function getItems() {
            let items;
            switch (type) {
                case 'companies':
                    items = await JoblyApi.getCompanies();
                    items = items.sort((a, b) => a.id - b.id);
                    break;
                case 'jobs':
                    items = await JoblyApi.getJobs();
                    items = items.sort((a, b) => a.id - b.id);
                    break;
                case 'users':
                    items = await JoblyApi.getUsers();
                    items = items.sort((a, b) => a.id - b.id);
                    break;
                default:
                    console.log('Invalid type');
                    items = [];
                    break;
            }
            setData(items);
            setIsLoading(false);
        }
        getItems();
    }, [type]);

    // While fetching data from API, show loading icon
    if (isLoading) {
        return <p>Loading &hellip;</p>;
    }

    return (
        <table className='table table-responsive table-striped table-dark'>
            <thead>
                {type === 'companies' && (
                    <tr>
                        <th scope='col'>Company</th>
                        <th scope='col'>Number of employees</th>
                    </tr>
                )}
                {type === 'jobs' && (
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Salary</th>
                    </tr>
                )}
                {type === 'users' && (
                    <tr>
                        <th>ID</th>
                        <th>Username</th>
                        <th>Email</th>
                    </tr>
                )}
            </thead>
            <tbody>
                {type === 'companies' && data.map((d) => (
                    <Item data={d} type={type} />
                ))}
                {type === 'jobs' && data.map((d) => (
                    <Item data={d} type={type} />
                    // <tr key={d.id}>
                    //     <td><Link to={'/jobs/' + d.id} >{d.id}</Link></td>
                    //     <td>{d.title}</td>
                    //     <td>{d.salary}</td>
                    // </tr>
                ))}


                {type === 'users' && data.map((d) => (
                    <tr key={d.id}>
                        <td>{d.id}</td>
                        <td>{d.username}</td>
                        <td>{d.email}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

// An individual company, user, or job
export function Item(data, type) {

    console.log(type)
    switch (type) {
        case 'companies':
            return(
                <tr>
                    <td><Link to={'/companies/' + data.handle} >{data.name}</Link></td>
                    <td>{data.numEmployees}</td> 
                </tr>
            )
        case 'jobs':
            return(
                <tr>
                    <td><Link to={'/jobs/' + data.id} >{data.id}</Link></td>
                    <td>{data.salary}</td> 
                </tr>
            )
            break;
        case 'users':
            break;
        default:
            console.log('Invalid type');
            break;
    }

}

// An individual company/user/job for their own URL
export function Card(data){
    return
}