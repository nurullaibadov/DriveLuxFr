import { useState } from 'react';
import { Users, Fuel, Settings2, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import BookingModal from '@/components/BookingModal';

const cars = [
  {
    name: 'Mercedes S-Class',
    category: 'Luxury Sedan',
    image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=600&auto=format&fit=crop&q=80',
    price: 299,
    seats: 5,
    fuel: 'Hybrid',
    transmission: 'Automatic',
  },
  {
    name: 'BMW X7',
    category: 'Premium SUV',
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=600&auto=format&fit=crop&q=80',
    price: 349,
    seats: 7,
    fuel: 'Diesel',
    transmission: 'Automatic',
  },
  {
    name: 'Porsche 911',
    category: 'Sports Car',
    image: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=600&auto=format&fit=crop&q=80',
    price: 499,
    seats: 2,
    fuel: 'Petrol',
    transmission: 'Automatic',
  },
  {
    name: 'Audi RS e-tron GT',
    category: 'Electric Sports',
    image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=600&auto=format&fit=crop&q=80',
    price: 449,
    seats: 4,
    fuel: 'Electric',
    transmission: 'Automatic',
  },
  {
    name: 'Range Rover Sport',
    category: 'Luxury SUV',
    image: 'https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?w=600&auto=format&fit=crop&q=80',
    price: 379,
    seats: 5,
    fuel: 'Diesel',
    transmission: 'Automatic',
  },
  {
    name: 'Lamborghini Huracán',
    category: 'Supercar',
    image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=600&auto=format&fit=crop&q=80',
    price: 899,
    seats: 2,
    fuel: 'Petrol',
    transmission: 'Automatic',
  },
];

const Fleet = () => {
  const { t } = useLanguage();
  const [selectedCar, setSelectedCar] = useState<typeof cars[0] | null>(null);

  return (
    <>
      <section id="fleet" className="section-padding relative overflow-hidden">
        <div className="container-custom">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              Premium Collection
            </span>
            <h2 className="heading-lg text-foreground mb-4">
              {t('fleet_title')}
            </h2>
            <p className="text-body">
              {t('fleet_subtitle')}
            </p>
          </div>

          {/* Cars Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cars.map((car, index) => (
              <div
                key={index}
                className="card-luxury group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={car.image}
                    alt={car.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-semibold">
                      {car.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-foreground mb-2 font-display">
                    {car.name}
                  </h3>
                  
                  {/* Specs */}
                  <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                      <Users className="w-4 h-4" />
                      <span>{car.seats}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Fuel className="w-4 h-4" />
                      <span>{car.fuel}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Settings2 className="w-4 h-4" />
                      <span>{car.transmission}</span>
                    </div>
                  </div>

                  {/* Price & CTA */}
                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div>
                      <span className="text-2xl font-bold text-foreground">${car.price}</span>
                      <span className="text-muted-foreground text-sm">{t('per_day')}</span>
                    </div>
                    <Button 
                      onClick={() => setSelectedCar(car)}
                      className="btn-gold px-4 py-2 text-sm group/btn"
                    >
                      {t('book_now')}
                      <ArrowRight className="w-4 h-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* View All Button */}
          <div className="text-center mt-12">
            <Button variant="outline" className="btn-outline-gold">
              View All Vehicles
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Booking Modal */}
      {selectedCar && (
        <BookingModal
          car={selectedCar}
          isOpen={!!selectedCar}
          onClose={() => setSelectedCar(null)}
        />
      )}
    </>
  );
};

export default Fleet;
