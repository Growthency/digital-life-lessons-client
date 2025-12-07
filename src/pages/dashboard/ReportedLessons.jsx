import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { FaTrash, FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure"; // ইমপোর্ট
import usePageTitle from "../../hooks/usePageTitle";

const ReportedLessons = () => {
  usePageTitle("Reported Lessions");
  const [reports, setReports] = useState([]);
  const axiosSecure = useAxiosSecure(); // হুক

  useEffect(() => {
    axiosSecure.get("/reports").then((res) => setReports(res.data));
  }, [axiosSecure]);

  const handleDeleteLesson = (report) => {
    Swal.fire({
      title: "Delete this Lesson?",
      text: "This will remove the lesson permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Delete Lesson",
    }).then((result) => {
      if (result.isConfirmed) {
        // ১. লেসন ডিলিট (Secure)
        axiosSecure.delete(`/lessons/${report.lessonId}`).then(() => {
          // ২. রিপোর্ট ডিলিট (Secure)
          axiosSecure.delete(`/reports/${report._id}`).then(() => {
            Swal.fire("Deleted!", "Lesson removed.", "success");
            setReports(reports.filter((r) => r._id !== report._id));
          });
        });
      }
    });
  };

  return (
    <div className="w-full p-4">
      <h2 className="text-3xl font-bold mb-6 text-red-500">
        Reported Lessons ({reports.length})
      </h2>
      <div className="overflow-x-auto bg-base-100 shadow-lg rounded-lg">
        <table className="table w-full">
          <thead className="bg-base-200">
            <tr>
              <th>#</th>
              <th>Lesson Title</th>
              <th>Reported By</th>
              <th>Reason</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report, index) => (
              <tr key={report._id}>
                <th>{index + 1}</th>
                <td className="font-bold">{report.lessonTitle}</td>
                <td>{report.reporterEmail}</td>
                <td>
                  <span className="badge badge-warning">{report.reason}</span>
                </td>
                <td className="flex gap-2">
                  <Link
                    to={`/lessons/${report.lessonId}`}
                    target="_blank"
                    className="btn btn-xs btn-info text-white"
                  >
                    <FaEye /> View
                  </Link>
                  <button
                    onClick={() => handleDeleteLesson(report)}
                    className="btn btn-xs btn-error text-white"
                  >
                    <FaTrash /> Delete Lesson
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {reports.length === 0 && (
          <p className="text-center p-4">No reports found! Good job.</p>
        )}
      </div>
    </div>
  );
};

export default ReportedLessons;
