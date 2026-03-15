'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  MapPin, 
  Ruler, 
  HardHat, 
  Phone, 
  Mail, 
  CheckCircle2, 
  Navigation,
  MessageCircle,
  Package
} from 'lucide-react';

// Componente para o efeito visual de contagem animada
function AnimatedCounter({ end, prefix = "+", suffix = "", text }: { end: number, prefix?: string, suffix?: string, text: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Quando o elemento aparecer na tela, a animação começa
        if (entry.isIntersecting) {
          let start = 0;
          const duration = 2000; // 2 segundos de duração da contagem
          const increment = end / (duration / 16); 

          const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
              setCount(end);
              clearInterval(timer);
            } else {
              setCount(Math.ceil(start));
            }
          }, 16);

          observer.disconnect(); // Garante que conte apenas na primeira vez que rolar a página
        }
      },
      { threshold: 0.5 } // Ativa quando 50% do componente estiver visível
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end]);

  return (
    <div ref={ref} className="flex flex-col items-center justify-center p-6 border border-[#666666]/10 rounded-2xl bg-slate-50 hover:shadow-lg transition-shadow">
      <span className="text-4xl md:text-5xl font-black text-[#003366] mb-2">
        {prefix}{count}{suffix}
      </span>
      <span className="text-[#666666] font-medium uppercase tracking-wider text-xs sm:text-sm text-center">
        {text}
      </span>
    </div>
  );
}

