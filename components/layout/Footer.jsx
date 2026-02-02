"use client";
import React from 'react';
import Link from 'next/link';
import { contactData } from '@/data/contactData';
import { Mail, Phone, MapPin, Globe } from 'lucide-react';

const footerLinks = {
  solutions: [
    { name: 'Services', path: '/services' },
    { name: 'Products', path: '/products' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'Projects', path: '/projects' },
  ],
  company: [
    { name: 'About Us', path: '/about' },
    { name: 'Careers', path: '/careers' },
    { name: 'Blog', path: '/blog' },
    { name: 'Technologies', path: '/technologies' },
  ],
};

export const Footer = () => {
  const { info } = contactData;
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mx-4 mb-4 mt-auto">
      <div className="bg-card rounded-2xl shadow-xl overflow-hidden border border-border/50">
        <div className="container-custom py-10 px-6 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">

            {/* Brand Section - Compact */}
            <div className="space-y-4">
              <Link href="/" className="flex items-center gap-2">
                <img src="/logo.png" alt="Maurya Tech" className="w-8 h-8 object-contain" />
                <div>
                  <span className="font-heading font-bold text-lg text-foreground">Maurya</span>
                  <span className="font-heading font-medium text-lg text-muted-foreground ml-1">Tech</span>
                </div>
              </Link>
              <p className="text-sm text-muted-foreground leading-snug max-w-xs">
                Building high-quality digital products with our risk-free Pilot Model.
              </p>
            </div>

            {/* Solutions Links */}
            <div>
              <h4 className="font-heading font-semibold text-sm uppercase tracking-wider text-foreground/80 mb-4">Solutions</h4>
              <ul className="space-y-2">
                {footerLinks.solutions.map((link) => (
                  <li key={link.path}>
                    <Link
                      href={link.path}
                      className="text-sm text-muted-foreground hover:text-accent transition-colors font-medium"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Links */}
            <div>
              <h4 className="font-heading font-semibold text-sm uppercase tracking-wider text-foreground/80 mb-4">Company</h4>
              <ul className="space-y-2">
                {footerLinks.company.map((link) => (
                  <li key={link.path}>
                    <Link
                      href={link.path}
                      className="text-sm text-muted-foreground hover:text-accent transition-colors font-medium"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info (Replaces Legal here) */}
            <div>
              <h4 className="font-heading font-semibold text-sm uppercase tracking-wider text-foreground/80 mb-4">Contact</h4>
              <div className="space-y-3">
                <a
                  href={`mailto:${info.email}`}
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors"
                >
                  <Mail className="w-4 h-4 shrink-0" />
                  <span className="truncate">{info.email}</span>
                </a>
                <a
                  href={`tel:${info.phone}`}
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors"
                >
                  <Phone className="w-4 h-4 shrink-0" />
                  <span>{info.phone}</span>
                </a>
                <div className="flex items-start gap-2 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4 shrink-0 mt-0.5" />
                  <span className="leading-snug">{info.location}</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom Bar - Compact */}
        <div className="border-t border-border/40 bg-muted/30">
          <div className="container-custom py-4 px-6 md:px-10 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-muted-foreground">
              © {currentYear} Maurya Technologies.
            </p>

            <div className="flex items-center gap-6">
              <Link href="/privacy" className="text-xs text-muted-foreground hover:text-accent transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-xs text-muted-foreground hover:text-accent transition-colors">
                Terms of Service
              </Link>
              <Link href="/contact" className="text-xs text-muted-foreground hover:text-accent transition-colors">
                Contact
              </Link>
            </div>

            <Link
              href="/admin"
              className="hidden md:inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-accent transition-colors opacity-70 hover:opacity-100"
            >
              <Globe className="w-3 h-3" />
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};




