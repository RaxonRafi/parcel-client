import Logo from "@/assets/icons/Logo";

export default function Footer() {
  return (
    <footer className="border-t">
      <div className="mx-auto container space-y-8 px-4 py-16 lg:space-y-16">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div>
            <div className="flex items-center gap-3">
              <Logo />
            </div>

            <p className="mt-4 max-w-xs text-muted-foreground">
              Smart Parcel is committed to making deliveries simple, fast, and reliable. Connecting senders and receivers seamlessly, every day.
            </p>

            <ul className="mt-8 flex gap-6">
              <li>
                <a
                  href="#"
                  rel="noreferrer"
                  target="_blank"
                  className="text-foreground/80 transition hover:text-foreground"
                >
                  <span className="sr-only">Facebook</span>
                  {/* Facebook SVG */}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  rel="noreferrer"
                  target="_blank"
                  className="text-foreground/80 transition hover:text-foreground"
                >
                  <span className="sr-only">Instagram</span>
                  {/* Instagram SVG */}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  rel="noreferrer"
                  target="_blank"
                  className="text-foreground/80 transition hover:text-foreground"
                >
                  <span className="sr-only">Twitter</span>
                  {/* Twitter SVG */}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  rel="noreferrer"
                  target="_blank"
                  className="text-foreground/80 transition hover:text-foreground"
                >
                  <span className="sr-only">GitHub</span>
                  {/* GitHub SVG */}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  rel="noreferrer"
                  target="_blank"
                  className="text-foreground/80 transition hover:text-foreground"
                >
                  <span className="sr-only">Dribbble</span>
                  {/* Dribbble SVG */}
                </a>
              </li>
            </ul>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-4">
            <div>
              <p className="font-medium text-foreground/90">Services</p>
              <ul className="mt-6 space-y-4 text-sm">
                <li><a href="#" className="text-foreground/90 hover:text-foreground/60">1-on-1 Coaching</a></li>
                <li><a href="#" className="text-foreground/90 hover:text-foreground/60">Company Review</a></li>
                <li><a href="#" className="text-foreground/90 hover:text-foreground/60">Accounts Review</a></li>
                <li><a href="#" className="text-foreground/90 hover:text-foreground/60">HR Consulting</a></li>
                <li><a href="#" className="text-foreground/90 hover:text-foreground/60">SEO Optimization</a></li>
              </ul>
            </div>

            <div>
              <p className="font-medium text-foreground/90">Company</p>
              <ul className="mt-6 space-y-4 text-sm">
                <li><a href="#" className="text-foreground/90 hover:text-foreground/60">About Us</a></li>
                <li><a href="#" className="text-foreground/90 hover:text-foreground/60">Meet the Team</a></li>
                <li><a href="#" className="text-foreground/90 hover:text-foreground/60">Careers</a></li>
              </ul>
            </div>

            <div>
              <p className="font-medium text-foreground/90">Helpful Links</p>
              <ul className="mt-6 space-y-4 text-sm">
                <li><a href="#" className="text-foreground/90 hover:text-foreground/60">Contact</a></li>
                <li><a href="#" className="text-foreground/90 hover:text-foreground/60">FAQs</a></li>
                <li><a href="#" className="text-foreground/90 hover:text-foreground/60">Live Chat</a></li>
              </ul>
            </div>

            <div>
              <p className="font-medium text-foreground/90">Legal</p>
              <ul className="mt-6 space-y-4 text-sm">
                <li><a href="#" className="text-foreground/90 hover:text-foreground/60">Accessibility</a></li>
                <li><a href="#" className="text-foreground/90 hover:text-foreground/60">Returns Policy</a></li>
                <li><a href="#" className="text-foreground/90 hover:text-foreground/60">Refund Policy</a></li>
                <li><a href="#" className="text-foreground/90 hover:text-foreground/60">Hiring Stats</a></li>
              </ul>
            </div>
          </div>
        </div>

        <p className="text-xs text-muted-foreground">
          &copy; 2025 Smart Parcel. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
