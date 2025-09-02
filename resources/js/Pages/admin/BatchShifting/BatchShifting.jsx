// import React, { useState, useEffect } from "react";
// import AdminLayout from "@/Layouts/AdminLayout";
// import axiosInstance from "@/utils/axiosInstance";
// import { useBaseContext } from "@/contexts/adminContext";
// import toast from "react-hot-toast";

// const BatchShifting = () => {
//     const { admin } = useBaseContext();

//     const [drawerOpen, setDrawerOpen] = useState(false);
//     const [batches, setBatches] = useState([]);
//     const [selectedBatch, setSelectedBatch] = useState("");
//     const [session, setSession] = useState("");
//     const [students, setStudents] = useState([]);
//     const [selectedStudents, setSelectedStudents] = useState([]);
//     const [loading, setLoading] = useState(false);

//     // Fetch batches for the admin
//     useEffect(() => {
//         if (!admin?.id) return;

//         axiosInstance
//             .get(`/admin/${admin.id}/batches`)
//             .then((res) => setBatches(res.data))
//             .catch(() => toast.error("Failed to fetch batches"));
//     }, [admin]);

//     // Fetch students whenever batch or session changes
//     // Fetch students whenever batch or session changes
//     useEffect(() => {
//         if (!selectedBatch || !session) {
//             setStudents([]);
//             return;
//         }

//         setLoading(true);

//         axiosInstance
//             .get(`/admin/batches/shift/${admin.id}/${selectedBatch}/${session}`)
//             .then((res) => setStudents(res.data.data || []))
//             .catch(() => {
//                 setStudents([]);
//                 toast.error(
//                     "Failed to fetch students for this batch and session"
//                 );
//             })
//             .finally(() => setLoading(false));
//     }, [selectedBatch, session]);

//     const toggleStudentSelection = (id) => {
//         setSelectedStudents((prev) =>
//             prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
//         );
//     };

//     const handleUpdate = async () => {
//         if (!selectedStudents.length)
//             return toast.error("Select at least one student to shift");

//         try {
//             await axiosInstance.post("/admin/batch-shift", {
//                 batch_id: selectedBatch,
//                 student_ids: selectedStudents,
//                 session: session,
//             });
//             toast.success("Students updated successfully");
//             setSelectedStudents([]);
//             setStudents([]);
//             setSelectedBatch("");
//             setSession("");
//         } catch {
//             toast.error("Failed to update students");
//         }
//     };

//     return (
//         <div className="p-6">
//             <button
//                 className="bg-blue-600 text-white px-4 py-2 rounded"
//                 onClick={() => setDrawerOpen(true)}
//             >
//                 Open Batch Shifting
//             </button>

//             {drawerOpen && (
//                 <>
//                     <div className="fixed top-0 right-0 h-full w-96 bg-white shadow-lg p-6 overflow-y-auto z-50">
//                         <button
//                             className="text-gray-500 mb-4"
//                             onClick={() => setDrawerOpen(false)}
//                         >
//                             Close
//                         </button>

//                         <h2 className="text-xl font-bold mb-2">Session</h2>
//                         <input
//                             type="text"
//                             placeholder="Enter Session (e.g., 2025-26)"
//                             className="border p-2 w-full mb-4"
//                             value={session}
//                             onChange={(e) => setSession(e.target.value)}
//                         />

//                         <h2 className="text-xl font-bold mb-2">Select Batch</h2>
//                         <select
//                             className="border p-2 w-full mb-4"
//                             value={selectedBatch}
//                             onChange={(e) => setSelectedBatch(e.target.value)}
//                         >
//                             <option value="">Select Batch</option>
//                             {batches.map((b) => (
//                                 <option key={b.id} value={b.id}>
//                                     {b.name}
//                                 </option>
//                             ))}
//                         </select>

//                         {loading && <p>Loading students...</p>}

//                         {students.length > 0 && (
//                             <>
//                                 <h2 className="text-xl font-bold mb-2">
//                                     Students
//                                 </h2>
//                                 <div className="max-h-64 overflow-y-auto border p-2 rounded mb-4">
//                                     {students.map((student) => (
//                                         <label
//                                             key={student.id}
//                                             className="flex items-center mb-2 cursor-pointer"
//                                         >
//                                             <input
//                                                 type="checkbox"
//                                                 className="mr-2"
//                                                 checked={selectedStudents.includes(
//                                                     student.id
//                                                 )}
//                                                 onChange={() =>
//                                                     toggleStudentSelection(
//                                                         student.id
//                                                     )
//                                                 }
//                                             />
//                                             {student.enrollment_number
//                                                 ? `[${student.enrollment_number}] `
//                                                 : ""}
//                                             {student.name}
//                                         </label>
//                                     ))}
//                                 </div>

//                                 <button
//                                     className="bg-purple-600 text-white px-4 py-2 rounded w-full"
//                                     onClick={handleUpdate}
//                                 >
//                                     Shift Selected Students
//                                 </button>
//                             </>
//                         )}

//                         {!loading && selectedBatch && students.length === 0 && (
//                             <p className="text-gray-500">
//                                 No students found in this batch and session
//                             </p>
//                         )}
//                     </div>

//                     <div
//                         className="fixed inset-0 bg-black opacity-25 z-40"
//                         onClick={() => setDrawerOpen(false)}
//                     ></div>
//                 </>
//             )}
//         </div>
//     );
// };

// export default BatchShifting;
// BatchShifting.layout = (page) => <AdminLayout>{page}</AdminLayout>;

