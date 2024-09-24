import logo from '../../assets/MHLogo.png';
import {
  TiSocialFacebook,
  TiSocialTwitter,
  TiSocialGithub,
} from 'react-icons/ti';
import { SlSocialGoogle } from 'react-icons/sl';

export default function Footer() {
  return (
    <footer className="flex flex-col md:flex-row items-center bg-slate-700 w-full justify-around md:space-x-5 text-slate-100 py-10 px-6 md:px-10">
      <div className="flex flex-col space-y-4 mb-6 items-center">
        <img src={logo} alt="MarketHive Logo" className="w-48" />
        <div className="flex space-x-4 text-2xl">
          <a href="https://facebook.com" aria-label="Facebook">
            <TiSocialFacebook />
          </a>
          <a href="https://twitter.com" aria-label="Twitter">
            <TiSocialTwitter />
          </a>
          <a href="https://google.com" aria-label="Google">
            <SlSocialGoogle />
          </a>
          <a href="https://github.com" aria-label="GitHub">
            <TiSocialGithub />
          </a>
        </div>
      </div>

      <nav className="flex space-x-14 mb-6">
        <ul className="space-y-4">
          <li>
            <a href="#home" className="hover:underline">
              Home
            </a>
          </li>
          <li>
            <a href="#about" className="hover:underline">
              About
            </a>
          </li>
          <li>
            <a href="#contact" className="hover:underline">
              Contact
            </a>
          </li>
        </ul>
        <ul className="space-y-4">
          <li>
            <a href="#privacy" className="hover:underline">
              Privacy
            </a>
          </li>
          <li>
            <a href="#imprint" className="hover:underline">
              Imprint
            </a>
          </li>
          <li>
            <a href="#credits" className="hover:underline">
              Credits
            </a>
          </li>
        </ul>
      </nav>

      <div className="flex flex-col items-center md:items-start gap-6">
        <div className="flex space-x-2">
          <input
            type="email"
            placeholder="Subscribe to Newsletter"
            className="rounded-full py-3 px-4 text-slate-900"
            aria-label="Subscribe to Newsletter"
          />
          <button
            className="rounded-full bg-primary py-2 px-5 text-xl text-white"
            aria-label="Subscribe"
          >
            Go
          </button>
        </div>
        <p className="ms-0 md:ms-3">&copy; 2024 All Rights Reserved</p>
      </div>
    </footer>
  );
}
