import React,{useState} from 'react'

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
    
      // Handle input changes
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };
    
      // Handle form submission
      const handleSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission
        console.log(formData); // Log the form data to the console
        // Here you can add further logic, like sending the data to an API
      };
    

  return (
    <section className='contact-section section_padding'>
        <div className="container">
        <div className="row">
      <div className="col-12">
        <h2 className="contact-title">Get in Touch</h2>
      </div>
      <div className="col-lg-8">
        <form
          className="form-contact contact_form"
          onSubmit={handleSubmit} // Use the handleSubmit function
          noValidate
        >
          <div className="row">
            <div className="col-12">
              <div className="form-group">
                <textarea
                  className="form-control w-100"
                  name="message"
                  value={formData.message}
                  onChange={handleChange} // Handle input change
                  cols="30"
                  rows="9"
                  onFocus={(e) => (e.target.placeholder = '')}
                  onBlur={(e) => (e.target.placeholder = 'Enter Message')}
                  placeholder="Enter Message"
                ></textarea>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="form-group">
                <input
                  className="form-control"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange} // Handle input change
                  onFocus={(e) => (e.target.placeholder = '')}
                  onBlur={(e) => (e.target.placeholder = 'Enter your name')}
                  placeholder="Enter your name"
                />
              </div>
            </div>
            <div className="col-sm-6">
              <div className="form-group">
                <input
                  className="form-control"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange} // Handle input change
                  onFocus={(e) => (e.target.placeholder = '')}
                  onBlur={(e) => (e.target.placeholder = 'Enter email address')}
                  placeholder="Enter email address"
                />
              </div>
            </div>
            <div className="col-12">
              <div className="form-group">
                <input
                  className="form-control"
                  name="subject"
                  type="text"
                  value={formData.subject}
                  onChange={handleChange} // Handle input change
                  onFocus={(e) => (e.target.placeholder = '')}
                  onBlur={(e) => (e.target.placeholder = 'Enter Subject')}
                  placeholder="Enter Subject"
                />
              </div>
            </div>
          </div>
          <div className="form-group mt-3">
            <button
              type="submit"
              className="button button-contactForm btn_4 boxed-btn"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
      <div className="col-lg-4">
        <div className="media contact-info">
          <span className="contact-info__icon"><i className="ti-home"></i></span>
          <div className="media-body">
            <h3>Buttonwood, California.</h3>
            <p>Rosemead, CA 91770</p>
          </div>
        </div>
        <div className="media contact-info">
          <span className="contact-info__icon"><i className="ti-tablet"></i></span>
          <div className="media-body">
            <h3>00 (440) 9865 562</h3>
            <p>Mon to Fri 9am to 6pm</p>
          </div>
        </div>
        <div className="media contact-info">
          <span className="contact-info__icon"><i className="ti-email"></i></span>
          <div className="media-body">
            <h3>support@colorlib.com</h3>
            <p>Send us your query anytime!</p>
          </div>
        </div>
      </div>
    </div>
        </div>      
    </section>
  )
}

export default ContactForm