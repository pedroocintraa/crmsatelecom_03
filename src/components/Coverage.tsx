import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { MapPin, Search, CheckCircle, Clock, AlertCircle } from 'lucide-react';

const Coverage = () => {
  const [cep, setCep] = useState('');
  const [searchResult, setSearchResult] = useState<'available' | 'soon' | 'unavailable' | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async () => {
    if (!cep || cep.length < 8) return;
    
    setIsSearching(true);
    
    // Simulated search - in real app, this would call an API
    setTimeout(() => {
      // Random result for demo
      const results: ('available' | 'soon' | 'unavailable')[] = ['available', 'soon', 'unavailable'];
      const randomResult = results[Math.floor(Math.random() * results.length)];
      setSearchResult(randomResult);
      setIsSearching(false);
    }, 1500);
  };

  const formatCep = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 5) {
      return numbers;
    }
    return `${numbers.slice(0, 5)}-${numbers.slice(5, 8)}`;
  };

  const handleCepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCep(e.target.value);
    setCep(formatted);
    setSearchResult(null);
  };

  const coverageAreas = [
    { city: "São Paulo", neighborhoods: ["Vila Olímpia", "Itaim Bibi", "Moema", "Jardins"] },
    { city: "Rio de Janeiro", neighborhoods: ["Copacabana", "Ipanema", "Leblon", "Barra da Tijuca"] },
    { city: "Belo Horizonte", neighborhoods: ["Savassi", "Funcionários", "Centro", "Pampulha"] },
    { city: "Brasília", neighborhoods: ["Asa Sul", "Asa Norte", "Lago Sul", "Águas Claras"] }
  ];

  return (
    <section id="coverage" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-secondary border border-border rounded-full text-sm font-medium text-primary mb-4">
            <MapPin className="w-4 h-4 mr-2 text-accent" />
            Cobertura FiberNet
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
            Verifique se a
            <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              FiberNet Chegou
            </span>
            na sua Região
          </h2>
          <p className="text-xl text-muted-foreground">
            Nossa rede está em constante expansão. Consulte agora se já atendemos 
            seu endereço ou saiba quando chegaremos até você.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* CEP Search */}
          <Card className="p-8 mb-12 tech-card">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Consulte seu CEP
              </h3>
              <p className="text-muted-foreground">
                Digite seu CEP para verificar a disponibilidade da FiberNet na sua região
              </p>
            </div>

            <div className="max-w-md mx-auto space-y-6">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="00000-000"
                  value={cep}
                  onChange={handleCepChange}
                  maxLength={9}
                  className="pl-10 text-center text-lg h-12"
                />
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              </div>

              <Button 
                onClick={handleSearch}
                disabled={cep.length < 9 || isSearching}
                className="w-full btn-accent h-12 text-lg"
              >
                {isSearching ? (
                  <>
                    <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2" />
                    Verificando...
                  </>
                ) : (
                  <>
                    <Search className="w-5 h-5 mr-2" />
                    Verificar Cobertura
                  </>
                )}
              </Button>

              {/* Search Result */}
              {searchResult && (
                <Card className={`p-6 ${
                  searchResult === 'available' ? 'border-green-200 bg-green-50' :
                  searchResult === 'soon' ? 'border-yellow-200 bg-yellow-50' :
                  'border-red-200 bg-red-50'
                }`}>
                  <div className="flex items-center space-x-3">
                    {searchResult === 'available' && (
                      <>
                        <CheckCircle className="w-6 h-6 text-green-600" />
                        <div>
                          <h4 className="font-semibold text-green-800">Disponível!</h4>
                          <p className="text-green-600 text-sm">
                            A FiberNet já atende sua região. Contrate agora!
                          </p>
                        </div>
                      </>
                    )}
                    {searchResult === 'soon' && (
                      <>
                        <Clock className="w-6 h-6 text-yellow-600" />
                        <div>
                          <h4 className="font-semibold text-yellow-800">Em breve!</h4>
                          <p className="text-yellow-600 text-sm">
                            Chegaremos na sua região nos próximos meses.
                          </p>
                        </div>
                      </>
                    )}
                    {searchResult === 'unavailable' && (
                      <>
                        <AlertCircle className="w-6 h-6 text-red-600" />
                        <div>
                          <h4 className="font-semibold text-red-800">Ainda não disponível</h4>
                          <p className="text-red-600 text-sm">
                            Deixe seus dados para ser avisado quando chegarmos.
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                  
                  <div className="mt-4 space-y-2">
                    {searchResult === 'available' && (
                      <Button className="w-full btn-accent">
                        Contratar Agora
                      </Button>
                    )}
                    {(searchResult === 'soon' || searchResult === 'unavailable') && (
                      <Button variant="outline" className="w-full btn-outline">
                        Solicitar Expansão
                      </Button>
                    )}
                  </div>
                </Card>
              )}
            </div>
          </Card>

          {/* Coverage Areas */}
          <div>
            <h3 className="text-2xl font-bold text-center text-foreground mb-8">
              Principais Áreas Atendidas
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {coverageAreas.map((area, index) => (
                <Card key={area.city} className="p-6 tech-card">
                  <h4 className="font-bold text-foreground mb-4 text-center">
                    {area.city}
                  </h4>
                  <div className="space-y-2">
                    {area.neighborhoods.map((neighborhood) => (
                      <div key={neighborhood} className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{neighborhood}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Expansion Request */}
          <Card className="p-8 mt-12 text-center tech-card">
            <h3 className="text-xl font-bold text-foreground mb-4">
              Sua região não está na lista?
            </h3>
            <p className="text-muted-foreground mb-6">
              Estamos sempre expandindo nossa rede. Solicite a chegada da FiberNet 
              na sua região e seja um dos primeiros a ser notificado.
            </p>
            <Button className="btn-primary">
              Solicitar Expansão
            </Button>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Coverage;