// src/lib/shopDataSeeder.ts
import { createClient } from '@/lib/supabase';
import { Shop } from '@/lib/types';

// Extended shop data with enrollment status
interface ShopWithEnrollment extends Shop {
  is_enrolled_mechanicsmatch?: boolean;
  enrollment_date?: string;
  subscription_tier?: 'free' | 'basic' | 'premium' | 'enterprise';
  featured_listing?: boolean;
}

// Comprehensive shop data for major US cities
export const shopSeedData: ShopWithEnrollment[] = [
  // Los Angeles, CA
  {
    id: "la-001",
    owner_id: "pending",
    name: "Elite Motor Works",
    description: "Specializing in high-performance vehicles and European imports. ASE certified technicians with over 15 years of experience in BMW, Mercedes, and Audi repairs.",
    address: "1234 Automotive Blvd",
    city: "Los Angeles",
    state: "CA",
    zip_code: "90210",
    phone: "(323) 555-0101",
    email: "info@elitemotorworks.com",
    website_url: "https://elitemotorworks.com",
    specialties: ["Performance Tuning", "European Imports", "BMW Specialist", "Mercedes Repair", "Engine Diagnostics"],
    certifications: ["ASE Certified", "BMW Technician", "Mercedes Certified"],
    is_verified: true,
    is_active: true,
    rating_average: 4.9,
    total_reviews: 127,
    latitude: 34.0522,
    longitude: -118.2437,
    is_enrolled_mechanicsmatch: true,
    enrollment_date: "2024-01-15",
    subscription_tier: "premium",
    featured_listing: true,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-15T00:00:00Z",
  },
  {
    id: "la-002",
    owner_id: "pending",
    name: "AutoCare Plus",
    description: "Your trusted neighborhood auto repair shop serving LA for over 20 years. Quality service at affordable prices with honest, reliable mechanics.",
    address: "5678 Main Street",
    city: "Los Angeles",
    state: "CA",
    zip_code: "90015",
    phone: "(213) 555-0202",
    email: "contact@autocareplus.com",
    specialties: ["General Repair", "Oil Change", "Brake Service", "Transmission", "A/C Repair"],
    certifications: ["ASE Certified", "AAA Approved"],
    is_verified: true,
    is_active: true,
    rating_average: 4.7,
    total_reviews: 89,
    latitude: 34.0407,
    longitude: -118.2468,
    is_enrolled_mechanicsmatch: false,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },
  {
    id: "la-003",
    owner_id: "pending",
    name: "TurboTech Specialists",
    description: "Performance tuning and turbo specialists. Custom builds, racing modifications, and high-performance upgrades for enthusiasts.",
    address: "9876 Speed Lane",
    city: "Beverly Hills",
    state: "CA",
    zip_code: "90212",
    phone: "(310) 555-0303",
    email: "info@turbotech.com",
    specialties: ["Performance Tuning", "Turbo Systems", "Custom Builds", "Racing", "Dyno Tuning"],
    certifications: ["Performance Tuning Certified", "Custom Fabrication"],
    is_verified: true,
    is_active: true,
    rating_average: 4.8,
    total_reviews: 64,
    latitude: 34.0736,
    longitude: -118.4004,
    is_enrolled_mechanicsmatch: true,
    enrollment_date: "2024-02-01",
    subscription_tier: "basic",
    featured_listing: false,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-02-01T00:00:00Z",
  },

  // New York, NY
  {
    id: "ny-001",
    owner_id: "pending",
    name: "Manhattan Auto Excellence",
    description: "Premium automotive service in the heart of Manhattan. Specializing in luxury vehicles and providing white-glove service to discerning customers.",
    address: "123 Broadway",
    city: "New York",
    state: "NY",
    zip_code: "10001",
    phone: "(212) 555-0401",
    email: "service@manhattanauto.com",
    specialties: ["Luxury Vehicles", "Mercedes", "BMW", "Audi", "Porsche"],
    certifications: ["ASE Master", "Luxury Vehicle Specialist"],
    is_verified: true,
    is_active: true,
    rating_average: 4.9,
    total_reviews: 156,
    latitude: 40.7128,
    longitude: -74.0060,
    is_enrolled_mechanicsmatch: true,
    enrollment_date: "2024-01-10",
    subscription_tier: "enterprise",
    featured_listing: true,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-10T00:00:00Z",
  },
  {
    id: "ny-002",
    owner_id: "pending",
    name: "Brooklyn Garage Co.",
    description: "Honest, reliable auto repair in Brooklyn. Family-owned since 1985, serving the community with integrity and quality workmanship.",
    address: "456 Atlantic Ave",
    city: "Brooklyn",
    state: "NY",
    zip_code: "11217",
    phone: "(718) 555-0502",
    email: "info@brooklyngarage.com",
    specialties: ["General Repair", "Vintage Cars", "Classic Restoration", "Engine Rebuild"],
    certifications: ["ASE Certified", "Classic Car Specialist"],
    is_verified: false,
    is_active: true,
    rating_average: 4.6,
    total_reviews: 203,
    latitude: 40.6782,
    longitude: -73.9442,
    is_enrolled_mechanicsmatch: false,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },

  // Chicago, IL
  {
    id: "chi-001",
    owner_id: "pending",
    name: "Windy City Motors",
    description: "Chicago's premier automotive service center. Expert technicians, state-of-the-art equipment, and comprehensive services for all makes and models.",
    address: "789 Michigan Ave",
    city: "Chicago",
    state: "IL",
    zip_code: "60611",
    phone: "(312) 555-0601",
    email: "service@windycitymotors.com",
    specialties: ["Full Service", "Diagnostics", "Hybrid Vehicles", "Electric Cars"],
    certifications: ["ASE Master", "Hybrid Specialist", "EV Certified"],
    is_verified: true,
    is_active: true,
    rating_average: 4.8,
    total_reviews: 178,
    latitude: 41.8781,
    longitude: -87.6298,
    is_enrolled_mechanicsmatch: true,
    enrollment_date: "2024-01-20",
    subscription_tier: "premium",
    featured_listing: true,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-20T00:00:00Z",
  },

  // Houston, TX
  {
    id: "hou-001",
    owner_id: "pending",
    name: "Lone Star Auto Repair",
    description: "Texas-sized service with attention to detail. Specializing in trucks, SUVs, and performance vehicles. Your one-stop shop for automotive excellence.",
    address: "321 Houston St",
    city: "Houston",
    state: "TX",
    zip_code: "77002",
    phone: "(713) 555-0701",
    email: "howdy@lonestarauto.com",
    specialties: ["Truck Repair", "SUV Service", "Diesel Engines", "Performance", "Lift Kits"],
    certifications: ["ASE Certified", "Diesel Specialist", "Truck Expert"],
    is_verified: true,
    is_active: true,
    rating_average: 4.7,
    total_reviews: 145,
    latitude: 29.7604,
    longitude: -95.3698,
    is_enrolled_mechanicsmatch: false,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },

  // Miami, FL
  {
    id: "mia-001",
    owner_id: "pending",
    name: "South Beach Motors",
    description: "Exotic car specialists in the heart of Miami. From Lamborghini to Ferrari, we handle the most prestigious vehicles with expert care.",
    address: "987 Ocean Drive",
    city: "Miami",
    state: "FL",
    zip_code: "33139",
    phone: "(305) 555-0801",
    email: "info@southbeachmotors.com",
    specialties: ["Exotic Cars", "Lamborghini", "Ferrari", "McLaren", "Porsche"],
    certifications: ["Exotic Car Certified", "Factory Trained"],
    is_verified: true,
    is_active: true,
    rating_average: 4.9,
    total_reviews: 87,
    latitude: 25.7617,
    longitude: -80.1918,
    is_enrolled_mechanicsmatch: true,
    enrollment_date: "2024-02-15",
    subscription_tier: "enterprise",
    featured_listing: true,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-02-15T00:00:00Z",
  }
];

