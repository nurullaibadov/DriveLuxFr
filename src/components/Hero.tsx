import { ArrowRight, Play } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';

const Hero = () => {
  const { t } = useLanguage();

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5" />
      <div className="absolute top-1/2 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4" />

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border)/0.3)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.3)_1px,transparent_1px)] bg-[size:60px_60px]" />

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6 animate-fade-up">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-sm font-medium text-primary">Premium Collection 2024</span>
            </div>

            <h1 className="heading-xl mb-6 animate-fade-up delay-100">
              <span className="text-foreground">{t('hero_title').split(' ')[0]} </span>
              <span className="text-gradient-gold">{t('hero_title').split(' ').slice(1).join(' ')}</span>
            </h1>

            <p className="text-body max-w-xl mx-auto lg:mx-0 mb-8 animate-fade-up delay-200">
              {t('hero_subtitle')}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-up delay-300">
              <a href="#fleet">
                <Button className="btn-gold group w-full sm:w-auto">
                  {t('hero_cta')}
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </a>
              <a href="#fleet">
                <Button variant="outline" className="btn-outline-gold group w-full sm:w-auto">
                  <Play className="w-5 h-5 mr-2" />
                  {t('hero_explore')}
                </Button>
              </a>
            </div>

            {/* Stats Preview */}
            <div className="flex items-center justify-center lg:justify-start gap-8 mt-12 animate-fade-up delay-400">
              <div className="text-center">
                <div className="text-3xl font-bold font-display text-foreground">50+</div>
                <div className="text-sm text-muted-foreground">{t('stats_cars')}</div>
              </div>
              <div className="w-px h-12 bg-border" />
              <div className="text-center">
                <div className="text-3xl font-bold font-display text-foreground">10K+</div>
                <div className="text-sm text-muted-foreground">{t('stats_customers')}</div>
              </div>
              <div className="w-px h-12 bg-border" />
              <div className="text-center">
                <div className="text-3xl font-bold font-display text-foreground">15+</div>
                <div className="text-sm text-muted-foreground">{t('stats_years')}</div>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative animate-fade-up delay-200">
            <div className="relative z-10">
              <img
                src="https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&auto=format&fit=crop&q=80"
                alt="Luxury Car"
                className="w-full h-auto rounded-2xl shadow-elevated"
              />
              {/* Floating Card */}
              <div className="absolute -bottom-6 -left-6 glass rounded-2xl p-4 animate-float">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <span className="text-2xl">🔑</span>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-foreground">Ready to Drive</div>
                    <div className="text-xs text-muted-foreground">Instant Booking</div>
                  </div>
                </div>
              </div>
              {/* Floating Card 2 */}
              <div className="absolute -top-4 -right-4 glass rounded-2xl p-4 animate-float" style={{ animationDelay: '1s' }}>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center">
                    <span className="text-2xl">✓</span>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-foreground">GPS Enabled</div>
                    <div className="text-xs text-muted-foreground">24/7 Tracking</div>
                  </div>
                </div>
              </div>
            </div>
            {/* Decorative Elements */}
            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-2xl" />
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-primary/10 rounded-full blur-2xl" />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-8 h-12 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2">
          <div className="w-1.5 h-3 rounded-full bg-primary animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
