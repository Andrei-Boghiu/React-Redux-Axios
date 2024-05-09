import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
    return <div>
        <h2>Not Found</h2>
        <p>This is not the page you are looking for...</p>
        <Link className="btn-link" to='/'>Go back home</Link>
    </div>
}

export default NotFound;