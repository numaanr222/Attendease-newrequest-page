import React, { useState, useMemo, useRef } from 'react';
import {
  Clock,
  FileText,
  Upload,
  CheckCircle2,
  AlertCircle,
  Search,
  X,
  UserCheck,
  Briefcase,
  Stethoscope,
  Trophy,
  Code2,
  Rocket,
  Award,
  HelpCircle,
  Home,
  Bell,
  FilePlus,
  History,
  User,
  LogOut,
  Phone,
  Eye,
  Trash2,
  Check,
  Plus,
  ChevronDown,
  Send,
  Layers,
  ShieldCheck,
  Sparkles,
  ArrowUpRight
} from 'lucide-react';

interface ReasonItem {
  id: string;
  label: string;
  icon: React.ElementType;
  desc: string;
  badgeBg: string;
  badgeText: string;
}

interface FacultyMember {
  id: string;
  name: string;
  role: string;
  initials: string;
  avatarBg: string;
  avatarText: string;
}

interface PeriodSlot {
  id: string;
  label: string;
  time: string;
  start: string;
  end: string;
  session: 'morning' | 'afternoon';
}

const REASONS: ReasonItem[] = [
  { id: 'Hackathon', label: 'Hackathon', icon: Code2, desc: 'Technical coding event', badgeBg: 'bg-violet-100', badgeText: 'text-violet-600' },
  { id: 'Startup Work', label: 'Startup Work', icon: Rocket, desc: 'Incubation & product', badgeBg: 'bg-teal-100', badgeText: 'text-teal-700' },
  { id: 'College Placement', label: 'Placement Drive', icon: Briefcase, desc: 'Interviews & assessments', badgeBg: 'bg-sky-100', badgeText: 'text-sky-600' },
  { id: 'Medical Leave', label: 'Medical Leave', icon: Stethoscope, desc: 'Clinical or hospital visit', badgeBg: 'bg-rose-100', badgeText: 'text-rose-600' },
  { id: 'Sports Event', label: 'Sports Event', icon: Trophy, desc: 'University tournament', badgeBg: 'bg-amber-100', badgeText: 'text-amber-600' },
  { id: 'Personal Emergency', label: 'Emergency', icon: AlertCircle, desc: 'Urgent personal matter', badgeBg: 'bg-pink-100', badgeText: 'text-pink-600' },
  { id: 'Competition', label: 'Competition', icon: Award, desc: 'Inter-college symposium', badgeBg: 'bg-emerald-100', badgeText: 'text-emerald-600' },
  { id: 'Other', label: 'Other Reason', icon: HelpCircle, desc: 'Specify in description', badgeBg: 'bg-slate-200', badgeText: 'text-slate-600' },
];

const FACULTY_LIST: FacultyMember[] = [
  { id: '1', name: 'A. Aswini Priyanka', role: 'Assistant Professor', initials: 'AP', avatarBg: 'bg-teal-100', avatarText: 'text-teal-800' },
  { id: '2', name: 'Angajala Sriram', role: 'Class Mentor', initials: 'AS', avatarBg: 'bg-violet-100', avatarText: 'text-violet-800' },
  { id: '3', name: 'Anukuri Krishna Veni', role: 'Counselor', initials: 'AV', avatarBg: 'bg-emerald-100', avatarText: 'text-emerald-800' },
  { id: '4', name: 'D. Parvathi', role: 'Subject Teacher', initials: 'DP', avatarBg: 'bg-amber-100', avatarText: 'text-amber-800' },
  { id: '5', name: 'Dr. Gedii Sudhakar', role: 'Professor', initials: 'GS', avatarBg: 'bg-sky-100', avatarText: 'text-sky-800' },
  { id: '6', name: 'Dr. K. Srinivasa Rao', role: 'Head of Department', initials: 'KR', avatarBg: 'bg-rose-100', avatarText: 'text-rose-800' },
  { id: '7', name: 'Dr. N.G.K. Murthy', role: 'Professor', initials: 'NM', avatarBg: 'bg-indigo-100', avatarText: 'text-indigo-800' },
  { id: '8', name: 'Dr. Suresh Babu Mudunuri', role: 'Professor', initials: 'SM', avatarBg: 'bg-teal-100', avatarText: 'text-teal-800' },
  { id: '9', name: 'K. Sri Vijaya', role: 'Assistant Professor', initials: 'KV', avatarBg: 'bg-pink-100', avatarText: 'text-pink-800' },
  { id: '10', name: 'K. N. Sunil Varma', role: 'Counselor', initials: 'SV', avatarBg: 'bg-cyan-100', avatarText: 'text-cyan-800' },
  { id: '11', name: 'M. Bhanu Rajesh Naidu', role: 'Subject Teacher', initials: 'MN', avatarBg: 'bg-purple-100', avatarText: 'text-purple-800' },
  { id: '12', name: 'Mohan Someswara Jupudi', role: 'Class Mentor', initials: 'MJ', avatarBg: 'bg-emerald-100', avatarText: 'text-emerald-800' },
];

