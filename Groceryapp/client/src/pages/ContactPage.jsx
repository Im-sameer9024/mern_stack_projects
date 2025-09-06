
import HeroSection from "../components/core/Contact/HeroSection";
import Information from "../components/core/Contact/Information";
import ContactForm from "../components/core/Contact/ContactForm";

const ContactPage = () => {
 


  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Hero Section */}
      <HeroSection />

      {/* Contact Info Cards */}
      <Information/>

      {/* Main Contact Form Section */}
      <ContactForm/>
    </div>
  );
};

export default ContactPage;