export default function LandingPage() {
  const whatsappNumber = "5585996563400"; 
  const whatsappLink = `https://wa.me/${whatsappNumber}`;

  const [statusEnvio, setStatusEnvio] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatusEnvio('loading');

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch('https://formsubmit.co/ajax/dm.levantamentos@gmail.com', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          nome: formData.get('nome'),
          email: formData.get('email'),
          mensagem: formData.get('mensagem'),
          _subject: `Novo contato pelo site de: ${formData.get('nome')}` 
        })
      });

      if (response.ok) {
        setStatusEnvio('success');
        form.reset(); 
      } else {
        setStatusEnvio('error');
      }
    } catch (error) {
      console.error(error);
      setStatusEnvio('error');
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      
      {/* --- NAVBAR --- */}
      <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-[#666666]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex-shrink-0 flex items-center">
              <a href="#inicio">
                <img 
                  src="/logog.png" 
                  alt="DM Levantamentos Topográficos" 
                  width={200}
                  height={60}
                  className="h-16 w-auto object-contain" 
                />
              </a>
            </div>
            <div className="hidden md:flex space-x-8 font-medium text-[#666666]">
              <a href="#inicio" className="hover:text-[#003366] transition">Início</a>
              <a href="#servicos" className="hover:text-[#003366] transition">Serviços</a>
              <a href="#empresa" className="hover:text-[#003366] transition">A Empresa</a>
              <a href="#contato" className="hover:text-[#003366] transition">Contato</a>
            </div>
            <a href={whatsappLink} target="_blank" className="bg-[#003366] text-white px-6 py-2 rounded-full font-semibold hover:bg-[#002244] transition shadow-lg shadow-[#003366]/20">
              Orçamento
            </a>
          </div>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <section id="inicio" className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <img src="/fundo.jpg" alt="Imagem de fundo topografia" className="absolute inset-0 w-full h-full object-cover opacity-40" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-5xl lg:text-7xl font-extrabold text-slate-900 leading-tight">
              Precisão que <span className="text-[#003366]">define</span> o seu projeto.
            </h1>
            <p className="mt-6 text-xl text-[#666666] leading-relaxed">
              Soluções topográficas avançadas para construção civil, agronegócio e regularização fundiária. Tecnologia de ponta a serviço da sua obra.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <a href="#servicos" className="px-8 py-4 bg-[#003366] text-white rounded-lg font-bold text-center hover:bg-[#002244] transition">
                Nossos Serviços
              </a>
              <a href={whatsappLink} target="_blank" className="px-8 py-4 border-2 border-[#666666] rounded-lg font-bold text-center hover:bg-white transition flex items-center justify-center gap-2 text-[#666666] hover:text-[#003366] hover:border-[#003366]">
                <MessageCircle size={20} className="text-green-600" /> Falar com Especialista
              </a>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 -z-10 w-1/2 h-full bg-[#003366]/10 hidden lg:block rounded-bl-[100px]" />
      </section>

      {/* --- SERVIÇOS --- */}
      <section id="servicos" className="py-24 bg-gray-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-[#003366] font-bold tracking-widest uppercase text-sm">Especialidades</h2>
            <p className="text-4xl font-bold mt-2 text-slate-900">Serviços de Alta Precisão</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Levantamento Planialtimétrico", desc: "Mapeamento detalhado do relevo e perímetros para projetos de engenharia.", icon: <Ruler className="w-8 h-8"/> },
              { title: "Georreferenciamento", desc: "Certificação de imóveis rurais conforme as normas do INCRA.", icon: <MapPin className="w-8 h-8"/> },
              { title: "Acompanhamento de Obra", desc: "Locação de pilares, terraplenagem e controle dimensional rigoroso.", icon: <HardHat className="w-8 h-8"/> },
              { title: "Cálculos Volumétricos", desc: "Medição precisa de volumes de corte e aterro para controle de custos e estoque.", icon: <Package className="w-8 h-8"/> },
            ].map((s, i) => (
              <div key={i} className="p-8 border border-[#666666]/20 rounded-2xl hover:shadow-xl transition-shadow bg-slate-50 group">
                <div className="bg-[#003366]/10 w-16 h-16 rounded-lg flex items-center justify-center text-[#003366] mb-6 group-hover:bg-[#003366] group-hover:text-white transition-colors">
                  {s.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-900">{s.title}</h3>
                <p className="text-[#666666]">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- A EMPRESA --- */}
      <section id="empresa" className="py-24 bg-[#003366] text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2">
            <h2 className="text-3xl lg:text-5xl font-bold mb-8 leading-tight">Comprometidos com a exatidão e a ética técnica profissional.</h2>
            <p className="text-slate-300 text-lg mb-6">
              A DM Levantamentos Topográficos nasceu com o propósito de transformar dados técnicos em segurança para investidores e construtores. Com anos de experiência no mercado, utilizamos equipamentos de última geração (RTK, Estações Totais e Drones).
            </p>
            <ul className="space-y-4">
              {['Equipe Técnica Qualificada', 'Equipamentos Calibrados', 'Prazos Rigorosos'].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <CheckCircle2 className="text-blue-300" /> <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:w-1/2 relative">
             <div className="aspect-video bg-[#002244] rounded-2xl overflow-hidden flex items-center justify-center border border-[#004488]">
              <img src="/work.png" alt="Equipe DM Levantamentos ou Drone" className="object-cover w-full h-full opacity-80" />
             </div>
          </div>
        </div>
      </section>

      {/* --- NOVA SEÇÃO DE RESULTADOS (CONTADORES ANIMADOS) --- */}
      <section className="py-24 bg-white border-b border-[#666666]/20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-[#003366] font-bold tracking-widest uppercase text-sm mb-4">Nossa Trajetória</h2>
          <p className="text-3xl md:text-4xl font-bold text-slate-900 mb-16">Inúmeros serviços realizados com máxima precisão</p>

          {/* Grid de números com animação. Ajuste os valores ('end') conforme a realidade da empresa */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            <AnimatedCounter end={150} text="Projetos Entregues" />
            <AnimatedCounter end={5} text="Anos de Experiência" />
            <AnimatedCounter end={1500} suffix=" ha" text="Área Mapeada" />
            <AnimatedCounter end={200} text="Clientes Atendidos" />
          </div>
        </div>
      </section>

      {/* --- CONTATO --- */}
      <section id="contato" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
            <div className="md:w-1/3 bg-[#003366] p-12 text-white">
              <h3 className="text-2xl font-bold mb-6">Informações de Contato</h3>
              <div className="space-y-8">
                <div className="flex items-center gap-4">
                  <Phone size={24} /> <span>(85) 99656-3400</span>
                </div>
                <div className="flex items-center gap-4">
                  <Mail size={24} /> <span>dm.levantamentos@gmail.com</span>
                </div>
                <div className="flex items-center gap-4">
                  <MapPin size={24} /> <span>Fortaleza - CE</span>
                </div>
              </div>
            </div>
            <div className="md:w-2/3 p-12">
              <h3 className="text-2xl font-bold mb-6 text-slate-800">Mande uma mensagem</h3>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <input 
                    type="text" 
                    name="nome"
                    required
                    placeholder="Seu Nome" 
                    className="p-3 border border-[#666666]/30 rounded-lg outline-[#003366]" 
                  />
                  <input 
                    type="email" 
                    name="email"
                    required
                    placeholder="Seu E-mail" 
                    className="p-3 border border-[#666666]/30 rounded-lg outline-[#003366]" 
                  />
                  <input 
                    type="number" 
                    name="number"
                    required
                    placeholder="Seu Telefone" 
                    className="p-3 border border-[#666666]/30 rounded-lg outline-[#003366]" 
                  />
                </div>
                <textarea 
                  name="mensagem"
                  required
                  placeholder="Como podemos ajudar no seu projeto?" 
                  rows={4} 
                  className="w-full p-3 border border-[#666666]/30 rounded-lg outline-[#003366]" 
                />
                
                <button 
                  type="submit"
                  disabled={statusEnvio === 'loading'}
                  className="w-full bg-[#003366] text-white py-4 rounded-lg font-bold hover:bg-[#002244] transition disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {statusEnvio === 'loading' ? 'Enviando...' : 'Enviar Mensagem'}
                </button>

                {statusEnvio === 'success' && (
                  <p className="text-green-600 font-medium text-center mt-2">
                    Mensagem enviada com sucesso!
                  </p>
                )}
                {statusEnvio === 'error' && (
                  <p className="text-red-600 font-medium text-center mt-2">
                    Erro ao enviar a mensagem. Por favor, tente pelo WhatsApp.
                  </p>
                )}
              </form>
              
            </div>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="py-12 bg-white border-t border-[#666666]/20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-[#666666]">© 2026 DM Levantamentos Topográficos. Todos os direitos reservados.</p>
        </div>
      </footer>

      {/* BOTÃO FLUTUANTE WHATSAPP */}
      <a 
        href={whatsappLink}
        target="_blank"
        className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-2xl hover:bg-green-600 transition-transform hover:scale-110 z-50 flex items-center justify-center"
      >
        <MessageCircle size={32} />
      </a>
    </div>
  );
}