const PERIODS: PeriodSlot[] = [
  { id: 'P1', label: 'P1', time: '09:00 - 09:45', start: '09:00 AM', end: '09:45 AM', session: 'morning' },
  { id: 'P2', label: 'P2', time: '09:45 - 10:30', start: '09:45 AM', end: '10:30 AM', session: 'morning' },
  { id: 'P3', label: 'P3', time: '10:30 - 11:15', start: '10:30 AM', end: '11:15 AM', session: 'morning' },
  { id: 'P4', label: 'P4', time: '11:15 - 12:00', start: '11:15 AM', end: '12:00 PM', session: 'morning' },
  { id: 'P5', label: 'P5', time: '01:30 - 02:15', start: '01:30 PM', end: '02:15 PM', session: 'afternoon' },
  { id: 'P6', label: 'P6', time: '02:15 - 03:00', start: '02:15 PM', end: '03:00 PM', session: 'afternoon' },
  { id: 'P7', label: 'P7', time: '03:00 - 03:45', start: '03:00 PM', end: '03:45 PM', session: 'afternoon' },
  { id: 'P8', label: 'P8', time: '03:45 - 04:30', start: '03:45 PM', end: '04:30 PM', session: 'afternoon' },
];

export default function App() {
  const [selectedReason, setSelectedReason] = useState<string>('Hackathon');
  const [otherReasonText, setOtherReasonText] = useState('');
  const [selectedFaculty, setSelectedFaculty] = useState<string[]>(['2']);
  const [facultySearch, setFacultySearch] = useState('');
  const [isFacultyModalOpen, setIsFacultyModalOpen] = useState(false);

  const [requestType, setRequestType] = useState<'Short' | 'Long'>('Short');
  const [permissionDate, setPermissionDate] = useState('2026-10-23');
  const [startDate, setStartDate] = useState('2026-10-23');
  const [endDate, setEndDate] = useState('2026-10-25');
  const [selectedPeriods, setSelectedPeriods] = useState<string[]>(['P1', 'P2']);

  const [description, setDescription] = useState('');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const filteredFaculty = useMemo(() => {
    return FACULTY_LIST.filter(
      (f) =>
        f.name.toLowerCase().includes(facultySearch.toLowerCase()) ||
        f.role.toLowerCase().includes(facultySearch.toLowerCase())
    );
  }, [facultySearch]);

  const toggleFaculty = (id: string) => {
    setSelectedFaculty((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const togglePeriod = (id: string) => {
    setSelectedPeriods((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const applyPeriodPreset = (preset: 'morning' | 'afternoon' | 'all' | 'clear') => {
    if (preset === 'clear') setSelectedPeriods([]);
    if (preset === 'all') setSelectedPeriods(PERIODS.map((p) => p.id));
    if (preset === 'morning')
      setSelectedPeriods(PERIODS.filter((p) => p.session === 'morning').map((p) => p.id));
    if (preset === 'afternoon')
      setSelectedPeriods(PERIODS.filter((p) => p.session === 'afternoon').map((p) => p.id));
  };

  const timeWindowText = useMemo(() => {
    if (requestType === 'Long') return `${startDate} to ${endDate}`;
    if (selectedPeriods.length === 0) return 'No periods selected';
    const ordered = PERIODS.filter((p) => selectedPeriods.includes(p.id));
    return `${ordered[0].start} - ${ordered[ordered.length - 1].end}`;
  }, [requestType, selectedPeriods, startDate, endDate]);

  const stepStatus = useMemo(() => {
    const hasReason = selectedReason === 'Other' ? otherReasonText.trim().length > 0 : Boolean(selectedReason);
    const hasFaculty = selectedFaculty.length > 0;
    const hasDuration =
      requestType === 'Short' ? selectedPeriods.length > 0 : Boolean(startDate && endDate);
    const hasDesc = description.trim().length >= 20;
    const completedCount = [hasReason, hasFaculty, hasDuration, hasDesc].filter(Boolean).length;
    return { hasReason, hasFaculty, hasDuration, hasDesc, completedCount };
  }, [selectedReason, otherReasonText, selectedFaculty, requestType, selectedPeriods, startDate, endDate, description]);

  const isFormValid = stepStatus.completedCount === 4;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  const handleReset = () => {
    setSelectedPeriods([]);
    setDescription('');
    setUploadedFile(null);
    setOtherReasonText('');
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#c5e3e6] via-[#dce7eb] to-[#dcd7f2] p-0 sm:p-4 lg:p-7 flex items-center justify-center text-slate-800">
      {/* OUTER FROSTED GLASS APPLICATION SHELL (Matches CoachPro Reference Frame) */}
      <div className="w-full max-w-[1440px] min-h-screen sm:min-h-[90vh] bg-gradient-to-br from-[#eaf4f5]/90 via-[#f2f6f8]/90 to-[#eceaf6]/85 backdrop-blur-2xl sm:rounded-[34px] sm:border sm:border-white/80 shadow-[0_24px_70px_rgba(15,60,75,0.12)] flex flex-col lg:flex-row overflow-hidden">
        
        {/* =========================================================
            LEFT SIDEBAR NAVIGATION (CoachPro Style Teal Pill)
        ========================================================= */}
        <aside className="hidden lg:flex w-64 flex-col justify-between p-7 shrink-0 border-r border-teal-900/5">
          <div>
            {/* Brand Title */}
            <div className="px-3 pt-1 pb-9">
              <span className="text-xl font-extrabold tracking-tight text-slate-900">
                Attend<span className="text-[#0f7685]">Ease</span>
              </span>
              <p className="text-[11px] font-semibold text-teal-700/70 tracking-wide mt-0.5">
                SRKR Permission Portal
              </p>
            </div>

            {/* Navigation Links */}
            <nav className="space-y-2">
              {[
                { label: 'Dashboard', icon: Home, active: false },
                { label: 'New Request', icon: FilePlus, active: true },
                { label: 'Notifications', icon: Bell, active: false },
                { label: 'Request History', icon: History, active: false },
                { label: 'Certificates', icon: Award, active: false },
                { label: 'Student Profile', icon: User, active: false },
              ].map((item) => (
                <a
                  key={item.label}
                  href="#nav"
                  className={`flex items-center gap-3.5 px-4 py-3 rounded-2xl text-xs font-bold transition-all ${
                    item.active
                      ? 'bg-[#0f7685] text-white shadow-[0_10px_22px_-5px_rgba(15,118,133,0.45)]'
                      : 'text-slate-500 hover:text-slate-800 hover:bg-white/50'
                  }`}
                >
                  <span
                    className={`w-6 h-6 rounded-lg flex items-center justify-center ${
                      item.active ? 'bg-white/20 text-white' : 'bg-[#d9ecee] text-[#0f7685]'
                    }`}
                  >
                    <item.icon className="w-3.5 h-3.5" />
                  </span>
                  <span>{item.label}</span>
                </a>
              ))}
            </nav>
          </div>

          {/* Bottom Department & Logout */}
          <div className="space-y-4 pt-6 border-t border-teal-900/5">
            <div className="px-4 py-3.5 rounded-2xl bg-white/60 border border-white/80">
              <p className="text-[10px] font-extrabold uppercase tracking-wider text-[#0f7685]">
                CSD & CSIT Department
              </p>
              <p className="text-[11px] font-medium text-slate-500 mt-0.5">
                S.R.K.R. Engineering College
              </p>
            </div>

            <button
              type="button"
              className="flex items-center gap-3 px-4 py-2.5 w-full rounded-xl text-xs font-bold text-slate-500 hover:text-rose-600 transition-colors"
            >
              <span className="w-6 h-6 rounded-lg bg-rose-100/80 text-rose-600 flex items-center justify-center">
                <LogOut className="w-3.5 h-3.5" />
              </span>
              <span>Sign Out</span>
            </button>
          </div>
        </aside>

        {/* =========================================================
            MAIN WORKSPACE CONTAINER
        ========================================================= */}
        <div className="flex-1 flex flex-col min-w-0 pb-24 lg:pb-8">
          {/* TOP BAR (Mobile & Desktop Header) */}
          <header className="px-5 sm:px-8 lg:px-10 pt-5 sm:pt-7 pb-4 flex items-center justify-between gap-4">
            {/* Left Greeting & Big Editorial Title */}
            <div>
              <p className="text-xs sm:text-sm font-bold text-teal-600 tracking-tight">
                AttendEase Portal, Mohammad Numaan Raza
              </p>
              <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mt-0.5">
                New Request
              </h1>
            </div>

            {/* Right Utility Icons & User Profile */}
            <div className="flex items-center gap-2.5 sm:gap-4">
              <button
                type="button"
                onClick={() => setIsFacultyModalOpen(true)}
                title="Search Faculty"
                className="w-9 h-9 rounded-xl bg-white/75 border border-white flex items-center justify-center text-slate-600 hover:text-[#0f7685] shadow-xs transition"
              >
                <Search className="w-4 h-4" />
              </button>

              <button
                type="button"
                title="Helpline"
                className="w-9 h-9 rounded-xl bg-white/75 border border-white flex items-center justify-center text-slate-600 hover:text-[#0f7685] shadow-xs transition"
              >
                <Phone className="w-4 h-4" />
              </button>

              <button
                type="button"
                className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/75 border border-white text-xs font-bold text-[#0f7685] shadow-xs hover:bg-white transition"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>View Permissions</span>
              </button>

              <div className="flex items-center gap-2.5 pl-1 sm:pl-2">
                <div className="w-9 h-9 rounded-full bg-[#0f7685] text-white font-extrabold text-xs flex items-center justify-center shadow-sm ring-2 ring-white">
                  NR
                </div>
                <div className="hidden xl:block">
                  <p className="text-xs font-bold text-slate-800 leading-none">Mohammad Numaan</p>
                  <p className="text-[10px] font-semibold text-slate-400 mt-1">B.Tech CS & IT</p>
                </div>
              </div>
            </div>
          </header>

          {/* =========================================================
              BENTO DASHBOARD GRID (12 Columns)
          ========================================================= */}
          <form
            onSubmit={handleSubmit}
            className="flex-1 px-5 sm:px-8 lg:px-10 pt-2 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start"
          >
            {/* -------------------------------------------------------
                LEFT COLUMN (7 Cols): Main Interactive Form Cards
            ------------------------------------------------------- */}
            <div className="lg:col-span-7 space-y-6">
              {/* BENTO CARD 1: Reason & Faculty Selection */}
              <section className="bg-white/75 backdrop-blur-md rounded-[26px] border border-white/90 shadow-[0_10px_30px_rgba(15,60,75,0.05)] p-5 sm:p-7 space-y-5">
                <div className="flex items-center justify-between">
                  <h2 className="text-sm sm:text-base font-extrabold text-slate-800">
                    Reason & Faculty Routing
                  </h2>
                  <button
                    type="button"
                    onClick={() => setIsFacultyModalOpen(true)}
                    className="text-xs font-bold text-[#0f7685] hover:underline"
                  >
                    Browse all faculty
                  </button>
                </div>

                {/* 2-Col Mobile / 4-Col Desktop Soft Reason Cards */}
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2.5">
                    Select Absence Category
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {REASONS.map((item) => {
                      const Icon = item.icon;
                      const isSelected = selectedReason === item.id;
                      return (
                        <button
                          type="button"
                          key={item.id}
                          onClick={() => setSelectedReason(item.id)}
                          className={`group flex flex-col items-start p-3.5 rounded-2xl border text-left transition-all ${
                            isSelected
                              ? 'bg-[#0f7685] border-[#0f7685] text-white shadow-[0_8px_20px_-4px_rgba(15,118,133,0.4)]'
                              : 'bg-white/80 border-white hover:bg-white text-slate-800 shadow-2xs'
                          }`}
                        >
                          <div className="flex items-center justify-between w-full mb-2">
                            <span
                              className={`w-8 h-8 rounded-xl flex items-center justify-center transition ${
                                isSelected
                                  ? 'bg-white/20 text-white'
                                  : `${item.badgeBg} ${item.badgeText}`
                              }`}
                            >
                              <Icon className="w-4 h-4" />
                            </span>
                            {isSelected && <Check className="w-4 h-4 text-teal-200" />}
                          </div>
                          <p className="text-xs font-extrabold tracking-tight">{item.label}</p>
                          <p
                            className={`text-[10px] mt-0.5 line-clamp-1 ${
                              isSelected ? 'text-teal-100' : 'text-slate-400'
                            }`}
                          >
                            {item.desc}
                          </p>
                        </button>
                      );
                    })}
                  </div>

                  {/* NEW: Dynamic "Other" Reason Input with 30 char limit */}
                  {selectedReason === 'Other' && (
                    <div className="mt-4 animate-in fade-in slide-in-from-top-2 duration-200">
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                          Please Specify Reason <span className="text-rose-500">*</span>
                        </label>
                        <span className={`text-[10px] font-bold ${otherReasonText.length >= 30 ? 'text-rose-500' : 'text-slate-400'}`}>
                          {otherReasonText.length}/30
                        </span>
                      </div>
                      <input
                        type="text"
                        maxLength={30}
                        value={otherReasonText}
                        onChange={(e) => setOtherReasonText(e.target.value)}
                        placeholder="E.g., Family function, Visa interview..."
                        className="w-full px-4 py-2.5 bg-white/90 border border-slate-200/80 rounded-2xl text-xs sm:text-sm font-medium text-slate-800 focus:bg-white focus:outline-none focus:border-[#0f7685] transition shadow-2xs"
                      />
                    </div>
                  )}
                </div>

                {/* Faculty Selector Trigger & Selected Pills */}
                <div className="pt-1">
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Authorized Faculty Member(s)
                    </label>
                    <span className="text-[11px] font-bold text-[#0f7685]">
                      {selectedFaculty.length} tagged
                    </span>
                  </div>

                  {selectedFaculty.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {selectedFaculty.map((id) => {
                        const fac = FACULTY_LIST.find((f) => f.id === id);
                        if (!fac) return null;
                        return (
                          <span
                            key={id}
                            className="inline-flex items-center gap-2 pl-1.5 pr-3 py-1 rounded-full bg-white border border-teal-900/10 shadow-2xs text-xs font-bold text-slate-700"
                          >
                            <span
                              className={`w-6 h-6 rounded-full ${fac.avatarBg} ${fac.avatarText} text-[10px] font-extrabold flex items-center justify-center`}
                            >
                              {fac.initials}
                            </span>
                            <span>{fac.name}</span>
                            <button
                              type="button"
                              onClick={() => toggleFaculty(id)}
                              className="text-slate-400 hover:text-rose-600 transition"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </span>
                        );
                      })}
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={() => setIsFacultyModalOpen(true)}
                    className="w-full flex items-center justify-between px-4 py-3.5 rounded-2xl bg-white/90 hover:bg-white border border-slate-200/70 text-xs sm:text-sm font-semibold text-slate-600 shadow-2xs transition"
                  >
                    <span className="flex items-center gap-2.5 truncate">
                      <UserCheck className="w-4 h-4 text-[#0f7685] shrink-0" />
                      <span>Search and select faculty members from list...</span>
                    </span>
                    <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                  </button>

                  <p className="text-[11px] text-slate-400 mt-2 leading-relaxed">
                    Selected Class Mentors, Counselors, or Subject Teachers will receive your
                    request for approval.
                  </p>
                </div>
              </section>

              {/* BENTO CARD 2: Request Type, Date & Period Matrix */}
              <section className="bg-white/75 backdrop-blur-md rounded-[26px] border border-white/90 shadow-[0_10px_30px_rgba(15,60,75,0.05)] p-5 sm:p-7 space-y-5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h2 className="text-sm sm:text-base font-extrabold text-slate-800">
                    Request Duration & Schedule
                  </h2>
                  <span className="text-xs font-bold text-[#0f7685] bg-teal-50 px-3 py-1 rounded-full border border-teal-200/60">
                    {timeWindowText}
                  </span>
                </div>

                {/* Segmented Mode Switcher + Date Input Row */}
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-end">
                  <div className="sm:col-span-6">
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                      Duration Mode
                    </label>
                    <div className="grid grid-cols-2 gap-1.5 p-1 bg-slate-200/60 rounded-2xl">
                      {(['Short', 'Long'] as const).map((mode) => (
                        <button
                          key={mode}
                          type="button"
                          onClick={() => setRequestType(mode)}
                          className={`py-2.5 rounded-xl text-xs font-extrabold transition-all ${
                            requestType === mode
                              ? 'bg-[#0f7685] text-white shadow-xs'
                              : 'text-slate-600 hover:text-slate-900'
                          }`}
                        >
                          {mode === 'Short' ? 'Short (Periods)' : 'Long (Multi-Day)'}
                        </button>
                      ))}
                    </div>
                  </div>

                  {requestType === 'Short' ? (
                    <div className="sm:col-span-6">
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                        Permission Date
                      </label>
                      <input
                        type="date"
                        value={permissionDate}
                        onChange={(e) => setPermissionDate(e.target.value)}
                        className="w-full px-4 py-2.5 bg-white border border-slate-200/80 rounded-2xl text-xs sm:text-sm font-bold text-slate-800 focus:outline-none focus:border-[#0f7685]"
                      />
                    </div>
                  ) : (
                    <div className="sm:col-span-6 grid grid-cols-2 gap-2.5">
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                          Start Date
                        </label>
                        <input
                          type="date"
                          value={startDate}
                          onChange={(e) => setStartDate(e.target.value)}
                          className="w-full px-3 py-2.5 bg-white border border-slate-200/80 rounded-xl text-xs font-bold text-slate-800"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                          End Date
                        </label>
                        <input
                          type="date"
                          value={endDate}
                          min={startDate}
                          onChange={(e) => setEndDate(e.target.value)}
                          className="w-full px-3 py-2.5 bg-white border border-slate-200/80 rounded-xl text-xs font-bold text-slate-800"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Period Selection Grid (4x2 Matrix) */}
                {requestType === 'Short' && (
                  <div className="space-y-3 pt-1">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                        Select Class Periods
                      </span>
                      <div className="flex items-center gap-1.5 overflow-x-auto">
                        {[
                          { label: 'Morning (P1-P4)', key: 'morning' },
                          { label: 'Afternoon (P5-P8)', key: 'afternoon' },
                          { label: 'Full Day', key: 'all' },
                          { label: 'Clear', key: 'clear' },
                        ].map((preset) => (
                          <button
                            key={preset.key}
                            type="button"
                            onClick={() => applyPeriodPreset(preset.key as any)}
                            className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-white/80 hover:bg-[#0f7685] hover:text-white text-slate-600 border border-slate-200/60 transition shrink-0"
                          >
                            {preset.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-4 gap-2.5">
                      {PERIODS.map((period) => {
                        const active = selectedPeriods.includes(period.id);
                        return (
                          <button
                            type="button"
                            key={period.id}
                            onClick={() => togglePeriod(period.id)}
                            className={`py-3 px-2 rounded-2xl border text-center transition-all flex flex-col items-center justify-center ${
                              active
                                ? 'bg-[#0f7685] border-[#0f7685] text-white shadow-[0_8px_18px_-4px_rgba(15,118,133,0.4)]'
                                : 'bg-white/80 border-white text-slate-700 hover:bg-white'
                            }`}
                          >
                            <span className="text-xs sm:text-sm font-extrabold">{period.label}</span>
                            <span
                              className={`text-[9px] sm:text-[10px] font-semibold mt-0.5 ${
                                active ? 'text-teal-100' : 'text-slate-400'
                              }`}
                            >
                              {period.time}
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    {selectedPeriods.length === 0 && (
                      <p className="text-xs font-bold text-rose-600 flex items-center gap-1.5 pt-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        Please select at least one period to continue.
                      </p>
                    )}
                  </div>
                )}
              </section>

              {/* BENTO CARD 3: Description & Supporting Document */}
              <section className="bg-white/75 backdrop-blur-md rounded-[26px] border border-white/90 shadow-[0_10px_30px_rgba(15,60,75,0.05)] p-5 sm:p-7 space-y-5">
                <div className="flex items-center justify-between">
                  <h2 className="text-sm sm:text-base font-extrabold text-slate-800">
                    Absence Details & Supporting Proof
                  </h2>
                  <button
                    type="button"
                    onClick={() => {
                      const displayReason = selectedReason === 'Other' && otherReasonText.trim() ? otherReasonText.trim() : selectedReason;
                      setDescription(
                        `Requesting official attendance permission for ${displayReason} on ${permissionDate}. I will complete any missed lab work and coursework promptly.`
                      )
                    }}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0f7685] hover:underline"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Auto-fill template</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
                  {/* Description Textarea */}
                  <div className="md:col-span-7 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                          Detailed Explanation
                        </label>
                        <span
                          className={`text-[11px] font-extrabold ${
                            description.trim().length >= 20 ? 'text-emerald-600' : 'text-amber-600'
                          }`}
                        >
                          {description.trim().length} / 20 min chars
                        </span>
                      </div>
                      <textarea
                        rows={4}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Provide event details, venue, or reason for absence..."
                        className="w-full p-3.5 bg-white/90 border border-slate-200/80 rounded-2xl text-xs sm:text-sm font-medium text-slate-800 focus:bg-white focus:outline-none focus:border-[#0f7685] transition resize-none"
                      />
                    </div>
                  </div>

                  {/* Document Dropzone */}
                  <div className="md:col-span-5 flex flex-col">
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                        Attachment
                      </label>
                      <span className="text-[10px] font-bold text-slate-400">Optional (Max 10MB)</span>
                    </div>

                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          setUploadedFile(e.target.files[0]);
                        }
                      }}
                    />

                    {!uploadedFile ? (
                      <div
                        onClick={() => fileInputRef.current?.click()}
                        className="flex-1 border-2 border-dashed border-teal-800/15 hover:border-[#0f7685] bg-white/60 hover:bg-white rounded-2xl p-4 flex flex-col items-center justify-center text-center cursor-pointer transition min-h-[116px]"
                      >
                        <div className="w-9 h-9 rounded-xl bg-teal-50 text-[#0f7685] flex items-center justify-center mb-2">
                          <Upload className="w-4 h-4" />
                        </div>
                        <p className="text-xs font-extrabold text-slate-700">
                          Upload Proof Document
                        </p>
                        <p className="text-[10px] font-semibold text-slate-400 mt-0.5">
                          PDF, JPG or PNG
                        </p>
                      </div>
                    ) : (
                      <div className="flex-1 bg-white border border-teal-900/10 rounded-2xl p-4 flex flex-col justify-between">
                        <div className="flex items-start gap-2.5">
                          <div className="w-8 h-8 rounded-lg bg-teal-50 text-[#0f7685] flex items-center justify-center shrink-0">
                            <FileText className="w-4 h-4" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-xs font-extrabold text-slate-800 truncate">
                              {uploadedFile.name}
                            </p>
                            <p className="text-[10px] font-semibold text-slate-400 mt-0.5">
                              {(uploadedFile.size / 1024).toFixed(1)} KB attached
                            </p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => setUploadedFile(null)}
                          className="mt-2 inline-flex items-center gap-1 text-[11px] font-bold text-rose-600 hover:underline self-end"
                        >
                          <Trash2 className="w-3 h-3" />
                          <span>Remove file</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </section>
            </div>

            {/* -------------------------------------------------------
                RIGHT COLUMN (5 Cols): CoachPro Statistics, 2x2 Mini
                Bento Cards & Deep Teal Action Banner
            ------------------------------------------------------- */}
            <aside className="lg:col-span-5 space-y-6 lg:sticky lg:top-6">
              {/* TOP RIGHT CARD: Readiness Statistic (Matches "Games statistic" multi-color bar) */}
              <div className="bg-white/75 backdrop-blur-md rounded-[26px] border border-white/90 shadow-[0_10px_30px_rgba(15,60,75,0.05)] p-5 sm:p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-extrabold text-slate-800">Request Readiness</h3>
                  <span className="text-xs font-bold text-[#0f7685]">
                    {stepStatus.completedCount * 25}% Complete
                  </span>
                </div>

                {/* Multi-Segment Color Progress Bar */}
                <div className="h-2.5 w-full rounded-full bg-slate-200/70 overflow-hidden flex gap-1 p-0.5">
                  <div
                    className={`h-full flex-1 rounded-full transition-all duration-300 ${
                      stepStatus.hasReason ? 'bg-[#0f7685]' : 'bg-transparent'
                    }`}
                  />
                  <div
                    className={`h-full flex-1 rounded-full transition-all duration-300 ${
                      stepStatus.hasFaculty ? 'bg-emerald-500' : 'bg-transparent'
                    }`}
                  />
                  <div
                    className={`h-full flex-1 rounded-full transition-all duration-300 ${
                      stepStatus.hasDuration ? 'bg-amber-400' : 'bg-transparent'
                    }`}
                  />
                  <div
                    className={`h-full flex-1 rounded-full transition-all duration-300 ${
                      stepStatus.hasDesc ? 'bg-rose-400' : 'bg-transparent'
                    }`}
                  />
                </div>

                {/* 4-Column Stat Breakdown Row */}
                <div className="grid grid-cols-4 gap-2 pt-4 mt-4 border-t border-slate-200/60 text-center">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      REASON
                    </p>
                    <p className="text-sm font-extrabold text-slate-800 mt-1">
                      {stepStatus.hasReason ? '1' : '0'}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      FACULTY
                    </p>
                    <p className="text-sm font-extrabold text-slate-800 mt-1">
                      {selectedFaculty.length}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      PERIODS
                    </p>
                    <p className="text-sm font-extrabold text-slate-800 mt-1">
                      {requestType === 'Short' ? selectedPeriods.length : 'Full'}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      PROOF
                    </p>
                    <p className="text-sm font-extrabold text-slate-800 mt-1">
                      {uploadedFile ? 'Yes' : 'Opt'}
                    </p>
                  </div>
                </div>
              </div>

              {/* MIDDLE RIGHT: 2x2 Grid of Metric Mini-Cards (Matches Possession / Overall Price cards) */}
              <div className="grid grid-cols-2 gap-4 sm:gap-5">
                {/* Mini Card 1: Lavender Icon */}
                <div className="bg-white/75 backdrop-blur-md rounded-[24px] border border-white/90 shadow-[0_10px_30px_rgba(15,60,75,0.05)] p-4 sm:p-5 flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-2xl bg-violet-100 text-violet-600 flex items-center justify-center shrink-0">
                    <Layers className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                      CATEGORY
                    </p>
                    <p 
                      className="text-base sm:text-lg font-extrabold text-slate-800 truncate mt-0.5" 
                      title={selectedReason === 'Other' && otherReasonText.trim() ? otherReasonText : selectedReason}
                    >
                      {selectedReason === 'Other' && otherReasonText.trim() ? otherReasonText : selectedReason}
                    </p>
                  </div>
                </div>

                {/* Mini Card 2: Pink Icon */}
                <div className="bg-white/75 backdrop-blur-md rounded-[24px] border border-white/90 shadow-[0_10px_30px_rgba(15,60,75,0.05)] p-4 sm:p-5 flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-2xl bg-pink-100 text-pink-600 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                      DURATION
                    </p>
                    <p className="text-base sm:text-lg font-extrabold text-slate-800 truncate mt-0.5">
                      {requestType === 'Short' ? `${selectedPeriods.length} Periods` : 'Multi-Day'}
                    </p>
                  </div>
                </div>

                {/* Mini Card 3: Soft Orange Icon */}
                <div className="bg-white/75 backdrop-blur-md rounded-[24px] border border-white/90 shadow-[0_10px_30px_rgba(15,60,75,0.05)] p-4 sm:p-5 flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-2xl bg-orange-100 text-orange-500 flex items-center justify-center shrink-0">
                    <UserCheck className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                      APPROVERS
                    </p>
                    <p className="text-base sm:text-lg font-extrabold text-slate-800 truncate mt-0.5">
                      {selectedFaculty.length} Faculty
                    </p>
                  </div>
                </div>

                {/* Mini Card 4: Mint Teal Icon */}
                <div className="bg-white/75 backdrop-blur-md rounded-[24px] border border-white/90 shadow-[0_10px_30px_rgba(15,60,75,0.05)] p-4 sm:p-5 flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-2xl bg-teal-100 text-[#0f7685] flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                      VERIFICATION
                    </p>
                    <p className="text-base sm:text-lg font-extrabold text-slate-800 truncate mt-0.5">
                      {isFormValid ? 'Ready' : 'Pending'}
                    </p>
                  </div>
                </div>
              </div>

              {/* BOTTOM RIGHT: Deep Ocean Teal CTA Action Banner (Matches "Setup training for next week") */}
              <div className="relative overflow-hidden rounded-[26px] bg-gradient-to-br from-[#0f7685] via-[#0c6370] to-[#084c57] text-white p-6 sm:p-7 shadow-[0_18px_40px_-10px_rgba(15,118,133,0.5)]">
                {/* Decorative Geometric Shapes (Replaces 3D Graphic cleanly) */}
                <div className="pointer-events-none select-none absolute -right-10 -bottom-10 w-44 h-44 rounded-full bg-teal-400/20 blur-xl" />
                <div className="pointer-events-none select-none absolute right-6 top-6 w-16 h-16 rounded-2xl bg-white/10 rotate-12 border border-white/15" />
                <div className="pointer-events-none select-none absolute right-16 bottom-6 w-10 h-10 rounded-full bg-emerald-300/20" />

                <div className="relative z-10 max-w-xs space-y-2">
                  <p className="text-[10px] font-extrabold uppercase tracking-widest text-teal-200">
                    FINAL CONFIRMATION
                  </p>
                  <h3 className="text-xl sm:text-2xl font-extrabold leading-tight">
                    Submit attendance request for approval
                  </h3>
                  <p className="text-xs text-teal-100/90 leading-relaxed pt-0.5">
                    {isFormValid
                      ? 'All required fields are verified. Your selected faculty will be notified immediately.'
                      : 'Complete all 4 required steps above to unlock instant submission.'}
                  </p>
                </div>

                <div className="relative z-10 mt-6 flex flex-wrap items-center gap-3">
                  <button
                    type="submit"
                    disabled={!isFormValid}
                    className={`inline-flex items-center gap-2 px-5 py-3 rounded-full text-xs font-extrabold transition-all ${
                      isFormValid
                        ? 'bg-white text-[#0f7685] shadow-md hover:scale-[1.02] active:scale-95 cursor-pointer'
                        : 'bg-white/25 text-white/60 cursor-not-allowed'
                    }`}
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Request</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={handleReset}
                    className="px-4 py-3 rounded-full text-xs font-bold text-teal-100 hover:text-white hover:bg-white/10 transition"
                  >
                    Reset Form
                  </button>
                </div>

                {submitted && (
                  <div className="relative z-10 mt-4 p-3 rounded-2xl bg-emerald-400/20 border border-emerald-300/40 text-white text-xs font-bold flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-200 shrink-0" />
                    <span>Your attendance request has been routed to faculty.</span>
                  </div>
                )}
              </div>
            </aside>
          </form>
        </div>
      </div>

      {/* =========================================================
          SLIDE-UP / MODAL FACULTY SELECTOR (Mobile & Desktop)
      ========================================================= */}
      {isFacultyModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-white w-full sm:max-w-lg rounded-t-[28px] sm:rounded-[28px] max-h-[82vh] flex flex-col overflow-hidden shadow-2xl border border-white">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-base font-extrabold text-slate-900">Select Faculty Approvers</h3>
                <p className="text-xs font-medium text-slate-400">
                  {selectedFaculty.length} faculty member(s) tagged
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsFacultyModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center hover:bg-slate-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 border-b border-slate-100 bg-slate-50/70">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={facultySearch}
                  onChange={(e) => setFacultySearch(e.target.value)}
                  placeholder="Filter by faculty name or designation..."
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm font-medium focus:outline-none focus:border-[#0f7685]"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
              {filteredFaculty.map((fac) => {
                const isChecked = selectedFaculty.includes(fac.id);
                return (
                  <div
                    key={fac.id}
                    onClick={() => toggleFaculty(fac.id)}
                    className={`flex items-center justify-between px-6 py-3.5 cursor-pointer transition ${
                      isChecked ? 'bg-teal-50/70' : 'hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <div
                        className={`w-9 h-9 rounded-full ${fac.avatarBg} ${fac.avatarText} text-xs font-extrabold flex items-center justify-center shrink-0`}
                      >
                        {fac.initials}
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm font-extrabold text-slate-800">{fac.name}</p>
                        <p className="text-[11px] font-semibold text-slate-400">{fac.role}</p>
                      </div>
                    </div>
                    <div
                      className={`w-5 h-5 rounded-md border flex items-center justify-center transition ${
                        isChecked
                          ? 'bg-[#0f7685] border-[#0f7685] text-white'
                          : 'border-slate-300 bg-white'
                      }`}
                    >
                      {isChecked && <Check className="w-3.5 h-3.5" />}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="p-4 border-t border-slate-100 bg-white">
              <button
                type="button"
                onClick={() => setIsFacultyModalOpen(false)}
                className="w-full py-3 rounded-2xl bg-[#0f7685] text-white font-extrabold text-xs sm:text-sm shadow-md"
              >
                Confirm Selection ({selectedFaculty.length})
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================
          MOBILE BOTTOM NAVIGATION BAR (< 1024px)
      ========================================================= */}
      <nav className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-white/90 backdrop-blur-xl border-t border-slate-200/80 px-3 h-16 flex items-center justify-around shadow-[0_-8px_24px_rgba(15,60,75,0.08)]">
        <a href="#home" className="flex flex-col items-center gap-1 text-slate-400 text-[10px] font-bold">
          <Home className="w-4 h-4" />
          <span>Home</span>
        </a>
        <a href="#notif" className="flex flex-col items-center gap-1 text-slate-400 text-[10px] font-bold">
          <Bell className="w-4 h-4" />
          <span>Alerts</span>
        </a>

        <div className="-mt-6">
          <button
            type="button"
            aria-label="New Request"
            className="w-12 h-12 rounded-full bg-[#0f7685] text-white flex items-center justify-center shadow-lg shadow-teal-900/30 ring-4 ring-white"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>

        <a href="#history" className="flex flex-col items-center gap-1 text-slate-400 text-[10px] font-bold">
          <History className="w-4 h-4" />
          <span>History</span>
        </a>
        <a href="#profile" className="flex flex-col items-center gap-1 text-slate-400 text-[10px] font-bold">
          <User className="w-4 h-4" />
          <span>Profile</span>
        </a>
      </nav>
    </div>
  );
}