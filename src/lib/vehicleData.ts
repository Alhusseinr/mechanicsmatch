import { useState, useEffect, useCallback } from "react";

// src/lib/vehicleData.ts
export interface VehicleMake {
  id: string;
  name: string;
}

export interface VehicleModel {
  id: string;
  makeId: string;
  name: string;
  category?: string;
}

// Popular vehicle makes
export const VEHICLE_MAKES: VehicleMake[] = [
  { id: "acura", name: "Acura" },
  { id: "audi", name: "Audi" },
  { id: "bmw", name: "BMW" },
  { id: "buick", name: "Buick" },
  { id: "cadillac", name: "Cadillac" },
  { id: "chevrolet", name: "Chevrolet" },
  { id: "chrysler", name: "Chrysler" },
  { id: "dodge", name: "Dodge" },
  { id: "ford", name: "Ford" },
  { id: "gmc", name: "GMC" },
  { id: "honda", name: "Honda" },
  { id: "hyundai", name: "Hyundai" },
  { id: "infiniti", name: "Infiniti" },
  { id: "jeep", name: "Jeep" },
  { id: "kia", name: "Kia" },
  { id: "lexus", name: "Lexus" },
  { id: "mazda", name: "Mazda" },
  { id: "mercedes-benz", name: "Mercedes-Benz" },
  { id: "mitsubishi", name: "Mitsubishi" },
  { id: "nissan", name: "Nissan" },
  { id: "porsche", name: "Porsche" },
  { id: "ram", name: "Ram" },
  { id: "subaru", name: "Subaru" },
  { id: "tesla", name: "Tesla" },
  { id: "toyota", name: "Toyota" },
  { id: "volkswagen", name: "Volkswagen" },
  { id: "volvo", name: "Volvo" },
];

// Popular models for each make
export const VEHICLE_MODELS: VehicleModel[] = [
  // Honda
  { id: "honda-accord", makeId: "honda", name: "Accord", category: "sedan" },
  { id: "honda-civic", makeId: "honda", name: "Civic", category: "sedan" },
  { id: "honda-cr-v", makeId: "honda", name: "CR-V", category: "suv" },
  { id: "honda-pilot", makeId: "honda", name: "Pilot", category: "suv" },
  { id: "honda-odyssey", makeId: "honda", name: "Odyssey", category: "van" },
  {
    id: "honda-ridgeline",
    makeId: "honda",
    name: "Ridgeline",
    category: "truck",
  },
  { id: "honda-passport", makeId: "honda", name: "Passport", category: "suv" },
  { id: "honda-hr-v", makeId: "honda", name: "HR-V", category: "suv" },

  // Toyota
  { id: "toyota-camry", makeId: "toyota", name: "Camry", category: "sedan" },
  {
    id: "toyota-corolla",
    makeId: "toyota",
    name: "Corolla",
    category: "sedan",
  },
  { id: "toyota-rav4", makeId: "toyota", name: "RAV4", category: "suv" },
  {
    id: "toyota-highlander",
    makeId: "toyota",
    name: "Highlander",
    category: "suv",
  },
  { id: "toyota-tacoma", makeId: "toyota", name: "Tacoma", category: "truck" },
  { id: "toyota-tundra", makeId: "toyota", name: "Tundra", category: "truck" },
  { id: "toyota-prius", makeId: "toyota", name: "Prius", category: "hybrid" },
  { id: "toyota-sienna", makeId: "toyota", name: "Sienna", category: "van" },
  { id: "toyota-4runner", makeId: "toyota", name: "4Runner", category: "suv" },

  // Ford
  { id: "ford-f-150", makeId: "ford", name: "F-150", category: "truck" },
  { id: "ford-mustang", makeId: "ford", name: "Mustang", category: "sports" },
  { id: "ford-explorer", makeId: "ford", name: "Explorer", category: "suv" },
  { id: "ford-escape", makeId: "ford", name: "Escape", category: "suv" },
  { id: "ford-fusion", makeId: "ford", name: "Fusion", category: "sedan" },
  { id: "ford-edge", makeId: "ford", name: "Edge", category: "suv" },
  {
    id: "ford-expedition",
    makeId: "ford",
    name: "Expedition",
    category: "suv",
  },
  { id: "ford-ranger", makeId: "ford", name: "Ranger", category: "truck" },

  // Chevrolet
  {
    id: "chevrolet-silverado",
    makeId: "chevrolet",
    name: "Silverado",
    category: "truck",
  },
  {
    id: "chevrolet-equinox",
    makeId: "chevrolet",
    name: "Equinox",
    category: "suv",
  },
  {
    id: "chevrolet-malibu",
    makeId: "chevrolet",
    name: "Malibu",
    category: "sedan",
  },
  {
    id: "chevrolet-tahoe",
    makeId: "chevrolet",
    name: "Tahoe",
    category: "suv",
  },
  {
    id: "chevrolet-suburban",
    makeId: "chevrolet",
    name: "Suburban",
    category: "suv",
  },
  {
    id: "chevrolet-camaro",
    makeId: "chevrolet",
    name: "Camaro",
    category: "sports",
  },
  {
    id: "chevrolet-traverse",
    makeId: "chevrolet",
    name: "Traverse",
    category: "suv",
  },

  // BMW
  { id: "bmw-3-series", makeId: "bmw", name: "3 Series", category: "sedan" },
  { id: "bmw-5-series", makeId: "bmw", name: "5 Series", category: "sedan" },
  { id: "bmw-x3", makeId: "bmw", name: "X3", category: "suv" },
  { id: "bmw-x5", makeId: "bmw", name: "X5", category: "suv" },
  { id: "bmw-x1", makeId: "bmw", name: "X1", category: "suv" },
  { id: "bmw-4-series", makeId: "bmw", name: "4 Series", category: "coupe" },

  // Nissan
  { id: "nissan-altima", makeId: "nissan", name: "Altima", category: "sedan" },
  { id: "nissan-sentra", makeId: "nissan", name: "Sentra", category: "sedan" },
  { id: "nissan-rogue", makeId: "nissan", name: "Rogue", category: "suv" },
  { id: "nissan-murano", makeId: "nissan", name: "Murano", category: "suv" },
  {
    id: "nissan-pathfinder",
    makeId: "nissan",
    name: "Pathfinder",
    category: "suv",
  },
  {
    id: "nissan-frontier",
    makeId: "nissan",
    name: "Frontier",
    category: "truck",
  },

  // Add more models as needed...
];

