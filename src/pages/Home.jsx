import Hero from "../components/Hero/Hero";
import FeaturedTreatments from "../components/FeaturedTreatments/FeaturedTreatments";
import About from "../components/About/About";
import Products from "../components/Products/Products";
import Contact from "../components/Contact/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedTreatments />
      <About />
      <Products />
      <Contact />
    </>
  );
}