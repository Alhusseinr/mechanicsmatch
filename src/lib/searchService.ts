// src/lib/searchService.ts
import { createClient } from '@/lib/supabase';
import { Shop, SearchFilters } from '@/lib/types';

// Local interface for this service
interface SearchServiceResult {
  shops: Shop[];
  total: number;
  hasMore: boolean;
  page: number;
}

export class SearchService {
  private static supabase = createClient();

  /**
   * Search for shops based on location and filters
   */
  static async searchShops(
    filters: SearchFilters,
    page: number = 1,
    limit: number = 12
  ): Promise<SearchServiceResult> {
    try {
      let query = this.supabase
        .from('shops')
        .select(`
          id,
          owner_id,
          name,
          description,
          address,
          city,
          state,
          zip_code,
          phone,
          email,
          website_url,
          business_license,
          insurance_info,
          logo_url,
          cover_image_url,
          specialties,
          certifications,
          operating_hours,
          is_verified,
          is_active,
          rating_average,
          total_reviews,
          latitude,
          longitude,
          created_at,
          updated_at
        `)
        .eq('is_active', true);

      // Location-based filtering
      if (filters.location) {
        const location = filters.location.trim();
        // Search in city, state, or zip code
        query = query.or(
          `city.ilike.%${location}%,state.ilike.%${location}%,zip_code.like.%${location}%`
        );
      }

      // Service-based filtering
      if (filters.service && filters.service !== 'all') {
        // Convert service to match specialty format
        const serviceMap: Record<string, string[]> = {
          'general': ['General Repair', 'Maintenance'],
          'performance': ['Performance Tuning', 'Performance'],
          'diagnostics': ['Engine Diagnostics', 'Diagnostics'],
          'brake': ['Brake Service', 'Brakes'],
          'oil': ['Oil Change', 'Oil Service'],
          'transmission': ['Transmission', 'Transmission Repair'],
          'suspension': ['Suspension', 'Suspension Repair'],
          'electrical': ['Electrical', 'Electrical Systems'],
          'ac': ['A/C Service', 'Air Conditioning'],
          'timing': ['Timing Belt', 'Timing Service'],
          'exhaust': ['Exhaust System', 'Exhaust'],
        };

        const serviceTerms = serviceMap[filters.service] || [filters.service];
        const serviceQueries = serviceTerms.map(term => `specialties.cs.{${term}}`);
        query = query.or(serviceQueries.join(','));
      }

      // Rating filter
      if (filters.minRating) {
        query = query.gte('rating_average', filters.minRating);
      }

      // Sorting
      switch (filters.sortBy) {
        case 'rating':
          query = query.order('rating_average', { ascending: false });
          break;
        case 'reviews':
          query = query.order('total_reviews', { ascending: false });
          break;
        case 'distance':
          // For distance sorting, we'd need to calculate distance using coordinates
          // For now, fallback to rating
          query = query.order('rating_average', { ascending: false });
          break;
        default:
          query = query.order('rating_average', { ascending: false });
      }

      // Pagination
      const from = (page - 1) * limit;
      const to = from + limit - 1;
      query = query.range(from, to);

      const { data: shops, error, count } = await query;

      if (error) {
        throw new Error(`Search failed: ${error.message}`);
      }

      // Ensure type safety by mapping the results to complete Shop objects
      const typedShops: Shop[] = (shops || []).map(shop => ({
        ...shop,
        // Provide defaults for any potentially missing fields
        description: shop.description || '',
        business_license: shop.business_license || null,
        insurance_info: shop.insurance_info || null,
        logo_url: shop.logo_url || null,
        cover_image_url: shop.cover_image_url || null,
        specialties: shop.specialties || [],
        certifications: shop.certifications || [],
        operating_hours: shop.operating_hours || null,
        latitude: shop.latitude || null,
        longitude: shop.longitude || null,
      }));

      return {
        shops: typedShops,
        total: count || 0,
        hasMore: (count || 0) > page * limit,
        page,
      };

    } catch (error) {
      console.error('Search error:', error);
      throw error;
    }
  }

