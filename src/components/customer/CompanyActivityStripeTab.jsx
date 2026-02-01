// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { clearWebhookLogs } from "../../redux/slices/webhookSlice";
// import { fetchWebhookLogs } from "../../redux/thunk/webhookThunk";
// import StripeLogsTable from "../logs/StripeLogsTable";
// import BrevoLogsTable from "../logs/BrevoLogsTable";

// const CompanyActivityStripeTab = ({ company,state }) => {
//   const dispatch = useDispatch();
//   const { logs, loading, pagination } = useSelector(
//     (state) => state.webhookLogs
//   );

//   console.log("company",company)
// console.log("state",state)
 
//   const [activeActivityTab, setActiveActivityTab] = useState("logs");
 
//   const [logType, setLogType] = useState("payments"); // payments | emails
//   const [eventName, setEventName] = useState("");
//   const [date, setDate] = useState("");

//   const provider = "stripe";

//   useEffect(() => {
//   if (activeActivityTab !== "logs") return;
//   if (!company?.stripe_customer_id) return;

//   dispatch(clearWebhookLogs());

//   dispatch(
//     fetchWebhookLogs({
//       provider: "stripe",
//       logId: state.customer.stripe_customer_id,   // 👈 KEY FIX
//       eventName: eventName || undefined,
//       date: date || undefined,
//       includeContent: true,
//     })
//   );
// }, [activeActivityTab, state?.customer?.stripe_customer_id, eventName, date]);


//   /* =====================
//      Company-wise filtering
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
//           {/* ROW 2 – Log Type Tabs */}
//           <div className="flex gap-4">
//             {[
//               { key: "payments", label: "Payments (Stripe)" },
//             ].map((item) => (
//               <button
//                 key={item.key}
//                 onClick={() => {
//                   setLogType(item.key);
//                   setEventName("");
//                 }}
//                 className={`px-4 py-2 rounded-md text-sm ${
//                   logType === item.key
//                     ? "bg-blue-600 text-white"
//                     : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//                 }`}
//               >
//                 {item.label}
//               </button>
//             ))}
//           </div>

//           {/* ROW 3 – Filters */}
//           <div className="flex gap-4 items-center">
//             <input
//               type="date"
//               value={date}
//               onChange={(e) => setDate(e.target.value)}
//               className="border rounded px-3 py-2 text-sm"
//             />

//             {logType === "payments" && (
//               <select
//                 value={eventName}
//                 onChange={(e) => setEventName(e.target.value)}
//                 className="border rounded px-3 py-2 text-sm"
//               >
//                 <option value="">All Stripe Events</option>
//                 <option value="charge.succeeded">charge.succeeded</option>
//                 <option value="checkout.session.completed">
//                   checkout.session.completed
//                 </option>
//                 <option value="customer.subscription.created">
//                   customer.subscription.created
//                 </option>
//               </select>
//             )}
//           </div>

//           {/* LOG TABLE */}
//           {loading ? (
//             <div className="text-sm text-gray-500">Loading logs…</div>
//           ) :  (
//             <StripeLogsTable logs={logs} />
//           ) }

//           {/* PAGINATION */}
//           {pagination.hasMore && (
//             <button
//               onClick={() =>
//                 dispatch(
//                   fetchWebhookLogs({
//                     provider: "stripe",
//                     logId: state.customer.stripe_customer_id,   // 👈 REQUIRED
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

// export default CompanyActivityStripeTab;


import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearWebhookLogs } from "../../redux/slices/webhookSlice";
import { fetchWebhookLogs } from "../../redux/thunk/webhookThunk";
import StripeLogsTable from "../logs/StripeLogsTable";

const CompanyActivityStripeTab = ({ customer }) => {
  const dispatch = useDispatch();
  const { logs, loading, pagination } = useSelector(
    (state) => state.webhookLogs
  );

  const [activeActivityTab, setActiveActivityTab] = useState("logs");
  const [eventName, setEventName] = useState("");
  const [date, setDate] = useState("");

  const stripeCustomerId = customer?.stripe_customer_id;

  useEffect(() => {
    if (activeActivityTab !== "logs") return;
    if (!stripeCustomerId) return;

    dispatch(clearWebhookLogs());

    dispatch(
      fetchWebhookLogs({
        provider: "stripe",
        logId: stripeCustomerId,
        eventName: eventName || undefined,
        date: date || undefined,
        includeContent: true,
      })
    );
  }, [activeActivityTab, stripeCustomerId, eventName, date, dispatch]);

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
          {/* Filters */}
          <div className="flex gap-4 items-center">
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="border rounded px-3 py-2 text-sm"
            />

            <select
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              className="border rounded px-3 py-2 text-sm"
            >
              <option value="">All Stripe Events</option>
              <option value="charge.succeeded">charge.succeeded</option>
              <option value="checkout.session.completed">
                checkout.session.completed
              </option>
              <option value="customer.subscription.created">
                customer.subscription.created
              </option>
            </select>
          </div>

          {/* Table */}
          {loading ? (
            <div className="text-sm text-gray-500">Loading logs…</div>
          ) : logs.length === 0 ? (
            <div className="flex items-center justify-center py-12 text-sm text-gray-500 border border-dashed rounded-lg bg-gray-50">
              No logs to display
            </div>
          ) : (
            <StripeLogsTable logs={logs} />
          )}


          {/* Pagination */}
          {pagination.hasMore && (
            <button
              onClick={() =>
                dispatch(
                  fetchWebhookLogs({
                    provider: "stripe",
                    logId: stripeCustomerId,
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
    </div>
  );
};

export default CompanyActivityStripeTab;
