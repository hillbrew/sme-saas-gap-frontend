import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCountries } from "../../redux/thunk/countriesThunk";
import { useNavigate } from "react-router-dom";


const CountriesPage = () => {
  const dispatch = useDispatch();
  const { countries, countriesLoading, countriesError } = useSelector(
    (state) => state.countries
  );
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchCountries());
  }, [dispatch]);

  if (countriesLoading) {
    return (
      <div className="flex h-[60vh] items-center justify-center text-gray-500">
        Loading countries…
      </div>
    );
  }

  if (countriesError) {
    return (
      <div className="m-6 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
        {countriesError}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Countries</h2>
        <p className="text-sm text-gray-500">
          Manage country-level accounting configuration
        </p>
      </div>

      {/* Table Card */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <table className="w-full border-collapse">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-600">
                Country
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-600">
                ISO
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-600">
                Currency
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-600">
                Language
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-600">
                Status
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {countries.length === 0 ? (
              <tr>
                <td
                  colSpan="5"
                  className="px-4 py-8 text-center text-sm text-gray-500"
                >
                  No countries found
                </td>
              </tr>
            ) : (
              countries.map((country) => (
                <tr
                  key={country.id}
                  onClick={() => navigate(`/admin/countries/${country.id}`)}
                  className="transition hover:bg-gray-50 cursor-pointer"
                >
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">
                    {country.country_name}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {country.iso_code}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {country.default_currency}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {country.default_language}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                        country.is_active
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {country.is_active ? "Active" : "Inactive"}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CountriesPage;