// import React, { useState, useEffect } from "react";
// import AdminLayout from "@/Layouts/AdminLayout";
// import axiosInstance from "@/utils/axiosInstance";
// import { useBaseContext } from "@/contexts/adminContext";
// import toast from "react-hot-toast";

// const BatchShifting = () => {
//     const { admin } = useBaseContext();

//     const [drawerOpen, setDrawerOpen] = useState(false);
//     const [batches, setBatches] = useState([]);
//     const [selectedBatch, setSelectedBatch] = useState("");
//     const [session, setSession] = useState("");
//     const [students, setStudents] = useState([]);
//     const [selectedStudents, setSelectedStudents] = useState([]);
//     const [loading, setLoading] = useState(false);

//     // New states for step-by-step shifting
//     const [newSession, setNewSession] = useState("");
//     const [showUpdateBatch, setShowUpdateBatch] = useState(false);
//     const [newBatch, setNewBatch] = useState("");

//     // Fetch batches for the admin
//     useEffect(() => {
//         if (!admin?.id) return;

//         axiosInstance
//             .get(`/admin/${admin.id}/batches`)
//             .then((res) => setBatches(res.data))
//             .catch(() => toast.error("Failed to fetch batches"));
//     }, [admin]);

//     // Fetch students based on selected batch + session
//     useEffect(() => {
//         if (!selectedBatch || !session) {
//             setStudents([]);
//             return;
//         }

//         setLoading(true);

//         axiosInstance
//             .get(`/admin/batches/shift/${admin.id}/${selectedBatch}/${session}`)
//             .then((res) => setStudents(res.data.data || []))
//             .catch(() => {
//                 setStudents([]);
//                 toast.error(
//                     "Failed to fetch students for this batch and session"
//                 );
//             })
//             .finally(() => setLoading(false));
//     }, [selectedBatch, session]);

//     const toggleStudentSelection = (id) => {
//         setSelectedStudents((prev) =>
//             prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
//         );
//     };

//     const handleShiftClick = () => {
//         if (!selectedStudents.length)
//             return toast.error("Select at least one student to shift");
//         setShowUpdateBatch(true);
//     };

//     const handleUpdateBatch = async () => {
//         if (!newSession || !newBatch)
//             return toast.error("Please provide new session and batch");

//         try {
//             const res = await axiosInstance.post("/admin/batch-shift", {
//                 batch_id: newBatch,
//                 student_ids: selectedStudents,
//                 session: newSession,
//             });

//             toast.success(res.data.message || "Students updated successfully");

//             // Reset all states after success
//             setSelectedStudents([]);
//             setStudents([]);
//             setSelectedBatch("");
//             setSession("");
//             setNewSession("");
//             setNewBatch("");
//             setShowUpdateBatch(false);
//         } catch (err) {
//             console.error(err.response?.data || err.message);
//             toast.error("Failed to update students");
//         }
//     };

//     return (
//         <div className="p-6">
//             <button
//                 className="bg-blue-600 text-white px-4 py-2 rounded"
//                 onClick={() => setDrawerOpen(true)}
//             >
//                 Open Batch Shifting
//             </button>

//             {drawerOpen && (
//                 <>
//                     <div className="fixed top-0 right-0 h-full w-96 bg-white shadow-lg p-6 overflow-y-auto z-50">
//                         <button
//                             className="text-gray-500 mb-4"
//                             onClick={() => setDrawerOpen(false)}
//                         >
//                             Close
//                         </button>

//                         {!showUpdateBatch ? (
//                             <>
//                                 {/* STEP 1: Select Session and Batch */}
//                                 <h2 className="text-xl font-bold mb-2">
//                                     Session
//                                 </h2>
//                                 <input
//                                     type="text"
//                                     name="session"
//                                     placeholder="Session"
//                                     value={session}
//                                     onChange={(e) => setSession(e.target.value)}
//                                     className="w-full p-2 border rounded mb-4"
//                                 />

//                                 <h2 className="text-xl font-bold mb-2">
//                                     Select Batch
//                                 </h2>
//                                 <select
//                                     className="border p-2 w-full mb-4"
//                                     value={selectedBatch}
//                                     onChange={(e) =>
//                                         setSelectedBatch(e.target.value)
//                                     }
//                                 >
//                                     <option value="">Select Batch</option>
//                                     {batches.map((b) => (
//                                         <option key={b.id} value={b.id}>
//                                             {b.name}
//                                         </option>
//                                     ))}
//                                 </select>

//                                 {loading && <p>Loading students...</p>}

//                                 {students.length > 0 && (
//                                     <>
//                                         <h2 className="text-xl font-bold mb-2">
//                                             Students
//                                         </h2>
//                                         <div className="max-h-64 overflow-y-auto border p-2 rounded mb-4">
//                                             {students.map((student) => (
//                                                 <label
//                                                     key={student.id}
//                                                     className="flex items-center mb-2 cursor-pointer"
//                                                 >
//                                                     <input
//                                                         type="checkbox"
//                                                         className="mr-2"
//                                                         checked={selectedStudents.includes(
//                                                             student.id
//                                                         )}
//                                                         onChange={() =>
//                                                             toggleStudentSelection(
//                                                                 student.id
//                                                             )
//                                                         }
//                                                     />
//                                                     <span className="font-mono text-sm">
//                                                         {student.enrollment_number
//                                                             ? `[${student.enrollment_number}] `
//                                                             : ""}
//                                                     </span>
//                                                     {student.name}
//                                                 </label>
//                                             ))}
//                                         </div>

