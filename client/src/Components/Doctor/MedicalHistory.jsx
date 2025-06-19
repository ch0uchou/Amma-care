import React, { useState, useEffect } from "react";
import axios from "axios";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const MedicalHistory = () => {
    const [appointments, setAppointments] = useState([]);
    const [doctorRole, setdoctorRole] = useState(null);
    const [doctorId, setDoctorId] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem('token');

    useEffect(() => {
        fetchDoctorRole();
        fetchAppointments();
    }, []);

    const fetchAppointments = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BE_URL}/appointment/history`, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            });

            if (response.data.data) {
                setAppointments(response.data.data);
            } else {
                console.error('No appointments data found!');
            }
        } catch (error) {
            console.error('Error fetching appointments:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchDoctorRole = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BE_URL}/user/me`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setdoctorRole(response.data.role);
            setDoctorId(response.data.id);
            console.log("Doctor role:", response.data.role);
            console.log("Doctor ID:", response.data.id);
        } catch (error) {
            console.error("Error fetching doctor role:", error);
        }
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value.toLowerCase());
    };

    // Lọc theo tên bệnh nhân và chỉ hiển thị lịch sử khám của bác sĩ hiện tại
    const filteredAppointments = appointments.filter(({ appointment }) => {
        // Kiểm tra xem bác sĩ hiện tại có trong danh sách doctorId của appointment không
        const isDoctorInAppointment = appointment.doctorId && appointment.doctorId.some(doctor => {
            const docId = typeof doctor === 'object' ? doctor._id : doctor;
            return docId === doctorId;
        });
        
        // Lọc theo tên bệnh nhân
        const patientNameMatch = appointment.patientName?.toLowerCase().includes(searchTerm);
        
        return isDoctorInAppointment && patientNameMatch;
    });

    const getStatusDisplay = (status) => {
        if (status === "Pending") {
            return "Đang chờ bác sĩ";
        } else if (status === "Assigned") {
            return "Đang chờ xác nhận";
        } else if (status === "Accepted") {
            return "Đã xác nhận";
        } else if (status === "Canceled") {
            return "Đã hủy";
        } else if (status === "Bill_created") {
            return "Đã tạo hóa đơn";
        } else if (status === "Prescription_created") {
            return "Đã tạo đơn thuốc";
        } else if (status === "WaitingPrescription") {
            return "Đang chờ đơn thuốc";
        } else if (status === "Rejected") {
            return "Đã từ chối";
        } else if (status === "Done") {
            return "Đã hoàn thành";
        }
        return status;
    };

    return (
        <div className="pending">
            <Row className="justify-content-between">
                <Col md={6}>
                    <h2>Lịch sử khám bệnh</h2>
                </Col>
                <Col md={4}>
                    <input
                        type="text"
                        placeholder="Tìm kiếm bệnh nhân"
                        value={searchTerm}
                        onChange={handleSearch}
                        className="form-control mb-3"
                    />
                </Col>
            </Row>

            <table className="table">
                <thead>
                    <tr>
                        <th className="text-center">Bệnh Nhân</th>
                        <th className="text-center">Ngày Khám</th>
                        <th className="text-center">Giờ khám</th>
                        <th className="text-center">Trạng Thái</th>
                        <th className="text-center">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {loading ? (
                        <tr>
                            <td colSpan="5" className="text-center">Đang tải dữ liệu...</td>
                        </tr>
                    ) : filteredAppointments.length > 0 ? (
                        filteredAppointments.map(({ appointment }) => (
                            <tr key={appointment._id}>
                                <td className="text-center">{appointment.patientName || "Không rõ"}</td>
                                <td className="text-center">
                                    {appointment.date ? new Date(appointment.date).toLocaleDateString("vi-VN") : "Không rõ"}
                                </td>
                                <td className="text-center">{appointment.time || "Không rõ"}</td>
                                <td className="text-center">{getStatusDisplay(appointment.status)}</td>
                                <td className="text-center">
                                    <Link
                                        to={doctorRole === "doctor" ? `/doctor/medical-history-detail/${appointment._id}` : `/hod/medical-history-detail/${appointment._id}`}
                                        className="btn btn-primary"
                                    >
                                        Chi tiết
                                    </Link>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" className="text-center">Không có lịch sử khám nào của bệnh nhân.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default MedicalHistory;
