import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Plans from '@/components/Plans';
import Coverage from '@/components/Coverage';
import Testimonials from '@/components/Testimonials';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <Plans />
        <Coverage />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
