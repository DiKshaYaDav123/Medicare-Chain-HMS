import React, { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Users,
  CheckCircle,
  XCircle,
  BadgeIndianRupee,
  FileText,
  Phone,
  CalendarDays,
  UserRound,
} from "lucide-react";

const API_BASE = "http://localhost:4000";

/* ================= HELPERS ================= */

const parseDateTime = (date, time) => {
  if (!date || !time) return new Date(0);

  const rawTime = String(time).trim();

  if (/am|pm/i.test(rawTime)) {
    const match = rawTime.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
    if (!match) return new Date(`${date}T00:00:00`);

    let hh = Number(match[1]);
    const mm = match[2];
    const ampm = match[3].toUpperCase();

    if (ampm === "AM" && hh === 12) hh = 0;
    if (ampm === "PM" && hh !== 12) hh += 12;

    return new Date(`${date}T${String(hh).padStart(2, "0")}:${mm}:00`);
  }

  return new Date(`${date}T${rawTime}:00`);
};

const formatDate = (date) => {
  if (!date) return "";
  const d = new Date(`${date}T00:00:00`);
  if (Number.isNaN(d.getTime())) return date;

  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

const formatTime = (time) => {
  if (!time) return "";

  const rawTime = String(time).trim();

  if (/am|pm/i.test(rawTime)) {
    return rawTime.toUpperCase();
  }

  const parts = rawTime.split(":");
  if (parts.length < 2) return rawTime;

  let hh = Number(parts[0]);
  const mm = parts[1];
  const ampm = hh >= 12 ? "PM" : "AM";
  hh = hh % 12 || 12;

  return `${hh}:${mm} ${ampm}`;
};

const mapStatus = (status) => {
  const value = String(status || "").trim().toLowerCase();

  if (value === "confirmed") return "confirmed";
  if (value === "completed" || value === "complete") return "complete";
  if (value === "canceled" || value === "cancelled") return "cancelled";
  if (value === "rescheduled") return "rescheduled";

  return "pending";
};

const getDoctorIdFromStorage = () => {
  try {
    const possibleKeys = [
      "doctorData",
      "doctor",
      "doctorInfo",
      "loggedDoctor",
    ];

    for (const key of possibleKeys) {
      const raw = localStorage.getItem(key);
      if (!raw) continue;

      const parsed = JSON.parse(raw);

      if (parsed?._id) return String(parsed._id);
      if (parsed?.id) return String(parsed.id);
      if (parsed?.doctor?._id) return String(parsed.doctor._id);
      if (parsed?.doctor?.id) return String(parsed.doctor.id);
    }
  } catch (error) {
    console.warn("Failed to read doctor data from localStorage:", error);
  }

  return "";
};

/* ================= NORMALIZER ================= */

function normalizeAppointment(appointment) {
  if (!appointment) return null;

  let patientId = "";

  if (appointment.patientId) {
    if (
      typeof appointment.patientId === "object" &&
      appointment.patientId !== null
    ) {
      patientId = appointment.patientId._id
        ? String(appointment.patientId._id)
        : "";
    } else {
      patientId = String(appointment.patientId);
    }
  }

  const patientUniqueId =
    (typeof appointment.patientId === "object" &&
      appointment.patientId?.patientUniqueId) ||
    appointment.patientUniqueId ||
    "";

  return {
    id: appointment._id || appointment.id || "",
    patient: appointment.patientName || appointment.name || "Unknown",
    age: appointment.age || "",
    gender: appointment.gender || "",
    doctorName: appointment.doctorId?.name || appointment.doctorName || "Doctor",
    speciality:
      appointment.doctorId?.specialization ||
      appointment.doctorId?.speciality ||
      appointment.speciality ||
      "",
    mobile: appointment.mobile || appointment.phone || "",
    date: appointment.date || "",
    time: appointment.time || "",
    fee: Number(appointment.fees || appointment.fee || 0),
    status: mapStatus(appointment.status),
    patientId,
    patientUniqueId,
  };
}

/* ================= MAIN COMPONENT ================= */

export default function DashboardPage() {
  const params = useParams();
  const navigate = useNavigate();

  const doctorIdFromRoute = params?.id ? String(params.id) : "";
  const doctorId = doctorIdFromRoute || getDoctorIdFromStorage();

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      setError("");

      if (!doctorId) {
        setError("Doctor ID missing in route or localStorage");
        setAppointments([]);
        return;
      }

      const res = await fetch(`${API_BASE}/api/appointments/doctor/${doctorId}`);
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data?.message || "Failed to fetch doctor appointments");
      }

      const normalized = Array.isArray(data?.appointments)
        ? data.appointments.map(normalizeAppointment).filter(Boolean)
        : [];

      setAppointments(normalized);
    } catch (err) {
      console.error("Dashboard fetch error:", err);
      setError(err.message || "Something went wrong");
      setAppointments([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, [doctorId]);

  const sortedAppointments = useMemo(() => {
    return [...appointments].sort(
      (a, b) => parseDateTime(b.date, b.time) - parseDateTime(a.date, a.time)
    );
  }, [appointments]);

  const total = appointments.length;
  const completed = appointments.filter((a) => a.status === "complete").length;
  const cancelled = appointments.filter((a) => a.status === "cancelled").length;
  const earnings = appointments
    .filter((a) => a.status === "complete" || a.status === "confirmed")
    .reduce((sum, a) => sum + a.fee, 0);

  const handleViewHistory = (appointment) => {
    if (!appointment?.patientId) {
      alert("Patient ID missing");
      return;
    }

    if (!doctorId) {
      alert("Doctor ID missing");
      return;
    }

    if (appointment.status !== "confirmed") {
      alert("Only confirmed appointments can open patient history");
      return;
    }

    navigate(`/patient-history/${appointment.patientId}?doctorId=${doctorId}`);
  };

  return (
    <div className="min-h-screen bg-slate-50 px-3 py-4">
      <div className="mx-auto max-w-7xl">
        <div className="mb-4 rounded-xl bg-white px-5 py-4 shadow-sm border border-slate-200">
          <h1 className="text-2xl md:text-3xl font-bold text-slate-800">
            Doctor Dashboard
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage appointments and view patient history
          </p>
        </div>

        {error ? (
          <div className="mb-3 rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-700">
            {error}
          </div>
        ) : null}

        {!doctorId ? (
          <div className="mb-3 rounded-lg border border-yellow-200 bg-yellow-50 px-4 py-2 text-sm text-yellow-800">
            Doctor ID not found. Open this dashboard from doctor login flow.
          </div>
        ) : null}

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
          <StatCard
            title="Total"
            value={total}
            icon={<Users size={22} />}
            color="bg-emerald-100 text-emerald-700"
          />

          <StatCard
            title="Earnings"
            value={`₹${earnings}`}
            icon={<BadgeIndianRupee size={22} />}
            color="bg-blue-100 text-blue-700"
          />

          <StatCard
            title="Completed"
            value={completed}
            icon={<CheckCircle size={22} />}
            color="bg-purple-100 text-purple-700"
          />

          <StatCard
            title="Cancelled"
            value={cancelled}
            icon={<XCircle size={22} />}
            color="bg-rose-100 text-rose-700"
          />
        </div>

        {loading ? (
          <div className="rounded-xl bg-white p-5 text-center shadow-sm border border-slate-200">
            Loading...
          </div>
        ) : sortedAppointments.length === 0 ? (
          <div className="rounded-xl bg-white p-5 text-center shadow-sm border border-slate-200">
            No appointments found
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-3">
            {sortedAppointments.map((appointment) => {
              const canViewHistory =
                appointment.status === "confirmed" &&
                Boolean(appointment.patientId) &&
                Boolean(doctorId);

              return (
                <div
                  key={appointment.id}
                  className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm hover:shadow-md transition"
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-2">
                      <div className="h-10 w-10 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
                        <UserRound size={20} />
                      </div>

                      <div>
                        <h3 className="font-bold text-slate-800 leading-tight">
                          {appointment.patient}
                        </h3>
                        <p className="text-xs text-slate-500">
                          {appointment.age || "N/A"} yrs ·{" "}
                          {appointment.gender || "N/A"}
                        </p>
                      </div>
                    </div>

                    <span
                      className={`rounded-full px-2 py-1 text-[11px] font-semibold capitalize ${
                        appointment.status === "confirmed"
                          ? "bg-blue-50 text-blue-700"
                          : appointment.status === "complete"
                          ? "bg-green-50 text-green-700"
                          : appointment.status === "cancelled"
                          ? "bg-red-50 text-red-700"
                          : "bg-yellow-50 text-yellow-700"
                      }`}
                    >
                      {appointment.status}
                    </span>
                  </div>

                  <div className="space-y-2 text-sm text-slate-600">
                    <p className="font-medium text-slate-700">
                      {appointment.speciality || "Speciality N/A"}
                    </p>

                    <div className="flex items-center gap-2">
                      <CalendarDays size={15} className="text-blue-500" />
                      <span>
                        {formatDate(appointment.date)} •{" "}
                        {formatTime(appointment.time)}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Phone size={15} className="text-emerald-500" />
                      <span>{appointment.mobile || "No mobile"}</span>
                    </div>

                    <div className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2">
                      <span className="text-xs text-slate-500">Fee</span>
                      <span className="font-bold text-slate-800">
                        ₹{appointment.fee}
                      </span>
                    </div>

                    <div className="rounded-lg bg-cyan-50 px-3 py-2 text-xs text-slate-600">
                      <p>PID: {appointment.patientId || "MISSING"}</p>
                      <p>Unique ID: {appointment.patientUniqueId || "N/A"}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleViewHistory(appointment)}
                    disabled={!canViewHistory}
                    className={`mt-3 w-full rounded-lg px-3 py-2 text-sm font-semibold flex items-center justify-center gap-2 transition ${
                      canViewHistory
                        ? "bg-blue-500 text-white hover:bg-blue-600"
                        : "bg-slate-200 text-slate-500 cursor-not-allowed"
                    }`}
                  >
                    <FileText size={16} />
                    View Patient History
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

/* ================= STAT CARD ================= */

function StatCard({ title, value, icon, color }) {
  return (
    <div className="rounded-xl bg-white p-4 shadow-sm border border-slate-200">
      <div className="flex items-center justify-between gap-2">
        <div>
          <p className="text-xs text-slate-500">{title}</p>
          <h3 className="text-xl font-bold mt-1 text-slate-800">{value}</h3>
        </div>

        <div
          className={`h-10 w-10 rounded-lg flex items-center justify-center ${color}`}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}