//                                         <button
//                                             className="bg-purple-600 text-white px-4 py-2 rounded w-full"
//                                             onClick={handleShiftClick}
//                                         >
//                                             Shift Selected Students
//                                         </button>
//                                     </>
//                                 )}

//                                 {!loading &&
//                                     selectedBatch &&
//                                     students.length === 0 && (
//                                         <p className="text-gray-500">
//                                             No students found in this batch and
//                                             session
//                                         </p>
//                                     )}
//                             </>
//                         ) : (
//                             <>
//                                 {/* STEP 2: Enter new session and batch */}
//                                 <h2 className="text-xl font-bold mb-2">
//                                     Enter New Session
//                                 </h2>
//                                 <input
//                                     type="text"
//                                     placeholder="Enter new session"
//                                     className="border p-2 w-full mb-4"
//                                     value={newSession}
//                                     onChange={(e) =>
//                                         setNewSession(e.target.value)
//                                     }
//                                 />

//                                 <h2 className="text-xl font-bold mb-2">
//                                     Select New Batch
//                                 </h2>
//                                 <select
//                                     className="border p-2 w-full mb-4"
//                                     value={newBatch}
//                                     onChange={(e) =>
//                                         setNewBatch(e.target.value)
//                                     }
//                                 >
//                                     <option value="">Select Batch</option>
//                                     {batches.map((b) => (
//                                         <option key={b.id} value={b.id}>
//                                             {b.name}
//                                         </option>
//                                     ))}
//                                 </select>

//                                 <button
//                                     className="bg-green-600 text-white px-4 py-2 rounded w-full"
//                                     onClick={handleUpdateBatch}
//                                 >
//                                     Update Batch
//                                 </button>
//                             </>
//                         )}
//                     </div>

//                     <div
//                         className="fixed inset-0 bg-black opacity-25 z-40"
//                         onClick={() => setDrawerOpen(false)}
//                     ></div>
//                 </>
//             )}
//         </div>
//     );
// };

// export default BatchShifting;
// BatchShifting.layout = (page) => <AdminLayout>{page}</AdminLayout>;

// import React, { useEffect, useState, useMemo } from "react";
// import AdminLayout from "@/Layouts/AdminLayout";
// import axiosInstance from "@/utils/axiosInstance";
// import { useBaseContext } from "@/contexts/adminContext";
// import toast from "react-hot-toast";

// const BatchShifting = () => {
//     const { admin } = useBaseContext();
//     const adminId = admin?.id;

//     const [drawerOpen, setDrawerOpen] = useState(false);

//     // Current session & batch
//     const [currentSession, setCurrentSession] = useState("");
//     const [currentBatches, setCurrentBatches] = useState([]);
//     const [selectedCurrentBatch, setSelectedCurrentBatch] = useState("");

//     // Students
//     const [students, setStudents] = useState([]);
//     const [selectedStudents, setSelectedStudents] = useState([]);
//     const [loadingStudents, setLoadingStudents] = useState(false);

//     // New session & batch
//     const [newSession, setNewSession] = useState("");
//     const [newBatches, setNewBatches] = useState([]);
//     const [selectedNewBatch, setSelectedNewBatch] = useState("");

//     // Fetch batches for a session
//     const fetchBatchesBySession = async (session, setBatchState) => {
//         if (!session || !adminId) return;
//         try {
//             const res = await axiosInstance.get(
//                 `/admin/${adminId}/batches?session=${session}`
//             );
//             setBatchState(res.data || []);
//         } catch (e) {
//             toast.error("Failed to fetch batches for session");
//         }
//     };

//     // Fetch students
//     const fetchStudents = async () => {
//         if (!selectedCurrentBatch || !currentSession) {
//             toast.error("Select batch and session first");
//             return;
//         }
//         setLoadingStudents(true);
//         try {
//             console.log(
//                 "Fetching students for batch:",
//                 selectedCurrentBatch,
//                 "session:",
//                 currentSession,
//                 "adminId:",
//                 adminId
//             );
//             const res = await axiosInstance.get(
//                 `/admin/batches/shift/${adminId}/${selectedCurrentBatch}/${currentSession}`
//             );

//             setStudents(res.data?.data || []);
//             setSelectedStudents([]);
//         } catch (e) {
//             toast.error("Failed to fetch students");
//             setStudents([]);
//         } finally {
//             setLoadingStudents(false);
//         }
//     };

//     const toggleStudentSelection = (id) => {
//         setSelectedStudents((prev) =>
//             prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
//         );
//     };

//     const canShift = useMemo(() => {
//         return selectedStudents.length > 0 && selectedNewBatch && newSession;
//     }, [selectedStudents, selectedNewBatch, newSession]);

//     const handleShift = async () => {
//         if (!canShift) {
//             toast.error("Pick students and fill new batch & session");
//             return;
//         }
//         try {
//             const res = await axiosInstance.post("/admin/batches/shift", {
//                 admin_id: adminId,
//                 student_ids: selectedStudents,
//                 batch_id: Number(selectedNewBatch),
//                 session: newSession,
//                 // changed_by: adminId,
//             });
//             toast.success(res.data?.message || "Batch updated successfully");
//             setDrawerOpen(false);
//             setStudents([]);
//             setSelectedStudents([]);
//             setCurrentSession("");
//             setSelectedCurrentBatch("");
//             setNewSession("");
//             setSelectedNewBatch("");
//         } catch (e) {
//             const msg = e?.response?.data?.message || "Failed to update batch";
//             toast.error(msg);
//         }
//     };