// Function to seed the database
export async function seedShopsDatabase() {
  const supabase = createClient();
  
  try {
    console.log('🌱 Starting shop database seeding...');
    
    // Insert shops in batches
    const batchSize = 10;
    for (let i = 0; i < shopSeedData.length; i += batchSize) {
      const batch = shopSeedData.slice(i, i + batchSize);
      
      const { data, error } = await supabase
        .from('shops')
        .upsert(batch, { 
          onConflict: 'id',
          ignoreDuplicates: false 
        });
      
      if (error) {
        console.error(`❌ Error seeding batch ${i}-${i + batchSize}:`, error);
      } else {
        console.log(`✅ Successfully seeded batch ${i}-${i + batchSize}`);
      }
    }
    
    console.log('🎉 Shop database seeding completed!');
    
    // Return summary
    return {
      totalShops: shopSeedData.length,
      enrolledShops: shopSeedData.filter(s => s.is_enrolled_mechanicsmatch).length,
      verifiedShops: shopSeedData.filter(s => s.is_verified).length,
      cities: [...new Set(shopSeedData.map(s => `${s.city}, ${s.state}`))],
    };
    
  } catch (error) {
    console.error('💥 Fatal error during seeding:', error);
    throw error;
  }
}

// Function to collect shop data from Google Places
export async function collectShopDataFromGooglePlaces(
  location: string,
  apiKey: string,
  radius: number = 25000
) {
  try {
    // Note: This would need to be run from a server environment
    // Client-side requests to Google Places API are restricted
    
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?` +
      `location=${location}&` +
      `radius=${radius}&` +
      `type=car_repair&` +
      `key=${apiKey}`
    );
    
    const data = await response.json();
    
    return data.results.map((place: any) => ({
      name: place.name,
      address: place.vicinity,
      rating: place.rating,
      totalReviews: place.user_ratings_total,
      placeId: place.place_id,
      types: place.types,
      priceLevel: place.price_level,
      isOpen: place.opening_hours?.open_now,
      photos: place.photos?.map((p: any) => p.photo_reference),
    }));
    
  } catch (error) {
    console.error('Error collecting shop data:', error);
    throw error;
  }
}

// Usage example for seeding
export async function runSeeder() {
  try {
    const summary = await seedShopsDatabase();
    console.log('📊 Seeding Summary:', summary);
    return summary;
  } catch (error) {
    console.error('Seeding failed:', error);
    return null;
  }
}