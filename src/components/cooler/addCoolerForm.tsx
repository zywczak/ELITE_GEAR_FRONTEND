import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../../api/axiosApi';
import useStyles from '../../styles/addFormStyles';

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
            const response = await api.post('/coolers', submitData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            toast.success('Cooler added successfully!');
            window.location.reload();
        } catch (error) {
            toast.error('Error adding cooler. Please try again.');
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
