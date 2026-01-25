import { ArrowRight, Phone, Mail } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';

const CTA = () => {
  const { t } = useLanguage();

  return (
    <section id="contact" className="section-padding relative overflow-hidden">
      <div className="container-custom">
        <div className="relative rounded-3xl overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1920&auto=format&fit=crop&q=80"
              alt="Luxury car"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/50" />
          </div>

          {/* Content */}
          <div className="relative z-10 py-20 px-8 md:px-16 lg:px-24">
            <div className="max-w-2xl">
              <h2 className="heading-lg text-white mb-4">
                {t('cta_title')}
              </h2>
              <p className="text-white/80 text-lg mb-8">
                {t('cta_subtitle')}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <a href="#fleet">
                  <Button className="btn-gold group">
                    {t('cta_button')}
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </a>
                <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 px-8 py-4 rounded-xl">
                  <Phone className="w-5 h-5 mr-2" />
                  +1 (555) 123-4567
                </Button>
              </div>

              {/* Contact Options */}
              <div className="flex flex-col sm:flex-row gap-6 text-white/80">
                <a href="tel:+15551234567" className="flex items-center gap-2 hover:text-primary transition-colors">
                  <Phone className="w-5 h-5" />
                  <span>+1 (555) 123-4567</span>
                </a>
                <a href="mailto:info@luxedrive.com" className="flex items-center gap-2 hover:text-primary transition-colors">
                  <Mail className="w-5 h-5" />
                  <span>info@luxedrive.com</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
