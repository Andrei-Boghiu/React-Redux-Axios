import PropTypes from 'prop-types';
import { useState } from 'react';
import readExcelFile from '../../utils/readExcelFile';
import readCSVFile from '../../utils/readCSVFile';
import { useAuthHeaders } from '../../context/useAuthHeaders';
import { forbiddenHeaders } from './config';
import { Modal } from '../shared/Modal';
import { downloadCSV, downloadArrOfObjectsCSV } from '../../utils/downloadCSV';
import './styles.css'

export default function ManageWorkItemsBox({ title, description, sendDataApi, disabled = false, requiredHeaders, allHeaders }) {
    const headers = useAuthHeaders();
    const [file, setFile] = useState(null);
    const [info, setInfo] = useState(undefined);
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [errorArr, setErrorArr] = useState(null)

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const verifyForbiddenData = (headers) => {
        const hasForbiddenHeaders = forbiddenHeaders.some(item => headers.includes(item));
        const includesSpaces = headers.some(item => item.includes(" "));
        const missingRequiredHeaders = requiredHeaders.every(header => headers.includes(header));

        console.log("hasForbiddenHeaders", hasForbiddenHeaders)
        console.log("includesSpaces", includesSpaces)
        console.log("missingRequiredHeaders", !missingRequiredHeaders)

        return hasForbiddenHeaders || includesSpaces || !missingRequiredHeaders
    }

    const downloadTemplateAll = () => {
        downloadCSV([allHeaders], `${title.toLowerCase().replaceAll(" ", "_")}-all_headers`)
    }

    const downloadTemplateRequired = () => {
        downloadCSV([requiredHeaders], `${title.toLowerCase().replaceAll(" ", "_")}-required_headers`)
    }
    const handleDownloadError = () => {
        downloadArrOfObjectsCSV(errorArr, `${title.toLowerCase().replaceAll(" ", "_")}-error-details`)
    }

    const handleFileChange = (e) => {
        const newFile = e.target.files[0];
        setFile(newFile)
        setInfo(undefined)
        setErrorArr(null)
    }

    const handleFileUpload = async () => {
        try {
            setLoading(true);
            if (!file) {
                alert("Please choose a file!");
                return;
            }

            const fileName = file.name.split(".");
            const fileType = fileName[fileName.length - 1];

            const fileData = {}

            if (fileType === "csv") {
                const { headers: dataHeaders, data } = await readCSVFile(file);

                fileData["dataHeaders"] = dataHeaders;
                fileData["data"] = data;

            } else if (fileType === "xlsx") {
                const { headers: dataHeaders, data } = await readExcelFile(file);

                fileData["dataHeaders"] = dataHeaders;
                fileData["data"] = data;

            } else {
                alert("File type isn't supported! Please choose an XLSX or CSV file type")
                return
            }

            const forbiddenHeaders = verifyForbiddenData(fileData.dataHeaders);

            if (forbiddenHeaders) {
                alert("Your data isn't compliant! Please Check your data and submit it again");
                return;
            }

            sendDataApi(headers, fileData.data)
                .then(res => {
                    console.log(res)
                    setInfo(res.message)

                    const error = res?.failedItems

                    if (error) {
                        setErrorArr(error)
                    }
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

            {
                info && <div>
                    <hr />
                    <p className={`${errorArr ? "red" : ""}`}>{info}</p>
                    {errorArr && <button onClick={handleDownloadError} className='btn-link-small'>Download Error Details</button>}
                    <hr />
                </div>
            }
            {loading && <p>Loading...</p>}

            <input
                type='file'
                id='file-input'
                onChange={handleFileChange}
                disabled={disabled}
                className={disabled ? "disabled" : ""}
            />

            <Modal isOpen={isModalOpen} onClose={closeModal} title='Choose a template'>
                <div className='flex-row'>
                    <div className='box-button' onClick={downloadTemplateRequired}>
                        <h4>Required Headers</h4>
                        <p>Download a template having only the required headers.</p>
                    </div>
                    <div className='box-button' onClick={downloadTemplateAll} >
                        <h4>All Headers</h4>
                        <p>Download a template with every headers you can include.</p>
                    </div>
                </div>
            </Modal>

            <div className='flex-row-gap'>
                <button disabled={disabled} className={disabled ? "disabled" : ""} onClick={handleFileUpload}>Upload Data</button>
                <button disabled={disabled} className={disabled ? "disabled" : ""} onClick={openModal}>Download Template</button>
            </div>
        </div>
    )
}

ManageWorkItemsBox.propTypes = {
    sendDataApi: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    requiredHeaders: PropTypes.array.isRequired,
    allHeaders: PropTypes.array.isRequired
};