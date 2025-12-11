import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { FaTrash, FaUserShield, FaUser } from "react-icons/fa";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import usePageTitle from "../../hooks/usePageTitle";

const ManageUsers = () => {
  usePageTitle("Manage Users");
  const [users, setUsers] = useState([]);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    axiosSecure
      .get("/users")
      .then((res) => setUsers(res.data))
      .catch((err) => console.error(err));
  };

  const handleRoleUpdate = (user, newRole) => {
    Swal.fire({
      title: `Make this user ${newRole}?`,
      text: `Are you sure you want to change ${user.name}'s role to ${newRole}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: `Yes, Make ${newRole}`,
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .patch(`/users/role/${user._id}`, { role: newRole })
          .then((res) => {
            if (res.data.modifiedCount > 0) {
              toast.success(`${user.name} is now a ${newRole}!`);
              fetchUsers();
            }
          })
          .catch((err) => toast.error("Failed to update role"));
      }
    });
  };

  const handleDeleteUser = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Delete ${user.name}? This cannot be undone.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, delete!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/users/${user._id}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              Swal.fire("Deleted!", "User has been removed.", "success");
              fetchUsers();
            }
          })
          .catch((err) => toast.error("Failed to delete"));
      }
    });
  };

  return (
    <div className="w-full p-4">
      <h2 className="text-3xl font-bold mb-6 text-primary">
        Manage Users ({users.length})
      </h2>
      <div className="overflow-x-auto bg-base-100 shadow-lg rounded-lg border">
        <table className="table w-full">
          {/* Head */}
          <thead className="bg-base-200">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th className="text-center">Current Role</th>
              <th className="text-center">Change Role</th>
              <th>Action</th>
            </tr>
          </thead>
          {/* Body */}
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id} className="hover">
                <th>{index + 1}</th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-10 h-10">
                        <img
                          src={
                            user.photo || "https://i.ibb.co/TmghV6k/user.png"
                          }
                          alt="User"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{user.name}</div>
                    </div>
                  </div>
                </td>
                <td>{user.email}</td>

                <td className="text-center">
                  {user.role === "admin" ? (
                    <span className="badge badge-primary badge-lg font-bold gap-1">
                      <FaUserShield /> Admin
                    </span>
                  ) : (
                    <span className="badge badge-ghost badge-lg gap-1">
                      <FaUser /> User
                    </span>
                  )}
                </td>

                <td className="text-center">
                  {user.role === "admin" ? (
                    <button
                      onClick={() => handleRoleUpdate(user, "user")}
                      className="btn btn-xs btn-outline btn-warning"
                      title="Demote to User"
                    >
                      Downgrade to User
                    </button>
                  ) : (
                    <button
                      onClick={() => handleRoleUpdate(user, "admin")}
                      className="btn btn-xs btn-primary text-white"
                      title="Promote to Admin"
                    >
                      Promote to Admin
                    </button>
                  )}
                </td>

                <td>
                  <button
                    onClick={() => handleDeleteUser(user)}
                    className="btn btn-ghost btn-xs text-red-600 tooltip"
                    data-tip="Delete User"
                  >
                    <FaTrash className="text-lg" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
