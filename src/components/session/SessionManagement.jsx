import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSessions,
  deleteSession,
  // logoutCurrentSession,
  logoutAllSessions,
} from "../../redux/thunk/sessionThunk";

const SessionManagement = ({userId}) => {
  const dispatch = useDispatch();
  const { sessions = [], loading, error } = useSelector(
    (state) => state.sessions
  );

  console.log(sessions)

  useEffect(() => {
    dispatch(fetchSessions(userId));
  }, [dispatch]);

  const handleDelete = async (sessionId) => {
    await dispatch(deleteSession({ sessionId, userId }));
    dispatch(fetchSessions());
  };

  const handleLogoutCurrent = async () => {
    if (!window.confirm("Logout current session?")) return;

    await dispatch(logoutCurrentSession());
    dispatch(fetchSessions(userId));
  };

  const handleLogoutAll = async () => {
    await dispatch(logoutAllSessions(userId));
    dispatch(fetchSessions(userId));
  };

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-semibold mb-4">Session Management</h1>

      <div className="flex gap-3 mb-4">
        
         {!loading && sessions.length > 1 && (
        <button
          onClick={handleLogoutAll}
          disabled={loading}
          className="px-4 py-2 bg-red-800 text-white rounded hover:bg-red-900 disabled:opacity-50"
        >
          Logout All Sessions
        </button>
         )}
      </div>

      {loading && <p className="text-center">Loading sessions...</p>}
      {error && <p className="text-red-500 text-center">{error}</p>}

      {!loading && sessions.length === 0 && (
        <p className="text-center text-gray-500">No active sessions.</p>
      )}

      {!loading && sessions.length > 0 && (
        <div className="overflow-x-auto bg-white shadow rounded-xl p-4">
          <table className="min-w-full text-sm border">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">Session ID</th>
                <th className="p-3 text-left">Device info</th>
                <th className="p-3 text-left">Created At</th>
                <th className="p-3 text-left">IP Address</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>

            <tbody>
              {sessions.map((session) => (
                <tr key={session._id} className="border-t hover:bg-gray-50">
                  <td className="p-3">{session.id}</td>
                  <td className="p-3">
                    {session.device_info || "N/A"}
                  </td>
                  <td className="p-3">
                    {new Date(session.created_at).toLocaleString()}
                  </td>
                    <td className="p-3">
                     {session.ip_address}
                  </td>
                  <td className="p-3">
                    <button
                      onClick={() => handleDelete(session.id)}
                      className="text-red-600 hover:underline text-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      )}
    </div>
  );
};

export default SessionManagement;
