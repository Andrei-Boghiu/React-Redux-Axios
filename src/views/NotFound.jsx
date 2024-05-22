import { Link } from "react-router-dom";

export default function NotFound() {
    return <div>
        <h2>Not Found</h2>
        <p>This is not the page you are looking for...</p>
        <Link className="btn-link" to='/'>Go back home</Link>
    </div>
}