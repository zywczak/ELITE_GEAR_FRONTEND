import React, { useState } from 'react';
import axios from 'axios';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
    container: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        padding: '20px',
    },
    formContainer: {
        maxWidth: '600px',
        margin: 'auto',
        padding: '1px 20px 20px 20px',
        backgroundColor: '#f7f7f7',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    },
    formTitle: {
        textAlign: 'center',
        marginBottom: '20px',
        color: '#333',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        marginBottom: '20px',
    },
    th: {
        textAlign: 'left',
        padding: '10px',
        borderBottom: '1px solid #ccc',
        backgroundColor: '#f0f0f0',
    },
    td: {
        borderBottom: '1px solid #ccc',
    },
    input: {
        width: '100%',
        padding: '12px',
        fontSize: '12px',
        border: '0px solid #ccc',
        boxSizing: 'border-box',
    },
    checkbox: {
        marginRight: '10px',
    },
    errorMessage: {
        color: 'red',
        fontSize: '12px',
        marginTop: '5px',
    },
    submitButton: {
        display: 'block',
        width: '100%',
        padding: '10px',
        fontSize: '16px',
        backgroundColor: '#AA7A00',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: 'rgba(94, 52, 1, 0.849)',
        },
    },
    previewContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        marginTop: '10px',
    },
    previewImage: {
        width: '100px',
        height: '100px',
        objectFit: 'cover',
        marginRight: '10px',
        marginBottom: '10px',
        borderRadius: '4px',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    },
});

