import { MapPin, Shield, Headphones, Truck, Fuel, Gauge } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Features = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: MapPin,
      title: t('feature_gps'),
      description: t('feature_gps_desc'),
      color: 'text-blue-500',
      bg: 'bg-blue-500/10',
    },
    {
      icon: Shield,
      title: t('feature_insurance'),
      description: t('feature_insurance_desc'),
      color: 'text-green-500',
      bg: 'bg-green-500/10',
    },
    {
      icon: Headphones,
      title: t('feature_support'),
      description: t('feature_support_desc'),
      color: 'text-purple-500',
      bg: 'bg-purple-500/10',
    },
    {
      icon: Truck,
      title: t('feature_delivery'),
      description: t('feature_delivery_desc'),
      color: 'text-orange-500',
      bg: 'bg-orange-500/10',
    },
    {
      icon: Fuel,
      title: t('feature_fuel'),
      description: t('feature_fuel_desc'),
      color: 'text-red-500',
      bg: 'bg-red-500/10',
    },
    {
      icon: Gauge,
      title: t('feature_km'),
      description: t('feature_km_desc'),
      color: 'text-cyan-500',
      bg: 'bg-cyan-500/10',
    },
  ];

  return (
    <section id="services" className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/30 to-background" />
      
      <div className="container-custom relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Our Services
          </span>
          <h2 className="heading-lg text-foreground mb-4">
            {t('features_title')}
          </h2>
          <p className="text-body">
            We provide comprehensive car rental services with premium features to ensure your journey is safe, comfortable, and memorable.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="feature-card group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={`w-14 h-14 rounded-xl ${feature.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className={`w-7 h-7 ${feature.color}`} />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3 font-display">
                {feature.title}
              </h3>
              <p className="text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
