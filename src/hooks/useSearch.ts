// src/hooks/useSearch.ts
import { useState, useCallback } from 'react';
import { createClient } from '@/lib/supabase';
import { Shop, SearchFilters, UseSearchResult } from '@/lib/types';
import { mapToShop } from '@/lib/databaseHelpers';

export function useSearch() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<UseSearchResult>({
    shops: [],
    total: 0,
    hasMore: false,
    page: 0,
  });

  const supabase = createClient();

  const searchShops = useCallback(async (
    filters: SearchFilters,
    page: number = 1,
    limit: number = 12
  ): Promise<UseSearchResult> => {
    setLoading(true);
    setError(null);

    try {
      let query = supabase
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

      // Location filter (city, state, or ZIP)
      if (filters.location) {
        const location = filters.location.trim();
        query = query.or(
          `city.ilike.%${location}%,state.ilike.%${location}%,zip_code.ilike.%${location}%`
        );
      }

      // Service filter
      if (filters.service && filters.service !== 'all') {
        // This would require a more complex query with service matching
        // For now, we'll filter by specialties
        query = query.contains('specialties', [filters.service]);
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
          // Would need coordinates calculation for real distance sorting
          query = query.order('created_at', { ascending: false });
          break;
        default:
          query = query.order('rating_average', { ascending: false });
      }

      // Pagination
      const from = (page - 1) * limit;
      const to = from + limit - 1;
      query = query.range(from, to);

      const { data: shops, error: searchError, count } = await query;

      if (searchError) {
        throw searchError;
      }

      // Type assertion to ensure we have the correct Shop type
      const typedShops: Shop[] = (shops || []).map(mapToShop);

      const result: UseSearchResult = {
        shops: typedShops,
        total: count || 0,
        hasMore: (count || 0) > page * limit,
        page,
      };

      setResults(result);
      return result;

    } catch (err: any) {
      console.error('Search error:', err);
      const errorMessage = err.message || 'Search failed. Please try again.';
      setError(errorMessage);
      
      const errorResult: UseSearchResult = {
        shops: [],
        total: 0,
        hasMore: false,
        page: 0,
      };
      
      setResults(errorResult);
      return errorResult;
    } finally {
      setLoading(false);
    }
  }, [supabase]);

  // Mock search function for development (when database isn't available)
  const mockSearchShops = useCallback(async (
    filters: SearchFilters,
    page: number = 1,
    limit: number = 12
  ): Promise<UseSearchResult> => {
    setLoading(true);
    setError(null);

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    try {
      // Mock data
      const mockShops: Shop[] = [
        {
          id: "1",
          owner_id: "user1",
          name: "Elite Motor Works",
          description: "Specializing in high-performance vehicles and European imports. ASE certified technicians.",
          address: "1234 Automotive Blvd",
          city: "Los Angeles",
          state: "CA",
          zip_code: "90210",
          phone: "(555) 123-4567",
          email: "info@elitemotorworks.com",
          website_url: "https://elitemotorworks.com",
          specialties: ["General Repair", "Performance Tuning", "Engine Diagnostics", "European Imports"],
          certifications: ["ASE Certified", "BMW Specialist"],
          is_verified: true,
          is_active: true,
          rating_average: 4.9,
          total_reviews: 127,
          created_at: "2024-01-01",
          updated_at: "2024-01-01",
        },
        {
          id: "2",
          owner_id: "user2",
          name: "AutoCare Plus",
          description: "Your trusted neighborhood auto repair shop. Quality service at affordable prices.",
          address: "5678 Main Street",
          city: "Los Angeles",
          state: "CA",
          zip_code: "90210",
          phone: "(555) 987-6543",
          email: "contact@autocareplus.com",
          specialties: ["General Repair", "Oil Change", "Brake Service", "Engine Diagnostics"],
          certifications: ["ASE Certified"],
          is_verified: true,
          is_active: true,
          rating_average: 4.7,
          total_reviews: 89,
          created_at: "2024-01-01",
          updated_at: "2024-01-01",
        },
        {
          id: "3",
          owner_id: "user3",
          name: "TurboTech Specialists",
          description: "Performance tuning and turbo specialists. Custom builds and modifications.",
          address: "9876 Speed Lane",
          city: "Beverly Hills",
          state: "CA",
          zip_code: "90212",
          phone: "(555) 456-7890",
          email: "info@turbotech.com",
          specialties: ["Performance Tuning", "Turbo Systems", "Custom Builds"],
          certifications: ["Performance Tuning Certified"],
          is_verified: true,
          is_active: true,
          rating_average: 4.8,
          total_reviews: 64,
          created_at: "2024-01-01",
          updated_at: "2024-01-01",
        },
        {
          id: "4",
          owner_id: "user4",
          name: "Quick Lube Express",
          description: "Fast and reliable oil change service. While you wait convenience.",
          address: "321 Fast Lane",
          city: "Santa Monica",
          state: "CA",
          zip_code: "90213",
          phone: "(555) 321-0987",
          email: "service@quicklube.com",
          specialties: ["Oil Change", "Filter Replacement", "Quick Service"],
          certifications: ["Certified Technicians"],
          is_verified: false,
          is_active: true,
          rating_average: 4.5,
          total_reviews: 156,
          created_at: "2024-01-01",
          updated_at: "2024-01-01",
        },
        {
          id: "5",
          owner_id: "user5",
          name: "Brake Masters",
          description: "Brake specialists with over 20 years of experience. Safety is our priority.",
          address: "654 Safety Drive",
          city: "Pasadena",
          state: "CA",
          zip_code: "90214",
          phone: "(555) 654-3210",
          email: "info@brakemasters.com",
          specialties: ["Brake Service", "Suspension", "Safety Inspections"],
          certifications: ["Brake Specialist Certified", "ASE Certified"],
          is_verified: true,
          is_active: true,
          rating_average: 4.6,
          total_reviews: 203,
          created_at: "2024-01-01",
          updated_at: "2024-01-01",
        },
        {
          id: "6",
          owner_id: "user6",
          name: "Diagnostic Pro",
          description: "Advanced diagnostic services using the latest technology and equipment.",
          address: "987 Tech Boulevard",
          city: "Burbank",
          state: "CA",
          zip_code: "90215",
          phone: "(555) 987-1234",
          email: "contact@diagnosticpro.com",
          specialties: ["Engine Diagnostics", "Electrical", "Computer Systems"],
          certifications: ["Diagnostic Specialist", "ASE Master Technician"],
          is_verified: true,
          is_active: true,
          rating_average: 4.8,
          total_reviews: 91,
          created_at: "2024-01-01",
          updated_at: "2024-01-01",
        },
      ];

      let filteredShops = [...mockShops];

      // Filter by location
      if (filters.location) {
        const location = filters.location.toLowerCase();
        filteredShops = filteredShops.filter(shop =>
          shop.city.toLowerCase().includes(location) ||
          shop.state.toLowerCase().includes(location) ||
          shop.zip_code.includes(location)
        );
      }

      // Filter by service
      if (filters.service && filters.service !== 'all') {
        const service = filters.service.toLowerCase();
        filteredShops = filteredShops.filter(shop =>
          shop.specialties?.some(specialty =>
            specialty.toLowerCase().includes(service) ||
            service.includes(specialty.toLowerCase())
          )
        );
      }

      // Filter by rating
      if (filters.minRating) {
        filteredShops = filteredShops.filter(shop =>
          shop.rating_average >= filters.minRating!
        );
      }

      // Sort results
      switch (filters.sortBy) {
        case 'rating':
          filteredShops.sort((a, b) => b.rating_average - a.rating_average);
          break;
        case 'reviews':
          filteredShops.sort((a, b) => b.total_reviews - a.total_reviews);
          break;
        case 'distance':
          // Mock distance sorting (random for demo)
          filteredShops.sort(() => Math.random() - 0.5);
          break;
        default:
          filteredShops.sort((a, b) => b.rating_average - a.rating_average);
      }

      // Pagination
      const total = filteredShops.length;
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const paginatedShops = filteredShops.slice(startIndex, endIndex);

      const result: UseSearchResult = {
        shops: paginatedShops,
        total,
        hasMore: endIndex < total,
        page,
      };

      setResults(result);
      return result;

    } catch (err: any) {
      console.error('Mock search error:', err);
      const errorMessage = err.message || 'Search failed. Please try again.';
      setError(errorMessage);
      
      const errorResult: UseSearchResult = {
        shops: [],
        total: 0,
        hasMore: false,
        page: 0,
      };
      
      setResults(errorResult);
      return errorResult;
    } finally {
      setLoading(false);
    }
  }, []);

  const clearResults = useCallback(() => {
    setResults({
      shops: [],
      total: 0,
      hasMore: false,
      page: 0,
    });
    setError(null);
  }, []);

  const loadMore = useCallback(async (filters: SearchFilters): Promise<void> => {
    if (loading || !results.hasMore) return;

    const nextPage = results.page + 1;
    const newResults = await mockSearchShops(filters, nextPage);
    
    setResults(prev => ({
      ...newResults,
      shops: [...prev.shops, ...newResults.shops],
      page: nextPage,
    }));
  }, [loading, results, mockSearchShops]);

  return {
    // State
    loading,
    error,
    results,
    
    // Actions
    searchShops: mockSearchShops, // Use mockSearchShops for now, replace with searchShops when database is ready
    clearResults,
    loadMore,
    
    // Utilities
    setError,
  };
}