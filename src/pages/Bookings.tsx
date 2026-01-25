import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { Calendar, MapPin, Car, Navigation, Clock, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/hooks/useAuth';
import { api } from '@/lib/api';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface Booking {
  id: string;
  tracking_code: string;
  car_name: string;
  car_category: string;
  car_image: string | null;
  pickup_location: string;
  dropoff_location: string;
  pickup_date: string;
  dropoff_date: string;
  total_price: number;
  status: string;
  gps_enabled: boolean;
  created_at: string;
}

const statusConfig: Record<string, { color: string; bg: string }> = {
  pending: { color: 'text-yellow-500', bg: 'bg-yellow-500/10' },
  confirmed: { color: 'text-blue-500', bg: 'bg-blue-500/10' },
  active: { color: 'text-green-500', bg: 'bg-green-500/10' },
  completed: { color: 'text-primary', bg: 'bg-primary/10' },
  cancelled: { color: 'text-red-500', bg: 'bg-red-500/10' },
};

const Bookings = () => {
  const { t } = useLanguage();
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (user) {
      fetchBookings();
    }
  }, [user]);

  const fetchBookings = async () => {
    try {
      const data = await api.get(`/bookings?userId=${user?.id}`);
      setBookings(data || []);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: 'Failed to fetch bookings.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCancelBooking = async (id: string) => {
    try {
      await api.post(`/bookings/${id}/cancel`, {});

      setBookings(bookings.map(b => b.id === id ? { ...b, status: 'cancelled' } : b));

      toast({
        title: 'Booking Cancelled',
        description: 'Your booking has been cancelled successfully.',
      });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: 'Failed to cancel booking.',
        variant: 'destructive',
      });
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-primary animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-32 pb-20">
        <div className="container-custom">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              {t('nav_bookings')}
            </span>
            <h1 className="heading-lg text-foreground mb-4">
              {t('nav_bookings')}
            </h1>
            <p className="text-body">
              View and manage all your car rental bookings in one place.
            </p>
          </div>

          {/* Bookings List */}
          {bookings.length > 0 ? (
            <div className="space-y-6 max-w-4xl mx-auto">
              {bookings.map((booking) => (
                <div key={booking.id} className="glass rounded-2xl overflow-hidden">
                  <div className="flex flex-col md:flex-row">
                    {/* Car Image */}
                    {booking.car_image && (
                      <div className="md:w-64 h-48 md:h-auto flex-shrink-0">
                        <img
                          src={booking.car_image}
                          alt={booking.car_name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}

                    {/* Details */}
                    <div className="flex-1 p-6">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-xl font-semibold text-foreground font-display">
                              {booking.car_name}
                            </h3>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusConfig[booking.status]?.bg} ${statusConfig[booking.status]?.color}`}>
                              {t(`status_${booking.status}`)}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground">{booking.car_category}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">Tracking Code</p>
                          <p className="text-lg font-bold text-primary">{booking.tracking_code}</p>
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4 mb-4">
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="w-4 h-4 text-muted-foreground" />
                          <span className="text-muted-foreground">Pickup:</span>
                          <span className="text-foreground">{format(new Date(booking.pickup_date), 'PP')}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="w-4 h-4 text-muted-foreground" />
                          <span className="text-muted-foreground">Drop-off:</span>
                          <span className="text-foreground">{format(new Date(booking.dropoff_date), 'PP')}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <MapPin className="w-4 h-4 text-muted-foreground" />
                          <span className="text-muted-foreground truncate">{booking.pickup_location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Navigation className={`w-4 h-4 ${booking.gps_enabled ? 'text-green-500' : 'text-muted-foreground'}`} />
                          <span className={booking.gps_enabled ? 'text-green-500' : 'text-muted-foreground'}>
                            GPS {booking.gps_enabled ? 'Enabled' : 'Disabled'}
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-border">
                        <div>
                          <span className="text-2xl font-bold text-foreground">${booking.total_price}</span>
                          <span className="text-muted-foreground ml-2">total</span>
                        </div>
                        <div className="flex gap-3">
                          <Button
                            variant="outline"
                            onClick={() => navigate(`/track?code=${booking.tracking_code}`)}
                            className="btn-outline-gold text-sm px-4 py-2"
                          >
                            View Details
                          </Button>
                          {(booking.status === 'pending' || booking.status === 'confirmed') && (
                            <Button
                              variant="destructive"
                              onClick={() => handleCancelBooking(booking.id)}
                              className="text-sm px-4 py-2"
                            >
                              Cancel
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
                <Car className="w-12 h-12 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">No Bookings Yet</h3>
              <p className="text-muted-foreground mb-6">
                You haven't made any bookings yet. Explore our fleet and book your dream car!
              </p>
              <Button onClick={() => navigate('/#fleet')} className="btn-gold">
                Explore Fleet
              </Button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Bookings;
