import Navbar, {initNavbar} from "../components/layout/navbar.js";
import Hero from "../components/home/hero.js";
import estimateCard from "../components/home/estimateCard.js";
import statsCard from "../components/home/statsCard.js";
import HowItWorks from "../components/home/howItWorks.js";
import Benefits from "../components/home/benefits.js";
import CallToAction from "../components/home/callToAction.js";
import Footer from "../components/layout/footer.js";

export default function Home() {
  setTimeout(() => {
    initNavbar();
  }, 0);

  return `
    ${Navbar()}
    ${Hero()}
    ${estimateCard()}
    ${statsCard()}
    ${HowItWorks()}
    ${Benefits()}
    ${CallToAction()}
    ${Footer()}
  `;
}