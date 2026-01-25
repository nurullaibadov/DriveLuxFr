import { useState } from 'react';
import { format, differenceInDays } from 'date-fns';
import { CalendarIcon, MapPin, User, Mail, Phone, Shield, Navigation, X, Check } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/hooks/useAuth';
import { api } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface Car {
  name: string;
  category: string;
  image: string;
  price: number;
}

interface BookingModalProps {
  car: Car;
  isOpen: boolean;
  onClose: () => void;
}

const locations = [
  'Airport Terminal 1',
  'Airport Terminal 2',
  'City Center Office',
  'Downtown Station',
  'Harbor Port',
  'Hotel Delivery',
];

const BookingModal = ({ car, isOpen, onClose }: BookingModalProps) => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const { toast } = useToast();

  const [pickupDate, setPickupDate] = useState<Date>();
  const [dropoffDate, setDropoffDate] = useState<Date>();
  const [pickupLocation, setPickupLocation] = useState('');
  const [dropoffLocation, setDropoffLocation] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [gpsEnabled, setGpsEnabled] = useState(true);
  const [insuranceType, setInsuranceType] = useState('full');
  const [loading, setLoading] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [trackingCode, setTrackingCode] = useState('');

  const days = pickupDate && dropoffDate ? differenceInDays(dropoffDate, pickupDate) : 0;
  const totalPrice = days > 0 ? days * car.price : 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!pickupDate || !dropoffDate || !pickupLocation || !dropoffLocation || !customerName || !customerEmail) {
      toast({
        title: 'Missing Information',
        description: 'Please fill in all required fields.',
        variant: 'destructive',
      });
      return;
    }

    if (days <= 0) {
      toast({
        title: 'Invalid Dates',
        description: 'Drop-off date must be after pickup date.',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);

    try {
      const bookingData: any = {
        car_name: car.name,
        car_category: car.category,
        car_image: car.image,
        pickup_location: pickupLocation,
        dropoff_location: dropoffLocation,
        pickup_date: pickupDate.toISOString(),
        dropoff_date: dropoffDate.toISOString(),
        daily_rate: car.price,
        total_price: totalPrice,
        customer_name: customerName,
        customer_email: customerEmail,
        customer_phone: customerPhone || null,
        gps_enabled: gpsEnabled,
        insurance_type: insuranceType,
        status: 'confirmed',
      };

      if (user?.id) {
        bookingData.user_id = user.id;
      }

      const data = await api.post('/bookings', bookingData);

      setTrackingCode(data.tracking_code);
      setBookingSuccess(true);

      toast({
        title: t('booking_success'),
        description: `${t('tracking_code')}: ${data.tracking_code}`,
      });
    } catch (error: any) {
      toast({
        title: 'Booking Failed',
        description: error.message || 'An error occurred while creating your booking.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setBookingSuccess(false);
    setTrackingCode('');
    setPickupDate(undefined);
    setDropoffDate(undefined);
    setPickupLocation('');
    setDropoffLocation('');
    setCustomerName('');
    setCustomerEmail('');
    setCustomerPhone('');
    onClose();
  };

  if (bookingSuccess) {
    return (
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-md">
          <div className="text-center py-8">
            <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-green-500" />
            </div>
            <h2 className="heading-md text-foreground mb-2">{t('booking_success')}</h2>
            <p className="text-muted-foreground mb-6">
              Your {car.name} has been reserved successfully.
            </p>
            <div className="bg-secondary rounded-xl p-6 mb-6">
              <p className="text-sm text-muted-foreground mb-2">{t('tracking_code')}</p>
              <p className="text-2xl font-bold font-display text-primary">{trackingCode}</p>
            </div>
            <p className="text-sm text-muted-foreground mb-6">
              Save this code to track your booking status.
            </p>
            <Button onClick={handleClose} className="btn-gold">
              Done
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="heading-md">{t('booking_title')}</DialogTitle>
        </DialogHeader>

        {/* Car Summary */}
        <div className="flex items-center gap-4 p-4 bg-secondary rounded-xl mb-6">
          <img
            src={car.image}
            alt={car.name}
            className="w-24 h-16 object-cover rounded-lg"
          />
          <div className="flex-1">
            <h3 className="font-semibold text-foreground">{car.name}</h3>
            <p className="text-sm text-muted-foreground">{car.category}</p>
          </div>
          <div className="text-right">
            <span className="text-xl font-bold text-foreground">${car.price}</span>
            <span className="text-muted-foreground text-sm">{t('per_day')}</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Dates */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>{t('pickup_date')}</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      'w-full justify-start text-left font-normal',
                      !pickupDate && 'text-muted-foreground'
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {pickupDate ? format(pickupDate, 'PPP') : 'Select date'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={pickupDate}
                    onSelect={setPickupDate}
                    disabled={(date) => date < new Date()}
                    initialFocus
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="space-y-2">
              <Label>{t('dropoff_date')}</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      'w-full justify-start text-left font-normal',
                      !dropoffDate && 'text-muted-foreground'
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dropoffDate ? format(dropoffDate, 'PPP') : 'Select date'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={dropoffDate}
                    onSelect={setDropoffDate}
                    disabled={(date) => date < (pickupDate || new Date())}
                    initialFocus
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {/* Locations */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>{t('pickup_location')}</Label>
              <Select value={pickupLocation} onValueChange={setPickupLocation}>
                <SelectTrigger>
                  <MapPin className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent className="bg-popover">
                  {locations.map((loc) => (
                    <SelectItem key={loc} value={loc}>{loc}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>{t('dropoff_location')}</Label>
              <Select value={dropoffLocation} onValueChange={setDropoffLocation}>
                <SelectTrigger>
                  <MapPin className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent className="bg-popover">
                  {locations.map((loc) => (
                    <SelectItem key={loc} value={loc}>{loc}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Customer Info */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>{t('customer_name')}</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="John Doe"
                  className="pl-10"
                  required
                />
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>{t('customer_email')}</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="email"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    placeholder="john@example.com"
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>{t('customer_phone')}</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="tel"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="+1 234 567 8900"
                    className="pl-10"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Options */}
          <div className="flex flex-col sm:flex-row gap-4 sm:items-center justify-between p-4 bg-secondary rounded-xl">
            <div className="flex items-center gap-3">
              <Navigation className="w-5 h-5 text-primary" />
              <div>
                <Label>{t('gps_tracking')}</Label>
                <p className="text-xs text-muted-foreground">Real-time vehicle tracking</p>
              </div>
            </div>
            <Switch checked={gpsEnabled} onCheckedChange={setGpsEnabled} />
          </div>

          <div className="space-y-2">
            <Label>{t('insurance_type')}</Label>
            <Select value={insuranceType} onValueChange={setInsuranceType}>
              <SelectTrigger>
                <Shield className="mr-2 h-4 w-4" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-popover">
                <SelectItem value="full">{t('insurance_full')}</SelectItem>
                <SelectItem value="basic">{t('insurance_basic')}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Price Summary */}
          {days > 0 && (
            <div className="p-4 bg-primary/10 rounded-xl space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">${car.price} x {days} days</span>
                <span className="text-foreground">${totalPrice}</span>
              </div>
              <div className="flex justify-between font-semibold text-lg border-t border-border pt-2">
                <span>Total</span>
                <span className="text-primary">${totalPrice}</span>
              </div>
            </div>
          )}

          <Button type="submit" className="w-full btn-gold" disabled={loading}>
            {loading ? 'Processing...' : t('confirm_booking')}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BookingModal;
