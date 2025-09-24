import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';

interface Country {
  country: string;
  iso_code: string;
  flag_url: string;
}

const CountryFlagsSection = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCountries = async () => {
      try {
        const response = await fetch('/data/country_flag_mapping.csv');
        const csvText = await response.text();
        
        const lines = csvText.split('\n');
        const headers = lines[0].split(',');
        
        const parsedCountries: Country[] = [];
        
        for (let i = 1; i < lines.length; i++) {
          const line = lines[i].trim();
          if (line) {
            // Handle CSV parsing with potential commas in quoted strings
            const csvRegex = /,(?=(?:(?:[^"]*"){2})*[^"]*$)/;
            const values = line.split(csvRegex);
            
            if (values.length >= 3) {
              parsedCountries.push({
                country: values[0].replace(/"/g, ''),
                iso_code: values[1].replace(/"/g, ''),
                flag_url: values[2].replace(/"/g, '')
              });
            }
          }
        }
        
        setCountries(parsedCountries);
        setLoading(false);
      } catch (error) {
        console.error('Error loading countries:', error);
        setLoading(false);
      }
    };

    loadCountries();
  }, []);

  const handleCountryClick = (country: Country) => {
    // Placeholder for URL navigation - user will provide URLs later
    console.log('Clicked country:', country.country, country.iso_code);
    // TODO: Navigate to URL when provided
  };

  if (loading) {
    return (
      <section className="py-16 bg-background font-quicksand">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-8">
              Countries that need the <span className="text-primary-light">Thailand Visa On Arrival</span>
            </h2>
            <p className="text-lg text-muted-foreground">Loading countries...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-background font-quicksand">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-4">
            Countries that need the <span className="text-primary-light">Thailand Visa On Arrival</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            All passengers traveling to Thailand from these countries are required to apply online.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 max-w-7xl mx-auto">
          {countries.map((country, index) => (
            <Card
              key={index}
              className="p-3 hover:shadow-soft transition-all duration-300 cursor-pointer hover:scale-105 border-primary/10 bg-white"
              onClick={() => handleCountryClick(country)}
            >
              <div className="flex items-center gap-3">
                <img
                  src={country.flag_url}
                  alt={`${country.country} flag`}
                  className="w-8 h-6 object-cover rounded-sm shadow-sm flex-shrink-0"
                  style={{ borderRadius: '3px' }}
                  loading="lazy"
                />
                <span className="text-sm font-medium text-foreground truncate">
                  {country.country}
                </span>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8">
          <p className="text-muted-foreground">
            Total: {countries.length} countries
          </p>
        </div>
      </div>
    </section>
  );
};

export default CountryFlagsSection;