import React from "react";
import { RxAvatar } from "react-icons/rx";

const UserInfoSection = ({ editMode, formData, handleChange, user }) => {
    return (
        <div className="flex items-center mb-6">
            <div className="avatar mr-4">
                <div className="w-20 h-20 rounded-full ring-offset-base-100 ring-offset-2 flex items-center justify-center bg-base-100">
                    <RxAvatar className="w-20 h-20" />
                </div>
            </div>

            <div className="flex-1">
                {editMode ? (
                    <>
                        <div className="form-control mb-4">
                            <label className="label">
                                <span className="label-text p-2">Name</span>
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="input input-bordered w-64"
                            />
                        </div>

                        <div className="form-control mb-4">
                            <label className="label">
                                <span className="label-text p-2">Email</span>
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="input input-bordered w-64"
                            />
                        </div>
                    </>
                ) : (
                    <>
                        <h2 className="text-2xl font-bold flex items-center">
                            {user.name}
                            <span className="badge badge-success ml-2">
                                Approved
                            </span>
                        </h2>
                        <p className="text-base opacity-70">{user.email}</p>
                        <p className="text-sm opacity-60 mt-1">
                            Role: {user.role}{" "}
                        </p>
                    </>
                )}
            </div>
        </div>
    );
};

export default UserInfoSection;
