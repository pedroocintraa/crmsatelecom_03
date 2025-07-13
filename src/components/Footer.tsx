import { Button } from '@/components/ui/button';
import { 
  Wifi, 
  Phone, 
  Mail, 
  MapPin, 
  Facebook, 
  Instagram, 
  Twitter,
  Clock,
  Shield,
  Zap
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-foreground to-foreground/95 text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                <Wifi className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">FiberNet</span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Conectando o futuro com tecnologia de fibra ótica de última geração. 
              Internet rápida, confiável e com suporte especializado.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="sm" className="p-2 hover:bg-white/10">
                <Facebook className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="sm" className="p-2 hover:bg-white/10">
                <Instagram className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="sm" className="p-2 hover:bg-white/10">
                <Twitter className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-6">Links Rápidos</h3>
            <div className="space-y-3">
              <a href="#home" className="block text-gray-300 hover:text-white transition-colors text-sm">
                Início
              </a>
              <a href="#plans" className="block text-gray-300 hover:text-white transition-colors text-sm">
                Planos
              </a>
              <a href="#coverage" className="block text-gray-300 hover:text-white transition-colors text-sm">
                Cobertura
              </a>
              <a href="#about" className="block text-gray-300 hover:text-white transition-colors text-sm">
                Sobre Nós
              </a>
              <a href="#support" className="block text-gray-300 hover:text-white transition-colors text-sm">
                Suporte
              </a>
              <a href="#contact" className="block text-gray-300 hover:text-white transition-colors text-sm">
                Contato
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-lg mb-6">Nossos Diferenciais</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-sm text-gray-300">
                <Zap className="w-4 h-4 text-primary" />
                <span>Velocidade Garantida</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-300">
                <Shield className="w-4 h-4 text-primary" />
                <span>Conexão Estável</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-300">
                <Clock className="w-4 h-4 text-primary" />
                <span>Suporte 24/7</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-300">
                <Wifi className="w-4 h-4 text-primary" />
                <span>Instalação Grátis</span>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-6">Contato</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-accent mt-0.5" />
                <div>
                  <div className="text-sm font-medium">Central de Vendas</div>
                  <div className="text-sm text-gray-300">0800 123 4567</div>
                  <div className="text-xs text-gray-400">Seg-Dom: 8h às 22h</div>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-accent mt-0.5" />
                <div>
                  <div className="text-sm font-medium">E-mail</div>
                  <div className="text-sm text-gray-300">contato@fibernet.com.br</div>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-accent mt-0.5" />
                <div>
                  <div className="text-sm font-medium">Endereço</div>
                  <div className="text-sm text-gray-300">
                    Av. Tecnologia, 1000<br />
                    São Paulo - SP
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-gray-400">
              © {currentYear} FiberNet. Todos os direitos reservados.
            </div>
            <div className="flex space-x-6 text-sm text-gray-400">
              <a href="#" className="hover:text-white transition-colors">
                Política de Privacidade
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Termos de Uso
              </a>
              <a href="#" className="hover:text-white transition-colors">
                LGPD
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;