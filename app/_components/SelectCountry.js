  
import { getCountries } from '@/app/_lib/data-service';

async function SelectCountry({ defaultCountry, name, id, className }) {
  const countries = await getCountries();

  // محافظت در برابر خطا
  if (!Array.isArray(countries)) {
    console.error("Countries data is invalid");
    return <div className="text-red-500">Error loading countries</div>;
  }

  // پیدا کردن پرچم کشور پیش‌فرض
  const selectedCountry = countries.find(
    (country) => country.name === defaultCountry
  );
  const flag = selectedCountry?.flag || '';

  return (
    <select
      name={name}
      id={id}
      defaultValue={`${defaultCountry}%${flag}`}
      className={className}
    >
      <option value="">Select country...</option>

      {countries.map((country) => {
        const countryName = country.name || "";
        const countryFlag = country.flag || "";

        return (
          <option
            key={countryName}
            value={`${countryName}%${countryFlag}`}
          >
            {countryName}
          </option>
        );
      })}
    </select>
  );
}

export default SelectCountry;