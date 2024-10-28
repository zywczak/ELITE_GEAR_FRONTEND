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

const CoolerForm = () => {
    const classes = useStyles();
    const [formData, setFormData] = useState({
        manufacturer: '',
        model: '',
        price: 0,
        photos: [] as File[],
        type: '',
        fanCount: 0,
        fanSize: 0,
        backlight: false,
        material: '',
        radiatorSize: '',
        compatibility: '',
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
        if (!formData.type) formErrors.type = 'Type is required';
        if (formData.fanCount <= 0) formErrors.fanCount = 'Fan count must be greater than zero';
        if (formData.fanSize <= 0) formErrors.fanSize = 'Fan size must be greater than zero';
        if (!formData.material) formErrors.material = 'Material is required';
        if (!formData.radiatorSize) formErrors.radiatorSize = 'Radiator size is required';
        if (!formData.compatibility) formErrors.compatibility = 'Compatibility is required';

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
        submitData.append('type', formData.type);
        submitData.append('fanCount', formData.fanCount.toString());
        submitData.append('fanSize', formData.fanSize.toString());
        submitData.append('backlight', formData.backlight ? 'true' : 'false');
        submitData.append('material', formData.material);
        submitData.append('radiatorSize', formData.radiatorSize);
        submitData.append('compatibility', formData.compatibility);

        formData.photos.forEach((photo) => {
            submitData.append('photos', photo);
        });

        try {
            const response = await axios.post('http://localhost:8080/coolers', submitData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Cooler added successfully:', response.data);
            window.location.reload();
        } catch (error) {
            console.error('Error adding cooler:', error);
        }
    };

    return (
        <div className={classes.container}>
            <div className={classes.formContainer}>
                <h2 className={classes.formTitle}>Add Cooler</h2>
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
                                <th className={classes.th}>Type</th>
                                <td className={classes.td}>
                                    <input
                                        type="text"
                                        name="type"
                                        value={formData.type}
                                        onChange={handleChange}
                                        className={classes.input}
                                    />
                                    {errors.type && <div className={classes.errorMessage}>{errors.type}</div>}
                                </td>
                            </tr>
                            <tr>
                                <th className={classes.th}>Fan Count</th>
                                <td className={classes.td}>
                                    <input
                                        type="number"
                                        name="fanCount"
                                        value={formData.fanCount}
                                        onChange={handleChange}
                                        className={classes.input}
                                    />
                                    {errors.fanCount && <div className={classes.errorMessage}>{errors.fanCount}</div>}
                                </td>
                            </tr>
                            <tr>
                                <th className={classes.th}>Fan Size (mm)</th>
                                <td className={classes.td}>
                                    <input
                                        type="number"
                                        name="fanSize"
                                        value={formData.fanSize}
                                        onChange={handleChange}
                                        className={classes.input}
                                    />
                                    {errors.fanSize && <div className={classes.errorMessage}>{errors.fanSize}</div>}
                                </td>
                            </tr>
                            <tr>
                                <th className={classes.th}>Backlight</th>
                                <td className={classes.td}>
                                    <input
                                        type="checkbox"
                                        name="backlight"
                                        checked={formData.backlight}
                                        onChange={handleChange}
                                        className={classes.checkbox}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <th className={classes.th}>Material</th>
                                <td className={classes.td}>
                                    <input
                                        type="text"
                                        name="material"
                                        value={formData.material}
                                        onChange={handleChange}
                                        className={classes.input}
                                    />
                                    {errors.material && <div className={classes.errorMessage}>{errors.material}</div>}
                                </td>
                            </tr>
                            <tr>
                                <th className={classes.th}>Radiator Size</th>
                                <td className={classes.td}>
                                    <input
                                        type="text"
                                        name="radiatorSize"
                                        value={formData.radiatorSize}
                                        onChange={handleChange}
                                        className={classes.input}
                                    />
                                    {errors.radiatorSize && <div className={classes.errorMessage}>{errors.radiatorSize}</div>}
                                </td>
                            </tr>
                            <tr>
                                <th className={classes.th}>Compatibility</th>
                                <td className={classes.td}>
                                    <input
                                        type="text"
                                        name="compatibility"
                                        value={formData.compatibility}
                                        onChange={handleChange}
                                        className={classes.input}
                                    />
                                    {errors.compatibility && <div className={classes.errorMessage}>{errors.compatibility}</div>}
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

export default CoolerForm;