  /**
   * Get popular search suggestions
   */
  static getPopularSearches(): string[] {
    return [
      'Los Angeles, CA',
      'New York, NY',
      'Chicago, IL',
      'Houston, TX',
      'Phoenix, AZ',
      'Philadelphia, PA',
      'San Antonio, TX',
      'San Diego, CA',
      'Dallas, TX',
      'San Jose, CA',
    ];
  }

  /**
   * Get service suggestions
   */
  static getServiceSuggestions(): string[] {
    return [
      'Oil Change',
      'Brake Service',
      'Engine Diagnostics',
      'Performance Tuning',
      'Transmission Repair',
      'A/C Service',
      'Electrical Systems',
      'Suspension Repair',
      'Exhaust System',
      'Timing Belt',
    ];
  }

  /**
   * Validate location format
   */
  static validateLocation(location: string): boolean {
    if (!location || location.trim().length < 2) {
      return false;
    }

    // Check for basic formats:
    // - City, State (e.g., "Los Angeles, CA")
    // - State (e.g., "California")
    // - ZIP code (e.g., "90210")
    const patterns = [
      /^[a-zA-Z\s]+,\s*[A-Z]{2}$/,  // City, State
      /^[a-zA-Z\s]+$/,              // City or State name
      /^\d{5}(-\d{4})?$/,           // ZIP code
    ];

    return patterns.some(pattern => pattern.test(location.trim()));
  }

  /**
   * Get location suggestions based on input
   */
  static async getLocationSuggestions(input: string): Promise<string[]> {
    if (!input || input.length < 2) {
      return this.getPopularSearches();
    }

    try {
      // In a real app, you might use Google Places API or similar
      // For now, return filtered popular searches
      const popular = this.getPopularSearches();
      return popular.filter(location =>
        location.toLowerCase().includes(input.toLowerCase())
      );
    } catch (error) {
      console.error('Error getting location suggestions:', error);
      return [];
    }
  }

  /**
   * Calculate distance between two coordinates (Haversine formula)
   */
  static calculateDistance(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ): number {
    const R = 3959; // Earth's radius in miles
    const dLat = this.toRadians(lat2 - lat1);
    const dLon = this.toRadians(lon2 - lon1);
    
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRadians(lat1)) *
        Math.cos(this.toRadians(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  private static toRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
  }

  /**
   * Get user's location using browser geolocation
   */
  static async getUserLocation(): Promise<{ lat: number; lng: number } | null> {
    return new Promise((resolve) => {
      if (!navigator.geolocation) {
        resolve(null);
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error('Geolocation error:', error);
          resolve(null);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000, // 5 minutes
        }
      );
    });
  }

  /**
   * Convert coordinates to address (reverse geocoding)
   */
  static async reverseGeocode(lat: number, lng: number): Promise<string | null> {
    try {
      // In a real app, you'd use Google Maps Geocoding API or similar
      // For now, return a placeholder
      return `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
    } catch (error) {
      console.error('Reverse geocoding error:', error);
      return null;
    }
  }

  /**
   * Get search analytics/insights
   */
  static async getSearchAnalytics(): Promise<{
    popularLocations: Array<{ location: string; count: number }>;
    popularServices: Array<{ service: string; count: number }>;
    recentSearches: Array<{ query: string; timestamp: Date }>;
  }> {
    try {
      // This would typically come from a search analytics table
      return {
        popularLocations: [
          { location: 'Los Angeles, CA', count: 1234 },
          { location: 'New York, NY', count: 987 },
          { location: 'Chicago, IL', count: 756 },
        ],
        popularServices: [
          { service: 'Oil Change', count: 2345 },
          { service: 'Brake Service', count: 1876 },
          { service: 'Engine Diagnostics', count: 1432 },
        ],
        recentSearches: [
          { query: 'Oil Change in Los Angeles', timestamp: new Date() },
          { query: 'Brake Service near me', timestamp: new Date() },
        ],
      };
    } catch (error) {
      console.error('Error getting search analytics:', error);
      throw error;
    }
  }
}