import React, { useState, useEffect } from 'react';
import Header from "../home/components/Header";
import Footer from "../home/components/Footer";
import api from '../../api'; // Assuming your api file is located here
import { ACCESS_TOKEN } from '../../constants';

function Profile() {
    const [profile, setProfile] = useState({
        first_name: '',
        last_name: '',
        image: null
    });
    const [previewImage, setPreviewImage] = useState("/api/placeholder/150/150");
    const [statusMessage, setStatusMessage] = useState(''); // New state for status messages

    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem(ACCESS_TOKEN);

            if (token) {
                try {
                    const response = await api.get(`/api/profile/`);
                    const data = response.data;
                    setProfile(data);
                    if (data.image) {
                        setPreviewImage(data.image);
                    }
                } catch (error) {
                    console.error('Error fetching profile:', error);
                }
            }
        };
        fetchProfile();
    }, []);

    const handleInputChange = (e) => {
        setProfile({ ...profile, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfile({ ...profile, image: file });
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (token) {
            try {
                const formData = new FormData();
                formData.append('user[first_name]', profile.first_name);
                formData.append('user[last_name]', profile.last_name);
                if (profile.image instanceof File) {
                    formData.append('image', profile.image);
                }

                const response = await api.patch(`/api/profile/`, formData);
                if (response.status !== 200) throw new Error('Failed to update profile');
                setStatusMessage('Profile updated successfully!'); // Set success message
            } catch (error) {
                console.error('Error updating profile:', error);
                setStatusMessage('Failed to update profile. Please try again.'); // Set error message
            }
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow bg-gray-100 py-6">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl mx-auto">
                        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                            <div className="px-4 py-5 sm:p-6">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">Profile Details</h2>
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="flex flex-col items-center">
                                        <img src={previewImage} alt="Profile Preview" className="w-32 h-32 rounded-full object-cover mb-4" />
                                        <label htmlFor="image" className="cursor-pointer bg-brown-500 text-white py-2 px-4 rounded hover:bg-brown-600 transition duration-300">
                                            Change Profile Picture
                                            <input
                                                id="image"
                                                name="image"
                                                type="file"
                                                accept="image/*"
                                                onChange={handleImageChange}
                                                className="hidden"
                                            />
                                        </label>
                                    </div>
                                    <div>
                                        <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">First Name</label>
                                        <input
                                            id="first_name"
                                            name="first_name"
                                            type="text"
                                            value={profile.first_name}
                                            onChange={handleInputChange}
                                            className="mt-1 block w-1/2 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">Last Name</label>
                                        <input
                                            id="last_name"
                                            name="last_name"
                                            type="text"
                                            value={profile.last_name}
                                            onChange={handleInputChange}
                                            className="mt-1 block w-1/2 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-brown-500 focus:border-brown-500 sm:text-sm"
                                        />
                                    </div>
                                    <div>
                                        <button type="submit" className="w-1/3 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brown-600 hover:bg-brown-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brown-500">
                                            Update Profile
                                        </button>
                                    </div>
                                    {/* Status message displayed here */}
                                    {statusMessage && (
                                        <p className={`mt-4 text-sm ${statusMessage.includes('successfully') ? 'text-green-600' : 'text-red-600'}`}>
                                            {statusMessage}
                                        </p>
                                    )}
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default Profile;