// Generate years from 1990 to current year + 1
export const VEHICLE_YEARS = Array.from(
  { length: new Date().getFullYear() - 1989 },
  (_, i) => new Date().getFullYear() - i
);

export class VehicleDataService {
  private static NHTSA_BASE_URL = "https://vpic.nhtsa.dot.gov/api/vehicles";
  private static cache = new Map<string, any>();
  private static CACHE_DURATION = 1000 * 60 * 60; // 1 hour

  // Cache helper methods
  private static setCacheItem(key: string, data: any) {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
    });
  }

  private static getCacheItem(key: string) {
    const item = this.cache.get(key);
    if (!item) return null;

    const isExpired = Date.now() - item.timestamp > this.CACHE_DURATION;
    if (isExpired) {
      this.cache.delete(key);
      return null;
    }

    return item.data;
  }

  // Get all makes (static data with API fallback)
  static getMakes(): VehicleMake[] {
    return VEHICLE_MAKES.sort((a, b) => a.name.localeCompare(b.name));
  }

  // Get makes from NHTSA API
  static async fetchMakesFromAPI(): Promise<VehicleMake[]> {
    const cacheKey = "nhtsa-makes";
    const cached = this.getCacheItem(cacheKey);
    if (cached) return cached;

    try {
      console.log("Fetching makes from NHTSA API...");
      const response = await fetch(
        `${this.NHTSA_BASE_URL}/GetMakesForVehicleType/car?format=json`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (!data.Results || !Array.isArray(data.Results)) {
        throw new Error("Invalid API response format");
      }

      const makes = data.Results.filter(
        (make: any) => make.MakeName && make.MakeName.trim()
      )
        .map((make: any) => ({
          id: make.MakeName.toLowerCase().replace(/[^a-z0-9]/g, "-"),
          name: make.MakeName.trim(),
        }))
        .sort((a: VehicleMake, b: VehicleMake) => a.name.localeCompare(b.name));

      this.setCacheItem(cacheKey, makes);
      console.log(`Fetched ${makes.length} makes from NHTSA API`);
      return makes;
    } catch (error) {
      console.error("Error fetching makes from NHTSA API:", error);
      // Fallback to static data
      return this.getMakes();
    }
  }

  // Get models for a specific make (static data)
  static getModelsForMake(makeId: string): VehicleModel[] {
    return VEHICLE_MODELS.filter((model) => model.makeId === makeId).sort(
      (a, b) => a.name.localeCompare(b.name)
    );
  }

  // Get models from NHTSA API for a specific make and year
  static async fetchModelsFromAPI(
    makeName: string,
    year: number
  ): Promise<VehicleModel[]> {
    const cacheKey = `nhtsa-models-${makeName}-${year}`;
    const cached = this.getCacheItem(cacheKey);
    if (cached) return cached;

    try {
      console.log(`Fetching models for ${makeName} ${year} from NHTSA API...`);
      const response = await fetch(
        `${this.NHTSA_BASE_URL}/GetModelsForMakeYear/make/${encodeURIComponent(
          makeName
        )}/modelyear/${year}?format=json`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (!data.Results || !Array.isArray(data.Results)) {
        console.warn("No models found or invalid response format");
        return this.getModelsForMake(
          makeName.toLowerCase().replace(/[^a-z0-9]/g, "-")
        );
      }

      const models = data.Results.filter(
        (model: any) => model.Model_Name && model.Model_Name.trim()
      )
        .map((model: any) => ({
          id: `${makeName
            .toLowerCase()
            .replace(
              /[^a-z0-9]/g,
              "-"
            )}-${model.Model_Name.toLowerCase().replace(/[^a-z0-9]/g, "-")}`,
          makeId: makeName.toLowerCase().replace(/[^a-z0-9]/g, "-"),
          name: model.Model_Name.trim(),
          category: "unknown",
        }))
        .sort((a: VehicleModel, b: VehicleModel) =>
          a.name.localeCompare(b.name)
        );

      // Remove duplicates
      const uniqueModels = models.filter(
        (model: VehicleModel, index: number, self: VehicleModel[]) =>
          index === self.findIndex((m) => m.name === model.name)
      );

      this.setCacheItem(cacheKey, uniqueModels);
      console.log(
        `Fetched ${uniqueModels.length} models for ${makeName} ${year}`
      );
      return uniqueModels;
    } catch (error) {
      console.error(`Error fetching models for ${makeName} ${year}:`, error);
      // Fallback to static data
      return this.getModelsForMake(
        makeName.toLowerCase().replace(/[^a-z0-9]/g, "-")
      );
    }
  }

  // Get vehicle trims from NHTSA API
  static async fetchTrimsFromAPI(
    makeName: string,
    modelName: string,
    year: number
  ): Promise<string[]> {
    const cacheKey = `nhtsa-trims-${makeName}-${modelName}-${year}`;
    const cached = this.getCacheItem(cacheKey);
    if (cached) return cached;

    // Common trim levels as fallback
    const commonTrims = [
      "Base",
      "S",
      "SE",
      "SEL",
      "SL",
      "SV",
      "SR",
      "SX",
      "L",
      "LE",
      "LX",
      "EX",
      "EX-L",
      "Touring",
      "Sport",
      "Hybrid",
      "Limited",
      "Premium",
      "Luxury",
      "Ultimate",
      "Platinum",
      "1.5T",
      "2.0T",
      "V6",
      "AWD",
      "FWD",
      "4WD",
    ];

    try {
      console.log(
        `Attempting to fetch trims for ${year} ${makeName} ${modelName}...`
      );

      // Try the vehicle variables endpoint first
      let response = await fetch(
        `${
          this.NHTSA_BASE_URL
        }/GetVehicleVariableValuesList/make/${encodeURIComponent(
          makeName
        )}/model/${encodeURIComponent(modelName)}/modelyear/${year}?format=json`
      );

      if (!response.ok) {
        console.log(
          `Vehicle variables endpoint failed, trying alternative approach...`
        );

        // Try getting vehicle types instead
        response = await fetch(
          `${
            this.NHTSA_BASE_URL
          }/GetVehicleTypesForMakeModel/make/${encodeURIComponent(
            makeName
          )}/model/${encodeURIComponent(modelName)}?format=json`
        );
      }

      if (response.ok) {
        const data = await response.json();

        if (
          data.Results &&
          Array.isArray(data.Results) &&
          data.Results.length > 0
        ) {
          // Look for trim-related information
          const trims: string[] = [];
          if (data.Results && Array.isArray(data.Results)) {
            for (const item of data.Results) {
              if (item.Name || item.VehicleTypeName) {
                const name = (
                  item.Name ||
                  item.VehicleTypeName ||
                  ""
                ).toLowerCase();
                if (
                  name.includes("trim") ||
                  name.includes("style") ||
                  name.includes("series")
                ) {
                  const trimValue = item.Value || item.VehicleTypeName;
                  if (typeof trimValue === "string" && trimValue.trim()) {
                    trims.push(trimValue.trim());
                  }
                }
              }
            }
          }

          if (trims.length > 0) {
            const uniqueTrims = [...new Set(trims)].sort();
            this.setCacheItem(cacheKey, uniqueTrims);
            console.log(`Found ${uniqueTrims.length} trims from NHTSA API`);
            return uniqueTrims;
          }
        }
      }

      // If no trims found from API, return common trims based on make
      console.log(`No trims found via API, using common trims for ${makeName}`);
      const makeSpecificTrims = this.getCommonTrimsForMake(makeName);
      this.setCacheItem(cacheKey, makeSpecificTrims);
      return makeSpecificTrims;
    } catch (error) {
      console.error(
        `Error fetching trims for ${year} ${makeName} ${modelName}:`,
        error
      );

      // Return common trims based on make as fallback
      const makeSpecificTrims = this.getCommonTrimsForMake(makeName);
      this.setCacheItem(cacheKey, makeSpecificTrims);
      return makeSpecificTrims;
    }
  }

  private static getCommonTrimsForMake(makeName: string): string[] {
    const make = makeName.toLowerCase();

    // Make-specific common trims
    const makeTrims: Record<string, string[]> = {
      honda: ["LX", "Sport", "EX", "EX-L", "Touring", "Type R", "Si"],
      toyota: [
        "L",
        "LE",
        "XLE",
        "Limited",
        "Platinum",
        "TRD",
        "Hybrid",
        "Prime",
      ],
      ford: [
        "S",
        "SE",
        "SEL",
        "Titanium",
        "ST",
        "Raptor",
        "King Ranch",
        "Platinum",
        "GT",
        "GT350",
        "GT500"
      ],
      chevrolet: ["LS", "LT", "LTZ", "Premier", "SS", "Z71", "High Country"],
      bmw: ["sDrive", "xDrive", "M Sport", "Luxury", "M Performance"],
      "mercedes-benz": ["Base", "Luxury", "Premium", "AMG Line", "AMG"],
      audi: ["Premium", "Premium Plus", "Prestige", "S Line", "S", "RS"],
      nissan: ["S", "SV", "SL", "SR", "Nismo", "Platinum"],
      hyundai: ["SE", "SEL", "Limited", "Ultimate", "N Line", "N"],
      kia: ["LX", "S", "EX", "SX", "GT-Line", "GT"],
      volkswagen: ["S", "SE", "SEL", "R-Line", "GLI", "GTI", "R"],
      mazda: ["Sport", "Touring", "Grand Touring", "Signature", "MX-5"],
      subaru: ["Base", "Premium", "Sport", "Limited", "Touring", "STI"],
      lexus: ["Base", "Premium", "Luxury", "F Sport", "F"],
      acura: ["Base", "Technology", "A-Spec", "Advance", "Type S"],
      infiniti: ["Pure", "Luxe", "Essential", "Sensory", "Autograph"],
      cadillac: ["Luxury", "Premium Luxury", "Sport", "V-Series", "Platinum"],
      tesla: ["Standard Range", "Long Range", "Performance", "Plaid"],
      jeep: ["Sport", "Latitude", "Limited", "Trailhawk", "Summit", "Rubicon"],
      ram: ["Tradesman", "Big Horn", "Laramie", "Rebel", "Limited", "TRX"],
      gmc: ["Base", "SLE", "SLT", "AT4", "Denali"],
      buick: ["Preferred", "Essence", "Premium", "Avenir"],
      chrysler: ["LX", "Limited", "Touring", "S", "300S"],
      dodge: ["SXT", "GT", "R/T", "SRT", "Hellcat"],
    };

    // Return make-specific trims or common fallback
    return (
      makeTrims[make] || [
        "Base",
        "S",
        "SE",
        "SEL",
        "SL",
        "Limited",
        "Premium",
        "Sport",
        "Touring",
      ]
    );
  }

  // Get all years
  static getYears(): number[] {
    return VEHICLE_YEARS;
  }

  // Search for makes and models (static data)
  static search(query: string) {
    const results = [];

    // Search makes
    const makeMatches = VEHICLE_MAKES.filter((make) =>
      make.name.toLowerCase().includes(query.toLowerCase())
    );

    // Search models
    const modelMatches = VEHICLE_MODELS.filter((model) =>
      model.name.toLowerCase().includes(query.toLowerCase())
    );

    return {
      makes: makeMatches.slice(0, 5),
      models: modelMatches.slice(0, 10),
    };
  }

  // Clear cache (useful for debugging)
  static clearCache() {
    this.cache.clear();
    console.log("Vehicle data cache cleared");
  }

  // Get cache stats (useful for debugging)
  static getCacheStats() {
    return {
      size: this.cache.size,
      keys: Array.from(this.cache.keys()),
    };
  }
}

export function useVehicleData() {
  const [makes, setMakes] = useState<VehicleMake[]>([]);
  const [models, setModels] = useState<VehicleModel[]>([]);
  const [trims, setTrims] = useState<string[]>([]);
  const [loading, setLoading] = useState({
    makes: false,
    models: false,
    trims: false,
  });
  const [errors, setErrors] = useState({
    makes: null as string | null,
    models: null as string | null,
    trims: null as string | null,
  });

  // Load makes (with option to use API)
  const loadMakes = useCallback(async (useAPI: boolean = true) => {
    setLoading((prev) => ({ ...prev, makes: true }));
    setErrors((prev) => ({ ...prev, makes: null }));

    try {
      const data = useAPI
        ? await VehicleDataService.fetchMakesFromAPI()
        : VehicleDataService.getMakes();
      setMakes(data);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to load makes";
      setErrors((prev) => ({ ...prev, makes: errorMessage }));
      // Fallback to static data
      setMakes(VehicleDataService.getMakes());
    } finally {
      setLoading((prev) => ({ ...prev, makes: false }));
    }
  }, []);

  // Load models for a specific make and year
  const loadModels = useCallback(
    async (makeName: string, year: number, useAPI: boolean = true) => {
      if (!makeName || !year) {
        setModels([]);
        return;
      }

      setLoading((prev) => ({ ...prev, models: true }));
      setErrors((prev) => ({ ...prev, models: null }));
      setModels([]); // Clear current models

      try {
        const data = useAPI
          ? await VehicleDataService.fetchModelsFromAPI(makeName, year)
          : VehicleDataService.getModelsForMake(
              makeName.toLowerCase().replace(/[^a-z0-9]/g, "-")
            );
        setModels(data);
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Failed to load models";
        setErrors((prev) => ({ ...prev, models: errorMessage }));
        // Fallback to static data
        const makeId = makeName.toLowerCase().replace(/[^a-z0-9]/g, "-");
        setModels(VehicleDataService.getModelsForMake(makeId));
      } finally {
        setLoading((prev) => ({ ...prev, models: false }));
      }
    },
    []
  );

  // Load trims for a specific make, model, and year
  const loadTrims = useCallback(
    async (makeName: string, modelName: string, year: number) => {
      if (!makeName || !modelName || !year) {
        setTrims([]);
        return;
      }

      setLoading((prev) => ({ ...prev, trims: true }));
      setErrors((prev) => ({ ...prev, trims: null }));
      setTrims([]); // Clear current trims

      try {
        const data = await VehicleDataService.fetchTrimsFromAPI(
          makeName,
          modelName,
          year
        );
        setTrims(data);
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Failed to load trims";
        setErrors((prev) => ({ ...prev, trims: errorMessage }));
        setTrims([]);
      } finally {
        setLoading((prev) => ({ ...prev, trims: false }));
      }
    },
    []
  );

  // Initialize with makes on mount
  useEffect(() => {
    loadMakes(true); // Use API by default
  }, []);

  return {
    // Data
    makes,
    models,
    trims,

    // Loading states
    loading,

    // Errors
    errors,

    // Actions
    loadMakes,
    loadModels,
    loadTrims,

    // Utility functions
    getYears: VehicleDataService.getYears,
    search: VehicleDataService.search,
    clearCache: VehicleDataService.clearCache,
    getCacheStats: VehicleDataService.getCacheStats,
  };
}