//     return (
//         <div className="p-6 space-y-6">
//             <h1 className="text-2xl font-bold">Batch Shifting</h1>

//             <button
//                 className="bg-blue-600 text-white px-4 py-2 rounded"
//                 onClick={() => setDrawerOpen(true)}
//             >
//                 Update Batch Shifting
//             </button>

//             {drawerOpen && (
//                 <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-end">
//                     <div className="bg-white w-full md:w-1/2 p-6 overflow-auto">
//                         <h2 className="text-xl font-semibold mb-4">
//                             Update Batch Shifting
//                         </h2>
//                         <button
//                             className="text-red-600 mb-4"
//                             onClick={() => setDrawerOpen(false)}
//                         >
//                             Close
//                         </button>

//                         {/* Current session & batch */}
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
//                             <div>
//                                 <label className="block text-sm mb-1">
//                                     Current Session
//                                 </label>
//                                 <input
//                                     type="text"
//                                     className="border p-2 rounded w-full"
//                                     placeholder="e.g. 2024-25"
//                                     value={currentSession}
//                                     onChange={(e) => {
//                                         setCurrentSession(e.target.value);
//                                         setSelectedCurrentBatch("");
//                                         fetchBatchesBySession(
//                                             e.target.value,
//                                             setCurrentBatches
//                                         );
//                                     }}
//                                 />
//                             </div>
//                             <div>
//                                 <label className="block text-sm mb-1">
//                                     Current Batch
//                                 </label>
//                                 <select
//                                     className="border p-2 rounded w-full"
//                                     value={selectedCurrentBatch}
//                                     onChange={(e) =>
//                                         setSelectedCurrentBatch(e.target.value)
//                                     }
//                                 >
//                                     <option value="">-- Select --</option>
//                                     {currentBatches.map((b) => (
//                                         <option key={b.id} value={b.id}>
//                                             {b.name} ({b.id})
//                                         </option>
//                                     ))}
//                                 </select>
//                             </div>
//                             <div className="flex items-end">
//                                 <button
//                                     onClick={fetchStudents}
//                                     className="bg-blue-600 text-white px-4 py-2 rounded w-full"
//                                     disabled={loadingStudents}
//                                 >
//                                     {loadingStudents
//                                         ? "Loading..."
//                                         : "Load Students"}
//                                 </button>
//                             </div>
//                         </div>

//                         {/* Students selection */}
//                         {students.length > 0 && (
//                             <div className="mb-4 border rounded p-3">
//                                 <h3 className="font-semibold mb-2">
//                                     Select Students
//                                 </h3>
//                                 <div className="overflow-auto max-h-64">
//                                     <table className="min-w-full border">
//                                         <thead className="bg-gray-100">
//                                             <tr>
//                                                 <th className="p-2 border">
//                                                     Select
//                                                 </th>
//                                                 <th className="p-2 border">
//                                                     Enroll #
//                                                 </th>
//                                                 <th className="p-2 border">
//                                                     Name
//                                                 </th>
//                                             </tr>
//                                         </thead>
//                                         <tbody>
//                                             {students.map((s) => (
//                                                 <tr
//                                                     key={s.id}
//                                                     className="odd:bg-white even:bg-gray-50"
//                                                 >
//                                                     <td className="p-2 border text-center">
//                                                         <input
//                                                             type="checkbox"
//                                                             checked={selectedStudents.includes(
//                                                                 s.id
//                                                             )}
//                                                             onChange={() =>
//                                                                 toggleStudentSelection(
//                                                                     s.id
//                                                                 )
//                                                             }
//                                                         />
//                                                     </td>
//                                                     <td className="p-2 border">
//                                                         {s.enrollment_number}
//                                                     </td>
//                                                     <td className="p-2 border">
//                                                         {s.name}
//                                                     </td>
//                                                 </tr>
//                                             ))}
//                                         </tbody>
//                                     </table>
//                                 </div>
//                             </div>
//                         )}

//                         {/* New session & batch */}
//                         {selectedStudents.length > 0 && (
//                             <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
//                                 <div>
//                                     <label className="block text-sm mb-1">
//                                         New Session
//                                     </label>
//                                     <input
//                                         type="text"
//                                         className="border p-2 rounded w-full"
//                                         placeholder="e.g. 2025-26"
//                                         value={newSession}
//                                         onChange={(e) => {
//                                             setNewSession(e.target.value);
//                                             setSelectedNewBatch("");
//                                             fetchBatchesBySession(
//                                                 e.target.value,
//                                                 setNewBatches
//                                             );
//                                         }}
//                                     />
//                                 </div>
//                                 <div>
//                                     <label className="block text-sm mb-1">
//                                         New Batch
//                                     </label>
//                                     <select
//                                         className="border p-2 rounded w-full"
//                                         value={selectedNewBatch}
//                                         onChange={(e) =>
//                                             setSelectedNewBatch(e.target.value)
//                                         }
//                                     >
//                                         <option value="">-- Select --</option>
//                                         {newBatches.map((b) => (
//                                             <option key={b.id} value={b.id}>
//                                                 {b.name} ({b.id})
//                                             </option>
//                                         ))}
//                                     </select>
//                                 </div>
//                                 <div className="flex items-end">
//                                     <button
//                                         onClick={handleShift}
//                                         className="bg-green-600 text-white px-4 py-2 rounded w-full"
//                                         disabled={!canShift}
//                                     >
//                                         Update Batch ({selectedStudents.length})
//                                     </button>
//                                 </div>
//                             </div>
//                         )}
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default BatchShifting;
// BatchShifting.layout = (page) => <AdminLayout>{page}</AdminLayout>;

