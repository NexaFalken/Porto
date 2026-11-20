
import {
  ArrowUpRight,
  Instagram,
  Linkedin,
  Github,
  MessageCircle,
  Settings,
} from 'lucide-react';

import { profile } from '@/data/portfolio';

interface HeroProps {
  constructionStarted: boolean;
  constructionComplete: boolean;
}

const socialLinks = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/ncho_owen/',
    Icon: Instagram,
  },
  {
    label: 'Discord',
    href: 'https://discord.com/app',
    Icon: MessageCircle,
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/haryo-bimo-wistoro-194782344/',
    Icon: Linkedin,
  },
  {
    label: 'GitHub',
    href: 'https://github.com/NexaFalken',
    Icon: Github,
  },
];

export default function Hero({
  constructionStarted,
  constructionComplete,
}: HeroProps) {
  return (
    <section
      id="intro"
      data-construction-started={constructionStarted}
      data-construction-complete={constructionComplete}
      className="hero-redesign"
    >
      <div className="hero-redesign-background" />

      <div className="hero-redesign-inner">

        {/* LEFT IDENTITY PANEL */}
        <div className="hero-left-panel">
          <svg
            className="hero-panel-outline hero-left-outline"
            viewBox="0 0 640 510"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              d="
                M 70 4
                H 390
                C 418 4 440 22 440 50
                V 100
                C 440 125 460 145 485 145
                H 590
                C 620 145 636 164 636 194
                V 430
                C 636 460 617 480 588 480
                H 370
                C 350 480 340 468 340 450
                V 430
                C 340 412 327 400 308 400
                H 70
                C 32 400 4 374 4 340
                V 290
                C 4 255 28 230 65 230
                H 320
                C 355 230 365 207 365 180
                V 170
                C 365 140 345 125 315 125
                H 70
                C 30 125 4 100 4 65
                V 65
                C 4 30 32 4 70 4
                Z
              "
            />
          </svg>

          <div className="hero-left-content">

            <div className="hero-identity">
              <h1>{profile.name}</h1>

              <div className="hero-signature">
                <span className="hero-dot" />
                <span>Sastaria Wistoro de Falkenrath</span>
              </div>
            </div>

            <p className="hero-introduction">
              Digital enthusiast focused on software engineering
              and creative design.
            </p>

            <div className="hero-primary-actions">
              <a
                href="#portfolio"
                className="hero-redesign-button hero-services-button"
              >
                <span>SERVICES</span>
                <span className="hero-button-symbol">
                  <Settings size={18} />
                </span>
              </a>

              <a
                href="#contact"
                className="hero-redesign-button hero-connect-button"
              >
                <span>CONNECT</span>
                <span className="hero-button-symbol">
                  <ArrowUpRight size={20} />
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* RIGHT PERSONAL PANEL */}
        <div className="hero-right-panel">
          <svg
            className="hero-panel-outline hero-right-outline"
            viewBox="0 0 390 510"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              d="
                M 55 5
                H 335
                C 365 5 385 25 385 55
                V 110
                C 385 130 365 138 365 155
                V 285
                C 365 305 385 315 385 335
                V 450
                C 385 480 365 505 330 505
                H 125
                C 95 505 70 485 70 455
                V 375
                C 70 340 45 315 15 315
                V 185
                C 45 185 70 160 70 130
                V 65
                C 70 30 35 5 55 5
                Z
              "
            />
          </svg>

          <div className="hero-right-content">

            <div className="hero-status">
              <span className="hero-dot" />
              <span>EXPLORING NEW HORIZON</span>
            </div>

            <div className="hero-personal-list">
              {[
                'Digitalist Enthusiast',
                'Young Solo Traveler',
                'Volunteer National',
                'Creative Designer',
              ].map((item) => (
                <div key={item} className="hero-personal-item">
                  <span className="hero-personal-marker" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="hero-socials">
              {socialLinks.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                >
                  <Icon size={25} strokeWidth={2.7} />
                </a>
              ))}
            </div>

            <div className="hero-small-portrait">
              <img
                src={profile.aboutPortraitUrl}
                alt="Haryo Bimo Wistoro"
              />
            </div>
          </div>
        </div>

        {/* CENTRAL TRAVELER */}
        <div className="hero-traveler">
          <img
            src={profile.portraitUrl}
            alt={profile.portraitAlt}
            fetchPriority="high"
          />
        </div>

      </div>
    </section>
  );
}
