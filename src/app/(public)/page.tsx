'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, MapPin, Calendar, Users, Star, ArrowRight, ShieldCheck, Clock, CheckCircle2, ChevronRight,
  Sparkles, Shield, Compass, Heart, Award, HelpCircle, Phone, Mail, Send, Camera, Play, Eye, X, BookOpen, Calculator, CloudSun, FileDown
} from 'lucide-react';
import { jsPDF } from 'jspdf';
import InquiryModal from '@/components/public/InquiryModal';
import AITripPlanner from '@/components/public/AITripPlanner';

// Simulated Weather Data
const weatherData = {
  Srinagar: { temp: "14°C", condition: "Partly Cloudy", icon: "⛅" },
  Gulmarg: { temp: "2°C", condition: "Heavy Snow", icon: "❄️" },
  Pahalgam: { temp: "8°C", condition: "Sunny", icon: "☀️" },
  Sonamarg: { temp: "5°C", condition: "Clear Cold", icon: "🌤️" }
};

// Multilingual Mock Content
const translations: Record<string, Record<string, string>> = {
  EN: {
    heroTitle: "Experience Kashmir Like Never Before",
    heroSub: "Luxury Kashmir Tour Packages, Hotels, Houseboats, Private Transport, Honeymoon Tours, Family Holidays & Customized Travel Experiences by Local Experts.",
    exploreBtn: "Explore Packages",
    bookBtn: "Book Now",
    aboutTitle: "Welcome to Bilu G Travels Kashmir",
    aboutText: "We are a trusted Kashmir-based Destination Management Company (DMC) offering customized holidays, luxury hotels, houseboats, transportation, honeymoon tours, family vacations, trekking adventures, and corporate travel solutions. With local expertise and personalized service, we ensure unforgettable experiences in Kashmir.",
  },
  HI: {
    heroTitle: "कश्मीर का अनुभव करें जैसा पहले कभी नहीं किया",
    heroSub: "लक्जरी कश्मीर टूर पैकेज, होटल, हाउसबोट, निजी परिवहन, हनीमून टूर, पारिवारिक छुट्टियां और स्थानीय विशेषज्ञों द्वारा अनुकूलित यात्रा अनुभव।",
    exploreBtn: "पैकेज देखें",
    bookBtn: "अभी बुक करें",
    aboutTitle: "बिलू जी ट्रेवल्स कश्मीर में आपका स्वागत है",
    aboutText: "हम एक विश्वसनीय कश्मीर-आधारित डेस्टिनेशन मैनेजमेंट कंपनी (DMC) हैं जो अनुकूलित छुट्टियां, लक्जरी होटल, हाउसबोट, परिवहन, हनीمून टूर, पारिवारिक छुट्टियां, ट्रेकिंग रोमांच और कॉर्पोरेट यात्रा समाधान प्रदान करते हैं। स्थानीय विशेषज्ञता और व्यक्तिगत सेवा के साथ, हम कश्मीर में अविस्मरणीय अनुभव सुनिश्चित करते हैं।",
  },
  AR: {
    heroTitle: "تجربة كشمير كما لم يحدث من قبل",
    heroSub: "باقات جولات كشمير الفاخرة، الفنادق، المراكب العائمة، النقل الخاص، جولات شهر العسل، العطلات العائلية وتجارب السفر المخصصة من قبل الخبراء المحليين.",
    exploreBtn: "استكشف الباقات",
    bookBtn: "احجز الآن",
    aboutTitle: "مرحبًا بكم في بيلو جي ترافيلز كشمير",
    aboutText: "نحن شركة إدارة وجهات موثوقة مقرها كشمير (DMC) تقدم عطلات مخصصة، وفنادق فاخرة، ومراكب عائمة، ووسائل نقل، وجولات شهر العسل، وإجازات عائلية، ومغامرات الرحلات، وحلول سفر الشركات. مع الخبرة المحلية والخدمة الشخصية، نضمن تجارب لا تنسى في كشمير.",
  },
  ES: {
    heroTitle: "Experimente Cachemira Como Nunca Antes",
    heroSub: "Paquetes turísticos de lujo en Cachemira, hoteles, casas flotantes, transporte privado, lunas de miel, vacaciones familiares y experiencias personalizadas por expertos locales.",
    exploreBtn: "Explorar Paquetes",
    bookBtn: "Reservar Ahora",
    aboutTitle: "Bienvenido a Bilu G Travels Kashmir",
    aboutText: "Somos una empresa de gestión de destinos (DMC) de confianza con sede en Cachemira que ofrece vacaciones personalizadas, hoteles de lujo, casas flotantes, transporte, viajes de luna de miel, vacaciones familiares, aventuras de trekking y soluciones de viajes corporativos. Con experiencia local y servicio personalizado, aseguramos experiencias inolvidables.",
  }
};

