import React from "react"
import { Link } from 'react-router-dom'

export const LinksList = ({ links }) => {
console.log("🚀 ~ file: LinksList.js ~ line 5 ~ LinksList ~ links", links)
    if (!links.length) {
        return <p className="center white-text">No links</p>
    }

    return (
        <table className="centered responsive-table">
            <thead>
                <tr>
                    <th>№</th>
                    <th>Original</th>
                    <th>Opened</th>
                    <th>Open</th>
                </tr>
            </thead>

            <tbody>
                {links.map((link, index) => {
                    return (
                        <tr key={link._id} >
                            <td>{index + 1}</td>
                            <td>{link.from}</td>
                            <td>{link.to}</td>
                            <td>
                                <Link to={`/detail/${link._id}`}>Open</Link>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
      </table>
    )
}