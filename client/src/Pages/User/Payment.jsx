"use client"
import { useState, useEffect } from "react"
import FilterBar from "../../Components/User/FilterBar"
import BillCard from "../../Components/User/BillCard"
import Section from "../../Components/Section"
import PageHeading from "../../Components/PageHeading"
import { toast } from "react-toastify"

export default function Payment() {
    const headingData = {
        title: "Thanh Toán",
    }

    const [bills, setBills] = useState([])
    const [filter, setFilter] = useState("all")
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const token = localStorage.getItem("token")

    useEffect(() => {
        const fetchBills = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_BE_URL}/pharmacy/my-bills`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                })
                const data = await response.json()
                console.log("API response:", data);
                setBills(data.bills || [])
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        fetchBills()
    }, [token])

    // Handle payment return from MoMo
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const paymentStatus = urlParams.get('payment');
        const returnToken = urlParams.get('token');
        const billId = urlParams.get('billId');

        if (paymentStatus === 'success') {
            if (returnToken) {
                // Restore token if it was passed back
                localStorage.setItem('token', returnToken);
            }
            
            if (billId) {
                toast.success("Thanh toán thành công!");
                // Clean up URL
                window.history.replaceState({}, document.title, window.location.pathname);
                // Refresh bills list
                window.location.reload();
            }
        }
    }, []);

    const filteredBills = filter === "all" ? bills : bills.filter((bill) => bill.status === filter)

    const handleFilterChange = (newFilter) => {
        setFilter(newFilter)
    }

    const handlePayBill = async (bill) => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                toast.error("Vui lòng đăng nhập lại để thực hiện thanh toán");
                return;
            }

            const response = await fetch(`${import.meta.env.VITE_BE_URL}/payment/create-payment`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    _id: bill._id,
                    redirectUrl: `${import.meta.env.VITE_FE_URL}/payment?payment=success&billId=${bill._id}&token=${token}`,
                    requestType: "payWithMethod"
                })
            });

            if (!response.ok) {
                if (response.status === 401) {
                    toast.error("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại");
                    localStorage.removeItem("token");
                    window.location.href = "/login";
                    return;
                }
                throw new Error("Failed to create payment");
            }

            const result = await response.json();
            console.log("Payment API response:", result);

            // Cập nhật trạng thái hóa đơn sau khi bấm thanh toán
            setBills(bills.map((b) => (b._id === bill._id ? { ...b, paymentStatus: "Paying" } : b)));

            // Nếu API trả về URL thanh toán, chuyển hướng
            if (result.payUrl) {
                // Store current state before redirect
                localStorage.setItem("paymentReturnUrl", window.location.pathname);
                localStorage.setItem("paymentBillId", bill._id);
                window.location.href = result.payUrl;
            } else {
                toast.success("Thanh toán thành công!");
            }
        } catch (error) {
            console.error("Payment error:", error);
            toast.error("Có lỗi xảy ra khi thanh toán!");
        }
    };

    return (
        <>
            <Section
                topSpaceMd="100"
            >
            </Section>

            <Section
                className="cs_page_heading cs_bg_filed cs_center"
                backgroundImage="/assets/img/banner-doctors.png"
            >
                <PageHeading data={headingData} />
            </Section>

            <div className="bills-wrapper">
                <div className="bills-container">
                    <FilterBar activeFilter={filter} onFilterChange={handleFilterChange} />

                    {loading ? (
                        <p>Đang tải...</p>
                    ) : error ? (
                        <p className="error-message">Error: {error}</p>
                    ) : filteredBills.length === 0 ? (
                        <div className="no-bills">
                            <p>Chưa có hóa đơn nào</p>
                        </div>
                    ) : (
                        <div className="bills-list">
                            {Array.isArray(filteredBills) && filteredBills.length > 0 ? (
                                filteredBills.map((bill) => <BillCard key={bill._id} bill={bill} onPayBill={handlePayBill} />)
                            ) : (
                                <p>Không có hóa đơn nào.</p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}