const CPUForm = () => {
    const classes = useStyles();
    const [formData, setFormData] = useState({
        manufacturer: '',
        model: '',
        price: 0,
        photos: [] as File[],
        speed: 0,
        architecture: '',
        supportedMemory: '',
        cooling: false,
        threads: 0,
        technologicalProcess: 0,
        powerConsumption: 0,
    });
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [previewImages, setPreviewImages] = useState<string[]>([]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        if (type === 'checkbox') {
            setFormData({
                ...formData,
                [name]: (e.target as HTMLInputElement).checked,
            });
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const filesArray = Array.from(e.target.files);
            setFormData({ ...formData, photos: filesArray });

            // Generate previews
            const previewUrls = filesArray.map((file) => URL.createObjectURL(file));
            setPreviewImages(previewUrls);
        }
    };

    const validateForm = () => {
        let formErrors: { [key: string]: string } = {};
        if (!formData.manufacturer) formErrors.manufacturer = 'Manufacturer is required';
        if (!formData.model) formErrors.model = 'Model is required';
        if (formData.price <= 0) formErrors.price = 'Price must be greater than zero';
        if (formData.speed <= 0) formErrors.speed = 'Speed must be greater than zero';
        if (!formData.architecture) formErrors.architecture = 'Architecture is required';
        if (!formData.supportedMemory) formErrors.supportedMemory = 'Supported Memory is required';
        if (formData.threads <= 0) formErrors.threads = 'Threads must be a positive integer';
        if (formData.technologicalProcess <= 0) formErrors.technologicalProcess = 'Technological Process must be positive';
        if (formData.powerConsumption <= 0) formErrors.powerConsumption = 'Power consumption must be positive';
        setErrors(formErrors);
        return Object.keys(formErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
        return;
    }

    const submitData = new FormData();
    
    // Append CPU fields as form data
    submitData.append('manufacturer', formData.manufacturer);
    submitData.append('model', formData.model);
    submitData.append('price', formData.price.toString());
    submitData.append('speed', formData.speed.toString());
    submitData.append('architecture', formData.architecture);
    submitData.append('supportedMemory', formData.supportedMemory);
    submitData.append('cooling', formData.cooling.toString());
    submitData.append('threads', formData.threads.toString());
    submitData.append('technologicalProcess', formData.technologicalProcess.toString());
    submitData.append('powerConsumption', formData.powerConsumption.toString());

    // Append the photos
    formData.photos.forEach((photo) => {
        submitData.append('photos', photo);
    });

    try {
        const response = await axios.post('http://localhost:8080/cpu', submitData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        console.log('CPU added successfully:', response.data);
        window.location.reload();
    } catch (error) {
        console.error('Error adding CPU:', error);
    }
};

    return (
        <div className={classes.container}>
            <div className={classes.formContainer}>
                <h2 className={classes.formTitle}>Dodaj CPU</h2>
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <table className={classes.table}>
                        <tbody>
                            <tr>
                                <th className={classes.th}>Manufacturer</th>
                                <td className={classes.td}>
                                    <input
                                        type="text"
                                        name="manufacturer"
                                        value={formData.manufacturer}
                                        onChange={handleChange}
                                        className={classes.input}
                                    />
                                    {errors.manufacturer && <div className={classes.errorMessage}>{errors.manufacturer}</div>}
                                </td>
                            </tr>
                            <tr>
                                <th className={classes.th}>Model</th>
                                <td className={classes.td}>
                                    <input
                                        type="text"
                                        name="model"
                                        value={formData.model}
                                        onChange={handleChange}
                                        className={classes.input}
                                    />
                                    {errors.model && <div className={classes.errorMessage}>{errors.model}</div>}
                                </td>
                            </tr>
                            <tr>
                                <th className={classes.th}>Price</th>
                                <td className={classes.td}>
                                    <input
                                        type="number"
                                        name="price"
                                        value={formData.price}
                                        onChange={handleChange}
                                        className={classes.input}
                                    />
                                    {errors.price && <div className={classes.errorMessage}>{errors.price}</div>}
                                </td>
                            </tr>
                            <tr>
                                <th className={classes.th}>Speed (GHz)</th>
                                <td className={classes.td}>
                                    <input
                                        type="number"
                                        name="speed"
                                        value={formData.speed}
                                        onChange={handleChange}
                                        className={classes.input}
                                    />
                                    {errors.speed && <div className={classes.errorMessage}>{errors.speed}</div>}
                                </td>
                            </tr>
                            <tr>
                                <th className={classes.th}>Architecture</th>
                                <td className={classes.td}>
                                    <input
                                        type="text"
                                        name="architecture"
                                        value={formData.architecture}
                                        onChange={handleChange}
                                        className={classes.input}
                                    />
                                    {errors.architecture && <div className={classes.errorMessage}>{errors.architecture}</div>}
                                </td>
                            </tr>
                            <tr>
                                <th className={classes.th}>Supported Memory</th>
                                <td className={classes.td}>
                                    <input
                                        type="text"
                                        name="supportedMemory"
                                        value={formData.supportedMemory}
                                        onChange={handleChange}
                                        className={classes.input}
                                    />
                                    {errors.supportedMemory && <div className={classes.errorMessage}>{errors.supportedMemory}</div>}
                                </td>
                            </tr>
                            <tr>
                                <th className={classes.th}>Cooling</th>
                                <td className={classes.td}>
                                    <input
                                        type="checkbox"
                                        name="cooling"
                                        checked={formData.cooling}
                                        onChange={handleChange}
                                        className={classes.checkbox}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <th className={classes.th}>Threads</th>
                                <td className={classes.td}>
                                    <input
                                        type="number"
                                        name="threads"
                                        value={formData.threads}
                                        onChange={handleChange}
                                        className={classes.input}
                                    />
                                    {errors.threads && <div className={classes.errorMessage}>{errors.threads}</div>}
                                </td>
                            </tr>
                            <tr>
                                <th className={classes.th}>Technological Process (nm)</th>
                                <td className={classes.td}>
                                    <input
                                        type="number"
                                        name="technologicalProcess"
                                        value={formData.technologicalProcess}
                                        onChange={handleChange}
                                        className={classes.input}
                                    />
                                    {errors.technologicalProcess && <div className={classes.errorMessage}>{errors.technologicalProcess}</div>}
                                </td>
                            </tr>
                            <tr>
                                <th className={classes.th}>Power Consumption (W)</th>
                                <td className={classes.td}>
                                    <input
                                        type="number"
                                        name="powerConsumption"
                                        value={formData.powerConsumption}
                                        onChange={handleChange}
                                        className={classes.input}
                                    />
                                    {errors.powerConsumption && <div className={classes.errorMessage}>{errors.powerConsumption}</div>}
                                </td>
                            </tr>
                            <tr>
                                <th className={classes.th}>Photos</th>
                                <td className={classes.td}>
                                    <input
                                        type="file"
                                        name="photos"
                                        onChange={handleFileChange}
                                        multiple
                                        accept="image/*"
                                        className={classes.input}
                                    />
                                    <div className={classes.previewContainer}>
                                        {previewImages.map((url, index) => (
                                            <img key={index} src={url} alt={`preview ${index}`} className={classes.previewImage} />
                                        ))}
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <button type="submit" className={classes.submitButton}>Dodaj CPU</button>
                </form>
            </div>
        </div>
    );
};

export default CPUForm;
