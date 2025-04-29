
import React, { useState, useEffect } from 'react';
import EnrollModal from '../Features/Students/EnrollModal';

const LandingPage = () => {
  const [content, setContent] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Simulate fetching from dummy API with real hosted image URLs
    const dummyData = {
      nav: [
        { id: 1, label: 'Home', href: '#home' },
        { id: 2, label: 'About', href: '#about' },
        { id: 3, label: 'Activities', href: '#activities' },
        { id: 4, label: 'Gallery', href: '#gallery' },
        { id: 5, label: 'Testimonials', href: '#testimonials' }
      ],
      hero: {
        image: 'https://picsum.photos/id/1025/1600/900',
        title: 'Welcome to HappyKids School',
        subtitle: 'Where Imagination Meets Education',
        buttonText: 'Discover More',
        buttonHref: '#about'
      },
      about: {
        title: 'About HappyKids School',
        image: 'https://picsum.photos/id/1011/800/600',
        paragraphs: [
          'At HappyKids School, we cultivate a joyous learning environment where each child’s curiosity is encouraged and celebrated.',
          'Our state-of-the-art facilities blend modern design with playful elements, creating spaces where imagination can soar.'
        ]
      },
      activities: {
        title: 'Our Activities',
        items: [
          { id: 1, title: 'Early Learning', description: 'Play-based curriculum fostering foundational skills and social development.' },
          { id: 2, title: 'Creative Arts', description: 'Expressive arts classes including music, dance, and visual arts.' },
          { id: 3, title: 'STEM Explorers', description: 'Hands-on science and technology projects to spark critical thinking.' }
        ]
      },
      curriculum: {
        title: 'Curriculum Highlights',
        items: [
          { id: 1, title: 'Language & Literacy', description: 'Engaging reading and writing activities to build foundational literacy skills.' },
          { id: 2, title: 'Math Readiness', description: 'Fun tactile math games and puzzles fostering numerical understanding.' },
          { id: 3, title: 'Outdoor Discovery', description: 'Nature-based exploration to promote physical activity and environmental awareness.' }
        ]
      },
      gallery: {
        title: 'Gallery',
        images: [
          'https://picsum.photos/id/1012/400/400',
          'https://picsum.photos/id/1013/400/400',
          'https://picsum.photos/id/1014/400/400',
          'https://picsum.photos/id/1015/400/400',
          'https://picsum.photos/id/1016/400/400',
          'https://picsum.photos/id/1018/400/400',
          'https://picsum.photos/id/1020/400/400',
          'https://picsum.photos/id/1021/400/400'
        ]
      },
      testimonials: {
        title: 'What Parents Say',
        items: [
          { id: 1, text: 'My daughter lights up every morning knowing she’s coming to HappyKids!', name: 'Sarah, Parent' },
          { id: 2, text: 'A perfect blend of learning and fun—our son has thrived here.', name: 'David, Parent' }
        ]
      },
      footer: {
        schoolName: 'HappyKids School',
        address: '123 Fun Street, Playtown, PT 4567',
        phone: '(123) 456-7890',
        email: 'info@happykids.edu',
        mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.902410123456!2d90.4000000147623!3d23.777176784592925!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8b0b0b0b0b0b0%3A0xb0b0b0b0b0b0b0b0!2sPlaytown%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1610000000000'
      }
    };
    setContent(dummyData);
  }, []);

  if (!content) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-xl">Loading...</p>
      </div>
    );
  }

  const { nav, hero, about, activities, curriculum, gallery, testimonials, footer } = content;

  return (
    <div className="font-sans text-gray-800">

      <EnrollModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}

      />

      {/* Header */}
      <header className="sticky top-0 z-10 backdrop-blur-md  py-3 shadow">
        <div className="container mx-auto flex items-center justify-between py-4 px-6">
          <div className="text-3xl font-extrabold text-primary tracking-wide">
            {footer.schoolName}
          </div>
          {/* Desktop Nav */}
          <nav className="hidden  py-2  lg:flex space-x-8 text-gray-700 uppercase text-sm font-medium">
            {nav.map(item => (
              <a key={item.id} href={item.href} className="hover:text-primary transition">
                {item.label}
              </a>
            ))}

            <div className="hidden lg:flex">
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-4 py-2 bg-primary hover:bg-primary text-white rounded-lg text-sm font-semibold transition"
              >
                Enroll Now
              </button>

            </div>
          </nav>
          {/* CTA Button */}

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-700" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
        {/* Mobile Nav */}
        {menuOpen && (
          <div className="lg:hidden bg-white/90 backdrop-blur-md px-6 py-4 space-y-4 uppercase text-gray-700 font-medium">
            {nav.map(item => (
              <a key={item.id} href={item.href} className="block hover:text-primary transition">
                {item.label}
              </a>
            ))}
            <a href="#enroll" className="block mt-2 px-4 py-2 bg-primary hover:bg-primary text-white rounded-lg text-center transition">
              Enroll Now
            </a>
          </div>
        )}
      </header>

      <main className="">
        {/* Hero */}
        <section id="home" className="bg-cover bg-center h-screen" style={{ backgroundImage: `url(${hero.image})` }}>
          <div className="bg-black bg-opacity-50 h-full flex flex-col items-center justify-center text-center text-white px-4">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-4">{hero.title}</h1>
            <p className="text-lg md:text-2xl mb-6">{hero.subtitle}</p>
            <a href={hero.buttonHref} className="bg-primary hover:bg-primary text-white py-3 px-6 rounded-full font-semibold">
              {hero.buttonText}
            </a>
          </div>
        </section>

        {/* About */}
        <section id="about" className="py-20 bg-white">
          <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div className="overflow-hidden rounded-2xl shadow-lg">
              <img src={about.image} alt={about.title} className="w-full h-full object-cover" />
            </div>
            <div>
              <h2 className="text-4xl font-bold text-primary mb-4">{about.title}</h2>
              {about.paragraphs.map((p, idx) => (<p key={idx} className="text-lg leading-relaxed mb-6">{p}</p>))}
            </div>
          </div>
        </section>

        {/* Activities */}
        <section id="activities" className="py-16 bg-gray-100">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-10">{activities.title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {activities.items.map((act) => (<div key={act.id} className="p-6 bg-white rounded-lg shadow-lg text-center"><h3 className="text-xl font-semibold mb-2">{act.title}</h3><p>{act.description}</p></div>))}
            </div>
          </div>
        </section>

        {/* Curriculum Highlights */}
        <section id="curriculum" className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-10">{curriculum.title}</h2>
            <div className="space-y-8 md:space-y-0 md:grid md:grid-cols-3 md:gap-8">
              {curriculum.items.map((c) => (<div key={c.id} className="p-6 bg-gray-100 rounded-lg shadow-inner"><h3 className="text-xl font-semibold mb-2 text-primary">{c.title}</h3><p>{c.description}</p></div>))}
            </div>
          </div>
        </section>

        {/* Gallery */}
        <section id="gallery" className="py-16 bg-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-10">{gallery.title}</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {gallery.images.map((src, idx) => (<div key={idx} className="overflow-hidden rounded-lg shadow-md"><img src={src} alt={`Gallery ${idx + 1}`} className="w-full h-32 object-cover" /></div>))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section id="testimonials" className="py-16 bg-gray-100">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-10">{testimonials.title}</h2>
            <div className="space-y-8 md:space-y-0 md:grid md:grid-cols-2 md:gap-8">
              {testimonials.items.map((t) => (
                <div key={t.id} className="p-6 bg-white rounded-lg shadow-lg">
                  <p className="italic mb-4">{t.text}</p>
                  <span className="font-semibold">- {t.name}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-primary text-white py-10">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-2">{footer.schoolName}</h3>
            <p>{footer.address}</p>
            <p>Phone: {footer.phone}</p>
            <p>Email: {footer.email}</p>
          </div>
          <div className="w-full h-48">
            <iframe
              title="Location"
              src={footer.mapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
        </div>
        <div className="text-center mt-8">© {new Date().getFullYear()} {footer.schoolName}. All rights reserved.</div>
      </footer>
    </div>
  );
};

export default LandingPage;