export default function HomePage() {
  const [lang, setLang] = useState('EN');
  const [currency, setCurrency] = useState('INR');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<string | undefined>(undefined);
  const [hotelFilter, setHotelFilter] = useState('All');
  const [destModal, setDestModal] = useState<any>(null);
  const [serviceModal, setServiceModal] = useState<any>(null);
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);

  // Cost Calculator States
  const [calcNights, setCalcNights] = useState(5);
  const [calcGuests, setCalcGuests] = useState(2);
  const [calcHotelType, setCalcHotelType] = useState('Premium');
  const [calcVehicle, setCalcVehicle] = useState('Innova');

  // Load language and currency updates from dispatch events
  useEffect(() => {
    const syncSettings = () => {
      if (typeof window !== 'undefined') {
        setLang(localStorage.getItem('language') || 'EN');
        setCurrency(localStorage.getItem('currency') || 'INR');
      }
    };
    syncSettings();
    window.addEventListener('languageChanged', syncSettings);
    window.addEventListener('currencyChanged', syncSettings);
    return () => {
      window.removeEventListener('languageChanged', syncSettings);
      window.removeEventListener('currencyChanged', syncSettings);
    };
  }, []);

  const content = translations[lang] || translations.EN;

  const handleOpenInquiry = (pkgName?: string) => {
    setSelectedPackage(pkgName);
    setIsModalOpen(true);
  };

  // Live Currency Converter Rates
  const convertPrice = (inrPrice: number) => {
    const rates: Record<string, { symbol: string; rate: number }> = {
      INR: { symbol: '₹', rate: 1 },
      USD: { symbol: '$', rate: 0.012 },
      EUR: { symbol: '€', rate: 0.011 },
      AED: { symbol: 'د.إ', rate: 0.044 },
    };
    const cfg = rates[currency] || rates.INR;
    return `${cfg.symbol}${Math.round(inrPrice * cfg.rate).toLocaleString()}`;
  };

  // Service List
  const services = [
    { title: "Kashmir Tour Packages", icon: <Compass className="w-6 h-6 text-brand-gold" />, image: "https://images.unsplash.com/photo-1598305071114-175f32404099?auto=format&fit=crop&q=80&w=600", desc: "Expertly designed packages capturing all tourist highlights and offbeat paths." },
    { title: "Luxury Hotels", icon: <Award className="w-6 h-6 text-brand-gold" />, image: "https://images.unsplash.com/photo-1621350672013-149b5c3e6669?auto=format&fit=crop&q=80&w=600", desc: "Handpicked 4-Star & 5-Star luxury hotel accommodations in Srinagar, Gulmarg, and Pahalgam." },
    { title: "Houseboats", icon: <Heart className="w-6 h-6 text-brand-gold" />, image: "https://images.unsplash.com/photo-1616149175294-f286829767f4?auto=format&fit=crop&q=80&w=600", desc: "A premium floating heritage stay carved with Cedar woods on Dal Lake." },
    { title: "Taxi Services", icon: <CheckCircle2 className="w-6 h-6 text-brand-gold" />, image: "https://images.unsplash.com/photo-1610484507001-a18599484b3e?auto=format&fit=crop&q=80&w=600", desc: "Affordable and luxurious private car services covering all areas." },
    { title: "Airport Transfers", icon: <Clock className="w-6 h-6 text-brand-gold" />, image: "https://images.unsplash.com/photo-1505506005703-99757643e26f?auto=format&fit=crop&q=80&w=600", desc: "Punctual, luxury transfers to and from Srinagar Airport." },
    { title: "Honeymoon Packages", icon: <Heart className="w-6 h-6 text-brand-gold" />, image: "https://images.unsplash.com/photo-1598305071114-175f32404099?auto=format&fit=crop&q=80&w=600", desc: "Romantic, private setups, flower bed decorations, shikara rides and candlelight dinners." },
    { title: "Family Packages", icon: <Users className="w-6 h-6 text-brand-gold" />, image: "https://images.unsplash.com/photo-1621350672013-149b5c3e6669?auto=format&fit=crop&q=80&w=600", desc: "Comfortable, leisurely itineraries crafted keeping children and elders in mind." },
    { title: "Corporate Tours", icon: <Shield className="w-6 h-6 text-brand-gold" />, image: "https://images.unsplash.com/photo-1610484507001-a18599484b3e?auto=format&fit=crop&q=80&w=600", desc: "Smooth operational corporate retreats and meetings in the mountains." },
    { title: "Group Tours", icon: <Users className="w-6 h-6 text-brand-gold" />, image: "https://images.unsplash.com/photo-1505506005703-99757643e26f?auto=format&fit=crop&q=80&w=600", desc: "Affordable shared group departures with dedicated tour coordinators." },
    { title: "Trekking", icon: <Compass className="w-6 h-6 text-brand-gold" />, image: "https://images.unsplash.com/photo-1616149175294-f286829767f4?auto=format&fit=crop&q=80&w=600", desc: "Breathtaking trekking expeditions to Great Lakes, Tarsar Marsar and mountain passes." },
    { title: "Adventure Tours", icon: <Sparkles className="w-6 h-6 text-brand-gold" />, image: "https://images.unsplash.com/photo-1598305071114-175f32404099?auto=format&fit=crop&q=80&w=600", desc: "Skiing, paragliding, river rafting, and camping tours." },
    { title: "Customized Itineraries", icon: <Calculator className="w-6 h-6 text-brand-gold" />, image: "https://images.unsplash.com/photo-1621350672013-149b5c3e6669?auto=format&fit=crop&q=80&w=600", desc: "Flexible customized tours tailoring destinations, hotels, and fleets." }
  ];

  // Destination List
  const destinations = [
    { name: "Srinagar", image: "https://images.unsplash.com/photo-1598305071114-175f32404099?auto=format&fit=crop&q=80&w=600", desc: "The summer capital of J&K, famous for Shikaras on Dal Lake, Shalimar Mughal gardens, and premium floating markets." },
    { name: "Gulmarg", image: "https://images.unsplash.com/photo-1621350672013-149b5c3e6669?auto=format&fit=crop&q=80&w=600", desc: "Meadow of Flowers, home to one of the world's highest Gondola cable cars, premium golf courses, and deep winter skiing slopes." },
    { name: "Pahalgam", image: "https://images.unsplash.com/photo-1505506005703-99757643e26f?auto=format&fit=crop&q=80&w=600", desc: "Valley of Shepherds, famous for the pristine Lidder River, Aru Valley, Betaab Valley, and local horse treks." },
    { name: "Sonmarg", image: "https://images.unsplash.com/photo-1610484507001-a18599484b3e?auto=format&fit=crop&q=80&w=600", desc: "Meadow of Gold, known for the ancient Thajiwas Glacier, trekking paths, gateway to Ladakh, and white-river rafting." },
    { name: "Doodhpathri", image: "https://images.unsplash.com/photo-1616149175294-f286829767f4?auto=format&fit=crop&q=80&w=600", desc: "Valley of Milk, a lesser-known pine meadow with roaring streams, wooden bridges, and pristine shepherd trails." },
    { name: "Yusmarg", image: "https://images.unsplash.com/photo-1598305071114-175f32404099?auto=format&fit=crop&q=80&w=600", desc: "Meadow of Jesus, a highly serene offbeat valley offering absolute peace, deep forests, and scenic snow trails." },
    { name: "Gurez Valley", image: "https://images.unsplash.com/photo-1621350672013-149b5c3e6669?auto=format&fit=crop&q=80&w=600", desc: "A magnificent border region known for the towering Habba Khatoon peak, Kishan Ganga river, and authentic logwood cabins." },
    { name: "Bangus Valley", image: "https://images.unsplash.com/photo-1505506005703-99757643e26f?auto=format&fit=crop&q=80&w=600", desc: "An untouched eco-paradise nestled in North Kashmir with expansive green meadows, pine trees, and fresh streams." },
    { name: "Keran", image: "https://images.unsplash.com/photo-1610484507001-a18599484b3e?auto=format&fit=crop&q=80&w=600", desc: "A unique border village right on the Kishanganga river overlooking Neelum Valley, offering pristine local hospitality." },
    { name: "Lolab Valley", image: "https://images.unsplash.com/photo-1616149175294-f286829767f4?auto=format&fit=crop&q=80&w=600", desc: "The fruit bowl of Kashmir, an incredibly lush green valley filled with orchards, dense woods, and historical caves." },
    { name: "Aharbal", image: "https://images.unsplash.com/photo-1598305071114-175f32404099?auto=format&fit=crop&q=80&w=600", desc: "The Niagara Falls of Kashmir, featuring a dramatic waterfalls crash, nature hikes, and fishing trails." },
    { name: "Tulip Garden", image: "https://images.unsplash.com/photo-1621350672013-149b5c3e6669?auto=format&fit=crop&q=80&w=600", desc: "Asia's largest tulip terrace, blooming beautifully in March-April with millions of vibrant tulips." }
  ];

  // Tour Packages List
  const tourPackages = [
    { title: "4 Nights 5 Days Kashmir", image: "https://images.unsplash.com/photo-1598305071114-175f32404099?auto=format&fit=crop&q=80&w=800", duration: "4N / 5D", price: 13999, highlights: ["Srinagar Mughal Gardens", "Pahalgam Valley Stay", "Gulmarg Day Trip", "Sunset Shikara Ride"] },
    { title: "5 Nights 6 Days Kashmir", image: "https://images.unsplash.com/photo-1621350672013-149b5c3e6669?auto=format&fit=crop&q=80&w=800", duration: "5N / 6D", price: 16999, highlights: ["Luxury Houseboat Stay", "Srinagar Sightseeing", "Gulmarg Snow Hills", "Pahalgam River Lidder"] },
    { title: "6 Nights 7 Days Kashmir", image: "https://images.unsplash.com/photo-1505506005703-99757643e26f?auto=format&fit=crop&q=80&w=800", duration: "6N / 7D", price: 19999, highlights: ["Sonmarg Gold Glaciers", "Doodhpathri Pine Meadows", "Pahalgam Valley Trekking", "Dal Lake Floating Market"] },
    { title: "Honeymoon Special Package", image: "https://images.unsplash.com/photo-1616149175294-f286829767f4?auto=format&fit=crop&q=80&w=800", duration: "5N / 6D", price: 18999, highlights: ["Private Flower Bed Setup", "Candlelight Romantic Dinner", "Exclusive Shikara Ride", "Hotels in Srinagar & Gulmarg"] },
    { title: "Family Splendor Package", image: "https://images.unsplash.com/photo-1598305071114-175f32404099?auto=format&fit=crop&q=80&w=800", duration: "6N / 7D", price: 21999, highlights: ["Luxury Tempo Traveller Included", "All Meal plans cover", "Pahalgam Horse Trekking", "Shalimar Gardens picnic"] },
    { title: "Signature Luxury Tour", image: "https://images.unsplash.com/photo-1621350672013-149b5c3e6669?auto=format&fit=crop&q=80&w=800", duration: "7N / 8D", price: 34999, highlights: ["5-Star Khyber Gulmarg Stay", "Aman Resort style setups", "Luxury SUVs Crysta included", "Personal helper/porter"] },
    { title: "Winter Snow Special", image: "https://images.unsplash.com/photo-1505506005703-99757643e26f?auto=format&fit=crop&q=80&w=800", duration: "5N / 6D", price: 17499, highlights: ["Sledge & Ski rentals included", "Heated luxury transport", "Gulmarg snow Gondola pass", "Heated hotel stays"] },
    { title: "Spring Tulip Festival", image: "https://images.unsplash.com/photo-1610484507001-a18599484b3e?auto=format&fit=crop&q=80&w=800", duration: "4N / 5D", price: 14500, highlights: ["Asia Tulip terrace VIP entry", "Srinagar local food trails", "Dal Lake Houseboat stay", "Private taxi guide"] },
    { title: "Himalayan Adventure Trek", image: "https://images.unsplash.com/photo-1616149175294-f286829767f4?auto=format&fit=crop&q=80&w=800", duration: "8N / 9D", price: 26999, highlights: ["High-altitude base camping", "Experienced local guides", "All logistics & meal setups", "Great Lakes route permits"] }
  ];

  // Hotel List
  const hotels = [
    { name: "The Khyber Himalayan Resort", class: "5-Star", location: "Gulmarg", amenities: ["Spa", "Heated Pool", "Central Heating", "Ski-In/Ski-Out"], image: "https://images.unsplash.com/photo-1621350672013-149b5c3e6669?auto=format&fit=crop&q=80&w=600" },
    { name: "Taj Lake Palace Kashmir", class: "5-Star", location: "Srinagar", amenities: ["Infinity View", "Royal Dining", "Houseboat access", "Premium Butler"], image: "https://images.unsplash.com/photo-1598305071114-175f32404099?auto=format&fit=crop&q=80&w=600" },
    { name: "Radisson Blu Srinagar", class: "Luxury", location: "Srinagar", amenities: ["Gym", "Wifi", "Central Heating", "Premium Restaurant"], image: "https://images.unsplash.com/photo-1505506005703-99757643e26f?auto=format&fit=crop&q=80&w=600" },
    { name: "Grand Mumtaz Pahalgam", class: "Premium", location: "Pahalgam", amenities: ["Lidder view", "Hot Water", "Kashmiri Wazwan", "Garden"], image: "https://images.unsplash.com/photo-1610484507001-a18599484b3e?auto=format&fit=crop&q=80&w=600" },
    { name: "Pine N Peak Resort", class: "Luxury", location: "Pahalgam", amenities: ["Lidder view", "Heated Rooms", "Bonfire deck", "Play Area"], image: "https://images.unsplash.com/photo-1616149175294-f286829767f4?auto=format&fit=crop&q=80&w=600" },
    { name: "Hotel Highlands Park", class: "Premium", location: "Gulmarg", amenities: ["Historic Lounge", "Bar", "Ski Rentals", "Wood fire"], image: "https://images.unsplash.com/photo-1598305071114-175f32404099?auto=format&fit=crop&q=80&w=600" },
    { name: "Royal Palace Residency", class: "Deluxe", location: "Srinagar", amenities: ["Mountain View", "Tea Maker", "Free Wifi", "Room Service"], image: "https://images.unsplash.com/photo-1621350672013-149b5c3e6669?auto=format&fit=crop&q=80&w=600" },
    { name: "Green Heights Lodge", class: "Budget", location: "Sonmarg", amenities: ["Hot Water", "Simple Rooms", "Local food", "Parking"], image: "https://images.unsplash.com/photo-1505506005703-99757643e26f?auto=format&fit=crop&q=80&w=600" }
  ];

  // Filtered Hotels
  const filteredHotels = useMemo(() => {
    if (hotelFilter === 'All') return hotels;
    return hotels.filter(h => h.class === hotelFilter);
  }, [hotelFilter]);

  // Houseboat Slider States
  const houseboats = [
    { name: "Royal Palace Group of Houseboats", image: "https://images.unsplash.com/photo-1616149175294-f286829767f4?auto=format&fit=crop&q=80&w=800", rating: 5.0, rooms: "Luxury 3/4 Bedroom", location: "Dal Lake Front" },
    { name: "Kashmir Heritage Floating Resort", image: "https://images.unsplash.com/photo-1598305071114-175f32404099?auto=format&fit=crop&q=80&w=800", rating: 4.9, rooms: "Premium Suite Rooms", location: "Nigeen Lake" },
    { name: "Signature Woodcraft Houseboat", image: "https://images.unsplash.com/photo-1621350672013-149b5c3e6669?auto=format&fit=crop&q=80&w=800", rating: 4.8, rooms: "Royal Honeymoon Suite", location: "Dal Lake Golden Meadow" }
  ];
  const [currentHb, setCurrentHb] = useState(0);

  // Vehicle Fleet
  const vehicles = [
    { name: "Toyota Innova Crysta", type: "Luxury SUV", capacity: "7 Guests", rate: "₹4,500/day", image: "https://images.unsplash.com/photo-1505506005703-99757643e26f?auto=format&fit=crop&q=80&w=500", desc: "The ultimate luxury traveler vehicle in Kashmir. Spacious, heavily heated, and perfectly smooth on mountain turns." },
    { name: "Premium SUV (Fortuner/Pajero)", type: "Luxury SUV", capacity: "6 Guests", rate: "₹6,500/day", image: "https://images.unsplash.com/photo-1610484507001-a18599484b3e?auto=format&fit=crop&q=80&w=500", desc: "Top-tier private off-road SUV. Suitable for luxury tours and rugged paths like Gurez and Lolab." },
    { name: "Force Urbania Luxury Edition", type: "Super Luxury Mini Bus", capacity: "12-17 Guests", rate: "₹9,500/day", image: "https://images.unsplash.com/photo-1616149175294-f286829767f4?auto=format&fit=crop&q=80&w=500", desc: "Ultra-modern premium transporter featuring luxury bucket seats, separate screens, individual AC vents, and massive trunk space." },
    { name: "Premium Sedan (Dezire/Etios)", type: "Standard Comfort", capacity: "4 Guests", rate: "₹3,200/day", image: "https://images.unsplash.com/photo-1598305071114-175f32404099?auto=format&fit=crop&q=80&w=500", desc: "Best-selling budget and deluxe family sedan. Perfect for city tours and airport transfers." },
    { name: "Luxury Mercedes-Benz / BMW", type: "Ultra-Luxury Lounge", capacity: "4 Guests", rate: "₹25,000/day", image: "https://images.unsplash.com/photo-1621350672013-149b5c3e6669?auto=format&fit=crop&q=80&w=500", desc: "VIP transport for wedding entries, corporate delegates, and high-net-worth guests." }
  ];

  // Cost Calculator Formula
  const calculatedCost = useMemo(() => {
    let perNightHotelRate = 3000;
    if (calcHotelType === 'Deluxe') perNightHotelRate = 5000;
    if (calcHotelType === 'Premium') perNightHotelRate = 8000;
    if (calcHotelType === 'Luxury') perNightHotelRate = 12000;
    if (calcHotelType === '5-Star') perNightHotelRate = 22000;

    let vehicleDailyRate = 3200;
    if (calcVehicle === 'SUV') vehicleDailyRate = 4500;
    if (calcVehicle === 'Innova') vehicleDailyRate = 5000;
    if (calcVehicle === 'Urbania') vehicleDailyRate = 9500;

    const baseLodging = perNightHotelRate * calcNights * Math.ceil(calcGuests / 2);
    const transportTotal = vehicleDailyRate * (calcNights + 1);
    const taxAndService = 0.05 * (baseLodging + transportTotal);
    return Math.round(baseLodging + transportTotal + taxAndService);
  }, [calcNights, calcGuests, calcHotelType, calcVehicle]);

  // Download Branded Itinerary PDF Helper
  const downloadItineraryPDF = () => {
    try {
      const doc = new jsPDF();

      // Branded Header
      doc.setFillColor(13, 59, 102); // brand-navy / Deep Royal Blue
      doc.rect(0, 0, 210, 40, 'F');

      doc.setTextColor(212, 175, 55); // brand-gold / Luxury Gold
      doc.setFont('serif', 'bold');
      doc.setFontSize(22);
      doc.text("BILU G TRAVELS KASHMIR", 15, 18);

      doc.setTextColor(255, 255, 255);
      doc.setFont('sans', 'normal');
      doc.setFontSize(9);
      doc.text("BESPOKE LUXURY ITINERARY & COST PROPOSAL", 15, 26);
      doc.text("Owner: Javid Farooq | Email: bilugtourtravels1121@gmail.com | Phone: +91 6006070550", 15, 32);

      // Client Details
      doc.setTextColor(34, 34, 34);
      doc.setFont('sans', 'bold');
      doc.setFontSize(12);
      doc.text("Bespoke Custom Trip Details:", 15, 55);

      doc.setFont('sans', 'normal');
      doc.setFontSize(10);
      doc.text(`• Duration Stay: ${calcNights} Nights / ${calcNights + 1} Days`, 15, 65);
      doc.text(`• Guest Count: ${calcGuests} Adults`, 15, 73);
      doc.text(`• Hotel Standard: ${calcHotelType} Category Stays`, 15, 81);
      doc.text(`• Fleet Assigned: Private Toyota ${calcVehicle} / SUV`, 15, 89);

      // Cost Box
      doc.setFillColor(245, 247, 250);
      doc.rect(15, 100, 180, 25, 'F');
      doc.setFont('sans', 'bold');
      doc.setFontSize(11);
      doc.setTextColor(13, 59, 102);
      doc.text("TOTAL CONTRACT ESTIMATE (INR):", 20, 110);
      doc.setFontSize(16);
      doc.setTextColor(212, 175, 55);
      doc.text(convertPrice(calculatedCost), 20, 118);

      // Route breakdown
      doc.setTextColor(34, 34, 34);
      doc.setFont('sans', 'bold');
      doc.setFontSize(12);
      doc.text("Standard Luxury Route Itinerary Breakdown:", 15, 140);

      doc.setFont('sans', 'normal');
      doc.setFontSize(9);
      const days = [
        "Day 1: Srinagar Airport Arrival - Warm Kashmiri welcome, Luxury Houseboat stay & Shikara ride.",
        "Day 2: Srinagar to Gulmarg - Snow gondola ride, skiing slopes, stay in heated mountain resort.",
        "Day 3: Gulmarg to Pahalgam - Beautiful drive along Lidder river, local pine woods walk.",
        "Day 4: Pahalgam Valleys - Scenic horseback tours to Betaab valley, Aru & Chandanwari.",
        "Day 5: Pahalgam to Srinagar - Souvenir shopping, Old Heritage bridge walk, dinner at Dal lake.",
        "Day 6: Srinagar Airport Dropoff - Goodbye to the paradise on earth!"
      ];

      let yOffset = 150;
      days.slice(0, calcNights + 1).forEach((day) => {
        doc.text(day, 15, yOffset, { maxWidth: 180 });
        yOffset += 12;
      });

      // Terms Footer
      doc.setFillColor(17, 17, 17);
      doc.rect(0, 275, 210, 25, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(8);
      doc.text("Thank you for choosing Bilu G Travels. Please share this PDF on WhatsApp +916006070550 to book.", 15, 285);

      doc.save(`BiluG_Travels_Kashmir_Bespoke_Itinerary.pdf`);
    } catch (e) {
      console.error("PDF generation failed:", e);
    }
  };

  return (
    <div className="relative bg-white dark:bg-zinc-950 text-[#222222] dark:text-slate-100 transition-colors duration-500">

      {/* ----------------- HERO SECTION ----------------- */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <motion.img
            initial={{ scale: 1.15 }}
            animate={{ scale: 1.02 }}
            transition={{ duration: 15, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
            src="https://images.unsplash.com/photo-1598305071114-175f32404099?auto=format&fit=crop&q=80&w=2000"
            alt="Kashmir Paradise Dal Lake"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px]"></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto pt-20">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
          >
            <span className="inline-block px-5 py-2 mb-6 rounded-full bg-brand-gold/15 backdrop-blur-md border border-brand-gold/30 text-brand-gold text-[10px] font-display font-bold uppercase tracking-[0.3em]">
              👑 Bilu G Travels Luxury Experience
            </span>
            <h1 className="text-4xl md:text-7xl lg:text-8xl font-serif font-black text-white mb-8 tracking-wide leading-tight">
              {content.heroTitle}
            </h1>
            <p className="text-sm md:text-lg text-slate-200 mb-12 max-w-3xl mx-auto font-medium leading-relaxed font-sans">
              {content.heroSub}
            </p>

            {/* Premium CTA Buttons */}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-14">
              <Link
                href="/tour-packages"
                className="w-full sm:w-auto h-14 px-8 rounded-full bg-brand-gold text-brand-navy hover:bg-white transition-all shadow-xl font-display font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2"
              >
                {content.exploreBtn} <ArrowRight className="w-4 h-4" />
              </Link>
              <button
                onClick={() => handleOpenInquiry()}
                className="w-full sm:w-auto h-14 px-8 rounded-full border-2 border-white text-white hover:bg-white hover:text-brand-navy transition-all font-display font-black uppercase tracking-widest text-xs flex items-center justify-center"
              >
                {content.bookBtn}
              </button>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2 cursor-pointer opacity-80 hover:opacity-100 transition-opacity">
              <p className="text-[9px] font-display font-bold text-white uppercase tracking-[0.25em]">Discover Paradise</p>
              <div className="w-[18px] h-[32px] rounded-full border-2 border-brand-gold/50 flex justify-center p-1.5">
                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  className="w-[3px] h-[6px] bg-brand-gold rounded-full"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ----------------- SECTION 1: ABOUT US ----------------- */}
      <section className="py-24 border-b border-slate-100 dark:border-zinc-900 bg-white dark:bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative rounded-[2.5rem] overflow-hidden shadow-2xl h-[450px] border border-brand-gold/15"
            >
              <img
                src="https://images.unsplash.com/photo-1616149175294-f286829767f4?auto=format&fit=crop&q=80&w=1000"
                alt="Bilu G Kashmir Luxury Lodging"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/60 to-transparent"></div>
              <div className="absolute bottom-8 left-8">
                <p className="text-brand-gold text-[10px] font-display font-black uppercase tracking-[0.2em] mb-1">DMC Headed by Local Experts</p>
                <h4 className="text-xl font-serif font-bold text-white">Owner: Javid Farooq</h4>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <span className="text-brand-gold font-display font-bold uppercase tracking-widest text-xs block">Exclusive Heritage</span>
              <h2 className="text-3xl md:text-5xl font-serif font-black text-brand-navy dark:text-white tracking-wide">
                {content.aboutTitle}
              </h2>
              <div className="h-1 w-20 bg-brand-gold rounded"></div>
              <p className="text-slate-500 dark:text-slate-400 text-sm md:text-base leading-relaxed font-sans">
                {content.aboutText}
              </p>
              <div className="pt-4 grid grid-cols-2 gap-4">
                <div className="border border-slate-100 dark:border-zinc-800 p-4 rounded-2xl bg-slate-50/50 dark:bg-zinc-900/30">
                  <h4 className="text-brand-gold font-serif font-black text-xl mb-1">Customized</h4>
                  <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Tailored luxury tours</p>
                </div>
                <div className="border border-slate-100 dark:border-zinc-800 p-4 rounded-2xl bg-slate-50/50 dark:bg-zinc-900/30">
                  <h4 className="text-brand-gold font-serif font-black text-xl mb-1">Local Lead</h4>
                  <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Unmatched mountain guide</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ----------------- SECTION 2: OUR SERVICES ----------------- */}
      <section className="py-24 bg-slate-50/50 dark:bg-zinc-900/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-brand-gold font-display font-bold uppercase tracking-widest text-xs mb-3 block">What We Offer</span>
            <h2 className="text-3xl md:text-5xl font-serif font-black text-brand-navy dark:text-white tracking-wide">Our Premium Offerings</h2>
            <div className="h-1 w-20 bg-brand-gold rounded mx-auto mt-4"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((srv, index) => (
              <motion.div
                key={srv.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="group bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800/80 rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl transition-all flex flex-col justify-between"
              >
                <div className="relative h-44 overflow-hidden">
                  <img src={srv.image} alt={srv.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute top-4 left-4 bg-brand-navy/90 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/10 flex items-center justify-center text-brand-gold shadow">
                    {srv.icon}
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-base font-serif font-bold text-brand-navy dark:text-slate-100 group-hover:text-brand-gold transition-colors mb-2">{srv.title}</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-3">{srv.desc}</p>
                  </div>
                  <button
                    onClick={() => setServiceModal(srv)}
                    className="mt-6 text-[10px] font-display font-black uppercase tracking-widest text-brand-navy dark:text-slate-300 hover:text-brand-gold flex items-center gap-1.5 self-start group/btn"
                  >
                    Learn More <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1.5 transition-transform" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ----------------- SECTION 3: POPULAR DESTINATIONS ----------------- */}
      <section className="py-24 bg-white dark:bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-brand-gold font-display font-bold uppercase tracking-widest text-xs mb-3 block">Wanderlust Chronicles</span>
            <h2 className="text-3xl md:text-5xl font-serif font-black text-brand-navy dark:text-white tracking-wide">Popular Destinations</h2>
            <div className="h-1 w-20 bg-brand-gold rounded mx-auto mt-4"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {destinations.map((dest, idx) => (
              <motion.div
                key={dest.name}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                onClick={() => setDestModal(dest)}
                className="group relative h-72 rounded-[2rem] overflow-hidden shadow-md cursor-pointer border border-slate-100 dark:border-zinc-800"
              >
                <img src={dest.image} alt={dest.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-115 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/90 via-black/20 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="text-brand-gold text-[9px] font-display font-black uppercase tracking-widest mb-1.5 block">Kashmir Jewel</span>
                  <h4 className="text-lg font-serif font-black text-white mb-2">{dest.name}</h4>
                  <div className="flex items-center text-white/70 hover:text-brand-gold text-[10px] font-display font-bold uppercase tracking-wider gap-1 group-hover:translate-x-1 transition-all">
                    Explore Valley <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ----------------- AI TRIP PLANNER ----------------- */}
      <AITripPlanner />

      {/* ----------------- SECTION 4: TOUR PACKAGES ----------------- */}
      <section className="py-24 bg-slate-50/50 dark:bg-zinc-900/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row justify-between items-end mb-16 gap-4">
            <div>
              <span className="text-brand-gold font-display font-bold uppercase tracking-widest text-xs mb-3 block">Premium Pricing</span>
              <h2 className="text-3xl md:text-5xl font-serif font-black text-brand-navy dark:text-white tracking-wide">Curated Tour Packages</h2>
              <div className="h-1 w-20 bg-brand-gold rounded mt-4"></div>
            </div>
            <Link href="/tour-packages" className="group font-display font-black uppercase tracking-widest text-[11px] text-brand-navy dark:text-slate-300 hover:text-brand-gold flex items-center gap-2">
              All Packages <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {tourPackages.map((pkg) => (
              <motion.div
                key={pkg.title}
                whileHover={{ y: -8 }}
                className="group bg-white dark:bg-zinc-900 rounded-[2.5rem] overflow-hidden border border-slate-100 dark:border-zinc-800 shadow-sm hover:shadow-xl transition-all"
              >
                <div className="relative h-64 overflow-hidden">
                  <img src={pkg.image} alt={pkg.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <span className="absolute top-4 left-4 bg-white/95 dark:bg-zinc-900/95 backdrop-blur px-3.5 py-1.5 rounded-full text-[9px] font-display font-black uppercase tracking-widest text-brand-navy dark:text-brand-gold shadow">
                    {pkg.duration}
                  </span>
                  <span className="absolute top-4 right-4 bg-brand-gold text-brand-navy px-3.5 py-1.5 rounded-full text-[9px] font-display font-black uppercase tracking-widest shadow">
                    20% OFF
                  </span>
                </div>
                <div className="p-8">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-serif font-black text-brand-navy dark:text-white leading-tight group-hover:text-brand-gold transition-colors">{pkg.title}</h3>
                    <span className="flex items-center gap-1 bg-brand-navy text-brand-gold px-2 py-0.5 rounded text-[9px] font-display font-black">
                      <Star className="w-3 h-3" fill="#D4AF37" /> 5.0
                    </span>
                  </div>
                  <div className="space-y-2 mb-8">
                    {pkg.highlights.map((hl) => (
                      <div key={hl} className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                        <CheckCircle2 className="w-3.5 h-3.5 text-brand-gold shrink-0" />
                        <span className="line-clamp-1">{hl}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-between pt-6 border-t border-slate-100 dark:border-zinc-800">
                    <div>
                      <p className="text-[10px] font-display font-bold uppercase tracking-widest text-slate-400 mb-1">Starting Price</p>
                      <p className="text-xl font-serif font-black text-brand-navy dark:text-white">{convertPrice(pkg.price)}</p>
                    </div>
                    <button
                      onClick={() => handleOpenInquiry(pkg.title)}
                      className="bg-brand-navy text-white px-5 py-3 rounded-xl text-[10px] font-display font-black uppercase tracking-widest hover:bg-brand-gold hover:text-brand-navy transition-all"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ----------------- SECTION 5: HOTELS ----------------- */}
      <section className="py-24 bg-white dark:bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-6">
            <div>
              <span className="text-brand-gold font-display font-bold uppercase tracking-widest text-xs mb-3 block">Luxury Lodges</span>
              <h2 className="text-3xl md:text-5xl font-serif font-black text-brand-navy dark:text-white tracking-wide">Elite Hotel Stays</h2>
              <div className="h-1 w-20 bg-brand-gold rounded mt-4"></div>
            </div>
            {/* Class Filters */}
            <div className="flex flex-wrap gap-2">
              {['All', 'Budget', 'Deluxe', 'Premium', 'Luxury', '5-Star'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setHotelFilter(cat)}
                  className={`px-5 py-2 rounded-full text-[10px] font-display font-black uppercase tracking-widest transition-all ${
                    hotelFilter === cat
                      ? 'bg-brand-navy text-white dark:bg-brand-gold dark:text-brand-navy shadow'
                      : 'bg-slate-100 dark:bg-zinc-900 text-slate-500 hover:bg-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredHotels.map((hotel) => (
              <div key={hotel.name} className="group bg-slate-50/50 dark:bg-zinc-900/30 rounded-[2rem] border border-slate-100 dark:border-zinc-800/80 overflow-hidden shadow-sm flex flex-col justify-between">
                <div className="relative h-48 overflow-hidden">
                  <img src={hotel.image} alt={hotel.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <span className="absolute top-4 left-4 bg-brand-navy text-brand-gold px-2.5 py-1 rounded-lg text-[9px] font-display font-black uppercase tracking-widest shadow">
                    {hotel.class}
                  </span>
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[9px] font-display font-bold uppercase tracking-widest text-brand-gold block mb-1 flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> {hotel.location}
                    </span>
                    <h3 className="text-base font-serif font-bold text-brand-navy dark:text-white leading-tight mb-4 group-hover:text-brand-gold transition-colors">{hotel.name}</h3>
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {hotel.amenities.map(a => (
                        <span key={a} className="text-[9px] bg-white dark:bg-zinc-800 border dark:border-zinc-700 text-slate-500 px-2 py-0.5 rounded">{a}</span>
                      ))}
                    </div>
                  </div>
                  <button
                    onClick={() => handleOpenInquiry(`Hotel Stay: ${hotel.name}`)}
                    className="w-full bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 group-hover:border-brand-gold text-brand-navy dark:text-slate-300 group-hover:bg-brand-gold group-hover:text-brand-navy py-3.5 rounded-xl text-[10px] font-display font-black uppercase tracking-widest transition-all"
                  >
                    Enquire Booking
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ----------------- SECTION 6: HOUSEBOATS ----------------- */}
      <section className="py-24 bg-brand-navy text-white overflow-hidden relative border-t border-brand-gold/15">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-900 via-brand-navy to-brand-navy opacity-90 z-0"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <span className="text-brand-gold font-display font-bold uppercase tracking-widest text-xs mb-3 block">Floating Paradises</span>
            <h2 className="text-3xl md:text-5xl font-serif font-black tracking-wide text-white">Luxury Houseboat Retreats</h2>
            <div className="h-1 w-20 bg-brand-gold rounded mx-auto mt-4"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Slider Controls Info */}
            <div className="lg:col-span-5 space-y-6">
              <span className="text-brand-gold text-xs font-display font-black uppercase tracking-widest">Dal Lake Heritage</span>
              <h3 className="text-2xl md:text-3xl font-serif font-bold text-white leading-tight">{houseboats[currentHb].name}</h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Hand-curated cedar houseboats on Srinagar's pristine Dal Lake. Fitted with royal Persian carpets, ornate hand-carvings, dining rooms, 24/7 warm water, heated blankets, and traditional shikara docking bridges.
              </p>
              <div className="flex gap-4 items-center">
                <span className="text-xs bg-brand-gold/25 border border-brand-gold/30 px-3 py-1 text-brand-gold font-display font-bold uppercase rounded">
                  {houseboats[currentHb].rooms}
                </span>
                <span className="text-xs bg-white/10 px-3 py-1 text-slate-200 font-display font-bold uppercase rounded flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 text-brand-gold" fill="#D4AF37" /> {houseboats[currentHb].rating}
                </span>
              </div>
              <div className="pt-6 flex gap-3">
                <button
                  onClick={() => setCurrentHb(prev => (prev === 0 ? houseboats.length - 1 : prev - 1))}
                  className="w-12 h-12 rounded-full border border-white/20 hover:border-brand-gold hover:text-brand-gold flex items-center justify-center transition-all"
                >
                  ←
                </button>
                <button
                  onClick={() => setCurrentHb(prev => (prev === houseboats.length - 1 ? 0 : prev + 1))}
                  className="w-12 h-12 rounded-full border border-white/20 hover:border-brand-gold hover:text-brand-gold flex items-center justify-center transition-all"
                >
                  →
                </button>
              </div>
            </div>

            {/* Slider Visual Image */}
            <div className="lg:col-span-7">
              <div className="relative rounded-[3rem] overflow-hidden shadow-2xl h-[400px] border border-brand-gold/20">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentHb}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.6 }}
                    src={houseboats[currentHb].image}
                    alt={houseboats[currentHb].name}
                    className="w-full h-full object-cover"
                  />
                </AnimatePresence>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <button
                  onClick={() => handleOpenInquiry(`Houseboat Stay: ${houseboats[currentHb].name}`)}
                  className="absolute bottom-8 right-8 bg-brand-gold text-brand-navy px-8 py-4 rounded-full font-display font-black text-xs uppercase tracking-widest shadow-xl hover:bg-white transition-all"
                >
                  Book Stay Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------- SECTION 7: TRANSPORT ----------------- */}
      <section className="py-24 bg-white dark:bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-brand-gold font-display font-bold uppercase tracking-widest text-xs mb-3 block">Luxury Fleet</span>
            <h2 className="text-3xl md:text-5xl font-serif font-black text-brand-navy dark:text-white tracking-wide">Premium Taxi & Private Fleet</h2>
            <div className="h-1 w-20 bg-brand-gold rounded mx-auto mt-4"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {vehicles.map((vh) => (
              <div key={vh.name} className="group bg-slate-50/50 dark:bg-zinc-900/30 rounded-[2.5rem] border border-slate-100 dark:border-zinc-800/80 overflow-hidden shadow-sm hover:shadow-xl transition-all flex flex-col justify-between">
                <div className="relative h-56 overflow-hidden">
                  <img src={vh.image} alt={vh.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <span className="absolute top-4 left-4 bg-white/95 dark:bg-zinc-900/95 px-3 py-1 text-brand-navy dark:text-brand-gold rounded-full text-[9px] font-display font-black uppercase tracking-widest shadow">
                    {vh.type}
                  </span>
                </div>
                <div className="p-8 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-serif font-bold text-brand-navy dark:text-white mb-2 leading-tight group-hover:text-brand-gold transition-colors">{vh.name}</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-6 line-clamp-3">{vh.desc}</p>
                    <div className="flex justify-between text-xs font-bold border-b border-slate-100 dark:border-zinc-800 pb-3 mb-6">
                      <span className="text-slate-400">Max Capacity:</span>
                      <span className="text-brand-navy dark:text-brand-gold">{vh.capacity}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[10px] font-display font-bold text-slate-400 uppercase tracking-widest">Standard rate</p>
                      <p className="text-base font-serif font-black text-brand-navy dark:text-white">{vh.rate}</p>
                    </div>
                    <button
                      onClick={() => handleOpenInquiry(`Vehicle Rental: ${vh.name}`)}
                      className="bg-brand-navy text-white px-5 py-3 rounded-xl text-[9px] font-display font-black uppercase tracking-widest hover:bg-brand-gold hover:text-brand-navy transition-all"
                    >
                      Enquire Fleet
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ----------------- TOUR COST CALCULATOR ----------------- */}
      <section className="py-24 bg-slate-50/50 dark:bg-zinc-900/10 border-t border-slate-100 dark:border-zinc-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-brand-gold font-display font-bold uppercase tracking-widest text-xs mb-3 block">Interactive Estimations</span>
            <h2 className="text-3xl md:text-4xl font-serif font-black text-brand-navy dark:text-white tracking-wide">Tour Cost Estimator</h2>
            <p className="text-slate-400 text-xs font-medium mt-2">Adjust lodging nights, travelers and fleet class for instant estimates.</p>
            <div className="h-1 w-20 bg-brand-gold rounded mx-auto mt-4"></div>
          </div>

          <div className="bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800 p-8 md:p-12 rounded-[3.5rem] shadow-2xl grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-6">
              {/* Nights Selector */}
              <div className="space-y-2">
                <label className="text-[10px] font-display font-black uppercase text-slate-400 tracking-widest">Nights Stay</label>
                <div className="flex gap-2">
                  {[3, 4, 5, 6, 7, 8].map(n => (
                    <button
                      key={n}
                      onClick={() => setCalcNights(n)}
                      className={`w-10 h-10 rounded-lg text-xs font-black transition-all ${calcNights === n ? 'bg-brand-navy text-white dark:bg-brand-gold dark:text-brand-navy' : 'bg-slate-50 dark:bg-zinc-800'}`}
                    >
                      {n}
                    </button>
                  ))}
                </div>
              </div>

              {/* Guests Selector */}
              <div className="space-y-2">
                <label className="text-[10px] font-display font-black uppercase text-slate-400 tracking-widest">Adult Guests</label>
                <div className="flex gap-2">
                  {[1, 2, 4, 6, 8, 10].map(g => (
                    <button
                      key={g}
                      onClick={() => setCalcGuests(g)}
                      className={`w-10 h-10 rounded-lg text-xs font-black transition-all ${calcGuests === g ? 'bg-brand-navy text-white dark:bg-brand-gold dark:text-brand-navy' : 'bg-slate-50 dark:bg-zinc-800'}`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>

              {/* Hotel class Selector */}
              <div className="space-y-2">
                <label className="text-[10px] font-display font-black uppercase text-slate-400 tracking-widest font-bold block mb-1">Accommodation Standard</label>
                <select
                  value={calcHotelType}
                  onChange={(e) => setCalcHotelType(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-zinc-800 border dark:border-zinc-700 p-3.5 rounded-xl text-xs font-bold outline-none"
                >
                  <option value="Budget">Budget Lodge</option>
                  <option value="Deluxe">Deluxe Comfort (3-Star)</option>
                  <option value="Premium">Premium Heritage (4-Star)</option>
                  <option value="Luxury">Luxury Resort (5-Star)</option>
                  <option value="5-Star">Ultra-Luxury Presidential</option>
                </select>
              </div>

              {/* Vehicle class Selector */}
              <div className="space-y-2">
                <label className="text-[10px] font-display font-black uppercase text-slate-400 tracking-widest font-bold block mb-1">Private Transport Fleet</label>
                <select
                  value={calcVehicle}
                  onChange={(e) => setCalcVehicle(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-zinc-800 border dark:border-zinc-700 p-3.5 rounded-xl text-xs font-bold outline-none"
                >
                  <option value="Sedan">Sedan Taxi (Comfort)</option>
                  <option value="SUV">Standard SUV (Innova/Tavera)</option>
                  <option value="Innova">Luxury Innova Crysta SUV</option>
                  <option value="Urbania">Force Urbania (12+ Pax)</option>
                </select>
              </div>
            </div>

            {/* Price Result card */}
            <div className="bg-brand-navy text-white p-8 rounded-[2.5rem] flex flex-col justify-between border border-brand-gold/20 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-5"><Calculator className="w-44 h-44" /></div>
              <div className="relative z-10 space-y-4">
                <p className="text-brand-gold font-display font-black text-xs uppercase tracking-widest">Bespoke Estimate</p>
                <h4 className="text-4xl md:text-5xl font-serif font-black">{convertPrice(calculatedCost)}</h4>
                <p className="text-[10px] text-slate-400 leading-relaxed">
                  *Includes local J&K taxation, all airport transfers, hotel breakfasts, premium driver allowances, and Dal Lake shikara rides.
                </p>
              </div>
              <div className="space-y-3 mt-8">
                <button
                  onClick={() => handleOpenInquiry(`Calculated estimate: ${calcNights} Nights, ${calcGuests} Guests, ${calcHotelType} Hotel, ${calcVehicle} Vehicle. Value: ${convertPrice(calculatedCost)}`)}
                  className="w-full bg-brand-gold text-brand-navy hover:bg-white py-4 rounded-xl font-display font-black text-xs uppercase tracking-widest transition-all"
                >
                  Request Custom Quote
                </button>
                <button
                  onClick={downloadItineraryPDF}
                  className="w-full bg-white/10 text-white hover:bg-white hover:text-brand-navy py-3.5 rounded-xl font-display font-bold text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 border border-white/20"
                >
                  <FileDown className="w-4 h-4" /> Download Branded PDF Itinerary
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------- SECTION 8: WHY CHOOSE US ----------------- */}
      <section className="py-24 bg-brand-navy text-white border-t border-brand-gold/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 text-center">
            <CounterCard label="Happy Guests" count="1,000+" desc="Bespoke luxury stays" />
            <CounterCard label="Years Experience" count="10+ Years" desc="Local expertise" />
            <CounterCard label="Ground Support" count="24×7" desc="Always on stand" />
            <CounterCard label="Local Experts" count="100%" desc="No middle commissions" />
            <CounterCard label="Customized Tours" count="100%" desc="Tailor your dreams" />
          </div>
        </div>
      </section>

      {/* ----------------- SECTION 9: GALLERY ----------------- */}
      <section className="py-24 bg-white dark:bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-brand-gold font-display font-bold uppercase tracking-widest text-xs mb-3 block">Visual Heaven</span>
            <h2 className="text-3xl md:text-5xl font-serif font-black text-brand-navy dark:text-white tracking-wide">Masonry Gallery</h2>
            <div className="h-1 w-20 bg-brand-gold rounded mx-auto mt-4"></div>
          </div>

          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {destinations.slice(0, 6).map((img, i) => (
              <div
                key={i}
                onClick={() => setLightboxImg(img.image)}
                className="relative group overflow-hidden rounded-[2.5rem] shadow-md border dark:border-zinc-800 cursor-pointer"
              >
                <img src={img.image} alt={img.name} className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-brand-gold/90 flex items-center justify-center text-brand-navy">
                    <Camera className="w-5 h-5" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxImg && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/90 p-4">
            <button onClick={() => setLightboxImg(null)} className="absolute top-6 right-6 text-white p-3 bg-white/10 hover:bg-white/20 rounded-full">
              <X className="w-6 h-6" />
            </button>
            <motion.img
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              src={lightboxImg}
              alt="Lightbox"
              className="max-w-full max-h-[85vh] object-contain rounded-2xl"
            />
          </div>
        )}
      </AnimatePresence>

      {/* ----------------- SECTION 10: TESTIMONIALS ----------------- */}
      <section className="py-24 bg-slate-50/50 dark:bg-zinc-900/10 border-t border-slate-100 dark:border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-brand-gold font-display font-bold uppercase tracking-widest text-xs mb-3 block">Google Reviews style</span>
            <h2 className="text-3xl md:text-5xl font-serif font-black text-brand-navy dark:text-white tracking-wide">Client Testimonials</h2>
            <div className="h-1 w-20 bg-brand-gold rounded mx-auto mt-4"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <TestimonialCard
              text="Our family vacation with Javid was incredible. Everything from the Crysta SUV to our stay at Pahalgam was seamless and highly luxurious."
              name="Pradeep Kulkarni"
              location="Mumbai, India"
            />
            <TestimonialCard
              text="Our honeymoon trip was flawless. The Dal Lake houseboat bedroom had stunning wood carvings, complete heating and delicious meals."
              name="Sweta & Rohan"
              location="Pune, India"
            />
            <TestimonialCard
              text="We booked a winter snow tour. Javid managed our Gondola tickets, winter boots and ski guide beforehand. Highly expert local service!"
              name="Sarah Jenkins"
              location="London, UK"
            />
          </div>
        </div>
      </section>

      {/* ----------------- SECTION 11: BLOG ----------------- */}
      <section className="py-24 bg-white dark:bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-brand-gold font-display font-bold uppercase tracking-widest text-xs mb-3 block">Travel Intel</span>
            <h2 className="text-3xl md:text-5xl font-serif font-black text-brand-navy dark:text-white tracking-wide">Himalayan Travel Diaries</h2>
            <div className="h-1 w-20 bg-brand-gold rounded mx-auto mt-4"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <BlogCard
              title="Gulmarg Snow Report: Fresh Accumulations"
              tag="Snow Updates"
              date="Nov 2024"
              image="https://images.unsplash.com/photo-1621350672013-149b5c3e6669?auto=format&fit=crop&q=80&w=600"
              desc="Fresh snowfall is recorded in Apharwat peak Gulmarg, attracting winter ski lovers. Read complete advisory here."
            />
            <BlogCard
              title="Is Gurez Valley accessible during winters?"
              tag="Travel Information"
              date="Oct 2024"
              image="https://images.unsplash.com/photo-1610484507001-a18599484b3e?auto=format&fit=crop&q=80&w=600"
              desc="Gurez valley passes receive heavy snow during December. Learn how Javid Farooq helps arrange winter heli-rides."
            />
            <BlogCard
              title="Srinagar Mughal Gardens Spring Bloom Guide"
              tag="Travel Tips"
              date="Sep 2024"
              image="https://images.unsplash.com/photo-1598305071114-175f32404099?auto=format&fit=crop&q=80&w=600"
              desc="Planning your spring escape? Here is the complete list of Mughal gardens and optimal blooming days for March-April."
            />
          </div>
        </div>
      </section>

      {/* ----------------- SECTION 12: CONTACT US ----------------- */}
      <section className="py-24 bg-slate-50/50 dark:bg-zinc-900/10 border-t border-slate-100 dark:border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="space-y-8">
              <div>
                <span className="text-brand-gold font-display font-bold uppercase tracking-widest text-xs mb-3 block">Luxury Reservation HQ</span>
                <h2 className="text-3xl md:text-5xl font-serif font-black text-brand-navy dark:text-white tracking-wide">Connect with Us</h2>
                <div className="h-1 w-20 bg-brand-gold rounded mt-4 mb-6"></div>
                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed font-sans">
                  Have questions about our signature tour packages, pricing options, or custom houseboat escapes? Speak with our local travel guides or visit our Srinagar headquarters today.
                </p>
              </div>

              {/* Weather Widget */}
              <div className="p-6 bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800 rounded-[2rem] shadow-xl">
                <div className="flex items-center gap-3 mb-4 text-brand-navy dark:text-brand-gold">
                  <CloudSun className="w-5 h-5" />
                  <p className="text-xs font-display font-black uppercase tracking-wider">Live Kashmir Weather Update</p>
                </div>
                <div className="grid grid-cols-4 gap-2 text-center">
                  {Object.entries(weatherData).map(([city, data]) => (
                    <div key={city} className="bg-slate-50 dark:bg-zinc-800/50 p-3 rounded-xl">
                      <p className="text-[10px] font-bold text-slate-400">{city}</p>
                      <p className="text-lg my-1">{data.icon}</p>
                      <p className="text-sm font-black text-brand-navy dark:text-white">{data.temp}</p>
                      <p className="text-[8px] text-slate-400 font-bold leading-none">{data.condition}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contacts */}
              <div className="space-y-4">
                <ContactInfoRow icon={<Phone className="text-brand-gold" />} label="Main Hotline" val="+91 60060 70550 / +91 78894 08220" />
                <ContactInfoRow icon={<Mail className="text-brand-gold" />} label="HQ Email" val="bilugtourtravels1121@gmail.com" />
                <ContactInfoRow icon={<MapPin className="text-brand-gold" />} label="Srinagar Office" val="Srinagar, Jammu & Kashmir, India - 190001" />
              </div>
            </div>

            {/* Google Map & Contact Form */}
            <div className="bg-white dark:bg-zinc-900 rounded-[3rem] p-8 md:p-12 border border-slate-100 dark:border-zinc-800 shadow-2xl relative overflow-hidden">
              <h3 className="text-xl font-serif font-black text-brand-navy dark:text-white mb-6">Enquire Online</h3>
              <form onSubmit={(e) => { e.preventDefault(); alert("Inquiry Sent successfully! Javid Farooq's team will contact you shortly."); }} className="space-y-4">
                <input type="text" required placeholder="Full Name" className="w-full bg-slate-50 dark:bg-zinc-800 border dark:border-zinc-700 p-4 rounded-xl text-xs font-bold focus:outline-none" />
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" required placeholder="Phone Number" className="bg-slate-50 dark:bg-zinc-800 border dark:border-zinc-700 p-4 rounded-xl text-xs font-bold focus:outline-none" />
                  <input type="email" required placeholder="Email" className="bg-slate-50 dark:bg-zinc-800 border dark:border-zinc-700 p-4 rounded-xl text-xs font-bold focus:outline-none" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" placeholder="Destination (Srinagar/Gulmarg)" className="bg-slate-50 dark:bg-zinc-800 border dark:border-zinc-700 p-4 rounded-xl text-xs font-bold focus:outline-none" />
                  <input type="date" className="bg-slate-50 dark:bg-zinc-800 border dark:border-zinc-700 p-4 rounded-xl text-xs font-bold focus:outline-none" />
                </div>
                <input type="number" placeholder="Number of Guests" className="w-full bg-slate-50 dark:bg-zinc-800 border dark:border-zinc-700 p-4 rounded-xl text-xs font-bold focus:outline-none" />
                <textarea rows={3} required placeholder="Your Special Requirements..." className="w-full bg-slate-50 dark:bg-zinc-800 border dark:border-zinc-700 p-4 rounded-xl text-xs font-bold focus:outline-none resize-none" />
                <button type="submit" className="w-full bg-brand-navy text-white py-4 rounded-xl font-display font-black text-xs uppercase tracking-widest hover:bg-brand-gold hover:text-brand-navy transition-all shadow-xl">
                  Submit Enquiry
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------- SERVICE DETAILS MODAL ----------------- */}
      <AnimatePresence>
        {serviceModal && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <div onClick={() => setServiceModal(null)} className="absolute inset-0 bg-brand-navy/60 backdrop-blur-sm"></div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative bg-white dark:bg-zinc-900 w-full max-w-xl rounded-[2.5rem] shadow-2xl p-8 overflow-hidden z-10 border dark:border-zinc-800"
            >
              <button onClick={() => setServiceModal(null)} className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 dark:bg-zinc-800 text-slate-400 hover:text-slate-600 transition-colors">
                <X className="w-5 h-5" />
              </button>
              <h3 className="text-2xl font-serif font-black text-brand-navy dark:text-white mb-4">{serviceModal.title}</h3>
              <img src={serviceModal.image} alt={serviceModal.title} className="w-full h-48 object-cover rounded-2xl mb-4" />
              <p className="text-slate-500 dark:text-slate-400 text-xs md:text-sm leading-relaxed mb-6">{serviceModal.desc}</p>
              <div className="flex gap-3">
                <button
                  onClick={() => { setServiceModal(null); handleOpenInquiry(serviceModal.title); }}
                  className="flex-1 bg-brand-navy text-white py-3.5 rounded-xl font-display font-black text-[10px] uppercase tracking-widest hover:bg-brand-gold hover:text-brand-navy transition-all"
                >
                  Book Service
                </button>
                <button
                  onClick={() => setServiceModal(null)}
                  className="px-6 border dark:border-zinc-700 rounded-xl text-[10px] font-display font-black uppercase tracking-widest text-slate-400"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ----------------- DESTINATION MODAL ----------------- */}
      <AnimatePresence>
        {destModal && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <div onClick={() => setDestModal(null)} className="absolute inset-0 bg-brand-navy/60 backdrop-blur-sm"></div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative bg-white dark:bg-zinc-900 w-full max-w-xl rounded-[2.5rem] shadow-2xl p-8 overflow-hidden z-10 border dark:border-zinc-800"
            >
              <button onClick={() => setDestModal(null)} className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 dark:bg-zinc-800 text-slate-400 hover:text-slate-600 transition-colors">
                <X className="w-5 h-5" />
              </button>
              <h3 className="text-2xl font-serif font-black text-brand-navy dark:text-white mb-4">{destModal.name}</h3>
              <img src={destModal.image} alt={destModal.name} className="w-full h-48 object-cover rounded-2xl mb-4" />
              <p className="text-slate-500 dark:text-slate-400 text-xs md:text-sm leading-relaxed mb-6">{destModal.desc}</p>
              <div className="flex gap-3">
                <button
                  onClick={() => { setDestModal(null); handleOpenInquiry(`Tour to: ${destModal.name}`); }}
                  className="flex-1 bg-brand-navy text-white py-3.5 rounded-xl font-display font-black text-[10px] uppercase tracking-widest hover:bg-brand-gold hover:text-brand-navy transition-all"
                >
                  Request Custom Tour
                </button>
                <button
                  onClick={() => setDestModal(null)}
                  className="px-6 border dark:border-zinc-700 rounded-xl text-[10px] font-display font-black uppercase tracking-widest text-slate-400"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <InquiryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        packageName={selectedPackage}
      />
    </div>
  );
}

// Subcomponents
function CounterCard({ label, count, desc }: any) {
  return (
    <div className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-brand-gold/20 transition-all flex flex-col justify-center items-center">
      <h4 className="text-2xl font-serif font-black text-brand-gold mb-1">{count}</h4>
      <p className="text-[10px] font-display font-bold uppercase tracking-wider text-white mb-1 leading-none">{label}</p>
      <span className="text-[9px] text-slate-400 leading-none">{desc}</span>
    </div>
  );
}

function TestimonialCard({ text, name, location }: any) {
  return (
    <div className="bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800 p-8 rounded-[2rem] shadow-sm hover:shadow-xl transition-all flex flex-col justify-between">
      <div>
        <div className="flex gap-1 text-brand-gold mb-4">
          {[...Array(5)].map((_, i) => <Star key={i} className="w-4.5 h-4.5" fill="#D4AF37" stroke="none" />)}
        </div>
        <p className="text-slate-600 dark:text-slate-400 text-xs md:text-sm leading-relaxed italic mb-6">"{text}"</p>
      </div>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-zinc-800 flex items-center justify-center text-xs font-black text-brand-navy dark:text-brand-gold">
          {name[0]}
        </div>
        <div>
          <p className="text-xs font-display font-black text-brand-navy dark:text-white leading-none">{name}</p>
          <span className="text-[10px] text-slate-400 leading-none font-medium">{location}</span>
        </div>
      </div>
    </div>
  );
}

function BlogCard({ title, tag, date, image, desc }: any) {
  return (
    <div className="group bg-slate-50/50 dark:bg-zinc-900/30 rounded-[2rem] border border-slate-100 dark:border-zinc-800/80 overflow-hidden shadow-sm flex flex-col justify-between">
      <div className="relative h-48 overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
        <span className="absolute top-4 left-4 bg-brand-gold text-brand-navy px-2.5 py-1 rounded-full text-[9px] font-display font-black uppercase tracking-widest shadow">
          {tag}
        </span>
      </div>
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <span className="text-[9px] font-display font-bold uppercase tracking-widest text-slate-400 block mb-1">{date}</span>
          <h3 className="text-base font-serif font-bold text-brand-navy dark:text-white leading-tight group-hover:text-brand-gold transition-colors mb-3">{title}</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-3 mb-6">{desc}</p>
        </div>
        <Link href="/blog" className="text-[10px] font-display font-black uppercase tracking-widest text-brand-navy dark:text-slate-300 hover:text-brand-gold flex items-center gap-1.5 self-start group/btn">
          Read Article <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1.5 transition-transform" />
        </Link>
      </div>
    </div>
  );
}

function ContactInfoRow({ icon, label, val }: any) {
  return (
    <div className="flex items-start gap-4">
      <div className="w-12 h-12 rounded-xl bg-slate-50 dark:bg-zinc-900 border dark:border-zinc-800 flex items-center justify-center shrink-0">
        {icon}
      </div>
      <div>
        <p className="text-[9px] font-display font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">{label}</p>
        <p className="text-sm font-display font-black text-brand-navy dark:text-white">{val}</p>
      </div>
    </div>
  );
}
