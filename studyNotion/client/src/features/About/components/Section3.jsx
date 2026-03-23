const statsData = [
  { id: 1, value: '5K', label: 'Active Students' },
  { id: 2, value: '10+', label: 'Mentors' },
  { id: 3, value: '200+', label: 'Courses' },
  { id: 4, value: '50+', label: 'Awards' },
];

const Section3 = () => {
  return (
    <section className="w-full py-14 ">
      <div className="w-11/12 py-20 bg-linear-to-r from-richBlack-900 via-richBlack-800 to-richBlack-900 max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
        {statsData.map((item) => (
          <div key={item.id} className="space-y-2">
            <h3 className="text-3xl md:text-4xl font-bold text-white">{item.value}</h3>
            <p className="text-richBlack-300 text-sm md:text-base">{item.label}</p>
          </div>
        ))}
      </div>
      {/* <div className="w-11/12 max-w-6xl mx-auto">
        <GetInTouchForm
          heading="Get In Touch"
          para="We'd love to hear from you. Please fill out this form."
        />
      </div> */}
    </section>
  );
};

export default Section3;
