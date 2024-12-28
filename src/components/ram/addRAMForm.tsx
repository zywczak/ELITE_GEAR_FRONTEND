import React, { useState } from 'react';
import { toast } from 'react-toastify';
import api from '../../api/axiosApi';
import useStyles from '../../styles/addFormStyles';

const RAMForm = () => {
    const classes = useStyles();
    const [formData, setFormData] = useState({
        manufacturer: '',
        model: '',
        price: 0,
        photos: [] as File[],
        speed: 0,
        capacity: '',
        voltage: 0,
        moduleCount: 0,
        backlight: false,
        cooling: false,
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
        if (formData.speed <= 0) formErrors.speed = 'Speed must be greater than zero';
        if (!formData.capacity) formErrors.capacity = 'Capacity is required';
        if (formData.voltage <= 0) formErrors.voltage = 'Voltage must be greater than zero';
        if (formData.moduleCount <= 0) formErrors.moduleCount = 'Module count must be greater than zero';

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
        submitData.append('speed', formData.speed.toString());
        submitData.append('capacity', formData.capacity);
        submitData.append('voltage', formData.voltage.toString());
        submitData.append('moduleCount', formData.moduleCount.toString());
        submitData.append('backlight', formData.backlight ? 'true' : 'false');
        submitData.append('cooling', formData.cooling ? 'true' : 'false');

        formData.photos.forEach((photo) => {
            submitData.append('photos', photo);
        });

        try {
            await api.post('/ram', submitData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            toast.success('RAM added successfully!');
            window.location.reload();
        } catch (error) {
            toast.error('Error adding RAM. Please try again.');
        }
    };

    return (
        <div className={classes.container}>
            <div className={classes.formContainer}>
                <h2 className={classes.formTitle}>Add RAM</h2>
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
                                <th className={classes.th}>Speed (MHz)</th>
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
                                <th className={classes.th}>Capacity</th>
                                <td className={classes.td}>
                                    <input
                                        type="text"
                                        name="capacity"
                                        value={formData.capacity}
                                        onChange={handleChange}
                                        className={classes.input}
                                    />
                                    {errors.capacity && <div className={classes.errorMessage}>{errors.capacity}</div>}
                                </td>
                            </tr>
                            <tr>
                                <th className={classes.th}>Voltage (V)</th>
                                <td className={classes.td}>
                                    <input
                                        type="number"
                                        name="voltage"
                                        value={formData.voltage}
                                        onChange={handleChange}
                                        className={classes.input}
                                    />
                                    {errors.voltage && <div className={classes.errorMessage}>{errors.voltage}</div>}
                                </td>
                            </tr>
                            <tr>
                                <th className={classes.th}>Module Count</th>
                                <td className={classes.td}>
                                    <input
                                        type="number"
                                        name="moduleCount"
                                        value={formData.moduleCount}
                                        onChange={handleChange}
                                        className={classes.input}
                                    />
                                    {errors.moduleCount && <div className={classes.errorMessage}>{errors.moduleCount}</div>}
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

export default RAMForm;
