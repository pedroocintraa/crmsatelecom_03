import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Star, Zap, Users, Building } from 'lucide-react';

const Plans = () => {
  const plans = [
    {
      name: "Residencial Básico",
      speed: "200 MB",
      price: "R$ 79,90",
      originalPrice: null,
      icon: Users,
      popular: false,
      features: [
        "200 MB simétricos",
        "Wi-Fi 6 incluso",
        "Instalação grátis",
        "Suporte 24/7",
        "Até 10 dispositivos"
      ],
      ideal: "Ideal para casas com 2-3 pessoas"
    },
    {
      name: "Residencial Pro",
      speed: "500 MB",
      price: "R$ 129,90",
      originalPrice: "R$ 159,90",
      icon: Zap,
      popular: true,
      features: [
        "500 MB simétricos",
        "Wi-Fi 6 Premium",
        "Instalação grátis",
        "Suporte prioritário 24/7",
        "Até 20 dispositivos",
        "Roteador mesh incluso"
      ],
      ideal: "Perfeito para famílias e home office"
    },
    {
      name: "Ultra Performance",
      speed: "1 GB",
      price: "R$ 199,90",
      originalPrice: null,
      icon: Building,
      popular: false,
      features: [
        "1 GB simétrico",
        "Wi-Fi 6E Premium",
        "Instalação grátis",
        "Suporte dedicado 24/7",
        "Dispositivos ilimitados",
        "Sistema mesh completo",
        "IPv6 nativo"
      ],
      ideal: "Para empresas e usuários avançados"
    }
  ];

  return (
    <section id="plans" className="py-20 bg-gradient-to-b from-white to-secondary/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-white border border-border rounded-full text-sm font-medium text-primary mb-4">
            <Star className="w-4 h-4 mr-2 text-accent" />
            Planos FiberNet
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
            Escolha o Plano
            <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Perfeito para Você
            </span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Todos os planos incluem instalação gratuita, equipamentos sem custo 
            e a garantia de velocidade que você contratou.
          </p>
        </div>

        {/* Plans Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => {
            const IconComponent = plan.icon;
            return (
              <Card 
                key={plan.name} 
                className={`relative p-8 transition-all duration-300 hover:scale-105 ${
                  plan.popular 
                    ? 'ring-2 ring-accent shadow-glow' 
                    : 'tech-card'
                }`}
              >
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-accent text-accent-foreground px-4 py-1">
                    Mais Popular
                  </Badge>
                )}
                
                {/* Plan Header */}
                <div className="text-center mb-8">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-xl flex items-center justify-center ${
                    plan.popular 
                      ? 'bg-gradient-to-br from-accent to-accent/80' 
                      : 'bg-gradient-to-br from-primary/20 to-primary/10'
                  }`}>
                    <IconComponent className={`w-8 h-8 ${plan.popular ? 'text-white' : 'text-primary'}`} />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">{plan.name}</h3>
                  <div className="speed-gradient bg-clip-text text-transparent text-3xl font-bold mb-2">
                    {plan.speed}
                  </div>
                  
                  <div className="space-y-1">
                    {plan.originalPrice && (
                      <div className="text-sm text-muted-foreground line-through">
                        {plan.originalPrice}
                      </div>
                    )}
                    <div className="text-3xl font-bold text-foreground">
                      {plan.price}
                      <span className="text-sm font-normal text-muted-foreground">/mês</span>
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mt-2">{plan.ideal}</p>
                </div>

                {/* Features */}
                <div className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-3">
                      <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-primary" />
                      </div>
                      <span className="text-sm text-foreground">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <Button 
                  className={`w-full ${
                    plan.popular ? 'btn-accent' : 'btn-primary'
                  }`}
                >
                  Contratar {plan.name}
                </Button>
              </Card>
            );
          })}
        </div>

        {/* Additional Info */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Precisa de mais velocidade ou tem uma demanda específica?
          </p>
          <Button variant="outline" className="btn-outline">
            Solicitar Plano Personalizado
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Plans;