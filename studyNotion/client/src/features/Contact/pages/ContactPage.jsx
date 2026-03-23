import ReviewSlider from '@/components/common/ReviewSlider';
import { reviewData } from '@/data/constants';
import GetInTouchForm from '@/features/About/components/GetInTouchForm';
import React from 'react';
import { FaComments, FaGlobe, FaPhoneAlt } from 'react-icons/fa';

const ContactPage = () => {
  return (
    <section className="w-11/12 max-w-6xl mx-auto mt-14 py-20 text-white">
      <div className="grid md:grid-cols-2 gap-10 items-start">
        {/* Left Side - Contact Info */}
        <div className="bg-richBlack-800/50 border border-richBlack-700 rounded-xl p-6 space-y-8">
          {/* Chat */}
          <div className="flex gap-4">
            <FaComments className="text-xl text-yellow-400 mt-1" />
            <div>
              <h3 className="font-semibold text-white">Chat on us</h3>
              <p className="text-richBlack-200 text-sm">Our friendly team is here to help.</p>
              <p className="text-richBlack-300 text-sm">@mail address</p>
            </div>
          </div>

          {/* Visit */}
          <div className="flex gap-4">
            <FaGlobe className="text-xl text-yellow-400 mt-1" />
            <div>
              <h3 className="font-semibold text-white">Visit us</h3>
              <p className="text-richBlack-200 text-sm">Come and say hello at our office HQ.</p>
              <p className="text-richBlack-300 text-sm">Here is the location / address</p>
            </div>
          </div>

          {/* Call */}
          <div className="flex gap-4">
            <FaPhoneAlt className="text-xl text-yellow-400 mt-1" />
            <div>
              <h3 className="font-semibold text-white">Call us</h3>
              <p className="text-richBlack-200 text-sm">Mon - Fri From 8am to 5pm</p>
              <p className="text-richBlack-300 text-sm">+123 456 7890</p>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="bg-richBlack-800/40 border border-richBlack-700 rounded-xl p-6">
          <GetInTouchForm
            heading="Got a Idea? We've got the skills. Let's team up"
            para="Tall us more about yourself and what you're got in mind."
          />
        </div>
      </div>
      <div className="mt-10">
        <ReviewSlider ReviewData={reviewData} />
      </div>
    </section>
  );
};

export default ContactPage;
