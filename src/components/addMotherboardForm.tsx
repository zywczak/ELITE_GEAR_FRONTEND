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

const MotherboardForm = () => {
    const classes = useStyles();
    const [formData, setFormData] = useState({
        manufacturer: '',
        model: '',
        price: 0,
        rating: 0,
        photos: [] as File[],
        chipset: '',
        formFactor: '',
        supportedMemory: '',
        socket: '',
        cpuArchitecture: '',
        internalConnectors: '',
        externalConnectors: '',
        memorySlots: 0,
        audioSystem: '',
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
        if (formData.rating < 0 || formData.rating > 5) formErrors.rating = 'Rating must be between 0 and 5';
        if (!formData.chipset) formErrors.chipset = 'Chipset is required';
        if (!formData.formFactor) formErrors.formFactor = 'Form Factor is required';
        if (!formData.supportedMemory) formErrors.supportedMemory = 'Supported Memory is required';
        if (!formData.socket) formErrors.socket = 'Socket is required';
        if (!formData.cpuArchitecture) formErrors.cpuArchitecture = 'CPU Architecture is required';
        if (formData.memorySlots <= 0) formErrors.memorySlots = 'Memory Slots must be a positive integer';
        if (!formData.audioSystem) formErrors.audioSystem = 'Audio System is required';
        setErrors(formErrors);
        return Object.keys(formErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) {
            return;
        }

        const submitData = new FormData();
        submitData.append('manufacturer', formData.manufacturer);
        submitData.append('model', formData.model);
        submitData.append('price', formData.price.toString());
        submitData.append('rating', formData.rating.toString());
        submitData.append('chipset', formData.chipset);
        submitData.append('formFactor', formData.formFactor);
        submitData.append('supportedMemory', formData.supportedMemory);
        submitData.append('socket', formData.socket);
        submitData.append('cpuArchitecture', formData.cpuArchitecture);
        submitData.append('internalConnectors', formData.internalConnectors);
        submitData.append('externalConnectors', formData.externalConnectors);
        submitData.append('memorySlots', formData.memorySlots.toString());
        submitData.append('audioSystem', formData.audioSystem);

        formData.photos.forEach((photo) => {
            submitData.append('photos', photo);
        });

        try {
            const response = await axios.post('http://localhost:8080/motherboards', submitData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Motherboard added successfully:', response.data);
        } catch (error) {
            console.error('Error adding motherboard:', error);
        }
    };

    return (
        <div className={classes.container}>
            <div className={classes.formContainer}>
                <h2 className={classes.formTitle}>Add Motherboard</h2>
                <form onSubmit={handleSubmit}>
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
                                <th className={classes.th}>Rating</th>
                                <td className={classes.td}>
                                    <input
                                        type="number"
                                        name="rating"
                                        value={formData.rating}
                                        onChange={handleChange}
                                        className={classes.input}
                                    />
                                    {errors.rating && <div className={classes.errorMessage}>{errors.rating}</div>}
                                </td>
                            </tr>
                            <tr>
                                <th className={classes.th}>Chipset</th>
                                <td className={classes.td}>
                                    <input
                                        type="text"
                                        name="chipset"
                                        value={formData.chipset}
                                        onChange={handleChange}
                                        className={classes.input}
                                    />
                                    {errors.chipset && <div className={classes.errorMessage}>{errors.chipset}</div>}
                                </td>
                            </tr>
                            <tr>
                                <th className={classes.th}>Form Factor</th>
                                <td className={classes.td}>
                                    <input
                                        type="text"
                                        name="formFactor"
                                        value={formData.formFactor}
                                        onChange={handleChange}
                                        className={classes.input}
                                    />
                                    {errors.formFactor && <div className={classes.errorMessage}>{errors.formFactor}</div>}
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
                                <th className={classes.th}>Socket</th>
                                <td className={classes.td}>
                                    <input
                                        type="text"
                                        name="socket"
                                        value={formData.socket}
                                        onChange={handleChange}
                                        className={classes.input}
                                    />
                                    {errors.socket && <div className={classes.errorMessage}>{errors.socket}</div>}
                                </td>
                            </tr>
                            <tr>
                                <th className={classes.th}>CPU Architecture</th>
                                <td className={classes.td}>
                                    <input
                                        type="text"
                                        name="cpuArchitecture"
                                        value={formData.cpuArchitecture}
                                        onChange={handleChange}
                                        className={classes.input}
                                    />
                                    {errors.cpuArchitecture && <div className={classes.errorMessage}>{errors.cpuArchitecture}</div>}
                                </td>
                            </tr>
                            <tr>
                                <th className={classes.th}>Internal Connectors</th>
                                <td className={classes.td}>
                                    <input
                                        type="text"
                                        name="internalConnectors"
                                        value={formData.internalConnectors}
                                        onChange={handleChange}
                                        className={classes.input}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <th className={classes.th}>External Connectors</th>
                                <td className={classes.td}>
                                    <input
                                        type="text"
                                        name="externalConnectors"
                                        value={formData.externalConnectors}
                                        onChange={handleChange}
                                        className={classes.input}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <th className={classes.th}>Memory Slots</th>
                                <td className={classes.td}>
                                    <input
                                        type="number"
                                        name="memorySlots"
                                        value={formData.memorySlots}
                                        onChange={handleChange}
                                        className={classes.input}
                                    />
                                    {errors.memorySlots && <div className={classes.errorMessage}>{errors.memorySlots}</div>}
                                </td>
                            </tr>
                            <tr>
                                <th className={classes.th}>Audio System</th>
                                <td className={classes.td}>
                                    <input
                                        type="text"
                                        name="audioSystem"
                                        value={formData.audioSystem}
                                        onChange={handleChange}
                                        className={classes.input}
                                    />
                                    {errors.audioSystem && <div className={classes.errorMessage}>{errors.audioSystem}</div>}
                                </td>
                            </tr>
                            <tr>
                                <th className={classes.th}>Photos</th>
                                <td className={classes.td}>
                                    <input
                                        type="file"
                                        name="photos"
                                        accept="image/*"
                                        multiple
                                        onChange={handleFileChange}
                                        className={classes.input}
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    {/* Image Previews */}
                    {previewImages.length > 0 && (
                        <div className={classes.previewContainer}>
                            {previewImages.map((image, index) => (
                                <img
                                    key={index}
                                    src={image}
                                    alt={`Preview ${index + 1}`}
                                    className={classes.previewImage}
                                />
                            ))}
                        </div>
                    )}

                    <button type="submit" className={classes.submitButton}>Submit</button>
                </form>
            </div>
        </div>
    );
};

export default MotherboardForm;
