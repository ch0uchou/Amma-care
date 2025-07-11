import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";
import Layout from "./Components/Layout/Layout";
import LayoutWithoutHeader from "./Components/Layout/LayoutWithoutHeader";
import AdminLayout from "./Components/Layout/AdminLayout";
import DoctorLayout from "./Components/Layout/DoctorLayout";
import NurseLayout from "./Components/Layout/NurseLayout";
import MainHome from "./Pages/HomePage/MainHome";
import HomeV2 from "./Pages/HomePage/HomeV2";
import HomeV3 from "./Pages/HomePage/HomeV3";
import AboutPage from "./Pages/AboutPage/AboutPage";
import LoginPage from "./Pages/AuthenPage/LoginPage";
import RegisterPage from "./Pages/AuthenPage/RegisterPage";
import ForgotPass from "./Pages/AuthenPage/ForgotPassPage";
import ResetPass from "./Pages/AuthenPage/ResetPassPage";
import VerifyPage from "./Pages/AuthenPage/VerifyPage";
import ServicePage from "./Pages/Service/ServicePage";
import ServiceDetails from "./Pages/Service/ServiceDetails";
import BlogsPage from "./Pages/BlogsPage/BlogsPage";
import BlogsDetails from "./Pages/BlogsPage/BlogsDetails";
import DoctorsPage from "./Pages/Pages/DoctorsPage";
import DoctorsDetailsPage from "./Pages/Pages/DoctorsDetailsPage";
import DoctorsResultPage from "./Pages/Pages/DoctorsResultPage";
import TimeTablePage from "./Pages/Pages/TimeTablePage";
import PortfolioPage from "./Pages/Pages/PortfolioPage";
import ErrorPage from "./Pages/Pages/ErrorPage";
import ContactPage from "./Pages/ContactPage/ContactPage";
import Appointments from "./Pages/Pages/Appointments";
import AppointmentsHistory from "./Pages/Pages/AppointmentsHistory";
import ViewAppointmentDetail from "./Pages/Pages/ViewAppointmentDetail"
import DoctorAppointments from "./Pages/Pages/DoctorAppointments";
import AppointmentDetail from "./Pages/Pages/AppointmentDetail";
import DiagnosisForm from "./Pages/Pages/DiagnosisForm";
import DiagnosisManagement from "./Pages/Pages/DiagnosisManagement";
import DiagnosisDetailPage from "./Pages/Pages/DiagnosisDetailPage";
import UpdateDiagnosisPage from "./Pages/Pages/UpdateDiagnosisPage";
import PrescriptionForm from "./Pages/Pages/PrescriptionForm";
import PrescriptionManagement from "./Pages/Pages/PrescriptionManagement";
import PrescriptionDetailPage from "./Pages/Pages/PrescriptionDetailPage";
import UpdatePrescriptionPage from "./Pages/Pages/UpdatePrescriptionPage";
import BookingAppointments from "./Pages/Pages/Booking/BookingAppointments";
import ScrollUpButton from "./Components/ScrollUpButton";
import UserProfile from "./Pages/User/Profile";
import Payment from "./Pages/User/Payment";
import PaymentDetail from "./Pages/User/PaymentDetail";
import FavoritesPage from "./Pages/User/FavoritesPage";
import UserManagement from "./Pages/Admin/UserManagement";
import DoctorManagement from "./Pages/Admin/DoctorManagement";
import NurseManagement from "./Pages/Admin/NurseManagement";
import PharmacyManagement from "./Pages/Admin/PharmacyManagement";
import ServiceManagement from './Pages/Admin/ServiceManagement';
import HeadOfDepartmentManagement from "./Pages/Admin/HeadOfDepartmentManagement";
import ScheduleManagement from "./Pages/Doctor/ScheduleManagement";
import ManageAppointments from "./Components/Doctor/ManageAppointments";
import ManageResult from "./Components/Doctor/ManageResult";
import MedicalResult from "./Components/Doctor/MedicalResult";
import ManagePrescriptionsRecord from "./Components/Doctor/ManagePrescriptionsRecord";
import PrescriptionsRecordResult from "./Components/Doctor/PrescriptionsRecordResult";
import NurseDashboard from "./Pages/Nurse/NurseDashboard";
import NursePending from "./Pages/Nurse/NursePending";
import NurseAssigned from "./Pages/Nurse/NurseAssigned";
import NurseAppointmentList from "./Pages/Nurse/NurseAppointmentList";
import GeneralHealthKetchup from "./Pages/Nurse/GeneralHealthKetchup";
import PharmacyeDashboard from "./Pages/Pharmacy/PharmacyDashboard";
import PharmacyPending from "./Pages/Pharmacy/PharmacyPending";
import PrescriptionDetail from "./Pages/Pharmacy/PrescriptionDetail";
import AllBills from "./Pages/Pharmacy/AllBills";
import BillUpdate from "./Pages/Pharmacy/BillUpdate";
import PharmacyLayout from "./Components/Layout/PharmacyLayout";
import "aos/dist/aos.css";
import Aos from "aos";
import { useEffect } from "react";
import MedicalHistory from "./Components/Doctor/MedicalHistory";
import MedicalHistoryDetail from "./Components/Doctor/MedicalHistoryDetail";
import FloatingMenu from './Components/FloatingMenu';
import HODLayout from "./Components/Layout/HODLayout";
import DoctorAppointmentList from "./Pages/Doctor/HeadOfDepartment/DoctorAppointmentList";
import BlogCreatePage from "./Components/BlogsSection/BlogCreatePage";
import EditBlogPage from "./Components/BlogsSection/EditBlogPage";
import StaffProfile from "./Pages/Pages/StaffProfile";
import AdminDashboard from "./Pages/Admin/AdminDashboard";
import Meeting from "./Pages/Meeting/Meeting";
import { ToastContainer } from "react-toastify";
import BlogsSection1 from "./Components/BlogsSection/BlogsSection1";
import DoctorBlogsPage from "./Pages/BlogsPage/DoctorBlogsPage";
import DoctorBlogsDetails from "./Pages/BlogsPage/DoctorBlogsDetails";

