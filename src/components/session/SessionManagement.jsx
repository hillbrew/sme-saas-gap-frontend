import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSessions,
  deleteSession,
  logoutCurrentSession,
  logoutAllSessions,
} from "../../redux/thunk/SessionThunk";

const SessionManagement = () => {
  const dispatch = useDispatch();
  const { sessions = [], loading, error } = useSelector((state) => state.sessions);

  useEffect(() => {
    dispatch(fetchSessions());
  }, [dispatch]);

  const handleDelete = (sessionId) => {
    if (window.confirm("Are you sure you want to delete this session?")) {
      dispatch(deleteSession(sessionId));
    }
  };

  const handleLogoutCurrent = () => {
    if (window.confirm("Logout current session?")) {
      dispatch(logoutCurrentSession());
    }
  };

  const handleLogoutAll = () => {
    if (window.confirm("Logout all sessions?")) {
      dispatch(logoutAllSessions());
    }
  };

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-semibold mb-4">Session Management</h1>

      <div className="flex gap-3 mb-4">
        <button
          onClick={handleLogoutCurrent}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Logout Current Session
        </button>
        <button
          onClick={handleLogoutAll}
          className="px-4 py-2 bg-red-800 text-white rounded hover:bg-red-900"
        >
          Logout All Sessions
        </button>
      </div>

      {loading && <p className="text-center">Loading sessions...</p>}
      {error && <p className="text-red-500 text-center">{error}</p>}

      {!loading && sessions.length === 0 && <p className="text-center text-gray-500">No active sessions.</p>}

      {!loading && sessions.length > 0 && (
        <div className="overflow-x-auto bg-white shadow rounded-xl p-4">
          <table className="min-w-full text-sm border">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">Session ID</th>
                <th className="p-3 text-left">User</th>
                <th className="p-3 text-left">Created At</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sessions.map((session) => (
                <tr key={session.id} className="border-t hover:bg-gray-50">
                  <td className="p-3">{session.id}</td>
                  <td className="p-3">{session.user?.email || "N/A"}</td>
                  <td className="p-3">{new Date(session.created_at).toLocaleString()}</td>
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
