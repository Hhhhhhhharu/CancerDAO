// components/navbar.tsx
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/language-context";
import { LanguageSwitcher } from "@/components/language-switcher";
import { WalletButton } from "@/components/wallet-button";
import { EmailButton } from "@/components/email-button";

interface NavigationItem {
  name: string;
  href: string;
}

export function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { t } = useLanguage();

  const handleJoinCommunity = (): void => {
    if (location.pathname === '/') {
      // If on homepage, scroll to join-community section
      document.getElementById('join-community')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      // If on other pages, navigate to homepage and then scroll
      navigate('/');
      setTimeout(() => {
        document.getElementById('join-community')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  const navigation: NavigationItem[] = [
    { name: t('nav.home'), href: "/" },
    { name: t('nav.about'), href: "/about" },
    { name: t('nav.solution'), href: "/solution" },
    { name: t('nav.community'), href: "/community" },
    { name: t('nav.resources'), href: "/resources" },
  ];

  return (
      <nav className="bg-white/90 backdrop-blur-md border-b border-purple-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/">
              <div className="flex items-center cursor-pointer">
                <img
                    src="/logo.png"
                    alt="CancerDAO"
                    className="h-10 w-auto"
                    onError={(e) => {
                      // Fallback to text logo if image fails to load
                      const target = e.currentTarget as HTMLImageElement;
                      target.style.display = 'none';
                      const textLogo = target.nextElementSibling as HTMLElement;
                      if (textLogo) textLogo.style.display = 'block';
                    }}
                />
                <div
                    className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent"
                    style={{ display: 'none' }}
                >
                  CancerDAO
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navigation.map((item) => (
                  <Link key={item.name} to={item.href}>
                <span className={cn(
                    "nav-item",
                    location.pathname === item.href && "active"
                )}>
                  {item.name}
                </span>
                  </Link>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <LanguageSwitcher />
              <EmailButton />
              <WalletButton />
              <Button
                  className="btn-primary"
                  onClick={handleJoinCommunity}
              >
                {t('nav.join')}
              </Button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(!isOpen)}
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
              <div className="md:hidden">
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white/95 rounded-lg mt-2 shadow-lg">
                  {navigation.map((item) => (
                      <Link key={item.name} to={item.href}>
                  <span
                      className={cn(
                          "block px-3 py-2 rounded-md text-base font-medium transition-colors",
                          location.pathname === item.href
                              ? "text-purple-700 bg-purple-100"
                              : "text-gray-700 hover:text-purple-700 hover:bg-purple-50"
                      )}
                      onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </span>
                      </Link>
                  ))}
                  <div className="pt-4 space-y-3">
                    <div className="flex justify-center">
                      <LanguageSwitcher />
                    </div>
                    <div className="flex justify-center">
                      <EmailButton className="w-full" />
                    </div>
                    <div className="flex justify-center">
                      <WalletButton />
                    </div>
                    <Button
                        className="btn-primary w-full"
                        onClick={() => {
                          handleJoinCommunity();
                          setIsOpen(false);
                        }}
                    >
                      {t('nav.join')}
                    </Button>
                  </div>
                </div>
              </div>
          )}
        </div>
      </nav>
  );
}