// import React, { useEffect, useState, useMemo } from "react";
// import AdminLayout from "@/Layouts/AdminLayout";
// import axiosInstance from "@/utils/axiosInstance";
// import { useBaseContext } from "@/contexts/adminContext";
// import toast from "react-hot-toast";

// const BatchShifting = () => {
//     const { admin } = useBaseContext();
//     const adminId = admin?.id;

//     const [drawerOpen, setDrawerOpen] = useState(false);

//     // Current session & batch
//     const [currentSession, setCurrentSession] = useState("");
//     const [currentBatches, setCurrentBatches] = useState([]);
//     const [selectedCurrentBatch, setSelectedCurrentBatch] = useState("");

//     // Students
//     const [students, setStudents] = useState([]);
//     const [selectedStudents, setSelectedStudents] = useState([]);
//     const [loadingStudents, setLoadingStudents] = useState(false);

//     // New session & batch
//     const [newSession, setNewSession] = useState("");
//     const [newBatches, setNewBatches] = useState([]);
//     const [selectedNewBatch, setSelectedNewBatch] = useState("");

//     // Batch history
//     const [history, setHistory] = useState([]);
//     const [historyStudentId, setHistoryStudentId] = useState(null);

//     // Fetch batches for a session
//     const fetchBatchesBySession = async (session, setBatchState) => {
//         if (!session || !adminId) return;
//         try {
//             const res = await axiosInstance.get(
//                 `/admin/${adminId}/batches?session=${session}`
//             );
//             setBatchState(res.data || []);
//         } catch (e) {
//             toast.error("Failed to fetch batches for session");
//         }
//     };

//     // Fetch students
//     const fetchStudents = async () => {
//         if (!selectedCurrentBatch || !currentSession) {
//             toast.error("Select batch and session first");
//             return;
//         }
//         setLoadingStudents(true);
//         try {
//             const res = await axiosInstance.get(
//                 `/admin/batches/shift/${adminId}/${selectedCurrentBatch}/${currentSession}`
//             );
//             setStudents(res.data?.data || []);
//             setSelectedStudents([]);
//         } catch (e) {
//             toast.error("Failed to fetch students");
//             setStudents([]);
//         } finally {
//             setLoadingStudents(false);
//         }
//     };

//     const toggleStudentSelection = (id) => {
//         setSelectedStudents((prev) =>
//             prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
//         );
//     };

//     const canShift = useMemo(
//         () => selectedStudents.length > 0 && selectedNewBatch && newSession,
//         [selectedStudents, selectedNewBatch, newSession]
//     );

//     const handleShift = async () => {
//         if (!canShift) {
//             toast.error("Pick students and fill new batch & session");
//             return;
//         }
//         try {
//             const res = await axiosInstance.post("/admin/batches/shift", {
//                 admin_id: adminId,
//                 student_ids: selectedStudents,
//                 batch_id: Number(selectedNewBatch),
//                 session: newSession,
//             });
//             toast.success(res.data?.message || "Batch updated successfully");
//             setDrawerOpen(false);
//             setStudents([]);
//             setSelectedStudents([]);
//             setCurrentSession("");
//             setSelectedCurrentBatch("");
//             setNewSession("");
//             setSelectedNewBatch("");
//         } catch (e) {
//             const msg = e?.response?.data?.message || "Failed to update batch";
//             toast.error(msg);
//         }
//     };

//     const fetchHistory = async (studentId) => {
//         try {
//             const res = await axiosInstance.get(
//                 `/admin/batch-shift-logs/${studentId}`
//             );
//             setHistory(res.data || []);
//             setHistoryStudentId(studentId);
//         } catch (e) {
//             toast.error("Failed to fetch batch history");
//             setHistory([]);
//         }
//     };

//     return (
//         <div className="p-6 space-y-6">
//             <h1 className="text-2xl font-bold">Batch Shifting</h1>

//             <button
//                 className="bg-blue-600 text-white px-4 py-2 rounded"
//                 onClick={() => setDrawerOpen(true)}
//             >
//                 Update Batch Shifting
//             </button>

//             {drawerOpen && (
//                 <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-end">
//                     <div className="bg-white w-full md:w-1/2 p-6 overflow-auto">
//                         <h2 className="text-xl font-semibold mb-4">
//                             Update Batch Shifting
//                         </h2>
//                         <button
//                             className="text-red-600 mb-4"
//                             onClick={() => setDrawerOpen(false)}
//                         >
//                             Close
//                         </button>

//                         {/* Current session & batch */}
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
//                             <div>
//                                 <label className="block text-sm mb-1">
//                                     Current Session
//                                 </label>
//                                 <input
//                                     type="text"
//                                     className="border p-2 rounded w-full"
//                                     placeholder="e.g. 2024-25"
//                                     value={currentSession}
//                                     onChange={(e) => {
//                                         setCurrentSession(e.target.value);
//                                         setSelectedCurrentBatch("");
//                                         fetchBatchesBySession(
//                                             e.target.value,
//                                             setCurrentBatches
//                                         );
//                                     }}
//                                 />
//                             </div>
//                             <div>
//                                 <label className="block text-sm mb-1">
//                                     Current Batch
//                                 </label>
//                                 <select
//                                     className="border p-2 rounded w-full"
//                                     value={selectedCurrentBatch}
//                                     onChange={(e) =>
//                                         setSelectedCurrentBatch(e.target.value)
//                                     }
//                                 >
//                                     <option value="">-- Select --</option>
//                                     {currentBatches.map((b) => (
//                                         <option key={b.id} value={b.id}>
//                                             {b.name} ({b.id})
//                                         </option>
//                                     ))}
//                                 </select>
//                             </div>
//                             <div className="flex items-end">
//                                 <button
//                                     onClick={fetchStudents}
//                                     className="bg-blue-600 text-white px-4 py-2 rounded w-full"
//                                     disabled={loadingStudents}
//                                 >
//                                     {loadingStudents
//                                         ? "Loading..."
//                                         : "Load Students"}
//                                 </button>
//                             </div>
//                         </div>

