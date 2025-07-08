// src/lib/databaseHelpers.ts
import { Shop } from './types';

// Helper type for partial database results
export type PartialShop = Partial<Shop> & {
  id: string;
  name: string;
  city: string;
  state: string;
  zip_code: string;
};

// Helper function to convert database result to complete Shop object
export function mapToShop(dbShop: any): Shop {
  return {
    id: dbShop.id,
    owner_id: dbShop.owner_id || '',
    name: dbShop.name,
    description: dbShop.description || '',
    address: dbShop.address,
    city: dbShop.city,
    state: dbShop.state,
    zip_code: dbShop.zip_code,
    phone: dbShop.phone || null,
    email: dbShop.email || null,
    website_url: dbShop.website_url || null,
    business_license: dbShop.business_license || null,
    insurance_info: dbShop.insurance_info || null,
    logo_url: dbShop.logo_url || null,
    cover_image_url: dbShop.cover_image_url || null,
    specialties: dbShop.specialties || [],
    certifications: dbShop.certifications || [],
    operating_hours: dbShop.operating_hours || null,
    is_verified: dbShop.is_verified || false,
    is_active: dbShop.is_active ?? true,
    rating_average: dbShop.rating_average || 0,
    total_reviews: dbShop.total_reviews || 0,
    latitude: dbShop.latitude || null,
    longitude: dbShop.longitude || null,
    created_at: dbShop.created_at || new Date().toISOString(),
    updated_at: dbShop.updated_at || new Date().toISOString(),
  };
}

// Helper function to validate Shop object
export function isValidShop(shop: any): shop is Shop {
  return (
    shop &&
    typeof shop.id === 'string' &&
    typeof shop.name === 'string' &&
    typeof shop.city === 'string' &&
    typeof shop.state === 'string' &&
    typeof shop.zip_code === 'string'
  );
}