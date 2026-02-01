import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCountryKnowledge, updateCountryKnowledge } from "../../../redux/thunk/countryKnowledgeThunk";
import { clearCountryKnowledge } from "../../../redux/slices/countryKnowledgeSlice";

const CountryKnowledgeTab = ({ countryId }) => {
  const dispatch = useDispatch();
  const { data, fetchLoading, updateLoading } = useSelector(
    (state) => state.countryKnowledge
  );

  useEffect(() => {
    dispatch(fetchCountryKnowledge(countryId));

    return () => {
      dispatch(clearCountryKnowledge());
    };
  }, [countryId, dispatch]);

  if (fetchLoading) {
    return <p className="text-sm text-gray-500">Loading knowledge…</p>;
  }

  if (!data || data.length === 0) {
    return <p className="text-sm text-gray-500">No knowledge entries found</p>;
  }

  return (
    <div className="space-y-4">
        {updateLoading && (
          <p className="text-sm text-green-700 font-bold">Updating…</p>
        )}
      {data.map((item) => (
        <KnowledgeCard
          key={item.id}
          item={item}
          onSave={(payload) =>
            dispatch(
              updateCountryKnowledge({
                id: item.id,
                data: payload,
              })
            )
          }
          loading={updateLoading}
        />
      ))}
    </div>
  );
};

/* ===================== */
/* Knowledge Card        */
/* ===================== */

const KnowledgeCard = ({ item, onSave, loading }) => {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(item.title || "");
  const [body, setBody] = useState(item.body || "");

  return (
    <div className="rounded-xl border bg-white p-4">
      {editing ? (
        <>
          <input
            className="mb-2 w-full rounded-md border px-3 py-2 text-sm"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
          />

          <textarea
            rows={4}
            className="w-full rounded-md border px-3 py-2 text-sm"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Body"
          />

          <div className="mt-3 flex gap-3">
            <button
              onClick={() => {
                onSave({ title, body });
                setEditing(false);
              }}
              disabled={loading}
              className="text-sm font-medium text-indigo-600 disabled:opacity-50"
            >
              Save
            </button>
            <button
              onClick={() => setEditing(false)}
              className="text-sm text-gray-500"
            >
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          <h4 className="font-medium text-gray-900">{item.title}</h4>
          <p className="mt-1 text-sm text-gray-700 whitespace-pre-line">
            {item.body}
          </p>

          <button
            onClick={() => setEditing(true)}
            className="mt-2 text-sm text-indigo-600"
          >
            Edit
          </button>
        </>
      )}
    </div>
  );
};

export default CountryKnowledgeTab;
