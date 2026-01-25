import { Search, CalendarCheck, KeyRound } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const HowItWorks = () => {
  const { t } = useLanguage();

  const steps = [
    {
      icon: Search,
      number: '01',
      title: t('step1_title'),
      description: t('step1_desc'),
    },
    {
      icon: CalendarCheck,
      number: '02',
      title: t('step2_title'),
      description: t('step2_desc'),
    },
    {
      icon: KeyRound,
      number: '03',
      title: t('step3_title'),
      description: t('step3_desc'),
    },
  ];

  return (
    <section id="about" className="section-padding relative overflow-hidden bg-secondary/30">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Simple Process
          </span>
          <h2 className="heading-lg text-foreground mb-4">
            {t('how_title')}
          </h2>
          <p className="text-body">
            Renting a luxury car has never been easier. Follow these simple steps to get started.
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connecting Line */}
          <div className="hidden md:block absolute top-24 left-1/6 right-1/6 h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
          
          {steps.map((step, index) => (
            <div key={index} className="relative text-center group">
              {/* Number Badge */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-6xl font-bold font-display text-primary/10 group-hover:text-primary/20 transition-colors">
                {step.number}
              </div>
              
              {/* Icon */}
              <div className="relative z-10 w-20 h-20 mx-auto mb-6 rounded-2xl bg-card border-2 border-primary/20 flex items-center justify-center group-hover:border-primary group-hover:shadow-gold transition-all duration-300">
                <step.icon className="w-9 h-9 text-primary" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold text-foreground mb-3 font-display">
                {step.title}
              </h3>
              <p className="text-muted-foreground max-w-xs mx-auto">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
