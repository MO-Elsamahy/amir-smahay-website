import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Achievements from "@/components/Achievements";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col overflow-hidden">
      <Navbar />
      <Hero />
      <About />
      <Experience />
      <Achievements />
      <ContactForm />
      <Footer />
    </main>
  );
}