// Add axios interceptor
axios.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Clear all auth data and redirect to login
            localStorage.removeItem("token");
            localStorage.removeItem("username");
            localStorage.removeItem("userRole");
            localStorage.removeItem("unverifiedEmail");
            localStorage.removeItem("verifySource");
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);

function App() {
    Aos.init({
        duration: 1500,
        delay: 0.25,
        disable: "mobile",
    });
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    const shouldShowFloatingMenu = !/^\/(admin|doctor(\/|$)|nurse|pharmacy|hod|payment-detail|meeting|login|register|verify|forgotpass|resetpass)/.test(pathname);

    return (
        <>
            <Routes>
                <Route path="/meeting/:roomId" element={
                    <Meeting />
                } />

                <Route path="/" element={<Layout isTopBar={true} />}>
                    <Route index element={<MainHome />} />
                    <Route path="/home-v2" element={<HomeV2 />} />
                </Route>

                <Route path="/" element={<Layout variant="cs_type_1" />}>
                    <Route path="/home-v3" element={<HomeV3 />} />
                </Route>

                <Route path="/" element={<Layout />}>
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/service" element={<ServicePage />} />
                    <Route path="/service/:serviceId" element={<ServiceDetails />} />
                    <Route path="/blog" element={<BlogsPage />} />
                    <Route path="/blog/:blogId" element={<BlogsDetails />} />
                    <Route path="/appointments" element={<Appointments />} />
                    <Route path="/BookingAppointments" element={<BookingAppointments />} />
                    <Route path="/appointmentshistory" element={<AppointmentsHistory />} />
                    <Route path="/ViewAppointmentDetail/:appointmentId" element={<ViewAppointmentDetail />} />
                    <Route path="/doctors" element={<DoctorsPage />} />
                    <Route path="/doctors/:doctorId" element={<DoctorsDetailsPage />} />
                    <Route path="/favorites" element={<FavoritesPage />} />
                    <Route path="/profile" element={<UserProfile />} />
                    <Route path="/payment" element={<Payment />} />
                    <Route path="/payment-detail/:billId" element={<PaymentDetail />} />
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path="*" element={<ErrorPage />} />
                </Route>

                <Route path="/" element={<LayoutWithoutHeader />}>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/verify" element={<VerifyPage />} />
                    <Route path="/forgotpass" element={<ForgotPass />} />
                    <Route path="/resetpass" element={<ResetPass />} />
                </Route>

                <Route path="/admin" element={
                    <PrivateRoute allowedRoles={["admin"]}><AdminLayout />
                    </PrivateRoute>
                }>
                    <Route path="/admin" element={<AdminDashboard />} />
                    <Route path="/admin/users" element={<UserManagement />} />
                    <Route path="/admin/doctors" element={<DoctorManagement />} />
                    <Route path="/admin/headofdepartments" element={<HeadOfDepartmentManagement />} />
                    <Route path="/admin/nurses" element={<NurseManagement />} />
                    <Route path="/admin/pharmacy" element={<PharmacyManagement />} />
                    <Route path="/admin/services" element={<ServiceManagement />} />
                    <Route path="profile" element={<StaffProfile />} />
                </Route>

                <Route path="/doctor" element={
                    <PrivateRoute allowedRoles={["doctor"]}><DoctorLayout />
                    </PrivateRoute>
                }>
                    <Route path="blog" element={<DoctorBlogsPage />} />
                    <Route path="blog/create" element={<BlogCreatePage />} />
                    <Route path="blog/edit/:blogId" element={<EditBlogPage />} />
                    <Route path="blog/:blogId" element={<DoctorBlogsDetails />} />
                    <Route path="/doctor" element={<ManageAppointments />} />
                    <Route path="appointments/manage-result/:appointmentId" element={<ManageResult />} />
                    <Route path="/doctor/medical-result" element={<MedicalResult />} />
                    <Route path="/doctor/manage-prescription/:appointmentId" element={<ManagePrescriptionsRecord />} />
                    <Route path="/doctor/manage-prescription-result" element={<PrescriptionsRecordResult />} />
                    <Route path="/doctor/calendar" element={<ScheduleManagement />} />
                    <Route path="/doctor/medical-history" element={<MedicalHistory />} />
                    <Route path="/doctor/medical-history-detail/:appointmentId" element={<MedicalHistoryDetail />} />
                    <Route path="/doctor/profile" element={<StaffProfile />} />
                    {/* <Route path="/doctor/appointment/assign/:appointmentId" element={<AssignDoctor />} /> */}
                </Route>
                <Route path="/hod" element={
                    <PrivateRoute allowedRoles={["head of department"]}><HODLayout />
                    </PrivateRoute>
                }>
                    <Route path="/hod/calendar" element={<ScheduleManagement />} />
                    <Route path="/hod" element={<ManageAppointments />} />
                    <Route path="/hod/medical-result" element={<MedicalResult />} />
                    <Route path="/hod/appointments/manage-result/:appointmentId" element={<ManageResult />} />
                    <Route path="/hod/manage-prescription-result" element={<PrescriptionsRecordResult />} />
                    <Route path="/hod/manage-prescription/:appointmentId" element={<ManagePrescriptionsRecord />} />
                    <Route path="/hod/medical-history" element={<MedicalHistory />} />
                    <Route path="/hod/medical-history-detail/:appointmentId" element={<MedicalHistoryDetail />} />
                    <Route path="/hod/specialization" element={<DoctorAppointmentList />} />
                    <Route path="/hod/profile" element={<StaffProfile />} />
                    <Route path="/hod/general-health/:appointmentId" element={<GeneralHealthKetchup />} />
                </Route>
                <Route path="/nurse" element={
                    <PrivateRoute allowedRoles={["nurse"]}><NurseLayout />
                    </PrivateRoute>
                }>
                    <Route path="/nurse/dashboard" element={<NurseDashboard />} />
                    <Route path="/nurse/pending" element={<NursePending />} />
                    <Route path="/nurse/assigned" element={<NurseAssigned />} />
                    <Route path="/nurse/list" element={<NurseAppointmentList />} />
                    <Route path="/nurse/general-health/:appointmentId" element={<GeneralHealthKetchup />} />
                    <Route path="/nurse/profile" element={<StaffProfile />} />
                </Route>
                <Route path="/pharmacy" element={
                    <PrivateRoute allowedRoles={["pharmacy"]}><PharmacyLayout />
                    </PrivateRoute>
                }>
                    <Route path="/pharmacy/dashboard" element={<PharmacyeDashboard />} />
                    <Route path="/pharmacy/pending" element={<PharmacyPending />} />
                    <Route path="/pharmacy/bills" element={<AllBills />} />
                    <Route path="/pharmacy/prescription/:appointmentId" element={<PrescriptionDetail />} />
                    <Route path="/pharmacy/bill/:billId" element={<BillUpdate />} />
                    <Route path="/pharmacy/profile" element={<StaffProfile />} />
                </Route>
            </Routes>
            <ScrollUpButton />
            {shouldShowFloatingMenu && <FloatingMenu />}
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
        </>
    );
}

export default App;