//                         {/* Students selection */}
//                         {students.length > 0 && (
//                             <div className="mb-4 border rounded p-3">
//                                 <h3 className="font-semibold mb-2">
//                                     Select Students
//                                 </h3>
//                                 <div className="overflow-auto max-h-64">
//                                     <table className="min-w-full border">
//                                         <thead className="bg-gray-100">
//                                             <tr>
//                                                 <th className="p-2 border">
//                                                     Select
//                                                 </th>
//                                                 <th className="p-2 border">
//                                                     Enroll #
//                                                 </th>
//                                                 <th className="p-2 border">
//                                                     Name
//                                                 </th>
//                                                 <th className="p-2 border">
//                                                     History
//                                                 </th>
//                                             </tr>
//                                         </thead>
//                                         <tbody>
//                                             {students.map((s) => (
//                                                 <tr
//                                                     key={s.id}
//                                                     className="odd:bg-white even:bg-gray-50"
//                                                 >
//                                                     <td className="p-2 border text-center">
//                                                         <input
//                                                             type="checkbox"
//                                                             checked={selectedStudents.includes(
//                                                                 s.id
//                                                             )}
//                                                             onChange={() =>
//                                                                 toggleStudentSelection(
//                                                                     s.id
//                                                                 )
//                                                             }
//                                                         />
//                                                     </td>
//                                                     <td className="p-2 border">
//                                                         {s.enrollment_number}
//                                                     </td>
//                                                     <td className="p-2 border">
//                                                         {s.name}
//                                                     </td>
//                                                     <td className="p-2 border text-center">
//                                                         <button
//                                                             className="text-blue-600 underline"
//                                                             onClick={() =>
//                                                                 fetchHistory(
//                                                                     s.id
//                                                                 )
//                                                             }
//                                                         >
//                                                             View
//                                                         </button>
//                                                     </td>
//                                                 </tr>
//                                             ))}
//                                         </tbody>
//                                     </table>
//                                 </div>
//                             </div>
//                         )}

//                         {/* History */}
//                         {history.length > 0 && historyStudentId && (
//                             <div className="border p-3 rounded mb-4">
//                                 <h3 className="font-semibold mb-2">
//                                     Batch Shift History
//                                 </h3>
//                                 <table className="min-w-full border">
//                                     <thead className="bg-gray-100">
//                                         <tr>
//                                             <th className="p-2 border">
//                                                 Old Batch
//                                             </th>
//                                             <th className="p-2 border">
//                                                 Old Session
//                                             </th>
//                                             <th className="p-2 border">
//                                                 New Batch
//                                             </th>
//                                             <th className="p-2 border">
//                                                 New Session
//                                             </th>
//                                             <th className="p-2 border">
//                                                 Updated By
//                                             </th>
//                                             <th className="p-2 border">Date</th>
//                                         </tr>
//                                     </thead>
//                                     <tbody>
//                                         {history.map((h) => (
//                                             <tr
//                                                 key={h.id}
//                                                 className="odd:bg-white even:bg-gray-50"
//                                             >
//                                                 <td className="p-2 border">
//                                                     {h.oldBatch?.name ||
//                                                         h.old_batch_id}
//                                                 </td>
//                                                 <td className="p-2 border">
//                                                     {h.old_session}
//                                                 </td>
//                                                 <td className="p-2 border">
//                                                     {h.newBatch?.name ||
//                                                         h.new_batch_id}
//                                                 </td>
//                                                 <td className="p-2 border">
//                                                     {h.new_session}
//                                                 </td>
//                                                 <td className="p-2 border">
//                                                     {h.admin?.name || "Admin"}
//                                                 </td>
//                                                 <td className="p-2 border">
//                                                     {new Date(
//                                                         h.created_at
//                                                     ).toLocaleString()}
//                                                 </td>
//                                             </tr>
//                                         ))}
//                                     </tbody>
//                                 </table>
//                             </div>
//                         )}

//                         {/* New session & batch */}
//                         {selectedStudents.length > 0 && (
//                             <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
//                                 <div>
//                                     <label className="block text-sm mb-1">
//                                         New Session
//                                     </label>
//                                     <input
//                                         type="text"
//                                         className="border p-2 rounded w-full"
//                                         placeholder="e.g. 2025-26"
//                                         value={newSession}
//                                         onChange={(e) => {
//                                             setNewSession(e.target.value);
//                                             setSelectedNewBatch("");
//                                             fetchBatchesBySession(
//                                                 e.target.value,
//                                                 setNewBatches
//                                             );
//                                         }}
//                                     />
//                                 </div>
//                                 <div>
//                                     <label className="block text-sm mb-1">
//                                         New Batch
//                                     </label>
//                                     <select
//                                         className="border p-2 rounded w-full"
//                                         value={selectedNewBatch}
//                                         onChange={(e) =>
//                                             setSelectedNewBatch(e.target.value)
//                                         }
//                                     >
//                                         <option value="">-- Select --</option>
//                                         {newBatches.map((b) => (
//                                             <option key={b.id} value={b.id}>
//                                                 {b.name} ({b.id})
//                                             </option>
//                                         ))}
//                                     </select>
//                                 </div>
//                                 <div className="flex items-end">
//                                     <button
//                                         onClick={handleShift}
//                                         className="bg-green-600 text-white px-4 py-2 rounded w-full"
//                                         disabled={!canShift}
//                                     >
//                                         Update Batch ({selectedStudents.length})
//                                     </button>
//                                 </div>
//                             </div>
//                         )}
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default BatchShifting;
// BatchShifting.layout = (page) => <AdminLayout>{page}</AdminLayout>;

