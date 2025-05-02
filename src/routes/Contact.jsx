import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Heroimg2 from '../components/Heroimg2';
import Footer from '../components/Footer';
import { FaMapMarkerAlt, FaPhoneAlt, FaGlobe } from 'react-icons/fa';
import './Contact.css';
import axios from 'axios';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/send-email', formData);
      alert(response.data.message); // Success message from the server
      // Reset form data upon successful submission
      setFormData({
        name: '',
        email: '',
        message: '',
      });
    } catch (error) {
      alert('Failed to send message. Please try again.');
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="contact-page">
      <Navbar />

      {/* Hero Section */}
      <Heroimg2
        heading="Contact Us"
        text="We'd love to hear from you. Drop us a message!"
      />

      <main className="contact-container">
        <h1 className="contact-title">Get in Touch</h1>

        {/* Contact Form */}
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group floating-label">
            <input
              type="text"
              id="name"
              className="form-input"
              placeholder=" "
              required
              value={formData.name}
              onChange={handleChange}
            />
            <label htmlFor="name">Your Name</label>
          </div>

          <div className="form-group floating-label">
            <input
              type="email"
              id="email"
              className="form-input"
              placeholder=" "
              required
              value={formData.email}
              onChange={handleChange}
            />
            <label htmlFor="email">Your Email</label>
          </div>

          <div className="form-group floating-label">
            <textarea
              id="message"
              className="form-textarea"
              placeholder=" "
              rows="5"
              required
              value={formData.message}
              onChange={handleChange}
            ></textarea>
            <label htmlFor="message">Your Message</label>
          </div>

          <button type="submit" className="submit-btn">
            ✉️ Send Message
          </button>
        </form>

        {/* Contact Information Section (Optional) */}
        <section className="contact-info">
          <div className="info-item">
            <FaMapMarkerAlt size={24} style={{ marginBottom: '0.5rem' }} />
            <h3 className="info-title">Location</h3>
            <p className="info-text">1234 Address St, City, Country</p>
          </div>

          <div className="info-item">
            <FaPhoneAlt size={24} style={{ marginBottom: '0.5rem' }} />
            <h3 className="info-title">Phone</h3>
            <p className="info-text">+1 (234) 567-8901</p>
          </div>

          <div className="info-item">
            <FaGlobe size={24} style={{ marginBottom: '0.5rem' }} />
            <h3 className="info-title">Website</h3>
            <p className="info-text">www.mywebsite.com</p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
