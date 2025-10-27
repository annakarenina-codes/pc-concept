import React from 'react';

const teamMembers = [
  { name: 'Cristel Joy Franco', image: '/team/cristel.jpg', position: 'Frontend Developer' },
  { name: 'Anna Karenina Sanglay', image: '/team/anna.jpg', position: 'Backend Developer' },
  { name: 'Lyn Andrei Saguiguit', image: '/team/lyn.jpg', position: 'QA (Quality Assurance)' },
  { name: 'David Borja', image: '/team/david.jpg', position: 'Scrum Master' },
  { name: 'Juster Mariano', image: '/team/juster.jpg', position: 'Software Architect' },
];

const AboutPage: React.FC = () => {
  return (
    <div className="bg-gray-50 py-12 mt-[150px] font-poppins min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        {/* Who We Are Section */}
        <section className="mb-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-red-700 mb-6">Who We Are</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                We are a passionate team of tech enthusiasts dedicated to bringing you the best in PC builds, laptops,
                and accessories. Our journey began with a passion for building and upgrading computers. At first, we
                focused on helping individuals choose the right components, assemble systems, and provide reliable
                technical guidance. Over time, we realized the growing demand for accessible and trustworthy solutions
                in the PC market.
              </p>
              <p>
                With this vision, we decided to establish our store and begin offering complete PCs alongside quality
                parts, peripherals, and support services. Our goal has always been to combine product reliability with
                expert knowledge, ensuring that every customer finds the right solution for their needs.
              </p>
              <p>
                Today, we remain committed to delivering not only well-built PCs but also honest information,
                dependable after-sales service, and a community-driven space where technology is made simpler for
                everyone.
              </p>
              <p>
                Whether you're looking for your first PC setup, upgrading with the latest components, or just browsing
                through the latest gadgets and accessories, we've got your back.
              </p>
            </div>
          </div>
          <div className="flex justify-center">
            <img
              src="/logo-large.png"
              alt="PC Concept Logo"
              className="w-full max-w-md"
              onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                e.currentTarget.src = '/logo.png';
              }}
            />
          </div>
        </section>

        {/* What We Do Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-red-700 mb-6">What We Do</h2>
          <p className="text-gray-700 leading-relaxed">
            We specialize in providing a wide range of electronics, with a strong focus on personal computers, components, and peripherals. Our store is designed not
            only to showcase products but also to serve as a source of knowledge through detailed information, customer reviews, and blogs that guide users in
            making informed decisions. Beyond product offerings, we also provide services such as custom PC builds, repair solutions, and technical support, ensuring
            that every customer receives the right solution tailored to their needs.
          </p>
        </section>

        {/* What We Do - Expanded Section */}
        <section className="mb-16">
          <p className="text-gray-700 leading-relaxed">
            We believe that technology should be accessible, reliable, and supported by a team that truly understands customer needs. That is why we are committed
            to offering only trusted products, transparent information, and dependable service at every step. Our focus is on building trust through consistent quality
            and ensuring that every customer feels confident in their purchase, knowing they have the right support whenever they need it. Choosing us means
            choosing a partner that prioritizes not just what you buy, but the experience and support that come with it.
          </p>
        </section>

        {/* Our Mission Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-red-700 mb-6">Our Mission</h2>
          <p className="text-gray-700 leading-relaxed">
            Our mission is to provide high-quality PCs, components, and electronics that meet the needs of every customer while delivering reliable service and
            transparent product information. We strive to make technology simple, accessible, and valuable for students, professionals, and enthusiasts alike.
          </p>
        </section>

        {/* Our Vision Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-red-700 mb-6">Our Vision</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Our vision is to become a trusted destination for electronics and PC solutions, known for our commitment to quality, innovation, and customer satisfaction.
          </p>
          <p className="text-gray-700 leading-relaxed">
            We aim to build a community where technology empowers people to work smarter, play better, and connect more meaningfully.
          </p>
        </section>

        {/* Meet The Team Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-red-700 text-center mb-12">Meet The Team</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-red-700 mb-4">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                    onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                      e.currentTarget.src = '/placeholder.jpg';
                    }}
                  />
                </div>
                <h3 className="text-center text-sm font-semibold text-red-700">
                  {member.name}
                </h3>
                <p className="text-center text-xs text-gray-700 mt-1">{member.position}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;
