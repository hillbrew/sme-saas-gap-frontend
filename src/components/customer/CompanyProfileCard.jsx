import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCompanyProfile } from "../../redux/thunk/Thunk";

const Detail = ({ label, value }) => (
  <div className="flex flex-col">
    <span className="text-gray-500 text-sm">{label}</span>
    <span className="font-medium text-gray-900 break-all">
      {value ?? "-"}
    </span>
  </div>
);

const CompanyProfileCard = ({ companyId }) => {
  const dispatch = useDispatch();
  const { profile, profileLoading, profileError } = useSelector(
    (state) => state.customers
  );

  useEffect(() => {
    if (companyId) {
      dispatch(fetchCompanyProfile(companyId));
    }
  }, [companyId, dispatch]);

  if (profileLoading) return <p className="p-6">Loading profile...</p>;
  if (profileError) return <p className="p-6 text-red-500">{profileError}</p>;
  if (!profile) return null;

  return (
    <div className="space-y-6">
      {/* Basic Info */}
      <div className="bg-white border rounded-xl p-6">
        <h2 className="text-lg font-semibold mb-4">Company Profile</h2>
         {profile.logo_url && (
            <div className="flex justify-center md:justify-start mb-6">
            <img
                src={profile.logo_url}
                alt="Company Logo"
                className="w-24 h-24 rounded-xl border object-contain bg-white"
            />
            </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <Detail label="Company ID" value={profile.id} />
          <Detail label="Website" value={profile.website} />
          <Detail label="Country" value={profile.country} />
          <Detail label="State" value={profile.state} />
          <Detail label="Address" value={profile.address} />
          <Detail
            label="Status"
            value={profile.is_active ? "Active" : "Inactive"}
          />
          <Detail
            label="Postal Code"
            value={profile.postal_code}
          />
          <Detail
            label="Created At"
            value={new Date(profile.created_at).toLocaleString()}
          />
        </div>
      </div>
   
    </div>
  );
};

export default CompanyProfileCard;
