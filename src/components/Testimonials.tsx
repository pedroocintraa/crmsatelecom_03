import { Card } from '@/components/ui/card';
import { Star, Quote } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      name: "Maria Silva",
      role: "Arquiteta - Home Office",
      location: "Vila Olímpia, SP",
      rating: 5,
      text: "Trabalho com projetos pesados e a FiberNet nunca me decepcionou. Upload de arquivos que antes levavam horas, agora são questão de minutos. Suporte excepcional!",
      avatar: "MS"
    },
    {
      name: "João Santos",
      role: "Gamer e Streamer",
      location: "Copacabana, RJ",
      rating: 5,
      text: "Latência zero, velocidade constante. Consigo streamar em 4K sem preocupações. A internet mais estável que já tive. Recomendo para todos os gamers!",
      avatar: "JS"
    },
    {
      name: "Família Oliveira",
      role: "Residência com 5 pessoas",
      location: "Savassi, BH",
      rating: 5,
      text: "Com todo mundo em casa usando internet, nunca tivemos problemas. Netflix, aulas online, trabalho remoto - tudo funciona perfeitamente ao mesmo tempo.",
      avatar: "FO"
    },
    {
      name: "Carlos Lima",
      role: "Empresário",
      location: "Asa Sul, DF",
      rating: 5,
      text: "Migrei minha empresa para FiberNet e a produtividade aumentou drasticamente. Videoconferências cristalinas e transferência de arquivos instantânea.",
      avatar: "CL"
    },
    {
      name: "Ana Costa",
      role: "Estudante de Design",
      location: "Itaim Bibi, SP",
      rating: 5,
      text: "Como estudante, preciso enviar projetos grandes constantemente. Com a FiberNet, nunca mais perdi prazo por causa da internet lenta. Mudou minha vida!",
      avatar: "AC"
    },
    {
      name: "Ricardo Mendes",
      role: "Desenvolvedor",
      location: "Leblon, RJ",
      rating: 5,
      text: "Deploy de aplicações, download de dependências, video calls com clientes internacionais - tudo roda perfeitamente. A melhor decisão que tomei.",
      avatar: "RM"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-secondary/30 to-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-white border border-border rounded-full text-sm font-medium text-primary mb-4">
            <Quote className="w-4 h-4 mr-2 text-accent" />
            Depoimentos
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
            O que Nossos
            <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Clientes Dizem
            </span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Mais de 50.000 clientes já transformaram sua experiência online com a FiberNet. 
            Veja alguns depoimentos reais.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index} 
              className="p-6 tech-card animate-fade-up hover:scale-105 transition-all duration-300"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Rating */}
              <div className="flex items-center space-x-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-foreground mb-6 relative">
                <Quote className="w-6 h-6 text-accent/30 absolute -top-2 -left-1" />
                <p className="text-sm leading-relaxed pl-6">
                  {testimonial.text}
                </p>
              </blockquote>

              {/* Author */}
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white font-semibold">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-semibold text-foreground">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {testimonial.role}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {testimonial.location}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Social Proof */}
        <div className="text-center mt-16">
          <div className="grid md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="space-y-2">
              <div className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                50.000+
              </div>
              <div className="text-sm text-muted-foreground">Clientes Satisfeitos</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                4.9/5
              </div>
              <div className="text-sm text-muted-foreground">Avaliação Média</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                98%
              </div>
              <div className="text-sm text-muted-foreground">Recomendariam</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;