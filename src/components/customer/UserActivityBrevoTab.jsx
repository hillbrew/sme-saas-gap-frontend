// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { clearWebhookLogs } from "../../redux/slices/webhookSlice";
// import { fetchWebhookLogs } from "../../redux/thunk/webhookThunk";
// import BrevoLogsTable from "../logs/BrevoLogsTable";

// const UserActivityBrevoTab = ({ customer }) => {
//   const dispatch = useDispatch();

//   const { logs, loading, pagination } = useSelector(
//     (state) => state.webhookLogs
//   );

//   /* =====================
//      ROW 1 – Activity Tabs
//      ===================== */
//   const [activeActivityTab, setActiveActivityTab] = useState("logs");

//   /* =====================
//      Filters
//      ===================== */
//   const [date, setDate] = useState("");

//   // 🔒 Brevo only
//   const provider = "brevo";

//   /* =====================
//      Fetch logs
//      ===================== */
//   useEffect(() => {
//     if (activeActivityTab !== "logs") return;

//     dispatch(clearWebhookLogs());

//     dispatch(
//       fetchWebhookLogs({
//         provider,
//         date: date || undefined,
//         includeContent: true,
//       })
//     );
//   }, [activeActivityTab, date, dispatch]);

//   /* =====================
//      Company-wise filtering (EMAIL BASED)
//      ===================== */
//   const customerEmail = customer?.email;
//   console.log("customerEmail",customerEmail)

//   const emailLogs = logs.filter(
//     (log) =>
//       log.content?.data?.email &&
//       log.content.data.email === customerEmail
//   );
  

//   console.log(emailLogs);

//   /* =====================
//      Render
//      ===================== */
//   return (
//     <div className="space-y-6">
//       {/* =====================
//          ROW 1 – Activity Tabs
//          ===================== */}
//       <div className="flex gap-6 border-b pb-2">
//         {["logs", "audit", "actions"].map((tab) => (
//           <button
//             key={tab}
//             onClick={() => setActiveActivityTab(tab)}
//             className={`pb-2 text-sm font-medium ${
//               activeActivityTab === tab
//                 ? "border-b-2 border-blue-600 text-blue-600"
//                 : "text-gray-500 hover:text-gray-700"
//             }`}
//           >
//             {tab.toUpperCase()}
//           </button>
//         ))}
//       </div>

//       {/* =====================
//          LOGS VIEW
//          ===================== */}
//       {activeActivityTab === "logs" && (
//         <>
//           {/* ROW 2 – Filters */}
//           <div className="flex gap-4 items-center">
//             <input
//               type="date"
//               value={date}
//               onChange={(e) => setDate(e.target.value)}
//               className="border rounded px-3 py-2 text-sm"
//             />
//           </div>

//           {/* LOG TABLE */}
//           {loading ? (
//             <div className="text-sm text-gray-500">
//               Loading email logs…
//             </div>
//           ) : (
//             <BrevoLogsTable logs={emailLogs} />
//           )}

//           {/* PAGINATION */}
//           {pagination.hasMore && (
//             <button
//               onClick={() =>
//                 dispatch(
//                   fetchWebhookLogs({
//                     provider,
//                     date: date || undefined,
//                     continuationToken: pagination.nextToken,
//                     includeContent: true,
//                   })
//                 )
//               }
//               className="text-blue-600 text-sm"
//             >
//               Load more
//             </button>
//           )}
//         </>
//       )}

//       {/* =====================
//          FUTURE TABS
//          ===================== */}
//       {activeActivityTab === "audit" && (
//         <div className="text-sm text-gray-500">
//           Audit logs coming soon…
//         </div>
//       )}

//       {activeActivityTab === "actions" && (
//         <div className="text-sm text-gray-500">
//           Action history coming soon…
//         </div>
//       )}
//     </div>
//   );
// };

// export default UserActivityBrevoTab;



import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearWebhookLogs } from "../../redux/slices/webhookSlice";
import { fetchWebhookLogs } from "../../redux/thunk/webhookThunk";
import BrevoLogsTable from "../logs/BrevoLogsTable";

const UserActivityBrevoTab = ({ customer }) => {
  const dispatch = useDispatch();

  const { logs, loading, pagination } = useSelector(
    (state) => state.webhookLogs
  );

  const [activeActivityTab, setActiveActivityTab] = useState("logs");
  const [date, setDate] = useState("");

  const provider = "brevo";
  const customerEmail = customer?.email;

  /* =====================
     FETCH LOGS (SERVER FILTERED)
     ===================== */
  useEffect(() => {
    if (activeActivityTab !== "logs") return;
    if (!customerEmail) return;

    dispatch(clearWebhookLogs());

    dispatch(
      fetchWebhookLogs({
        provider: "brevo",
        logId: customerEmail,     // ✅ KEY FIX
        date: date || undefined,
        includeContent: true,
      })
    );
  }, [activeActivityTab, customerEmail, date, dispatch]);

  /* =====================
     RENDER
     ===================== */
  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="flex gap-6 border-b pb-2">
        {["logs", "audit", "actions"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveActivityTab(tab)}
            className={`pb-2 text-sm font-medium ${
              activeActivityTab === tab
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab.toUpperCase()}
          </button>
        ))}
      </div>

      {activeActivityTab === "logs" && (
        <>
          {/* Date Filter */}
          <div className="flex gap-4 items-center">
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="border rounded px-3 py-2 text-sm"
            />
          </div>

          {/* Logs Table */}
          {loading ? (
            <div className="text-sm text-gray-500">Loading logs…</div>
          ) : logs.length === 0 ? (
            <div className="flex items-center justify-center py-12 text-sm text-gray-500 border border-dashed rounded-lg bg-gray-50">
              No logs to display
            </div>
          ) : (
            <BrevoLogsTable logs={logs} />
          )}

          {/* Pagination */}
          {pagination.hasMore && (
            <button
              onClick={() =>
                dispatch(
                  fetchWebhookLogs({
                    provider: "brevo",
                    logId: customerEmail,      // ✅ REQUIRED
                    date: date || undefined,
                    continuationToken: pagination.nextToken,
                    includeContent: true,
                  })
                )
              }
              className="text-blue-600 text-sm"
            >
              Load more
            </button>
          )}
        </>
      )}

      {activeActivityTab === "audit" && (
        <div className="text-sm text-gray-500">
          Audit logs coming soon…
        </div>
      )}

      {activeActivityTab === "actions" && (
        <div className="text-sm text-gray-500">
          Action history coming soon…
        </div>
      )}
    </div>
  );
};

export default UserActivityBrevoTab;
