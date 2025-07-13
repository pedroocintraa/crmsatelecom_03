import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowRight, Zap, Shield, Clock, MapPin, Phone } from 'lucide-react';
import heroFiberBg from '@/assets/hero-fiber-bg.jpg';
import speedIcon from '@/assets/speed-icon.png';
import reliabilityIcon from '@/assets/reliability-icon.png';
import supportIcon from '@/assets/support-icon.png';

const Hero = () => {
  return (
    <section id="home" className="pt-16 min-h-screen flex items-center relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 hero-gradient" />
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url(${heroFiberBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Hero Content */}
          <div className="space-y-8 animate-fade-up">
            <div className="space-y-4">
              <div className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-white/20 text-sm font-medium text-primary">
                <Zap className="w-4 h-4 mr-2 text-accent" />
                Internet Fibra de Nova Geração
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight">
                Internet Fibra que
                <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Transforma
                </span>
                sua Conexão
              </h1>
              <p className="text-xl text-muted-foreground max-w-lg">
                Velocidade ultra-rápida, estabilidade incomparável e suporte 24/7. 
                Descubra a diferença de uma internet que realmente funciona.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="btn-accent text-lg px-8 py-4">
                <Phone className="w-5 h-5 mr-2" />
                Contratar Agora
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button variant="outline" className="btn-outline text-lg px-8 py-4">
                <MapPin className="w-5 h-5 mr-2" />
                Verificar Cobertura
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="flex flex-wrap gap-6 pt-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">1GB</div>
                <div className="text-sm text-muted-foreground">Velocidade máxima</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">99.9%</div>
                <div className="text-sm text-muted-foreground">Uptime garantido</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">24/7</div>
                <div className="text-sm text-muted-foreground">Suporte técnico</div>
              </div>
            </div>
          </div>

          {/* Hero Features Cards */}
          <div className="space-y-6 animate-fade-up" style={{ animationDelay: '0.2s' }}>
            <Card className="tech-card p-6">
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center animate-pulse-glow">
                  <img src={speedIcon} alt="Velocidade" className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    Velocidade Ultrarrápida
                  </h3>
                  <p className="text-muted-foreground">
                    Conexão simétrica de até 1GB para download e upload. 
                    Streaming 4K, jogos online e trabalho remoto sem travamentos.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="tech-card p-6">
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-accent/20 to-accent/10 flex items-center justify-center animate-pulse-glow" style={{ animationDelay: '0.5s' }}>
                  <img src={reliabilityIcon} alt="Confiabilidade" className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    Máxima Confiabilidade
                  </h3>
                  <p className="text-muted-foreground">
                    Rede 100% fibra ótica com redundância. Conexão estável 
                    mesmo em condições climáticas adversas.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="tech-card p-6">
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary/20 to-accent/10 flex items-center justify-center animate-pulse-glow" style={{ animationDelay: '1s' }}>
                  <img src={supportIcon} alt="Suporte" className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    Suporte Especializado
                  </h3>
                  <p className="text-muted-foreground">
                    Equipe técnica qualificada disponível 24/7. 
                    Atendimento humanizado e resolução rápida.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Floating animation elements */}
      <div className="absolute top-1/4 left-10 w-4 h-4 bg-primary/30 rounded-full animate-float" />
      <div className="absolute top-1/3 right-20 w-6 h-6 bg-accent/30 rounded-full animate-float" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-1/4 left-1/4 w-3 h-3 bg-primary/20 rounded-full animate-float" style={{ animationDelay: '2s' }} />
    </section>
  );
};

export default Hero;