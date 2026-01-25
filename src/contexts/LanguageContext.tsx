import React, { createContext, useContext, useState } from 'react';

type Language = 'en' | 'tr' | 'ru' | 'az';

interface Translations {
  [key: string]: {
    en: string;
    tr: string;
    ru: string;
    az: string;
  };
}

export const translations: Translations = {
  // Navigation
  nav_home: { en: 'Home', tr: 'Ana Sayfa', ru: 'Главная', az: 'Ana Səhifə' },
  nav_fleet: { en: 'Our Fleet', tr: 'Filomuz', ru: 'Автопарк', az: 'Avtoparkımız' },
  nav_services: { en: 'Services', tr: 'Hizmetler', ru: 'Услуги', az: 'Xidmətlər' },
  nav_about: { en: 'About', tr: 'Hakkımızda', ru: 'О нас', az: 'Haqqımızda' },
  nav_contact: { en: 'Contact', tr: 'İletişim', ru: 'Контакты', az: 'Əlaqə' },
  nav_bookings: { en: 'My Bookings', tr: 'Rezervasyonlarım', ru: 'Мои бронирования', az: 'Rezervasiyalarım' },
  nav_track: { en: 'Track Booking', tr: 'Rezervasyon Takip', ru: 'Отследить бронирование', az: 'Rezervasiya İzlə' },
  
  // Hero
  hero_title: { en: 'Premium Car Rental', tr: 'Premium Araç Kiralama', ru: 'Премиум Аренда Авто', az: 'Premium Avtomobil Kirayəsi' },
  hero_subtitle: { en: 'Experience luxury on every journey', tr: 'Her yolculukta lüksü deneyimleyin', ru: 'Испытайте роскошь в каждой поездке', az: 'Hər səyahətdə lüksü yaşayın' },
  hero_cta: { en: 'Book Now', tr: 'Şimdi Rezerve Et', ru: 'Забронировать', az: 'İndi Rezerv Et' },
  hero_explore: { en: 'Explore Fleet', tr: 'Filoyu Keşfet', ru: 'Смотреть автопарк', az: 'Avtoparku Kəşf Et' },
  
  // Features
  features_title: { en: 'Why Choose Us', tr: 'Neden Bizi Seçmelisiniz', ru: 'Почему мы', az: 'Niyə Bizi Seçməlisiniz' },
  feature_gps: { en: 'GPS Tracking', tr: 'GPS Takip', ru: 'GPS Отслеживание', az: 'GPS İzləmə' },
  feature_gps_desc: { en: 'Real-time vehicle tracking for your safety', tr: 'Güvenliğiniz için gerçek zamanlı araç takibi', ru: 'Отслеживание в реальном времени для вашей безопасности', az: 'Təhlükəsizliyiniz üçün real vaxt izləmə' },
  feature_insurance: { en: 'Full Insurance', tr: 'Tam Sigorta', ru: 'Полная страховка', az: 'Tam Sığorta' },
  feature_insurance_desc: { en: 'Comprehensive coverage for peace of mind', tr: 'Huzurunuz için kapsamlı teminat', ru: 'Полное покрытие для спокойствия', az: 'Rahatlığınız üçün əhatəli sığorta' },
  feature_support: { en: '24/7 Support', tr: '7/24 Destek', ru: 'Поддержка 24/7', az: '24/7 Dəstək' },
  feature_support_desc: { en: 'Round-the-clock assistance whenever you need', tr: 'İhtiyacınız olduğunda her an yardım', ru: 'Круглосуточная помощь', az: 'Lazım olanda həmişə yardım' },
  feature_delivery: { en: 'Free Delivery', tr: 'Ücretsiz Teslimat', ru: 'Бесплатная доставка', az: 'Pulsuz Çatdırılma' },
  feature_delivery_desc: { en: 'We deliver your car to your doorstep', tr: 'Aracınızı kapınıza teslim ediyoruz', ru: 'Доставка автомобиля к вашей двери', az: 'Avtomobilinizi qapınıza çatdırırıq' },
  feature_fuel: { en: 'Fuel Included', tr: 'Yakıt Dahil', ru: 'Топливо включено', az: 'Yanacaq Daxildir' },
  feature_fuel_desc: { en: 'Full tank on pickup, no extra charges', tr: 'Teslimatta dolu depo, ekstra ücret yok', ru: 'Полный бак при получении, без доплат', az: 'Alışda dolu bak, əlavə ödəniş yoxdur' },
  feature_km: { en: 'Unlimited KM', tr: 'Sınırsız KM', ru: 'Без ограничений', az: 'Limitsiz KM' },
  feature_km_desc: { en: 'Drive as much as you want, no limits', tr: 'İstediğiniz kadar sürün, sınır yok', ru: 'Ездите сколько хотите, без лимитов', az: 'İstədiyiniz qədər sürün, limit yoxdur' },
  
  // Fleet
  fleet_title: { en: 'Our Premium Fleet', tr: 'Premium Filomuz', ru: 'Наш автопарк', az: 'Premium Avtoparkımız' },
  fleet_subtitle: { en: 'Choose from our collection of luxury vehicles', tr: 'Lüks araç koleksiyonumuzdan seçin', ru: 'Выберите из коллекции премиум автомобилей', az: 'Lüks avtomobil kolleksiyamızdan seçin' },
  per_day: { en: '/day', tr: '/gün', ru: '/день', az: '/gün' },
  book_now: { en: 'Book Now', tr: 'Rezerve Et', ru: 'Забронировать', az: 'Rezerv Et' },
  
  // Stats
  stats_cars: { en: 'Premium Cars', tr: 'Premium Araç', ru: 'Премиум авто', az: 'Premium Avtomobil' },
  stats_customers: { en: 'Happy Customers', tr: 'Mutlu Müşteri', ru: 'Довольных клиентов', az: 'Məmnun Müştəri' },
  stats_locations: { en: 'Locations', tr: 'Lokasyon', ru: 'Локаций', az: 'Məkan' },
  stats_years: { en: 'Years Experience', tr: 'Yıllık Tecrübe', ru: 'Лет опыта', az: 'İllik Təcrübə' },
  
  // How it works
  how_title: { en: 'How It Works', tr: 'Nasıl Çalışır', ru: 'Как это работает', az: 'Necə İşləyir' },
  step1_title: { en: 'Choose Your Car', tr: 'Aracınızı Seçin', ru: 'Выберите авто', az: 'Avtomobilinizi Seçin' },
  step1_desc: { en: 'Browse our fleet and select the perfect vehicle for your needs', tr: 'Filomuza göz atın ve ihtiyaçlarınıza uygun aracı seçin', ru: 'Просмотрите автопарк и выберите идеальный автомобиль', az: 'Avtoparkımıza baxın və ehtiyaclarınıza uyğun avtomobil seçin' },
  step2_title: { en: 'Book Online', tr: 'Online Rezervasyon', ru: 'Бронируйте онлайн', az: 'Onlayn Rezervasiya' },
  step2_desc: { en: 'Complete your booking in just a few clicks', tr: 'Birkaç tıklamayla rezervasyonunuzu tamamlayın', ru: 'Завершите бронирование в несколько кликов', az: 'Bir neçə kliklə rezervasiyanızı tamamlayın' },
  step3_title: { en: 'Get Your Keys', tr: 'Anahtarlarınızı Alın', ru: 'Получите ключи', az: 'Açarlarınızı Alın' },
  step3_desc: { en: 'Pick up your car or we deliver it to you', tr: 'Aracınızı alın veya size teslim edelim', ru: 'Заберите авто или мы доставим его вам', az: 'Avtomobilinizi götürün və ya sizə çatdıraq' },
  
  // Testimonials
  testimonials_title: { en: 'What Our Clients Say', tr: 'Müşterilerimiz Ne Diyor', ru: 'Отзывы клиентов', az: 'Müştərilərimiz Nə Deyir' },
  
  // CTA
  cta_title: { en: 'Ready to Experience Luxury?', tr: 'Lüksü Deneyimlemeye Hazır mısınız?', ru: 'Готовы к премиум опыту?', az: 'Lüksü Yaşamağa Hazırsınız?' },
  cta_subtitle: { en: 'Book your dream car today and hit the road in style', tr: 'Hayalinizdeki aracı bugün rezerve edin ve stilinizle yola çıkın', ru: 'Забронируйте авто мечты сегодня', az: 'Xəyal avtomobilinizi bu gün rezerv edin' },
  cta_button: { en: 'Start Your Journey', tr: 'Yolculuğunuza Başlayın', ru: 'Начать путешествие', az: 'Səyahətinizə Başlayın' },
  
  // Footer
  footer_desc: { en: 'Premium car rental services with the finest vehicles and exceptional customer care.', tr: 'En iyi araçlar ve olağanüstü müşteri hizmetleri ile premium araç kiralama.', ru: 'Премиум аренда с лучшими автомобилями и заботой о клиентах.', az: 'Ən yaxşı avtomobillər və müstəsna müştəri xidməti ilə premium kiralama.' },
  footer_quick_links: { en: 'Quick Links', tr: 'Hızlı Bağlantılar', ru: 'Быстрые ссылки', az: 'Sürətli Keçidlər' },
  footer_contact: { en: 'Contact Us', tr: 'Bize Ulaşın', ru: 'Свяжитесь с нами', az: 'Bizimlə Əlaqə' },
  footer_follow: { en: 'Follow Us', tr: 'Bizi Takip Edin', ru: 'Мы в соцсетях', az: 'Bizi İzləyin' },
  footer_rights: { en: 'All rights reserved.', tr: 'Tüm hakları saklıdır.', ru: 'Все права защищены.', az: 'Bütün hüquqlar qorunur.' },
  
  // Booking Form
  booking_title: { en: 'Book Your Car', tr: 'Aracınızı Rezerve Edin', ru: 'Забронируйте авто', az: 'Avtomobilinizi Rezerv Edin' },
  pickup_location: { en: 'Pickup Location', tr: 'Teslim Alma Lokasyonu', ru: 'Место получения', az: 'Alma Yeri' },
  dropoff_location: { en: 'Drop-off Location', tr: 'Teslim Lokasyonu', ru: 'Место возврата', az: 'Təhvil Yeri' },
  pickup_date: { en: 'Pickup Date', tr: 'Teslim Alma Tarihi', ru: 'Дата получения', az: 'Alma Tarixi' },
  dropoff_date: { en: 'Drop-off Date', tr: 'Teslim Tarihi', ru: 'Дата возврата', az: 'Təhvil Tarixi' },
  customer_name: { en: 'Full Name', tr: 'Ad Soyad', ru: 'Полное имя', az: 'Ad Soyad' },
  customer_email: { en: 'Email', tr: 'E-posta', ru: 'Email', az: 'E-poçt' },
  customer_phone: { en: 'Phone', tr: 'Telefon', ru: 'Телефон', az: 'Telefon' },
  gps_tracking: { en: 'Enable GPS Tracking', tr: 'GPS Takibi Etkinleştir', ru: 'Включить GPS-отслеживание', az: 'GPS İzləməni Aktivləşdir' },
  insurance_type: { en: 'Insurance Type', tr: 'Sigorta Türü', ru: 'Тип страховки', az: 'Sığorta Növü' },
  insurance_full: { en: 'Full Coverage', tr: 'Tam Kasko', ru: 'Полное покрытие', az: 'Tam Əhatə' },
  insurance_basic: { en: 'Basic Coverage', tr: 'Temel Sigorta', ru: 'Базовая страховка', az: 'Əsas Sığorta' },
  confirm_booking: { en: 'Confirm Booking', tr: 'Rezervasyonu Onayla', ru: 'Подтвердить бронирование', az: 'Rezervasiyanı Təsdiqlə' },
  booking_success: { en: 'Booking Confirmed!', tr: 'Rezervasyon Onaylandı!', ru: 'Бронирование подтверждено!', az: 'Rezervasiya Təsdiqləndi!' },
  tracking_code: { en: 'Your Tracking Code', tr: 'Takip Kodunuz', ru: 'Ваш код отслеживания', az: 'İzləmə Kodunuz' },
  
  // Tracking
  track_title: { en: 'Track Your Booking', tr: 'Rezervasyonunuzu Takip Edin', ru: 'Отследите бронирование', az: 'Rezervasiyanızı İzləyin' },
  enter_tracking_code: { en: 'Enter Tracking Code', tr: 'Takip Kodunu Girin', ru: 'Введите код отслеживания', az: 'İzləmə Kodunu Daxil Edin' },
  track_button: { en: 'Track', tr: 'Takip Et', ru: 'Отследить', az: 'İzlə' },
  booking_details: { en: 'Booking Details', tr: 'Rezervasyon Detayları', ru: 'Детали бронирования', az: 'Rezervasiya Detalları' },
  status: { en: 'Status', tr: 'Durum', ru: 'Статус', az: 'Status' },
  status_pending: { en: 'Pending', tr: 'Beklemede', ru: 'Ожидание', az: 'Gözləmədə' },
  status_confirmed: { en: 'Confirmed', tr: 'Onaylandı', ru: 'Подтверждено', az: 'Təsdiqləndi' },
  status_active: { en: 'Active', tr: 'Aktif', ru: 'Активно', az: 'Aktiv' },
  status_completed: { en: 'Completed', tr: 'Tamamlandı', ru: 'Завершено', az: 'Tamamlandı' },
  status_cancelled: { en: 'Cancelled', tr: 'İptal Edildi', ru: 'Отменено', az: 'Ləğv Edildi' },
  
  // Auth
  login: { en: 'Login', tr: 'Giriş Yap', ru: 'Войти', az: 'Daxil ol' },
  signup: { en: 'Sign Up', tr: 'Kayıt Ol', ru: 'Регистрация', az: 'Qeydiyyat' },
  logout: { en: 'Logout', tr: 'Çıkış Yap', ru: 'Выйти', az: 'Çıxış' },
  email: { en: 'Email', tr: 'E-posta', ru: 'Email', az: 'E-poçt' },
  password: { en: 'Password', tr: 'Şifre', ru: 'Пароль', az: 'Şifrə' },
  no_account: { en: "Don't have an account?", tr: 'Hesabınız yok mu?', ru: 'Нет аккаунта?', az: 'Hesabınız yoxdur?' },
  have_account: { en: 'Already have an account?', tr: 'Zaten hesabınız var mı?', ru: 'Уже есть аккаунт?', az: 'Artıq hesabınız var?' },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('language') as Language;
    return saved || 'en';
  });

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
};
