import PropTypes from 'prop-types';
import { useState } from 'react';
import readExcelFile from '../../utils/readExcelFile';
import { useAuthHeaders } from '../../context/useAuthHeaders';

export default function ManageWorkItemsBox({ title, description, sendDataApi, disabled = false }) {
    // export default function ManageWorkItemsBox({ title, description }) {

    const headers = useAuthHeaders()
    const [file, setFile] = useState(null);
    const [info, setInfo] = useState(undefined)
    const [loading, setLoading] = useState(false);

    const verifyForbiddenData = (headers) => {
        const forbiddenHeaders = ["id", "team_id", "created_by", ""].map(item => item.toLocaleLowerCase());

        const hasForbiddenHeaders = forbiddenHeaders.some(item => headers.includes(item));
        const includesSpaces = headers.some(item => item.includes(" "));

        console.log("hasForbiddenHeaders", hasForbiddenHeaders)
        console.log("includesSpaces", includesSpaces)

        return hasForbiddenHeaders || includesSpaces
    }

    const downloadTemplate = () => {
        console.log("Downloading template...");
    }

    const handleFileChange = (e) => {
        const newFile = e.target.files[0];
        setFile(newFile)
        setInfo(undefined)
    }

    const handleFileUpload = async () => {
        try {
            setLoading(true);
            if (!file) {
                alert("Please choose a file!");
                return;
            }

            console.log("Uploading file...");
            const { headers: dataHeaders, data } = await readExcelFile(file);

            const forbiddenHeaders = verifyForbiddenData(dataHeaders);

            if (forbiddenHeaders) {
                alert("Your data isn't compliant! Please Check your data and submit it again");
                return;
            }

            sendDataApi(headers, data)
                .then(res => {
                    console.log(res)
                })
                .catch(err => {
                    console.error(err)
                })
                .finally(() => {
                    setLoading(false)
                })

        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='action-box'>
            <h3>{title}</h3>
            <p>
                {description}
            </p>

            {info && <p>{info}</p>}
            {loading && <p>Loading...</p>}

            <input
                type='file'
                id='file-input'
                onChange={handleFileChange}
                disabled={disabled}
                className={disabled ? "disabled" : ""}
            />

            <div className='flex-row-gap'>
                <button disabled={disabled} className={disabled ? "disabled" : ""} onClick={handleFileUpload}>Upload Data</button>
                <button disabled={disabled} className={disabled ? "disabled" : ""} onClick={downloadTemplate}>Download Template</button>
            </div>
        </div>
    )
}

ManageWorkItemsBox.propTypes = {
    // handleFileChange: PropTypes.func.isRequired,
    // handleFileUpload: PropTypes.func.isRequired,
    sendDataApi: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    disabled: PropTypes.bool
};