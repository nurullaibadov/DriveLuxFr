import { useState } from 'react';
import { format } from 'date-fns';
import { Search, MapPin, Calendar, Car, Navigation, Shield, Clock, CheckCircle, XCircle, AlertCircle, Loader2 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { api } from '@/lib/api';
import { useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
  daily_rate: number;
  total_price: number;
  status: string;
  gps_enabled: boolean;
  insurance_type: string;
  customer_name: string;
  created_at: string;
}

const statusConfig: Record<string, { icon: React.ElementType; color: string; bg: string }> = {
  pending: { icon: Clock, color: 'text-yellow-500', bg: 'bg-yellow-500/10' },
  confirmed: { icon: CheckCircle, color: 'text-blue-500', bg: 'bg-blue-500/10' },
  active: { icon: Navigation, color: 'text-green-500', bg: 'bg-green-500/10' },
  completed: { icon: CheckCircle, color: 'text-primary', bg: 'bg-primary/10' },
  cancelled: { icon: XCircle, color: 'text-red-500', bg: 'bg-red-500/10' },
};

const Track = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [trackingCode, setTrackingCode] = useState('');
  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!trackingCode.trim()) {
      toast({
        title: 'Enter Tracking Code',
        description: 'Please enter your booking tracking code.',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    setSearched(true);

    try {
      const data = await api.get(`/bookings/track/${trackingCode.toUpperCase().trim()}`);
      setBooking(data);

    } catch (error: any) {
      setBooking(null);
      toast({
        title: 'Booking Not Found',
        description: 'No booking found with this tracking code.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  // Poll for GPS updates if active
  useEffect(() => {
    if (booking?.status === 'active') {
      const interval = setInterval(async () => {
        try {
          const updated = await api.get(`/bookings/track/${booking.tracking_code}`);
          setBooking(prev => prev ? { ...prev, gps: updated.gps } : null);
        } catch (e) {
          console.error(e);
        }
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [booking?.status, booking?.tracking_code]);

  const StatusIcon = booking ? statusConfig[booking.status]?.icon || AlertCircle : AlertCircle;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-32 pb-20">
        <div className="container-custom">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              {t('nav_track')}
            </span>
            <h1 className="heading-lg text-foreground mb-4">
              {t('track_title')}
            </h1>
            <p className="text-body">
              Enter your tracking code to view your booking status and details.
            </p>
          </div>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="max-w-lg mx-auto mb-12">
            <div className="flex gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  value={trackingCode}
                  onChange={(e) => setTrackingCode(e.target.value)}
                  placeholder="LXD-XXXXXXXX"
                  className="pl-12 h-14 text-lg"
                />
              </div>
              <Button type="submit" className="btn-gold h-14 px-8" disabled={loading}>
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : t('track_button')}
              </Button>
            </div>
          </form>

          {/* Results */}
          {searched && !loading && (
            booking ? (
              <div className="max-w-4xl mx-auto">
                {/* Status Card */}
                <div className="glass rounded-2xl p-8 mb-8">
                  <div className="flex flex-col md:flex-row items-center gap-6">
                    <div className={`w-24 h-24 rounded-2xl ${statusConfig[booking.status]?.bg} flex items-center justify-center`}>
                      <StatusIcon className={`w-12 h-12 ${statusConfig[booking.status]?.color}`} />
                    </div>
                    <div className="text-center md:text-left flex-1">
                      <p className="text-sm text-muted-foreground mb-1">{t('tracking_code')}</p>
                      <h2 className="text-2xl font-bold font-display text-foreground mb-2">{booking.tracking_code}</h2>
                      <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${statusConfig[booking.status]?.bg}`}>
                        <span className={`text-sm font-medium ${statusConfig[booking.status]?.color}`}>
                          {t(`status_${booking.status}`)}
                        </span>
                      </div>
                    </div>
                    <div className="text-center md:text-right">
                      <p className="text-sm text-muted-foreground mb-1">Total Price</p>
                      <p className="text-3xl font-bold text-primary">${booking.total_price}</p>
                    </div>
                  </div>
                </div>

                {/* Booking Details */}
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Car Info */}
                  <div className="glass rounded-2xl overflow-hidden">
                    {booking.car_image && (
                      <img
                        src={booking.car_image}
                        alt={booking.car_name}
                        className="w-full h-48 object-cover"
                      />
                    )}
                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <Car className="w-6 h-6 text-primary" />
                        <h3 className="text-xl font-semibold text-foreground font-display">Vehicle</h3>
                      </div>
                      <p className="text-lg font-semibold text-foreground">{booking.car_name}</p>
                      <p className="text-muted-foreground">{booking.car_category}</p>
                      <div className="flex items-center gap-4 mt-4 text-sm">
                        <div className="flex items-center gap-2">
                          <Navigation className={`w-4 h-4 ${booking.gps_enabled ? 'text-green-500' : 'text-muted-foreground'}`} />
                          <span className={booking.gps_enabled ? 'text-green-500' : 'text-muted-foreground'}>
                            GPS {booking.gps_enabled ? 'Enabled' : 'Disabled'}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Shield className="w-4 h-4 text-primary" />
                          <span className="text-foreground capitalize">{booking.insurance_type} Insurance</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Dates & Locations */}
                  <div className="glass rounded-2xl p-6 space-y-6">
                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        <Calendar className="w-6 h-6 text-primary" />
                        <h3 className="text-xl font-semibold text-foreground font-display">Schedule</h3>
                      </div>
                      <div className="space-y-4">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Pickup</span>
                          <span className="text-foreground font-medium">
                            {format(new Date(booking.pickup_date), 'PPP')}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Drop-off</span>
                          <span className="text-foreground font-medium">
                            {format(new Date(booking.dropoff_date), 'PPP')}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-border pt-6">
                      <div className="flex items-center gap-3 mb-4">
                        <MapPin className="w-6 h-6 text-primary" />
                        <h3 className="text-xl font-semibold text-foreground font-display">Locations</h3>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Pickup Location</p>
                          <p className="text-foreground font-medium">{booking.pickup_location}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Drop-off Location</p>
                          <p className="text-foreground font-medium">{booking.dropoff_location}</p>
                        </div>
                        {/* GPS Map (Simulated) */}
                        <div className="glass rounded-2xl p-6 mt-8">
                          <div className="flex items-center gap-3 mb-4">
                            <MapPin className="w-6 h-6 text-primary" />
                            <h3 className="text-xl font-semibold text-foreground font-display">Live GPS Tracking</h3>
                          </div>
                          <div className="bg-muted rounded-xl h-64 flex items-center justify-center relative overflow-hidden">
                            {booking.gps ? (
                              <>
                                {/* Fake Map Background */}
                                <div className="absolute inset-0 opacity-20 bg-[url('https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg')] bg-cover bg-center" />
                                <div className="text-center z-10">
                                  <div className="w-4 h-4 bg-blue-500 rounded-full animate-ping absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
                                  <div className="w-3 h-3 bg-blue-600 rounded-full relative z-20"></div>
                                  <p className="mt-4 font-mono text-sm bg-background/80 px-2 py-1 rounded">
                                    LAT: {booking.gps.lat.toFixed(6)} <br />
                                    LNG: {booking.gps.lng.toFixed(6)}
                                  </p>
                                  <p className="text-xs text-muted-foreground mt-1">Updated just now</p>
                                </div>
                              </>
                            ) : (
                              <p className="text-muted-foreground">GPS signal not available</p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Timeline */}
                <div className="glass rounded-2xl p-6 mt-8">
                  <h3 className="text-xl font-semibold text-foreground font-display mb-6">Booking Timeline</h3>
                  <div className="relative">
                    <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border" />
                    <div className="space-y-6">
                      <div className="relative pl-12">
                        <div className="absolute left-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                          <CheckCircle className="w-4 h-4 text-primary-foreground" />
                        </div>
                        <p className="text-foreground font-medium">Booking Created</p>
                        <p className="text-sm text-muted-foreground">
                          {format(new Date(booking.created_at), 'PPP p')}
                        </p>
                      </div>
                      {booking.status !== 'pending' && (
                        <div className="relative pl-12">
                          <div className="absolute left-0 w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                            <CheckCircle className="w-4 h-4 text-white" />
                          </div>
                          <p className="text-foreground font-medium">Booking Confirmed</p>
                          <p className="text-sm text-muted-foreground">Ready for pickup</p>
                        </div>
                      )}
                      {booking.status === 'active' && (
                        <div className="relative pl-12">
                          <div className="absolute left-0 w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                            <Navigation className="w-4 h-4 text-white" />
                          </div>
                          <p className="text-foreground font-medium">Vehicle Active</p>
                          <p className="text-sm text-muted-foreground">Currently in use</p>
                        </div>
                      )}
                      {booking.status === 'completed' && (
                        <div className="relative pl-12">
                          <div className="absolute left-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                            <CheckCircle className="w-4 h-4 text-primary-foreground" />
                          </div>
                          <p className="text-foreground font-medium">Rental Completed</p>
                          <p className="text-sm text-muted-foreground">Thank you for choosing us!</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
                  <Search className="w-12 h-12 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">No Booking Found</h3>
                <p className="text-muted-foreground">
                  We couldn't find a booking with that tracking code. Please check and try again.
                </p>
              </div>
            )
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Track;
