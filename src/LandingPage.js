// src/LandingPage.js
import React, { useState } from 'react';
import axios from 'axios';

const LandingPage = () => {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    referrerName: '',
    referrerEmail: '',
    refereeName: '',
    refereeEmail: '',
  });
  const [error, setError] = useState('');

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await axios.post('http://localhost:5000/api/referrals', form);
      if (response.status === 201) {
        handleClose();
      } else {
        setError('Error submitting form');
      }
    } catch (error) {
      setError('Error submitting form');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <section className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">Refer & Earn</h1>
        <button
          className="px-6 py-3 bg-blue-600 text-white rounded-md"
          onClick={handleOpen}
        >
          Refer Now
        </button>
      </section>

      {open && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl mb-4">Refer a Course</h2>
            {error && <p className="text-red-600">{error}</p>}
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block mb-2">Your Name</label>
                <input
                  type="text"
                  name="referrerName"
                  value={form.referrerName}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Your Email</label>
                <input
                  type="email"
                  name="referrerEmail"
                  value={form.referrerEmail}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Friend's Name</label>
                <input
                  type="text"
                  name="refereeName"
                  value={form.refereeName}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Friend's Email</label>
                <input
                  type="email"
                  name="refereeEmail"
                  value={form.refereeEmail}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <button
                type="submit"
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-md"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;