import React, { useEffect, useState, useMemo } from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import axiosInstance from "@/utils/axiosInstance";
import { useBaseContext } from "@/contexts/adminContext";
import toast from "react-hot-toast";

const BatchShifting = () => {
    const { admin } = useBaseContext();
    const adminId = admin?.id;

    const [drawerOpen, setDrawerOpen] = useState(false);

    // Current session & batch
    const [currentSession, setCurrentSession] = useState("");
    const [currentBatches, setCurrentBatches] = useState([]);
    const [selectedCurrentBatch, setSelectedCurrentBatch] = useState("");

    // Students
    const [students, setStudents] = useState([]);
    const [selectedStudents, setSelectedStudents] = useState([]);
    const [loadingStudents, setLoadingStudents] = useState(false);

    // New session & batch
    const [newSession, setNewSession] = useState("");
    const [newBatches, setNewBatches] = useState([]);
    const [selectedNewBatch, setSelectedNewBatch] = useState("");

    // Batch shift history
    const [history, setHistory] = useState([]);
    const [loadingHistory, setLoadingHistory] = useState(false);

    // 🔹 Fetch batches for a session
    const fetchBatchesBySession = async (session, setBatchState) => {
        if (!session || !adminId) return;
        try {
            const res = await axiosInstance.get(
                `/admin/${adminId}/batches?session=${session}`
            );
            setBatchState(res.data || []);
        } catch (e) {
            toast.error("Failed to fetch batches for session");
        }
    };

    // 🔹 Fetch students for selected batch/session
    const fetchStudents = async () => {
        if (!selectedCurrentBatch || !currentSession) {
            toast.error("Select batch and session first");
            return;
        }
        setLoadingStudents(true);
        try {
            const res = await axiosInstance.get(
                `/admin/batches/shift/${adminId}/${selectedCurrentBatch}/${currentSession}`
            );
            setStudents(res.data?.data || []);
            setSelectedStudents([]);
        } catch (e) {
            toast.error("Failed to fetch students");
            setStudents([]);
        } finally {
            setLoadingStudents(false);
        }
    };

    // 🔹 Toggle student selection
    const toggleStudentSelection = (id) => {
        setSelectedStudents((prev) =>
            prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
        );
    };

    // 🔹 Check if shift action can be performed
    const canShift = useMemo(
        () => selectedStudents.length > 0 && selectedNewBatch && newSession,
        [selectedStudents, selectedNewBatch, newSession]
    );

    // 🔹 Handle batch shifting
    const handleShift = async () => {
        if (!canShift) {
            toast.error("Pick students and fill new batch & session");
            return;
        }
        try {
            const res = await axiosInstance.post("/admin/batches/shift", {
                admin_id: adminId,
                student_ids: selectedStudents,
                batch_id: Number(selectedNewBatch),
                session: newSession,
            });
            toast.success(res.data?.message || "Batch updated successfully");
            setDrawerOpen(false);
            setStudents([]);
            setSelectedStudents([]);
            setCurrentSession("");
            setSelectedCurrentBatch("");
            setNewSession("");
            setSelectedNewBatch("");
            fetchAllHistory(); // Refresh history after shifting
        } catch (e) {
            const msg = e?.response?.data?.message || "Failed to update batch";
            toast.error(msg);
        }
    };

    // 🔹 Fetch full batch shift history
    const fetchAllHistory = async () => {
        if (!adminId) return;
        try {
            setLoadingHistory(true);
            const res = await axiosInstance.get(
                `/admin/${adminId}/batch-shift-logs`
            );
            setHistory(res.data || []);
        } catch (e) {
            toast.error("Failed to fetch batch shift history");
            setHistory([]);
        } finally {
            setLoadingHistory(false);
        }
    };

    // Load history when adminId is available
    useEffect(() => {
        if (adminId) {
            fetchAllHistory();
        }
    }, [adminId]);

    return (
        <div className="p-6 space-y-6">
            <h1 className="text-2xl font-bold">Batch Shifting</h1>

            {/* Open Drawer Button */}
            <button
                className="bg-blue-600 text-white px-4 py-2 rounded"
                onClick={() => setDrawerOpen(true)}
            >
                Update Batch Shifting
            </button>

            {/* Drawer */}
            {drawerOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-end z-50">
                    <div className="bg-white w-full md:w-1/2 p-6 overflow-auto">
                        <h2 className="text-xl font-semibold mb-4">
                            Update Batch Shifting
                        </h2>
                        <button
                            className="text-red-600 mb-4"
                            onClick={() => setDrawerOpen(false)}
                        >
                            Close
                        </button>

                        {/* Current Session & Batch */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                            <div>
                                <label className="block text-sm mb-1">
                                    Current Session
                                </label>
                                <input
                                    type="text"
                                    className="border p-2 rounded w-full"
                                    placeholder="e.g. 2024-25"
                                    value={currentSession}
                                    onChange={(e) => {
                                        setCurrentSession(e.target.value);
                                        setSelectedCurrentBatch("");
                                        fetchBatchesBySession(
                                            e.target.value,
                                            setCurrentBatches
                                        );
                                    }}
                                />
                            </div>
                            <div>
                                <label className="block text-sm mb-1">
                                    Current Batch
                                </label>
                                <select
                                    className="border p-2 rounded w-full"
                                    value={selectedCurrentBatch}
                                    onChange={(e) =>
                                        setSelectedCurrentBatch(e.target.value)
                                    }
                                >
                                    <option value="">-- Select --</option>
                                    {currentBatches.map((b) => (
                                        <option key={b.id} value={b.id}>
                                            {b.name} ({b.id})
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex items-end">
                                <button
                                    onClick={fetchStudents}
                                    className="bg-blue-600 text-white px-4 py-2 rounded w-full"
                                    disabled={loadingStudents}
                                >
                                    {loadingStudents
                                        ? "Loading..."
                                        : "Load Students"}
                                </button>
                            </div>
                        </div>

                        {/* Students Selection */}
                        {students.length > 0 && (
                            <div className="mb-4 border rounded p-3">
                                <h3 className="font-semibold mb-2">
                                    Select Students
                                </h3>
                                <div className="overflow-auto max-h-64">
                                    <table className="min-w-full border">
                                        <thead className="bg-gray-100">
                                            <tr>
                                                <th className="p-2 border">
                                                    Select
                                                </th>
                                                <th className="p-2 border">
                                                    Enroll #
                                                </th>
                                                <th className="p-2 border">
                                                    Name
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {students.map((s) => (
                                                <tr
                                                    key={s.id}
                                                    className="odd:bg-white even:bg-gray-50"
                                                >
                                                    <td className="p-2 border text-center">
                                                        <input
                                                            type="checkbox"
                                                            checked={selectedStudents.includes(
                                                                s.id
                                                            )}
                                                            onChange={() =>
                                                                toggleStudentSelection(
                                                                    s.id
                                                                )
                                                            }
                                                        />
                                                    </td>
                                                    <td className="p-2 border">
                                                        {s.enrollment_number}
                                                    </td>
                                                    <td className="p-2 border">
                                                        {s.name}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}

                        {/* New Session & Batch */}
                        {selectedStudents.length > 0 && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                                <div>
                                    <label className="block text-sm mb-1">
                                        New Session
                                    </label>
                                    <input
                                        type="text"
                                        className="border p-2 rounded w-full"
                                        placeholder="e.g. 2025-26"
                                        value={newSession}
                                        onChange={(e) => {
                                            setNewSession(e.target.value);
                                            setSelectedNewBatch("");
                                            fetchBatchesBySession(
                                                e.target.value,
                                                setNewBatches
                                            );
                                        }}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm mb-1">
                                        New Batch
                                    </label>
                                    <select
                                        className="border p-2 rounded w-full"
                                        value={selectedNewBatch}
                                        onChange={(e) =>
                                            setSelectedNewBatch(e.target.value)
                                        }
                                    >
                                        <option value="">-- Select --</option>
                                        {newBatches.map((b) => (
                                            <option key={b.id} value={b.id}>
                                                {b.name} ({b.id})
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="flex items-end">
                                    <button
                                        onClick={handleShift}
                                        className="bg-green-600 text-white px-4 py-2 rounded w-full"
                                        disabled={!canShift}
                                    >
                                        Update Batch ({selectedStudents.length})
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* 🔥 Full Batch Shift History Table */}
            <div className="border p-3 rounded">
                <h3 className="font-semibold mb-2">Batch Shift History</h3>
                {loadingHistory ? (
                    <p>Loading history...</p>
                ) : history.length === 0 ? (
                    <p>No batch shift history found.</p>
                ) : (
                    <div className="overflow-auto">
                        <table className="min-w-full border">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="p-2 border">
                                        Enrollment No.
                                    </th>
                                    <th className="p-2 border">Student</th>
                                    <th className="p-2 border">Old Batch</th>
                                    <th className="p-2 border">Old Session</th>
                                    <th className="p-2 border">New Batch</th>
                                    <th className="p-2 border">New Session</th>
                                    <th className="p-2 border">Updated By</th>
                                    <th className="p-2 border">Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {history.map((h) => (
                                    <tr
                                        key={h.id}
                                        className="odd:bg-white even:bg-gray-50"
                                    >
                                        <td className="p-2 border">
                                            {h.student?.enrollment_number ||
                                                "-"}
                                        </td>
                                        <td className="p-2 border">
                                            {h.student?.name || "-"}
                                        </td>
                                        <td className="p-2 border">
                                            {h.oldBatch?.name || h.old_batch_id}
                                        </td>
                                        <td className="p-2 border">
                                            {h.old_session}
                                        </td>
                                        <td className="p-2 border">
                                            {h.newBatch?.name || h.new_batch_id}
                                        </td>
                                        <td className="p-2 border">
                                            {h.new_session}
                                        </td>
                                        <td className="p-2 border">
                                            {h.admin?.name || "Admin"}
                                        </td>
                                        <td className="p-2 border">
                                            {new Date(
                                                h.created_at
                                            ).toLocaleString()}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BatchShifting;
BatchShifting.layout = (page) => <AdminLayout>{page}</AdminLayout>;
