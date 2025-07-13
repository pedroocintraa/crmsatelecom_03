import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, Wifi, Phone, MapPin } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border shadow-soft">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
              <Wifi className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-foreground">FiberNet</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#home" className="text-foreground hover:text-primary transition-colors duration-300">
              Início
            </a>
            <a href="#plans" className="text-foreground hover:text-primary transition-colors duration-300">
              Planos
            </a>
            <a href="#coverage" className="text-foreground hover:text-primary transition-colors duration-300">
              Cobertura
            </a>
            <a href="#about" className="text-foreground hover:text-primary transition-colors duration-300">
              Sobre
            </a>
            <a href="#support" className="text-foreground hover:text-primary transition-colors duration-300">
              Suporte
            </a>
            <a href="#contact" className="text-foreground hover:text-primary transition-colors duration-300">
              Contato
            </a>
          </nav>

          {/* Desktop CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="outline" className="btn-outline">
              <MapPin className="w-4 h-4 mr-2" />
              Verificar Cobertura
            </Button>
            <Button className="btn-accent">
              <Phone className="w-4 h-4 mr-2" />
              Contratar Agora
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-border shadow-medium">
            <nav className="flex flex-col space-y-4 p-4">
              <a href="#home" className="text-foreground hover:text-primary transition-colors duration-300">
                Início
              </a>
              <a href="#plans" className="text-foreground hover:text-primary transition-colors duration-300">
                Planos
              </a>
              <a href="#coverage" className="text-foreground hover:text-primary transition-colors duration-300">
                Cobertura
              </a>
              <a href="#about" className="text-foreground hover:text-primary transition-colors duration-300">
                Sobre
              </a>
              <a href="#support" className="text-foreground hover:text-primary transition-colors duration-300">
                Suporte
              </a>
              <a href="#contact" className="text-foreground hover:text-primary transition-colors duration-300">
                Contato
              </a>
              <div className="flex flex-col space-y-2 pt-4 border-t border-border">
                <Button variant="outline" className="btn-outline w-full justify-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  Verificar Cobertura
                </Button>
                <Button className="btn-accent w-full justify-center">
                  <Phone className="w-4 h-4 mr-2" />
                  Contratar Agora
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;